# 12 — organization entity truthfulness

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Make every claim the site's JSON-LD makes about Shine Agencia and its two
founders true. Today the Organization schema presents a remote agency as a
`LocalBusiness`, with a fake street address, a placeholder postal code,
coordinates for the center of Bogotá and office hours that appear nowhere
on the site. It also pads the entity with keyword taglines and points
`twitter:site` at an account that doesn't exist. Meanwhile the founders'
real profiles never reach the blog author, and their names are spelled
without accents.

## Scope

**In:**

- **Organization type and location** (`ORGANIZATION_SCHEMA`,
  `src/config/seo.ts`):
  - Change `@type` from `["ProfessionalService", "LocalBusiness"]` to
    `"Organization"`. Shine is remote: the visible FAQ at
    `src/config/faqs.ts:23` says "Nuestro proceso es 100% digital".
  - Remove `streetAddress`, `postalCode`, `geo`,
    `openingHoursSpecification` and `priceRange`.
  - `address` keeps `addressLocality` (Bogotá) and `addressRegion`
    (Cundinamarca). `addressCountry` becomes the ISO alpha-2 string `"CO"`
    instead of the `Country` object.
- **Organization and WebSite taglines:**
  - Remove `alternateName` from both `ORGANIZATION_SCHEMA` and
    `WEBSITE_SCHEMA`.
  - Remove `slogan` ("Resultados medibles, no promesas vacías"), which is
    not shown on any page.
- **`knowsAbout`:** replace the 18 `seoKeywords` phrases with the 3 service
  titles, derived from `services.ts` (`services.map((s) => s.title)`).
- **X/Twitter:** remove `twitter.site` and `twitter.creator`
  (`@shine_agencia`) from all 3 places in `seo.ts` where they appear. The
  account does not exist. `twitter:card` stays.
- **`src/config/companyInfo.ts`:**
  - Remove `address.street`, `address.postalCode` and `geo`, both from the
    `CompanyInfo` interface and from the values.
  - Add `address.countryCode: "CO"`, so the ISO code lives in
    `COMPANY_INFO` instead of being hardcoded in `seo.ts`.
  - Remove every `// Replace with …` comment.
  - Spell `founders` with accents: `["Rocío Parra", "Diego Rodríguez"]`.
- **Founder names with accents everywhere:**
  - `src/config/authors.ts`: change `name` to "Rocío Parra" and "Diego
    Rodríguez", and add an explicit ASCII `id` field to `Author`
    (`"rocio-parra"`, `"diego-rodriguez"`).
  - The blog `author` enum in `src/content.config.ts`.
  - The `author:` frontmatter of the 5 posts.
  - The h2 in `src/components/section/perPage/HeroAbout.astro` ("Somos
    Rocio y Diego" becomes "Somos Rocío y Diego").
- **Stable Person `@id`:** both Person builders in `seo.ts` (the inline
  author block in `generateBlogPostSchema` and `generateAuthorSchema`)
  build the `@id` from `author.id`, not from the name. The `@id` values
  therefore stay `…/nosotros#rocio-parra` and `…/nosotros#diego-rodriguez`,
  exactly as today.
- **Founder `sameAs` on blog authors (diagnosis action 4):** the BlogPosting
  author emits the same `sameAs` array that `generateAuthorSchema` already
  emits on `/nosotros`, built from `authors.ts` `socialMedia`. The user
  confirmed all 3 profiles on 2026-10-12. Both builders use one shared
  helper, so the two lists cannot drift apart.
- **Anchors on `/nosotros` (diagnosis action 4):** in `HeroAbout.astro`,
  split "Rocío y Diego" into `<span id="rocio-parra">Rocío</span> y
<span id="diego-rodriguez">Diego</span>`. These sit inside the existing
  styled span, so the page looks the same.
- **Client override for the `seo-guide-lines` skill:**
  - `AGENTS.md` § "Config" (`companyInfo.ts` bullet) states that Shine is
    remote. Its entity is `Organization`, never `LocalBusiness` or
    `ProfessionalService`, with no street address, `geo` or opening hours.
  - `.claude/skills/seo-guide-lines/SKILL.md` gets one line in § "Schema by
    page" (the "Contact Page: `LocalBusiness`" bullet, `:203`) and in
    § "NAP Consistency" (`:255`) pointing to that `AGENTS.md` note.
- **`AGENTS.md`:** remove `geo` from the `companyInfo.ts` description in
  § "Config" and from the Knobs map's "Company data" row.
- **`seo.ts:563`:** remove the stale comment "Removed LOCAL_BUSINESS_SCHEMA
  - merged into ORGANIZATION_SCHEMA as @type: [ProfessionalService,
    LocalBusiness]".

**Out:**

- Structural JSON-LD changes. These belong to **spec 13**
  (`jsonld-graph-consolidation`), which depends on this one:
  - Organization on every page.
  - `WebSite` on internal pages.
  - The anonymous `copyrightHolder` Organization.
  - `founders` vs `founder` and linking the founders to the Person `@id`s.
  - The `@graph` refactor itself.
- The `Service` schema's `serviceLocation` address, `servicePhone` and
  `keywords`. These belong to the light-lane entry
  `fix-service-schema-props`. Its address (Bogotá, `"CO"`) stays true
  after this change.
- BlogPosting `about` and `author.url`. These belong to the light-lane
  entry `fix-blogposting-about-author-url`. It edits the same author block,
  so whichever lands second rebases onto the other.
- The `ContactPage` props. These belong to the light-lane entry
  `fix-contactpage-schema-props`.
- `DEFAULT_SEO`, `DEFAULT_AUTHOR` and `SITE_CONFIG.llms`. These are dead
  code handled by `remove-dead-seo-generators`. The `@shine_agencia` lines
  inside `DEFAULT_SEO` are still removed here, so the twitter grep comes
  back clean.
- The author's `knowsAbout`/`credentials` content (diagnosis § 3c) and
  diagnosis actions 3, 6 and 7.
- The generic `LocalBusiness` guidance in
  `.claude/skills/seo-guide-lines/seo-guide-line.md` (the `:2014-2089`
  template and the checklists). It is correct for businesses with premises
  and stays unchanged.
- Propagating anything to the `astro-harness` scaffold.
- Image filenames (`diegoyrochi*.webp`) and the GSAP element ids
  `diegorochi` and `diegorochiblack`.

## Files affected

- `src/config/seo.ts`: `ORGANIZATION_SCHEMA`, `WEBSITE_SCHEMA`, the
  twitter blocks (`:30-33`, `:311-314`, `:344-347`), the author block in
  `generateBlogPostSchema`, `generateAuthorSchema`, the new shared
  `sameAs` helper, and the stale comment at `:563`.
- `src/config/companyInfo.ts`: the interface and the values.
- `src/config/authors.ts`: the `Author.id` field, the names, and the
  `getAuthorByName` lookup, which now has to match the accented names.
- `src/content.config.ts`: the blog `author` enum.
- `src/content/blog/*.md`: `author:` frontmatter in 5 posts.
- `src/components/section/perPage/HeroAbout.astro`: the h2 text and the
  2 anchor spans.
- `AGENTS.md`: § "Config" and the Knobs map "Company data" row.
- `.claude/skills/seo-guide-lines/SKILL.md`: 2 one-line pointers.

Changes that follow automatically, with no edit needed:

- `src/config/site.ts:10` (`founders.join(" & ")`).
- The byline in `src/pages/blog/[slug].astro:99`.
- `src/layouts/PostLayout.astro:28`, whose author lookup matches by name.

The closest "If you change X → update Y" row is "Add/rename a config file
in `src/config/` → **Config** section · **Knobs map**". This spec changes
the _shape_ of an existing config file rather than adding or renaming one.
That row's targets still apply and are both updated. `companyInfo.ts` is
Variable data, while the `seo.ts` generators are **Invariant** SEO
machinery (see "Invariant vs Variable").

## Source of the content

This spec changes client-facing data (JSON-LD claims and visible names).
Every value it keeps or adds comes from one of these:

- **Remote, no public premises:** the user's answer on 2026-10-12, which
  matches the visible FAQ at `src/config/faqs.ts:23`.
- **City, region and country:** the existing `COMPANY_INFO.address`
  values. "Bogotá, Colombia" is visible in `Footer.astro:152` and
  `ContactInfo.astro:63`.
- **Founder profiles** (`authors.ts`, `socialMedia`): confirmed as real
  and owned by the founders, user answer on 2026-10-12.
- **`@shine_agencia` does not exist:** user answer on 2026-10-12.
- **Accented names:** user answer on 2026-10-12, which matches the visible
  `/nosotros` title "Rocío Parra y Diego Rodríguez" and the `HeroAbout`
  image `alt` text.
- **`knowsAbout`:** the `title` field of each entry in
  `src/config/services.ts` (`:41`, `:113`, `:185`).
- **Policy basis:** `~/helpers-proyects/seo-schema-org-buenas-practicas-2026.md`
  § 6.2–6.3 and § 6.7 (LocalBusiness only with physical premises;
  ProfessionalService discouraged; `addressCountry` in ISO alpha-2). Also
  Google's [site names](https://developers.google.com/search/docs/appearance/site-names)
  doc, last updated 2025-12-10 (`alternateName` = "a commonly recognized
  acronym or shorter name").

## Decisions made and discarded

Routing context is in Engram (`mem_search "SEO review 2026-10-12"`, items
IMPROVE-1, IMPROVE-7, IMPROVE-16, DELETE-7, DELETE-8, DELETE-9).

- **Picked: full lane.** The entity's type, its claimed location and the
  founders' identities are decisions that needed the user's facts. No
  document answered them.
- **Picked: `Organization`, not a `LocalBusiness` subtype.** Shine has no
  premises that customers visit.
  - **Discarded: keeping `ProfessionalService`.** schema.org discourages
    it, and it is itself a `LocalBusiness` subtype, so it would keep the
    false "physical premises" claim.
- **Picked: keep `address` at the city level.** "Bogotá, Colombia" is true
  and already visible in the footer. Removing `address` altogether would
  throw away a true, visible fact.
- **Picked: `addressCountry` read from a new `COMPANY_INFO.address.countryCode`.**
  Hardcoding `"CO"` in `seo.ts` would create a second home for company
  data, which the Knobs map forbids. `country: "Colombia"` stays for the
  visible text.
- **Picked: delete `street`, `postalCode` and `geo` from `CompanyInfo`.**
  Nothing else uses them, and keeping them as optional fields would invite
  the placeholders back.
- **Picked: remove `alternateName` and `slogan`.**
  - **Discarded: `alternateName: "Shine Agencia Marketing Digital"`**,
    which the user proposed. Google defines `alternateName` as a commonly
    recognized acronym or _shorter_ name, and warns against generic names.
    This value is longer than the real name and appends a generic
    category, the same pattern as the current tagline. The user said to
    fall back to removing it if it didn't fit.
  - **Not picked, still valid for later:** `"Shine"` (a shorter name) or
    `"shineagencia.com"` (the lowercase domain, which Google suggests as a
    fallback).
  - **Discarded: keeping `slogan`.** It is not visible anywhere on the
    site.
- **Picked: `knowsAbout` = the 3 service titles.** They come from existing
  data and stay in sync with `services.ts`.
  - **Discarded: removing `knowsAbout`.** The service titles are a true,
    useful statement of the entity's expertise.
  - **Discarded: a hand-written topic list.** It would become a second
    content source to maintain.
- **Picked: accents everywhere, with an explicit ASCII `Author.id`.**
  Today the `@id` is derived from the name, so adding the accent would
  silently change it to `#rocío-parra` and break every reference to it.
  See Engram `mem_search "JSON-LD @id vs url"` (`@id` is an opaque
  identifier).
  - **Discarded: accents only in display text, with ASCII enum keys.**
    That needs a key→name mapping layer just to avoid editing 5 frontmatter
    lines.
- **Picked: emit `sameAs` on the blog author through one helper shared
  with `generateAuthorSchema`.** This was the "two Person generators"
  defect (diagnosis § 3b). The user confirmed the profiles, so the earlier
  DELETE-9 concern ("remove until ownership is verified") is resolved.
- **Picked: anchors on name spans in the `HeroAbout` h2.** There is no
  per-founder block on `/nosotros`, and wrapping the existing names adds
  no visible change.
  - **Discarded: leaving the `@id` fragment unresolved.** The `@id` is
    opaque and would still be valid. But the anchor costs two spans and
    makes `#rocio-parra` a real, linkable target.
- **Picked: a client override (`AGENTS.md` fact plus pointers in
  `SKILL.md`) instead of rewriting the skill.** Unlike `FAQPage` in spec
  11, the skill's `LocalBusiness` guidance is correct in general and only
  wrong for this client.
- **Picked: remove the twitter handle instead of replacing it.** The
  account doesn't exist, and `twitter:card` works without `twitter:site`.

## Acceptance criteria

All `dist/` checks run after a fresh `pnpm build`.

- [x] `grep -rlE '"(LocalBusiness|ProfessionalService|GeoCoordinates|OpeningHoursSpecification)"' dist/`
      returns no files.
- [x] `grep -rlE '"(priceRange|slogan|alternateName|postalCode|streetAddress)"' dist/`
      returns no files.
- [x] The Organization JSON-LD in `dist/index.html` has
      `"@type":"Organization"`, `"addressLocality":"Bogotá"` and
      `"addressCountry":"CO"`. Its `knowsAbout` is exactly the 3 service
      titles from `services.ts`, in order.
- [x] `grep -rn "shine_agencia" src/ dist/` returns 0 matches, and
      `grep -c 'name="twitter:card"' dist/index.html` ≥ 1.
- [x] `grep -n "Replace with" src/config/companyInfo.ts` returns 0
      matches.
- [x] `grep -rnE "Rocio (Parra|y Diego)|Diego Rodriguez" src/` returns 0
      matches. This targets the names only; it does not touch URLs, image
      imports or the `diegorochi` ids.
- [x] `dist/nosotros/index.html` contains exactly one `id="rocio-parra"`
      and exactly one `id="diego-rodriguez"`, and its Person JSON-LD
      `@id`s are still `https://shineagencia.com/nosotros#rocio-parra` and
      `https://shineagencia.com/nosotros#diego-rodriguez`.
- [x] In `dist/blog/marketing-digital-para-abogados/index.html`:
  - the BlogPosting `author` has `"name":"Rocío Parra"`,
    `"@id":"https://shineagencia.com/nosotros#rocio-parra"`, and a
    `sameAs` containing both of Rocío's `authors.ts` URLs;
  - the visible byline reads `Por: Rocío Parra`.
- [x] In `dist/blog/astro-vs-wordpress-web-estatica/index.html`, the
      BlogPosting author has `"name":"Diego Rodríguez"` and a `sameAs`
      containing his LinkedIn URL.
- [x] `AGENTS.md`:
  - § "Config" states that the entity is a remote `Organization` (never
    `LocalBusiness`/`ProfessionalService`, no address, `geo` or hours) and
    no longer mentions `geo`;
  - the Knobs map "Company data" row no longer lists `geo`.
- [x] `.claude/skills/seo-guide-lines/SKILL.md`: the Contact Page bullet
      and § "NAP Consistency" each carry a pointer to that `AGENTS.md`
      note.
- [x] Manual check: `/nosotros` looks the same in light and dark mode,
      and the `HeroAbout` h2 split animation
      (`src/utils/scripts/perPageAnimations/about/aboutHeroAnimation.js`)
      still runs, with the reduced-motion branch showing the h2 in its
      final state.
- [x] `pnpm build` passes. `pnpm check` reports no errors, including no
      `LatestProjectsAlt.astro` `works.stack` errors and nothing from the
      `CompanyInfo`/`Author` interface changes.

## Implementation plan

1. Baseline, with no code change: build `dev`, then record the
   Organization JSON-LD from `dist/index.html`, the Person `@id`s from
   `dist/nosotros/index.html`, and the `pnpm check` error list.
2. `src/config/authors.ts`: add the `id` field to `Author` and to both
   entries. In `seo.ts`, switch both Person builders to build the `@id`
   from `author.id`, and add the shared `sameAs` helper used by
   `generateAuthorSchema` and the BlogPosting author. Names are still
   ASCII here, so the `@id`s must come out byte-identical to the baseline.
3. Accented names, in one step so the content collection always validates:
   - `authors.ts` names;
   - `companyInfo.ts` `founders`;
   - the `content.config.ts` enum;
   - the 5 posts' `author:` frontmatter.
4. `HeroAbout.astro`: "Rocío" in the h2, plus the two anchor spans. Check
   the about-hero split animation and its reduced-motion branch in the
   browser.
5. `companyInfo.ts`: remove `street`, `postalCode` and `geo` from the
   interface and the values, add `address.countryCode`, and remove the
   "Replace with" comments. In the same step, update
   `ORGANIZATION_SCHEMA` so that nothing references the removed fields:
   - `@type`;
   - `address` with `countryCode`;
   - remove `geo`, `openingHoursSpecification`, `priceRange`, `slogan` and
     `alternateName`;
   - `knowsAbout` from the service titles.
6. `seo.ts`: remove `alternateName` from `WEBSITE_SCHEMA`, the 3 twitter
   `site`/`creator` pairs, and the stale comment at `:563`.
7. `AGENTS.md` (§ "Config" remote-entity note, `geo` removed from § Config
   and from the Knobs map) and the 2 pointer lines in
   `.claude/skills/seo-guide-lines/SKILL.md`.
8. Fresh `pnpm build`, run every acceptance check, then hand off to
   `spec-verifier`. The manual `/nosotros` visual and animation check is
   left to a human.
