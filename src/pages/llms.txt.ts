import type { APIRoute } from "astro";
import { SITE_CONFIG } from "@/config/site";
import { llmsTxt, postsToLlmsItems } from "@/utils/llms";
import { getAllPosts } from "@/utils/posts";
import { services } from "@/config/services";

const formatLlmsUrl = (slug: string) => `/llms/${slug}.txt`;

/**
 * Convert services to LlmsItem format for llms.txt
 * This helps LLMs discover our service offerings
 */
const servicesToLlmsItems = () =>
  services.map((service) => ({
    title: service.title,
    description: service.seoDescription,
    link: `/llms/servicios/${service.slug}.txt`,
  }));

export const GET: APIRoute = async () => {
  const posts = await getAllPosts();

  return llmsTxt({
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    site: SITE_CONFIG.url,
    items: postsToLlmsItems(posts, formatLlmsUrl),
    services: servicesToLlmsItems(),
    optional: [
      { title: "About", link: "/nosotros", description: "Conoce al equipo detrás de Shine" },
      { title: "Contact", link: "/contacto", description: "Agenda una consulta gratuita" },
    ],
  });
};