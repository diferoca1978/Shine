# 04 — trailing slash and legacy redirects

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Fix the two technical causes behind 16 of the 31 "not indexed" URLs in the
Google Search Console page-indexing report of 2026-09-13: internal links
emitted **without a trailing slash** (Google crawls a 301 variant of pages
that already exist, burning crawl budget) and **legacy URLs from the May
2026 service restructure** that 404 with no redirect because this repo has
never had a redirects file. Surfaced by a GSC report review on 2026-09-16.

## Scope

**In:**

- Add the trailing slash to the 6 internal links that emit it without one
  (`BlogCard.astro:50`, `ServiceCard.astro:49`, `Footer.astro:208` and
  `:214`, `ServicesLanding.astro:18`, `terminosycondiciones.astro:279`).
  The canonical tags are already correct — `src/config/seo.ts:287-289`
  normalizes every path — so this is a link-emission defect only, not a
  canonical defect.
- Align the one JSON-LD `url` that is built without the trailing slash
  (`src/pages/servicios/index.astro:31`) with the canonical that
  `generatePageSEO` emits (`src/config/seo.ts:287-289`). The `@id` values
  in the same block are deliberately **not** changed — see the amendment
  note under "Decisions made and discarded".
- Add the trailing slash to the 8 blog-markdown CTA links that point at
  `(/contacto)` and to the 2 page links in `src/pages/llms.txt.ts:30-31`.
  **Added 2026-09-16 during implementation** — these were missed at spec
  time because the original acceptance grep only scanned `src/**/*.astro`
  (see the amendment note on acceptance criterion 1). They are the site's
  highest-intent internal links, so they are the most valuable instance of
  exactly the defect this spec targets.
- New `public/_redirects` with 7 permanent (301) rules for the legacy URLs
  listed in the redirect map below.
- A new row in AGENTS.md's "If you change X → update Y" table for
  `public/_redirects`, since no existing row covers a deploy-level
  redirects artifact.

**Out:**

- **Deploying `dev` to `main`.** At the time of writing, `main` is 36
  commits behind `dev` and production still 404s on `/servicios/`. This is
  a release-process precondition, not part of this spec — but three
  redirect rules below target `/servicios/`, so **the deploy must land
  before or with this change** or those rules would 301 into a 404.
- `/blog/marketing-digital-para-abogados/` (GSC: "Crawled, currently not
  indexed"). It is technically perfect — 200, correct canonical,
  `index, follow`, crawled 2026-09-03. Google made a quality judgement.
  That is content/E-E-A-T/internal-linking work, a different kind of task
  with a different kind of verification. Own spec.
- Manual Google Search Console actions (requesting indexing for
  `/servicios/ecommerce/`, validating fixes). Recorded in
  `docs/gsc-acciones-manuales.md` instead — `spec-verifier` cannot verify
  them against a build.
- The 3 URLs GSC reports with a literal asterisk (`/servicios/*`,
  `/politicadeprivacidad*`, `/404*`). These are not real URLs: Googlebot
  is reading the `href_matches` glob patterns out of the Speculation
  Rules `<script>` in `src/layouts/MainLayout.astro` and crawling them
  literally. Nothing to fix — removing a working LCP optimization to
  satisfy a crawler misparse is the wrong trade.
- `/~partytown/` (a 404 on the Partytown asset directory — correct and
  expected) and the `http://` / `www.` variants of the homepage (normal
  platform-level normalization, already 301, no action).
- The 2 `noindex` legal pages. Intentional
  (`politicadeprivacidad.astro:16`, `terminosycondiciones.astro:16`) and
  already excluded from the sitemap in `astro.config.mjs`.
- `/blog` under GSC's "Redirect error". Last crawled 2026-05-14; verified
  on 2026-09-16 to return `301 → /blog/` correctly. Stale report data,
  resolves itself on the next crawl.

## Files affected

**Matches no existing row** in AGENTS.md's "If you change X → update Y"
table. `public/_redirects` is a new deploy-level artifact — it is not a
`src/config/` file, not a dependency, and not a folder convention — so
this spec adds a row for it (see Implementation plan step 6). The six href
edits are ordinary component edits and need no table row.

- `public/_redirects` (new)
- `src/components/ui/BlogCard.astro` (line 50 — `href={`/blog/${slug}`}`)
- `src/components/ui/ServiceCard.astro` (line 49 —
  `href={`/servicios/${slug}`}`)
- `src/components/global/Footer.astro` (lines 208, 214 —
  `/politicadeprivacidad`, `/terminosycondiciones`)
- `src/components/section/landing/ServicesLanding.astro` (line 18 —
  `/servicios`)
- `src/pages/terminosycondiciones.astro` (line 279 —
  `/politicadeprivacidad`)
- `src/pages/servicios/index.astro` (line 31 — the CollectionPage `url`)
- `src/content/blog/marca-personal-ai.md` (lines 49, 73),
  `seguridad-web-astro-framework.md` (27, 162),
  `ventajas-astro-framework-2026.md` (18, 72),
  `marketing-digital-para-abogados.md` (223, 229) — CTA link targets only,
  no copy changes
- `src/pages/llms.txt.ts` (lines 30-31 — `/nosotros/`, `/contacto/`)
- `src/config/seo.ts` (line 428 — `CONTACT_PAGE_SCHEMA.url`; fixed manually
  2026-09-16, `@id` deliberately untouched)
- `AGENTS.md` ("If you change X → update Y" table — new row)

## Source of the content

This spec introduces no client-facing copy. It does depend on one
already-approved business fact — which services were deleted — which
determines where two redirect rules point:

- `docs/ReestructuraShineAgenciaCambioMayo.md` — the May 2026 service
  restructure. "Optimización y Rediseño Web"
  (`/servicios/rediseno-web-estrategico/`) and "Estrategia de Marca
  Personal" (`/servicios/marca-personal/`) were **deleted**, not renamed.
  The three current services are Diseño Web con Astro, Google Ads y
  Facebook Ads, and Ecommerce con Tienda Nube.

This matters because `rediseno-web-estrategico` looks like an old slug of
the live `diseno-web-estrategico` page but is not — it was a separate,
discontinued service. Redirecting it to the live web-design page would
assert a continuity the business no longer offers.

### Redirect map

| Legacy URL                                  | Destination                              | Why                                                                               |
| ------------------------------------------- | ---------------------------------------- | --------------------------------------------------------------------------------- |
| `/servicios/rediseno-web-estrategico/`      | `/servicios/`                            | Deleted service                                                                   |
| `/servicios/redise%C3%B1o-web-estrategico/` | `/servicios/`                            | Deleted service, accented variant                                                 |
| `/servicios/marca-personal/`                | `/servicios/`                            | Deleted service                                                                   |
| `/terminos-y-condiciones`                   | `/terminosycondiciones/`                 | Renamed slug, same page                                                           |
| `/politica-de-privacidad`                   | `/politicadeprivacidad/`                 | Renamed slug, same page                                                           |
| `/lawz/`                                    | `/blog/marketing-digital-para-abogados/` | Legacy legal-sector landing; closest live content                                 |
| `/blog/2/`                                  | `/blog/`                                 | Pagination that no longer exists — `src/pages/blog/index.astro` does not paginate |

## Decisions made and discarded

- **Trailing slash: set `trailingSlash: "always"` in `astro.config.mjs`,
  or add a lint check to `harness/lint-customization.sh`** — discarded in
  favour of editing the 6 hrefs directly. The config option changes
  build-wide behaviour and would need its interaction with the Netlify
  adapter verified, which is disproportionate risk for a defect that is 6
  literal characters. The lint check prevents recurrence but adds
  permanent maintenance for a one-off. **Chosen:** edit the hrefs. If the
  defect recurs, the lint check becomes worth writing then.
- **Redirects location: `netlify.toml` or Astro's `redirects` key in
  `astro.config.mjs`** — discarded. `astro.config.mjs` would be portable
  across hosts but its behaviour with the Netlify adapter on a static
  build needs verification (see Implementation plan step 3);
  `netlify.toml` is more verbose for no gain here. **Chosen:**
  `public/_redirects` — Netlify-native, one line per rule, touches no
  build config.
- **Deleted services: redirect `rediseno-web-estrategico` to the live
  `/servicios/diseno-web-estrategico/`** (both are web design) —
  discarded. It preserves more link equity but tells Google and the user
  that a discontinued service became another one. Google treats
  irrelevant redirects as soft 404s anyway, so the equity is not reliably
  preserved. **Chosen:** both deleted services go to `/servicios/`, where
  the visitor sees the current catalogue and chooses. Uniform and honest.
- **`/servicios/marca-personal/` to `/blog/marca-personal-ai/`** —
  discarded: sends commercial intent to an article.
- **Scope: split into two specs** (links / redirects) — discarded. Both
  come from the same GSC report, together they are ~7 lines plus one new
  file, and they share one verification pass. One spec, one branch, one
  PR.
- **Quick definition without detailed clarification** — not applicable;
  Phase 2 was completed in full across three question blocks.

### Amendment, 2026-09-16 (during implementation)

The original spec asked for the JSON-LD `@id` at `index.astro:35` to gain a
trailing slash, comparing it against `ServiceLayout.astro:32`. That anchor was
wrong: `ServiceLayout.astro:32` is a breadcrumb **`url`**, while the node
`index.astro:35` references is the Service `@id` declared at `seo.ts:366`.
Adding the slash to one side only would have de-linked the schema graph in two
places (`index.astro:35` ↛ `seo.ts:366`, and `index.astro:28` ↛ `seo.ts:399`).

In JSON-LD, `@id` is an opaque identifier — it is not required to equal the
canonical URL, only to be identical between declaration and reference. `url`
is the property that should match the canonical.

**Discarded:** propagating trailing slashes into every `@id` in
`src/config/seo.ts` (`:119`, `:122`, `:366`, `:399`) plus `site.ts:22`. It
would keep the graph linked, but it edits SEO machinery AGENTS.md marks
**Invariant**, and it is not needed for this spec's goal — the GSC crawl-budget
problem is about `href`s and redirects, not `@id`s.

**`url` properties in `src/config/seo.ts` are a separate case** and were
brought in scope. `CONTACT_PAGE_SCHEMA.url` (`seo.ts:428`) was fixed manually
by the repo owner on 2026-09-16: it read `.../contacto` while the page
canonical is `.../contacto/`. Safe, because that schema's `@id`
(`.../contacto#contactpage`) is declared once and referenced nowhere else, so
no graph edge depends on it. Still open by the Invariant decision above:
`seo.ts:122`, `:173`, `:186`, `:254` — the same `url`-vs-canonical drift on the
blog and services-list schemas. Track separately.

**Chosen:** change only the CollectionPage `url` (`index.astro:31`) and leave
all `@id` values slashless and internally consistent. Scope, plan step 3,
"Files affected" and acceptance criterion 2 were updated accordingly.

## Acceptance criteria

- [x] No internal link is emitted without a trailing slash. Checked against the
      **build** rather than source, so links that originate in blog markdown are
      covered too:

      ```bash
      grep -rhoE 'href="/[^"#?]*"' dist --include="*.html" | sort -u \
        | grep -vE '/"$' \
        | grep -vE '\.(png|jpg|jpeg|svg|ico|webp|txt|xml|json|avif|woff2?|css|js)"$'
      ```

      returns no matches.

      > **Amended 2026-09-16.** The original criterion ran a source-only regex,
      > `href=(\{`|")/(blog|servicios|contacto|…)[^"`]*[^/]("|`})` over
      > `src/**/*.astro`. It required at least one character between the path
      > keyword and the closing quote, so it structurally could not match
      > `href="/contacto"` — where the path *is* the keyword — and returned a
      > false pass while 8 slashless CTA links shipped in the blog posts. It also
      > never saw `src/content/blog/*.md` at all.

- [x] Page URLs in the built `dist/llms.txt` carry a trailing slash
      (`/nosotros/`, `/contacto/`). The `/llms/*.txt` entries are files, not
      pages, and correctly have none.
- [x] `src/pages/servicios/index.astro:31` builds its CollectionPage `url` as
      `${COMPANY_INFO.url}/servicios/`, matching the canonical that
      `generatePageSEO` emits (`src/config/seo.ts:287-289`).
- [x] The JSON-LD `@id` values are left slashless and internally consistent:
      `index.astro:28` matches `seo.ts:399`, and `index.astro:35` matches the
      Service node declared at `seo.ts:366`. `@id` is an opaque identifier, not
      a canonical URL — it must match its reference, not the address bar.
- [x] `public/_redirects` exists and contains exactly the 7 rules in the
      redirect map above, each with status `301`.
- [x] `pnpm build` passes and `dist/_redirects` exists with the same 7
      rules (Netlify only applies the file if it reaches the publish
      directory).
- [x] ~~`pnpm check` passes.~~ **Blocked by a pre-existing `dev` defect —
      amended 2026-09-16.** `pnpm check` reports 2 errors, both
      `ts(18048): 'project.data.stack' is possibly 'undefined'` at
      `src/components/section/landing/LatestProjectsAlt.astro:57` and `:108`.
      `content.config.ts:18` declares `stack` as `.optional()`, so it is
      `string[] | undefined`, and both call sites `.map()` it unguarded.
      `pnpm build` passes because Astro does not type-check at build time —
      only `astro check` does — so `dev` has been red on this command
      independently of this spec.

      The erroring component, `src/content.config.ts` and `src/content/works/*`
      are all byte-identical to `dev` on this branch, so this is **not** a
      regression from this work. Fixing it was deliberately declined here to
      keep the branch scoped; tracked as `fix-works-stack-optional-type` in
      `feature_list.json`.

      **Revised criterion:** `pnpm check` reports no errors *other than* the 2
      pre-existing `LatestProjectsAlt.astro` `ts(18048)` errors, i.e. this
      branch introduces no new type errors.

- [x] AGENTS.md's "If you change X → update Y" table has a row covering
      `public/_redirects`.
- [x] Built HTML spot-check: `grep -o 'href="/blog/[^"]*"' dist/blog/index.html`
      shows every post link ending in `/`.

**Post-deploy** (verifiable only once the change is live in production —
not a gate for merging):

- [x] `curl -sI https://shineagencia.com/terminos-y-condiciones` returns
      `301` with `location: /terminosycondiciones/`.
- [x] The same holds for the other 6 rules, and no rule 301s into a 404
      (in particular the three `/servicios/` targets, which require the
      spec 03 hub page to be live).

## Implementation plan

1. Confirm the spec 03 hub page (`/servicios/`) is either already in
   production or shipping in the same release. If it is not, stop — three
   redirect rules would point at a 404. (As of 2026-09-16 it is merged
   into `dev` but not `main`.)
2. Edit the 6 hrefs to add the trailing slash: `BlogCard.astro:50`,
   `ServiceCard.astro:49`, `Footer.astro:208` and `:214`,
   `ServicesLanding.astro:18`, `terminosycondiciones.astro:279`.
3. Edit `src/pages/servicios/index.astro:31` so the CollectionPage `url`
   carries the trailing slash. Leave every `@id` in that block untouched.
4. Create `public/_redirects` with the 7 rules from the redirect map, one
   per line, in `source destination 301` format. While writing it,
   verify against current Netlify documentation: (a) how `_redirects`
   interacts with Netlify's own automatic trailing-slash normalization,
   so a rule is not shadowed; (b) whether the accented rule must be
   written percent-encoded (`redise%C3%B1o`), raw (`rediseño`), or both to
   match what Googlebot requests. This was deliberately left unverified at
   spec time — resolve it here, with the docs open.
5. Run `pnpm build` and confirm `dist/_redirects` was copied through, then
   spot-check the built blog and services HTML for trailing slashes.
6. Add the AGENTS.md row: "Add/change a deploy-level redirect →
   `public/_redirects` · verify `dist/_redirects` after build".
7. Run `pnpm check`. Hand off to `spec-verifier` for the acceptance
   criteria above; the post-deploy block is re-run by a human once the
   release is live.
