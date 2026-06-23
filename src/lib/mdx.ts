import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Post, BlogFrontmatter } from "./types";

// Define the absolute path to your content directory
const CONTENT_DIR = path.join(process.cwd(), "src", "content");

/**
 * Utility to get all .mdx slugs from the content folder
 */
export function getPostSlugs(): string[] {
  // Read directory and filter for files ending in .mdx
  return fs.readdirSync(CONTENT_DIR).filter((file) => file.endsWith(".mdx"));
}

/**
 * Fetches and parses a single MDX blog post by its slug string
 */
export function getPostBySlug(slug: string): Post {
  // Normalize the slug (strip .mdx extension if it exists, then append it safely)
  const realSlug = slug.replace(/\.mdx$/, "");
  const filePath = path.join(CONTENT_DIR, `${realSlug}.mdx`);

  // Read the raw file content string from disk
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // Use gray-matter to separate YAML frontmatter metadata from the MDX body content
  const { data, content } = matter(fileContent);
  // Assert and structure our strict frontend metadata contracts
  const metadata = data as BlogFrontmatter;
  return {
    slug: realSlug,
    metadata,
    content,
  };
}

/**
 * Retrieves all blog posts sorted chronologically by publication date
 */
export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();

  const posts = slugs.map((slug) => getPostBySlug(slug));
  // Sort posts by date descending (newest first)
  return posts.sort((postA, postB) => {
    const dateA = new Date(postA.metadata.publishedAt).getTime();
    const dateB = new Date(postB.metadata.publishedAt).getTime();
    return dateB - dateA;
  });
}

/**
 * Communicates with the Buttondown REST API to broadcast the newest post safely
 */
async function syncLatestPostToButtondown(latestPost: Post) {

  if (!process.env.GITHUB_ACTIONS) {
    console.log("Local build detected. Skipping Buttondown newsletter sync.");
    return;
  }

  const API_KEY = process.env.BUTTONDOWN_API_KEY;

  if (!API_KEY) {
    console.warn("BUTTONDOWN_API_KEY is not defined. Skipping newsletter broadcast.");
    return;
  }

  try {
    // 1. Fetch recent emails from Buttondown to prevent duplicate spam
    const checkRes = await fetch("https://api.buttondown.com/v1/emails", {
      headers: { "Authorization": `Token ${API_KEY}` }
    });

    if (!checkRes.ok) {
      throw new Error(`Failed to fetch history: ${checkRes.statusText}`);
    }

    const historicalData = await checkRes.json();
    const emailResults = historicalData.results || [];

    // 2. Prevent duplicate blasts if this post was already broadcasted
    const alreadySent = emailResults.some(
      (email: { subject: string }) => email.subject === latestPost.metadata.title
    );

    if (alreadySent) {
      console.log(`Skip: Newsletter for "${latestPost.metadata.title}" was already sent.`);
      return;
    }

    console.log(`Dispatching newsletter broadcast: "${latestPost.metadata.title}"...`);

    // 3. Post full content body to Buttondown
    const dispatchRes = await fetch("https://api.buttondown.com/v1/emails", {
      method: "POST",
      headers: {
        "Authorization": `Token ${API_KEY}`,
        "Content-Type": "application/json",
        "X-Buttondown-Live-Dangerously": "true" // Confirms programmatic send on free plans
      },
      body: JSON.stringify({
        subject: latestPost.metadata.title,
        body: latestPost.content, // Sends full MDX body text
        status: "about_to_send"    // Sends instantly to verified subscribers
      })
    });

    if (dispatchRes.ok) {
      console.log("Buttondown newsletter broadcast dispatched successfully!");
    } else {
      const errPayload = await dispatchRes.json();
      console.error("Buttondown API rejection payload:", errPayload);
    }
  } catch (error) {
    console.error("Failed to process Buttondown integration sync:", error);
  }
}

/**
 * Compiles published articles into a structured XML RSS feed format for distribution
 */
export async function generateRssFeed() {
  // Filter out any hidden drafts to ensure code delivery safety
  const posts = getAllPosts().filter((post) => post.metadata.status === "published");

  const siteUrl = "https://my-eng-blog.web.app";

  // 👇 Intercept the newest post and process the newsletter delivery queue
  if (posts.length > 0) {
    const latestPost = posts[0]; 
    await syncLatestPostToButtondown(latestPost);
  }

  const rssItems = posts
    .map((post) => `
      <item>
        <title><![CDATA[${post.metadata.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        <description><![CDATA[${post.metadata.summary}]]></description>
      </item>
    `)
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
      <channel>
        <title>INTI_CORE // Lijo Joseph</title>
        <link>${siteUrl}</link>
        <description>Notes from an engineer trying to understand how things work.</description>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${rssItems}
      </channel>
    </rss>
  `;

  // Safely map and execute output write into the static assets directory
  const publicDir = path.join(process.cwd(), "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }
  
  fs.writeFileSync(path.join(publicDir, "rss.xml"), rssXml.trim());
}
