# Shine Agency — Website

Marketing agency website built with **Astro 6**, deployed on **Netlify**. Features SSR, GSAP animations, smooth scrolling, a contact form backed by Resend, comprehensive SEO with JSON-LD schemas, and AI-crawler endpoints (`llms.txt`).

---

## Tech Stack

| Layer      | Technology                                       |
| ---------- | ------------------------------------------------ |
| Framework  | Astro 6 (SSR via `@astrojs/netlify`)             |
| Styling    | Tailwind CSS 4 (Vite plugin) + Typography plugin |
| Animations | GSAP 3 + Lenis smooth scroll                     |
| Email      | Resend (via Astro Actions)                       |
| 3D         | Three.js                                         |
| Carousel   | Swiper                                           |
| SEO        | astro-seo + custom JSON-LD schema generators     |
| Testing    | Playwright                                       |
| Deployment | Netlify                                          |

---

## Development Commands

```bash
npm install          # Install dependencies (lockfile: bun.lockb)
npm run dev          # Dev server → http://localhost:4321
npm run build        # Production build → ./dist/
npm run preview      # Preview production build locally
npm run astro ...    # Run Astro CLI commands
```

### Testing

```bash
npm run test:email              # Contact form E2E test (Chromium only)
npx playwright test             # Run all Playwright tests
npx playwright test --ui        # Interactive Playwright UI
```

---

## Environment Variables

Copy `.env.template` and fill in:

```
RESEND_API_KEY=   # Resend API key for contact form email delivery
EMAIL_CONTACT=    # Recipient address for contact form submissions
```

---

## Architecture

### Layout Hierarchy

Every page renders through a layout chain:

```
MainLayout.astro          ← SEO, navbar, footer, cursor follower, WhatsApp widget
├── ServiceLayout.astro   ← wraps MainLayout for service pages
├── BlogLayout.astro      ← wraps MainLayout for blog listing
└── PostLayout.astro      ← wraps MainLayout for individual blog posts
```

`MainLayout` delegates all SEO to `SEOHead.astro`, which handles the `astro-seo` component and JSON-LD script injection.

### Content Collections (`src/content.config.ts`)

Two collections, both using Astro's glob loader with Zod-validated frontmatter:

**`works`** — Portfolio projects (`src/content/works/*.md`):

- Fields: `title`, `slug`, `description`, `client`, `date`, `image`, `tags`, `url`

**`blog`** — Blog posts (`src/content/blog/*.md`):

- Fields: `title`, `slug`, `description`, `pubDate`, `modifiedDate`, `author`, `image`, `tags`, `draft`, `faqs`
- `draft: true` posts are excluded from production builds

### Services Data Model (`src/config/services.ts`)

Services are defined as a typed array. Each service entry includes:

- **Content**: `title`, `subtitle`, `problem`, `benefits`, `process` (steps), `techStack`
- **SEO**: `primaryKeyword`, `secondaryKeywords`, `seoDescription`, `slug`
- **AEO**: `faqs` array for Answer Engine Optimization (powers FAQ JSON-LD schema)
- **Media**: `image` (`ImageMetadata`)

To add a new service:

1. Add an entry to the `services` array in `src/config/services.ts`
2. Create the page at `src/pages/servicios/<slug>.astro` using `ServiceLayout`

### SEO Architecture (`src/config/seo.ts`)

Centralized SEO configuration with schema generators:

| Export                            | Purpose                                       |
| --------------------------------- | --------------------------------------------- |
| `COMPANY_INFO`                    | Company name, address, social URLs, contact   |
| `DEFAULT_SEO`                     | Base `astro-seo` props inherited by all pages |
| `generatePageSEO(opts)`           | Builds per-page Open Graph + meta tags        |
| `generateServiceSchema(service)`  | `Service` JSON-LD schema                      |
| `generateBlogPostSchema(post)`    | `BlogPosting` JSON-LD schema                  |
| `generateFAQSchema(faqs)`         | `FAQPage` JSON-LD schema                      |
| `generateHowToSchema(steps)`      | `HowTo` JSON-LD schema                        |
| `generateBreadcrumbSchema(items)` | `BreadcrumbList` JSON-LD schema               |

Organization and Website schemas are automatically included in every page via `MainLayout`.

### Contact Form (`src/actions/contact/getContact.ts`)

Uses Astro Actions (server-side):

- Input validated with Zod (error messages in Spanish)
- Sends branded HTML email via Resend API
- Environment variables: `RESEND_API_KEY`, `EMAIL_CONTACT`

### Animation System

Animations are split by scope and loaded via `<script>` tags in their respective components — no global bundle bloat.

**Global animations** (run on every page):

- `nabBarAltAnimation.js` — Navbar scroll behavior
- `globalHeroAnimation.js` — Hero section entrance (GSAP timeline, word splitting)
- `servicesDropdownAnimation.js` — Services nav dropdown
- `bgAnimation.js` — Background texture animation

**Per-page animations** (loaded only on their page):

**Smooth scrolling**: Lenis is initialized in `src/utils/scripts/lenis/lenisSmooth.js` and its CSS lives alongside it in `lenis/styles/lenis.css`.

### AI Crawler Support (LLMs.txt)

The site exposes structured plain-text endpoints for AI crawlers:

| Route                        | Content                 |
| ---------------------------- | ----------------------- |
| `/llms.txt`                  | Summary of the site     |
| `/llms-full.txt`             | Full site content       |
| `/llms/[slug].txt`           | Individual blog post    |
| `/llms/servicios/[slug].txt` | Individual service page |

---

## Deployment

- **Platform**: Netlify (adapter: `@astrojs/netlify`)
- **Domain**: shineagencia.com
- **Sitemap**: Auto-generated via `@astrojs/sitemap`
- **Build command**: `npm run build`
- **Publish directory**: `dist/`
