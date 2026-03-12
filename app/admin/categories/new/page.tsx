"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { generateSlug } from "@/lib/utils";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

function NewCategoryPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
    subcategories: [] as string[],
  });
  const [newSub, setNewSub] = useState("");

  useEffect(() => {
    if (editId) {
      setFetching(true);
      fetch(`/api/categories/${editId}`)
        .then((res) => res.json())
        .then((data) => {
          if (!data.error) {
            setFormData({
              name: data.name || "",
              slug: data.slug || "",
              description: data.description || "",
              image: data.image || "",
              subcategories: Array.isArray(data.subcategories) ? data.subcategories : [],
            });
          }
        })
        .finally(() => setFetching(false));
    }
  }, [editId]);

  const handleNameChange = (name: string) => {
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const addSub = () => {
    if (newSub && !formData.subcategories.includes(newSub)) {
      setFormData({ ...formData, subcategories: [...formData.subcategories, newSub] });
      setNewSub("");
    }
  };

  const removeSub = (sub: string) => {
    setFormData({ ...formData, subcategories: formData.subcategories.filter(s => s !== sub) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editId ? `/api/categories/${editId}` : "/api/categories";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/categories");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to save category");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-20 text-center font-bold text-slate-400">Loading category details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{editId ? "Edit Category" : "Add New Category"}</h1>
          <p className="text-sm text-slate-500">{editId ? "Update existing category details" : "Create a new product group for your store"}</p>
        </div>
        <Link href="/admin/categories" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Category Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-bold"
                placeholder="e.g. Spices & Seasonings"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Slug</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-mono"
                value={formData.slug}
                readOnly
              />
            </div>
          </div>
          <div className="space-y-4">
            <ImageUpload 
              label="Category Image"
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
            />
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Description</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-kumbil-primary/20 text-sm min-h-[100px]"
                placeholder="Briefly describe this category..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Subcategories</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.subcategories && formData.subcategories.map(sub => (
              <span key={sub} className="inline-flex items-center gap-2 px-3 py-1.5 bg-kumbil-primary/10 text-kumbil-primary rounded-xl text-xs font-bold">
                {sub}
                <button type="button" onClick={() => removeSub(sub)} className="hover:text-red-500">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              placeholder="Add subcategory (e.g. Whole Spices)"
              value={newSub}
              onChange={(e) => setNewSub(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSub())}
            />
            <button
              type="button"
              onClick={addSub}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
            >
              Add
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-kumbil-primary text-white rounded-2xl font-black shadow-xl shadow-kumbil-primary/20 hover:bg-kumbil-primary-dark transition-all disabled:opacity-50"
        >
          {loading ? "Saving..." : (editId ? "Update Category" : "Create Category")}
        </button>
      </form>
    </div>
  );
}

export default function NewCategoryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading…</div>}>
      <NewCategoryPageInner />
    </Suspense>
  );
}
