import { MetadataRoute } from "next";
import { products, blogPosts, categories } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://kumbil.in";

  // Static pages
  const staticPages = ["", "/shop", "/about", "/blog", "/track", "/wishlist"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Dynamic products
  const productPages = products.map((product: any) => ({
    url: `${baseUrl}/shop/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  // Dynamic blog posts
  const blogPages = blogPosts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  // Dynamic categories
  const categoryPages = categories.map((cat: any) => ({
    url: `${baseUrl}/shop?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticPages, ...productPages, ...blogPages, ...categoryPages];
}
