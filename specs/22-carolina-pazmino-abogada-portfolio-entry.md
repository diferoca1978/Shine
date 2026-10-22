# 22 — Carolina Pazmiño Abogada portfolio entry

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Add Carolina Pazmiño Abogada (https://carolinapazminoabogada.com/, a new
website with SEO work, deployed 2026-07-01) to the `works` collection as a
`legal` project, the same way spec 20 added Exploenergy. The 15th
`/proyectos/<slug>/` route appears with no component changes.

## Scope

**In:**

- New `src/content/works/carolinapazminoabogada.md`.
- New `src/content/works/img/carolinapazminoabogada.webp`, converted from a
  fresh screenshot of the live home page.
- `AGENTS.md` and `feature_list.json` counts updated (14 → 15), see Files
  affected.

**Out:**

- Any change to `src/content.config.ts` or `src/utils/projects.ts`: the
  project fits the existing `legal` industry, so no new enum value, order
  or label.
- Any change to the `/proyectos` components (`ProjectsAccordion`,
  `ProjectDetail`, `ProjectsHero`), the accordion script or `[slug].astro`.
- Re-classifying any existing project, or changing `featured` on any entry.
  This entry is not featured.
- A `media` block (video / before-after slider); it renders the image tier,
  like the other entries without `media` (spec 08).
- Any claim beyond the sources below: no traffic, speed or ranking
  figures, and no branding or ads work.

## Files affected

Matches **no** row of AGENTS.md's "If you change X → update Y" table. In
the "Invariant vs Variable" table the entry is **Variable**
(`src/content/*`); nothing Invariant is edited.

- `src/content/works/carolinapazminoabogada.md` (new)
- `src/content/works/img/carolinapazminoabogada.webp` (new)
- `AGENTS.md:108`: "The 14 `/proyectos/<slug>/` routes" → 15.
- `feature_list.json:65`: `content-works-portfolio` `nota`, "14 portfolio
  entries" → 15, by surgical string replacement; `status` unchanged.

Read, not modified (derive from the collection): `SocialProof.astro`,
`AboutStats.astro`, `ProjectsHero.astro`, `LatestProjects*.astro`,
`getProjectsIndexData()` (index title and description embed the count),
`astro.config.mjs` (build-gate ignore list derived from each work's
`slug`).

`feature_list.json:381` and `:400` mention "all 14" `/proyectos` pages in
the `acceptance`/`nota` of other pending entries. Those describe the state
when each entry is implemented; this spec does not edit them. Whoever
implements them next must read 15 there. Flagged, not changed.

## Source of the content

Sources are the repo owner's statements in the session of 2026-10-22 plus
the live site; nothing else was added.

- A new website (built from scratch, not a migration) with SEO work,
  deployed 2026-07-01: repo owner, 2026-10-22.
- Stack Astro / TypeScript / TailwindCSS: repo owner's answer, 2026-10-22.
  (The public HTML shows Astro markers and no WordPress markers; the rest
  of the stack rests on the owner's word.)
- Business: "Abogada especializada en derecho laboral, seguridad social y
  derecho administrativo": the live home page's meta description, checked
  2026-10-22. Page title: "Carolina Pazmiño | abogada derecho laboral
  Colombia".
- `pubDate` = `updatedDate` = `2026-07-01`: repo owner (deployment date).

## Decisions made and discarded

- **Industry.** **Chosen:** `legal`; she is a lawyer, like the other legal
  entries. **Discarded:** a new industry value; nothing to add.
- **Title.** **Chosen:** `Carolina Pazmiño Abogada`. The SEO title becomes
  `Proyecto Carolina Pazmiño Abogada | Shine Agencia` (49 characters,
  within the 30–60 `title-length` bounds). **Discarded:** adding "derecho
  laboral" to the title; keeps it short and the practice area goes in
  `description`/`result`.
- **Slug.** **Chosen:** `carolina-pazmino-abogada` (ASCII, no ñ), in the
  style of `aguilar-abogados-asociados`, where the slug carries the full
  name.
- **Filename.** **Chosen:** lowercase `carolinapazminoabogada.md` ↔
  `./img/carolinapazminoabogada.webp`, as in specs 06 and 20.
- **Featured.** **Chosen:** not featured (repo owner's choice).
- **Date.** **Chosen:** 2026-07-01, the real deployment date, even though
  it is older than the Exploenergy entry (2026-10-22). **Open for
  implementation:** if the home or `/proyectos` order by `pubDate`, this
  entry lands after Exploenergy; step 6 checks the position and reports it,
  it does not change the date.
- **Tags.** **Chosen:** `"Desarrollo Web"` and `"Optimización SEO"`.
  **Discarded:** the migration tag used for Exploenergy; this was not a
  migration.
- **Image.** **Chosen:** a new 1920-wide screenshot of the live home hero,
  converted with the `sharp` already in `node_modules`, to match the
  1847–1920 px widths of the existing files.
- **Copy limited to sourced facts.** `result` must stay 70–160 characters
  because `[slug].astro` uses it as the meta description and the build gate
  enforces `description-length`.
- Related Engram notes: search `shine/exploenergy` (spec 20).

## Acceptance criteria

- [x] `src/content/works/carolinapazminoabogada.md` has `industry: legal`,
      `slug: carolina-pazmino-abogada`, `title: Carolina Pazmiño Abogada`,
      `link: "https://carolinapazminoabogada.com/"`, `pubDate` and
      `updatedDate` both `2026-07-01`, `stack: ["Astro", "TypeScript",
"TailwindCSS"]`, no `featured` key, and a `result` of 70–160
      characters. Its tags are limited to `"Desarrollo Web"` and
      `"Optimización SEO"`. Its body starts with `# Key project features:`
      followed by 1–3 bullets.
- [x] `src/content/works/img/carolinapazminoabogada.webp` exists, is a WebP
      of 1800 px or wider, and shows the hero of the live home page
      (viewed by a human).
- [x] `grep -rl "^featured: true" src/content/works/*.md | wc -l` outputs
      the same number as before the change.
- [x] After `pnpm build`: `find dist/proyectos -name index.html | wc -l` →
      16 (index + 15); `dist/proyectos/carolina-pazmino-abogada/index.html`
      exists and its `<title>` is `Proyecto Carolina Pazmiño Abogada |
Shine Agencia`.
- [x] `dist/proyectos/index.html`, `dist/nosotros/index.html` and the home
      `dist/index.html` show 15 (`data-count-to="15"` where applicable,
      "15 casos de éxito" in the index title); the four existing industry
      groups keep their projects and order, with the new one added to
      `legal` only.
- [x] `pnpm build` passes with the gate at 0 errors and 0 warnings, and
      `pnpm exec check-seo --dist dist --report` matches the baseline of
      step 1 except that the ignored count grows by exactly 2
      (`canonical-self` and `sitemap-coverage` for the new slug page); the
      sitemap does not list `/proyectos/carolina-pazmino-abogada/`.
- [x] In `pnpm dev`, `/proyectos/` shows the new project inside the "Legal"
      group and its detail renders correctly (checked by a human).
- [x] `AGENTS.md` says 15 routes; `feature_list.json`'s
      `content-works-portfolio` `nota` says 15 and its `status` is
      unchanged.
- [x] `pnpm check` reports no errors beyond the baseline captured in step 1.

## Implementation plan

1. **Baseline.** Run `pnpm check` and `pnpm build` on `dev`; record
   `check-seo`'s final line (both build and `--report` modes) and the
   `featured: true` count.
2. **Screenshot.** With `agent-browser`, open
   https://carolinapazminoabogada.com/ at a 1920-wide viewport, wait for
   the page to load, capture the hero, and convert to
   `src/content/works/img/carolinapazminoabogada.webp` with `sharp`. Show
   the result to the owner.
3. **Entry.** Write `src/content/works/carolinapazminoabogada.md` in the
   frontmatter order of the existing entries. Draft `description`, `result`
   and the 1–3 bullets from the sourced facts only, and show them to the
   owner before saving. Starting point for `result`: "Sitio web nuevo con
   optimización SEO para una abogada especializada en derecho laboral,
   seguridad social y derecho administrativo."
4. **Contract and state.** Update `AGENTS.md:108` (14 → 15) and the
   `feature_list.json` `nota` (surgical edit).
5. **Verify.** `pnpm build`, `pnpm check`, the `dist/` greps above (never
   source-only greps) and the `check-seo` report.
6. **Position check.** Look at where the entry lands on the home and in
   `/proyectos` given its older `pubDate`, and report it to the owner.
7. **Hand back for review.** Branch `feature/22-carolina-pazmino-abogada-portfolio-entry`
   from `dev`. No `Approved`, `Implemented`, commit or push without the
   owner asking in that turn; `spec-verifier` runs the criteria first.
