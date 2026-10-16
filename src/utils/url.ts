// Absolute URLs — the only place in src/ that reads astro.config.mjs.
// Build every absolute URL with siteUrl(); never hardcode the domain.
// A media field (an image or a video) may live on a CDN: build it with mediaUrl().
// The rules live in @shine/seo-core (createSiteUrl); see its README.

import { site, trailingSlash, base, build } from 'astro:config/client';
import { createSiteUrl } from '@shine/seo-core';

export const { siteUrl, mediaUrl } = createSiteUrl({ site, trailingSlash, base, build });
