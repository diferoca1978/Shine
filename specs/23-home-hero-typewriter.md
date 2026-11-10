# 23 — Home hero typewriter headline

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Redesign the home page `<h1>` following the reference the repo owner shared
on 2026-11-10 ("Si estás buscando **EMPRENDER|** este programa es para ti"):
the three services are typed, held, deleted and replaced in a loop with a
blinking caret, and the line below ("para negocios que quieren vender más")
only fades in from the bottom, with no typewriter.

```
   DISEÑO WEB|                 ← typewriter loop: Diseño web → Publicidad digital → E-commerce
para negocios que quieren      ← fade-in from the bottom, once
     vender más
```

## Scope

**In:**

- An optional `rotatingWords` / `titleTail` prop pair on `GlobalHero.astro`
  that switches its `<h1>` to the typewriter markup.
- The typewriter loop, the caret blink and the tail fade-up in
  `globalHeroAnimation.js`, inside the existing `gsap.matchMedia()` with a
  `prefers-reduced-motion: reduce` branch.
- `src/pages/index.astro` passing the new props.

**Out:**

- The other `GlobalHero` callers (`contacto`, `servicios/index`,
  `servicios/diseno-web-estrategico`, `servicios/publicidad-digital`,
  `servicios/ecommerce`): their markup and scramble animation stay as they are.
- The hero `<h2>` subtitle, description and CTA: same copy, same animation.
- Any new color token. The reference uses purple, Shine's palette has none;
  the repo owner chose the existing highlight (`text-deepplum` /
  `dark:text-accentGold`) on 2026-11-10. `global.css` is not edited.
- A static lead-in line above the rotating word (the repo owner declined it
  on 2026-11-10).
- SEO title/description and JSON-LD of `/`.

## Files affected

Matches **no** row of AGENTS.md's "If you change X → update Y" table: the
animation strategy stays GSAP. `GlobalHero.astro` and
`globalHeroAnimation.js` are shared components; the change is additive and
opt-in, so existing callers are unaffected.

- `src/components/global/GlobalHero.astro` — new optional props + markup branch.
- `src/utils/scripts/globalAnimations/globalHeroAnimation.js` — typewriter
  branch; title scramble skipped when the typewriter markup is present.
- `src/pages/index.astro` — `GlobalHero` props.

## Source of the content

No new copy. The three services and the tail are the current home `<h1>`
text, `src/pages/index.astro` (`titleLine1` / `titleLine2` of `GlobalHero`):
"Diseño web, publicidad digital y e-commerce para negocios que quieren
vender más". The rotating labels are that same phrase split into its parts.

## Decisions made and discarded

- **Opt-in prop on `GlobalHero`** instead of a new `HomeHero` component:
  keeps one hero for the subtitle/CTA markup and its animation. Discarded a
  new component because it would duplicate that markup.
- **Indexable `<h1>` text unchanged:** a `sr-only` span carries the full
  phrase; the animated spans are `aria-hidden="true"`. The animated word
  changes every few seconds, so it can't be the accessible name or what
  crawlers read. Discarded putting the typed text alone in the `<h1>`.
- **No-JS / first paint:** the server renders the first word ("Diseño web")
  so the line is never empty.
- **Anti-CLS:** the rotating line is `whitespace-nowrap` with a fluid size,
  so the longest label ("PUBLICIDAD DIGITAL") never wraps to a second line
  at 375 px and the tail line doesn't jump.
- **Reduced motion:** no loop; the typed span shows the static
  "Diseño web, publicidad digital y e-commerce" and the caret is hidden.
- **Color:** existing highlight tokens, not a new purple (see Scope → Out).

## Acceptance criteria

- [x] `pnpm build` succeeds (the `shineSeo()` gate passes).
- [x] `dist/index.html` has exactly one `<h1`, and its text contains
      "Diseño web, publicidad digital y e-commerce para negocios que quieren vender más".
- [x] `dist/index.html` has `hero-typed` with the three labels in `data-words`,
      and `aria-hidden="true"` on the animated spans.
- [x] `dist/contacto/index.html` and `dist/servicios/index.html` have no
      `hero-typed` and their `<h1>` text is unchanged.
- [x] Live (`pnpm dev`): the loop types, holds, deletes and moves through the
      three labels in order and repeats; the caret blinks; the tail fades up
      from the bottom once.
- [x] Live at 375 px wide: "PUBLICIDAD DIGITAL" stays on one line and the
      tail line doesn't move vertically during the loop.
- [x] Live, dark mode: the rotating word is `accentGold`; light mode `deepplum`.
- [x] Live, `prefers-reduced-motion: reduce`: static text, no caret, no loop.
- [x] No AGENTS.md / CHECKPOINTS.md section needs an update (no table row matched).

## Implementation plan

1. `GlobalHero.astro`: add `rotatingWords?: string[]` and `titleTail?: string`.
   When `rotatingWords` is set, render the `<h1>` as a `sr-only` full title
   (`titleLine1`), an `aria-hidden` line with `.hero-typed` (uppercase,
   bold, `text-deepplum dark:text-accentGold`, `data-words`, first word
   server-rendered) + `.hero-caret`, and an `aria-hidden` `.hero-title-tail`
   line. Add class `hero-title--typewriter`. Otherwise keep the current markup.
2. `globalHeroAnimation.js`: when `.hero-title--typewriter` exists, skip the
   title SplitText. Full motion: `gsap.timeline({ repeat: -1 })` typing each
   word through a `{ n }` proxy (`onUpdate` writes `word.slice(0, n)`),
   hold, delete faster, next word; caret blink with `steps(1)` yoyo; tail
   `gsap.from({ y: 40, autoAlpha: 0, ease: "power3.out" })`. Reduced motion:
   static joined text, caret hidden. Everything created inside `mm.add`.
3. `index.astro`: `titleLine1` = full phrase, `rotatingWords` =
   `["Diseño web", "Publicidad digital", "E-commerce"]`,
   `titleTail="para negocios que quieren vender más"`; drop `titleLine2`.
