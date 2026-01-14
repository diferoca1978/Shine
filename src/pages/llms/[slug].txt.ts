// src/pages/llms/[slug].txt.ts
import type { GetStaticPaths } from "astro";
import { SITE_CONFIG } from "@/config/site";
import { llmsPost } from "@/utils/llms";
import { getAllPosts, type BlogPost } from "@/utils/posts";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    params: { slug: post.data.slug },
    props: { post },
  }));
};

export const GET = ({ props }: { props: { post: BlogPost } }) => {
  return llmsPost({
    post: props.post,
    site: SITE_CONFIG.url,
    link: `/${props.post.data.slug}`,
  });
};