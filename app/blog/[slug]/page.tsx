import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const categoryLabels: Record<string, string> = {
  health: "Health",
  recipes: "Recipes",
  farming: "Farming",
  "farmer-stories": "Farmer Stories",
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Fetch live post from DB
  const post = await prisma.blog.findUnique({
    where: { slug }
  });

  if (!post) notFound();

  // 2. Fetch related posts from DB
  const otherPosts = await prisma.blog.findMany({
    where: {
      id: { not: post.id },
      category: post.category,
      published: true,
    },
    take: 2,
    orderBy: { publishedAt: "desc" }
  });

  // If no related posts in same category, just take the latest 2
  const displayRelated = otherPosts.length > 0 
    ? otherPosts 
    : await prisma.blog.findMany({
        where: { id: { not: post.id }, published: true },
        take: 2,
        orderBy: { publishedAt: "desc" }
      });

  return (
    <div className="pt-28 pb-20">
      <div className="container-tight px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-8">
          <Link href="/" className="hover:text-kumbil-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-kumbil-primary transition-colors">
            Blog
          </Link>
          <span>/</span>
          <span className="text-slate-600 truncate">{post.title}</span>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-kumbil-primary/10 text-kumbil-primary text-xs font-semibold uppercase tracking-wider">
              {categoryLabels[post.category || ""] || post.category}
            </span>
            <span className="text-sm text-slate-400">
              {post.readTime} min read
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-3 text-sm text-slate-500 mb-8">
            <span className="font-medium text-slate-700">{post.author}</span>
            <span>·</span>
            <span>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ""}</span>
          </div>

          {/* Featured Image */}
          <div className="rounded-2xl overflow-hidden mb-10">
            <img
              src={post.image || ""}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          {/* Content */}
          <article className="prose prose-slate prose-lg max-w-none mb-16">
            {(post.content || "").split("\n\n").map((paragraph, i) =>
              paragraph.startsWith("## ") ? (
                <h2
                  key={i}
                  className="text-2xl font-extrabold text-slate-900 mt-10 mb-4"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              ) : paragraph.startsWith("- ") ? (
                <ul key={i} className="list-disc pl-6 space-y-1">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j} className="text-slate-600">
                      {item.replace("- ", "")}
                    </li>
                  ))}
                </ul>
              ) : paragraph.match(/^\d\./) ? (
                <ol key={i} className="list-decimal pl-6 space-y-1">
                  {paragraph.split("\n").map((item, j) => (
                    <li key={j} className="text-slate-600">
                      {item.replace(/^\d+\.\s/, "")}
                    </li>
                  ))}
                </ol>
              ) : (
                <p key={i} className="text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              )
            )}
          </article>

          {/* Share */}
          <div className="flex items-center gap-4 py-6 border-y border-slate-100 mb-12">
            <span className="text-sm font-medium text-slate-600">Share:</span>
            {["WhatsApp", "Facebook", "Twitter"].map((social) => (
              <button
                key={social}
                className="px-4 py-2 rounded-xl bg-slate-50 text-sm text-slate-600 hover:bg-kumbil-primary/10 hover:text-kumbil-primary transition-colors"
              >
                {social}
              </button>
            ))}
          </div>
        </div>

        {/* Related Posts */}
        {displayRelated.length > 0 && (
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Related Articles
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {displayRelated.map((p) => (
                <Link
                  key={p.id}
                  href={`/blog/${p.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white shadow-soft hover:shadow-premium transition-all"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.image || ""}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-kumbil-primary transition-colors line-clamp-2">
                      {p.title}
                    </h4>
                    <div className="text-xs text-slate-400 mt-2">
                      {p.readTime} min · {p.author}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
