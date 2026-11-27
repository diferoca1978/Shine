# 32 — Ecommerce problem film

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Replace the still image in the problem section of `/servicios/ecommerce/`
with a 32.5 s looping motion-graphics film that acts out the pain points of that
service, as specs 30 and 31 did for diseño web and publicidad digital.

## Scope

**In:**

- Pass the existing optional `video` prop of `ServiceProblemSection` from the
  ecommerce page. `LoopVideo.astro` and `problemVideo.js` (spec 30) are reused
  unchanged.
- `src/assets/videos/dolor-ecommerce.{mp4,webm}` and
  `src/assets/images/dolor-ecommerce-poster.webp` (new).

**Out:**

- Any change to `LoopVideo.astro`, `problemVideo.js` or `ServiceProblemSection`.
- The heading, intro text and list of pain points: they stay as HTML.

## Files affected

- `src/pages/servicios/ecommerce.astro`: imports the assets and passes `video`.
- `src/assets/videos/dolor-ecommerce.mp4`, `src/assets/videos/dolor-ecommerce.webm`,
  `src/assets/images/dolor-ecommerce-poster.webp` (new).

## Source of the content

- `problem` and the five `hurts` of `ecommerce` in `src/config/services.ts`,
  grouped into three scenes: "Depende de ti" (cada venta depende de que estés
  disponible; pierdes ventas fuera de horario), "Catálogo en desorden" (no hay
  forma de mostrar el catálogo completo) and "Cuenta ajena, sin datos"
  (Instagram o WhatsApp pueden cerrarte la cuenta; no tienes datos de tus
  compradores).
- **No source; pending owner approval:** "¿Sigues vendiendo por WhatsApp?",
  "Venta perdida", "Mandas fotos una por una…", "Tu cliente se cansó",
  "¿Y si mañana te bloquean?", "¿Te suena?", "Esto tiene solución" and the
  labels inside the illustrations. No figure in the film is a claim: the
  unread count, the clock, the followers and the buyer names are illustrative.
  No WhatsApp or Instagram logo is drawn; the names appear only as text.

## Decisions made and discarded

- Same film system, palette and format as specs 30 and 31 (3:4, 1080×1440,
  dark and gold, synthesized score), so the three service pages read as one series.
- Three scenes instead of five, so each pain point keeps its time.
- Source project: `motion-studio/dolor-ecommerce/`.

## Acceptance criteria

- [x] The film plays muted only while the panel is at least half visible and
      pauses when it leaves; only the poster loads before that.
- [x] With `prefers-reduced-motion: reduce` it does not autoplay; the poster
      shows and the play button works.
- [x] The video reserves its 3:4 box (no layout shift).
- [x] `pnpm build` ends with the same gate summary as a build of dev and
      `pnpm check` reports 0 errors.

## Implementation plan

1. Copy the delivered files from `motion-studio/dolor-ecommerce/out/` and
   convert the poster to WebP.
2. Import them in the page and pass `video` to `ServiceProblemSection`.
