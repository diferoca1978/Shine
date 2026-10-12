# 11 — faqpage markup cleanup

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Stop emitting `FAQPage` JSON-LD anywhere on the site. Posts mark up Q&A that
no reader can see, which breaks Google's "mark up only what is visible" rule
— and the 2026-10-01 post repeated the mistake. On top of that, Google
stopped showing FAQ results on 2026-05-07, so even the visible-FAQ pages get
nothing from the markup. This spec also removes what keeps reintroducing it:
the `faqs` frontmatter field and the `seo-guide-lines` skill's instructions
to call `generateFAQSchema()`.

## Scope

**In:**

- **Posts.** Remove `FAQPage` emission from `src/layouts/PostLayout.astro`.
  Delete the `faqs:` frontmatter blocks from the 3 posts that have them
  (11 Q&A total, none rendered on the page):
  `astro-vs-wordpress-web-estatica.md` (3),
  `marketing-digital-para-abogados.md` (5), `seguridad-web-astro-framework.md`
  (3). The content is discarded, not moved into the post body.
- **Build-time guard.** In `src/content.config.ts`, replace the blog
  collection's `faqs` field with a guard that fails `astro build` whenever a
  post sets `faqs`. Its error message must say that the site does not emit
  `FAQPage` and point to `AGENTS.md`.
- **Home and service pages.** Remove `FAQPage` emission from
  `src/pages/index.astro` and `src/layouts/ServiceLayout.astro`. Drop the
  imports and the `slugToCategory` map once nothing uses them.
- **`src/config/seo.ts`.** Delete `generateFAQSchema` (including its false
  "rich snippets" JSDoc) and `generateFAQSchemaWithPage`, which was already
  dead. Keep the `FAQItem` interface where it is and rename its section
  comment so it no longer says "FAQ Page Schema".
- **`AGENTS.md`.**
  - § "Layout chain": take "FAQ" out of the per-page schema list and add a
    note that the site does not emit `FAQPage`, with the reason (Google
    stopped showing it on 2026-05-07, so it adds nothing; visible FAQ
    sections stay as content) and the build guard that enforces it.
  - § "Config": remove `generateFAQSchema` from the generator list.
- **`.claude/skills/seo-guide-lines/SKILL.md`.** Remove or rewrite every
  instruction that recommends FAQ schema or `generateFAQSchema()`. Line
  numbers as of 2026-10-12: `:45` ("FAQ schemas for featured snippets"),
  `:117`, `:154`, `:160`, `:201`, and the "Task: Implement FAQ Schema" block
  at `:288-293`. That task becomes "add a visible FAQ section" with no
  schema. Visible FAQ sections are still recommended as AEO content.
- **`.claude/skills/seo-guide-lines/seo-guide-line.md`.** Same treatment.
  Line numbers as of 2026-10-12: `:46`, the "FAQ Schema for Featured
  Snippets" section starting at `:421`, `:913`, `:959-990`, `:2377`,
  `:2412`, `:2432`, `:2581`, `:2665-2666`, `:3209`, `:3289`. Any
  replacement text names the type as `FAQPage`, never as "FAQ schema", so
  the acceptance grep stays meaningful.

**Out:**

- The visible FAQ sections (`src/components/section/FAQ.astro`, the `<FAQ>`
  usages on the home and service pages, `src/config/faqs.ts`). They stay
  unchanged.
- `src/utils/llms.ts` and the "## Preguntas Frecuentes" blocks it writes
  into `/llms/servicios/*.txt`. Those are plain text, not schema.
- The visible "Preguntas frecuentes sobre seguridad web" section in the
  body of `seguridad-web-astro-framework.md` (`:137`). It stays as written.
- Moving the discarded frontmatter Q&A into post bodies. That is a content
  decision for the post author.
- The rest of the dead code from the 2026-10-12 review (HowTo and Reviews
  generators, `DEFAULT_SEO`, `DEFAULT_AUTHOR`, `SITE_CONFIG.llms`). Those
  belong to the light-lane entry `remove-dead-seo-generators`, which will
  no longer need to list the two FAQ generators deleted here. HowTo
  mentions in the `seo-guide-lines` skill are also out.
- Propagating the skill change to the `astro-harness` scaffold repo. It is
  scaffold-level (`AGENTS.md` § "Scaffold-level vs per-client").
- Any other JSON-LD change (Organization, `@graph`, breadcrumbs). Those are
  specs 12–14.

## Files affected

- `src/layouts/PostLayout.astro`: the `FAQPage` spread, the
  `generateFAQSchema` import, and the `faqs` destructure.
- `src/content.config.ts`: the blog `faqs` field becomes the guard.
- `src/content/blog/astro-vs-wordpress-web-estatica.md`,
  `src/content/blog/marketing-digital-para-abogados.md`,
  `src/content/blog/seguridad-web-astro-framework.md`: frontmatter only.
- `src/pages/index.astro`: the `faqSchema` and its import. The `<FAQ>`
  section and the `generalFAQs` import stay.
- `src/layouts/ServiceLayout.astro`: the `faqSchema`, the
  `generateFAQSchema` and `getFAQsByCategory` imports, and
  `slugToCategory`.
- `src/config/seo.ts`: the two FAQ generators and the section comment.
- `AGENTS.md`: § "Layout chain" and § "Config".
- `.claude/skills/seo-guide-lines/SKILL.md` and
  `.claude/skills/seo-guide-lines/seo-guide-line.md`.

The `seo.ts` generators are SEO machinery, listed as **Invariant** in
`AGENTS.md`'s "Invariant vs Variable" table. The `faqs.ts` data, which is
Variable, is not touched.

This change matches **no row** in "If you change X → update Y". The closest
one is "Change a workflow skill or agent", but it only covers
`.claude/skills/spec*` and `.claude/agents/*`, and `seo-guide-lines` is a
builder skill. The contract still gets updated in the same change, because
§ "Layout chain" and § "Config" would otherwise state something false.

## Source of the content

This spec adds no client-facing data. It only removes JSON-LD blocks and
frontmatter Q&A that were never rendered. The decision to remove them comes
from two places:

- `~/helpers-proyects/seo-schema-org-buenas-practicas-2026.md` § 5.2
  ("FAQ … dejó de mostrarse el 7 de mayo de 2026") and the golden rule in
  its executive summary ("marca solo lo que es visible y verdadero").
  This file lives outside the repo.
- The 2026-10-12 SEO infrastructure review, items DELETE-1 and DELETE-2
  (Engram `mem_search "seo infra review 2026-10-12"`, topic
  `shine/seo-infra-review-2026-10-12`). The in-repo copy,
  `docs/revision-infraestructura-seo-2026-10-12.md`, has been agreed but is
  **not written yet**. Once it lands, this spec can cite it instead.

## Decisions made and discarded

The routing decisions are recorded in Engram (`mem_search "SEO review
2026-10-12 routing decisions"`).

- **Picked: full lane.** Removing a schema type from the whole site, adding
  a build guard and rewriting a builder skill are decisions, not
  transcriptions of an approved document.
- **Picked: delete the post Q&A instead of rendering it.** No reader ever
  saw it, so nothing visible is lost.
  - **Discarded: moving the Q&A into each post body.** It turns a schema
    fix into content editing on 3 posts. In `seguridad-web` it would also
    have to be merged with a different visible FAQ section that already
    exists.
  - **Discarded: rendering `faqs` with `FAQ.astro` and keeping
    `FAQPage`.** The markup would become valid, but it gets nothing from
    Google, and `seguridad-web` would end up with two FAQ blocks.
- **Picked: remove `FAQPage` site-wide, not just on posts.** One rule ("this
  site does not emit `FAQPage`") is easier to enforce than "only where
  visible". It also leaves spec 13's `@graph` consolidation one type fewer
  to model.
  - **Discarded: keeping it on the home and service pages and only fixing
    the JSDoc.** The markup is valid there, but it does nothing and it keeps
    `generateFAQSchema` alive as the pattern agents copy.
  - **Discarded: deferring the home and service pages to spec 13.** That
    would leave the rule half-applied in the meantime.
- **Picked: a build guard plus a note in `AGENTS.md`.** The mistake has
  already recurred once. A failing build is deterministic, while a note
  only helps agents that read it.
  - **Discarded: the `AGENTS.md` note alone.** Zod drops unknown keys
    silently, so a future post could add `faqs:` with no visible effect,
    and no one would notice the intent.
- **Picked: fix the `seo-guide-lines` skill in this spec.** It is the
  source of the recurring instruction. Once the generator is gone, it would
  tell the next agent to call a function that no longer exists.
  - **Discarded: fixing `SKILL.md` only and adding a banner to
    `seo-guide-line.md`.** The long reference would keep contradicting the
    entry point.
  - **Discarded: a separate entry or spec.** It would leave the skill
    pointing at deleted code until that work happens.
- **Picked: keep `FAQItem` in `seo.ts`.** Moving it to `faqs.ts` would
  touch `FAQ.astro` and `faqs.ts` imports with no behavior change. Spec 13
  restructures `seo.ts` anyway.

## Acceptance criteria

All `dist/` checks run after a fresh `pnpm build`, never against `src/`
alone.

- [x] `grep -rl "FAQPage" dist/` returns **no files**. The 2026-10-12
      baseline returned 7: `index.html`, the 3 service pages and the 3
      posts with `faqs`.
- [x] The visible FAQ accordions are intact. The `<details` count in
      `dist/index.html` and in each `dist/servicios/<slug>/index.html`
      equals a baseline build of `dev` taken before step 1. On 2026-10-12
      the counts were index 8, diseno-web-estrategico 7, ecommerce 7,
      publicidad-digital 8.
- [x] `grep -c "Preguntas frecuentes sobre seguridad web"
    dist/blog/seguridad-web-astro-framework/index.html` ≥ 1, so the
      visible body FAQ is untouched.
- [x] `grep -c "Preguntas Frecuentes" dist/llms/servicios/*.txt` ≥ 1 for
      each of the 3 files, so the llms output is untouched.
- [x] `grep -rn "faqs:" src/content/blog/` returns 0 matches.
- [x] `grep -rn "generateFAQSchema" src/ .claude/skills/seo-guide-lines/`
      returns 0 matches. This also covers `generateFAQSchemaWithPage`.
- [x] `grep -n -i "faq schema" .claude/skills/seo-guide-lines/*.md` returns
      0 matches. Every remaining `grep -n "FAQPage"` match in those 2 files
      states that `FAQPage` is not emitted, and none recommends it.
- [x] Guard negative test: temporarily add
      `faqs: [{ question: "x", answer: "y" }]` to one post's frontmatter.
      `pnpm build` fails with an error that mentions `FAQPage`. Revert the
      change, and `pnpm build` passes again.
- [x] `AGENTS.md` § "Layout chain" no longer lists FAQ among the per-page
      schemas and contains the no-`FAQPage` note. § "Config" no longer
      lists `generateFAQSchema`.
- [x] `pnpm build` passes. `pnpm check` reports no errors beyond the ones
      the `dev` baseline already had (2 pre-existing
      `LatestProjectsAlt.astro` `works.stack` errors at last check).

## Implementation plan

1. Baseline, with no code change: build `dev`, then record
   `grep -rl "FAQPage" dist/`, the `<details` counts for the home page and
   the 3 service pages, and the `pnpm check` error list.
2. `src/layouts/PostLayout.astro`: remove the `FAQPage` spread, the
   `generateFAQSchema` import and the `faqs` destructure. The build stays
   green because the field still exists in the schema.
3. Delete the `faqs:` blocks from the 3 posts, then replace the blog `faqs`
   field in `src/content.config.ts` with the build guard. Both happen in
   one step so the build never fails in between.
4. `src/pages/index.astro` and `src/layouts/ServiceLayout.astro`: remove
   `FAQPage` emission and the imports and `slugToCategory` map it leaves
   unused. The visible `<FAQ>` sections stay.
5. `src/config/seo.ts`: delete `generateFAQSchema` and
   `generateFAQSchemaWithPage`, keep `FAQItem`, and rename the section
   comment. Nothing imports them after steps 2–4.
6. `AGENTS.md`: update § "Layout chain" (schema list and the no-`FAQPage`
   note) and § "Config" (the generator list).
7. `.claude/skills/seo-guide-lines/SKILL.md` and `seo-guide-line.md`:
   remove or rewrite every FAQ-schema instruction listed in Scope, keeping
   the advice to add visible FAQ sections.
8. Fresh `pnpm build`, run every acceptance check including the guard
   negative test, then hand off to `spec-verifier`.
