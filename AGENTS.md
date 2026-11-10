# Ifleur storefront (figma-make-app)

React 19 + Vite 8 + Tailwind CSS v4 single-page floral-shop prototype running inside Figma Make. UI copy is French; a few FAQ entries are bilingual.

## Commands

- The Vite dev server is **already running** on `$PORT` (default 8443, `strictPort`) with HMR. Do not start it manually.
- Use pnpm (`.mise.toml` pins Node 22 / pnpm 10): `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm format` (oxfmt, no config file).
- No test or lint scripts. `vite build` does not typecheck; verify with `pnpm exec tsc --noEmit` (strict mode).
- `.figma/make/*` are platform-managed wrappers (install/dev/format/deploy). Deploy uses the `figma` CLI; prefer the package scripts above for local work. Production deploy is Vercel (`vercel.json`: `pnpm install --frozen-lockfile` → `pnpm build`, output `dist`).

## Architecture

- `src/App.tsx` is a small shell: it holds `page`, `cart`, `toast`, `menu` state and `go()`, then renders the matching page. Navigation is the `Page` union in `src/types.ts` plus that render switch — adding a page means updating both. Imports conventionally use the `@/` alias.
- `login`, `admin`, and `confirmation` render as early returns with no header/footer. Every other page shares `Header`/`Footer` from `App.tsx` and renders its own `<main>`. The `delivery`, `legal`, and `privacy` pages are the same `InformationPage` component with a `type` prop.
- Page components live in `src/pages/`, shared UI in `src/components/`, shared types in `src/types.ts`, catalog/photos in `src/data/`.
- Login submit just navigates to admin (no auth); the contact form just calls `preventDefault`.
- `src/data/images.ts` resolves local photos through `import.meta.glob('/src/imports/*')` and `photo(name)`, which ignores accents and extensions and prefers modern formats when duplicates share a basename. Put photos at the top level of `src/imports/`; subfolders such as `src/imports/originaux/` are excluded. Reference them with `photo("name-with-or-without-extension")`; a missing name throws at runtime. `About.tsx` also goes through `photo()`.
- `src/config/config.json` is the source of truth for shop settings (Ariary prices, WhatsApp number, delivery zones with fees, bilingual FAQ); it is imported by `src/data/catalog.ts`, `src/pages/Checkout.tsx`, `src/components/FAQ.tsx`, and `src/pages/InformationPage.tsx`. Format prices with `formatPrice()` from `src/data/format.ts` ("X Ar"); checkout totals add the selected delivery zone's fee (`fee: null` in "Autre / hors zone" means on-quote). Everything is client-side and in-memory: reload resets the cart; checkout, login/admin, contact, and confirmation remain demo-only — no backend, auth, or persistence.

## Styling

- Tailwind v4 via `@tailwindcss/vite`; there is no Tailwind/PostCSS config file. Theme tokens live in `@theme` in `src/index.css` (ivory, coal, sage, blush, sand; Italiana + DM Sans from Google Fonts).
- Most styling is hand-written CSS classes in `src/index.css` (`.hero`, `.productCard`, `.admin`, ...), not utility-first. JSX mixes those with Tailwind utilities and arbitrary variants like `[&_.productImage]:!h-[32vw]`. Add reusable styling to `src/index.css` and follow existing class names rather than rewriting to utilities.
- Keep global element defaults inside `@layer base`; unlayered CSS overrides all Tailwind utilities.
- `index.html` contains `<!-- figma:... -->` slots filled by a Vite plugin from `.figma/make/site.json` (title, lang, description, robots, favicon, custom scripts). Edit site metadata there, not by hardcoding tags; the site is currently `noindex`.
- Code changes use French markers `// NOUVEAU :` and `// MODIFIÉ :`; keep that convention.
