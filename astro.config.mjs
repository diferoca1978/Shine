// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: "https://shineagencia.com",

  integrations: [sitemap()],

  fonts: [
    {
      name: "Playfair Display",
      cssVariable: "--font-playfair",
      provider: fontProviders.fontsource(),
    },
    {
      name: "Open Sans",
      cssVariable: "--font-openSans",
      provider: fontProviders.fontsource(),
    },
  ],

  adapter: netlify({
    devFeatures: {
      environmentVariables: true,
      images: true,
    },
  }),
});
