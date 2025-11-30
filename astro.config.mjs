// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: /** @type {any} */ ([tailwindcss()])
  },

  site: 'https://shineagencia.com',

  image: {
    responsiveStyles: true,
  },

  integrations: [sitemap()],
  adapter: netlify(),

  env: {
    schema: {
      CONTENT_ISLAND_SECRET_TOKEN: envField.string({
        context: "server",
        access: "secret",
        optional: false,
        default: "INFORM_VALID_TOKEN",
      })
    }
  }
});