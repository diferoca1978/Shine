# 30 — Web design problem film

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Replace the still image in the problem section of
`/servicios/diseno-web-estrategico/` with a 30 s looping motion-graphics film
that acts out the three pain points of that service. The current image is
300×402 px and is shown at about 512 px wide.

## Scope

**In:**

- An optional film in the image panel of `ServiceProblemSection`, used only by
  the web design page.
- Muted autoplay while the panel is on screen, a play/pause button and a sound
  button. The film carries a synthesized score.

**Out:**

- The other two service pages. Without the new prop the section renders as
  it does today.
- The heading, the intro text and the list of pain points. They stay as HTML.
- Highlighting the list item that matches the film (see Decisions).

## Files affected

- `src/components/ui/LoopVideo.astro` (new): `<video>` with poster and the two
  controls.
- `src/utils/scripts/perPageAnimations/servicesAnimations/problemVideo.js` (new).
- `src/components/section/ourServices/ServiceProblemSection.astro`: optional
  `video` prop.
- `src/pages/servicios/diseno-web-estrategico.astro`: passes `video`.
- `src/assets/icons/`: sound-on and sound-off icons, if missing.
- `src/assets/videos/dolor-diseno-web.{mp4,webm}` and
  `src/assets/images/dolor-diseno-web-poster.webp` (new). There is no row for
  video assets in AGENTS.md; add one to the Knobs map in the same change.
- `src/utils/scripts/perPageAnimations/servicesAnimations/servicesProblemAnimation.js`:
  drop `clearProps: "all"` from the reduced-motion branch. Added during
  implementation: that call wipes the inline opacity GSAP just set, so the
  `opacity-0` classes win and the image panel (poster included), heading and
  list stay invisible under `prefers-reduced-motion: reduce` on all three
  service pages. Pre-existing on dev; without the fix the "poster shows"
  criterion cannot pass.

## Source of the content

- "Invisible", "Tu talento no llega a quien lo necesita", "Credibilidad
  comprometida", "Una mala primera impresión borra la confianza antes de que
  hablen contigo", "Frenos al crecimiento", "WordPress lento. Plugins que se
  rompen. Costos que no terminan.": shortened from `hurts` of
  `diseno-web-estrategico` in `src/config/services.ts`.
- **No source, needs the owner's approval with this spec:** "Alguien te está
  buscando", "Por fin entra un cliente…", "Quieres crecer…", "¿Te suena?",
  "Esto tiene solución" and the labels inside the illustrations. No figure in
  the film is a claim: the page number and "0 visitas" are illustrative.

## Decisions made and discarded

- **Pre-rendered video, not a live canvas.** The film draws many subframes per
  frame for motion blur; it is not meant to run in the visitor's browser.
- **One film for both themes.** It is a dark and gold card, with its own
  background. A light variant was discarded until someone asks for it.
- **Palette of `ServiceCard`:** smokyBlack, its grey border, accentGold, the
  artwork yellow, softBeige and softWhite. Greyscale turns to colour as on the
  home cards.
- **Muted by default.** Browsers block autoplay with sound.
- **Film and list not synchronized.** Possible later through `currentTime`.
- The earlier dolly-zoom corridor (`motion-studio/pain-points-corridor`) was an
  alternative for the same slot. Approving this spec discards it.

## Acceptance criteria

- [x] The film plays muted only while the panel is at least half visible, and
      pauses when it leaves. Nothing but the poster is downloaded before that.
- [x] With `prefers-reduced-motion: reduce` it does not autoplay: the poster
      shows and the play button works.
- [x] Play/pause and sound are real buttons with Spanish labels that follow the
      state, reachable by keyboard, with a visible focus ring.
- [x] The video reserves its 3:4 box, so it causes no layout shift.
- [x] `/servicios/ecommerce/` and `/servicios/publicidad-digital/` build to the
      same problem section as on dev.
- [x] No hardcoded colors, no inline styles, no arbitrary values.
- [x] `pnpm build` ends with the same gate summary as a build of dev and
      `pnpm check` reports 0 errors.

## Implementation plan

1. Copy the delivered files from `motion-studio/dolor-diseno-web/out/` and
   convert the poster to WebP.
2. Build `LoopVideo.astro` and `problemVideo.js`, following the pattern of
   `BeforeAfterVideo.astro` (`preload="none"`, data attributes).
3. Add the `video` prop to `ServiceProblemSection` and pass it from the page.
4. Update the Knobs map in AGENTS.md.
