# 28 — Cursor pencil trail

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Replace the yellow blurred blob that follows the mouse with a lock of fine
gold strands that chase the pointer on springs. The strands run together
near the pointer, drift apart on curves, and gather back into the pointer
when it stops. The same change removes the dead magnetic-hover code and adds
the `prefers-reduced-motion` branch that the cursor effect does not have
today. Every other animation on the site already has one.

## Scope

**In:**

- Rewrite `src/components/global/CursorFollower.astro` in place. The
  component name and its single mount point in `MainLayout.astro` (line 199)
  stay as they are.
- Markup: one `<canvas id="cursor-trail" aria-hidden="true">`, `position:
  fixed`, `inset: 0`, `pointer-events: none`, `z-index: 9999`. It covers the
  viewport, and its backing size is `innerWidth × innerHeight ×
  RENDER_SCALE`, with `RENDER_SCALE = Math.max(devicePixelRatio, 2)`, set
  again on `resize`. On density-1 screens the canvas renders at 2× so the
  thin tail strands antialias smoothly; drawing stays in CSS px through
  `setTransform(RENDER_SCALE, …)`.
- Trail behaviour (spring model, amendment 4; it replaces the time-based
  trail of amendments 1–3):
  - on `mousemove`, store the pointer position `{ x: clientX, y: clientY }`
    as the single target. No points array and no timestamps. On the first
    `mousemove` after init, every node of every strand is placed at the
    pointer, so no streak flies in from the corner;
  - `STRAND_COUNT = 5` strands, each a chain of `NODES_PER_STRAND = 10`
    nodes with position and velocity;
  - physics step, per strand (`s` = 0…4):
    - spring `k` starts at `SPRING_BASE + (s / STRAND_COUNT) ×
      SPRING_SPREAD`, with `SPRING_BASE = 0.4` and `SPRING_SPREAD = 0.025`;
    - node 0 accelerates towards the pointer: `v += (pointer − node) × k`;
    - node `j > 0` accelerates towards node `j−1` (`v += (prev − node) × k`)
      and also inherits `prev.v × DAMPENING` (`DAMPENING = 0.1`);
    - every node: `v ×= friction`, then `pos += v`. Friction is
      `FRICTION + s × FRICTION_STEP`, with `FRICTION = 0.5` and
      `FRICTION_STEP = 0.002`;
    - after each node, `k ×= TENSION` (`TENSION = 0.98`), so the chain
      loosens towards the tail;
    - the small per-strand differences in spring and friction are what make
      the strands drift apart on curves. They are deterministic (derived
      from `s`), with no `Math.random`;
  - fixed time step: the physics advances in fixed 1/60 s steps, driven by
    `gsap.ticker`'s elapsed time, with at most 4 steps per frame. The trail
    behaves the same on 60 Hz and 120 Hz screens and doesn't explode after
    a tab switch;
  - drawing: each strand is a single path. It starts at node 0 and runs as
    quadratic Bézier pieces through the midpoints of consecutive nodes
    (`quadraticCurveTo`, control = node `j`), ending at the last node.
    It is stroked once, with a constant width and alpha, so the strand has
    no segment boundaries that could crease;
  - stroke: colour read at init from the CSS token `--color-accentGold`
    (`getComputedStyle(document.documentElement)`), `LINE_WIDTH = 1.5`
    (CSS px), `lineCap` and `lineJoin` set to `"round"`;
  - theme-dependent opacity, read every frame from
    `document.documentElement.classList.contains("dark")`, so the theme
    toggle applies immediately:
    - dark: `globalAlpha = STRAND_ALPHA_DARK = 0.2` and
      `globalCompositeOperation = "lighter"`. Where strands overlap near
      the pointer their light adds up, and it fades as they drift apart;
    - light: `globalAlpha = STRAND_ALPHA_LIGHT = 0.45` and
      `globalCompositeOperation = "source-over"`, so the strands stay
      visible on the cream background;
    - the composite operation is reset to `"source-over"` before every
      `clearRect`;
  - idle: when every node of every strand is within `SETTLE_DISTANCE =
    0.5` px of the pointer and moving slower than `SETTLE_SPEED = 0.05`
    px per step, the ticker callback clears the canvas once and returns
    early on later frames. It does not redraw an idle canvas every frame.
    The next `mousemove` wakes it again;
- The native system cursor is unchanged: no `cursor: none`, no dot at the
  head of the line.
- Gating (inside `init`, before anything is created or listened to):
  - `(hover: none)` → return (touch devices, as today);
  - `gsap.matchMedia()` with `(prefers-reduced-motion: reduce)` → no trail:
    no ticker callback, no `mousemove` listener, canvas stays empty;
  - `(prefers-reduced-motion: no-preference)` → the trail runs. The
    matchMedia cleanup removes the ticker callback and the `mousemove` and
    `resize` listeners, so switching the OS setting at runtime turns the
    trail on and off cleanly.
- `init` runs exactly once per page load. A module-level guard prevents a
  second run if both the direct `init()` call and `astro:page-load` fire.
- Remove the blob: the `#blob` element, the `#cursor-follower` wrapper and
  its fade-in keyframes and styles, the `Power2` import, and the
  `pos`/`mouse`/`ratio` easing code.
- Remove the magnetic-hover code (`[data-cursor-hover]` /
  `[data-cursor-parallax]` listeners and `magneticElement`). No element in
  `src/` uses those attributes.

**Out:**

- Hiding or restyling the native cursor, or a custom cursor dot.
- A second colour per theme. Both themes use `--color-accentGold`; only
  the opacity and the composite operation change with the theme.
- Randomness of any kind (spring and friction differences derive from the
  strand index), and a persistent trail that doesn't gather back into the
  pointer.
- Copying the reference site's code. Amendment 4 takes its spring idea
  (see Decisions) and is implemented from this spec.
- Any hover or magnetic interaction on links or buttons.
- Touch and pen trails.
- Moving the component out of `global/` or renaming it.

## Files affected

- `src/components/global/CursorFollower.astro`: full rewrite (markup,
  script, styles).
- `src/layouts/MainLayout.astro`: no change. The `<CursorFollower />` import
  and mount stay. Listed only to confirm it is untouched.
- `AGENTS.md`: no change. Its component listing at line 172 names
  `CursorFollower` under `global/`, which stays true. No "If you change X →
  update Y" row covers the cursor effect, and none needs adding, because it
  is a self-contained visual effect with no data or SEO dependencies.

## Decisions made and discarded

- **Fading trail over a persistent stroke or a jittery hand-drawn
  stroke.** It reads as "pencil" without leaving marks on the page or adding
  visual noise. The other two options were discarded at the user's call.
- **Amendment 2026-11-11, after the first implementation passed
  verification:** the user asked for a thicker, shorter line with a tail
  like a three-strand lock of hair. Chosen: 3 px (was 2 px), 350 ms (was
  500 ms), and three strands that fan out and thin towards the tail.
  Discarded: a wavy braid (the strands crossing in phase-shifted sine
  waves) and three fixed parallel strands, which look less like hair. The
  user picked amending this spec over opening a new one because spec 28 was
  not yet committed or Implemented.
- **Amendment 2 (2026-11-12): smooth rendering.** The user reported the
  line looked pixelated, especially in curves and circles. A synthetic
  60 Hz circle confirmed three causes. First, every segment was its own
  translucent stroke with round caps, so the caps overlapped at each joint
  and painted darker, jagged beads. Second, straight chords between points
  10–15 px apart turned circles into polygons. Third, density-1 screens
  rendered the 0.5–1.5 px tail strands at 1×. Fixes chosen: quadratic
  midpoint smoothing, butt caps on interior pieces, and a 2× minimum render
  scale. Discarded: a single path per strand, which can't fade along its
  length, and Catmull-Rom splines, which need more code for no visible gain
  at this trail length.
- **Amendment 3 (2026-11-12): continuous fade and stable strands.** The
  user still saw creases ("pliegues"). A synthetic circle using integer
  pixel coordinates and an irregular event rate, as a real mouse produces,
  showed three causes. First, alpha and lineWidth were constant per
  Bézier piece, so long pieces (fast moves, skipped events) showed a
  visible step at every boundary. Second, normals were taken from raw
  neighbouring points 1–2 px apart on integer coordinates. They snapped
  between a few directions, and the side strands, offset up to 6 px,
  turned lumpy on slow moves. Third, the round-capped head piece ended with
  a hard edge. Fixes chosen: dense sampling of the centerline every 2 px
  with per-sub-segment alpha and width, normals from the smoothed curve's
  tangent, and a 2 px minimum distance between stored points. Discarded:
  smoothing raw points with an exponential filter, which adds visible lag
  behind the pointer, and filled ribbon polygons, which leave
  antialiasing seams where translucent quads meet.
- **Amendment 4 (2026-11-12): spring model.** The user pointed to
  belgradearbor.rs/en as the feel they want. Its cursor is a canvas with 10
  strands of 10 spring nodes each. Every strand is one quadratic path with
  a constant 1 px width, drawn in `hsla(34°, 35%, 48%, 0.2)` with additive
  blending. It has no time-based fade: the tail length follows the pointer
  speed, and the strands gather back into the pointer when it stops. The
  user chose to adopt that model with these choices: **5 strands**, a
  middle ground between the earlier three-strand lock and the reference's
  10; **1.5 px**; **per-theme opacity**, additive at 0.2 in dark and normal
  blending at 0.45 in light, because additive gold at 0.2 nearly
  disappears on the cream background; same gold token in both themes.
  Kept from the earlier spec: no randomness, reduced motion → no trail,
  idle stop, `RENDER_SCALE`, the `(hover: none)` gate. Added: a fixed
  60 Hz physics step, since the reference ties its physics to the frame
  rate. Removed: `TRAIL_LIFETIME`, `SPREAD_MAX`, `MIN_POINT_DISTANCE`,
  `SAMPLE_SPACING`, per-sample alpha and width, and the butt caps.
  Amendments 1–3 stay recorded above as history.
- **Replace the blob, don't stack it.** One cursor effect, and the blob's
  250 px blur is the opposite of a thin line.
- **Canvas 2D over SVG `<path>`.** Redrawing a short polyline on canvas each
  frame is cheaper than rewriting a path's `d` attribute and touches no DOM
  per point. It reuses `gsap.ticker`, which the component already uses.
- **`--color-accentGold` in both themes** (amendment 4: 1.5 px strands,
  opacity per theme). Keeps the brand gold
  of the current blob. A theme-aware colour was offered and not chosen.
- **Keep the native cursor, no head dot.** `cursor: pointer` on links stays
  intact and there is no accessibility risk. A dot or `cursor: none` were
  discarded.
- **Delete the magnetic-hover code instead of keeping it "for later".**
  Nothing in `src/` uses `data-cursor-hover` or `data-cursor-parallax`. Git
  history keeps it if it is ever wanted again.
- **Reduced motion → no trail at all**, in a `gsap.matchMedia()` branch, as
  in every other animation in the codebase (see AGENTS.md § Tech stack,
  GSAP).
- **Rewrite in place, keep the component name.** The mount point in
  `MainLayout.astro` does not change, so the diff stays in one file.

## Acceptance criteria

(Rewritten by amendment 4; the earlier lists are superseded.)

- [x] `pnpm build` succeeds.
- [x] `pnpm check` reports no new errors in
      `src/components/global/CursorFollower.astro`.
- [x] In `src/` (`grep -rn`), `data-cursor-hover`, `data-cursor-parallax`,
      `magneticElement` and `id="blob"` each return 0 matches.
- [x] Built HTML: `grep -l 'id="cursor-trail"' dist/index.html
      dist/nosotros/index.html` lists both files, and
      `grep -c 'id="blob"' dist/index.html` returns `0`.
- [x] `grep -c 'cursor: *none' src/components/global/CursorFollower.astro`
      returns `0`.
- [x] `src/components/global/CursorFollower.astro` contains
      `prefers-reduced-motion: reduce` inside a `gsap.matchMedia()` call,
      and `--color-accentGold`.
- [x] The component defines `STRAND_COUNT = 5`, `NODES_PER_STRAND = 10`,
      `LINE_WIDTH = 1.5`, `STRAND_ALPHA_DARK = 0.2` and
      `STRAND_ALPHA_LIGHT = 0.45`. It contains `"lighter"`,
      `classList.contains("dark")` and `quadraticCurveTo`, and the canvas
      backing size uses `Math.max(window.devicePixelRatio`… `, 2)` (or
      `RENDER_SCALE`).
- [x] The component contains no `Math.random`, `TRAIL_LIFETIME`,
      `SAMPLE_SPACING`, `MIN_POINT_DISTANCE` or `SPREAD_MAX`.
- [x] Live check (headed, density-1, light theme, default motion): during a
      synthetic circular gesture (integer coordinates, radius 80 px, one
      turn in ~900 ms), a zoom of the painted bounding box shows fine gold
      strands that run together near the pointer and drift apart on the
      curve. There are no creases, beads or facets.
- [x] Live check, dark theme (`.dark` on `<html>`): the same gesture shows
      the strands, brighter where they overlap near the pointer.
- [x] Live check: about 1.5 s after the last move, the canvas has 0 pixels
      with alpha > 0. The strands gathered back into the pointer and the
      idle clear ran.
- [x] Live check with the reduced-motion emulation on
      (`prefers-reduced-motion: reduce`): after the same mouse moves, the
      `#cursor-trail` canvas is fully transparent.
- [x] Live check: links in the navbar still show the native pointer cursor
      and stay clickable. The canvas does not intercept clicks
      (`pointer-events: none`).
- [x] No console errors on `/` during the live checks.

## Implementation plan

1. Rewrite `src/components/global/CursorFollower.astro`. Replace the markup
   with the single `<canvas id="cursor-trail" aria-hidden="true">`, and
   replace the `<style>` block with the fixed, full-viewport,
   `pointer-events: none`, `z-index: 9999` rules. Delete the blob,
   wrapper, keyframes and magnetic code.
2. In the same file's `<script>`: add the once-per-load guard and the
   `(hover: none)` early return, and resize the canvas to the viewport ×
   `devicePixelRatio` (and on `resize`).
3. Add `gsap.matchMedia()` with the reduced-motion and full-motion
   conditions. In the full-motion branch, register the `mousemove` points
   collector and the `gsap.ticker` draw loop (age-based pruning, per-segment
   alpha fade, accentGold round stroke, early return when idle). Return a cleanup that removes the ticker callback and both
   listeners.
4. Run `pnpm build` and the grep criteria against `src/` and `dist/`.
5. Run the live agent-browser checks on `pnpm preview`: the trail with
   default motion, no trail with reduced motion, and navbar links still
   clickable with the pointer cursor.
6. (Amendment) In the draw loop: set `TRAIL_LIFETIME = 350` and
   `LINE_WIDTH = 3`, compute a per-point unit normal, and stroke
   `STRAND_COUNT = 3` strands offset by `normal × k × SPREAD_MAX × ageRatio`
   (`SPREAD_MAX = 6`), each segment with alpha `1 - ageRatio` and lineWidth
   `LINE_WIDTH × (1 - ageRatio)` floored at 0.5 px. Keep the idle early
   return.
7. Re-run steps 4 and 5 and the new constants criterion.
8. (Amendment 2) Smooth rendering: set the canvas backing size with
   `RENDER_SCALE = Math.max(devicePixelRatio, 2)` (and the matching
   `setTransform`). Replace each strand's straight segments with
   quadratic Bézier pieces through the midpoints (control point = offset
   point `i`; first piece starts at the oldest point, last piece ends at
   the newest). Per-piece alpha and lineWidth come from the control
   point's age. Use `lineCap = "butt"` for every piece except the newest,
   which keeps `"round"`. Keep the idle early return.
9. Re-run steps 4, 5 and 7, plus the smoothing criteria (the grep and the
   synthetic-circle zoom).
10. (Amendment 3) Continuous rendering: only store a `mousemove` point when
    it is at least `MIN_POINT_DISTANCE = 2` px from the last stored one.
    Replace the per-piece drawing: evaluate the midpoint-quadratic
    centerline in code, sample it every `SAMPLE_SPACING = 2` px with an
    interpolated timestamp and a normal from the curve's own tangent, offset
    the samples per strand, and stroke straight sub-segments with alpha and
    lineWidth from the mean age of their two samples. Use `"butt"` caps
    except on the newest sub-segment (`"round"`). Remove the
    neighbour-point normals. Keep the idle early return and `RENDER_SCALE`.
11. Re-run steps 4, 5 and 7, plus the amendment 3 criteria (the grep, the
    irregular integer circle and the slow integer circle).
12. (Amendment 4) Spring model: replace the points array and the sampling
    pipeline with a single pointer target and `STRAND_COUNT = 5` strands of
    `NODES_PER_STRAND = 10` spring nodes (constants as in Scope). Step the
    physics at a fixed 1/60 s from `gsap.ticker` time (max 4 steps per
    frame). Draw each strand as one `quadraticCurveTo` path through the
    node midpoints at `LINE_WIDTH = 1.5`, with alpha and composite from the
    `.dark` class (0.2 + `"lighter"` in dark, 0.45 + `"source-over"` in
    light). Seed every node at the pointer on the first move, and stop
    redrawing once the strands settle. Keep `RENDER_SCALE`, the
    reduced-motion branch, the `(hover: none)` gate, the init guard and the
    cleanup. Remove the amendment 1–3 constants.
13. Run every criterion in the rewritten Acceptance criteria list: build,
    greps, light and dark synthetic-circle zooms, idle clear, reduced
    motion, navbar and console.
