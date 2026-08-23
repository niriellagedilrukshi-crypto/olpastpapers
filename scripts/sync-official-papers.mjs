import { writeFile } from "node:fs/promises";

const API="https://www.doenets.lk/cms/api/resources?isEnabled=1&rowCount=0&type=PAPA";
const BASE="https://www.doenets.lk";
const subjects=[
  ["mathematics",["mathematics"]],
  ["science",["science"]],
  ["english",["english language"]],
  ["history",["history","ඉතිහාසය"]],
  ["ict",["information & communication technology","information and communication technology"]],
  ["sinhala-language",["sinhala language & literature","sinhala language and literature"]],
  ["business-accounting",["business & accounting","business and accounting"]],
  ["geography",["geography"]],
  ["buddhism",["buddhism"]],
  ["tamil-language",["tamil language & literature","tamil language and literature"]],
  ["civic-education",["civic education"]],
  ["health-physical-education",["health & physical education","health and physical education"]],
  ["agriculture-food-technology",["agriculture & food technology","agriculture and food technology"]],
  ["home-economics",["home economics"]],
  ["entrepreneurship-studies",["entrepreneurship studies"]],
  ["communication-media",["communication & media studies","communication and media studies"]],
  ["english-literature",["appreciation of english literary texts"]],
  ["catholicism",["catholicism"]],
  ["christianity",["christianity"]],
  ["islam",["islam"]],
  ["saivanery",["saivanery"]],
  ["arts-crafts",["art & crafts","arts & crafts"]],
  ["music-oriental",["music (oriental)"]],
  ["music-western",["music (western)"]],
  ["music-carnatic",["music (carnatic)","carnatic music"]],
  ["dancing-oriental",["dancing (oriental)"]],
  ["dancing-bharata",["dancing (bharata)","dancing (bharatha)"]],
  ["drama-sinhala",["drama and theatre (sinhala)","drama & theatre (sinhala)"]],
  ["drama-tamil",["drama and theatre (tamil)","drama & theatre (tamil)"]],
  ["japanese",["japanese"]],
  ["korean",["korean"]],
  ["french",["french"]],
  ["german",["german"]],
  ["chinese",["chinese"]],
  ["pali",["pali"]],
  ["arabic",["arabic"]],
  ["aquatic-bioresources",["aquatic bioresources technology","aquatic bio. technology"]],
  ["design-construction",["design & construction technology","design and construction technology"]],
  ["design-mechanical",["design & mechanical technology","design and mechanical technology"]],
  ["design-electrical-electronic",["design, electrical & electronic technology","design electrical & electronic technology"]],
  ["drama-english",["drama and theatre (english)","drama & theatre (english)"]],
  ["hindi",["hindi"]],
  ["russian",["russian"]],
  ["sanskrit",["sanskrit"]],
  ["second-language-sinhala",["second language (sinhala)"]],
  ["second-language-tamil",["second language (tamil)"]],
  ["sinhala-literature",["appreciation of sinhala literary texts"]],
  ["tamil-literature",["appreciation of tamil literary texts"]],
  ["arabic-literature",["appreciation of arabic literary texts"]],
  ["electronic-shorthand-english",["electronic writing & shorthand (english)"]],
  ["electronic-shorthand-sinhala",["electronic writing & shorthand (sinhala)"]],
  ["electronic-shorthand-tamil",["electronic writing & shorthand (tamil)"]],
  ["art",["art"]]
];
const allowedSubjects=new Set(["sinhala-language","tamil-language","mathematics","science","history","english","buddhism","catholicism","christianity","islam","saivanery","business-accounting","civic-education","geography","art","music-oriental","music-western","music-carnatic","dancing-oriental","dancing-bharata","drama-sinhala","drama-tamil","drama-english","ict","agriculture-food-technology","home-economics"]);
const mediumMap={en:"english",si:"sinhala",ta:"tamil"};
const displayYears={2025:"2025 (2026)",2024:"2024 (2025)",2023:"2023 (2024)",2022:"2022 (2024)",2021:"2021 (2022)",2020:"2020",2019:"2019",2018:"2018",2017:"2017",2016:"2016",2015:"2015"};
const response=await fetch(API,{signal:AbortSignal.timeout(120000)});
if(!response.ok)throw new Error(`DOE API ${response.status}`);
const data=await response.json();
const found=new Map();
for(const resource of data.resources||[]){
  const title=(resource.title?.en||"").trim();
  const lower=title.toLowerCase();
  if(!lower.includes("ordinary level")&&!lower.includes("o.l"))continue;
  if(lower.includes("piriven"))continue;
  const year=Number(title.match(/20\d{2}/)?.[0]);
  if(!displayYears[year])continue;
  const rawLabel=(resource.description?.en||"").trim()||title.split(/\s*[-–]\s*/).at(-1)||"";
  const descriptor=rawLabel.toLowerCase().replace(/\s+/g," ").replace(/^\/+\s*/,"").replace(/^\(?\d+\)?\s*[-–]\s*/,"").replace(/\s*\((new|old) syllabus\)\s*$/," ").trim();
  const subject=subjects.find(([,terms])=>terms.some(term=>descriptor===term||descriptor.startsWith(`${term} `)||descriptor.startsWith(`${term} -`)))?.[0];
  if(!subject)continue;
  for(const group of resource.links||[]){
    for(const [code,path] of Object.entries(group.link||{})){
      if(!path||!mediumMap[code])continue;
      const medium=mediumMap[code];
      // English Language is a single-language exam. Sinhala Language records sometimes
      // expose a duplicate under `en`; keep only the academically correct medium.
      if(subject==="english"&&medium!=="english")continue;
      if(subject==="sinhala-language"&&medium!=="sinhala")continue;
      const key=`${year}-${subject}-${medium}`;
      const record={id:key,subject,year,displayYear:displayYears[year],medium,paperUrl:new URL(path,BASE).href,sourceName:"Department of Examinations Sri Lanka",sourceUrl:"https://www.doenets.lk/pastpapers",updatedAt:(resource.updated_at||resource.created_date||new Date().toISOString()).slice(0,10)};
      const existing=found.get(key);
      if(!existing||record.updatedAt>existing.updatedAt)found.set(key,record);
    }
  }
}
const records=[...found.values()].filter(item=>allowedSubjects.has(item.subject)).sort((a,b)=>b.year-a.year||a.subject.localeCompare(b.subject)||a.medium.localeCompare(b.medium));
await writeFile(new URL("../data/official-papers.generated.json",import.meta.url),JSON.stringify(records,null,2)+"\n");
console.log(`Synced ${records.length} official O/L paper links from the Department of Examinations.`);
