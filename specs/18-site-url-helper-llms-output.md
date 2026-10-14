# 18 — site URL helper for llms output

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Use the shared `siteUrl()` helper from spec 17 to build absolute URLs in Shine's LLM-readable text outputs. Page links must use the site's canonical trailing-slash form while `.txt` endpoints remain file URLs without an added slash.

**Depends on spec 17** (`specs/17-site-url-helper-seo.md`), which must land first so this spec can consume the shared helper and Astro-derived site origin.

## Scope

**In:**

- Use `siteUrl()` in `src/utils/llms.ts` for absolute URLs in `llms.txt`, `llms-full.txt`, individual post endpoints, and service endpoints.
- Normalize page URLs such as `/blog/<slug>`, `/servicios/<slug>`, `/nosotros/`, and `/contacto/` to the final-slash form.
- Keep file endpoints such as `/llms/<slug>.txt` and `/llms/servicios/<slug>.txt` without a trailing slash.
- Set `SITE_CONFIG.url` in `src/config/site.ts` to the root URL from `siteUrl("/")`, and render the `Site:` value in `llms-full.txt` from it.
- Remove the obsolete `site` argument from LLM generators that no longer need it, and update their route callers. Keep the `site` value for `llms-full.txt`'s `Site:` header.
- Update `AGENTS.md`'s AI-crawler endpoint guidance to state that `src/utils/llms.ts` uses `siteUrl()` and preserves `.txt` file paths.

**Out:**

- Changing the URL helper or SEO metadata/JSON-LD behavior; those belong to spec 17.
- Changing the route paths or filenames that serve `/llms.txt`, `/llms-full.txt`, `/llms/[slug].txt`, and `/llms/servicios/[slug].txt`.
- Changing LLM output wording, post order, service data, or the content emitted from blog posts.
- Changing visible page links, sitemap entries, redirect rules, or `trailingSlash` configuration.
- Rewriting external URLs, images, or JSON-LD identifiers.

## Files affected

- `src/utils/llms.ts` — builds absolute text-output URLs through `siteUrl()` instead of concatenating `site + link`.
- `src/config/site.ts` — derives `SITE_CONFIG.url` from `siteUrl("/")`.
- `src/pages/llms.txt.ts` — stops passing a redundant site origin to `llmsTxt()`.
- `src/pages/llms/[slug].txt.ts` — stops passing a redundant site origin to `llmsPost()`.
- `src/pages/llms/servicios/[slug].txt.ts` — stops passing a redundant site origin to `llmsService()`.
- `AGENTS.md` — documents the URL rules for the generic LLM endpoint helper.

These files follow the existing LLM endpoint architecture in `src/pages/` and `src/utils/`. No row in `AGENTS.md`'s “If you change X → update Y” table applies; the AI-crawler endpoint guidance is updated in this spec so it describes the URL-generation contract.

## Decisions made and discarded

The repo owner confirmed the split and `.txt` file behavior on 2026-10-13.

- **Normalize URLs in the shared `src/utils/llms.ts` generator.** All four route handlers continue supplying content and relative paths, and the generic generator owns absolute URL construction. Discarded: hand-building URLs in each route file, which would duplicate policy.
- **Distinguish page paths from file paths.** Page paths receive a final slash; `.txt` endpoints keep their file suffix with no trailing slash. Discarded: appending a slash to every path, which would point crawlers at different file URLs.
- **Use the same configured Astro origin as spec 17.** Discarded: retaining string concatenation from `SITE_CONFIG.url`, which would leave a second URL-building path outside the shared helper.
- **Change URL formatting only.** The generated titles, descriptions, post order, service content, and body text remain unchanged. Discarded: using this URL migration to revise LLM content.

## Acceptance criteria

- [x] `dist/llms.txt` contains absolute same-origin links for all listed post and service `.txt` endpoints; every such link ends in `.txt` with no added slash.
- [x] The About and Contact links in `dist/llms.txt` use `https://shineagencia.com/nosotros/` and `https://shineagencia.com/contacto/`.
- [x] `dist/llms-full.txt` has `Site: https://shineagencia.com/` and every post `URL:` line uses `https://shineagencia.com/blog/<slug>/`.
- [x] Every built individual post text endpoint has a `URL:` line ending in `/blog/<slug>/`.
- [x] Every built service text endpoint has a `URL:` line ending in `/servicios/<slug>/`.
- [x] No generated absolute URL contains an accidental doubled path slash after the scheme and host.
- [x] The LLM outputs' non-URL text and item ordering match the baseline.
- [x] `pnpm verify` passes, and `AGENTS.md` documents the shared URL behavior for LLM outputs.

## Implementation plan

1. After spec 17 is merged, build the site and record the current contents and URL lines of `dist/llms.txt`, `dist/llms-full.txt`, each individual post text endpoint, and each service text endpoint.
2. Update `src/utils/llms.ts` so page and file links use `siteUrl()` rather than `site + link` concatenation. Remove the redundant `site` argument from `llmsTxt()`, `llmsPost()`, and `llmsService()`, plus their route callers; keep the full-text endpoint's `site` value for its `Site:` header. This step leaves the current origin in that header and all generated links valid.
3. Update `src/config/site.ts` so `SITE_CONFIG.url` is `siteUrl("/")`; the full-text `Site:` header now uses the slash-normalized root.
4. Update the AI-crawler endpoint guidance in `AGENTS.md` and check each acceptance criterion against a fresh build.
5. Hand off to `spec-verifier`.
