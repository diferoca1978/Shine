# 24 — Per-page hero components

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Replace the shared `GlobalHero.astro` and `globalHeroAnimation.js` with one
hero component and one animation file per page, so each page's hero can
change later without touching the others. It is a pure refactor: the six
pages render and animate exactly as they do today.

## Scope

**In:**

- Six hero components, one per page that uses `GlobalHero` today. The copy
  is written inside each component, so the components take no props:

  | Page                               | Component                                          |
  | ---------------------------------- | -------------------------------------------------- |
  | `/` (`index.astro`)                | `section/landing/HomeHero.astro`, `GlobalHero.astro` renamed and moved with `git mv` |
  | `/contacto/`                       | `section/perPage/ContactHero.astro`                |
  | `/servicios/`                      | `section/ourServices/ServicesHero.astro`           |
  | `/servicios/diseno-web-estrategico/` | `section/ourServices/DisenoWebHero.astro`        |
  | `/servicios/publicidad-digital/`   | `section/ourServices/PublicidadHero.astro`         |
  | `/servicios/ecommerce/`            | `section/ourServices/EcommerceHero.astro`          |

- Six animation files, one per hero, in the existing per-page folders:
  `perPageAnimations/home/homeHeroAnimation.js`,
  `perPageAnimations/contact/contactHeroAnimation.js`, and
  `perPageAnimations/servicesAnimations/` `servicesHeroAnimation.js`,
  `disenoWebHeroAnimation.js`, `publicidadHeroAnimation.js`,
  `ecommerceHeroAnimation.js`. Each one is loaded by a `<script>` in its own
  hero component.
- Deleting `src/utils/scripts/globalAnimations/globalHeroAnimation.js`.
- The six pages render `<XHero />` in place of `<GlobalHero …>`. The CTA
  `Button` + `StarIcon` that home and the three service pages pass through
  `slot="cta"` move inside their hero component.
- The AGENTS.md and `feature_list.json` lines that name the global hero (see
  Files affected).

**Out:**

- Any visual, copy or animation change on any of the six heroes. A redesign
  of one hero goes in its own later spec.
- The heroes that already exist per page: `HeroAbout.astro` (`/nosotros`)
  and `ProjectsHero.astro` (`/proyectos`).
- Removing the empty elements today's markup renders, for example the empty
  `<span class="block">` and description `<p>` on `/contacto/`. They stay
  for parity, because the description `<p>` carries `mb-8` and removing it
  changes the spacing. Cleanup is a follow-up.
- A shared animation helper. The repo owner chose one file per page on
  2026-11-10, even though the five non-home files start out almost
  identical.
- `ServiceLayout.astro`: the service heroes are still rendered by each page
  inside its slot, and the layout doesn't change.
- SEO title, description and JSON-LD of the six pages.

## Files affected

Matches **no** row of AGENTS.md's "If you change X → update Y" table. The
heroes go into existing section folders and the animations into existing
per-page folders, so the "Change folder conventions" row doesn't apply. One
AGENTS.md line does go stale and is updated in the same change.

- **New:** `src/components/section/perPage/ContactHero.astro`,
  `src/components/section/ourServices/{ServicesHero,DisenoWebHero,PublicidadHero,EcommerceHero}.astro`.
- **Moved:** `src/components/global/GlobalHero.astro` →
  `src/components/section/landing/HomeHero.astro` (`git mv`). Its props and
  the non-typewriter branch are removed and the home copy goes inline.
- **New:**
  `src/utils/scripts/perPageAnimations/home/homeHeroAnimation.js`,
  `src/utils/scripts/perPageAnimations/contact/contactHeroAnimation.js`,
  `src/utils/scripts/perPageAnimations/servicesAnimations/{servicesHero,disenoWebHero,publicidadHero,ecommerceHero}Animation.js`.
- **Deleted:** `src/utils/scripts/globalAnimations/globalHeroAnimation.js`.
- **Edited:** `src/pages/index.astro`, `src/pages/contacto.astro`,
  `src/pages/servicios/index.astro`,
  `src/pages/servicios/diseno-web-estrategico.astro`,
  `src/pages/servicios/publicidad-digital.astro`,
  `src/pages/servicios/ecommerce.astro`: the import and the hero tag.
- **Edited:** `AGENTS.md` § "Conventions for writing components". In the
  animations bullet, `globalAnimations/` stops saying "(site-wide: navbar,
  hero, background)" and becomes "(site-wide: navbar, background)".
- **Edited:** `feature_list.json`, the `page-home` `nota`: "GlobalHero" →
  "HomeHero". The `source` text of other entries that mentions GlobalHero
  is historical and is not edited.

## Source of the content

No new copy. Each hero's text is moved verbatim from the `GlobalHero` props
that its page passes on `dev` at `1c43bb2` (the merge of PR #208):
`src/pages/index.astro`, `src/pages/contacto.astro`,
`src/pages/servicios/index.astro`,
`src/pages/servicios/diseno-web-estrategico.astro`,
`src/pages/servicios/publicidad-digital.astro`,
`src/pages/servicios/ecommerce.astro`.

## Decisions made and discarded

- **One animation file per page** (the repo owner chose it on 2026-11-10).
  Discarded: one shared reveal helper plus a home-only typewriter file
  (less duplication, but every page tied to the same code), and keeping
  `globalHeroAnimation.js` as is.
- **The three service pages each get their own component.** Discarded: one
  `ServiceHero` shared through `ServiceLayout`, because it keeps the three
  coupled, which is what this spec removes.
- **`GlobalHero.astro` becomes `HomeHero.astro`** (`git mv`, so history
  follows the file), moved to `section/landing/` next to the other home
  sections. Discarded: deleting it, and keeping the misleading "Global"
  name for a home-only component.
- **Copy inside each component, no props.** Each hero has a single
  consumer, so props would only pass text through. Discarded: keeping the
  props on the page.
- **Existing folders, no new convention.** `ContactHero` sits next to
  `HeroAbout`/`ProjectsHero` in `section/perPage/`, and the service heroes
  sit in `section/ourServices/`. Discarded: a new `section/heroes/` folder,
  which would change the folder convention, AGENTS.md and `front-end-astro`
  SKILL.md.
- **Pure refactor, verified by diffing `dist/`.** The class hooks
  (`hero-section`, `hero-title`, `hero-title--typewriter`, `hero-typed`,
  `hero-caret`, `hero-title-tail`, `hero-subtitle`, `description-text`)
  keep their names, so the rendered HTML and the animation selectors don't
  change.
- **Reduced motion keeps the `bc7ea8b` fix.** Every new file sets
  `autoAlpha: 1` without `clearProps`, so the `invisible` class can't hide
  the hero again.

## Acceptance criteria

- [x] `pnpm build` succeeds (the `shineSeo()` gate passes).
- [x] For each of the six pages, the `<section class="hero-section …">`
      element in `dist/<page>/index.html` is identical to the baseline
      captured in step 1. Only `data-astro-cid-*` attributes may differ, if
      any appear.
- [x] Each of the six `dist/<page>/index.html` has exactly one `<h1`.
- [x] `grep -rn "GlobalHero\|globalHeroAnimation" src/` returns nothing, and
      neither `src/components/global/GlobalHero.astro` nor
      `src/utils/scripts/globalAnimations/globalHeroAnimation.js` exists.
- [x] `git log --follow src/components/section/landing/HomeHero.astro`
      shows the history of `GlobalHero.astro`.
- [x] None of the six hero components declares `interface Props`.
- [x] Each of the six animation files wraps its tweens in
      `gsap.matchMedia()` with a `prefers-reduced-motion: reduce` branch
      that sets `autoAlpha: 1` without `clearProps`.
- [x] Live (`pnpm dev`), on each of the six pages, the hero animates as on
      `dev` before this spec:
      - On the five non-home pages, the title appears character by
        character in random order.
      - On the home page, the typewriter loops through the three labels.
      - On all six pages, the subtitle fades up line by line and the
        description animates.
- [x] Live, `prefers-reduced-motion: reduce`, on each of the six pages: the
      title, subtitle and description are visible, with no motion. The home
      page shows the static joined phrase and no caret.
- [x] AGENTS.md's animations bullet no longer lists "hero" under
      `globalAnimations/`, and `feature_list.json`'s `page-home` `nota`
      says "HomeHero".

## Implementation plan

1. **Baseline, no code.** On the branch before any edit, run `pnpm build`
   and save the outer HTML of `<section class="hero-section …">` from the
   six `dist/<page>/index.html` to the scratchpad. Every later step is
   diffed against these.
2. **Contact.** Create `ContactHero.astro` with the `/contacto/` markup and
   copy inline, and `contact/contactHeroAnimation.js`: today's
   non-typewriter path of `globalHeroAnimation.js`, which means title
   SplitText, subtitle lines, description and the reduced-motion branch.
   Swap the hero in `contacto.astro`. Build and diff the contact baseline.
3. **Services hub.** The same for `ServicesHero.astro`,
   `servicesHeroAnimation.js` and `servicios/index.astro`.
4. **Diseño web.** The same for `DisenoWebHero.astro` (CTA included),
   `disenoWebHeroAnimation.js` and `diseno-web-estrategico.astro`.
5. **Publicidad digital.** The same for `PublicidadHero.astro`,
   `publicidadHeroAnimation.js` and `publicidad-digital.astro`.
6. **Ecommerce.** The same for `EcommerceHero.astro`,
   `ecommerceHeroAnimation.js` and `ecommerce.astro`.
7. **Home.** Run `git mv src/components/global/GlobalHero.astro
   src/components/section/landing/HomeHero.astro`, then:
   - drop its props and the non-typewriter branch, and write the home copy
     and CTA inline;
   - create `home/homeHeroAnimation.js` from the typewriter path, with the
     subtitle lines, the description and the reduced-motion branch;
   - point the component's `<script>` at it and swap the hero in
     `index.astro`.
   
   Build and diff the home baseline.
8. **Cleanup.**
   - Delete `globalAnimations/globalHeroAnimation.js` and confirm the
     `grep` criterion returns nothing.
   - Update the AGENTS.md animations bullet and the `page-home` `nota` in
     `feature_list.json`.
   - Run `pnpm build` once more.
