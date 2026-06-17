# YIS App (yis-app)

Educational investing app for the **West Point High School Young Investors Society** —
~79 finance concepts across 6 modules, interactive simulators, and a "Bull or Bear"
quiz game. Sponsor-built (PwC consultant) to complement instructor Agnew's 5-lecture
curriculum. React + Vite SPA, deployed on Vercel. No backend except one news API route.

## Live / infra
- **Live:** https://wpyis.vercel.app — Vercel hosting.
- **Repo:** HMSLLC6/yis-app (https://github.com/HMSLLC6/yis-app). Org default is private repos.
- **GA4:** `G-RXXPE2X0C8` (gtag in `index.html`).
- **Stack:** React 19 + React Router 7 + Recharts, bundled by Vite 8. No TypeScript.
- **School colors:** royal blue `#1b2a7d` + orange `#e8762a` (see `src/theme.js`).

## Build / deploy
- `npm run dev` — Vite dev server.
- `npm run build` — production build to `dist/`.
- `npm run preview` — preview the built bundle.
- `npm run lint` — ESLint.
- **Deploy:** push to `main`; Vercel auto-deploys (commit author email must match the
  Vercel account email or deploys fail silently).
- **Offline demo:** `npm run build` then `node offline-server.cjs` → http://localhost:3333
  (serves `dist/`, swaps Google Fonts for local, stubs `/api/news` from `dist/news-cache.json`,
  disables GA4).

## App structure
- **Pages** (`src/pages/`): Home, Learn (+`/learn/:moduleId`), ConceptDetail
  (`/concept/:conceptId`), News, Simulator, Game, Glossary (the "Search" tab). Routing in
  `src/App.jsx`; `*` redirects home.
- **Content** (`src/data/`): `concepts.js` (79 concepts, 6 modules, connected-concept links),
  `questions.js` (127 Bull-or-Bear questions), `sp500.js` (historical S&P returns for sims).
- **Simulators:** Birthday Investor (1950–present S&P), Future Builder (compound projector),
  Buffett Bet (index vs hedge funds).
- **News:** Vercel API route `api/news.js` — 7 free RSS sources, 15-min cache, OG-image cards.
- **Progress:** localStorage; concepts auto-mark read after 3s; per-module progress bars.

## Key conventions / gotchas
- **No emojis** in UI. **All body text white** — only colored accents (left-border accents,
  not filled boxes). **Mobile-first**, tested down to 320px.
- **Do NOT re-add the obfuscator.** `javascript-obfuscator` / `rollup-plugin-obfuscator` are
  in devDependencies but are **not wired into `vite.config.js`** — they silently timed out /
  blocked Vercel builds. Console stripping relies on Vite minification only.
- Light client-side anti-inspection (right-click + F12/devtools shortcuts disabled) — cosmetic,
  not security.
- Simulator math: add contributions monthly but **compound returns annually** (matches all four
  sims). A 2026-04-02 fix corrected Future Builder, which had been monthly-compounding annual rates.
- Module 6 (Careers in Finance) "Management Consulting" card reflects the sponsor's real PwC role
  (risk, compliance, M&A due diligence). Curriculum source: 5 Agnew lecture PDFs in `~/Desktop/YIS/`.

## TODOs
- None tracked.
