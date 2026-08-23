# Production deployment

## 1. GitHub

Create an empty repository named `olpastpapers`, then run from this project directory:

```bash
git init
git add .
git commit -m "Initial O/L Past Papers production release"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/olpastpapers.git
git push -u origin main
```

## 2. Vercel

1. Sign in to Vercel with GitHub.
2. Select **Add New → Project** and import `olpastpapers`.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Add `NEXT_PUBLIC_SITE_URL` with the exact production origin assigned by Vercel, without a trailing slash.
6. Deploy.
7. If Vercel gives a URL other than `https://olpastpapers.vercel.app`, update the environment variable and redeploy.

## 3. Google Search Console

1. Add a URL-prefix property using the final production origin.
2. Choose **HTML tag** verification.
3. Copy only the verification token into `GOOGLE_SITE_VERIFICATION` in Vercel.
4. Redeploy and click Verify.
5. Submit `https://YOUR_ORIGIN/sitemap.xml`.
6. Inspect the homepage, `/ol-past-papers/`, `/ol-marking-schemes/`, one subject page and one resource page.

## 4. Optional analytics

Create a GA4 web data stream and set its measurement id as `NEXT_PUBLIC_GA_ID`. Analytics code is emitted only when this variable is present. The privacy policy is available at `/privacy/`.

## 5. Release check

```bash
npm run check
```

The release should have zero broken published links, zero SEO errors, zero TypeScript errors and a successful production build.

## 6. Post-launch checks

- Confirm `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`, `/opengraph-image` and `/llms.txt` return HTTP 200.
- Confirm non-trailing-slash URLs redirect once to their canonical trailing-slash URL.
- Review Search Console indexing weekly.
- Merge automated content-sync pull requests only after reviewing changed official resources.
