import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
// Highlight-start
import rehypePrettyCode from "rehype-pretty-code";
// Highlight-end

interface BlogParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const fileNames = getPostSlugs();
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.mdx$/, ""),
  }));
}

// Highlight-start
/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: "github-dark", // Choose your IDE theme (e.g., 'one-dark-pro', 'dracula')
  keepBackground: true,
};
// Highlight-end

export default async function BlogPostPage({ params }: BlogParams) {
  const { slug } = await params;
  
  let post;
  try {
    post = getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 space-y-8">
      <header className="space-y-4 border-b border-border pb-8">
        <p className="text-sm font-mono text-muted-foreground">
          {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl text-foreground">
          {post.metadata.title}
        </h1>
        <div className="flex items-center gap-3 pt-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              {post.metadata.author?.name || "Lijo Joseph"}
            </span>
            {post.metadata.author?.twitter && (
              <span className="text-xs text-muted-foreground font-mono">
                {post.metadata.author.twitter}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline">
        {/* Highlight-start */}
        <MDXRemote 
          source={post.content} 
          options={{
            mdxOptions: {
              rehypePlugins: [[rehypePrettyCode, options]],
            },
          }}
        />
        {/* Highlight-end */}
      </div>
    </article>
  );
}
