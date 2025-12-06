import { client } from "@/lib/client";
import type { Post } from "./blogModel";

export async function getPosts() : Promise<Post[]> {
  const blogPosts = await client.getContentList<Post>({
    contentType: "Post",
  });

  return blogPosts;
}
