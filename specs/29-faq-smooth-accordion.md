# 29 — FAQ smooth accordion

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Make the FAQ answers open and close smoothly. The answer's height and opacity
animate together, instead of the native `<details>` snapping open and shut.
The motion is ported from the Viviana Odontóloga site
(`vivianaodontologa/src/utils/scripts/animations/contacto/faq.ts`), the newest
of its four FAQ scripts. Only the motion changes: Shine's FAQ keeps its current
look.

## Scope

**In:**

- One shared GSAP script,
  `src/utils/scripts/globalAnimations/faqAnimation.js`, loaded from
  `src/components/section/FAQ.astro` through a `<script>` tag. It covers the
  four pages that render the component: `/`, `/servicios/diseno-web-estrategico/`,
  `/servicios/publicidad-digital/` and `/servicios/ecommerce/`.
- Behaviour, ported from Viviana's `contacto/faq.ts`:
  - a click on `<summary>` (mouse, Enter and Space all fire `click`) calls
    `preventDefault()` and drives the toggle from the script;
  - **open:** set the answer wrapper to `height: 0; opacity: 0; overflow:
    hidden`, set `details.open = true`, then tween to
    `height: answer.scrollHeight, opacity: 1` in `0.45 s`, `power2.inOut`;
  - **close:** set `data-closing` on `<details>` and `overflow: hidden` on the
    wrapper. Tween to `height: 0, opacity: 0` in `0.4 s`, `power2.inOut`.
    Only in `onComplete` set `details.open = false` and remove
    `data-closing`;
  - a click during a tween kills it and reverses from the current height. A
    `target` flag tracks where the item is heading;
  - outside a tween the script reads the real `details.open`. A `<details>`
    the browser opened on its own (find-in-page) closes on the first click;
  - when each tween settles, clear `height,opacity,overflow` inline props and
    call `ScrollTrigger.refresh()`, because the content below changed height
    under Lenis/ScrollTrigger;
  - every open/close is independent. Opening one item does not close the
    others.
- `gsap.matchMedia()` with two branches:
  - `(prefers-reduced-motion: reduce)`: no listeners. Remove any
    `data-closing` and clear the inline props, which leaves the plain native
    toggle;
  - `(prefers-reduced-motion: no-preference)`: the listeners above. Its
    cleanup removes the listeners, kills a running tween and lands the item on
    its `target` state, so switching reduced motion on mid-animation leaves no
    half-open item.
- Every `[data-faq]` root on the page is handled, not just the first. Today
  each page has one FAQ, but the script does not assume it.
- Minimal markup changes in `FAQ.astro`:
  - `data-faq` on the `<section>`, `data-faq-item` on each `<details>`;
  - split the answer container in two. The outer
    `<div data-faq-answer>` has no padding, so the animation can reach a
    real height of 0. The inner `<div class="px-6 pb-6 pt-2">` keeps the
    padding and wraps the existing `<p>`.
- The summary's bottom border (`details[open] summary` in the component's
  `<style>`) disappears as soon as a close starts. The selector becomes
  `details[open]:not([data-closing]) summary`, in both the light and the
  `:global(.dark)` rule.

**Out:**

- Any visual restyle. The cards, borders, `+` icon in a circle, colours,
  dark mode and typography stay as they are. Viviana's divider-list look is
  not adopted.
- Changing the `+` icon's rotation. It stays on `group-open:rotate-45`, so it
  rotates back only when `open` is removed at the end of the close tween.
- Exclusive accordion (one item open at a time).
- FAQ content (`src/config/faqs.ts`) and FAQ schema (the site emits no
  `FAQPage` JSON-LD — see AGENTS.md).
- Blog post FAQs or any other accordion on the site (projects accordion,
  spec 21).
- Changes to Viviana's site.

## Files affected

- `src/components/section/FAQ.astro` — `data-faq` / `data-faq-item`
  attributes, the answer wrapper split, the border selector in `<style>`,
  and a new `<script>` that imports the animation.
- `src/utils/scripts/globalAnimations/faqAnimation.js` — new. Plain `.js`,
  like every other file in `globalAnimations/`.

AGENTS.md rows checked:

- "Conventions for writing components" → animations live in
  `globalAnimations/` or `perPageAnimations/<page>/` and are loaded via a
  `<script>` in the component. This follows the existing convention, so
  **AGENTS.md does not change**. `globalAnimations/` is used because the
  component is shared by four pages, so no single `<page>` folder fits.
- "If you change X → update Y": no row matches. There is no new dependency
  (`gsap` and `ScrollTrigger` are already installed), no new config file and
  no folder-convention change.
- Knobs map → "Animation strategy: GSAP". This is consistent with that row.

## Decisions made and discarded

- **Port `contacto/faq.ts`, not `home/faq.ts`.** The contacto variant (also
  used on rehabilitación and blanqueamiento) tweens opacity with height,
  survives find-in-page, and refreshes ScrollTrigger after the layout
  change. Shine runs Lenis + ScrollTrigger, so the refresh matters.
  Discarded: `home/faq.ts`, which is the older height-only version.
- **Script in `globalAnimations/faqAnimation.js`.** It fits the current
  AGENTS.md convention without changing it. Discarded: a new
  `sharedAnimations/` folder. It is more precise, but it changes the folder
  convention and would force updates to AGENTS.md and the `front-end-astro`
  SKILL.md for a single file.
- **Behaviour only, no restyle.** The user asked for the smooth behaviour.
  Discarded: also adopting Viviana's visual style, which would be a redesign
  and deserves its own spec.
- **Hide the summary border at the start of a close (`data-closing`).**
  Discarded: leaving `details[open] summary` alone, which would keep the
  border visible for the 0.4 s close and then make it vanish abruptly.
- **Split the answer wrapper.** The current `<div class="px-6 pb-6 pt-2">`
  carries padding. Animating its height to 0 would leave about 32 px of
  padding visible and then jump. The padding moves to an inner div.
- **Keep native `<details>`/`<summary>`.** Keyboard access, find-in-page and
  the no-JS fallback come for free. Discarded: rebuilding as buttons with
  `aria-expanded`.
- **Independent items.** Viviana's script does not close siblings, and
  nobody asked for it. Discarded: an exclusive accordion.

## Acceptance criteria

- [x] `pnpm build` passes (the `shineSeo()` gate prints no new errors).
- [x] `src/utils/scripts/globalAnimations/faqAnimation.js` exists, imports
      `gsap` and `ScrollTrigger`, and calls `gsap.matchMedia()` with both
      `(prefers-reduced-motion: reduce)` and
      `(prefers-reduced-motion: no-preference)`.
- [x] `src/components/section/FAQ.astro` has a `<script>` that imports
      `@/utils/scripts/globalAnimations/faqAnimation.js`, and contains no
      GSAP calls of its own.
- [x] In `dist/`, after the build: `dist/index.html` and the three
      `dist/servicios/{diseno-web-estrategico,publicidad-digital,ecommerce}/index.html`
      each contain `data-faq` on the section, and the count of
      `data-faq-item` equals the count of `data-faq-answer`. Each count is
      greater than 0.
- [x] In `dist/`, no element carrying `data-faq-answer` also carries a
      `px-6`, `pb-6` or `pt-2` class. The padding is on the inner div.
- [x] The component `<style>` uses
      `details[open]:not([data-closing]) summary` for both the light rule and
      the `:global(.dark)` rule, and no bare `details[open] summary` remains.
- [x] Live check on `/` (`pnpm dev`, headed browser): clicking a question
      grows the answer from 0 to its full height while it fades in. Clicking
      it again shrinks and fades it out, and the `+` turns back only at the
      end.
- [x] Live check: during a close, the summary's bottom border is already
      gone before the tween ends (`data-closing` is present on `<details>`
      mid-tween).
- [x] Live check: clicking an item again mid-open reverses it from its
      current height with no jump to 0 or to full height.
- [x] Live check: after any open or close finishes, the answer wrapper has no
      inline `height`, `opacity` or `overflow` style.
- [x] Live check, keyboard: Tab to a `<summary>`, then Enter and Space each
      toggle it with the same animation. The focus stays on the summary.
- [x] Live check with reduced-motion emulation
      (`prefers-reduced-motion: reduce`): clicking toggles instantly (native
      behaviour), and no inline styles or `data-closing` appear.
- [x] Live check on one service page
      (`/servicios/diseno-web-estrategico/`): the same open/close animation
      works.
- [x] Live check, dark theme: open/close works, and the summary border
      behaves the same as in light theme.
- [x] No console errors on `/` or the checked service page.
- [x] AGENTS.md is unchanged (no table row applies — see Files affected).

## Implementation plan

1. Load the `gsap-core` skill (matchMedia, tweens, `overwrite`) before
   writing any GSAP.
2. Edit `src/components/section/FAQ.astro`. Add `data-faq` to the
   `<section>` and `data-faq-item` to each `<details>`. Replace
   `<div class="px-6 pb-6 pt-2">` with `<div data-faq-answer>` wrapping
   `<div class="px-6 pb-6 pt-2">` and the existing `<p>`. Change both
   `details[open] summary` selectors in `<style>` to
   `details[open]:not([data-closing]) summary`. The page still works with
   the native toggle, because no script is attached yet.
3. Create `src/utils/scripts/globalAnimations/faqAnimation.js`. Register
   `ScrollTrigger`. For each `[data-faq]` root, collect `[data-faq-item]`
   and add the two `gsap.matchMedia()` branches described in Scope,
   following Viviana's `contacto/faq.ts` logic (`target` flag, `open()`,
   `close()`, `settle()` with `clearProps` and `ScrollTrigger.refresh()`,
   cleanup that lands on `target`).
4. Add `<script>import "@/utils/scripts/globalAnimations/faqAnimation.js";</script>`
   to `FAQ.astro`.
5. Run `pnpm build` and the `dist/` grep criteria.
6. Run the live checks on `pnpm dev` in a headed browser (`pnpm preview`
   does not work with the Netlify adapter): `/`, one service page, keyboard,
   reduced motion, dark theme and console.
