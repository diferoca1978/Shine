import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;


export const getAllPosts = async () => {
  const post = await getCollection('blog', ({ data }) => !data.draft);
  return post.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export const getRecentPosts = async (count: number) => {
  const posts = await getAllPosts();
  return posts.slice(0, count);
}

export const getPostsByService = async (service: string, limit = 3) => {
  const posts = await getAllPosts();
  return posts
    .filter((post) => (post.data.services as string[] | undefined)?.includes(service))
    .slice(0, limit);
}

export const getRelatedPosts = async (current: BlogPost, count = 3) => {
  const posts = await getAllPosts();
  const normalize = (tags: string[] = []) => new Set(tags.map((tag) => tag.trim().toLowerCase()));
  const currentTags = normalize(current.data.tags);
  const shared = (post: BlogPost) =>
    [...normalize(post.data.tags)].filter((tag) => currentTags.has(tag)).length;

  return posts
    .filter((post) => post.id !== current.id)
    .map((post) => ({ post, shared: shared(post) }))
    .sort((a, b) => b.shared - a.shared)
    .slice(0, count)
    .map(({ post }) => post);
}
