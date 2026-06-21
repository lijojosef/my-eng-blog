import Link from "next/link";
import Hero from "@/components/Hero";
import { getAllPosts, generateRssFeed } from "@/lib/mdx"; // 1. Added the generateRssFeed import

export default function BlogHomepage() {
  // 2. Execute the RSS parser to output the public target folder asset during builds
  if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
    generateRssFeed();
  }

  // Fetch all posts
  const allPosts = getAllPosts();

  // Only published posts
  const publishedPosts = allPosts.filter(
    (post) => post.metadata.status === "published"
  );

  // Featured post
  const featuredPost =
    publishedPosts.find((post) => post.metadata.featured) ??
    publishedPosts[0];

  // Remaining posts
  const regularPosts = publishedPosts.filter(
    (post) => post.slug !== featuredPost?.slug
  );

  return (
    <main className="flex-1 font-mono select-none tracking-tight transition-colors duration-200 bg-white text-zinc-900 [@media(prefers-color-scheme:dark)]:bg-zinc-950 [@media(prefers-color-scheme:dark)]:text-zinc-50">
      {/* Hero Section */}
      <Hero />

      <div className="max-w-4xl mx-auto px-6 pb-24 space-y-24">
        
        {/* Featured Post Section */}
        {featuredPost && (
          <section className="space-y-6">
            <div className="space-y-1 text-left">
              <p className="text-xs uppercase tracking-widest text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 font-semibold animate-pulse">
                &gt;_ FEATURED_INDEX // SYSTEM_PICK
              </p>
            </div>

            <article className="group relative flex flex-col gap-4 border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 p-6 rounded-xl hover:border-emerald-600/30 [@media(prefers-color-scheme:dark)]:hover:border-emerald-400/30 transition-all bg-zinc-50/30 [@media(prefers-color-scheme:dark)]:bg-zinc-900/10">
              <div className="space-y-3 text-left">
                <p className="text-xs text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400">
                  SYS_DATE: {new Date(featuredPost.metadata.publishedAt).toLocaleDateString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                  }).replace(/\//g, "-")}
                </p>

                <h2 className="text-2xl font-bold tracking-tight text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 inline-block relative">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <span className="absolute inset-0" />
                    {featuredPost.metadata.title}
                  </Link>
                </h2>

                <p className="text-xs md:text-sm text-zinc-600 [@media(prefers-color-scheme:dark)]:text-zinc-400 leading-relaxed font-light">
                  {featuredPost.metadata.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredPost.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800/60 px-2 py-0.5 rounded text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400 bg-zinc-100/50 [@media(prefers-color-scheme:dark)]:bg-zinc-900/40 font-mono"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Latest Writing Section */}
        <section id="posts" className="space-y-6">
          <div className="space-y-1 text-left">
            <p className="text-xs uppercase tracking-widest text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 font-semibold">
              EXECUTION_TIMELINE // ARCHIVE
            </p>
            <h3 className="text-2xl font-bold tracking-tight text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 !my-0">
              Latest Writing
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {regularPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col justify-between border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 p-5 rounded-xl hover:border-emerald-600/30 [@media(prefers-color-scheme:dark)]:hover:border-emerald-400/30 transition-all bg-zinc-50/30 [@media(prefers-color-scheme:dark)]:bg-zinc-900/10 text-left"
              >
                <div className="space-y-2.5">
                  <p className="text-xs text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400">
                    {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <h4 className="text-base font-bold text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 tracking-tight !my-0">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.metadata.title}
                    </Link>
                  </h4>

                  <p className="text-xs md:text-sm text-zinc-600 [@media(prefers-color-scheme:dark)]:text-zinc-400 font-light line-clamp-2 leading-relaxed">
                    {post.metadata.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800/60 px-1.5 py-0.5 rounded text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400 bg-zinc-100/50 [@media(prefers-color-scheme:dark)]:bg-zinc-900/40 font-mono"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
