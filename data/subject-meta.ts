export type SubjectGroup="core"|"group-1"|"group-2"|"group-3";
export const subjects=[
 {slug:"sinhala-language",en:"Sinhala Language & Literature",si:"සිංහල භාෂාව හා සාහිත්‍යය",mark:"සි",color:"peach",group:"core"},
 {slug:"tamil-language",en:"Tamil Language & Literature",si:"දෙමළ භාෂාව හා සාහිත්‍යය",mark:"த",color:"peach",group:"core"},
 {slug:"mathematics",en:"Mathematics",si:"ගණිතය",mark:"∑",color:"violet",group:"core"},
 {slug:"science",en:"Science",si:"විද්‍යාව",mark:"⚗",color:"peach",group:"core"},
 {slug:"history",en:"History",si:"ඉතිහාසය",mark:"ඉ",color:"sky",group:"core"},
 {slug:"english",en:"English Language",si:"ඉංග්‍රීසි භාෂාව",mark:"A",color:"mint",group:"core"},
 {slug:"buddhism",en:"Buddhism",si:"බුද්ධ ධර්මය",mark:"ධ",color:"violet",group:"core"},
 {slug:"catholicism",en:"Catholicism",si:"කතෝලික ධර්මය",mark:"†",color:"peach",group:"core"},
 {slug:"christianity",en:"Christianity",si:"ක්‍රිස්තියානි ධර්මය",mark:"✦",color:"sky",group:"core"},
 {slug:"islam",en:"Islam",si:"ඉස්ලාම් ධර්මය",mark:"☾",color:"violet",group:"core"},
 {slug:"saivanery",en:"Saivanery",si:"ශෛව නෙරි",mark:"S",color:"mint",group:"core"},
 {slug:"business-accounting",en:"Business & Accounting Studies",si:"ව්‍යාපාර හා ගිණුම්කරණ අධ්‍යයනය",mark:"%",color:"mint",group:"group-1"},
 {slug:"civic-education",en:"Civic Education",si:"පුරවැසි අධ්‍යාපනය",mark:"C",color:"mint",group:"group-1"},
 {slug:"geography",en:"Geography",si:"භූගෝල විද්‍යාව",mark:"◎",color:"sky",group:"group-1"},
 {slug:"art",en:"Art",si:"චිත්‍ර කලාව",mark:"✎",color:"peach",group:"group-2"},
 {slug:"music-oriental",en:"Music (Oriental)",si:"පෙරදිග සංගීතය",mark:"♫",color:"violet",group:"group-2"},
 {slug:"music-western",en:"Music (Western)",si:"බටහිර සංගීතය",mark:"♪",color:"sky",group:"group-2"},
 {slug:"music-carnatic",en:"Music (Carnatic)",si:"කර්ණාටක සංගීතය",mark:"♬",color:"peach",group:"group-2"},
 {slug:"dancing-oriental",en:"Dancing (Oriental)",si:"පෙරදිග නර්තනය",mark:"D",color:"mint",group:"group-2"},
 {slug:"dancing-bharata",en:"Dancing (Bharata)",si:"භරත නාට්‍යම්",mark:"B",color:"violet",group:"group-2"},
 {slug:"drama-sinhala",en:"Drama & Theatre (Sinhala)",si:"සිංහල නාට්‍ය හා රංග කලාව",mark:"නා",color:"sky",group:"group-2"},
 {slug:"drama-tamil",en:"Drama & Theatre (Tamil)",si:"දෙමළ නාට්‍ය හා රංග කලාව",mark:"T",color:"peach",group:"group-2"},
 {slug:"drama-english",en:"Drama & Theatre (English)",si:"ඉංග්‍රීසි නාට්‍ය හා රංග කලාව",mark:"E",color:"peach",group:"group-2"},
 {slug:"ict",en:"Information & Communication Technology",si:"තොරතුරු හා සන්නිවේදන තාක්ෂණය",mark:"</>",color:"violet",group:"group-3"},
 {slug:"agriculture-food-technology",en:"Agriculture & Food Technology",si:"කෘෂි හා ආහාර තාක්ෂණය",mark:"♧",color:"mint",group:"group-3"},
 {slug:"home-economics",en:"Home Economics",si:"ගෘහ ආර්ථික විද්‍යාව",mark:"⌂",color:"peach",group:"group-3"}
] as const;

export const subjectGroups=[
 {id:"core",title:"ප්‍රධාන අනිවාර්ය විෂයයන්",description:"සිංහල / දෙමළ, ගණිතය, විද්‍යාව, ඉතිහාසය, ඉංග්‍රීසි සහ ආගම"},
 {id:"group-1",title:"I වන කාණ්ඩය",description:"සමාජයීය විද්‍යා විෂයයන්"},
 {id:"group-2",title:"II වන කාණ්ඩය",description:"සෞන්දර්ය විෂයයන්"},
 {id:"group-3",title:"III වන කාණ්ඩය",description:"තාක්ෂණික විෂයයන්"}
] as const;
