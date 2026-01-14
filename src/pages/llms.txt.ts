import type { APIRoute } from "astro";
import { SITE_CONFIG } from "@/config/site";
import { llmsTxt, postsToLlmsItems } from "@/utils/llms";
import { getAllPosts } from "@/utils/posts";

const formatLlmsUrl = (slug: string) => `/llms/${slug}.txt`;

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();

  return llmsTxt({
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: SITE_CONFIG.url,
    items: postsToLlmsItems(posts, formatLlmsUrl),
    optional: [
      { title: "About", link: "/about", description: "About the author" },
      { title: "RSS Feed", link: "/rss.xml", description: "Subscribe to updates" },
      {
        title: "Full Content",
        link: "/llms-full.txt",
        description: "Complete post content for deeper context",
      },
    ],
  });
};