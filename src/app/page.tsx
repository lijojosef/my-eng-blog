import Link from "next/link";
import Hero from "@/components/Hero";
import { getAllPosts } from "@/lib/mdx";

export default function BlogHomepage() {
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
    <main>
      {/* Hero Section */}
      <Hero />

      <div className="max-w-4xl mx-auto px-6 pb-12 space-y-16">
        {/* Featured Post */}
        {featuredPost && (
          <section className="space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-primary uppercase bg-secondary px-2.5 py-1 rounded-full">
              Featured Post
            </div>

            <article className="group relative flex flex-col md:flex-row gap-8 items-start border border-border p-6 rounded-xl hover:bg-muted/30 transition-colors">
              <div className="flex-1 space-y-3">
                <p className="text-sm text-muted-foreground">
                  {new Date(
                    featuredPost.metadata.publishedAt
                  ).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>

                <h2 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <span className="absolute inset-0" />
                    {featuredPost.metadata.title}
                  </Link>
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  {featuredPost.metadata.summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {featuredPost.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-muted border border-border px-2 py-0.5 rounded text-muted-foreground font-mono"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </section>
        )}

        {/* Latest Posts */}
        <section id="posts" className="space-y-6">
          <h3 className="text-xl font-semibold tracking-tight">
            Latest Writing
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {regularPosts.map((post) => (
              <article
                key={post.slug}
                className="group relative flex flex-col justify-between border border-border p-5 rounded-xl hover:bg-muted/30 transition-colors"
              >
                <div className="space-y-2.5">
                  <p className="text-xs text-muted-foreground">
                    {new Date(
                      post.metadata.publishedAt
                    ).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>

                  <h4 className="text-lg font-bold group-hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.metadata.title}
                    </Link>
                  </h4>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {post.metadata.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4">
                  {post.metadata.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground font-mono"
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
