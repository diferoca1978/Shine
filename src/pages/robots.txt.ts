import type { APIRoute } from 'astro';

const getRobotsTxt = (sitemapURL: URL) => `
# All crawlers
User-agent: *
Allow: /

# AI search/retrieval bots - allowed so AI engines can cite this site.
# Training bots (GPTBot, ClaudeBot, Google-Extended, CCBot, etc.) are
# opted out at the Cloudflare edge, not here - do not re-allow them
# in this file or it creates a conflicting duplicate rule.
User-agent: OAI-SearchBot
Allow: /

User-agent: Claude-SearchBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ChatGPT-User
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site);

  return new Response(getRobotsTxt(sitemapURL), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};