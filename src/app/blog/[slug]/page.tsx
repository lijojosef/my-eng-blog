import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getPostSlugs } from "@/lib/mdx";
import rehypePrettyCode from "rehype-pretty-code";
import Presentation from "@/components/Presentation";

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

/** @type {import('rehype-pretty-code').Options} */
const options = {
  theme: "github-dark",
  keepBackground: true,
};

export default async function BlogPostPage({ params }: BlogParams) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch (error) {
    notFound();
  }

  const isPresentation = post.metadata.layout === "presentation";
  const slides = isPresentation ? post.content.split("---") : [];

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
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
          {post.metadata.author?.avatar && (
            <img
              src={post.metadata.author.avatar}
              alt={post.metadata.author.name}
              className="w-8 h-8 rounded-full"
            />
          )}
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

      {post.metadata.coverImage && (
        <div className="my-8">
          <img
            src={post.metadata.coverImage}
            alt={post.metadata.title}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary hover:prose-a:underline">
        {isPresentation ? (
          <Presentation 
            title={post.metadata.title} 
            slides={slides.map((slideContent, index) => (
              <MDXRemote 
                key={index}
                source={slideContent} 
                options={{
                  mdxOptions: {
                    rehypePlugins: [[rehypePrettyCode, options]],
                  },
                }}
              />
            ))} 
          />
        ) : (
          <MDXRemote 
            source={post.content} 
            options={{
              mdxOptions: {
                rehypePlugins: [[rehypePrettyCode, options]],
              },
            }}
          />
        )}
      </div>
    </article>
  );
}
