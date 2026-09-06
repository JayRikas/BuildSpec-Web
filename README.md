# BuildSpec-Web

Official public website for **BuildSpec — Project Car Garage**, currently in closed beta. This standalone repository has no dependency on the mobile application.

## Stack and structure
Vite, React, TypeScript and custom CSS; no backend, analytics, cookies or external fonts.

- `src/components`: shared header/footer and reusable ProductScreenshot presentation
- `src/sections/Landing.tsx`: landing-page sections
- `src/pages/LegalPage.tsx`: pre-release privacy and terms placeholders
- `src/styles/site.css`: brand tokens, layout and responsive styles
- `public/brand`: optimized official artwork
- `brand-assets`: untouched source artwork
- `scripts/brand.mjs`: repeatable brand conversion
- `scripts/routes.mjs`: static legal entry points after build
- `scripts/verify.mjs`: responsive browser checks (requires Microsoft Edge)

## Windows / PowerShell
Use Node.js 22.12+ or a supported newer release.

```powershell
Set-Location D:\BuildSpec-Web
npm install
npm run dev
```

Open the local URL printed by Vite. For verification and production:

```powershell
npm run lint
npm run typecheck
npm run build
node scripts/verify.mjs
```

Browser checks require the development server at http://127.0.0.1:5173. They create ignored screenshots under `qa/`. Production output is `dist/`. Runtime dependencies are React and React DOM; image and browser tooling are development-only.

## Branding
`BuildSpec new.png` is the official logo source (1080 × 1080 RGBA); `BuildSpec icon.png` is the official favicon source (1024 × 1024 RGBA). Both have transparent padding. Their silver-white and blue artwork suits a dark background. The logo is visually wide within its square source canvas.

```powershell
node scripts/brand.mjs
```

The conversion trims transparent outside padding without altering artwork proportions or colours. It creates a 640px-wide WebP logo, a 48px PNG favicon and a 180px PNG touch icon. Source originals stay unchanged. To update branding, replace the intended source file only with approved artwork, rerun conversion, inspect it against the dark background and rebuild.

## Content and SEO
Homepage metadata is in `index.html`. Legal title, description and canonical/Open Graph URL changes are generated in `scripts/routes.mjs`. Robots and sitemap are under `public/`. No fabricated social screenshot is used. Real app screenshots use `ProductScreenshot` with contextual alt text, uncropped UI and stable dimensions. Originals in `app-screenshots/` remain unchanged. Run `node scripts/screenshots.mjs` to generate 400px and 800px WebP derivatives (quality 92) in `public/screenshots/`. The hero loads eagerly; below-fold screenshots load lazily.

Privacy and terms are clearly labelled placeholders, not finalized legal documents. Review and supply final legal copy before public product release.

## Static deployment
Run `npm run build` and upload the **contents of `dist/`** to a static host. No environment variables or server runtime are required. The build emits `index.html`, `privacy/index.html` and `terms/index.html`. Configure clean directory URLs so `/privacy` and `/terms` serve those files (a trailing-slash redirect is fine). No SPA fallback is needed for the three supported routes. Configure the host's normal 404 handling for unknown URLs.

After local approval, create a static deployment on the selected host, use `npm run build` as its build command and `dist` as its output directory, then configure buildspec.eu and HTTPS following that provider's domain instructions. DNS and deployment have deliberately not been changed. No remote has been configured or pushed.


### Screenshot selection
All eight source images were inspected. None are cropped in production: useful navigation, records and actions run close to the edges. No screenshot UI, records or text were edited.

| Source | Original pixels | Screen / placement |
| --- | --- | --- |
| 01-garage.png | 1036 × 2047 | My Garage vehicle cards; Garage showcase |
| 02-car-overview.png | 1030 × 2046 | BMW M4 overview, actions and progress; hero |
| 03-factory-spec.png | 1038 × 2049 | Identity, engine and drivetrain; Factory Spec feature |
| 04-timeline.png | 1024 × 2047 | Build Journal with service and modification history; Garage supporting view |
| 05-expenses.png | 1026 × 2049 | Build Investment, filters and recent expenses; omitted to avoid another dense record screen |
| 06-parking-lot.png | 1028 × 2046 | Public feed, Subaru build and Clean reaction; Parking Lot |
| 07-public-build1.png | 1030 × 2048 | Public-build specification and highlights; omitted because it starts mid-profile and the feed provides stronger context |
| 08-shareable-card.png | 834 × 1482 | Branded BMW M4 sharing card; omitted to keep this pass focused on the core app screens |

Selected images have 400px and 800px-wide WebP derivatives at quality 92. Aspect ratios are preserved; resulting heights range from 790–800px and 1579–1599px. Original PNGs are untouched. Figures show full images in simple frames without added device hardware or fabricated app controls. Below-fold images load lazily; the hero is eager with high fetch priority.
