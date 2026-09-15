# 03 — services hub page

**Status:** Draft <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Create `src/pages/servicios/index.astro` as a real hub/listing page for the
3 existing service pages. Today `/servicios` is referenced as a live link
and as canonical URLs inside JSON-LD in three places but the route does
not exist — it 404s. Fixing this also satisfies the SEO guide's URL
architecture rule (generic-to-specific hierarchy:
`domain.com/servicios/` → `domain.com/servicios/[service]/` so link
equity/authority flows down correctly), which this repo currently violates
by jumping straight from the homepage to leaf service pages. Surfaced by
the `seo-guide-lines` compliance review on 2026-09-15 (MEDIUM finding #4).

## Scope

**In:**

- New `src/pages/servicios/index.astro`: lists the 3 services already
  defined in `src/config/services.ts` (`diseno-web-estrategico`,
  `publicidad-digital`, `ecommerce`), each linking to its existing leaf
  page. Built with `front-end-astro` (section/layout) +
  `seo-guide-lines` (meta, breadcrumb schema, single H1) per the standard
  page-closing order in AGENTS.md.
- Breadcrumb schema on the new page: Home → Servicios.
- No change to the 3 existing leaf service pages' own content — only that
  their breadcrumb's "Servicios" crumb (`src/layouts/ServiceLayout.astro:32`)
  and `generateServiceSchema`'s `isPartOf` reference
  (`src/config/seo.ts:400`) now point at a page that actually exists.

**Out:**

- Any new service offering, pricing, or claim — the hub page only
  aggregates the 3 services `services.ts` already defines; no new
  client-facing fact is invented.
- Changing the 3 leaf service pages' URLs or slugs.
- A full service-comparison table or filtering UI on the hub — a simple
  listing (name, one-line description, link) satisfies the guide's URL
  architecture requirement; richer hub content can be a follow-up if
  wanted.

## Files affected

Not an existing "Invariant vs Variable" or "Knobs map" row — this adds a
new page under `src/pages/servicios/`, which the "If you change X →
update Y" table's "Add a new page" pattern already covers implicitly via
`feature_list.json`; no AGENTS.md table edit is needed since no scaffold
convention changes, only a new leaf page is added.

- `src/pages/servicios/index.astro` (new)
- `src/layouts/ServiceLayout.astro` (breadcrumb array, line 32 — no change
  needed once the URL resolves, but verify the crumb label/URL still
  matches)
- `src/config/seo.ts` (`generateServiceSchema`'s `isPartOf`, line 400 — no
  change needed, already points at the correct URL; it just starts
  resolving)
- `src/components/section/landing/ServicesLanding.astro` (line 18 — no
  change needed, the existing `/servicios` link starts working)

## Source of the content

The hub page's content (service names, one-line descriptions, slugs) comes
entirely from `src/config/services.ts` (already-approved, in-production
data — no new fact is introduced). No other source document applies.

## Decisions made and discarded

- **Remove the 3 broken `/servicios` references instead of building the
  page** (point `ServicesLanding.astro`'s button at the homepage's
  services section anchor, drop the breadcrumb crumb and `isPartOf`
  entirely) — discarded: this would leave the site with only leaf service
  pages and no hub, which is exactly the flat URL structure the guide's
  "URL Architecture" section warns against, and it throws away a
  three-line internal-linking/authority-accumulation opportunity the
  guide explicitly recommends for very little added maintenance cost.
- **Chosen:** build the hub page. It's a small, low-risk addition (reuses
  existing `services.ts` data, no new copy to write) that fixes three
  separate broken references at once and brings the URL structure in line
  with the guide.

## Acceptance criteria

- [ ] `/servicios` returns 200 (not 404) and lists all 3 services with
      working links to their leaf pages.
- [ ] The page has exactly one `<h1>`, a meta title (50-60 chars) and
      description (150-160 chars) via `generatePageSEO`, and a Breadcrumb
      schema (Home → Servicios).
- [ ] The "Servicios" breadcrumb crumb on all 3 leaf service pages
      (`ServiceLayout.astro:32`) now resolves to a real page.
- [ ] `generateServiceSchema`'s `isPartOf.@id` (`seo.ts:400`) resolves to a
      real, matching `WebPage`/`CollectionPage` `@id` on the new hub page
      (add a matching `@id` to the hub page's own schema so the reference
      isn't dangling).
- [ ] The homepage's `/servicios` button (`ServicesLanding.astro:18`) no
      longer 404s.
- [ ] `pnpm check` and `pnpm build` pass; sitemap includes the new route.

## Implementation plan

1. Read `src/config/services.ts` to confirm the 3 services' shape (name,
   slug, one-line description field) to reuse directly.
2. Build `src/pages/servicios/index.astro`: hero/intro section (via
   `front-end-astro`) + a simple services grid mapping over
   `services.ts`, linking each card to `/servicios/[slug]/`.
3. Close the page with `seo-guide-lines`: `generatePageSEO`, a
   Breadcrumb schema (Home → Servicios) with an `@id` that
   `generateServiceSchema`'s `isPartOf` can reference, single H1.
4. Verify the 3 existing dangling references (`ServiceLayout.astro:32`,
   `seo.ts:400`, `ServicesLanding.astro:18`) now resolve correctly —
   no code change should be needed in them, only confirmation.
5. Run `pnpm build`, check the generated sitemap includes `/servicios/`,
   and spot-check the built HTML for the breadcrumb JSON-LD.
