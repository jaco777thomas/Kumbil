import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog — Kumbil | Health, Recipes & Farming Stories",
  description:
    "Read about organic health benefits, authentic Kerala recipes, farming techniques, and inspiring farmer stories from Kumbil.",
};

const categoryLabels: Record<string, string> = {
  health: "Health",
  recipes: "Recipes",
  farming: "Farming",
  "farmer-stories": "Farmer Stories",
};

export default async function BlogPage() {
  const blogPosts = await prisma.blog.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" }
  });

  if (blogPosts.length === 0) {
    return (
      <div className="pt-28 pb-20 text-center">
        <h1 className="text-2xl font-bold text-slate-400">No blog posts found.</h1>
        <Link href="/" className="text-kumbil-primary hover:underline mt-4 inline-block">Back to Home</Link>
      </div>
    );
  }

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="pt-28 pb-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-sm font-medium mb-4">
            📝 Our Blog
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-3">
            Stories, Recipes & Insights
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto">
            Explore health articles, authentic Kerala recipes, organic farming
            education, and inspiring farmer stories
          </p>
        </div>

        {/* Featured Post */}
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="block rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-premium transition-all mb-12 group"
        >
          <div className="grid md:grid-cols-2">
            <div className="aspect-[16/10] md:aspect-auto overflow-hidden">
              <img
                src={featuredPost.image || ""}
                alt={featuredPost.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-8 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-xs font-semibold uppercase tracking-wider w-fit mb-4">
                {categoryLabels[featuredPost.category || ""] || featuredPost.category}
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-kumbil-primary transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-slate-500 leading-relaxed mb-4">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span className="font-medium text-slate-600">
                  {featuredPost.author}
                </span>
                <span>·</span>
                <span>{featuredPost.readTime} min read</span>
                <span>·</span>
                <span>{featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString() : ""}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Post Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-premium transition-all"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image || ""}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-[10px] font-semibold uppercase tracking-wider">
                    {categoryLabels[post.category || ""] || post.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {post.readTime} min
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-800 mb-2 group-hover:text-kumbil-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="text-xs text-slate-400 mt-3">
                  {post.author} · {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
