# 14 — breadcrumb schema alignment

**Status:** implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Emit `BreadcrumbList` only on pages that render visible breadcrumbs, and
feed both from one items array so they can't drift. Today 29 pages emit
breadcrumb schema but only the 5 posts show breadcrumbs. Two of the
emitters are also malformed: the home's list has 1 item and the blog
index's uses relative URLs. This spec:

- adds visible breadcrumbs to the 3 service pages;
- removes the schema everywhere else;
- fixes the `seo-guide-lines` guidance that produced the problem
  (`SKILL.md`: "Breadcrumb schema on non-homepage pages").

**Depends on spec 13** (`specs/13-jsonld-graph-consolidation.md`), which
must be merged first. Both specs edit the `aditionalSchemas` arrays in
`index.astro` and `nosotros.astro`, and `src/config/seo.ts`.

## Scope

**In:**

- **New `src/components/ui/Breadcrumbs.astro`** (flat in `ui/`, per
  `AGENTS.md` § Components):
  - Props: `items: { name: string; path: string }[]`, typed with an
    `interface`.
  - Renders `<nav aria-label="Breadcrumb"><ol>…</ol></nav>`. Every item
    except the last is an `<a href={path}>`. The last one is plain text
    with `aria-current="page"`.
  - The `/` separators are `aria-hidden="true"`.
  - The list wraps (`flex-wrap`), so long titles don't cause horizontal
    scroll at 360 px.
  - Styling uses `global.css` tokens and no arbitrary values, as the
    `AGENTS.md` conventions require. It reproduces the posts' current
    look. The posts' existing `text-deepdark-*` classes are not defined in
    `@theme` and render nothing, so they are dropped. Their effective
    colors (`text-gray-600` / `dark:text-softWhite/80`) map to the nearest
    tokens.
  - Built through the `front-end-astro` skill.
- **`generateBreadcrumbSchema`** (`src/config/seo.ts`) takes
  `{ name, path }[]` and builds each `item` as `COMPANY_INFO.url + path`
  itself. Callers can no longer pass relative or unslashed URLs. Its only
  remaining callers are the two below.
- **Posts:**
  - `src/pages/blog/[slug].astro` defines the items array once:
    `Inicio /`, `Blog /blog/`, `<title> /blog/<slug>/`. The last path must
    equal the post's canonical path.
  - It replaces the inline `<nav aria-label="Breadcrumb">` (`:45-70`)
    with `<Breadcrumbs items={…} />` in the same position.
  - It passes the same array to `PostLayout` through a new `breadcrumbs`
    prop. `PostLayout.astro` builds the schema from that prop and no
    longer builds its own list (`:57-61`).
- **Service pages:** `src/layouts/ServiceLayout.astro` defines the items
  (`Inicio /`, `Servicios /servicios/`, `<service.title>
/servicios/<slug>/`). From that one array it:
  - renders `<Breadcrumbs>` **above `<slot />`**, so it sits above
    `GlobalHero`, left-aligned in a `max-w-7xl` container;
  - builds the schema.

  `GlobalHero.astro` is not touched. The fixed navbar is already offset by
  `main`'s `pt-20` (`MainLayout.astro:197`).

- **Remove `BreadcrumbList`** (the schema, plus the now-unused
  `generateBreadcrumbSchema` and `COMPANY_INFO` imports) from:
  - `src/pages/index.astro` (the 1-item list);
  - `src/pages/contacto.astro`;
  - `src/pages/nosotros.astro`;
  - `src/pages/politicadeprivacidad.astro`;
  - `src/pages/terminosycondiciones.astro`;
  - `src/pages/servicios/index.astro`;
  - `src/pages/proyectos/index.astro`;
  - `src/pages/proyectos/[slug].astro` (its future structure is spec 15's
    decision);
  - `src/layouts/BlogLayout.astro`, whose relative-URL list goes away with
    it.
- **`AGENTS.md` § "Layout chain"** states the rule:
  - `BreadcrumbList` is emitted only where `Breadcrumbs.astro` renders,
    which today means posts and service pages;
  - the schema and the component take the same items array;
  - "BreadcrumbList" is dropped from the generic per-page schema list.
- **`.claude/skills/seo-guide-lines/SKILL.md`.** Rewrite `:155` (the
  checklist item "Breadcrumb schema on non-homepage pages") and the
  `generateBreadcrumbSchema()` mentions in § "Schema by page" (`:201-203`).
  The new text: `generateBreadcrumbSchema()` only when the page renders
  visible breadcrumbs, from the same items array.
- **`.claude/skills/seo-guide-lines/seo-guide-line.md`.** Add that rule
  once, at the start of § "Breadcrumb Schema" (`:716`). The other 38
  mentions stay unchanged.

**Out:**

- Visible breadcrumbs on level-1 pages (`/servicios`, `/proyectos`,
  `/nosotros`, `/contacto`, `/blog`). On those pages "Inicio > X" adds
  nothing the URL doesn't already say.
- `/proyectos/[slug]` visible breadcrumbs. **Spec 15** decides whether
  those 13 pages survive and with what structure.
- `GlobalHero.astro` (used by the home and the hubs too) and its entrance
  animation.
- Changing the `aria-label` text ("Breadcrumb") or the separator glyph.
- Adding a `@id` to `BreadcrumbList` or linking it from a `WebPage` node.
  Spec 13 deliberately adds no `WebPage` nodes.
- Rewriting the other 38 breadcrumb mentions in `seo-guide-line.md`, and
  propagating anything to the `astro-harness` scaffold.

## Files affected

- New: `src/components/ui/Breadcrumbs.astro`.
- `src/config/seo.ts`: the `generateBreadcrumbSchema` signature.
- `src/pages/blog/[slug].astro` and `src/layouts/PostLayout.astro`: one
  items array, the component, the `breadcrumbs` prop.
- `src/layouts/ServiceLayout.astro`: the items array, the component, the
  schema.
- Schema removal: `src/pages/index.astro`, `contacto.astro`,
  `nosotros.astro`, `politicadeprivacidad.astro`,
  `terminosycondiciones.astro`, `servicios/index.astro`,
  `proyectos/index.astro`, `proyectos/[slug].astro`, and
  `src/layouts/BlogLayout.astro`.
- `AGENTS.md`: § "Layout chain".
- `.claude/skills/seo-guide-lines/SKILL.md` and `seo-guide-line.md`.

The `seo.ts` generator and the layouts are **Invariant** SEO machinery.
`Breadcrumbs.astro` is a new `ui/` primitive and follows the § Components
conventions. No Variable data changes.

This change matches **no row** in "If you change X → update Y". It changes
neither folder conventions (a flat `ui/` file is the existing convention)
nor dependencies. The contract still gets updated in the same change,
because § "Layout chain" would otherwise be false.

## Source of the content

The only client-facing data is the breadcrumb labels and paths. Each
comes from existing values:

- "Inicio", "Blog" and "Servicios" are the labels the current schema and
  the posts' visible nav already use.
- Service names come from `service.title` (`src/config/services.ts`).
- Post titles come from `post.data.title`.

Policy basis: `~/helpers-proyects/seo-schema-org-buenas-practicas-2026.md`:

- § 5.2: Breadcrumb is still supported, but is shown on desktop only.
- § 9 checklist: "`BreadcrumbList` solo si las migas son visibles".
- § 8 item 1: no markup for content that isn't visible.
- § 8 item 9: no structured data on `noindex` pages (the legal pages).

## Decisions made and discarded

The routing context is the 2026-10-12 review, items IMPROVE-9 and DELETE-4
(Engram `mem_search "seo infra review 2026-10-12"`). Spec 14's decisions
are saved under the topic `shine/spec-14-breadcrumb-schema-alignment`.

- **Picked: full lane.** Deciding which pages show breadcrumbs is a
  visible UI and information-architecture decision.
- **Picked: keep `BreadcrumbList` only on level-2 pages with visible
  breadcrumbs** (posts and services).
  - **Discarded: visible breadcrumbs on every page except the home.** That
    is about 8 templates of UI for level-1 pages, where a 2-item trail
    adds nothing.
  - **Discarded: no UI at all, schema on posts only.** The service pages
    would lose their desktop breadcrumb display, and they are the most
    commercially important level-2 pages.
- **Picked: remove the breadcrumb schema from `/proyectos/[slug]` now.**
  - **Discarded: adding visible breadcrumbs there now.** Spec 15 may merge
    or drop those pages.
  - **Discarded: leaving them as-is until spec 15.** That would keep
    invisible markup live in the meantime.
- **Picked: a shared `Breadcrumbs.astro` fed by the same array as the
  schema.**
  - **Discarded: copying the post's `<nav>` into `ServiceLayout`.** That
    leaves two copies of the markup and two data sources that can drift.
- **Picked: `generateBreadcrumbSchema` takes paths and makes them
  absolute itself.** This removes the whole class of bug behind
  `BlogLayout`'s relative URLs and the home's unslashed URL.
- **Picked: on service pages, place the breadcrumbs above the hero,
  left-aligned, rendered by `ServiceLayout`.**
  - **Discarded: a new slot inside `GlobalHero`.** It would touch a
    component shared with the home and hubs, along with its entrance
    animation.
- **Picked: the component uses tokens and no arbitrary values, even though
  the posts' current nav uses `text-[min(5vw,16px)]` and undefined
  `deepdark-*` classes.** `AGENTS.md` conventions apply to new code, and
  the posts' look changes at most marginally.
- **Picked: fix the skill's generic guidance in `SKILL.md`, plus one rule
  line in the reference.** "Breadcrumbs only if visible" is universal, as
  was `FAQPage` in spec 11.
  - **Discarded: rewriting all 39 reference mentions.** Most are code
    examples that stay valid whenever breadcrumbs are visible.

## Acceptance criteria

All `dist/` checks run after a fresh `pnpm build`.

- [x] `grep -rl '"BreadcrumbList"' dist --include=*.html` returns exactly
      **8 files**: the 5 `dist/blog/<post>/index.html` and the 3
      `dist/servicios/<slug>/index.html`.
- [x] Each of those 8 files also contains `aria-label="Breadcrumb"`, and
      no other `dist/**/*.html` page does.
- [x] Every `"item"` value inside a `BreadcrumbList` in `dist/` starts with
      `https://shineagencia.com/` and ends with `/`. On each page, the last
      item's `item` equals that page's `<link rel="canonical">` href.
- [x] On each of the 8 pages, the visible breadcrumb labels, in order,
      equal the schema's `name` values in order.
- [x] `dist/index.html`, `dist/blog/index.html`,
      `dist/politicadeprivacidad/index.html` and
      `dist/terminosycondiciones/index.html` contain no `BreadcrumbList`.
- [x] `grep -rn "generateBreadcrumbSchema" src/` matches only `seo.ts`,
      `PostLayout.astro` and `ServiceLayout.astro`.
- [x] `grep -rn "Breadcrumb schema on non-homepage pages" .claude/skills/`
      returns 0 matches. `seo-guide-line.md` § "Breadcrumb Schema" opens
      with the only-if-visible rule.
- [x] `AGENTS.md` § "Layout chain" states the only-where-visible rule and
      names `Breadcrumbs.astro`.
- [x] `src/components/ui/Breadcrumbs.astro` contains no `[` arbitrary-value
      class and no hardcoded color outside the `global.css` tokens.
- [x] Manual check at 360 px and 1280 px, light and dark:
  - a service page shows the breadcrumbs above the hero, readable, with no
    horizontal scroll;
  - a post's breadcrumbs look the same as before, with at most a token
    color shift;
  - every link is reachable with the keyboard.
- [x] `pnpm build` passes. `pnpm check` reports no errors beyond the `dev`
      baseline.

## Implementation plan

1. Baseline, with no code change, on `dev` with spec 13 merged: build,
   then record `grep -rl '"BreadcrumbList"' dist` (29 files expected) and
   the `pnpm check` error list. Take screenshots of a post's breadcrumbs
   at 360 px and 1280 px.
2. `src/components/ui/Breadcrumbs.astro` via `front-end-astro`. Nothing
   uses it yet.
3. `generateBreadcrumbSchema` takes `{ name, path }[]`. In the same step,
   convert its current callers to paths so the build stays green. Callers
   that step 6 will delete may simply have their calls removed early.
4. Posts: the items array in `blog/[slug].astro`, `<Breadcrumbs>` in place
   of the inline nav, and the `breadcrumbs` prop into `PostLayout`, which
   now builds the schema from that prop.
5. `ServiceLayout.astro`: the items array, `<Breadcrumbs>` above
   `<slot />`, and the schema from the same array.
6. Remove `BreadcrumbList` and the unused imports from the 8 pages and
   `BlogLayout.astro` listed in Scope.
7. `AGENTS.md` § "Layout chain", `SKILL.md` (`:155`, `:201-203`), and the
   rule line in `seo-guide-line.md` § "Breadcrumb Schema".
8. Fresh `pnpm build`, run every acceptance check, then hand off to
   `spec-verifier`. The visual and keyboard check is left to a human.
