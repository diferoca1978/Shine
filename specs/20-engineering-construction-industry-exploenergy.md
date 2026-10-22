# 20 — engineering-construction industry and Exploenergy entry

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Add a 4th `industry` value, `ingenieria-construccion` (label "Ingeniería y
construcción"), to the `works` collection, and publish Exploenergy
(https://exploenergy.co/, a WordPress site redesigned and SEO-optimized,
deployed in October 2026) as its first project. Exploenergy is a blasting
and controlled-demolition contractor for mining and infrastructure; none of
`legal`, `salud` or `tecnologia` describes it.

## Scope

**In:**

- `src/content.config.ts`: `industry` gains `"ingenieria-construccion"`.
- `src/utils/projects.ts`: `INDUSTRY_ORDER` gains the value (last, so the
  existing three industries keep their order) and `INDUSTRY_LABELS` gains
  `"Ingeniería y construcción"`.
- New `src/content/works/exploenergy.md`.
- New `src/content/works/img/exploenergy.webp`, converted from a fresh
  screenshot of the live home page.
- `AGENTS.md` and `feature_list.json` counts updated (13 → 14), see Files
  affected.

**Out:**

- Any change to the `/proyectos` components (`ProjectsAccordion`,
  `ProjectDetail`, `ProjectsHero`), the accordion GSAP script, or
  `[slug].astro`. They derive groups and labels from `INDUSTRY_ORDER` /
  `INDUSTRY_LABELS`; this spec only checks that they render the new group
  correctly. If the long label breaks the sidebar layout, that is a
  separate fix, not part of this spec.
- Re-classifying any of the 13 existing projects.
- A `media` block (video / before-after slider) for Exploenergy. It renders
  the image tier, like the other entries without `media` (spec 08).
- Changing `featured` on any entry. Exploenergy is not featured.
- Any claim about Exploenergy beyond the sources below: no traffic,
  speed or ranking figures, and no branding or ads work.

## Files affected

Matches **no** row of AGENTS.md's "If you change X → update Y" table. In
the "Invariant vs Variable" table the schema/helper edits are the only
non-content change; the entry itself is **Variable** (`src/content/*`).

- `src/content.config.ts:25` (enum)
- `src/utils/projects.ts:7-13` (`INDUSTRY_ORDER`, `INDUSTRY_LABELS`)
- `src/content/works/exploenergy.md` (new)
- `src/content/works/img/exploenergy.webp` (new)
- `AGENTS.md`: Routing section ("The 13 `/proyectos/<slug>/` routes" → 14) and the Tech stack "Content collections" bullet (mention that
  `works` carries an `industry` enum whose labels and order live in
  `src/utils/projects.ts`, so the next added industry knows where to
  edit).
- `feature_list.json`: `content-works-portfolio` entry's `nota` ("13
  portfolio entries" → 14), by surgical string replacement.

Read, not modified (derive from the collection): `SocialProof.astro:11`,
`AboutStats.astro:7`, `ProjectsHero.astro:5`,
`LatestProjects*.astro`, `getProjectsIndexData()` (index title and
description embed the count), and `astro.config.mjs:20` (build-gate ignore
list derived from each work's `slug`).

## Source of the content

Sources are the repo owner's statements in the session of 2026-10-22 plus
the live site; nothing else was added.

- Project is a WordPress site that was redesigned and SEO-optimized, now
  live at https://exploenergy.co/: repo owner's request, 2026-10-22.
- Stack Astro / TypeScript / TailwindCSS: repo owner's answer, 2026-10-22.
  (The public HTML shows no Astro or WordPress markers, so this rests on
  the owner's word alone.)
- Business: "Especialistas en voladuras y demoliciones controladas", mining
  and infrastructure in Colombia: the live home page's `<h1>` and hero
  paragraph, checked 2026-10-22.
- Official name "Exploenergy Ingeniería S.A.S": the live site's logo; owner
  chose it as `title`, 2026-10-22.
- `pubDate` = `updatedDate` = `2026-10-22`: owner's choice (deployment
  date).

## Decisions made and discarded

- **New industry vs reusing one.** **Chosen:** a 4th value
  `ingenieria-construccion`, labelled "Ingeniería y construcción" (the
  repo owner's explicit choice). **Discarded:** `tecnologia` — misclassifies
  a blasting contractor in the visible accordion and the CreativeWork
  data. Spec 08 had discarded a 4th value for Grupo Zenith because it had a
  defensible fit in `tecnologia`; here no existing bucket fits, so that
  decision is not reopened, only not applicable.
- **Value without accent, label with accent.** **Chosen:** enum value is
  an ASCII slug (it ends up in `data-industry` and `industry-panel-<value>`
  ids, like `tecnologia`); the accented text lives only in
  `INDUSTRY_LABELS`. **Discarded:** accented or spaced enum value.
- **Position in `INDUSTRY_ORDER`.** **Chosen:** last. **Discarded:**
  sorting by project count; it would reorder existing groups for no
  reason.
- **Title.** **Chosen:** `Exploenergy Ingeniería S.A.S` (owner's choice).
  The SEO title becomes `Proyecto Exploenergy Ingeniería S.A.S | Shine
Agencia` (53 characters, within the 30–60 `title-length` bounds).
  **Discarded:** the short `Exploenergy`.
- **Slug.** **Chosen:** `exploenergy-ingenieria`, which follows
  `aguilar-abogados-asociados`, where the slug carries the full name
  rather than the short brand. **Discarded:** `exploenergy`.
- **Featured.** **Chosen:** not featured (owner's choice).
- **Image.** **Chosen:** a new 1920-wide screenshot of the live home
  of the hero, taken once the page has loaded, converted with the
  `sharp` already in `node_modules`, to match the 1847–1920 px widths of
  the existing files. **Discarded:** the 1440×900 capture taken during
  triage (narrower than the rest) and installing `cwebp`.
- **Filename.** **Chosen:** lowercase `exploenergy.md` ↔
  `./img/exploenergy.webp`, as in spec 06.
- **Copy limited to sourced facts.** `result` must stay 70–160 characters
  because `[slug].astro:28` uses it as the meta description and the build
  gate enforces `description-length`.

## Acceptance criteria

- [x] `src/content.config.ts` lists exactly four industry values, the new
      one being `ingenieria-construccion`; `INDUSTRY_ORDER` and
      `INDUSTRY_LABELS` in `src/utils/projects.ts` carry the same four
      keys (a missing label key is a type error in `pnpm check`).
- [x] `src/content/works/exploenergy.md` has `industry:
ingenieria-construccion`, `slug: exploenergy-ingenieria`,
      `title: Exploenergy Ingeniería S.A.S`, `link:
"https://exploenergy.co/"`, `pubDate` and `updatedDate` both
      `2026-10-22`, `stack: ["Astro", "TypeScript", "TailwindCSS"]`, no
      `featured` key, and a `result` of 70–160 characters. Its tags are
      limited to `"Desarrollo Web"`, `"Optimización SEO"` and `"Migración
de sitio wordpress a Astro"`. Its body starts with `# Key project
features:` followed by 1–3 bullets.
- [x] `src/content/works/img/exploenergy.webp` exists, is a WebP of 1800 px
      or wider, and shows the hero of the live home page (viewed by a
      human).
- [x] `grep -rl "^featured: true" src/content/works/*.md | wc -l` outputs
      the same number as before the change.
- [x] After `pnpm build`:
      `find dist/proyectos -name index.html | wc -l` → 15 (index + 14);
      `dist/proyectos/exploenergy-ingenieria/index.html` exists, its
      `<title>` is `Proyecto Exploenergy Ingeniería S.A.S | Shine Agencia`,
      and it contains `data-industry="ingenieria-construccion"` and the
      text `Ingeniería y construcción`.
- [x] `dist/proyectos/index.html` and `dist/nosotros/index.html` and the
      home `dist/index.html` show 14 (`data-count-to="14"` where
      applicable, "14 casos de éxito" in the index title); the three
      existing industry groups render the same projects in the same
      order as before.
- [x] `pnpm exec check-seo --dist dist --report` reports 0 errors and 0
      warnings; the ignored count grows by exactly 2 (`canonical-self` and
      `sitemap-coverage` for the new slug page) and the sitemap does not
      list `/proyectos/exploenergy-ingenieria/`.
- [x] In `pnpm dev`, `/proyectos/` shows the "Ingeniería y construcción"
      group in the sidebar without wrapping or overflowing at desktop and
      mobile widths, and opening it shows the Exploenergy card (checked by
      a human).
- [x] `AGENTS.md` says 14 routes and mentions where industry labels live;
      `feature_list.json`'s `content-works-portfolio` `nota` says 14 and
      its `status` is unchanged.
- [x] `pnpm check` reports no errors beyond the baseline captured in step
      1, and `pnpm build` passes.

## Implementation plan

1. **Baseline.** Run `pnpm check` and `pnpm build` on `dev` and record
   `check-seo`'s final line and the `featured: true` count.
2. **Schema and helper.** Add the enum value in `src/content.config.ts`,
   and the order and label entries in `src/utils/projects.ts`.
3. **Screenshot.** With `agent-browser`, open https://exploenergy.co/ at a
   1920-wide viewport, wait for the page to load, capture the hero, and convert to
   `src/content/works/img/exploenergy.webp` with `sharp`. Show the result
   to the owner.
4. **Entry.** Write `src/content/works/exploenergy.md` in the frontmatter
   order of the existing entries. Draft `description`, `result` and the
   1–3 bullets from the sourced facts only, and show them to the owner
   before saving.
5. **Contract and state.** Update `AGENTS.md` (Routing count, Content
   collections bullet) and the `feature_list.json` `nota` (surgical edit).
6. **Verify.** `pnpm build`, `pnpm check`, the `dist/` greps above (never
   source-only greps), and the `check-seo` report.
7. **Hand back for review.** No `done`, commit or push without the owner
   asking in that turn; `spec-verifier` runs the criteria first.
