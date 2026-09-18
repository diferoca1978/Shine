# 07 — theme toggle view transition

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Animate the light/dark theme switch with a blurred circular reveal using the
native View Transitions API (ported from
[rudrodip/theme-toggle-effect](https://github.com/rudrodip/theme-toggle-effect)),
and close two accessibility gaps on the toggle control itself: a missing
`aria-pressed` state and unguarded hover motion.

## Scope

**In:**

- `src/components/ui/ThemeToggle.astro`:
  - Add `aria-pressed` to the button, synced across **both** rendered
    instances (`Navbar.astro:128` desktop, `Navbar.astro:133` mobile) on
    `DOMContentLoaded` and on every toggle.
  - Wrap the existing theme switch in `document.startViewTransition()`,
    with the current instant behavior as the fallback path.
  - Skip the transition entirely when
    `(prefers-reduced-motion: reduce)` matches.
  - Degrade the button's existing `hover:scale-110 transition-all
duration-200` (line 9) with `motion-reduce:` variants, per AGENTS.md
    § "Conventions for writing components".
- `src/styles/global.css`:
  - `--ease-expo-out` added to the existing `@theme inline` block (82-100),
    carrying the reference repo's exact 16-stop `linear()` curve.
  - The `::view-transition-*` rules, the reveal keyframes, and a
    `@media (prefers-reduced-motion: reduce)` guard, added as top-level
    (unlayered) CSS after the `@theme` block.
- Preserving the existing `themechange` CustomEvent contract — it fires
  **inside** the `startViewTransition` callback so the GSAP listeners in
  `solutionsAnimation.js:60,169` re-apply their colors _before_ the browser
  captures the "new" snapshot.

**Out:**

- `src/layouts/MainLayout.astro`. Its pre-paint theme script (82-91) stays
  exactly as-is: it runs in `<head>` before either button exists in the DOM,
  so it cannot usefully write `aria-pressed`. Splitting the ARIA logic
  across two files was considered and discarded (see Decisions).
- `src/utils/scripts/perPageAnimations/home/solutionsAnimation.js`. Its two
  `themechange` listeners keep working untouched — this spec preserves the
  event's timing contract rather than changing its consumers.
- The reference repo's multi-variant animation registry
  (`circle`, `polygon`, `polygon-gradient`, `circle-blur-top-left`, …).
  Exactly one variant — `circle-with-blur` — is ported. A runtime variant
  switcher is demo scaffolding, not a site feature.
- Origin-at-the-button reveal (reading `getBoundingClientRect()` into CSS
  custom properties). The reveal is centered, matching the ported variant.
- An `aria-live` region announcing the new theme. Considered and explicitly
  declined — `aria-pressed` already conveys state on the control itself.
- The button's `aria-label="Toggle dark mode"` (line 8), which is English
  copy on an `es-CO` site. Noted here so it is on record, but changing
  user-facing copy is a content decision outside this spec's remit.
- Astro's `<ClientRouter />` / cross-document view transitions. This spec
  uses the same-document API only; no page-navigation transitions are
  introduced, and no GSAP teardown/re-init lifecycle is needed as a result.

## Files affected

Matches **no** row in AGENTS.md's "If you change X → update Y" table — no
dependency is added (the View Transitions API is native), no config file,
no font slot, no redirect, no folder convention. Under "Invariant vs
Variable" this touches **Variable** on the `global.css @theme` side (a new
token) and a `ui/` component. No AGENTS.md edit is required as part of this
change.

- `src/components/ui/ThemeToggle.astro` — button attributes (lines 6-10)
  and the `is:inline` script (lines 18-31).
- `src/styles/global.css` — `@theme inline` block (82-100) gains
  `--ease-expo-out`; new top-level CSS appended after line 100.

Read but **not** modified:
`src/components/global/Navbar.astro:128,133` (renders the two instances),
`src/layouts/MainLayout.astro:82-91` (pre-paint theme init),
`src/utils/scripts/perPageAnimations/home/solutionsAnimation.js:60,169`
(`themechange` consumers).

## Decisions made and discarded

- **Animation variant.** **Chosen:** `circle-with-blur` from the reference
  registry — blurred circular mask, `center / 0 no-repeat`, growing to
  `mask-size: 200vmax` over 1s. **Discarded:** `polygon` /
  `polygon-gradient` (different aesthetic, no reason to prefer it),
  `circle-blur-top-left` (its origin is the top-left corner while this
  site's toggle sits top-right — the mismatch reads as a bug), and an
  origin-at-the-button reveal (requires coordinate plumbing through CSS
  custom properties and per-instance handling for the two buttons, for a
  refinement nobody asked for).
- **`themechange` timing.** **Chosen:** fire it synchronously inside the
  `startViewTransition` callback, alongside the class toggle. The GSAP
  listeners in `solutionsAnimation.js` re-read theme colors and re-apply
  them via `gsap.set()`; running them inside the callback means their
  result is part of the "new" snapshot the browser captures. **Discarded:**
  firing after `transition.finished` — the snapshot would then show the old
  GSAP word colors under the new theme for the full 1s reveal and snap at
  the end, a visible glitch. Also discarded: firing both inside and after
  (the listeners are idempotent, so the second pass is pure waste).
- **Reduced motion.** **Chosen:** two layers — a
  `window.matchMedia('(prefers-reduced-motion: reduce)')` check in JS that
  bypasses `startViewTransition()` entirely, plus a CSS
  `@media (prefers-reduced-motion: reduce)` block setting `animation: none`
  on the pseudo-elements. **Discarded:** CSS-only (still pays the snapshot
  cost and leans on a single layer) and JS-only (leaves any future CSS
  variant unguarded). AGENTS.md treats reduced motion as mandatory, and the
  GSAP side of this codebase already carries a `reduce` branch everywhere —
  the CSS side should match.
- **Where `aria-pressed` is initialized.** **Chosen:** in ThemeToggle's own
  `is:inline` script, on `DOMContentLoaded`, querying **all**
  `.theme-toggle-btn` nodes. This is load-bearing, not incidental: the
  component renders twice and its script is emitted with the first
  instance, which executes _before_ the second button exists in the DOM —
  so a deferred hook is the only way to reach both. **Discarded:**
  extending `MainLayout`'s `<head>` script (the buttons don't exist yet at
  that point either, so it would need the same hook, split across two
  files), and rendering a static `aria-pressed="false"` with no sync (wrong
  for every visitor whose saved or system theme is dark — the control would
  announce the opposite of reality on load).
- **Easing token.** **Chosen:** `--ease-expo-out` inside the existing
  `@theme inline` block, carrying the reference's exact 16-stop `linear()`
  value. Tailwind 4's `--ease-*` namespace also makes it available as an
  `ease-expo-out` utility site-wide. `linear()` support (Chrome 113+,
  Firefox 112+, Safari 17.2+) is strictly wider than same-document view
  transitions (Chrome 111+, Firefox 133+, Safari 18+), so it adds no
  support constraint. **Discarded:** a one-line
  `cubic-bezier(0.16, 1, 0.3, 1)` approximation (shorter and readable, but
  the stated basis of this spec is fidelity to the reference), and a plain
  `:root` custom property outside the token system (generates no utility,
  sits outside the project's conventions).
- **Keyframe name.** **Chosen:** rename the reference's `@keyframes scale`
  to `theme-reveal-scale`. In the demo it lives in a page-local stylesheet;
  here it would be a **document-global** keyframe in `global.css`, and
  `scale` is both an extremely generic identifier and an actual CSS
  property name. **Discarded:** keeping `scale` verbatim — a name collision
  with any future global keyframe would fail silently and be miserable to
  debug. The rename is invisible in behavior.
- **CSS placement within `global.css`.** **Chosen:** top-level (unlayered),
  after the `@theme` block. Unlayered rules outrank anything in
  `@layer base`, which is correct for pseudo-elements that must not be
  accidentally overridden. **Discarded:** nesting inside the existing
  `@layer base` block (7-80), which would make them the lowest-priority
  rules in the file.

## Acceptance criteria

- [x] `src/styles/global.css`'s `@theme inline` block defines
      `--ease-expo-out` with the 16-stop `linear()` value, and the variable
      **resolves at runtime** — verified by reading
      `getComputedStyle(document.documentElement).getPropertyValue('--ease-expo-out')`
      in the browser and confirming it is non-empty.
- [x] `global.css` contains `::view-transition-group(root)`,
      `::view-transition-new(root)`, `::view-transition-old(root)`,
      `.dark::view-transition-new(root)` and
      `.dark::view-transition-old(root)` rules, plus
      `@keyframes theme-reveal-scale` — and **no** `@keyframes scale`.
- [x] Clicking either toggle in a browser that supports the API produces a
      blurred circular reveal from viewport center, in both directions
      (light→dark and dark→light).
- [x] With `(prefers-reduced-motion: reduce)` forced on (DevTools →
      Rendering → Emulate CSS media feature), toggling switches the theme
      **instantly** with no reveal, and `document.startViewTransition` is
      not invoked on that path.
- [x] Both toggle instances carry `aria-pressed` reflecting the actual
      theme **on page load** — confirmed for a visitor arriving with
      `localStorage.theme === "dark"` (i.e. `aria-pressed="true"` on both
      buttons before any interaction), and for a light-theme visitor.
- [x] Toggling from the desktop button updates `aria-pressed` on the mobile
      button too, and vice versa — the two never disagree.
- [x] The toggle is operable by keyboard (Tab to focus, Enter/Space to
      activate) and the visible focus ring is unchanged.
- [x] The button's hover scale is neutralized under
      `(prefers-reduced-motion: reduce)` via `motion-reduce:` variants.
- [x] The `themechange` event still fires on every toggle, and the GSAP
      word colors driven by `solutionsAnimation.js` are already correct
      **during** the reveal — not only after it finishes. Verified visually
      on the homepage solutions section.
- [x] Exactly one delegated click listener is registered despite two
      component instances (the `window.__themeToggleInit` guard still
      holds) — toggling once flips the theme once, not twice.
- [x] In a browser without `document.startViewTransition`, the theme still
      switches (instant, no error in the console).
- [x] `pnpm check` reports no errors beyond the baseline captured in
      step 1 — this change introduces no new type errors.
- [x] `pnpm build` passes.

## Implementation plan

1. **Capture the baseline.** Run `pnpm check` and record its current error
   count/output on this branch, so the "no new type errors" criterion is
   measured against reality rather than assumption.

2. **Add the easing token.** Insert `--ease-expo-out` into the existing
   `@theme inline` block in `src/styles/global.css` (82-100) with the
   reference's exact `linear()` curve:
   `linear(0 0%, 0.1684 2.66%, 0.3165 5.49%, 0.446 8.52%, 0.5581 11.78%,
0.6535 15.29%, 0.7341 19.11%, 0.8011 23.3%, 0.8557 27.93%,
0.8962 32.68%, 0.9283 38.01%, 0.9529 44.08%, 0.9711 51.14%,
0.9833 59.06%, 0.9915 68.74%, 1 100%)`.
   Then verify in the browser that the variable resolves (first acceptance
   criterion) — `@theme inline` changes how utilities reference tokens, so
   confirm rather than assume the custom property is emitted to `:root`.

3. **Add the view-transition CSS** as top-level rules after the `@theme`
   block: the `circle-with-blur` variant ported from the reference, with
   `@keyframes scale` renamed to `theme-reveal-scale` and
   `animation-timing-function: var(--ease-expo-out)` on
   `::view-transition-group(root)`.

4. **Add the reduced-motion CSS guard** — a
   `@media (prefers-reduced-motion: reduce)` block setting
   `animation: none !important` on
   `::view-transition-group(root)`, `::view-transition-old(root)` and
   `::view-transition-new(root)`.

5. **Update the button markup** in `ThemeToggle.astro`: add
   `aria-pressed="false"` as the static default, and add `motion-reduce:`
   variants neutralizing `hover:scale-110` / `transition-all duration-200`
   on line 9.

6. **Rework the `is:inline` script**, keeping the `window.__themeToggleInit`
   guard and the delegated listener:
   1. Extract a `switchTheme()` function that toggles the `dark` class on
      `documentElement`, writes `localStorage.theme`, syncs `aria-pressed`
      across **all** `.theme-toggle-btn` nodes, and dispatches
      `themechange` — in that order, synchronously.
   2. In the click handler, branch: if `document.startViewTransition` is
      missing **or** `(prefers-reduced-motion: reduce)` matches, call
      `switchTheme()` directly; otherwise call
      `document.startViewTransition(switchTheme)`.
   3. Add a `DOMContentLoaded` hook that sets `aria-pressed` on every
      `.theme-toggle-btn` from the current `documentElement.classList`
      state, so both instances are correct before first interaction.

7. **Verify in the browser** (`pnpm dev`): the reveal in both directions;
   the reduced-motion path with the media feature emulated; `aria-pressed`
   correct on load for both a dark-theme and a light-theme visitor and
   synced across both buttons after toggling; keyboard operation; the
   homepage solutions-section GSAP colors correct _during_ the reveal; and
   a single toggle per click.

8. **Run the gate.** `pnpm build` and `pnpm check`, compared against the
   step-1 baseline.

9. **Hand back for review.** Do not mark anything `done`, and do not commit
   or push without the repo owner asking in that turn. `spec-verifier` runs
   the acceptance criteria before a human flips this spec's status.
