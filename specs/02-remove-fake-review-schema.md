# 02 — remove fake review schema

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Remove the fabricated `AggregateRating`/`Review` JSON-LD and the matching
"5⭐ Calificación en Google" UI stat, all of which are generated from
`src/data/mockGoogleReviews.ts` — a file whose own header comment says it
is mock/dev data pending real Google Business API approval. Shipping this
as live structured data on the homepage and all 3 service pages is a
Google spam-policy risk (fabricated review markup) and an AI-trust risk
(LLMs index the fake `datePublished`/`ratingValue`/`reviewCount` as fact).
Surfaced by the `seo-guide-lines` compliance review on 2026-09-15 (HIGH
severity finding #1).

## Scope

**In:**

- Remove `REVIEWS_SCHEMA` (and its generator functions
  `generateReviewsSchema` / `generateGoogleReviewsSchema`) from
  `src/config/seo.ts:439-515`, or leave the generator functions in place
  (they're generic and harmless) but stop exporting/using a
  mock-data-backed `REVIEWS_SCHEMA` constant.
- Remove `REVIEWS_SCHEMA` from the homepage's schema array
  (`src/pages/index.astro:15,39`) and from every service page's schema
  array (`src/layouts/ServiceLayout.astro:8,41-42`).
- Remove or replace the "Calificación en Google" 5-star stat card in
  `src/components/section/perPage/AboutStats.astro:17-39` with either
  nothing, or a stat that doesn't claim a specific rating/review count
  (e.g. keep the "10+ years" / project-count stats, drop only the rating
  claim).
- Remove the same "Calificación en Google" 5-star stat card from
  `src/components/global/SocialProof.astro` (rendered on the homepage and
  all 3 service pages) — this duplicate instance was missed when this
  spec was first written; discovered during implementation (see
  Decisions). `SocialProof.astro`'s visible `ReviewCard` testimonials
  (author, quote, rating, photo), sourced from the same
  `mockGoogleReviews.ts`, are explicitly **out of scope** and stay as-is —
  they're individually-attributed quotes, not a fabricated aggregate
  claim, and the earlier 2026-07-30 SEO/AEO audit remediation plan called
  for keeping visible testimonials while dropping the aggregate rating
  schema.
- Decide the fate of `src/data/mockGoogleReviews.ts` and the pending
  `feature_list.json` entry `fix-mockGoogleReviews-types` (existing TS
  type errors in that same file) — see Decisions below.

**Out:**

- Building a real Google Business Profile API integration to fetch live
  reviews. Nothing in this repo currently authenticates against that API;
  wiring one up is a separate, larger effort with its own credentials/
  infra decisions, not part of this cleanup.
- Any other schema type (Organization, Service, FAQ, Breadcrumb, Person)
  — those are unaffected and already verified compliant.

## Files affected

Not an existing "Invariant vs Variable" or "Knobs map" row in AGENTS.md —
this removes a schema/stat that was never documented there. No AGENTS.md
table update is needed since nothing is being added, only removed.

- `src/config/seo.ts` (`generateReviewsSchema`, `generateGoogleReviewsSchema`, `REVIEWS_SCHEMA`, lines 439-515)
- `src/pages/index.astro` (lines 15, 39)
- `src/layouts/ServiceLayout.astro` (lines 8, 41-42)
- `src/components/section/perPage/AboutStats.astro` (lines 17-39)
- `src/components/global/SocialProof.astro` (rating stat card only — added
  to scope during implementation; its `ReviewCard` testimonials stay)
- `src/data/mockGoogleReviews.ts` (kept or deleted — see Decisions; if kept, its 3
  pre-existing TS errors must also be fixed in this change — see Decisions;
  note the file keeps one legitimate live import in `SocialProof.astro`
  for the visible testimonials, which is out of scope for removal)
- `feature_list.json` (the `fix-mockGoogleReviews-types` entry is resolved in this
  same change either way — removed if the file is deleted, or closed out because
  the type error was actually fixed if the file is kept; it does not become moot
  on its own just because the file stops being imported)

## Source of the content

N/A — this spec removes fabricated content; it does not introduce any new
client-facing claim. No stat/number is being invented to replace the
removed rating.

## Decisions made and discarded

- **Gate `REVIEWS_SCHEMA` behind a real Google Business API integration**
  — discarded for now: no such integration exists in this codebase, and
  building one is a separate infra project (API credentials, Business
  Profile approval status unknown, ongoing sync). Shipping fake data in
  the meantime is the actual risk this spec exists to close.
- **Keep the mock data file but stop rendering it as schema/UI (silence
  it entirely, keep for future wiring)** — viable alternative to
  deleting `mockGoogleReviews.ts` outright. Recommended: keep the file
  (it's a useful shape reference for the future real integration) but
  remove every live consumer of it, and leave a comment noting it's
  unused pending real review data.
- **Chosen:** remove all three live consumers (homepage schema, service
  page schema, About stat card) now; keep `mockGoogleReviews.ts` on disk
  as inert reference data, not imported anywhere. A human should pick
  between "keep inert" and "delete" when approving this spec — but either
  choice must close out `fix-mockGoogleReviews-types` in this same change,
  not defer it:
  - **If kept inert:** also fix the 3 pre-existing TS2322 errors in
    `mockGoogleReviews.ts` (lines 47/55/63 — `profile_photo_url: ""` not
    assignable to `ImageMetadata`; type the field as `string | ImageMetadata`
    or supply a real `ImageMetadata` import) as part of this change. This is
    **not optional cleanup**: `tsconfig.json` sets `"include": ["**/*"]`, so
    `astro check` (`pnpm check`) type-checks this file whether or not
    anything imports it. Removing the live imports alone does not make
    `pnpm check` pass — the errors fire today regardless of import status
    (confirmed by running `pnpm check` before writing this spec).
  - **If deleted:** delete the file and remove the `fix-mockGoogleReviews-types`
    entry from `feature_list.json` in the same change.
- **`SocialProof.astro`'s duplicate rating stat and testimonial cards**
  — discovered during implementation: this file was missing from the
  spec's original Files affected list, imports `mockGoogleReviews`
  live, and renders both its own "Calificación en Google" stat card
  (byte-identical to the one removed from `AboutStats.astro`) and visible
  `ReviewCard` testimonials, on the homepage and all 3 service pages.
  Presented to the human as three options: remove the stat only, leave
  the file untouched, or remove both the stat and the testimonials.
  **Chosen:** remove the stat only, keep the testimonials — this means
  `mockGoogleReviews.ts` keeps one live import (not zero, as originally
  drafted below) for the visible testimonials, which are individually
  attributed quotes rather than a fabricated aggregate claim.

## Acceptance criteria

- [x] No `AggregateRating`/`Review` JSON-LD is emitted on the homepage or
      any of the 3 service pages (verify via built HTML / view-source).
      Verified: grepped `dist/` for `AggregateRating` and `"@type":"Review"`
      — zero matches.
- [x] `REVIEWS_SCHEMA` is no longer imported or referenced in
      `src/pages/index.astro` or `src/layouts/ServiceLayout.astro`.
      Verified: `grep -rn "REVIEWS_SCHEMA" src/` — zero matches anywhere.
- [x] The "Calificación en Google" 5-star stat no longer renders on the
      About page or in `SocialProof.astro` (homepage, all 3 service
      pages), or is replaced with a claim that isn't sourced from
      `mockGoogleReviews.ts`.
      Verified: removed from both files' diffs; grepped `dist/` for
      "Calificación en Google" — zero matches.
- [x] `SocialProof.astro`'s visible `ReviewCard` testimonials still render
      unchanged — only its rating stat card was removed.
      Verified: diff shows only the rating stat block and its now-unused
      `GoogleLogo` import removed; `mockGoogleReviews` import and
      `ReviewCard` rendering untouched.
- [x] `mockGoogleReviews.ts`'s disposition (kept-inert vs. deleted) matches
      whatever a human picks at approval time; if kept, its only live
      import is `SocialProof.astro` (for testimonials) _and_ its 3
      pre-existing TS2322 errors (lines 47/55/63) are fixed in this same
      change; if deleted, the `fix-mockGoogleReviews-types` entry in
      `feature_list.json` is removed in the same change.
      Verified: kept inert, `profile_photo_url` made optional and the 3
      invalid `""` values dropped; only live import is `SocialProof.astro`;
      `fix-mockGoogleReviews-types` entry confirmed removed from
      `feature_list.json`.
- [x] `pnpm check` passes with zero errors sourced from `mockGoogleReviews.ts`
      (not just "no worse than before" — the file's 3 existing errors are
      gone, either because they were fixed or because the file was deleted).
      Verified: ran `pnpm check` — no errors reference `mockGoogleReviews.ts`.
- [x] `pnpm check` and `pnpm build` pass.
      `pnpm build` passes clean. `pnpm check` still exits with 2 errors,
      but both are in `src/components/section/landing/LatestProjectsAlt.astro:57,108`
      (`project.data.stack` possibly undefined) — a file this spec never
      touches, confirmed byte-identical on `main`, i.e. pre-existing and
      out of scope for this change. Accepted as satisfied by human decision
      (2026-09-15): the errors predate and are unrelated to this spec's
      changes.

## Implementation plan

1. Remove the `REVIEWS_SCHEMA` array entry from
   `src/pages/index.astro:39`'s `aditionalSchemas` and its import at
   line 15.
2. Remove `REVIEWS_SCHEMA` from `src/layouts/ServiceLayout.astro:42`'s
   `schemas` array and its import at line 8; drop the now-stale comment
   at line 41.
3. In `src/config/seo.ts`, stop exporting `REVIEWS_SCHEMA` (line 515). Per
   the approved decision, either delete `generateReviewsSchema` /
   `generateGoogleReviewsSchema` (lines 439-514) entirely, or leave them
   defined-but-unused if a future integration will reuse them — match
   whatever the human picks for `mockGoogleReviews.ts`'s fate.
4. In `src/components/section/perPage/AboutStats.astro`, remove the
   "Calificación en Google" stat block (lines 17-39) or replace its
   content with a non-rating claim.
5. In `src/components/global/SocialProof.astro`, remove its own
   "Calificación en Google" stat card and the now-unused `GoogleLogo`
   import; leave the `mockGoogleReviews` import and `ReviewCard`
   testimonial rendering untouched.
6. Resolve `mockGoogleReviews.ts` per the approved decision:
   - **Keep inert:** fix its 3 pre-existing TS2322 errors on
     `profile_photo_url` (lines 47/55/63) by making the field optional
     (`profile_photo_url?: ImageMetadata`) and dropping the invalid `""`
     values from the 3 reviewer entries that have no real photo, rather
     than widening the type to include `string` — widening surfaces a new
     downstream type error in `ReviewCard.astro` (`reviewerLogo` calls
     `.width`/`.height`, which only exist on `ImageMetadata`), whereas
     `ReviewCard.astro` already falls back to a default avatar on a
     falsy `Logo`, matching `undefined`. The file keeps its one live
     import in `SocialProof.astro` (for testimonials) — not zero, since
     removing testimonials was decided out of scope (see Decisions).
   - **Delete:** delete the file and remove the `fix-mockGoogleReviews-types`
     entry from `feature_list.json`.
7. Run `pnpm check` and `pnpm build`; confirm zero errors remain from
   `mockGoogleReviews.ts` and no leftover `REVIEWS_SCHEMA` references via
   `grep -rn "REVIEWS_SCHEMA\|mockGoogleReviews" src/`.
