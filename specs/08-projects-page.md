# 08 — projects page

**Status:** Draft <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Add a `/proyectos` page with a master-detail layout — an industry-grouped
accordion sidebar plus a detail card with a before/after media fallback
chain (video → slider → image) — so the site's 13 delivered projects get a
real, shareable, SEO-indexable home instead of only appearing as 6
external-linking cards on the homepage.

## Scope

**In:**

- `works` content-collection schema gains `slug`, `industry`, optional
  `result`, and optional `media` (video/poster/before).
- All 13 `src/content/works/*.md` files get `slug` + `industry`; one
  (`recurrirabogados.md`) also gets a title correction.
- A new static route: `/proyectos/` (index) + `/proyectos/<slug>/` (one
  per project, `getStaticPaths`).
- New components: `ProjectsHero`, `ProjectsAccordion`, `ProjectDetail`
  (`section/perPage/`); `BeforeAfterVideo`, `BeforeAfterSlider` (`ui/`).
- New animation files in `perPageAnimations/proyectos/` for the accordion,
  the card cross-fade, the two media components, and the hero.
- A `data-industry` grouping/sorting/default-selection helper module,
  `src/utils/projects.ts`.
- An additive "Ver los 13 proyectos →" link on the homepage's existing
  `LatestProjects.2.astro` (no change to its current pinned/sort/slice
  logic).
- A new nav entry (`src/utils/navigation.ts`).
- A new speculation-rules prerender block for `/proyectos/*`
  (`MainLayout.astro`), mirroring the existing `/servicios/*`/`/blog/*`
  blocks.

**Out:**

- Any actual video/before-screenshot assets. `BeforeAfterVideo.astro` and
  `BeforeAfterSlider.astro` are built as scaffolding per the approved
  design's own file list, but every one of the 13 projects renders tier C
  (plain image) today — there is no media to attach yet.
- Any change to `src/components/section/landing/LatestProjects.2.astro`'s
  existing pinned/sort/`.slice(0, 6)` logic, or to its hover-preview
  crossfade interaction — that component keeps linking straight to
  external client sites, unchanged.
- Any new `@theme` tokens in `global.css`. Resolved this session: the five
  "new grays" the design called for are covered by opacity-modified
  existing tokens (`smokyBlack`/`softWhite`/`softBeige` at `/10`, `/30`,
  `/50`, etc.) — the exact idiom `LatestProjects.2.astro` and `FAQ.astro`
  already use. No new color tokens, no `global.css` edit.
- A 4th industry enum value. Grupo Zenith (data-analytics/BI-consulting +
  Google-for-Education, confirmed against its live site) is folded into
  `tecnologia` rather than given its own single-project bucket.
- Renaming any `works/*.md` filename to match its new slug. Filenames stay
  as-is (same precedent as spec 06) — only `recurrirabogados.md`'s
  `title` field is corrected, because it's a typo, not a naming-convention
  mismatch.

## Files affected

Matches the existing **Navigation** and **Pages** rows in AGENTS.md's
Knobs map (`src/utils/navigation.ts`, `src/pages/*.astro`) exactly — no
new row needed for those. Matches **no** row in the "If you change X →
update Y" table (it lists dependency/font/redirect/folder-convention
changes, none of which this is). The `works` collection schema change in
`src/content.config.ts` isn't clearly placed in AGENTS.md's Invariant/
Variable table (it lists `src/content/*` under Variable but doesn't
separately call out collection *schemas*) — flagging this as a real gap
worth a future AGENTS.md row, not fixing it unilaterally here.

New:

- `src/utils/projects.ts`
- `src/pages/proyectos/index.astro`
- `src/pages/proyectos/[slug].astro`
- `src/components/section/perPage/ProjectsHero.astro`
- `src/components/section/perPage/ProjectsAccordion.astro`
- `src/components/section/perPage/ProjectDetail.astro`
- `src/components/ui/BeforeAfterVideo.astro`
- `src/components/ui/BeforeAfterSlider.astro`
- `src/utils/scripts/perPageAnimations/proyectos/projectsHeroAnimation.js`
- `src/utils/scripts/perPageAnimations/proyectos/projectsAccordionAnimation.js`
- `src/utils/scripts/perPageAnimations/proyectos/projectDetailAnimation.js`
- `src/utils/scripts/perPageAnimations/proyectos/beforeAfterVideoAnimation.js`
- `src/utils/scripts/perPageAnimations/proyectos/beforeAfterSliderAnimation.js`

Modified:

- `src/content.config.ts` (`works` schema)
- `src/content/works/*.md` (all 13 — `slug` + `industry`;
  `recurrirabogados.md` also gets its title fixed)
- `src/utils/navigation.ts` (new "Proyectos" entry)
- `src/components/section/landing/LatestProjects.2.astro` (additive link
  only)
- `src/layouts/MainLayout.astro` (new speculation-rules block)

Read but **not** modified: `src/components/global/Navbar.astro` (the
backdrop-blur/z-index precedent the mobile panel repeats),
`src/pages/blog/[slug].astro` (the `getStaticPaths`/custom-`slug`-field
pattern mirrored here), `src/pages/servicios/index.astro` (the
`CollectionPage` JSON-LD pattern mirrored here),
`src/utils/scripts/perPageAnimations/home/latestPojects2Animation.js`
(its crossfade technique is the model for `projectDetailAnimation.js`),
`src/styles/global.css` (confirmed sufficient as-is, see Scope/Out).

## Source of the content

This spec introduces client-facing copy in two places:

- **Hero headline/subhead/CTA.** Already approved — sourced verbatim from
  the Design artifact referenced in Engram memory #457 (artboard "1 ·
  Hero"): headline "Cada proyecto empieza con un negocio que nadie
  encontraba", subhead "Antes y después de 13 negocios colombianos: qué
  encontramos roto, qué construimos y qué cambió en su tráfico.", CTA
  "Agenda tu diagnóstico". No further approval needed for this piece — it
  is quoted directly from what the repo owner already signed off on.
- **Per-project `result` line** (the card's "Resultado" text, in result-
  voice — e.g. "Salió de WordPress con identidad nueva y una arquitectura
  pensada para rankear por servicio, no por nombre."). **No approved
  document exists for 12 of the 13 projects** — only Cardozo Abogados'
  line is already given verbatim in the same artifact. Per the precedent
  set in [`06-new-works-portfolio-entries.md`](./06-new-works-portfolio-entries.md),
  the source of record for the remaining 12 is **the repo owner,
  interviewed during the implementation plan's intake step** (below); the
  implementer drafts the line from those facts in the existing
  house voice and gets approval before it's written to any file.

## Decisions made and discarded

- **Color tokens.** **Chosen:** no new `@theme` tokens — every "gray" the
  design calls for is covered by opacity-modified existing tokens
  (`text-smokyBlack/50 dark:text-softBeige/50` for secondary/result text,
  `text-smokyBlack/30 dark:text-softBeige/30` for the hero's decorative
  letters, `border-smokyBlack/10 dark:border-softBeige/10` for hairlines,
  `dark:bg-smokyBlack` — already the site-wide dark background — for the
  page bg, `dark:bg-softWhite/5` for a slightly lighter dark-mode surface),
  per the repo owner's explicit direction this session and the exact
  precedent already in `LatestProjects.2.astro`/`FAQ.astro`. **Discarded:**
  the 5 discrete new tokens originally proposed from the design's raw
  oklch values — technically closer to the mockup pixel-for-pixel, but a
  real departure from this repo's own opacity-modifier convention for no
  visible benefit.
- **Delta Irat's industry.** **Chosen:** `legal` — confirmed directly by
  the repo owner ("delta irat is for legal services"), overriding what its
  `tags`/`stack` frontmatter would suggest (generic "Desarrollo Web"/SEO
  service tags, not a sector signal). **Discarded:** trusting `tags`/
  `stack` to infer industry — already proven unreliable here, since those
  fields describe services delivered, not what the client's business is.
- **Grupo Zenith's industry.** **Chosen:** `tecnologia` — the repo owner's
  explicit choice after its live site was checked this session (it's a
  data-analytics/BI-consulting + Google-for-Education firm with no clean
  existing bucket). **Discarded:** a 4th enum value just for Zenith (a
  sector with a single project) and excluding it from `/proyectos`
  entirely.
- **`recurrirabogados.md`'s title.** **Chosen:** correct it to "Recurrir
  Abogados" (repo owner confirmed the typo) as part of this spec's
  frontmatter edit. **Discarded:** leaving "Recurrira Bogados" — the
  design's `<h2>` renders `title` verbatim, so the typo would ship
  straight to production copy.
- **Selection/state mechanism.** **Chosen:** every URL (`/proyectos/` +
  13 slugs) is a real, fully server-rendered static page via
  `getStaticPaths` (correct card/industry already open server-side, so
  direct links/hard-refresh/back-forward/crawlers all work with zero JS);
  selecting a project client-side does `preventDefault()` +
  `history.pushState()` + a custom event that cross-fades the
  already-in-DOM cards, with the animation modeled directly on
  `latestPojects2Animation.js`'s existing `showImage()`/`resetToIdle()`
  pattern (stacked panels, `autoAlpha`/`scale` tweens, the same
  `gsap.matchMedia` reduced-motion branch). **Discarded:** reusing that
  component's actual interaction model as-is (checked this session) — it's
  hover-triggered and non-persistent, has no keyboard support or URL
  state, is desktop-only (`hidden lg:flex`), and every click still
  navigates away (`target="_blank"`) — none of which satisfies this
  page's shareable-URL/keyboard/mobile-dialog requirements. Also
  discarded: plain full-page navigation on every project click — this
  repo has no cross-page view-transition mechanism (confirmed in spec 07),
  so it would white-flash-reload on every selection and lose the
  designed 220ms/180ms animations entirely.
- **Industry default-project fallback.** **Chosen:** a code-level rule
  (`getIndustryDefaultProject`: featured-in-industry, else most-recent
  `pubDate`) rather than forcing a new `featured: true` flag. With Delta
  Irat reclassified to `legal`, `tecnologia` now holds Grupo Zenith
  (2025-06-21) and Valmat Cyber (2025-08-15) — the fallback naturally
  selects Valmat Cyber. `salud` has exactly one project, so its default is
  trivial. **Discarded:** forcing an explicit `featured: true` onto one
  Tecnología project now — unnecessary content churn when recency already
  gives a deterministic, sensible result.
- **`result` copy sourcing.** **Chosen:** follow spec 06's precedent —
  intake with the repo owner during implementation for the 12 projects
  with no source; Cardozo Abogados' line is already given by the approved
  design artifact. **Discarded:** inventing all 13 from the existing
  generic `description` field (exactly the kind of unsourced client-facing
  claim that makes this a full-lane spec), and shipping without the field
  at all (the design's card explicitly requires this line).
- **`media` field shape.** **Chosen:** fully optional on the `works`
  schema (`video: {mp4, webm}`, `poster`, `before`, `video.mp4`/`webm` as
  plain strings served from `public/`, `poster`/`before` through
  `image()`) so none of the 13 files need any change beyond `slug`/
  `industry`/`result` — they simply omit the key and render tier C.
  **Discarded:** writing 13 empty `media: {}` stanzas to "reserve" the
  shape — adds nothing schema-validation doesn't already provide via
  `.optional()`.
- **Route shape.** **Chosen:** `src/pages/proyectos/[slug].astro` (single
  segment), mirroring `blog/[slug].astro`'s existing custom-`slug`-field
  pattern exactly. **Discarded:** `[...slug].astro` — no nested paths are
  needed, so a rest param would be an unjustified deviation from the
  established precedent.
- **Speculation rules.** **Chosen:** add a `/proyectos/*` block to
  `MainLayout.astro`, matching the existing `/servicios/*`/`/blog/*`
  shape. Noting explicitly: if GSC later flags `/proyectos/*` as a
  phantom 404, that is the same known false positive already accepted for
  the existing blocks (see Engram's `learning_gsc_speculation_rules_404`),
  not a new bug. **Discarded:** leaving `/proyectos` out of prerendering —
  no reason these pages are less prerender-safe than `/servicios/*`.

## Acceptance criteria

- [ ] `src/content.config.ts`'s `works` schema adds `slug` (required
      string), `industry` (`z.enum(["legal", "salud", "tecnologia"])`),
      `result` (optional string), `media` (optional
      `{video?: {mp4, webm}, poster?, before?}`) — `pnpm build` passes
      with all 13 existing entries.
- [ ] All 13 `works/*.md` files have `slug` + `industry` set;
      `grep -l 'industry: "legal"' src/content/works/*.md | wc -l` → 10,
      `salud` → 1, `tecnologia` → 2.
- [ ] `recurrirabogados.md`'s `title` reads `Recurrir Abogados`.
- [ ] All 13 `works/*.md` files have a non-empty `result` field after the
      intake step (Cardozo Abogados' sourced from the design artifact,
      the other 12 from repo-owner intake).
- [ ] No new `--color-*` entries appear in `src/styles/global.css`'s
      `@theme` block — confirmed by diff.
- [ ] `find dist/proyectos -name index.html | wc -l` → 14 (index + 13
      slugs) after `pnpm build`.
- [ ] Exactly one `<h1>` and thirteen `<h2>` per project page
      (`grep -o '<h1' dist/proyectos/<slug>/index.html | wc -l` → 1,
      `<h2` → 13).
- [ ] Exactly one `aria-current="true"` per page.
- [ ] Every project page has a distinct `<link rel="canonical">` — no
      duplicates across the 14 files.
- [ ] Home page (`dist/index.html`) contains the new "Ver los 13
      proyectos" link with `href="/proyectos/"`; a diff of
      `LatestProjects.2.astro` shows no change to its pinned/sort/slice
      logic.
- [ ] Keyboard: Tab/Enter/Space toggles each industry header; only one
      industry panel is open at a time; a visible focus ring (existing
      `accentGreen`-based ring, no new token) appears on every focusable
      element.
- [ ] Below 1024px, the sidebar is replaced by a selector button that
      opens a dialog which traps focus, closes on Esc, and returns focus
      to the trigger — and DOM-inspected to confirm it is a sibling of
      `<header>`, not nested inside it or any other `backdrop-blur-*`
      ancestor.
- [ ] Dark mode renders correctly using only existing tokens (`smokyBlack`,
      `softWhite`, `softBeige`, `accentGold`, `accentGreen`) at the
      opacities specified in Decisions — no hardcoded hex/oklch literals
      in any new component.
- [ ] `prefers-reduced-motion: reduce` makes the accordion open/close and
      card swap instant (no animation).
- [ ] Clicking through 2–3 projects and pressing Back restores the
      correct prior project and URL without a new "Document" network
      request (only the initial load fetches one).
- [ ] `view-source` on two different `/proyectos/<slug>/` URLs shows
      distinct `<title>`, meta description, and JSON-LD.
- [ ] `pnpm check` reports no new errors versus the step-1 baseline.
- [ ] `pnpm build` passes.

## Implementation plan

1. **Capture the baseline.** Run `pnpm check` and `pnpm build`, record
   the current state, so "no new errors" is measured against reality.

2. **Intake — ask the repo owner for the `result` line.** For each of the
   12 projects without one (all except Cardozo Abogados, already sourced
   from the design artifact), ask: what was broken, what changed — one
   result-voice sentence, matching the tone of Cardozo's line and the
   existing `description` fields. Draft all 12, present for approval
   before writing any file.

3. **Schema + content together** (must land in the same commit-worthy
   step to keep the build green): add `slug`, `industry`, `result`,
   `media` to the `works` schema in `src/content.config.ts`; write the
   approved `slug`/`industry`/`result` values into all 13
   `src/content/works/*.md` files; fix `recurrirabogados.md`'s title.
   Run `pnpm build` to confirm.

4. **`src/utils/projects.ts`.** `INDUSTRY_ORDER`, `INDUSTRY_LABELS`,
   `getIndustriesWithProjects()`, `getSitewideDefaultProject()` (reuses
   `LatestProjects.2.astro`'s existing pinned/featured tie-break),
   `getIndustryDefaultProject()` (the new fallback rule from Decisions).

5. **Routes.** `src/pages/proyectos/index.astro` and `[slug].astro`
   (`getStaticPaths` off `work.data.slug`, mirroring `blog/[slug].astro`),
   per-project SEO via `generatePageSEO`/`generateBreadcrumbSchema`, and a
   `CollectionPage` JSON-LD with `hasPart` modeled on
   `servicios/index.astro`.

6. **Section components.** `ProjectsHero.astro` (hero copy from Source of
   the content), `ProjectsAccordion.astro` (server-rendered correct
   open-industry/selected-project state; mobile dialog rendered as a
   sibling of `<header>`, z-index above the existing `z-100` ceiling —
   e.g. `z-110`), `ProjectDetail.astro` (all 13 cards rendered inline,
   `hidden`/`aria-hidden` except the active one; tier A/B/C branch per
   project — every project renders tier C today).

7. **Media components (scaffolding).** `BeforeAfterVideo.astro`,
   `BeforeAfterSlider.astro` — built now per the design's file list, not
   reachable by any of the 13 projects until video/before assets exist.

8. **Animation files**, `src/utils/scripts/perPageAnimations/proyectos/`:
   - `projectsAccordionAnimation.js` — single-open-industry enforcement,
     keyboard handling, mobile-dialog focus trap, delegated
     `[data-project-link]` clicks → `pushState` + custom event.
   - `projectDetailAnimation.js` — listens for that event and `popstate`;
     cross-fades cards using the stacked-panel/`autoAlpha`/`scale`
     technique from `latestPojects2Animation.js`'s `showImage()`/
     `resetToIdle()`, wrapped in the same `gsap.matchMedia` reduced-motion
     branch; moves focus to the new `<h2>`; updates `document.title`.
   - `beforeAfterVideoAnimation.js` / `beforeAfterSliderAnimation.js` —
     IntersectionObserver-gated autoplay / range-input wiring
     (unreachable today, no prior art in this repo — built from scratch).
   - `projectsHeroAnimation.js` — simple text reveal.

9. **`src/utils/navigation.ts`.** Insert `{ name: "Proyectos", path:
   "/proyectos/" }` after "Nosotros", before "Contacto"/"Blog".

10. **`LatestProjects.2.astro`.** Add the "Ver los 13 proyectos →" link
    after the existing list; no change to its pinned/sort/slice logic or
    its own crossfade interaction.

11. **`MainLayout.astro`.** Add the `/proyectos/*` speculation-rules
    block, same shape as `/servicios/*`/`/blog/*`.

12. **Verify.** `pnpm build` + `pnpm check` (compare to step-1 baseline),
    then the `dist/` checks and manual checks listed in Acceptance
    criteria (keyboard nav, mobile dialog focus trap, dark mode, reduced
    motion, back/forward, view-source parity).

13. **Hand back for review.** Do not mark anything done, commit, or push
    without the repo owner asking in that turn. `spec-verifier` checks
    every acceptance criterion against the real build before a human
    flips this spec's status to `Approved`.
