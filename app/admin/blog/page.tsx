"use client";

import { useState } from "react";
import { blogPosts, BlogPost } from "@/lib/mock-data";
import Link from "next/link";

export default function BlogManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filtered = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Blog Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Publish health tips, recipes, and stories from our farmers
          </p>
        </div>
        <button className="px-5 py-2.5 bg-kumbil-primary text-white rounded-2xl text-sm font-bold hover:bg-kumbil-primary-dark transition-all shadow-lg shadow-kumbil-primary/20">
          + New Post
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-4 p-4 rounded-3xl bg-white shadow-soft border border-slate-100">
        <div className="flex-1 min-w-[300px] relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2.5 rounded-2xl bg-slate-50 text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-kumbil-primary/20 cursor-pointer appearance-none">
          <option>All Categories</option>
          <option>Health</option>
          <option>Recipes</option>
          <option>Farming</option>
          <option>Farmer Stories</option>
        </select>
        <select className="px-4 py-2.5 rounded-2xl bg-slate-50 text-sm font-bold text-slate-700 border-none focus:ring-2 focus:ring-kumbil-primary/20 cursor-pointer appearance-none">
          <option>Sort by Date</option>
          <option>Sort by Title</option>
          <option>Sort by Status</option>
        </select>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filtered.map((post) => (
          <div key={post.id} className="bg-white rounded-[2rem] shadow-soft border border-slate-100 flex flex-col md:flex-row gap-6 p-4 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-full md:w-48 h-48 rounded-[1.5rem] overflow-hidden flex-shrink-0">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            
            <div className="flex-1 min-w-0 py-2 pr-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                  {post.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {post.publishedAt}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-kumbil-primary transition-colors line-clamp-2 leading-tight mb-2">
                {post.title}
              </h3>
              
              <p className="text-sm text-slate-500 line-clamp-2 mb-4 leading-relaxed">
                {post.excerpt}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-bold border border-slate-200 uppercase">
                    {post.author[0]}
                  </div>
                  <span className="text-xs font-bold text-slate-400">{post.author}</span>
                </div>
                
                <div className="flex gap-2">
                  <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-kumbil-primary transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-xl hover:bg-pink-50 text-slate-400 hover:text-pink-500 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-[3rem] border border-dashed border-slate-200">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-lg font-bold text-slate-900">No blog posts found</h3>
          <p className="text-sm text-slate-500 mt-1">Ready to write something new?</p>
        </div>
      )}
    </div>
  );
}
