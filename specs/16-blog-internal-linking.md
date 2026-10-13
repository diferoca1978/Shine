# 16 — blog internal linking

**Status:** Approved <!-- Draft | Approved — only a human may change this to Approved -->

## Goal

Give the 5 blog posts contextual inbound links from the home, the service
pages and each other. Also give each post a link out to its service.
Today no page links to a specific post except `/blog/`. Each post's only
internal body links go to `/contacto/`. That orphaning is the documented
cause of `/blog/marketing-digital-para-abogados/` being crawled but not
indexed (review item IMPROVE-3,
`docs/diagnostico-blog-abogados-sin-indexar.md` actions 1, 2 and 5).

**Depends on spec 14** (`specs/14-breadcrumb-schema-alignment.md`), which
must be merged first. Both specs edit `src/pages/blog/[slug].astro` and
`src/pages/index.astro`. Spec 16 does **not** depend on spec 15, because
they share no file.

## Scope

**In:**

- **Post ↔ service relation.** The `blog` schema in
  `src/content.config.ts` gains an optional `services` array of service
  slugs.
  - An unknown slug fails `pnpm build`.
  - The allowed list can't drift from `src/config/services.ts`. Either
    derive it from there, or, if importing `services.ts` into the content
    config breaks the build (it imports images), check it at build time
    against `services.ts`.
  - The posts' frontmatter carries:

    | Post                              | `services`                                         |
    | --------------------------------- | -------------------------------------------------- |
    | `astro-vs-wordpress-web-estatica` | `["diseno-web-estrategico"]`                       |
    | `ventajas-astro-framework-2026`   | `["diseno-web-estrategico"]`                       |
    | `seguridad-web-astro-framework`   | `["diseno-web-estrategico"]`                       |
    | `marketing-digital-para-abogados` | `["diseno-web-estrategico", "publicidad-digital"]` |
    | `marca-personal-ai`               | omitted (its service was discontinued)             |

- **Extend the existing `src/utils/posts.ts`.** It already exports
  `getAllPosts()` (drafts excluded, newest `pubDate` first), which
  `llms.txt.ts`, `llms-full.txt.ts` and `llms/[slug].txt.ts` use.
  `getAllPosts()` stays unchanged. The new helpers build on it, so every
  helper excludes `draft: true`.
  - **Recent posts:** the N most recent by `pubDate`.
  - **Posts for a service:** posts whose `services` includes the slug,
    most recent first, at most 3.
  - **Related posts:** the other posts, ordered by the number of shared
    `tags` (compared case-insensitively). Ties go to the most recent
    `pubDate`. It returns exactly 3, padding with the most recent posts
    when fewer share a tag.
- **New `src/components/section/RelatedPosts.astro`.** It sits flat in
  `section/`, next to `FAQ.astro`, which is also shared by the home and
  the services.
  - Props: a heading, the posts, and an optional "view all" link.
  - It renders a `<section>` with an `<h2>` and one compact card per
    post. Each card's `<h3>` holds the post title as the link to
    `/blog/<slug>/`, followed by the post `description`.
  - It renders nothing when the list is empty.
  - No image, no animation, `global.css` tokens only, no arbitrary
    values. Built through the `front-end-astro` skill.
- **Home** (`src/pages/index.astro`): `RelatedPosts` with the H2 `Del
blog`, the 3 most recent posts, and the link `Ver todos los artículos
→` to `/blog/`. It goes between `<LatestProjects2 />` and `<FAQ>`.
- **Service pages:** `diseno-web-estrategico.astro`,
  `publicidad-digital.astro` and `ecommerce.astro` under
  `src/pages/servicios/`.
  - Each gets `RelatedPosts` with the H2 `Lecturas recomendadas` and that
    service's posts, between `<SocialProof>` and `<FAQ>`.
  - Ecommerce has no mapped post today, so it renders nothing until a
    post maps to it.
- **Posts** (`src/pages/blog/[slug].astro`). After the closing
  `</article>`, in this order:
  - **A "Servicio relacionado" block.** An `<aside>` with that visible
    label, holding one link per entry in the post's `services`. The link
    text is `service.title` and the href is `/servicios/<slug>/`. It
    isn't rendered when `services` is absent.
  - **`RelatedPosts`** with the H2 `Artículos relacionados` and the 3
    related posts.
- **In-body links in `marketing-digital-para-abogados.md`** (action 2).
  These link words already in the text, with no wording change:
  - `:55` `un sitio web técnicamente optimizado` →
    `/servicios/diseno-web-estrategico/`;
  - `:75` `las métricas de Core Web Vitals` →
    `/blog/ventajas-astro-framework-2026/`;
  - `:128` `publicidad pagada` → `/servicios/publicidad-digital/`.
- **`AGENTS.md`.**
  - In the "Content collections" bullet (§ Tech stack): name the `blog`
    schema's `services` field.
  - In § Config, next to "To add or change a service": when publishing a
    post, set `services` (it decides which service pages list the post
    and which service it links to) and `tags` (related posts are chosen
    by shared tags).

**Out:**

- In-body links in the other 4 posts. The related-posts section already
  links them to each other.
- The Aguilar case → `/proyectos/` link, and diagnosis action 6
  (verifiable proof and dated metrics for the Aguilar case).
- Diagnosis action 3 (sourcing the 4 statistics) and action 7 (a
  "Marketing jurídico" hub). Action 4 belonged to spec 12.
- Links from `/proyectos` to the blog.
- `BlogCard.astro` and the `/blog/` listing (`src/pages/blog/index.astro`,
  `BlogLayout.astro`).
- A tags route or tag hub pages.
- Normalizing the existing `tags` values (case, duplicates).
- `modifiedDate` of the abogados post. See Decisions.
- Any JSON-LD change. The new sections are plain links.

## Files affected

- `src/content.config.ts`: the `blog` schema's `services`.
- `src/content/blog/`: `astro-vs-wordpress-web-estatica.md`,
  `ventajas-astro-framework-2026.md`, `seguridad-web-astro-framework.md`
  and `marketing-digital-para-abogados.md` (frontmatter, plus the 3 body
  links in the last one).
- `src/utils/posts.ts`: new helpers beside the existing `getAllPosts()`.
- New: `src/components/section/RelatedPosts.astro`.
- `src/pages/index.astro`.
- `src/pages/servicios/diseno-web-estrategico.astro`,
  `publicidad-digital.astro` and `ecommerce.astro`.
- `src/pages/blog/[slug].astro`.
- `AGENTS.md`: the "Content collections" bullet and § Config.

The new helpers and component are **Invariant** structure that follows
existing conventions: helpers in the existing `utils/posts.ts`, and `section/`
beside `FAQ.astro`. The post frontmatter and the section headings are
**Variable** content (Knobs map row "Pages").

This change matches **no row** in "If you change X → update Y". There is
no dependency, folder-convention or config-file change. The collection
schema gap noted in spec 08 still has no row. The contract is still
updated in the same change, because a post's `services` field is a new
authoring rule.

## Source of the content

- **The `services` mapping, the related-posts rule, the 3 anchors and the
  section copy** (`Del blog`, `Ver todos los artículos →`, `Lecturas
recomendadas`, `Artículos relacionados`, `Servicio relacionado`) were
  all approved by the repo owner in this spec's Phase 2 (2026-10-12).
- **Card text** is each post's existing `title` and `description`. The
  service link text is `service.title` from `src/config/services.ts`.
- **The anchors** reuse existing sentences at
  `marketing-digital-para-abogados.md:55`, `:75` and `:128`. No word is
  added or changed.
- **The diagnosis:** `docs/diagnostico-blog-abogados-sin-indexar.md`,
  § "Causa 1" and § "Plan de corrección" (actions 1, 2, 5).

Policy basis: `~/helpers-proyects/seo-schema-org-buenas-practicas-2026.md`:

- § 10.1: Google discovers pages mainly through links;
- § 10.5: use descriptive anchor text.

## Decisions made and discarded

The routing context is the 2026-10-12 review, item IMPROVE-3. Engram #889
routed actions 1, 2 and 5 here and action 4 to spec 12. Spec 16's
decisions are saved under the topic `shine/spec-16-blog-internal-linking`.

- **Picked: full lane.** The diagnosis itself routes action 5 (a
  related-posts template) to the full lane. Actions 1 and 2 need
  placement and anchor decisions that the diagnosis doesn't make.
- **Picked: a `services` field in post frontmatter, validated against
  `services.ts`.** An author tags a new post once, and it appears on its
  service page by itself.
  - **Discarded: a `relatedPosts` list in `services.ts`.** Every new post
    would mean editing service config.
  - **Discarded: inferring from `tags`.** The tags are inconsistent.
- **Picked: abogados maps to diseño web and publicidad digital; marca
  personal maps to nothing.** Its "Estrategia de Marca Personal" service
  was discontinued in May 2026 (`public/_redirects`). Ecommerce has no
  post, so its section stays empty instead of showing unrelated links.
- **Picked: related posts by shared tags, ties by recency, always 3.**
  With today's tags every post gets at least one link from another post.
  Abogados ↔ marca personal connect through "Marketing Digital".
  - **Discarded: same service first.** Marca personal has no service, so
    no post would link to it.
- **Picked: the home shows the 3 most recent posts.** It maintains itself
  and includes the abogados post today. When the abogados post ages out,
  it keeps its service-page, related-post and in-body links.
  - **Discarded: a pinned `featured` post.** It would be one more field to
    maintain.
- **Picked: a new compact `RelatedPosts` section, text only, with an `h3`
  card title.**
  - **Discarded: reusing `BlogCard`.** Its `<h2>` title would break the
    outline under the section's own H2. Its `priority` image would add 3
    eagerly loaded images per page. Fixing either means touching the
    `/blog` listing.
- **Picked: a "Servicio relacionado" block after each post.** It reuses
  the same `services` field at almost no cost, and closes the cluster
  toward the pages that sell.
- **Picked: three in-body anchors in the abogados post that reuse
  existing words.** This adds links without writing new client-facing
  copy. The `publicidad pagada` anchor stays even though its sentence
  says paid ads aren't needed at first: the service page is the natural
  next step for a reader who does want them.
- **Picked: don't bump `modifiedDate` of the abogados post.** Three added
  links aren't a substantive content change. Bumping the date would
  claim a freshness the text doesn't have.
- **Picked: the post sections go after `</article>`.** Related links
  aren't part of the article. This also keeps the diagnosis's "links
  inside `<article>`" measure about the body.
- **Picked: sections before the FAQ.** The page's final CTA stays last.
  - **Discarded: just before the final CTA.** The sections would compete
    with the contact CTA.
- **Picked: no GSAP reveal on the new sections.** They are plain link
  lists, so static markup avoids a new animation file.

## Acceptance criteria

All `dist/` checks run after a fresh `pnpm build`.

- [x] Setting `services: ["seo"]` on any post makes `pnpm build` fail.
      Revert after checking.
- [x] `dist/index.html` has an `<h2>` `Del blog` placed after the `Ver
los` projects link and before the FAQ heading. Under it are links
      to `/blog/astro-vs-wordpress-web-estatica/`,
      `/blog/marketing-digital-para-abogados/` and
      `/blog/seguridad-web-astro-framework/`, in that order, plus a link
      to `/blog/` with the text `Ver todos los artículos →`.
- [x] `dist/servicios/diseno-web-estrategico/index.html` has the `<h2>`
      `Lecturas recomendadas` with links to `astro-vs-wordpress-web-estatica`,
      `marketing-digital-para-abogados` and `seguridad-web-astro-framework`,
      in that order. `dist/servicios/publicidad-digital/index.html` has
      it with only `marketing-digital-para-abogados`.
      `dist/servicios/ecommerce/index.html` doesn't contain `Lecturas
recomendadas`.
- [x] Each post's `Artículos relacionados` section links exactly these 3
      posts, in this order:

      | Post                              | Related, in order                                                                       |
      | --------------------------------- | --------------------------------------------------------------------------------------- |
      | `astro-vs-wordpress-web-estatica` | `seguridad-web-astro-framework`, `ventajas-astro-framework-2026`, `marketing-digital-para-abogados` |
      | `ventajas-astro-framework-2026`   | `astro-vs-wordpress-web-estatica`, `seguridad-web-astro-framework`, `marketing-digital-para-abogados` |
      | `seguridad-web-astro-framework`   | `astro-vs-wordpress-web-estatica`, `ventajas-astro-framework-2026`, `marketing-digital-para-abogados` |
      | `marketing-digital-para-abogados` | `marca-personal-ai`, `astro-vs-wordpress-web-estatica`, `seguridad-web-astro-framework` |
      | `marca-personal-ai`               | `marketing-digital-para-abogados`, `astro-vs-wordpress-web-estatica`, `seguridad-web-astro-framework` |

- [x] The "Servicio relacionado" block:
  - each of the 3 Astro posts links only to
    `/servicios/diseno-web-estrategico/`, with the text `Diseño Web con
Astro framework`;
  - the abogados post links to that page and to
    `/servicios/publicidad-digital/` (`Google Ads y Facebook Ads`);
  - `dist/blog/marca-personal-ai/index.html` doesn't contain `Servicio
relacionado`.
- [x] In `dist/blog/marketing-digital-para-abogados/index.html`, the
      `<article>` contains exactly these three anchors:
      `href="/servicios/diseno-web-estrategico/">un sitio web técnicamente
optimizado</a>`, `href="/blog/ventajas-astro-framework-2026/">las
métricas de Core Web Vitals</a>` and
      `href="/servicios/publicidad-digital/">publicidad pagada</a>`.
- [x] `grep -rl "marketing-digital-para-abogados" dist/servicios/
dist/index.html` returns 3 files.
- [x] Each of the 5 post slugs appears in an `href` in at least one
      `dist/**/*.html` file other than `dist/blog/index.html` and the
      post's own page.
- [x] `RelatedPosts.astro` contains no `[` arbitrary-value class, no
      hardcoded color, no `<Image` or `<img`. Its card titles are `<h3>`.
- [x] No changed page gains an `<h1>`. `dist/index.html`,
      `dist/servicios/diseno-web-estrategico/index.html` and the 5 posts
      each have exactly one. `dist/servicios/publicidad-digital/index.html`
      and `dist/servicios/ecommerce/index.html` keep their `dev` baseline of
      two.
      _Amended 2026-10-13 during step 6, by the repo owner's decision:_ the
      second `<h1>` on those two pages predates this spec. It comes from
      `src/components/section/ourServices/ServicesStepsProcessAlt.astro:28`,
      which is outside this spec's files. Its fix is tracked as the light-lane
      entry `fix-double-h1-service-pages` in `feature_list.json` (from the
      2026-10-12 review, finding M14; on branch
      `feature/seo-review-light-lane` until that branch merges).
- [x] `git diff dev -- src/utils/posts.ts` removes no line, so
      `getAllPosts()` is unchanged. `dist/llms.txt` is byte-identical to
      the step-1 baseline copy.
- [x] `git diff --name-only dev` lists neither
      `src/components/ui/BlogCard.astro` nor
      `src/pages/blog/index.astro`. The abogados post's `modifiedDate` is
      still `2026-05-14`.
- [x] `AGENTS.md` names the `services` field and the shared-tags rule.
- [x] Manual check at 360 px and 1280 px, light and dark:
  - the sections are readable, with no horizontal scroll;
  - every link is reachable with the keyboard and shows a focus ring.
- [x] `pnpm build` passes. `pnpm check` reports no errors beyond the `dev`
      baseline.

## Implementation plan

1. Baseline, with no code change, on `dev` with spec 14 merged: build,
   record the `pnpm check` error list, and keep a copy of `dist/llms.txt`.
2. `src/content.config.ts`: add the optional, validated `services` field.
   In the same step, add `services` to the 4 mapped posts' frontmatter.
   Run the negative check, then revert it.
3. `src/utils/posts.ts`: add the recent, per-service and related helpers
   beside `getAllPosts()`, which stays unchanged.
   Nothing uses them yet.
4. `src/components/section/RelatedPosts.astro` via `front-end-astro`.
   Nothing uses it yet.
5. `src/pages/index.astro`: `Del blog` between `<LatestProjects2 />` and
   `<FAQ>`.
6. The 3 service pages: `Lecturas recomendadas` between `<SocialProof>`
   and `<FAQ>`.
7. `src/pages/blog/[slug].astro`: the "Servicio relacionado" aside, then
   `Artículos relacionados`, both after `</article>`.
8. `marketing-digital-para-abogados.md`: the 3 in-body links, wrapping the
   existing words only.
9. `AGENTS.md`: the "Content collections" bullet and § Config.
10. Hand off to `spec-verifier`. The visual and keyboard check is left to a human.
