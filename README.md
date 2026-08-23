# O/L Past Papers

SEO-first, Sinhala-first Next.js platform for Sri Lankan G.C.E. Ordinary Level students.

## Stack

- Next.js 16 App Router
- React 19 + TypeScript
- Static generation for subject and paper pages
- Client-side catalogue search
- Zero-budget deployment target: Vercel

## Included

- O/L-only responsive homepage
- Twenty-six curriculum-focused subject hubs grouped as compulsory, religion, and Groups I–III
- Dedicated `/ol-past-papers/` and `/ol-marking-schemes/` SEO hubs
- Static SEO page for every paper record
- Verified Department of Examinations marking-scheme links for selected 2019/2020 resources
- Search by query, subject, year, medium and resource type
- Dedicated SEO year collections at `/ol-past-papers/[year]/`
- Subject availability tables across Sinhala, English and Tamil
- Complete-set, paper-only and answers-only status badges
- Previous/next year, medium and same-year internal navigation
- AI-answer-friendly factual summaries and visible FAQ sections
- RSS feed at `/feed.xml`
- Three original Sinhala O/L study guides with Article schema
- Guide index and guide-to-paper internal linking
- Dynamic metadata and canonical URLs
- `DigitalDocument`, `WebSite`, `Organization` and breadcrumb structured data
- Generated `/sitemap.xml` and `/robots.txt`
- Related-paper internal linking
- About, copyright/takedown, contact and custom 404 pages
- Security headers
- Installable web manifest, SVG icon and generated Open Graph artwork
- Optional Search Console verification and GA4 integration through environment variables
- `/llms.txt` discovery summary for AI systems
- Privacy and terms pages
- Official-source attribution with no fake PDF links

## Development

```bash
npm install
npm run dev
```

Build verification:

```bash
npm run build
```

## Content management

Official question-paper records are synchronized from the Department of Examinations public catalogue API into `data/official-papers.generated.json`:

```bash
npm run sync:papers
```

Official marking schemes are synchronized separately into `data/official-answers.generated.json`:

```bash
npm run sync:answers
# or refresh both catalogues
npm run sync:content
```

The curriculum-focused catalogue contains 279 verified question-paper links across 2015–2019 and 2022–2025, plus 211 verified marking-scheme and evaluation-report links across 2010–2022. These combine into 416 unique subject/year/medium resource pages across 26 subject variants. Stale upstream links and duplicate-file records are tested and skipped automatically. Subject pages, detail pages, metadata and sitemap entries are generated from these sources. Run `npm run validate:content` to recheck every official URL before deployment.

## Free launch

1. Create a free GitHub repository and push this project.
2. Import it into Vercel.
3. Request `olpastpapers` as the project name; the expected URL is `olpastpapers.vercel.app` if available.
4. Replace the canonical base URL in `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and both dynamic routes if the actual deployment URL differs.
5. Verify the site in Google Search Console and submit `/sitemap.xml`.
6. Add analytics only after publishing a privacy notice.

## Next implementation phase

- Verify and add official Mathematics and Science PDF/source links
- Add newly released official years and media through the review-first sync workflow
- Replace the generated-file catalogue with Supabase only when the static workflow becomes difficult to maintain
- Add Open Graph artwork for subject and year collections
- Deploy to Vercel and connect Search Console
