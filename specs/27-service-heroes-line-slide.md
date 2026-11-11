# 27 — Service heroes title and description line slide

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Apply the animation from spec 26 to the hero title and description on
`/servicios/publicidad-digital/` and `/servicios/ecommerce/`. Each rendered line
slides in from its own side, alternating left and right, instead of the words
flying in at random. After this change all three service pages animate their
heroes the same way. Spec 24 gave each hero its own animation file, so the
change touches only those two files.

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
- A "line" is a rendered line, so the count depends on the viewport width.
  The alternation restarts from the left on the first rendered line of
  **each** block.

**Out:**

- The subtitle animation (line-by-line fade up, `delay: 0.3`) in both files.
  It does not change.
- The CTA buttons.
- The reduced-motion branch and the cleanup in both files.
- `disenoWebHeroAnimation.js`. It already has this animation (spec 26).
- The services hub `/servicios/` (`servicesHeroAnimation.js`). It keeps its
  per-character animation.
- The contact and home heroes (`contactHeroAnimation.js`, `homeHeroAnimation.js`).
- A shared animation helper (see Decisions).
- Any markup, copy or CSS change. `PublicidadHero.astro` and
  `EcommerceHero.astro` are not touched.

## Files affected

No row of AGENTS.md's "If you change X → update Y" table matches, and
AGENTS.md does not change. The change edits two existing files.

- **Edited:**
  - `src/utils/scripts/perPageAnimations/servicesAnimations/publicidadHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/servicesAnimations/ecommerceHeroAnimation.js`

## Source of the content

No content. This is an animation-only change.

## Decisions made and discarded

- **Publicidad and Ecommerce only.** Chosen by the repo owner on 2026-11-11.
  Discarded: also changing the `/servicios/` hub, which keeps its
  per-character animation. Its description is a single sentence with an empty
  `<span class="block">`, so a line slide would have less effect there.
- **Title and description, as in spec 26. Not the subtitle or the CTA.**
  This gives the same result as on Diseño Web. Discarded: title only.
- **Same values as spec 26.** These are ±120px, `autoAlpha` 0 → 1, 0.8s,
  `power3.out` and `stagger: 0.12`, with `delay: 0.6` on the description.
  The alternation restarts from the left in each block. The three service
  pages should look and feel the same. Discarded: changing values per page,
  such as the starting side. `html` and `body` already have
  `overflow-x: hidden`, so ±120px cannot create a horizontal scrollbar
  (spec 26).
- **Copy the code into each per-page file. No shared helper.** This keeps
  the spec 24 decision (one animation file per hero, so each page can change
  without affecting the others), and the repo owner confirmed it on
  2026-11-11. Discarded: a shared line-slide helper used by all three files.
  That would reopen spec 24 and also edit `disenoWebHeroAnimation.js`. The
  cost is three copies of the same block.
- **`autoSplit` + `onSplit` returning the tween.** Same pattern as spec 26 and
  the existing subtitles, so the split stays correct after a resize or a late
  font load.

## Acceptance criteria

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
- [x] No file other than these two changes. Checked with
      `git diff --stat dev`.
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
      and the `/servicios/` hub title still animates by characters.

## Implementation plan

1. **Publicidad.** In `publicidadHeroAnimation.js`, replace the
   `if (heroTitle) { … }` and `if (heroDescription) { … }` blocks with the
   ones from `disenoWebHeroAnimation.js`. Push each instance into
   `splitInstances` as today, and leave the subtitle, reduced-motion branch
   and cleanup as they are. Build, then check `/servicios/publicidad-digital/`
   live at desktop width.
2. **Ecommerce.** Make the same change in `ecommerceHeroAnimation.js`. Build,
   then check `/servicios/ecommerce/` live at desktop width.
3. **Final check.** Run these checks:
   - `pnpm build`;
   - the `grep` and `git diff` criteria;
   - on both pages, mobile width with no horizontal scrollbar, and the
     resize re-split;
   - reduced motion on both pages;
   - that Diseño Web and the `/servicios/` hub did not change.
