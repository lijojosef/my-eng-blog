export interface Author {
  name: string;
  avatar: string;
  twitter?: string;
}
export interface BlogFrontmatter {
  title: string;
  publishedAt: string;
  summary: string;
  tags: string[];
  author: Author;
  coverImage: string;
  status: 'draft' | 'published';
  featured: boolean;
}
export interface Post {
  slug: string;
  metadata: BlogFrontmatter;
  content: string;
}
