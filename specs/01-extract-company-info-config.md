# 01 — extract company info config

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Extract `COMPANY_INFO` out of `src/config/seo.ts` into a dedicated
`src/config/companyInfo.ts`, mirroring the pattern already used in the
sibling client repo AguilarAbogados (`src/config/companyInfo.ts` there),
and fold `ORGANIZATION_SCHEMA`'s hardcoded geo coordinates into
`COMPANY_INFO.geo` so location data has one home instead of two. This is a
structural/config-file-location change — no client-facing values change
except the new `geo` field, whose numbers already exist in the codebase
today.

## Scope

**In:**

- New `src/config/companyInfo.ts` exporting a typed `CompanyInfo` interface
  and the `COMPANY_INFO` const (all fields currently in `seo.ts:12-37`),
  plus a new `geo: { latitude: 4.7109886, longitude: -74.072092 }` field
  (moved from `ORGANIZATION_SCHEMA.geo` in `seo.ts:109-113`).
- `seo.ts` becomes a consumer: imports `COMPANY_INFO` from `./companyInfo`
  instead of defining it; `ORGANIZATION_SCHEMA.geo` reads from
  `COMPANY_INFO.geo`.
- Repoint every file currently importing `COMPANY_INFO` from
  `@/config/seo` (or relative `./seo`) to `@/config/companyInfo` instead:
  `src/components/global/WhatsApp.astro`,
  `src/components/global/Footer.astro`, `src/layouts/PostLayout.astro`,
  `src/layouts/ServiceLayout.astro`, `src/config/site.ts`,
  `src/pages/index.astro`, `src/pages/politicadeprivacidad.astro`,
  `src/pages/contacto.astro`, `src/pages/nosotros.astro`.
- Update `AGENTS.md`: the **Config** section's `seo.ts` bullet (drop the
  `COMPANY_INFO` mention, note it now imports it) plus a new
  `companyInfo.ts` bullet; the **Knobs map** row "Company data (name,
  phone, email, social, url)" repointed to
  `src/config/companyInfo.ts`.

**Out:**

- No value changes to any existing `COMPANY_INFO` field.
- No `TESTIMONIALS`/`MAIN_KEYWORDS`-style additions — AguilarAbogados
  models those in its `companyInfo.ts`, but Shine has no equivalent data
  today and none is being invented here.
- No change to `SITE_CONFIG`'s shape in `site.ts`, only its import source.

## Files affected

Cross-references AGENTS.md's **Knobs map** row "Company data (name,
phone, email, social, url) | `src/config/seo.ts` → `COMPANY_INFO`" and the
**Evolving the scaffold** table row "Add/rename a config file in
`src/config/`" → "Config section · Knobs map". Both are updated in this
change per that table.

- `src/config/companyInfo.ts` (new)
- `src/config/seo.ts`
- `src/components/global/WhatsApp.astro`
- `src/components/global/Footer.astro`
- `src/layouts/PostLayout.astro`
- `src/layouts/ServiceLayout.astro`
- `src/config/site.ts`
- `src/pages/index.astro`
- `src/pages/politicadeprivacidad.astro`
- `src/pages/contacto.astro`
- `src/pages/nosotros.astro`
- `AGENTS.md` (Config section, Knobs map)

## Source of the content

N/A — no new client-facing data is introduced. The `geo` coordinates being
folded in already exist in `src/config/seo.ts:111-112` (`ORGANIZATION_SCHEMA`)
and are simply relocated, not sourced fresh.

## Decisions made and discarded

- **Re-export `COMPANY_INFO` from `seo.ts` instead of repointing all
  consumers** — discarded: doesn't match the AguilarAbogados reference
  pattern (every consumer there imports directly from `companyInfo.ts`,
  including `seoConf.ts` itself), and leaves two valid import paths for
  the same value going forward.
- **Move `COMPANY_INFO` only, leave `geo` duplicated in
  `ORGANIZATION_SCHEMA`** — discarded per explicit direction to fold geo
  in; leaving it hardcoded separately from `COMPANY_INFO` keeps two homes
  for the same location data.
- **Chosen:** full extraction to `src/config/companyInfo.ts`, geo folded
  into `COMPANY_INFO`, every consumer repointed, `AGENTS.md` updated in
  the same change.

## Acceptance criteria

- [x] `src/config/companyInfo.ts` exists, exporting a `CompanyInfo`
      interface and `COMPANY_INFO` const including `geo`.
- [x] `src/config/seo.ts` no longer defines `COMPANY_INFO`; imports it
      from `./companyInfo`; `ORGANIZATION_SCHEMA.geo` reads from
      `COMPANY_INFO.geo` (same lat/long values as before).
- [x] All 9 listed consumer files import `COMPANY_INFO` from
      `@/config/companyInfo`.
- [x] No remaining `import { COMPANY_INFO } from "@/config/seo"` (or
      relative `./seo`) anywhere under `src/`.
- [x] `AGENTS.md` Config section and Knobs map updated to reflect the new
      file.
- [x] `pnpm check` passes. (Confirmed no NEW errors introduced; 5
      pre-existing errors in `mockGoogleReviews.ts` and
      `LatestProjectsAlt.astro` are identical on `dev` and unrelated to
      this spec.)

## Implementation plan

1. Create `src/config/companyInfo.ts` with a `CompanyInfo` interface and
   the `COMPANY_INFO` const, moved from `seo.ts:12-37`, with `geo:
{ latitude: 4.7109886, longitude: -74.072092 }` added.
2. In `seo.ts`: delete the `COMPANY_INFO` definition, add
   `import { COMPANY_INFO } from "./companyInfo";`, and change
   `ORGANIZATION_SCHEMA.geo` to `{ "@type": "GeoCoordinates", latitude:
COMPANY_INFO.geo.latitude, longitude: COMPANY_INFO.geo.longitude }`.
3. Update the 9 consumer files' import statements to pull `COMPANY_INFO`
   from `@/config/companyInfo`.
4. Update `AGENTS.md`'s Config section and Knobs map row per the table
   above.
5. Run `pnpm check` to confirm no type/diagnostic breakage.
