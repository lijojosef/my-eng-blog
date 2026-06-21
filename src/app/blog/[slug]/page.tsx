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
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
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
    /* 
      We use precise `@media(prefers-color-scheme:dark):` hooks here.
      This forces the page to directly listen to the computer's OS theme state,
      bypassing any blocking ThemeProviders or Next-Theme context issues.
    */
    <main className="flex-1 font-mono select-none tracking-tight transition-colors duration-200 bg-white text-zinc-900 [@media(prefers-color-scheme:dark)]:bg-zinc-950 [@media(prefers-color-scheme:dark)]:text-zinc-50">
      <article className="max-w-4xl mx-auto px-6 py-16 md:py-24 space-y-12">
        
        {/* Terminal Header Row */}
        <header className="space-y-4 text-left">
          <p className="text-xs uppercase tracking-widest text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 font-semibold animate-pulse">
            &gt;_ EXECUTE_LOG // READ_POST
          </p>
          
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 inline-block relative">
            {post.metadata.title}
            {/* Blinking terminal block cursor matches system theme color balancing */}
            <span className="inline-block w-2.5 h-7 md:h-10 ml-2 bg-emerald-600 [@media(prefers-color-scheme:dark)]:bg-emerald-400 align-middle animate-[ping_1s_infinite_steps(1)] opacity-75" />
          </h1>

          {/* Metadata Meta-Info Row */}
          <div className="flex flex-wrap items-center gap-6 pt-4 border-b border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 pb-6 text-xs text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400">
            <div className="flex items-center gap-2">
              {post.metadata.author?.avatar && (
                <img
                  src={post.metadata.author.avatar}
                  alt={post.metadata.author.name}
                  className="w-6 h-6 rounded-xl object-cover border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800"
                />
              )}
              <span className="font-semibold text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50">
                {post.metadata.author?.name || "Lijo Joseph"}
              </span>
              {post.metadata.author?.twitter && (
                <span className="text-zinc-400 [@media(prefers-color-scheme:dark)]:text-zinc-500">
                  ({post.metadata.author.twitter})
                </span>
              )}
            </div>
            
            <span className="text-zinc-300 [@media(prefers-color-scheme:dark)]:text-zinc-700">/</span>
            
            <div>
              SYS_DATE: {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                month: "2-digit",
                day: "2-digit",
                year: "numeric",
              }).replace(/\//g, "-")}
            </div>
          </div>
        </header>

        {/* Cover Image Wrapper with Neon Glow */}
        {post.metadata.coverImage && (
          <div className="relative group my-6">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-emerald-500 to-zinc-500 opacity-10 blur" />
            <img
              src={post.metadata.coverImage}
              alt={post.metadata.title}
              className="relative w-full h-auto rounded-2xl object-cover border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 bg-zinc-50 [@media(prefers-color-scheme:dark)]:bg-zinc-900 shadow-sm"
            />
          </div>
        )}

        {/* MDX Content Markdown Styling Tree */}
        <div className="prose prose-zinc max-w-none text-xs md:text-sm text-zinc-600 [@media(prefers-color-scheme:dark)]:text-zinc-400 leading-relaxed 
          prose-headings:font-bold prose-headings:text-zinc-900 [@media(prefers-color-scheme:dark)]:prose-headings:text-zinc-50 prose-headings:tracking-tight
          prose-h1:before:content-['#_'] prose-h1:text-xl
          prose-h2:before:content-['//_'] prose-h2:text-lg
          prose-h3:before:content-['___'] prose-h3:text-sm
          prose-a:text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 hover:prose-a:underline
          prose-strong:text-zinc-900 [@media(prefers-color-scheme:dark)]:prose-strong:text-zinc-50 
          prose-code:text-emerald-600 [@media(prefers-color-scheme:dark)]:prose-code:text-emerald-400 font-mono">
          
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
    </main>
  );
}
