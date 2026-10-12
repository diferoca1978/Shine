# 13 — jsonld graph consolidation

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Emit each page's structured data as **one self-contained `@graph`**, so
that:

- the full Organization appears only on the home and `/nosotros`;
- the full WebSite appears only on the home;
- every `@id` a page references is defined in that same page's graph;
- the build fails when a reference can't be resolved.

Today all 29 pages repeat the full Organization and WebSite nodes in 3–5
loose `<script>` blocks. `copyrightHolder` creates a second, anonymous
Organization. Posts, service pages and project pages also reference `@id`s
they don't define, and Google doesn't document how it resolves those across
pages.

**Depends on spec 12** (`specs/12-organization-entity-truthfulness.md`),
which must be merged first. This spec builds `founder` from the `Author.id`
field that 12 introduces and edits the same `ORGANIZATION_SCHEMA`.

## Scope

**In:**

- **Graph builder.** Add a pure function in `src/utils/jsonLdGraph.ts`
  that takes the page's node list and returns one JSON-LD object
  `{ "@context": "https://schema.org", "@graph": [...] }`:
  - **Strips `@context`** from every incoming node. The generators keep
    emitting it, and the builder is the single owner of the output
    `@context`.
  - **Merges top-level nodes that share an `@id`** and keeps the one with
    more top-level properties. For example, the full Organization a page
    passes wins over the reduced one `MainLayout` always adds.
  - **Resolves references.**
    - A reference is any object whose only key is `@id`.
    - A definition is any object, top-level or nested, that has `@id` plus
      at least `@type`.
    - For each reference that is not defined in the graph, the builder
      appends the matching reduced node from the stub registry below.
  - **Fails the build** (throws) when a reference is still unresolved. The
    error message names the page path and the `@id`, and says to add the
    node or extend the stub registry in `src/config/seo.ts`.
- **`src/components/SEOHead.astro`.** Render a single
  `<script type="application/ld+json">` with the builder's output, in place
  of one script per schema. It needs the page path for the error message.
- **Stub registry** (`src/config/seo.ts`, new export). Reduced nodes
  `{ @type, @id, name, url }` for the site-level entities that pages
  reference across pages. Every `@id` string is copied exactly from today's
  definitions; none changes. Names and urls come from the existing nodes:
  - `…#organization`: `Organization`, `COMPANY_INFO.name`, url
    `https://shineagencia.com/`, plus `logo`.
  - `…#website`: `WebSite`, `COMPANY_INFO.name`, url
    `https://shineagencia.com/`.
  - `…/blog#blog`: `Blog`, `"Blog - " + COMPANY_INFO.name`, url `…/blog/`.
  - `…/servicios`: `CollectionPage`, `"Servicios"`, url `…/servicios/`.
  - `…/proyectos`: `CollectionPage`, `"Proyectos"`, url `…/proyectos/`.
- **`src/layouts/MainLayout.astro`.** The base nodes change from
  `[ORGANIZATION_SCHEMA, WEBSITE_SCHEMA]` to the reduced Organization stub
  only, so every page carries at least a reduced Organization node.
  WebSite is no longer added by default.
- **Full nodes passed by the pages that own them:**
  - `src/pages/index.astro` passes `ORGANIZATION_SCHEMA` and
    `WEBSITE_SCHEMA`.
  - `src/pages/nosotros.astro` passes `ORGANIZATION_SCHEMA`.
  - Every other page gets the reduced Organization from `MainLayout`, plus
    stubs only for whatever it references.
- **`ORGANIZATION_SCHEMA`:**
  - Replace `founders`, which takes plain names and is a superseded
    property, with `founder`: an array of reduced inline Person nodes
    `{ @type: "Person", @id: …/nosotros#<author.id>, name }`, built from
    `AUTHORS` in `src/config/authors.ts`. These `@id`s match the full
    Person nodes on `/nosotros` byte for byte.
  - Change `url` to `https://shineagencia.com/` (trailing slash, equal to
    the home canonical). The `@id` stays `https://shineagencia.com#organization`.
- **`WEBSITE_SCHEMA`:**
  - `copyrightHolder` becomes `{ "@id": …#organization }`, a reference
    instead of an anonymous Organization.
  - `url` becomes `https://shineagencia.com/`. The `@id` stays
    `https://shineagencia.com#website`.
- **`generateCollectionPageSchema`.** Each `hasPart` item becomes a
  reduced node `{ @type, @id, name, url }` instead of a bare reference.
  `src/pages/servicios/index.astro` (3 `Service` items) and
  `src/pages/proyectos/index.astro` (13 `CreativeWork` items) pass `@type`,
  `name` and `url` along with the `id` they already pass.
- **`AGENTS.md` § "Layout chain"** describes the new model:
  - one `@graph` per page, built in `SEOHead.astro`;
  - a reduced Organization on every page;
  - the full Organization on the home and `/nosotros`, and the full
    WebSite on the home only;
  - the stub registry and the build failure on unresolved references.

  This replaces "MainLayout always injects Organization + Website JSON-LD
  schemas".

**Out:**

- New `WebPage` nodes (`…#webpage` per page, as in the report's § 7.2
  example). They unlock no Google feature, and adding them touches every
  page. A future spec can add them. The existing `WebPage`-family nodes
  (`CollectionPage`, `ContactPage`, the posts' inline `mainEntityOfPage`)
  stay as they are.
- Breadcrumbs. Which pages emit `BreadcrumbList`, the home's 1-item list,
  the legal pages, and `BlogLayout`'s relative URLs all belong to **spec
  14**. Breadcrumb nodes pass through the builder unchanged.
- Fixing invalid properties inside individual generators. These belong to
  the light-lane entries:
  - `Service.isPartOf`, `servicePhone`, `keywords` →
    `fix-service-schema-props`;
  - the `ContactPage` props → `fix-contactpage-schema-props`;
  - BlogPosting `about` and `author.url` →
    `fix-blogposting-about-author-url`;
  - dead generators → `remove-dead-seo-generators`.

  This spec doesn't depend on any of them landing first. The stub registry
  resolves `Service.isPartOf → …/servicios` whether or not that property
  survives.

- Removing `@context` from the generators' source. The builder strips it,
  and leaving the generators untouched avoids conflicts with the
  light-lane entries above.
- Deduplicating `COMPANY_INFO.founders` against `AUTHORS`.
  `COMPANY_INFO.founders` stays, because `src/config/site.ts:10` uses it
  for text.
- `/proyectos/[slug]` page structure, which belongs to **spec 15**. Its
  `CreativeWork` node only gains a resolved `isPartOf` stub.
- The `seo-guide-lines` skill. The page-level API
  (`aditionalSchemas={[...]}`) doesn't change, so its instructions still
  produce valid output, and the builder rejects anything unresolved.
- Any `@id` string change. All `@id`s stay exactly as they are (Engram:
  `mem_search "JSON-LD @id vs url"`).

## Files affected

- `src/utils/jsonLdGraph.ts`: new file (graph builder).
- `src/components/SEOHead.astro`: renders a single graph.
- `src/config/seo.ts`:
  - the new stub registry export;
  - `ORGANIZATION_SCHEMA` (`founder`, `url`);
  - `WEBSITE_SCHEMA` (`copyrightHolder`, `url`);
  - `generateCollectionPageSchema` (`hasPart` items).
- `src/layouts/MainLayout.astro`: the base nodes.
- `src/pages/index.astro` and `src/pages/nosotros.astro`: pass the full
  nodes.
- `src/pages/servicios/index.astro` and `src/pages/proyectos/index.astro`:
  pass the `hasPart` item data.
- `AGENTS.md`: § "Layout chain".

`SEOHead.astro`, the `seo.ts` generators, `src/utils/` and `layouts/` are
all **Invariant** SEO machinery in "Invariant vs Variable". No Variable
data (`config/*` content) changes.

This change matches **no row** in "If you change X → update Y". No row is
added, because the build failure itself tells the next person what to
update (the stub registry). See Decisions.

## Source of the content

This spec adds no new client-facing data. Every name, url and `@id` in the
stubs and the reduced nodes is copied from nodes that already exist in
`src/config/seo.ts`, `src/config/authors.ts` (spec 12's `id` and accented
`name`) and the collection pages' existing `generateCollectionPageSchema`
calls.

Policy basis: `~/helpers-proyects/seo-schema-org-buenas-practicas-2026.md`:

- § 6.1: WebSite only on the home.
- § 6.2: Organization on the home or the "Quiénes somos" page.
- § 7.1: one `@graph`, stable `@id`s, full Organization once, reduced
  `@id`/`name`/`url` nodes on internal pages.
- § 8, items 11 and 15: duplicate Organizations and loose script blocks as
  anti-patterns.

## Decisions made and discarded

The routing context is the 2026-10-12 review, items IMPROVE-10 and
DELETE-5 (Engram `mem_search "seo infra review 2026-10-12"`). Spec 13's
decisions are saved under the topic
`shine/spec-13-jsonld-graph-consolidation`.

- **Picked: full lane.** Changing how every page assembles its structured
  data is an architecture decision in Invariant machinery.
- **Picked: one `@graph` per page, built in `SEOHead`.**
  - **Discarded: keep the separate script blocks and only dedupe.** The
    diff would be smaller, but it remains the § 8.15 anti-pattern and gives
    no place to enforce resolution.
- **Picked: full Organization on the home and `/nosotros`, a reduced node
  everywhere else.**
  - **Discarded: home only.** `/nosotros` is the other page Google names,
    and it already carries the founders' full Person nodes that the
    Organization's `founder` points to.
  - **Discarded: reference-only on internal pages.** Those pages' graphs
    would not be readable on their own.
- **Picked: self-contained graphs.** Every referenced `@id` is defined in
  the same graph, at least as a reduced node.
  - **Discarded: allowing cross-page references.** It would rely on
    resolution behavior that Google does not document (report § 7.1,
    "criterio propio").
- **Picked: automatic resolution in the builder, with a stub registry and
  a build failure.** A new page or generator can't silently ship a
  dangling reference. This is the same "fail the build" approach as spec
  11's `faqs` guard.
  - **Discarded: each page passes its stubs by hand, plus a post-build
    check script.** It is easy to forget, and the check would sit outside
    the build.
- **Picked: merge duplicate top-level `@id`s by keeping the richer node.**
  This lets `MainLayout` always add the reduced Organization while the home
  and `/nosotros` override it. It needs no conditional on the page path.
- **Picked: no new `WebPage` nodes.** They unlock no feature, they touch
  every page, and they would overlap with spec 14's breadcrumb decisions.
- **Picked: `founder` built from `AUTHORS`.** It is the only source with
  the stable `id` from spec 12, so the Organization→Person link matches
  `/nosotros` exactly.
  - **Discarded: building it from `COMPANY_INFO.founders`.** Those are
    plain names with no `id`.
- **Picked: change the Organization/WebSite `url` to the slashed canonical
  and leave their `@id`s alone.** `url` must equal the canonical (report
  checklist). `@id` is opaque, and changing it would break every existing
  reference.
- **Picked: strip `@context` in the builder and leave the generators
  unchanged.** This keeps the diff away from the 4 light-lane entries that
  edit those generators.
- **Picked: no new "If you change X" row.** The build error is the
  instruction, so a contract row would duplicate it.

## Acceptance criteria

All checks run against `dist/` after a fresh `pnpm build`. Take a baseline
build of `dev` (with spec 12 merged) before step 1.

- [x] Every `dist/**/*.html` page contains **exactly one**
      `<script type="application/ld+json">`, and that script has exactly
      one `"@context"` and one `"@graph"`.
- [x] **Self-containment.** For every `dist/**/*.html` page, a Node
      one-off that parses the JSON-LD finds no reference without a
      definition. A reference is an object whose only key is `@id`; a
      definition is an object with `@id` + `@type`, anywhere in the same
      graph.
- [x] **Full Organization only on 2 pages.**
      `grep -rl '"hasOfferCatalog"' dist --include=*.html` returns exactly
      `dist/index.html` and `dist/nosotros/index.html`.
- [x] **Full WebSite only on the home.**
      `grep -rl '"copyrightYear"' dist --include=*.html` returns only
      `dist/index.html`.
- [x] **Reduced Organization everywhere.** Every other `dist/**/*.html`
      page contains `"@id":"https://shineagencia.com#organization"` in a
      node with `"@type":"Organization"`.
- [x] **No anonymous Organization.** In `dist/index.html`,
      `copyrightHolder` is exactly
      `{"@id":"https://shineagencia.com#organization"}`.
- [x] **`founder`.** `grep -rl '"founders"' dist` returns no files.
      `dist/index.html` has a `founder` array with
      `https://shineagencia.com/nosotros#rocio-parra` and
      `…#diego-rodriguez`, the same strings as the Person `@id`s in
      `dist/nosotros/index.html`.
- [x] **`url`.** In `dist/index.html`, the Organization and WebSite nodes
      both have `"url":"https://shineagencia.com/"`.
- [x] **No `@id` lost or renamed.** Every distinct `@id` string present in
      the baseline build is still present after the change.
- [x] **Collections.** `dist/proyectos/index.html` has 13 `hasPart` nodes
      with `@type`, `name` and `url`; `dist/servicios/index.html` has 3.
- [x] **Guard negative test.** Temporarily add
      `{ "@id": "https://shineagencia.com#does-not-exist" }` as a property
      of one page's schema. `pnpm build` fails with a message naming the
      page and that `@id`. Revert it, and the build passes.
- [x] `AGENTS.md` § "Layout chain" describes the `@graph` model (full vs.
      reduced nodes, stub registry, build failure) and no longer says
      MainLayout injects the full Organization + Website on every page.
- [x] `pnpm build` passes. `pnpm check` reports no errors beyond the `dev`
      baseline.
- [ ] Manual check: Google's Rich Results Test on the deployed preview of
      `/`, `/blog/<any post>/` and `/servicios/<any>/` reports no new
      errors compared with production.

## Implementation plan

1. Baseline, with no code change, on `dev` with spec 12 merged: build, then
   record the list of distinct `@id` strings across `dist/**/*.html`, the
   script-block count per page, and the `pnpm check` error list.
2. `src/utils/jsonLdGraph.ts`: write the builder (strip `@context`, merge
   by `@id`, resolve against a stub map passed in, throw on unresolved).
   `src/config/seo.ts`: add the stub registry export. Nothing calls them
   yet, so the output is unchanged.
3. `generateCollectionPageSchema` turns `hasPart` items into reduced nodes,
   and `servicios/index.astro` and `proyectos/index.astro` pass the item
   data. This must come before the builder goes live: `/proyectos`' 13
   `#project` references are defined nowhere on that page, so step 4 would
   fail without it.
4. `src/components/SEOHead.astro`: render one script from the builder.
   `MainLayout` still passes the full Organization and WebSite, so every
   page now has one graph. The build must pass, which proves that the
   remaining cross-page references (`/blog#blog`, `/servicios`,
   `/proyectos`) resolve through the stubs.
5. `ORGANIZATION_SCHEMA` (`founder` from `AUTHORS`, slashed `url`) and
   `WEBSITE_SCHEMA` (`copyrightHolder` reference, slashed `url`).
6. `MainLayout.astro`: the base nodes become the reduced Organization
   stub only. `index.astro` passes `ORGANIZATION_SCHEMA` and
   `WEBSITE_SCHEMA`, and `nosotros.astro` passes `ORGANIZATION_SCHEMA`.
   Both happen in one step so the home never loses its full nodes. From
   here on, `#website` references on `/contacto` and the collection pages
   resolve through the stub.
7. `AGENTS.md` § "Layout chain".
8. Fresh `pnpm build`, run every acceptance check including the guard
   negative test, then hand off to `spec-verifier`. The Rich Results Test
   on the preview is left to a human.
