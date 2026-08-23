import { writeFile } from "node:fs/promises";
const API="https://www.doenets.lk/cms/api/resources?isEnabled=1&rowCount=0&type=EVRE";
const BASE="https://www.doenets.lk";
const subjectMatchers=[
 ["mathematics",["mathematics","maths"]],
 ["science",["science"]],
 ["english",["english language","31-english","english"]],
 ["history",["history"]],
 ["ict",["information & communication technology","information and communication technology","infor. & comm. technology","ict"]],
 ["sinhala-language",["sinhala language & litt","sinhala language and literature","sinhala language"]],
 ["business-accounting",["business & acct","business & accounting","business and accounting","business studies & accounting","business studies"]],
 ["geography",["geography"]],
 ["buddhism",["buddhism"]],
 ["tamil-language",["tamil language & litt","tamil language and literature","tamil language"]],
 ["civic-education",["civic education","citizenship"]],
 ["health-physical-education",["health & physical educat","health and physical education"]],
 ["agriculture-food-technology",["agri. & food technology","agriculture & food technology","agriculture and food technology"]],
 ["home-economics",["home economics"]],
 ["entrepreneurship-studies",["entrepreneurship stud"]],
 ["communication-media",["commu. & media studies","communication & media studies"]],
 ["english-literature",["appr. of english lit","appreciation of english literary"]],
 ["catholicism",["catholicism"]],
 ["christianity",["christianity"]],
 ["islam",["islam"]],
 ["saivanery",["saivaneri","saivanery"]],
 ["arts-crafts",["art & crafts","arts & crafts"]],
 ["music-oriental",["music (oriental)"]],
 ["music-western",["music (western)"]],
 ["music-carnatic",["music (carnatic)"]],
 ["dancing-oriental",["dancing (oriental)"]],
 ["dancing-bharata",["dancing (bharata)","dancing (bharatha)"]],
 ["drama-sinhala",["drama & theatre (sinhala)","drama & theatre(sinhala)"]],
 ["drama-tamil",["drama & theatre (tamil)","drama & theatre(tamil)"]],
 ["japanese",["japanese"]],
 ["korean",["korean"]],
 ["french",["french"]],
 ["german",["german"]],
 ["chinese",["chinese"]],
 ["pali",["pali"]],
 ["arabic",["arabic"]],
 ["aquatic-bioresources",["aquatic bio. technology","aquatic bioresources technology"]],
 ["design-construction",["design & con. technology","design and construction technology"]],
 ["design-mechanical",["design & mec. technology","design and mechanical technology"]],
 ["design-electrical-electronic",["design elec.& elec. tec","design, electrical and electronic technology"]],
 ["drama-english",["drama & theatre (english)","drama & theatre(english)"]],
 ["hindi",["hindi"]],
 ["russian",["russian"]],
 ["sanskrit",["sanskrit"]],
 ["second-language-sinhala",["second language (sinhala)"]],
 ["second-language-tamil",["second language (tamil)"]],
 ["sinhala-literature",["appr. of sinhala lit","appreciation of sinhala literary"]],
 ["tamil-literature",["appr. of tamil lit","appreciation of tamil literary"]],
 ["arabic-literature",["appr. of arabic lit","appreciation of arabic literary"]],
 ["electronic-shorthand-english",["ele. writing & short. eng","electronic writing & shorthand (english)"]],
 ["electronic-shorthand-sinhala",["ele. writing & short. sin","electronic writing & shorthand (sinhala)"]],
 ["electronic-shorthand-tamil",["ele. writing & short. tam","electronic writing & shorthand (tamil)"]],
 ["art",["art"]]
];
const allowedSubjects=new Set(["sinhala-language","tamil-language","mathematics","science","history","english","buddhism","catholicism","christianity","islam","saivanery","business-accounting","civic-education","geography","art","music-oriental","music-western","music-carnatic","dancing-oriental","dancing-bharata","drama-sinhala","drama-tamil","drama-english","ict","agriculture-food-technology","home-economics"]);
const mediumMap={en:"english",si:"sinhala",ta:"tamil"};
const response=await fetch(API,{signal:AbortSignal.timeout(120000)});if(!response.ok)throw new Error(`DOE API ${response.status}`);const data=await response.json();
const found=new Map();
for(const resource of data.resources||[]){
 const title=(resource.title?.en||"").trim();const lower=title.toLowerCase();
 if((!lower.includes("o/l")&&!lower.includes("o.l"))||lower.includes("piriven"))continue;
 const category=(resource.tags||[]).find(t=>t.categoryCode==="EVPQ")?.en||"";
 const categoryKey=category.toLowerCase();
 if(categoryKey!=="marking schemes"&&categoryKey!=="evaluation report")continue;
 const year=Number(title.match(/20\d{2}/)?.[0]);if(!year)continue;
 for(const group of resource.links||[]){
  const label=(group.lable?.en||"").trim().toLowerCase().replace(/^\d+\s*[-–]\s*/,"").replace(/\s+/g," ");
  const subject=subjectMatchers.find(([,terms])=>terms.some(term=>label===term||label.startsWith(term)))?.[0];if(!subject)continue;
  for(const [code,path] of Object.entries(group.link||{})){
   if(!path||!mediumMap[code])continue;const medium=mediumMap[code];
   if(subject==="english"&&medium!=="english")continue;if(subject==="sinhala-language"&&medium!=="sinhala")continue;
   const id=`${year}-${subject}-${medium}`;
   const answerType=categoryKey==="marking schemes"?"marking-scheme":"evaluation-report";
   const record={id,subject,year,medium,answerType,markingSchemeUrl:new URL(path,BASE).href,sourceName:"Department of Examinations Sri Lanka",sourceUrl:"https://www.doenets.lk/evaluationreports",updatedAt:(resource.updated_at||resource.created_date||new Date().toISOString()).slice(0,10)};
   const existing=found.get(id);
   if(!existing||answerType==="marking-scheme"&&existing.answerType!=="marking-scheme")found.set(id,record);
  }
 }
}
const candidates=[...found.values()].filter(item=>allowedSubjects.has(item.subject)).sort((a,b)=>b.year-a.year||a.subject.localeCompare(b.subject)||a.medium.localeCompare(b.medium));
const records=[];
async function verify(item){try{const response=await fetch(item.markingSchemeUrl,{method:"HEAD",redirect:"follow",signal:AbortSignal.timeout(20000)});if(response.ok)records.push(item);else console.warn(`Skipped stale answer link (${response.status}): ${item.id}`)}catch{console.warn(`Skipped unreachable answer link: ${item.id}`)}}
for(let i=0;i<candidates.length;i+=12)await Promise.all(candidates.slice(i,i+12).map(verify));
const byUrl=new Map();
for(const item of records){
 const current=byUrl.get(item.markingSchemeUrl),path=item.markingSchemeUrl.toLowerCase();
 if(!current){byUrl.set(item.markingSchemeUrl,item);continue}
 const pathMedium=path.includes("/sinhala/")?"sinhala":path.includes("/tamil/")?"tamil":path.includes("/english/")?"english":null;
 if(pathMedium===item.medium&&pathMedium!==current.medium)byUrl.set(item.markingSchemeUrl,item);
 else if(!pathMedium&&current.medium==="english"&&item.medium!=="english"&&item.subject!=="english")byUrl.set(item.markingSchemeUrl,item);
}
const uniqueRecords=[...byUrl.values()].sort((a,b)=>b.year-a.year||a.subject.localeCompare(b.subject)||a.medium.localeCompare(b.medium));
await writeFile(new URL("../data/official-answers.generated.json",import.meta.url),JSON.stringify(uniqueRecords,null,2)+"\n");
console.log(`Synced ${uniqueRecords.length} verified official O/L answer, marking-scheme and evaluation-report links from the Department of Examinations.`);
