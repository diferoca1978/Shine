# 26 — Web design hero title and description line slide

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Change the hero title and description animations on
`/servicios/diseno-web-estrategico/` so that each rendered line slides in from
its own side, alternating left and right, instead of the words flying in at
random. Spec 24 gave this hero its own animation file, so the change touches
only that file.

## Scope

**In:**

- In `src/utils/scripts/perPageAnimations/servicesAnimations/disenoWebHeroAnimation.js`,
  replace the **title** animation:
  - split the title with `SplitText.create(heroTitle, { type: "lines", autoSplit: true, onSplit })`,
    the same pattern the subtitle already uses, so the lines re-split on resize
    and font load;
  - `onSplit` returns one `gsap.from(self.lines, …)` tween with:
    - `x`: function-based, `(i) => (i % 2 === 0 ? -120 : 120)` — line 1 from
      the left, line 2 from the right, and so on;
    - `autoAlpha: 0`;
    - `duration: 0.8`;
    - `ease: "power3.out"`;
    - `stagger: 0.12`, in reading order (top to bottom).
- In the same file, replace the **description** animation with the same kind
  of animation:
  - split the description with
    `SplitText.create(heroDescription, { type: "lines", autoSplit: true, onSplit })`;
  - `onSplit` returns one `gsap.from(self.lines, …)` tween with the same
    `x` function, `autoAlpha: 0`, `duration: 0.8`, `ease: "power3.out"` and
    `stagger: 0.12` as the title;
  - plus `delay: 0.6`, the description's current delay, so its place in the
    hero sequence does not change.
- A "line" is a rendered line, so the count depends on the viewport width
  (e.g. 3 lines on desktop and 4 on mobile for the title). The alternation
  restarts from the left on the first rendered line of **each** block.

**Out:**

- The subtitle animation (line-by-line fade up, `delay: 0.3`). Unchanged.
- The CTA button. It keeps its current behavior.
- The reduced-motion branch. It already sets `autoAlpha: 1` without
  `clearProps` and does not change.
- The other heroes (`publicidadHeroAnimation.js`, `ecommerceHeroAnimation.js`,
  `contactHeroAnimation.js`, `servicesHeroAnimation.js`, `homeHeroAnimation.js`),
  including their own `.description-text` animations.
- The pinned panels (`ServicesPinSlideAnimation.js`).
- Any markup, copy or CSS change. `DisenoWebHero.astro` is not touched.

## Files affected

No row of AGENTS.md's "If you change X → update Y" table matches, and
AGENTS.md does not change. The change edits one existing file.

- **Edited:**
  - `src/utils/scripts/perPageAnimations/servicesAnimations/disenoWebHeroAnimation.js`

## Source of the content

No content. This is an animation-only change.

## Decisions made and discarded

- **A row is a rendered line.** `SplitText` `type: "lines"` with
  `autoSplit: true`, chosen by the repo owner on 2026-11-11. Discarded: fixed
  rows from the markup (the title text and its `<span class="block">`), which
  would not read as rows on mobile where each block wraps onto several lines.
- **Title and description; not the subtitle or CTA.** First chosen as
  title-only on 2026-11-11; widened by the repo owner the same day (after the
  title-only version was implemented and verified) to include the description
  with the same kind of animation. Discarded: applying it to the subtitle too,
  and including the CTA button.
- **Alternating sides, restarting from the left in each block.** The first
  line of the title and the first line of the description both enter from the
  left. Discarded: continuing the pattern across blocks (the description's
  first side would depend on how many lines the title wrapped into, so it
  would change with the viewport) and random sides.
- **Short offset with fade (±120px, `autoAlpha` 0 → 1, `power3.out`).**
  Discarded: entering from off-screen, which is more dramatic but needs extra
  overflow handling. `html` and `body` already have `overflow-x: hidden`
  (`src/styles/global.css`, `MainLayout.astro`), so ±120px cannot create a
  horizontal scrollbar.
- **One tween per block, lines in reading order with `stagger: 0.12`; the
  description keeps `delay: 0.6`.** Discarded: a single timeline chaining
  title → description, which would change the existing hero timing. The
  subtitle (`delay: 0.3`) and description (`delay: 0.6`) keep their own
  timing and may overlap the title's tail; that is accepted.
- **`autoSplit` + `onSplit` returning the tween.** Same pattern the subtitle
  already uses, so the line split stays correct after a resize or late font
  load. Discarded: a one-shot `type: "lines"` split, which would leave broken
  lines after a resize.

## Acceptance criteria

- [x] `pnpm build` succeeds (the `shineSeo()` gate passes).
- [x] In `disenoWebHeroAnimation.js`, the title `SplitText.create` uses
      `type: "lines"` with `autoSplit: true`, and its tween targets
      `self.lines` with `x` alternating `-120` / `120` by index, `autoAlpha: 0`,
      `duration: 0.8`, `ease: "power3.out"` and `stagger: 0.12`.
- [x] In the same file, the description `SplitText.create` uses
      `type: "lines"` with `autoSplit: true`, and its tween targets
      `self.lines` with the same `x`, `autoAlpha`, `duration`, `ease` and
      `stagger` as the title, plus `delay: 0.6`.
- [x] In the same file, neither the title nor the description tween uses
      `yPercent`, `rotation` or `from: "random"`; the subtitle block,
      reduced-motion branch and cleanup are unchanged. Checked with
      `git diff dev -- <file>`: only the `if (heroTitle) { … }` and
      `if (heroDescription) { … }` blocks change.
- [x] No file other than `disenoWebHeroAnimation.js` changes. Checked with
      `git diff --stat dev`.
- [x] Live (`pnpm dev`, normal motion, desktop ~1440px) on
      `/servicios/diseno-web-estrategico/`:
      - the title and the description each split into line wrappers, with no
        per-word elements;
      - in each block, the first line slides in from the left and the second
        from the right;
      - in each block, the lines appear one after another, top to bottom;
      - the description starts about 0.6s after load, as before;
      - the subtitle still fades up line by line.
- [x] Live, normal motion, mobile (~375px): the title and description split
      into more lines, they still alternate left/right starting from the left
      in each block, and no horizontal scrollbar appears during the animation.
- [x] Live, after resizing the window from desktop to mobile width, the title
      and description re-split into the new lines and are fully visible (no
      line stuck hidden or offset).
- [x] Live, `prefers-reduced-motion: reduce`: the title, subtitle and
      description are visible, with no motion and no split.
- [x] Live, on `/servicios/publicidad-digital/` and `/servicios/ecommerce/`:
      the hero titles and descriptions still animate by words, as before.

## Implementation plan

1. **Title animation.** *(Done and verified in the title-only version.)* In
   `disenoWebHeroAnimation.js`, replace the `if (heroTitle) { … }` block:
   - `SplitText.create(heroTitle, { type: "lines", autoSplit: true, onSplit })`;
   - `onSplit: (self) => gsap.from(self.lines, { x: (i) => (i % 2 === 0 ? -120 : 120), autoAlpha: 0, duration: 0.8, ease: "power3.out", stagger: 0.12 })`;
   - push the instance into `splitInstances` as today.
2. **Description animation.** In the same file, replace the
   `if (heroDescription) { … }` block:
   - `SplitText.create(heroDescription, { type: "lines", autoSplit: true, onSplit })`;
   - `onSplit: (self) => gsap.from(self.lines, { x: (i) => (i % 2 === 0 ? -120 : 120), autoAlpha: 0, duration: 0.8, delay: 0.6, ease: "power3.out", stagger: 0.12 })`;
   - push the instance into `splitInstances` as today.

   Leave the subtitle, reduced-motion branch and cleanup untouched. Build, and
   check the page live at desktop width.
3. **Final check.** Run these checks:
   - `pnpm build`;
   - the `git diff` criteria;
   - mobile width with no horizontal scrollbar, and the resize re-split, for
     both blocks;
   - reduced motion;
   - that publicidad and ecommerce heroes are unchanged.
