// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import netlify from "@astrojs/netlify";

import partytown from "@astrojs/partytown";

import webmcp from "astro-webmcp";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: "https://shineagencia.com",

  integrations: [
    sitemap({
      filter: (page) =>
        ![
          "https://shineagencia.com/politicadeprivacidad/",
          "https://shineagencia.com/terminosycondiciones/",
          "https://shineagencia.com/404/",
        ].includes(page),
    }),
    partytown(),
    // Exposes site content to in-browser AI agents via WebMCP (Chrome proposal).
    // Complements /llms.txt — that one serves server-side LLM crawlers, this one
    // lets browser-resident agents (document.modelContext) search and navigate.
    // Generates /_webmcp/manifest.json + /.well-known/skills/index.json at build.
    webmcp({
      // Only public content collections — keeps 404/legal pages out of the manifest
      collections: ["blog", "servicios", "nosotros", "contacto"],
      security: {
        maxOutputLength: 1500,
        sanitizeOutputs: true,
      },
    }),
  ],

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
