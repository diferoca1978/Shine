# docs/brief/ — client brief drop zone

> **Note for this repo**: shineagencia.com was already fully built before this
> harness workflow was adopted, so this folder was never used to build the
> current site — there is no `arquitectura-informacion.md` / `brand.md` here
> and none is expected. It's kept for a possible future large-scope content
> overhaul (e.g. a full rebrand or a new service line); until then, ordinary
> feature work should go straight through `feature_list.json` (see
> `AGENTS.md` § "The harness"), not through this ingestion flow.

Put the client brief here, then tell Claude Code: **"ingiere el brief"**.

## What goes here

Both files below are **mandatory** — the harness must always ingest both.
Never skip or omit either one, even if a request only mentions one of them.

- `arquitectura-informacion.md` — site architecture (sitemap, URLs, nav/footer
  spec) + copy per page and section. This is the **content source of truth**.
- `brand.md` — brand input: color palette (hex/oklch), fonts, logo, photos,
  and (optional) **animation strategy** — say explicitly if this client needs
  GSAP (scroll/timeline-heavy animation) or is fine with vanilla (lightweight
  Tailwind transitions, no animation library). If you don't state one, the
  agent will ask before building the first animated section rather than
  assume the scaffold's GSAP default — see `AGENTS.md` § "Animation
  strategy".

If either file is missing, **stop and ask for it** before ingesting — do not
proceed with only one of the two, and do not silently invent brand or content
data. Note the missing file in `client-gaps.md` if the user explicitly
confirms it isn't available yet.

## What the harness does with it

1. Reads `arquitectura-informacion.md` and populates `src/config/*` (`services`,
   `faqs`, `authorBio`, `COMPANY_INFO`) + `src/utils/navigation.ts`. Reads
   `brand.md` and populates `src/styles/global.css` (`@theme` tokens) + the
   Astro Fonts API config.
2. Generates `feature_list.json` — one feature per section/page.
3. Writes `client-gaps.md` at the repo root — the short list of things the
   brief does NOT cover (phone, email, brand palette, fonts, logo, photos,
   animation strategy if `brand.md` didn't state one).

The content brief (`arquitectura-informacion.md`) does **not** carry brand
colors/fonts — those come from `brand.md` and land only in
`src/styles/global.css` (`@theme`).

> This folder ships **empty** in the scaffold. The brief is attached per client
> after cloning.
