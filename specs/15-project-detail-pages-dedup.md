# 15 — project detail pages dedup

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Make `/proyectos/` the only canonical projects page. The 13
`/proyectos/<slug>/` URLs are near-duplicates of it: each renders all 13
project cards (12 `hidden`, `ProjectDetail.astro:28-29`) under the same
H1 (`ProjectsHero.astro:11`). Each project has about one sentence of its
own content. This spec also fixes the hardcoded "13" and the traffic
claim in `/proyectos`' title and meta (review items IMPROVE-2 and
IMPROVE-15).

**Depends on spec 14** (`specs/14-breadcrumb-schema-alignment.md`), which
must be merged first. Spec 14 removes `BreadcrumbList` from both
`/proyectos` routes and changes `generateBreadcrumbSchema`. Both specs
edit `src/pages/proyectos/index.astro` and `[slug].astro`.

## Scope

**In:**

- **Canonical.** `generatePageSEO` (`src/config/seo.ts:296`) gains an
  optional `canonicalPath`. It overrides only `<link rel="canonical">`.
  `og:url`, `og:image`, the title and the description keep using `path`
  and `image`.
  - `src/pages/proyectos/[slug].astro` passes `canonicalPath: "/proyectos"`.
  - Each slug keeps its own title, description, `og:url` and `og:image`,
    so sharing a slug still shows that project's preview.
  - No `noindex` anywhere. Canonical plus `noindex` sends Google
    contradictory signals.
- **Sitemap.** The `@astrojs/sitemap` `filter` in `astro.config.mjs`
  excludes every `https://shineagencia.com/proyectos/<slug>/`.
  `/proyectos/` stays in.
- **One JSON-LD graph for all 14 URLs.**
  - A new exported async helper `getProjectsIndexData()` in
    `src/utils/projects.ts` returns `/proyectos`' `title`, its
    `description` and its `CollectionPage` node.
  - The `CollectionPage`'s `hasPart` holds the 13 complete `CreativeWork`
    nodes from `generateProjectSchema`, not the reduced
    `{ @type, @id, name, url }` items it holds today.
  - `src/pages/proyectos/index.astro` uses all three values.
    `[slug].astro` passes the same `CollectionPage` node as its only
    additional schema.
  - `[slug].astro` stops calling `generateProjectSchema` directly.
- **`generateProjectSchema`** (`src/config/seo.ts:452`):
  - `url` becomes the project's `link` frontmatter (the delivered client
    site, e.g. `https://cardozoabogados.co/`), emitted as written.
  - It no longer emits `@context`, because the node is now always nested.
  - The `@id` stays `…/proyectos/<slug>#project`. It is an opaque
    identifier, not a URL, so it doesn't follow `url`.
- **`generateCollectionPageSchema`** (`src/config/seo.ts:418`) emits
  every property each `hasPart` item carries, not only the four it picks
  today. Both existing collection callers use complete JSON-LD item
  shapes with `@id`, not the legacy `id` shorthand:
  `src/pages/servicios/index.astro` and `src/pages/proyectos/index.astro`.
  Their item shapes are adapted in step 3 so direct node passthrough
  keeps both routes valid before step 4. Services' emitted JSON-LD must
  stay byte-identical.
- **Copy for `/proyectos`.** `getProjectsIndexData()` derives `{n}` from
  the `works` collection:
  - title: `Proyectos: {n} casos de éxito en Colombia`;
  - description: `Antes y después de {n} negocios colombianos: qué
encontramos roto y qué construimos. Casos reales de diseño web,
branding y SEO.`
- **Home link.** `src/components/section/landing/LatestProjects.2.astro:170`
  renders `Ver los {n} proyectos →` from the `allWorks` array it already
  loads.
- **`AGENTS.md` § "Routing"** gains `/proyectos` and its rule:
  - the 13 `/proyectos/<slug>/` pages are client-side state of
    `/proyectos/` (spec 08);
  - they canonicalize to `/proyectos/`, emit the same JSON-LD graph and
    are excluded from the sitemap;
  - `og:url` stays on the slug on purpose.

**Out:**

- Any change to the page body or the interaction: `ProjectsHero`,
  `ProjectsAccordion`, `ProjectDetail`, the hidden-card DOM, the H1, and
  every file in `src/utils/scripts/perPageAnimations/proyectos/`.
- Visible breadcrumbs on `/proyectos/<slug>/`, deferred here by spec 14.
  The slugs are not standalone pages, so they get neither the component
  nor `BreadcrumbList`.
- Standalone case-study pages (a per-project H1, the markdown body,
  longer content). That would need content intake with the client and
  would undo spec 08's interaction. It deserves its own spec if it ever
  happens.
- Changing where the accordion links point. They keep linking to
  `/proyectos/<slug>/`.
- The speculation-rules `/proyectos/*` block in `MainLayout.astro`.
- `CreativeWork` `keywords` (tags joined), its `isPartOf`, and the
  midnight-UTC dates (IMPROVE-17).
- `llms.txt`, `llms-full.txt` and WebMCP. None of them list projects
  today.

## Files affected

- `src/config/seo.ts`: `generatePageSEO` (`canonicalPath`),
  `generateProjectSchema` (`url`, no `@context`) and
  `generateCollectionPageSchema` (full `hasPart` nodes).
- `src/utils/projects.ts`: the new `getProjectsIndexData()`.
- `src/pages/proyectos/index.astro` and `src/pages/proyectos/[slug].astro`.
- `src/pages/servicios/index.astro`: adapt the `hasPart` input shape to
  use `@id`. Its output does not change.
- `src/components/section/landing/LatestProjects.2.astro`: the derived
  count. Its pinned, sort and slice logic doesn't change.
- `astro.config.mjs`: the sitemap `filter`.
- `AGENTS.md`: § "Routing".

The `seo.ts` generators and the sitemap config are **Invariant** SEO
machinery. The `/proyectos` title and description are **Variable** page
content (Knobs map row "Pages").

This change matches **no row** in "If you change X → update Y". It
touches no dependency, font, redirect or folder convention. The contract
still gets updated in the same change, because § "Routing" doesn't list
`/proyectos` today. After this change, the sitemap behaviour it describes
would be incomplete without that update.

## Source of the content

- **The `/proyectos` title and description** were approved by the repo
  owner in this spec's Phase 2 (2026-10-12):
  - keep "branding y SEO", which is true per the projects' `tags`;
  - drop "y qué cambió en su tráfico", because no card shows traffic
    data;
  - derive the count.
- **`{n}`** is `getCollection("works").length`, the same source
  `ProjectsHero`, `SocialProof` and `AboutStats` already use.
- **`CreativeWork` fields** come from the existing `works` frontmatter
  (`title`, `result`/`description`, `image`, `pubDate`, `updatedDate`,
  `tags`, `link`). No new client-facing claim is introduced.

Policy basis: `~/helpers-proyects/seo-schema-org-buenas-practicas-2026.md`:

- § 3.2, line 76: if there are duplicate pages, put the same markup on
  every duplicate, not only on the canonical.
- § 10.2, line 339: one URL per piece of content. Prefer a 301 from the
  variants, otherwise an absolute `rel="canonical"` in the `<head>`.

## Decisions made and discarded

The routing context is the 2026-10-12 review, items IMPROVE-2 and
IMPROVE-15 (Engram `mem_search "seo infra review 2026-10-12"`). Spec 15's
decisions are saved under the topic
`shine/spec-15-project-detail-pages-dedup`.

- **Picked: full lane.** Whether the 13 project URLs are pages or state is
  an information-architecture decision.
- **Picked: canonical consolidation to `/proyectos/`.** Each project has
  about one sentence of unique content, so no slug could rank on its own.
  `/proyectos` isn't live on `main` yet (it is still pending in the
  `dev`→`main` merge), so there is no indexation debt to protect.
  - **Discarded: standalone case-study pages.** They need content the
    client hasn't provided, and they break spec 08's no-reload card swap.
  - **Discarded: deleting the 13 routes and using a hash.** The per-project
    `og:image` previews would go, the `pushState`/`popstate` code would
    need rewriting, and a direct link would flash the default project
    first.
  - **Discarded: a 301 from the slugs.** That is the report's first choice
    for duplicates, but the slugs are the deep-link and share targets the
    client-side swap depends on.
- **Picked: canonical only, no `noindex`.** Canonical plus `noindex` is a
  contradictory pair.
- **Picked: `og:url` stays on the slug while the canonical points to
  `/proyectos/`.** Facebook and WhatsApp build the preview from `og:url`.
  Keeping per-project share previews is the main reason the 13 URLs
  survive. SEO auditors that flag `og:url` ≠ canonical are reporting an
  intentional choice.
  - **Discarded: `og:url` equal to the canonical.** Every shared slug
    would preview as the generic `/proyectos` page.
- **Picked: the full `CreativeWork` nodes live in `/proyectos`' `hasPart`,
  and all 14 URLs emit that identical graph.** Google ignores structured
  data on non-canonical pages, and its policy asks for the same markup on
  every duplicate. Every slug already renders all 13 cards in its DOM, so
  the graph matches the HTML.
  - **Discarded: slugs emitting only the reduced Organization.** It was
    simpler, and was offered first in Phase 2. It was then corrected
    against § 3.2 of the report.
  - **Discarded: leaving each slug's own `CreativeWork` in place.**
    Google would ignore it on a non-canonical page.
- **Picked: direct full-node passthrough in `generateCollectionPageSchema`.**
  During step 3 implementation, the repo owner chose option 2
  (2026-10-12): adapt both existing collection callers from `id` to
  `@id` now, including a minimal projects-index input-shape change.
  Services' emitted field order and bytes stay identical. The projects
  helper and shared graph wiring remain in step 4.
  - **Discarded: retaining legacy `id` compatibility in the generator.**
    Updating both callers avoids an extra compatibility path.
- **Picked: `CreativeWork.url` is the client's delivered site (`link`).**
  The creative work is the website itself. It also gives a verifiable
  Shine (`creator`) → client-site link.
  - **Discarded: keeping `/proyectos/<slug>/`.** That URL's own canonical
    marks it as a duplicate.
  - **Discarded: omitting `url`.**
- **Picked: build the graph once, in `getProjectsIndexData()`** in
  `src/utils/projects.ts`, which already owns the `works` queries. The
  `CollectionPage`'s description must equal `/proyectos`' meta
  description even on slug pages, so the title, description and node come
  from one place.
  - **Discarded: building the graph separately in each route.** The two
    copies could drift.
- **Picked: derive the project count from the collection.** It stays a CTR
  hook and can't go stale. The hero, `SocialProof` and `AboutStats`
  already derive it.
  - **Discarded: removing the number.**
- **Picked: the description drops the traffic promise and keeps "branding
  y SEO".**
  - **Discarded: realigning it to the current service catalogue** ("diseño
    web" only). "Con Astro" would be false, because one of the 13 is
    WordPress.
- **Picked: the accordion keeps linking to the slug URLs.** Those links
  are the no-JS fallback and the `pushState` targets. Google resolves them
  through the canonical.
- **Picked: document the rule in `AGENTS.md` § "Routing".** A canonical
  that points elsewhere, plus an `og:url` that differs from it, looks like
  a bug to the next agent. The slashless `@id` already showed that
  pattern.

## Acceptance criteria

All `dist/` checks run after a fresh `pnpm build`.

- [x] All 14 files `dist/proyectos/index.html` and
      `dist/proyectos/<slug>/index.html` contain
      `<link rel="canonical" href="https://shineagencia.com/proyectos/">`.
- [x] In each of the 13 slug files, `og:url` equals
      `https://shineagencia.com/proyectos/<slug>/` and `og:image` equals
      that project's image URL, not the site default.
- [x] `grep -rl "noindex" dist/proyectos` returns 0 files.
- [x] `grep -o '<loc>[^<]*/proyectos/[^<]*</loc>' dist/sitemap-0.xml`
      returns exactly one line: `https://shineagencia.com/proyectos/`.
- [x] The `application/ld+json` block is byte-identical across all 14
      `dist/proyectos/**/index.html` files (one unique hash).
- [x] That graph has one `CollectionPage` with `@id`
      `https://shineagencia.com/proyectos` and 13 `hasPart` items of type
      `CreativeWork`. Each item has `name`, `description`, `image`,
      `datePublished`, `dateModified`, `creator` →
      `https://shineagencia.com#organization`, and a `url` equal to that
      project's `link` frontmatter.
- [x] `"@context"` appears exactly once in that JSON-LD block.
- [x] `grep -rl '"CreativeWork"' dist --include=*.html` returns exactly
      the 14 `dist/proyectos/` files.
- [x] The JSON-LD of `dist/servicios/index.html` is byte-identical to the
      step-1 baseline.
- [x] `dist/proyectos/index.html` has the `<title>` `Proyectos: 13 casos
de éxito en Colombia | <brand>` and the meta description `Antes y
después de 13 negocios colombianos: qué encontramos roto y qué
construimos. Casos reales de diseño web, branding y SEO.`
- [x] `grep -nw "13" src/pages/proyectos/index.astro src/utils/projects.ts
src/components/section/landing/LatestProjects.2.astro` returns 0
      matches. `dist/index.html` still contains `Ver los 13 proyectos`.
- [x] `git diff --name-only dev` lists no file among
      `src/components/section/perPage/Projects*.astro`,
      `src/components/section/perPage/ProjectDetail.astro` or
      `src/utils/scripts/perPageAnimations/proyectos/`.
- [x] `AGENTS.md` § "Routing" names `/proyectos` and states the
      canonical, sitemap and `og:url` rule.
- [x] Manual check on a slug URL, done by a human:
  - clicking another project still swaps the card and updates the URL
    with no new Document request;
  - Back restores the previous project.
- [x] `pnpm build` passes. `pnpm check` reports no errors beyond the `dev`
      baseline.

## Implementation plan

1. Baseline, with no code change, on `dev` with spec 14 merged. Build,
   then save:
   - the JSON-LD of `dist/servicios/index.html`;
   - the `/proyectos` `<loc>` lines of `dist/sitemap-0.xml` (14 expected);
   - the `pnpm check` error list.
2. `generatePageSEO` gains the optional `canonicalPath`, which overrides
   only `canonical`. No caller uses it yet.
3. `generateProjectSchema`: `url` from `link`, no `@context`. In the same
   step, `generateCollectionPageSchema` emits the full `hasPart` nodes.
   Adapt the existing `hasPart` items in `servicios/index.astro` and
   `proyectos/index.astro` from `id` to `@id`, preserving emitted field
   order and services' byte-identical output. The projects-index change
   is input-shape-only; its helper wiring remains in step 4.
   `[slug].astro`, the only caller of `generateProjectSchema`, still
   builds.
4. `getProjectsIndexData()` in `src/utils/projects.ts`: the derived
   count, the approved title and description, and the `CollectionPage`
   with the 13 full nodes. `src/pages/proyectos/index.astro` switches to
   it.
5. `src/pages/proyectos/[slug].astro`: `canonicalPath: "/proyectos"`, and
   the shared `CollectionPage` as its only additional schema. Drop the
   `generateProjectSchema` import.
6. `astro.config.mjs`: the sitemap `filter` excludes the slug URLs.
7. `LatestProjects.2.astro:170`: `Ver los {allWorks.length} proyectos →`.
8. `AGENTS.md` § "Routing": add `/proyectos` and the rule.
9. Fresh `pnpm build`, run every acceptance check, then hand off to
   `spec-verifier`. The manual click-through is left to a human.
