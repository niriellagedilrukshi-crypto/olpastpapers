import {readFile} from "node:fs/promises";
const source=await readFile(new URL("../data/subject-meta.ts",import.meta.url),"utf8");
const allowed=[...source.matchAll(/slug:"([^"]+)"/g)].map(m=>m[1]);
const papers=JSON.parse(await readFile(new URL("../data/official-papers.generated.json",import.meta.url),"utf8")).filter(x=>allowed.includes(x.subject));
const answers=JSON.parse(await readFile(new URL("../data/official-answers.generated.json",import.meta.url),"utf8")).filter(x=>allowed.includes(x.subject));
const answerMap=new Map(answers.map(x=>[x.id,x]));
const pages=new Map();let errors=0,warnings=0;
for(const item of papers){pages.set(item.id,{...item,hasPaper:true,hasAnswer:answerMap.has(item.id)});answerMap.delete(item.id)}
for(const item of answerMap.values())pages.set(item.id,{...item,hasPaper:false,hasAnswer:true});
const titles=new Map(),paths=new Set();
for(const page of pages.values()){
 const path=`/ol/${page.subject}/${page.year}/${page.medium}/`;
 if(paths.has(path)){console.error("Duplicate canonical path:",path);errors++}paths.add(path);
 const kind=page.hasPaper?"Past Paper":page.answerType==="evaluation-report"?"Evaluation Report":"Marking Scheme";
 const title=`${page.year} O/L ${page.subject} ${kind} ${page.medium}`;
 if(titles.has(title)){console.error("Duplicate generated title:",title);errors++}titles.set(title,path);
 if(!allowed.includes(page.subject)){console.error("Orphan subject:",page.id);errors++}
 if(!["sinhala","english","tamil"].includes(page.medium)){console.error("Invalid medium:",page.id);errors++}
 if(!page.hasPaper&&!page.hasAnswer){console.error("Empty resource page:",page.id);errors++}
}
for(const subject of allowed){const count=[...pages.values()].filter(x=>x.subject===subject).length;if(!count){console.warn("Subject has no published resources:",subject);warnings++}}
const complete=[...pages.values()].filter(x=>x.hasPaper&&x.hasAnswer).length;
console.log(`SEO audit: ${pages.size} canonical resource pages, ${allowed.length} subject hubs, ${complete} complete paper+answer sets.`);
console.log(`SEO audit finished with ${errors} errors and ${warnings} warnings.`);
if(errors)process.exit(1);
