import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export const metadata = {
  title: "EXECUTION_TIMELINE // ARCHIVE",
  description: "Chronological indexing of all published technical logs.",
};

export default function BlogArchivePage() {
  const allPosts = getAllPosts();

  const publishedPosts = allPosts.filter(
    (post) => post.metadata.status === "published"
  );

  return (
    <main className="min-h-screen font-mono select-none tracking-tight bg-white text-zinc-900 [@media(prefers-color-scheme:dark)]:bg-zinc-950 [@media(prefers-color-scheme:dark)]:text-zinc-50 py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        
        {/* Terminal Header Row */}
        <div className="space-y-2 text-left border-b border-dashed border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800 pb-6">
          <p className="text-xs uppercase tracking-widest text-emerald-600 [@media(prefers-color-scheme:dark)]:text-emerald-400 font-semibold">
            &gt;_ SYS_INDEX // ALL_POSTS
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 !my-0">
            Archive Logs
          </h1>
          <p className="text-xs text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400 font-light mt-1">
            Total compiled execution units: {publishedPosts.length}
          </p>
        </div>

        {/* Chronological Grid Summary List */}
        <div className="space-y-8">
          {publishedPosts.map((post) => (
            <article 
              key={post.slug}
              className="group relative flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-8 border-b border-zinc-100 [@media(prefers-color-scheme:dark)]:border-zinc-900/60 pb-6 last:border-0"
            >
              {/* System Date Identifier */}
              <span className="text-xs text-zinc-400 [@media(prefers-color-scheme:dark)]:text-zinc-500 tabular-nums min-w-[100px]">
                {new Date(post.metadata.publishedAt).toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                }).replace(/\//g, "-")}
              </span>

              {/* Text Meta Content Info */}
              <div className="space-y-2 flex-1 text-left">
                <h2 className="text-base font-bold text-zinc-900 [@media(prefers-color-scheme:dark)]:text-zinc-50 tracking-tight !my-0 group-hover:text-emerald-600 [@media(prefers-color-scheme:dark)]:group-hover:text-emerald-400 transition-colors">
                  <Link href={`/blog/${post.slug}`}>
                    {post.metadata.title}
                  </Link>
                </h2>
                <p className="text-xs md:text-sm text-zinc-600 [@media(prefers-color-scheme:dark)]:text-zinc-400 font-light leading-relaxed line-clamp-2">
                  {post.metadata.summary}
                </p>

                {/* Tag Mapping */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] border border-zinc-200 [@media(prefers-color-scheme:dark)]:border-zinc-800/60 px-1.5 py-0.5 rounded text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400 bg-zinc-100/50 [@media(prefers-color-scheme:dark)]:bg-zinc-900/40"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}

          {publishedPosts.length === 0 && (
            <p className="text-xs text-zinc-500 [@media(prefers-color-scheme:dark)]:text-zinc-400 italic py-8">
              NO_LOGS_FOUND: Execution timeline is empty.
            </p>
          )}
        </div>

      </div>
    </main>
  );
}
