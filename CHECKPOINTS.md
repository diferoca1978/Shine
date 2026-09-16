# CHECKPOINTS — pre-production checklist

This site is already **live in production** at `shineagencia.com`, so most
items below are already satisfied. Use this checklist to catch **drift** —
e.g. after a domain, DNS, or email-provider change — not as a first-time
setup guide.

## 1. Real domain set in the project

- [x] `astro.config.mjs` → `site:` is `https://shineagencia.com`.
- [x] `src/config/seo.ts` → `COMPANY_INFO.url` is `https://shineagencia.com`.
- [x] The two values above are **identical** — no drift between
      `astro.config.mjs` and `COMPANY_INFO.url`.

Re-check this box pair any time either file is touched — they must stay
identical.

## 2. Domain configured on Netlify

- [ ] Custom domain (`shineagencia.com`) added in Netlify site settings —
      confirm in the Netlify dashboard, not from the repo.
- [ ] DNS records point to Netlify and have propagated.
- [ ] HTTPS/SSL certificate is issued and active.

## 3. Resend configured on the project

- [x] Resend is integrated: `resend` dependency installed, contact form wired
      through `src/actions/contact/getContact.ts` (Astro Action).
- [ ] `RESEND_API_KEY` and `EMAIL_CONTACT` are set as Netlify environment
      variables (never committed to the repo) — confirm in the Netlify
      dashboard.

## 4. Resend domain verified with DNS

- [ ] `shineagencia.com` is added as a sending domain in the Resend
      dashboard and shows **verified** (not "pending").
- [ ] SPF, DKIM, and DMARC (if provided) records are set at the domain's DNS
      provider.
- [ ] A test email sends successfully from the live contact form.

## 5. Animation accessibility (GSAP)

- [ ] Every new GSAP `ScrollTrigger`/timeline added is wrapped in
      `gsap.matchMedia()` with a `(prefers-reduced-motion: reduce)` branch
      that leaves content in its final, visible state (`autoAlpha: 1`) — see
      `AGENTS.md` § "Animation strategy" for the canonical example already in
      this repo.
