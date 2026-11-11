# 25 — Hero word-split animation

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Change the hero title and description animation from chars to words on four
pages: `/servicios/diseno-web-estrategico/`, `/servicios/publicidad-digital/`,
`/servicios/ecommerce/` and `/contacto/`. The motion stays the same, but each
word moves as one piece instead of each letter. Spec 24 gave every hero its
own animation file, so this change touches only these four files.

## Scope

**In:**

- In these four files, change the title and description `SplitText` from
  `type: "words, chars"` to `type: "words"`, and point the two tweens at
  `.words` instead of `.chars`:
  - `src/utils/scripts/perPageAnimations/servicesAnimations/disenoWebHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/servicesAnimations/publicidadHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/servicesAnimations/ecommerceHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/contact/contactHeroAnimation.js`
- The tween parameters stay exactly as they are today:
  - `yPercent: "random(-100, 100)"`
  - `rotation: "random(-30, 30)"`
  - `ease: "back.out(2)"`
  - `autoAlpha: 0`
  - `stagger: { amount: 0.7, from: "random" }`
  - `delay: 0.6` on the description

**Out:**

- The `/servicios/` hub hero (`servicesHeroAnimation.js`). It keeps animating by
  chars.
- The home hero (`homeHeroAnimation.js`), with its typewriter.
- The subtitle animation in all four files. It already animates line by line
  and does not change.
- The pinned panels on `/servicios/diseno-web-estrategico/`
  (`ServicesPinSlideAnimation.js`). They keep their masked, scroll-scrubbed
  char reveal.
- The reduced-motion branch. It already sets `autoAlpha: 1` without
  `clearProps` and does not change.
- Any markup, copy or CSS change. Hero components and pages are not touched.
- A shared animation helper. Spec 24 chose one file per page.

## Files affected

No row of AGENTS.md's "If you change X → update Y" table matches, and
AGENTS.md does not change. The change edits existing files in existing
folders.

- **Edited:**
  - `src/utils/scripts/perPageAnimations/servicesAnimations/disenoWebHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/servicesAnimations/publicidadHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/servicesAnimations/ecommerceHeroAnimation.js`
  - `src/utils/scripts/perPageAnimations/contact/contactHeroAnimation.js`

## Source of the content

No content. This is an animation-only change.

## Decisions made and discarded

- **Pages:** diseño web, publicidad, ecommerce and contacto. The repo owner
  chose them on 2026-11-10. Discarded:
  - the `/servicios/` hub, which keeps chars;
  - the pinned panels, which are a separate scroll-scrubbed effect.
- **Elements:** the title and the description. The subtitle already animates
  line by line. Discarded: changing only the title, or only the description.
- **Same motion, applied to words.** The tween parameters are kept and only
  the target changes from `.chars` to `.words`. Discarded:
  - a calmer fade-up in reading order;
  - a masked word reveal like the pinned panels.
  Either would change the hero's personality, and that belongs in its own
  spec.
- **`type: "words"`, not `"words, chars"`.** Nothing animates the chars
  anymore, so not splitting them avoids one wrapper per letter. Discarded:
  keeping the char split unused.
- **Contacto is accepted as a single word.** The `/contacto/` title is one
  word ("Contacto") and its description is empty. With words, the title is a
  single piece that flies in once, with no visible stagger. The repo owner
  accepted this on 2026-11-10.

## Acceptance criteria

- [x] `pnpm build` succeeds (the `shineSeo()` gate passes).
- [x] In each of the four files, both `SplitText.create` calls for the title
      and the description use `type: "words"`, and
      `grep -n "chars" <file>` returns nothing.
- [x] In each of the four files, the title and description tweens target
      `.words` with the same parameters as before. Checked with
      `git diff -U0 <file>`: the only changed lines are the two `type` values
      and the two `.chars` → `.words` targets.
- [x] `servicesHeroAnimation.js`, `homeHeroAnimation.js` and
      `ServicesPinSlideAnimation.js` have no diff against `dev`.
- [x] No file outside the four listed under Files affected changes. Checked
      with `git diff --stat dev`.
- [x] Live (`pnpm dev`, normal motion), on diseño web, publicidad and
      ecommerce:
      - the title and the description split into words, with no
        per-letter elements;
      - the words fly in in random order with the random offset and
        rotation;
      - the subtitle still fades up line by line.
- [x] Live, normal motion, on `/contacto/`: the "Contacto" title animates
      in as one word, and the subtitle still fades up line by line.
- [x] Live, `prefers-reduced-motion: reduce`, on the four pages: the title,
      subtitle and description are visible, with no motion and no split.
- [x] Live, on `/servicios/`: the hub hero still animates by chars.

## Implementation plan

1. **Diseño web.** In `disenoWebHeroAnimation.js`, make these changes:
   - change the title and description `SplitText.create` to
     `{ type: "words" }`;
   - point both tweens at `split*.words`.

   Build, and check `/servicios/diseno-web-estrategico/` live.
2. **Publicidad digital.** The same in `publicidadHeroAnimation.js`, and check
   `/servicios/publicidad-digital/` live.
3. **Ecommerce.** The same in `ecommerceHeroAnimation.js`, and check
   `/servicios/ecommerce/` live.
4. **Contacto.** The same in `contactHeroAnimation.js`, and check `/contacto/`
   live.
5. **Final check.** Run these checks:
   - `pnpm build`;
   - the `grep` and `git diff` criteria;
   - reduced motion on the four pages;
   - that `/servicios/` still animates by chars.
