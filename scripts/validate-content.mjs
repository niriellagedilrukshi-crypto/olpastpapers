import { readFile } from "node:fs/promises";
const paperRecords=JSON.parse(await readFile(new URL("../data/official-papers.generated.json",import.meta.url),"utf8"));
const answerRecords=JSON.parse(await readFile(new URL("../data/official-answers.generated.json",import.meta.url),"utf8"));
let failed=false;
for(const [name,records] of [["papers",paperRecords],["answers",answerRecords]]){
 const ids=records.map(x=>x.id),duplicates=ids.filter((id,i)=>ids.indexOf(id)!==i);
 if(duplicates.length){console.error(`Duplicate ${name} ids:`,[...new Set(duplicates)]);failed=true}
 const resourceUrls=records.map(item=>name==="papers"?item.paperUrl:item.markingSchemeUrl),duplicateUrls=resourceUrls.filter((url,i)=>resourceUrls.indexOf(url)!==i);
 if(duplicateUrls.length){console.error(`Duplicate ${name} URLs:`,[...new Set(duplicateUrls)]);failed=true}
 for(const item of records){const url=name==="papers"?item.paperUrl:item.markingSchemeUrl;if(!item.subject||!item.year||!item.medium||!url){console.error(`Incomplete ${name} record:`,item.id);failed=true}}
}
const urls=[...new Set([...paperRecords.map(x=>x.paperUrl),...answerRecords.map(x=>x.markingSchemeUrl)].filter(Boolean))];
async function check(url){try{const response=await fetch(url,{method:"HEAD",redirect:"follow",signal:AbortSignal.timeout(20000)});if(!response.ok){console.error(`BROKEN ${response.status}: ${url}`);failed=true}else console.log(`OK ${response.status}: ${url}`)}catch(error){console.error(`ERROR: ${url} — ${error.message}`);failed=true}}
for(let i=0;i<urls.length;i+=12)await Promise.all(urls.slice(i,i+12).map(check));
const uniqueResources=new Set([...paperRecords.map(x=>x.id),...answerRecords.map(x=>x.id)]).size;
console.log(`Checked ${paperRecords.length} paper links, ${answerRecords.length} answer links and ${uniqueResources} unique resource pages.`);
if(!uniqueResources||failed)process.exit(1);
