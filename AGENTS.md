# Ifleur storefront (figma-make-app)

React 19 + Vite 8 + Tailwind CSS v4 single-page floral-shop prototype running inside Figma Make. UI copy is French; a few FAQ entries are bilingual.

## Commands

- The Vite dev server is **already running** on `$PORT` (default 8443, `strictPort`) with HMR. Do not start it manually.
- Use pnpm (`.mise.toml` pins Node 22 / pnpm 10): `pnpm dev`, `pnpm build`, `pnpm preview`, `pnpm format` (oxfmt, no config file).
- No test or lint scripts. `vite build` does not typecheck; verify with `pnpm exec tsc --noEmit` (strict mode).
- `.figma/make/*` are platform-managed wrappers (install/dev/format/deploy). Deploy uses the `figma` CLI; prefer the package scripts above for local work.

## Architecture

- `src/App.tsx` is a small shell: it holds `page`, `cart`, `toast`, `menu` state and `go()`, then renders the matching page. Navigation is the `Page` union in `src/types.ts` plus that render switch — adding a page means updating both.
- `login`, `admin`, and `confirmation` render as early returns with no header/footer. Every other page shares `Header`/`Footer` from `App.tsx` and renders its own `<main>`.
- Page components live in `src/pages/`, shared UI in `src/components/`, shared types in `src/types.ts`, catalog/photos in `src/data/`.
- Everything is client-side and in-memory: reload resets the cart. Checkout, login/admin, contact, and confirmation are demo-only — no backend, auth, payment, or persistence. Login submit just navigates to admin; the contact form calls `preventDefault`.
- `src/data/images.ts` resolves local photos through `import.meta.glob('/src/imports/*')` and `photo(name)`, which ignores accents and extensions and prefers modern formats when duplicates share a basename. Put photos at the top level of `src/imports/`; subfolders such as `src/imports/originaux/` are excluded. Reference them with `photo("name-with-or-without-extension")`; a missing name throws at runtime. `About.tsx` also goes through `photo()`.
- `src/config/config.json` holds intended shop settings (Ariary prices, WhatsApp number, delivery zones, bilingual FAQ) but is **not imported anywhere yet**. Current prices, FAQ, and contact copy are hardcoded in `src/data/catalog.ts`, `src/components/FAQ.tsx`, and pages; catalog prices are in EUR and checkout adds a flat 9 € demo fee. Reconcile these before treating `config.json` as the source of truth.

## Styling

- Tailwind v4 via `@tailwindcss/vite`; there is no Tailwind/PostCSS config file. Theme tokens live in `@theme` in `src/index.css` (ivory, coal, sage, blush, sand; Italiana + DM Sans from Google Fonts).
- Most styling is hand-written CSS classes in `src/index.css` (`.hero`, `.productCard`, `.admin`, ...), not utility-first. JSX mixes those with Tailwind utilities and arbitrary variants like `[&_.productImage]:!h-[32vw]`. Add reusable styling to `src/index.css` and follow existing class names rather than rewriting to utilities.
- Keep global element defaults inside `@layer base`; unlayered CSS overrides all Tailwind utilities.
- `index.html` contains `<!-- figma:... -->` slots filled by a Vite plugin from `.figma/make/site.json` (title, lang, description, robots, favicon, custom scripts). Edit site metadata there, not by hardcoding tags; the site is currently `noindex`.
- Code changes use French markers `// NOUVEAU :` and `// MODIFIÉ :`; keep that convention.
