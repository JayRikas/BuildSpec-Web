# BuildSpec website instructions

## Project
This repository contains only the BuildSpec public website. The mobile application is separate. Do not search, modify or reference files from its repository. Everything required here lives in D:\BuildSpec-Web.

## Brand
- Product: BuildSpec — Project Car Garage
- Tagline: Your Build. Your Spec.
- Philosophy: Respect the passion, not the brand or style.
- Canonical domain: https://buildspec.eu
- Support: support@buildspec.eu

## Official assets
Sources: `brand-assets/BuildSpec new.png` and `brand-assets/BuildSpec icon.png`.
Keep originals unchanged. Do not redesign or replace them without explicit instruction. Run `node scripts/brand.mjs` to derive production assets in `public/brand`.

## Product status
Closed beta. Never invent availability, user counts, reviews, testimonials, compatibility guarantees or release dates. AI assists and is not guaranteed accurate. No app-store download buttons. Genuine product screenshots are preferred; do not substitute fictional app UI.

## Design
Maintain dark, premium, technical automotive styling, restrained official blue accents, system typography and editorial spacing. Avoid generic SaaS, crypto, gaming and racing clichés. No stock, generated or random vehicle photographs.

## Engineering
Vite + React + TypeScript + custom CSS. Keep dependencies lightweight. Prioritize accessibility, responsiveness, performance and maintainability. No backend or tracking unless explicitly requested. Test 1440, 1024, 768, 390 and 360px. Respect reduced motion. Run lint, typecheck and build before delivery. Legal routes are emitted as static HTML entry points by scripts/routes.mjs.

## Delivery
Do not automatically deploy, push a remote, modify DNS or access the mobile application. Keep the project provider independent.

## Real product UI rule
Genuine BuildSpec screenshots are authoritative representations of the app. Do not fabricate or redesign BuildSpec application interfaces for public website use unless explicitly instructed. Prefer genuine screenshots for product demonstrations. Sources live in `app-screenshots/`; optimized production derivatives live in `public/screenshots/`. Keep originals unchanged and preserve all app UI. Use `ProductScreenshot` for consistent framing, alt text, responsive sizing and loading. Regenerate derivatives with `node scripts/screenshots.mjs`.

