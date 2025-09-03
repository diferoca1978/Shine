// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  site: 'https://shineagencia.netlify.app/',

  image: {
    responsiveStyles: true,
  },

  integrations: [sitemap()],
  adapter: netlify()
});