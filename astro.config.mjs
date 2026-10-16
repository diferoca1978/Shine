// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";

import shineSeo from "@shine/seo-core/integration";

import netlify from "@astrojs/netlify";

import partytown from "@astrojs/partytown";

import webmcp from "astro-webmcp";

const projectContentDirectory = fileURLToPath(
  new URL("./src/content/works/", import.meta.url),
);

/** @param {string} directory @returns {string[]} */
function getMarkdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);

    if (entry.isDirectory()) return getMarkdownFiles(entryPath);
    return entry.isFile() && entry.name.endsWith(".md") ? [entryPath] : [];
  });
}

const projectSlugs = getMarkdownFiles(projectContentDirectory)
  .sort()
  .map((filePath) => {
    const fileContent = readFileSync(filePath, "utf8");
    const frontmatter = fileContent.match(/^---\s*\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    const slugLine = frontmatter?.[1]
      .split(/\r?\n/)
      .find((line) => /^slug\s*:/.test(line));
    const slug = slugLine?.match(/^slug\s*:\s*([^#]+?)\s*(?:#.*)?$/)?.[1]
      .replace(/^("(.*)"|'(.*)')$/, (_, _quoted, doubleQuoted, singleQuoted) =>
        doubleQuoted ?? singleQuoted,
      );

    if (!slug) {
      throw new Error(
        `Missing or empty frontmatter slug in ${relative(projectContentDirectory, filePath)}`,
      );
    }

    return slug;
  });

const ignoredSeoRules = /** @type {import("@shine/seo-core/integration").RuleId[]} */ ([
  "canonical-self",
  "sitemap-coverage",
]);

/** @type {import("@shine/seo-core/integration").IgnoreEntry[]} */
const seoGateIgnores = projectSlugs.flatMap((slug) => {
  const path = `/proyectos/${slug}/`;
  const reason = `Canonicalización intencional a /proyectos/ según specs/15-project-detail-pages-dedup.md; excepción del gate documentada en specs/19-seo-core-build-gate.md.`;

  return ignoredSeoRules.map((rule) => ({
    rule,
    path,
    reason,
  }));
});

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  site: "https://shineagencia.com",

  integrations: [
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname;

        return (
          ![
            "/politicadeprivacidad/",
            "/terminosycondiciones/",
            "/404/",
          ].includes(pathname) && !/^\/proyectos\/[^/]+\/$/.test(pathname)
        );
      },
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
    // Specs 15 and 19: project detail routes intentionally canonicalize to the hub.
    shineSeo({ ignore: seoGateIgnores }),
  ],

  fonts: [
    {
      name: "Quicksand",
      cssVariable: "--font-quickSand",
      provider: fontProviders.fontsource(),
    },
    {
      name: "Spline Sans",
      cssVariable: "--font-spline",
      provider: fontProviders.fontsource(),
    },
  ],

  adapter: netlify({
    devFeatures: {
      environmentVariables: true,
      edgeFunctions: false,
      images: true,
    },
  }),
});
