import type { APIRoute } from "astro";
import { SITE_CONFIG } from "@/config/site";
import { llmsFullTxt, postsToLlmsFullItems } from "@/utils/llms";
import { getAllPosts } from "@/utils/posts";

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();

  return llmsFullTxt({
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    author: SITE_CONFIG.author,
    site: SITE_CONFIG.url,
    items: postsToLlmsFullItems(posts, (slug) => `/${slug}`),
  });
};