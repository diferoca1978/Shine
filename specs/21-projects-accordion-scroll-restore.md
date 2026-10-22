# 21 — projects accordion scroll restore

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

On `/proyectos`, opening an industry group collapses the one that was open,
the page gets shorter and the scroll position is left where it was, so the
user ends up looking at cut-off content. Make the opened group's header
scroll to the top of the viewport so the user lands on what they opened.

## Scope

**In:**

- `src/utils/scripts/perPageAnimations/proyectos/projectsAccordionAnimation.js`:
  after a click on a `[data-industry-trigger]` that **opens** a group, on
  desktop scroll the two-column block that holds the sidebar and the project
  detail (`sidebar.parentElement`) to the top of the viewport, below the
  fixed navbar. In the mobile dialog the trigger itself goes to the top of
  the dialog.
- Both contexts where the accordion is used: the desktop sidebar (window
  scroll) and the mobile dialog (the sidebar itself is `fixed inset-0
overflow-y-auto`, so its own container scrolls, not the window).
- `prefers-reduced-motion: reduce` lands the scroll instantly.

**Out:**

- Closing a group by clicking its already-open header: no scroll, the
  user is already looking at that header.
- Clicking a project link inside a group (`[data-project-link]`), the
  `popstate` sync and `syncSidebar`: they don't go through the trigger
  click and keep their current behavior.
- The mobile category title (`projects-mobile-category-title`, light lane).
- Markup of `ProjectsAccordion.astro`, `ProjectDetail`, `ProjectsHero`,
  content, SEO and JSON-LD.
- Changing the single-open rule or animating the panels' open/close.

## Files affected

Matches **no** row of AGENTS.md's "If you change X → update Y" table; the
script is **Variable** per-page animation code under
`perPageAnimations/<page>/`, where AGENTS.md says animation logic lives.

- `src/utils/scripts/perPageAnimations/proyectos/projectsAccordionAnimation.js:56-86`
  (the `industryTrigger` click handler).

Read, not modified: `src/utils/scripts/lenis/lenisSmooth.js` (exports
`lenis`; its anchor handler uses `offset: -80` and a 1.2 s duration, 0 with
reduced motion), `src/components/section/perPage/ProjectsAccordion.astro`.

## Decisions made and discarded

- **Behavior.** **Chosen (repo owner, 2026-10-23):** scroll to the header of
  the group just opened. **Discarded:** keep the clicked header at the same
  relative position in the viewport; it avoids a jump but leaves the long
  Legal list (10 projects) collapsing above the user's eyes.
- **Desktop target (revised 2026-10-22, repo owner, after testing the first
  implementation).** **Chosen:** scroll the two-column block
  (`sidebar.parentElement`, the `flex max-w-7xl` wrapper in
  `proyectos/index.astro` and `[slug].astro`) to the top, so both the sidebar
  and the start of the project detail are visible. **Discarded:** scrolling
  the clicked header itself to the top; the header lands at the top, but the
  detail column sits at the same height and ends up cut off (image and title
  scrolled away), which is the very symptom this spec set out to fix. The
  mobile dialog keeps the trigger-at-top rule: there the detail is not shown
  beside it.
- **Only on open.** **Chosen:** scroll only when the click opens a group.
  **Discarded:** also on close; there the clicked header stays in view.
- **How to scroll on desktop.** **Chosen:** `lenis.scrollTo(trigger, {
offset: -80, duration })` from `lenisSmooth.js`, the same offset and
  reduced-motion rule as the site's anchor links. Calling `window.scrollTo`
  would fight Lenis's smoothing. Checked 2026-10-23: `MainLayout.astro:180`
  imports `lenisSmooth.js` on every page, which does the only `new Lenis`
  in `src/`, and `Footer.astro:229` and `blog/[slug].astro:188` already
  import `{ lenis }` from that same module. Importing it in the accordion
  script reuses the one instance (Vite bundles a single module copy), and
  there is no `ClientRouter`, so no re-instantiation. No `scrollIntoView`
  fallback is needed.
- **How to scroll in the mobile dialog.** **Chosen:** scroll the sidebar
  container (`#proyectos-sidebar`) so the trigger sits at its top, because
  `document.body.style.overflow = "hidden"` while the dialog is open and
  Lenis scrolls the window. **Discarded:** doing nothing in the dialog;
  the same cut-off happens there with the Legal list.
- **When to compute the position.** **Chosen:** after the panels are
  toggled (the `hidden` class changes synchronously in the same handler), so
  the target is measured on the collapsed layout. Measuring before
  collapsing would aim at a position that moves.
- **Reduced motion.** **Chosen:** duration 0 / `behavior: "auto"` when
  `(prefers-reduced-motion: reduce)` matches, per AGENTS.md. The script
  already lives in `gsap.matchMedia`-free code (plain DOM handlers), so this
  is a `matchMedia` check, not a new timeline.
- Related Engram notes: search `shine/proyectos-accordion-scroll-restore`
  (#1319) and `shine/proyectos-mobile-category-title` (#1318).

## Acceptance criteria

- [x] In `pnpm dev` on desktop width, with "Legal" open and the page
      scrolled so that "Ingeniería y construcción" is on screen, clicking its
      header collapses Legal and the two-column block (sidebar + project
      detail) ends up at the top of the viewport just below the navbar
      (about 80 px from the top): the detail's image and title are visible
      from their start and the opened group's projects are visible in the
      sidebar (checked by a human).
- [x] Same check at mobile width inside the open dialog: the opened group's
      header ends at the top of the dialog (checked by a human).
- [x] Clicking the header of the already-open group closes it and does not
      scroll the page.
- [x] Clicking a project link, using back/forward and loading
      `/proyectos/<slug>/` directly behave as before: no scroll is added
      (checked by a human).
- [x] With `prefers-reduced-motion: reduce` emulated, the scroll lands
      instantly with no animation.
- [x] `git diff` touches only
      `src/utils/scripts/perPageAnimations/proyectos/projectsAccordionAnimation.js`.
      No GSAP timeline is added; the script keeps its plain DOM handlers.
- [x] After `pnpm build`, the built bundle for the script contains the new
      `scrollTo` call (grep `dist/_astro/*.js`, never the source), and
      `dist/proyectos/index.html` is identical to a build taken right before
      the change once hashed asset filenames are normalised (the accordion
      script's hash necessarily changes with its content).
- [x] `pnpm build` passes with the gate reporting 0 errors and 0 warnings
      (the 28 ignored pages are the spec 15 canonicalisation exception),
      `pnpm exec check-seo --dist dist --report` matches the baseline
      captured in step 1 (`--report` always lists those 28 ignored pages as
      errors, so the baseline is 28 errors, 0 warnings, not 0), and
      `pnpm check` reports no errors beyond that baseline.
- [x] No AGENTS.md or CHECKPOINTS.md update is needed (no row of the
      "If you change X → update Y" table applies).

## Implementation plan

1. **Baseline.** `pnpm check` and `pnpm build` on `dev`; keep
   `dist/proyectos/index.html` and the `check-seo` final line.
2. **Scroller (already checked).** `lenis` is a module singleton imported by
   the layout, the footer and the blog post page; import it the same way
   (`import { lenis } from "@/utils/scripts/lenis/lenisSmooth.js"`). Confirm
   in the built bundle that the accordion script shares the chunk with the
   existing instance rather than duplicating `lenis` (one `new Lenis` in
   `dist/_astro/*.js`).
3. **Implement.** In the `industryTrigger` click handler, after the
   `setIndustryOpen` loop, if the click opened the group
   (`!alreadyOpen`): when `sidebar` has the `fixed` class (dialog), set the
   sidebar's `scrollTop` so the trigger is at its top; otherwise call
   `lenis.scrollTo(sidebar.parentElement, { offset: -80, duration })`, with
   `duration` 0 under reduced motion.
4. **Verify.** `pnpm build`, `pnpm check`, the `dist/` greps and the
   `check-seo` report; the human checks above in `pnpm dev`.
5. **Hand back for review.** Branch `feature/21-projects-accordion-scroll-restore`
   from `dev`, not from spec 20's branch. No `Approved`, `done`, commit or
   push without the owner asking in that turn; `spec-verifier` runs the
   criteria first.
