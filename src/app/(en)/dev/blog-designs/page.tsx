import { getBlogPosts, getBlogPost } from "@/lib/blog";
import {
  sanitizeBlogContent,
  addBlogHeadingAnchors,
  estimateReadingMinutes,
} from "@/lib/blog-content";
import { BlogDesigns } from "./preview";

export default async function BlogDesignsPage() {
  const { posts } = await getBlogPosts({ limit: 12 });
  const articles = await Promise.all(
    posts.map(async (post) => {
      const { post: full } = await getBlogPost(post.slug);
      const { html: content, tableOfContents } = addBlogHeadingAnchors(
        sanitizeBlogContent(full?.content ?? "", post.image),
      );
      return {
        slug: post.slug,
        title: post.title,
        description: post.description ?? "",
        image: post.image,
        content,
        headings: tableOfContents,
        minutes: estimateReadingMinutes(full?.content ?? ""),
      };
    }),
  );
  return <BlogDesigns articles={articles} />;
}
