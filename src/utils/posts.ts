import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;


export const getAllPosts = async () => {
  const post = await getCollection('blog', ({ data }) => !data.draft);
  return post.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}
