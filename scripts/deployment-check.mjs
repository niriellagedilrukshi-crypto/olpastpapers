import {access,readFile} from "node:fs/promises";
const required=["package-lock.json","vercel.json","app/sitemap.ts","app/robots.ts","data/official-papers.generated.json","data/official-answers.generated.json"];
let errors=0;for(const file of required){try{await access(new URL(`../${file}`,import.meta.url))}catch{console.error("Missing deployment file:",file);errors++}}
const envUrl=process.env.NEXT_PUBLIC_SITE_URL||"https://olpastpapers.vercel.app";
try{const url=new URL(envUrl);if(url.protocol!=="https:"){console.error("Production URL must use HTTPS");errors++}if(envUrl.endsWith("/")){console.error("NEXT_PUBLIC_SITE_URL must not end with /");errors++}}catch{console.error("Invalid NEXT_PUBLIC_SITE_URL");errors++}
const pkg=JSON.parse(await readFile(new URL("../package.json",import.meta.url),"utf8"));if(!pkg.scripts?.build||!pkg.scripts?.start){console.error("Missing production scripts");errors++}
if(!process.env.GOOGLE_SITE_VERIFICATION)console.warn("Optional: GOOGLE_SITE_VERIFICATION is not set yet.");
if(!process.env.NEXT_PUBLIC_GA_ID)console.warn("Optional: NEXT_PUBLIC_GA_ID is not set yet.");
console.log(`Deployment check finished for ${envUrl} with ${errors} errors.`);if(errors)process.exit(1);
