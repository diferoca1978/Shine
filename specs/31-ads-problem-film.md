# 31 — Ads problem film

**Status:** Implemented <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Replace the still image in the problem section of `/servicios/publicidad-digital/`
with a 32.5 s looping motion-graphics film that acts out the pain points of that
service, as spec 30 did for `/servicios/diseno-web-estrategico/`.

## Scope

**In:**

- Pass the existing optional `video` prop of `ServiceProblemSection` from the
  publicidad digital page. `LoopVideo.astro` and `problemVideo.js` (spec 30)
  are reused unchanged.
- `src/assets/videos/dolor-publicidad.{mp4,webm}` and
  `src/assets/images/dolor-publicidad-poster.webp` (new).

**Out:**

- Any change to `LoopVideo.astro`, `problemVideo.js` or `ServiceProblemSection`.
- The ecommerce page.
- The heading, intro text and list of pain points: they stay as HTML.

## Files affected

- `src/pages/servicios/publicidad-digital.astro`: imports the assets and passes `video`.
- `src/assets/videos/dolor-publicidad.mp4`, `src/assets/videos/dolor-publicidad.webm`,
  `src/assets/images/dolor-publicidad-poster.webp` (new).

## Source of the content

- The five `hurts` of `publicidad-digital` in `src/config/services.ts`,
  grouped into three scenes: "Sin ventas" (pauta activa, solo clics que no
  compran), "Presupuesto a ciegas" (se agota sin saber en qué, llega a las
  personas equivocadas) and "Sin píxel, sin datos" (no sabes qué pasa después
  del clic, reportes sin respuestas).
- **No source; approved by the owner in conversation on 2026-11-26:** "Estás
  pagando por cada clic", "Inviertes en anuncios…", "Tu cliente nunca lo vio",
  "¿Y después del clic?", "¿Te suena?", "Esto tiene solución" and the labels
  inside the illustrations. No figure in the film is a claim: the spend
  ("Gastado hoy"), the click count and the report metrics are illustrative.

## Decisions made and discarded

- Same film system, palette and format as spec 30 (3:4, 1080×1440, dark and
  gold, synthesized score), so the three-scene grouping and the closing cards
  read as one series across the service pages.
- Three scenes instead of five, so each pain point keeps its time in 30 s.
- Source project: `motion-studio/dolor-publicidad/`.

## Acceptance criteria

- [x] The film plays muted only while the panel is at least half visible and
      pauses when it leaves; only the poster loads before that.
- [x] With `prefers-reduced-motion: reduce` it does not autoplay; the poster
      shows and the play button works.
- [x] The video reserves its 3:4 box (no layout shift).
- [x] `/servicios/diseno-web-estrategico/` and `/servicios/ecommerce/` build to
      the same problem section as on dev.
- [x] `pnpm build` ends with the same gate summary as a build of dev and
      `pnpm check` reports 0 errors.

## Implementation plan

1. Copy the delivered files from `motion-studio/dolor-publicidad/out/` and
   convert the poster to WebP.
2. Import them in the page and pass `video` to `ServiceProblemSection`.
