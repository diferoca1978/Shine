# 09 — google reviews mock data sync

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Sync `src/data/mockGoogleReviews.ts`'s mock testimonial data with the 5 real
reviews live on Shine Agencia's Google Business Profile, replacing stale/
invented entries with the actual reviewer text, while keeping Alejandro
Aguilar's testimonial as the one deliberately-preserved non-Google entry.

## Scope

**In:**

- Update the `mockGoogleReviews` array in `src/data/mockGoogleReviews.ts` to
  contain exactly 6 entries, in this order: Alejandro Aguilar (unchanged),
  Daniela Rodriguez (text replaced), Francisco Suarez (text replaced),
  Paulina Meza (new), Tatiana Silva (new), Alejandro Rico (new).
- Replace the `text` field of the existing "Daniela Rodriguez" and
  "Francisco Suarez" entries with the real Spanish review text pulled from
  Google Maps (original language, not Google's auto-translation).
- Add 3 new entries (Paulina Meza, Tatiana Silva, Alejandro Rico) with
  `rating: 5`, `tag: ["all"]`, no `profile_photo_url`.
- Set a fixed `datePublished` Unix timestamp (seconds) on the 5
  Google-sourced entries, approximated from Google's relative dates ("Hace
  un mes" → 2026-08-21, "Hace 2 meses" → 2026-07-21) against today
  (2026-09-21). Leave Alejandro Aguilar's `datePublished` untouched
  (`Date.now() / 1000`) — its data isn't touched by this spec.
- Remove the "Yohanna Ramirez", "Luis Pinilla", and "Angela P." entries —
  none appear on the real Google listing and the user didn't ask to keep
  them.
- Remove the now-unused `LogoZenith` import (its only consumer was the
  removed "Yohanna Ramirez" entry).

**Out:**

- Any change to `src/components/global/SocialProof.astro` or how it
  consumes `mockGoogleReviews` — filtering/slicing/rendering logic is
  untouched.
- Any change to the `GoogleReview` interface/shape.
- Any live Google Places/Business Profile API integration — the file stays
  mock data, per its own top comment ("Replace with real API call once
  Google Business is approved").
- Alejandro Aguilar's `text`, `rating`, `profile_photo_url`, `tag`, or
  `datePublished` — kept byte-for-byte as-is per explicit instruction.
- Adding reviews beyond the 5 currently live on Google — if more appear
  later, that's a follow-up edit, not part of this spec.
- Normalizing `author_name` to exactly match Google's raw display (e.g.
  all-caps "DANIELA RODRÍGUEZ RIVERA", or Alejandro Rico's
  "(Físico-Irat)" business-name suffix) — names are written in this file's
  existing plain-title-case convention instead.

## Files affected

Matches **no** row in AGENTS.md's "If you change X → update Y" table (no
dependency, config file, font slot, redirect, or folder-convention change).
`src/data/mockGoogleReviews.ts` isn't separately called out in AGENTS.md's
"Invariant vs Variable" table or Knobs map — it holds per-client content
like `src/config/*` does, but lives in `src/data/` instead; flagging this as
a minor documentation gap, not fixing it here.

- `src/data/mockGoogleReviews.ts` (modified — data only)

Read but **not** modified:

- `src/components/global/SocialProof.astro` (consumes the array; used to
  confirm rendering)

## Source of the content

The `text`, `rating`, `author_name`, and relative dates for the 5
Google-sourced entries come directly from Shine Agencia's live Google
Business Profile listing (Google Maps, place CID
`15817315332727328947` / hex ID `0xdb82647dcb8d50b3`), fetched via
`agent-browser` in this session on 2026-09-21, with the "Traducido por
Google" toggle off — i.e. the reviewers' original Spanish text, not
Google's English auto-translation. Exact text captured:

- **Paulina Meza** — 5★, "Hace un mes": "Nos atendió ROCIO y wowwww que
  excelente servicio, demasiado atenta y dispuesta en cada paso que
  dimos."
- **Daniela Rodríguez Rivera** — 5★, "Hace 2 meses": "Son un equipo muy
  humano, talentoso y disciplinado. Nos ayudaron a crear nuestras redes
  sociales en nuestra firma de abogados y tuvimos mucho éxito.
  Recomendados!"
- **Francisco Suarez** — 5★, "Hace 2 meses": "Excelentes Profesionales,
  trabajo de calidad, cumplidos y responsables."
- **Tatiana Silva** — 5★, "Hace un mes": "Muy amables y profesionales."
- **Alejandro Rico (Físico-Irat)** — 5★, "Hace 2 meses": "Trabajo
  profesional, dedicado y muy amables en su atención. Quedamos
  satisfechos con la entrega, a tiempo, cumpliendo la expectativa y con
  respuesta rápida de soporte pos entrega."

Alejandro Aguilar's entry is explicitly out of scope for sourcing — kept
as-is per user instruction, not re-verified against Google (it does not
currently appear among the 5 live reviews on the listing; this spec does
not investigate why).

## Decisions made and discarded

- **Final entry count & set.** **Chosen:** 6 entries (Aguilar + the 5 real
  Google reviews), dropping Yohanna Ramirez/Luis Pinilla/Angela P.
  **Discarded:** keeping all 9 (Aguilar + the 3 unmatched entries + 5 real
  reviews) — rejected as scope creep beyond "update the repeated comments"
  and "keep Aguilar."
- **`datePublished` handling.** **Chosen:** fixed, approximate Unix
  timestamps derived from Google's relative dates against today
  (2026-09-21), so the displayed date doesn't silently drift forward on
  every rebuild the way `Date.now() / 1000` does. **Discarded:** keeping
  `Date.now() / 1000` for the 5 new/updated entries — would show "today" as
  the review date indefinitely, less accurate than a fixed approximation.
- **Author name formatting.** **Chosen:** plain title case matching this
  file's existing convention ("Daniela Rodriguez", "Francisco Suarez",
  "Paulina Meza", "Tatiana Silva", "Alejandro Rico"), dropping Google's
  all-caps rendering and Alejandro Rico's "(Físico-Irat)" suffix.
  **Discarded:** verbatim Google formatting — inconsistent with the other
  entries, and the parenthetical business name reads oddly as a
  review-card byline.
- **`profile_photo_url`.** **Chosen:** omit it for all 3 new entries,
  matching the majority pattern (4 of the final 6 entries have no photo).
  **Discarded:** assigning a placeholder logo — no existing client logo
  naturally maps to these 3 individuals the way `LogoAguilar`/`LogoZenith`
  did for their respective law-firm reviewers.
- **`tag` values.** **Chosen:** `["all"]` for all 5 Google-sourced entries
  — none of the real review text names a specific service (SEO, redesign,
  ads, ecommerce). **Discarded:** inferring a tag from context (e.g.
  tagging Daniela's review "redes sociales" since it mentions social
  media) — `services.ts`'s 3 active services are Diseño Web, Google/
  Facebook Ads, and Ecommerce/Tienda Nube; "redes sociales" isn't one of
  them, so tagging it that way would misrepresent which service page the
  testimonial should filter into.
- **Text language.** **Chosen:** original Spanish text (translation
  toggled off), matching every other entry in the file and the site's
  `es-CO` locale. **Discarded:** Google's English auto-translation,
  initially pulled by mistake in this session — inconsistent with the rest
  of the file and the site's language.
- **`LogoZenith` import.** **Chosen:** remove it now that Yohanna Ramirez
  (its only consumer) is removed. **Discarded:** leaving it in "for
  later" — a dead import with no other reference in the file.

## Acceptance criteria

- [ ] `src/data/mockGoogleReviews.ts`'s `mockGoogleReviews` array has
      exactly 6 entries, in order: Alejandro Aguilar, Daniela Rodriguez,
      Francisco Suarez, Paulina Meza, Tatiana Silva, Alejandro Rico.
- [ ] Alejandro Aguilar's entry (`text`, `rating`, `datePublished`,
      `profile_photo_url`, `tag`) is byte-for-byte unchanged from the
      current file.
- [ ] Daniela Rodriguez's `text` reads exactly "Son un equipo muy humano,
      talentoso y disciplinado. Nos ayudaron a crear nuestras redes
      sociales en nuestra firma de abogados y tuvimos mucho éxito.
      Recomendados!"
- [ ] Francisco Suarez's `text` reads exactly "Excelentes Profesionales,
      trabajo de calidad, cumplidos y responsables."
- [ ] Paulina Meza, Tatiana Silva, and Alejandro Rico entries exist with
      the exact Spanish text captured in "Source of the content",
      `rating: 5`, `tag: ["all"]`, and no `profile_photo_url` key.
- [ ] "Yohanna Ramirez", "Luis Pinilla", and "Angela P." no longer appear
      anywhere in the file (`grep -c` returns 0 for each name).
- [ ] The `LogoZenith` import is removed from
      `src/data/mockGoogleReviews.ts`; the `LogoAguilar` import remains
      (still referenced by 2 entries).
- [ ] `pnpm check` reports no new errors versus the step-1 baseline.
- [ ] `pnpm build` passes.
- [ ] In `pnpm dev`, the homepage's `SocialProof` section renders all 6
      testimonials with correct names/text/5-star ratings, and any tag
      filter still works with no runtime error from the removed
      entries/import.

## Implementation plan

1. **Capture the baseline.** Run `pnpm check` and record its current error
   count/output on this branch.
2. **Edit `src/data/mockGoogleReviews.ts`.** Remove the `LogoZenith`
   import. Replace the array with the approved 6 entries: Alejandro
   Aguilar unchanged; Daniela Rodriguez and Francisco Suarez with updated
   `text` and a fixed `datePublished`; Paulina Meza, Tatiana Silva, and
   Alejandro Rico added with fixed `datePublished`, `rating: 5`,
   `tag: ["all"]`, no photo. Remove Yohanna Ramirez, Luis Pinilla, and
   Angela P. entirely.
3. **Verify against the build.** Run `pnpm build` and `pnpm check`,
   compare to the step-1 baseline.
4. **Verify in the browser.** In `pnpm dev`, open the homepage and
   confirm the `SocialProof` section renders all 6 testimonials
   correctly, with no console errors.
5. **Hand back for review.** Do not mark anything done, commit, or push
   without the repo owner asking in that turn. `spec-verifier` checks
   every acceptance criterion against the real build before a human flips
   this spec's status to `Approved`.
