import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";
import Analytics from "@/components/Analytics";

const siteUrl = site.url;
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "O/L Past Papers & Marking Schemes | Sri Lanka", template: "%s | O/L Past Papers" },
  description: "ශ්‍රී ලංකා G.C.E. O/L නිල පසුගිය විභාග ප්‍රශ්න පත්‍ර සහ marking schemes සිංහල, දෙමළ සහ English මාධ්‍යයෙන් නොමිලේ ලබාගන්න.",
  applicationName: "O/L Past Papers",
  manifest: "/manifest.webmanifest",
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  category: "education",
  alternates: { canonical: "/" },
  openGraph: { type:"website",locale:"si_LK",siteName:"O/L Past Papers",title:"O/L Past Papers & Marking Schemes | Sri Lanka",description:"නිල O/L past papers සහ marking schemes — ඉක්මනින්, නොමිලේ.",images:[{url:"/opengraph-image/",width:1200,height:630,alt:"O/L Past Papers and official answers"}] },
  twitter: { card:"summary_large_image",title:"O/L Past Papers",description:"Sri Lankan O/L papers and marking schemes.",images:["/opengraph-image/"] },
  robots: { index:true,follow:true,googleBot:{index:true,follow:true,"max-image-preview":"large","max-snippet":-1} }
};
export const viewport: Viewport = { width:"device-width",initialScale:1,themeColor:"#5d49d6" };

const websiteJsonLd = {
  "@context":"https://schema.org","@type":"WebSite",name:"O/L Past Papers",url:siteUrl,inLanguage:["si","en","ta"]
};
const orgJsonLd = {"@context":"https://schema.org","@type":"Organization",name:"O/L Past Papers",url:siteUrl,areaServed:"LK"};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="si"><body>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(websiteJsonLd)}} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(orgJsonLd)}} />
    <header className="header"><div className="shell nav">
      <Link className="brand" href="/"><span className="brandIcon"><i/><i/><i/></span><span>O/L Past Papers</span><b>.</b></Link>
      <nav><Link href="/">මුල් පිටුව</Link><Link href="/ol-past-papers/">Past Papers</Link><Link href="/ol-marking-schemes/">Marking Schemes</Link><Link href="/guides/">Study Guides</Link></nav>
      <Link className="navCta" href="/#search">⌕ <span>පේපර් සොයන්න</span></Link>
    </div></header>
    <main>{children}</main>
    <footer><div className="shell footerGrid"><div><Link className="brand light" href="/"><span className="brandIcon"><i/><i/><i/></span><span>O/L Past Papers</span><b>.</b></Link><p>O/L කරන සෑම ශ්‍රී ලාංකික සිසුවෙකුටම<br/>නිල අධ්‍යාපනික සම්පත් නොමිලේ.</p></div><div><strong>විෂයන්</strong><Link href="/ol/mathematics/">ගණිතය</Link><Link href="/ol/science/">විද්‍යාව</Link><Link href="/ol/english/">English</Link></div><div><strong>වැදගත්</strong><Link href="/about/">අප ගැන</Link><Link href="/copyright/">Copyright</Link><Link href="/contact/">සම්බන්ධ වන්න</Link></div></div><div className="shell footBottom"><span>© 2026 O/L Past Papers · අදාළ සම්පත්වල හිමිකම මුල් හිමිකරුවන් සතුය.</span><div><Link href="/privacy/">Privacy</Link><Link href="/terms/">Terms</Link></div></div></footer>
    <Analytics/>
  </body></html>
}
