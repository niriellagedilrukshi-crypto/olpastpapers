import {subjects} from "./subject-meta";
export {subjects,subjectGroups} from "./subject-meta";
import generatedPapers from "./official-papers.generated.json";
import generatedAnswers from "./official-answers.generated.json";

export type Medium="sinhala"|"english"|"tamil";
export type Paper={id:string;subject:string;subjectSi:string;year:number;displayYear:string;medium:Medium;paperType:"official";hasMarkingScheme:boolean;answerType?:"marking-scheme"|"evaluation-report";paperUrl?:string;markingSchemeUrl?:string;sourceName:string;sourceUrl:string;updatedAt:string};
const allowed=new Set(subjects.map(s=>s.slug));
const displayYears:Record<number,string>={2025:"2025 (2026)",2024:"2024 (2025)",2023:"2023 (2024)",2022:"2022 (2024)",2021:"2021 (2022)",2020:"2020",2019:"2019",2018:"2018",2017:"2017",2016:"2016",2015:"2015"};
const subjectName=(slug:string)=>subjects.find(s=>s.slug===slug)?.si||slug;
const filteredPapers=generatedPapers.filter(item=>allowed.has(item.subject as (typeof subjects)[number]["slug"]));
const filteredAnswers=generatedAnswers.filter(item=>allowed.has(item.subject as (typeof subjects)[number]["slug"]));
const answers=new Map(filteredAnswers.map(item=>[item.id,item]));
const withPapers:Paper[]=filteredPapers.map(item=>{const answer=answers.get(item.id);return{...item,medium:item.medium as Medium,subjectSi:subjectName(item.subject),paperType:"official",hasMarkingScheme:Boolean(answer),answerType:answer?.answerType as Paper["answerType"],markingSchemeUrl:answer?.markingSchemeUrl,updatedAt:answer&&answer.updatedAt>item.updatedAt?answer.updatedAt:item.updatedAt}});
const paperIds=new Set(filteredPapers.map(item=>item.id));
const answerOnly:Paper[]=filteredAnswers.filter(item=>!paperIds.has(item.id)).map(item=>({...item,medium:item.medium as Medium,answerType:item.answerType as Paper["answerType"],subjectSi:subjectName(item.subject),displayYear:displayYears[item.year]||String(item.year),paperType:"official",hasMarkingScheme:true}));
export const papers:Paper[]=[...withPapers,...answerOnly].sort((a,b)=>b.year-a.year||a.subject.localeCompare(b.subject)||a.medium.localeCompare(b.medium));
export const availableYears=[...new Set(papers.map(p=>p.year))].sort((a,b)=>b-a);
export const mediumNames:Record<Medium,string>={sinhala:"සිංහල මාධ්‍ය",english:"English Medium",tamil:"தமிழ் மொழி"};
export function getSubject(slug:string){return subjects.find(s=>s.slug===slug)}
export function getPaper(subject:string,year:number,medium:string){return papers.find(p=>p.subject===subject&&p.year===year&&p.medium===medium)}
export function paperPath(p:Paper){return `/ol/${p.subject}/${p.year}/${p.medium}`}
export function searchIndex(list:Paper[]=papers){return list.map(p=>({id:p.id,subject:p.subject,subjectSi:p.subjectSi,year:p.year,displayYear:p.displayYear,medium:p.medium,hasPaper:Boolean(p.paperUrl),hasAnswer:Boolean(p.markingSchemeUrl),answerType:p.answerType}))}
export function answerLabel(p:Paper){return p.answerType==="evaluation-report"?"Evaluation Report / Answers":"Marking Scheme / Answers"}
export function resourceLabel(p:Paper){return p.paperUrl?"ප්‍රශ්න පත්‍රය":answerLabel(p)}
