import type { MetadataRoute } from "next";
import { availableYears, papers, paperPath, subjects } from "@/data/papers";
import { guides } from "@/data/guides";
import { site } from "@/lib/site";
const base=site.url;
export default function sitemap():MetadataRoute.Sitemap{
 return [
  {url:`${base}/`,lastModified:new Date(),changeFrequency:"daily",priority:1},
  {url:`${base}/ol-past-papers/`,lastModified:new Date(),changeFrequency:"daily",priority:.95},
  {url:`${base}/ol-marking-schemes/`,lastModified:new Date(),changeFrequency:"weekly",priority:.9},
  {url:`${base}/guides/`,lastModified:new Date(),changeFrequency:"weekly",priority:.8},
  {url:`${base}/about/`,lastModified:new Date(),changeFrequency:"yearly",priority:.4},
  {url:`${base}/privacy/`,lastModified:new Date(),changeFrequency:"yearly",priority:.2},
  {url:`${base}/terms/`,lastModified:new Date(),changeFrequency:"yearly",priority:.2},
  {url:`${base}/copyright/`,lastModified:new Date(),changeFrequency:"yearly",priority:.3},
  ...availableYears.map(year=>({url:`${base}/ol-past-papers/${year}/`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:.9})),
  ...guides.map(g=>({url:`${base}/guides/${g.slug}/`,lastModified:new Date(g.updatedAt),changeFrequency:"monthly" as const,priority:.7})),
  ...subjects.map(s=>({url:`${base}/ol/${s.slug}/`,lastModified:new Date(),changeFrequency:"weekly" as const,priority:.9})),
  ...papers.map(p=>({url:`${base}${paperPath(p)}/`,lastModified:new Date(p.updatedAt),changeFrequency:"monthly" as const,priority:.8}))
 ];
}
