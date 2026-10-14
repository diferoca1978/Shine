// src/pages/llms/[slug].txt.ts
import type { GetStaticPaths } from "astro";
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
    link: `/blog/${props.post.data.slug}/`,
  });
};
