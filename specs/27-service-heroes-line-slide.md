# 27 — Service, projects, home and about heroes line slide

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Apply the animation from spec 26 to the hero title and description on
`/servicios/publicidad-digital/`, `/servicios/ecommerce/` and the projects
hero (`/proyectos/` and every `/proyectos/[slug]/`), and to the home
hero's title tail and subtitle, and to the `/nosotros/` hero title. Each
rendered line slides in from its own side, alternating left and right. After
this change the three service pages, the projects pages, the home and
`/nosotros/` animate their heroes the same way. The home keeps its
typewriter.

## Scope

**In:**

- In each of these two files:
  - `src/utils/scripts/perPageAnimations/servicesAnimations/publicidadHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/servicesAnimations/ecommerceHeroAnimation.js`

  replace the **title** animation:
  - split the title with `SplitText.create(heroTitle, { type: "lines", autoSplit: true, onSplit })`;
  - `onSplit` returns one `gsap.from(self.lines, …)` tween with:
    - `x`: function-based, `(i) => (i % 2 === 0 ? -120 : 120)`, so line 1
      enters from the left, line 2 from the right, and so on;
    - `autoAlpha: 0`;
    - `duration: 0.8`;
    - `ease: "power3.out"`;
    - `stagger: 0.12`, in reading order (top to bottom).
- In the same two files, replace the **description** animation:
  - split the description with
    `SplitText.create(heroDescription, { type: "lines", autoSplit: true, onSplit })`;
  - `onSplit` returns one `gsap.from(self.lines, …)` tween with the same `x`,
    `autoAlpha`, `duration`, `ease` and `stagger` as the title, plus
    `delay: 0.6`.
- The new `if (heroTitle) { … }` and `if (heroDescription) { … }` blocks match
  the ones in `disenoWebHeroAnimation.js` (spec 26), including their comments.
- **Projects hero** (added 2026-11-11):
  - In `src/components/section/perPage/ProjectsHero.astro`, the `h1` gets the
    class `hero-title` and the `p` gets the class `description-text`, and both
    drop the `data-hero-reveal` attribute. They keep `invisible` and all other
    classes. The CTA container keeps `data-hero-reveal`. Nothing else in the
    markup, copy or styles changes.
  - Rewrite `src/utils/scripts/perPageAnimations/proyectos/projectsHeroAnimation.js`
    to follow the structure of `disenoWebHeroAnimation.js`:
    - import and register `SplitText`;
    - query `.hero-title`, `.description-text` and `[data-hero-reveal]` (the
      CTA container);
    - `gsap.matchMedia()` with the `reducedMotion` / `fullMotion` conditions;
    - `splitInstances` reverted in the matchMedia cleanup, and the exported
      function returns `() => mm.revert()`;
    - the title and description blocks are copied from
      `disenoWebHeroAnimation.js` (same values, same comments). There is no
      subtitle block, because the projects hero has no subtitle.
  - The CTA container keeps its current fade-up (`y: 16`, `autoAlpha` 0 → 1,
    `duration: 0.6`, `ease: "power3.out"`), plus `delay: 0.9`, so it comes
    in after the description starts.
  - Reduced motion: `gsap.set(elements, { autoAlpha: 1 })` with **no**
    `clearProps`, as in `disenoWebHeroAnimation.js`. Today's
    `clearProps: "all"` removes the inline visibility, so the `invisible`
    class can hide the text again.
- **Home hero** (added 2026-11-11), in
  `src/utils/scripts/perPageAnimations/home/homeHeroAnimation.js` only:
  - Replace the **title tail** tween (`.hero-title-tail`, "para negocios que
    quieren vender más", today a block fade-up `y: 40`, `delay: 0.3` inside
    the `useTypewriter` branch) with
    `SplitText.create(tail, { type: "lines", autoSplit: true, onSplit })`.
    `onSplit` returns one `gsap.from(self.lines, …)` tween with the same `x`,
    `autoAlpha`, `duration`, `ease` and `stagger` as the title above, plus
    `delay: 0.3`. Push the instance into `splitInstances`. It stays inside the
    `useTypewriter` branch.
  - Replace the **subtitle** tween (`h2.hero-subtitle`, today a line-by-line
    fade up `y: 40`, `delay: 0.3`, `stagger: 0.15`). Keep its
    `SplitText.create(heroSubtitle, { type: "lines", autoSplit: true, onSplit })`;
    `onSplit` returns one `gsap.from(self.lines, …)` tween with the same `x`,
    `autoAlpha`, `duration`, `ease` and `stagger` as the title above, plus
    `delay: 0.6`.
  - The tail runs at every width. At desktop it is one line, so it enters
    from the left only; the alternation shows when it wraps.
  - The bold `<span>` inside the subtitle ("campañas publicitarias en Google y
    Meta") keeps its style inside the split lines.
- **About hero** (`/nosotros/`, added 2026-11-11), in
  `src/utils/scripts/perPageAnimations/about/aboutHeroAnimation.js` only:
  - Replace the **title** animation (`h1.split-title`, "La estrategia de
    marketing y la tecnología detrás de Shine Agencia", today a random
    per-character `yPercent` / `rotation` / `back.out(2)` entrance) with
    `SplitText.create(title, { type: "lines", autoSplit: true, onSplit })`.
    `onSplit` returns one `gsap.from(self.lines, …)` tween with the same `x`,
    `autoAlpha`, `duration`, `ease` and `stagger` as the title above, and no
    delay. Push the instance into `splitInstances`.
- A "line" is a rendered line, so the count depends on the viewport width.
  The alternation restarts from the left on the first rendered line of
  **each** block.

**Out:**

- The subtitle animation (line-by-line fade up, `delay: 0.3`) in the
  Publicidad and Ecommerce files. It does not change.
- The CTA buttons on the service pages.
- The reduced-motion branch and the cleanup in the Publicidad and Ecommerce
  files.
- `disenoWebHeroAnimation.js`. It already has this animation (spec 26).
- The services hub `/servicios/` (`servicesHeroAnimation.js`). It keeps its
  per-character animation.
- The contact hero (`contactHeroAnimation.js`).
- In the home hero: the typewriter timeline (`.hero-typed`), the blinking
  caret (`.hero-caret`), the CTA, the reduced-motion branch, the cleanup, and
  the `p.description-text` block. That `p` only holds an empty
  `<span class="block">`, so it has no visible text; its per-character
  animation stays as it is.
- `HomeHero.astro`. Its markup already has the `hero-title-tail` and
  `hero-subtitle` hooks.
- In the about hero: the subtitle (`h2.split-subtitle`, "Somos Rocío y
  Diego"), which keeps its per-character animation; the paragraph
  (`p.split-text`); the image hover swap; the reduced-motion branch and the
  cleanup.
- `HeroAbout.astro`. Its markup already has the `split-title` hook.
- The rest of the projects pages: `ProjectsAccordion`, `ProjectDetail`, the
  before/after animations, and `src/pages/proyectos/*.astro`.
- A prop or separate code path to animate `/proyectos/` and
  `/proyectos/[slug]/` differently.
- A shared animation helper (see Decisions).
- Any markup, copy or CSS change other than the two class swaps in
  `ProjectsHero.astro`. `PublicidadHero.astro`, `EcommerceHero.astro`,
  `HomeHero.astro` and `HeroAbout.astro` are not touched.

## Files affected

No row of AGENTS.md's "If you change X → update Y" table matches, and
AGENTS.md does not change. The change edits six existing files.

- **Edited:**
  - `src/utils/scripts/perPageAnimations/servicesAnimations/publicidadHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/servicesAnimations/ecommerceHeroAnimation.js`
  - `src/components/section/perPage/ProjectsHero.astro`
  - `src/utils/scripts/perPageAnimations/proyectos/projectsHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/home/homeHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/about/aboutHeroAnimation.js`

## Source of the content

No content. This is an animation-only change. The `ProjectsHero.astro` edit
swaps attributes for class hooks and changes no copy.

## Decisions made and discarded

- **Publicidad and Ecommerce, plus the projects hero.** Publicidad and
  Ecommerce were chosen by the repo owner on 2026-11-11. The projects hero
  was added to this spec the same day, after Publicidad and Ecommerce were
  implemented and verified (commit `f3e53c8`, PR #212), so it lands in the
  same PR. Discarded: a separate spec 28 for the projects hero. Discarded:
  also changing the `/servicios/` hub, which keeps its per-character
  animation. Its description is a single sentence with an empty
  `<span class="block">`, so a line slide would have less effect there.
- **Title and description, as in spec 26. Not the subtitle or the CTA.**
  This gives the same result as on Diseño Web. Discarded: title only.
- **Same values as spec 26.** These are ±120px, `autoAlpha` 0 → 1, 0.8s,
  `power3.out` and `stagger: 0.12`, with `delay: 0.6` on the description.
  The alternation restarts from the left in each block. All these heroes
  should look and feel the same. Discarded: changing values per page,
  such as the starting side. `html` and `body` already have
  `overflow-x: hidden`, so ±120px cannot create a horizontal scrollbar
  (spec 26).
- **Copy the code into each per-page file. No shared helper.** This keeps
  the spec 24 decision (one animation file per hero, so each page can change
  without affecting the others), and the repo owner confirmed it on
  2026-11-11. Discarded: a shared line-slide helper used by all the files.
  That would reopen spec 24 and also edit `disenoWebHeroAnimation.js`. The
  cost is four copies of the same block.
- **`autoSplit` + `onSplit` returning the tween.** Same pattern as spec 26 and
  the existing subtitles, so the split stays correct after a resize or a late
  font load.
- **Projects hero: class hooks in the markup.** Chosen by the repo owner on
  2026-11-11. `hero-title` / `description-text` match the three service
  heroes, so `projectsHeroAnimation.js` can mirror
  `disenoWebHeroAnimation.js`. The `h1` and `p` drop `data-hero-reveal`, so
  that attribute now marks only the CTA container. Discarded: selecting
  `h1[data-hero-reveal]` / `p[data-hero-reveal]` with no markup change,
  because the selectors would differ from the other heroes.
- **Projects CTA: keep the fade-up, `delay: 0.9`.** Chosen by the repo owner
  on 2026-11-11. The reading order stays title → description → CTA.
  Discarded: today's timing with no delay, where the CTA would appear
  (~0.2s) before the description (0.6s). Discarded: no animation.
- **Projects reduced motion: drop `clearProps`.** Chosen by the repo owner on
  2026-11-11. This is the same fix spec 26 made on Diseño Web, because
  clearing the inline styles lets the `invisible` class hide the text again.
  Discarded: leaving it for its own spec.
- **Projects: both pages from the shared component.** Chosen by the repo
  owner on 2026-11-11. `ProjectsHero` renders on `/proyectos/` and every
  `/proyectos/[slug]/`, so one change covers both. Discarded: animating only
  `/proyectos/`, which would need a prop or a separate code path.
- **Home hero: the title tail and the subtitle.** Chosen by the repo owner
  on 2026-11-11, added after the projects hero was implemented and verified,
  in the same PR. These are the two visible text blocks below the
  typewriter. Discarded: the `p.description-text`, which is empty. Discarded:
  removing or changing the typewriter.
- **Home delays: tail `0.3`, subtitle `0.6`.** Chosen by the repo owner on
  2026-11-11. The tail keeps its current start and the subtitle moves to the
  `0.6` the other heroes use for their second block, so the reading order is
  typewriter → tail → subtitle. Discarded: both at `0.3`, starting together.
- **Home tail: line slide at every width.** Chosen by the repo owner on
  2026-11-11. Same code at every width. On desktop the tail is one line and
  only enters from the left. Discarded: keeping the fade-up on desktop with a
  breakpoint condition, which adds code and a breakpoint decision.
- **Home: same values as the other heroes.** Chosen by the repo owner on
  2026-11-11: ±120px, `autoAlpha` 0 → 1, 0.8s, `power3.out`,
  `stagger: 0.12`. Only the delays differ. The home blocks are not verbatim
  copies of the `disenoWebHeroAnimation.js` blocks, because their target and
  delay differ, but the tween values are the same.
- **About hero: title only.** Chosen by the repo owner on 2026-11-11, added
  after the home hero was implemented and verified, in the same PR.
  Discarded: also changing the subtitle "Somos Rocío y Diego", which keeps
  its per-character animation. Discarded: a separate spec 28 for
  `/nosotros/`, which would let PR #212 merge sooner.
- **About title: same values, no delay.** Chosen by the repo owner on
  2026-11-11: ±120px, `autoAlpha` 0 → 1, 0.8s, `power3.out`,
  `stagger: 0.12`, starting at load like the other hero titles. The title is
  about 2 lines at desktop and about 4 on mobile, so the alternation shows at
  every width.
- **The file name stays `27-service-heroes-line-slide.md`.** The branch
  `feature/27-service-heroes-line-slide` and PR #212 already use it. Only
  the title changes.

## Acceptance criteria

The criteria marked `[x]` were verified on 2026-11-11 for Publicidad,
Ecommerce (commit `f3e53c8`), the projects hero and the home hero. The ones
still `[ ]` are new or changed by the about-hero scope and must be verified
again.

- [x] `pnpm build` succeeds (the `shineSeo()` gate passes).
- [x] In both `publicidadHeroAnimation.js` and `ecommerceHeroAnimation.js`,
      the title `SplitText.create` uses `type: "lines"` with
      `autoSplit: true`. Its tween targets `self.lines` with `x` alternating
      `-120` / `120` by index, `autoAlpha: 0`, `duration: 0.8`,
      `ease: "power3.out"` and `stagger: 0.12`.
- [x] In both files, the description `SplitText.create` uses
      `type: "lines"` with `autoSplit: true`. Its tween targets `self.lines`
      with the same `x`, `autoAlpha`, `duration`, `ease` and `stagger` as the
      title, plus `delay: 0.6`.
- [x] In both files, `grep -nE "yPercent|rotation|from: \"random\"|type: \"words\""`
      returns nothing.
- [x] In both files, `git diff dev -- <file>` changes only the
      `if (heroTitle) { … }` and `if (heroDescription) { … }` blocks. The
      subtitle block, the reduced-motion branch and the cleanup are unchanged.
- [x] No file other than the six in "Files affected" (and this spec)
      changes. Checked with `git diff --stat dev`.
- [x] Live (`pnpm dev`, normal motion, desktop ~1440px), on
      `/servicios/publicidad-digital/` and `/servicios/ecommerce/`:
      - the title and the description each split into line wrappers, with no
        per-word elements;
      - in each block, the first line slides in from the left and the second
        from the right;
      - in each block, the lines appear one after another, top to bottom;
      - the description starts about 0.6s after load, as before;
      - the subtitle still fades up line by line.
- [x] On both pages, live, normal motion, mobile (~375px): the title and
      description split into more lines. They still alternate left/right,
      starting from the left in each block, and no horizontal scrollbar
      appears during the animation.
- [x] On both pages, live, after resizing the window from desktop to mobile
      width, the title and description re-split into the new lines and are
      fully visible (no line stuck hidden or offset).
- [x] On both pages, live, with `prefers-reduced-motion: reduce`: the title,
      subtitle and description are visible, with no motion and no split.
- [x] Live, `/servicios/diseno-web-estrategico/` still animates as in spec 26,
      the `/servicios/` hub title still animates by characters, and
      `/proyectos/` and `/` still animate as verified above.
- [x] In `ProjectsHero.astro`, `git diff dev` shows only `hero-title` added
      to the `h1` and `description-text` added to the `p`, each replacing
      `data-hero-reveal`. `grep -c "data-hero-reveal"` on the file returns
      `1` (the CTA container).
- [x] In `projectsHeroAnimation.js`, the `if (heroTitle) { … }` and
      `if (heroDescription) { … }` blocks are identical to the ones in
      `disenoWebHeroAnimation.js` (checked by diffing the extracted blocks).
      `SplitText` is imported and registered.
- [x] In `projectsHeroAnimation.js`, the CTA tween uses `y: 16`,
      `autoAlpha: 0` → 1, `duration: 0.6`, `ease: "power3.out"` and
      `delay: 0.9`, and the reduced-motion branch is
      `gsap.set(elements, { autoAlpha: 1 })` with no `clearProps`
      (`grep -n "clearProps"` on the file returns nothing).
- [x] Live (`pnpm dev`, normal motion, desktop ~1440px), on `/proyectos/`
      and on one `/proyectos/[slug]/` page:
      - the title and the description each split into line wrappers;
      - in each block, the first line slides in from the left and the second
        from the right, top to bottom;
      - the italic "Google" and "IA" spans keep their italic and accent
        colour inside the split lines;
      - the description starts about 0.6s after load;
      - the CTA fades up about 0.9s after load.
- [x] On `/proyectos/`, live, normal motion, mobile (~375px): the title and
      description split into more lines, still alternating from the left in
      each block, and no horizontal scrollbar appears during the animation.
- [x] On `/proyectos/`, live, after resizing the window from desktop to
      mobile width, the title and description re-split and are fully visible.
- [x] On `/proyectos/`, live, with `prefers-reduced-motion: reduce`: the
      title, description and CTA are visible, with no motion and no split.

- [x] In `homeHeroAnimation.js`, the tail uses
      `SplitText.create(tail, { type: "lines", autoSplit: true, onSplit })`,
      its instance is pushed into `splitInstances`, and its tween targets
      `self.lines` with `x` alternating `-120` / `120` by index,
      `autoAlpha: 0`, `duration: 0.8`, `ease: "power3.out"`,
      `stagger: 0.12` and `delay: 0.3`.
- [x] In `homeHeroAnimation.js`, the subtitle tween targets `self.lines` with
      the same `x`, `autoAlpha`, `duration`, `ease` and `stagger`, plus
      `delay: 0.6`. `grep -n "y: 40"` on the file returns nothing.
- [x] `git diff dev -- src/utils/scripts/perPageAnimations/home/homeHeroAnimation.js`
      changes only the tail tween and the subtitle block. The typewriter
      timeline, the caret, the `heroDescription` block, the reduced-motion
      branch and the cleanup are unchanged. `HomeHero.astro` has no diff.
- [x] Live (`pnpm dev`, normal motion, desktop ~1440px), on `/`:
      - the typewriter still types, deletes and loops through the three
        words, and the caret still blinks;
      - the tail splits into one line wrapper that slides in from the left,
        starting about 0.3s after load;
      - the subtitle splits into line wrappers; line 1 slides in from the
        left and line 2 from the right, top to bottom, starting about 0.6s
        after load;
      - the bold "campañas publicitarias en Google y Meta" keeps its bold and
        accent colour inside the split lines.
- [x] On `/`, live, normal motion, mobile (~375px): the tail and the subtitle
      split into more lines, alternating from the left in each block, and no
      horizontal scrollbar appears during the animation.
- [x] On `/`, live, after resizing the window from desktop to mobile width,
      the tail and the subtitle re-split and are fully visible, and the
      typewriter keeps running.
- [x] On `/`, live, with `prefers-reduced-motion: reduce`: the title shows the
      static joined phrase with no caret, and the tail and subtitle are
      visible, with no motion and no split.

- [x] In `aboutHeroAnimation.js`, the title uses
      `SplitText.create(title, { type: "lines", autoSplit: true, onSplit })`,
      its instance is pushed into `splitInstances`, and its tween targets
      `self.lines` with `x` alternating `-120` / `120` by index,
      `autoAlpha: 0`, `duration: 0.8`, `ease: "power3.out"`,
      `stagger: 0.12` and no `delay`.
- [x] `git diff dev -- src/utils/scripts/perPageAnimations/about/aboutHeroAnimation.js`
      changes only the `if (title) { … }` block. The subtitle block, the
      image hover, the reduced-motion branch and the cleanup are unchanged.
      `HeroAbout.astro` has no diff.
- [x] Live (`pnpm dev`, normal motion, desktop ~1440px), on `/nosotros/`:
      - the title splits into line wrappers, with no per-character elements;
      - line 1 slides in from the left and line 2 from the right, top to
        bottom, starting at load;
      - the subtitle "Somos Rocío y Diego" still animates by characters;
      - the image hover swap still works.
- [x] On `/nosotros/`, live, normal motion, mobile (~375px): the title splits
      into more lines, alternating from the left, and no horizontal
      scrollbar appears during the animation.
- [x] On `/nosotros/`, live, after resizing the window from desktop to mobile
      width, the title re-splits and is fully visible.
- [x] On `/nosotros/`, live, with `prefers-reduced-motion: reduce`: the title
      and subtitle are visible, with no motion and no split.

## Implementation plan

1. **Publicidad.** *(Done, commit `f3e53c8`.)* In
   `publicidadHeroAnimation.js`, replace the `if (heroTitle) { … }` and
   `if (heroDescription) { … }` blocks with the ones from
   `disenoWebHeroAnimation.js`. Push each instance into `splitInstances` as
   today, and leave the subtitle, reduced-motion branch and cleanup as they
   are. Build, then check `/servicios/publicidad-digital/` live at desktop
   width.
2. **Ecommerce.** *(Done, commit `f3e53c8`.)* Make the same change in
   `ecommerceHeroAnimation.js`. Build, then check `/servicios/ecommerce/`
   live at desktop width.
3. **Projects hero.** *(Done, verified 2026-11-11.)* In `ProjectsHero.astro`, swap `data-hero-reveal` for
   `hero-title` on the `h1` and for `description-text` on the `p`. Rewrite
   `projectsHeroAnimation.js` to the `disenoWebHeroAnimation.js` structure:
   title and description blocks copied verbatim, no subtitle block, the CTA
   fade-up with `delay: 0.9`, and a reduced-motion branch without
   `clearProps`. Build, then check `/proyectos/` live at desktop width.
4. **Home hero.** *(Done, verified 2026-11-11.)* In `homeHeroAnimation.js`, replace the tail fade-up with
   the line slide (`delay: 0.3`, instance pushed into `splitInstances`) and
   the subtitle fade-up with the line slide (`delay: 0.6`). Leave the
   typewriter, caret, description block, reduced-motion branch and cleanup
   as they are. Build, then check `/` live at desktop width.
5. **About hero.** In `aboutHeroAnimation.js`, replace the `if (title) { … }`
   block with the line slide (no delay, instance pushed into
   `splitInstances`). Leave the subtitle, the image hover, the reduced-motion
   branch and the cleanup as they are. Build, then check `/nosotros/` live at
   desktop width.
6. **Final check.** Run these checks:
   - `pnpm build`;
   - the `grep` and `git diff` criteria for all six files;
   - on `/nosotros/`, mobile width with no horizontal scrollbar, the resize
     re-split, and reduced motion;
   - that Diseño Web, the `/servicios/` hub, `/proyectos/` and `/` did not
     change.
