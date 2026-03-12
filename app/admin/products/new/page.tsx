"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import ImageUpload from "@/components/admin/ImageUpload";

function NewProductPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("edit");

  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    longDescription: "",
    categoryId: "",
    status: "draft" as "draft" | "published",
    featured: false,
    image1: "",
    image2: "",
    image3: "",
    farmerId: "",
    variants: [] as any[],
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  // Load categories
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      });
  }, []);

  // Load existing product if editing
  useEffect(() => {
    if (editId) {
      setLoading(true);
      fetch(`/api/products/${editId}`)
        .then((res) => res.json())
        .then((product) => {
          if (product && !product.error) {
            setFormData({
              name: product.name,
              slug: product.slug,
              description: product.description,
              longDescription: product.longDescription || "",
              categoryId: product.categoryId,
              status: product.status as "draft" | "published",
              featured: product.featured || false,
              image1: product.image1,
              image2: product.image2 || "",
              image3: product.image3 || "",
              farmerId: product.farmerId || "",
              variants: product.variants.map((v: any) => ({
                weight: v.weight,
                price: v.price,
                comparePrice: v.comparePrice,
                stock: v.stock,
                sku: v.sku,
              })),
            });
          }
        })
        .finally(() => setLoading(false));
    }
  }, [editId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as any;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? (e.target as any).checked : value 
    });
  };

  const handleVariantChange = (index: number, field: string, value: any) => {
    const newVariants = [...formData.variants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setFormData({ ...formData, variants: newVariants });
  };

  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { weight: "", price: 0, stock: 0, sku: "" }
      ]
    });
  };

  const removeVariant = (index: number) => {
    setFormData({
      ...formData,
      variants: formData.variants.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaved(false);

    try {
      const url = editId ? `/api/products/${editId}` : "/api/products";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSaved(true);
        setTimeout(() => {
          setSaved(false);
          router.push("/admin/products");
          router.refresh();
        }, 1500);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    }
  };

  if (loading) return <div className="p-20 text-center font-bold text-slate-400">Loading product details...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
            <Link
              href="/admin/products"
              className="hover:text-kumbil-primary transition-colors"
            >
              Products
            </Link>
            <span>/</span>
            <span className="text-slate-600">{editId ? "Edit Product" : "New Product"}</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            {editId ? "Update Product" : "Create New Product"}
          </h1>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-sm font-bold flex items-center gap-2 animate-bounce-subtle">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Product catalog updated successfully!
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-700 text-sm font-bold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column - Form Fields */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Basic Info */}
          <div className="bg-white rounded-[2rem] shadow-soft p-8 border border-slate-100 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">
              Core Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Product Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Wayanad Black Pepper"
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-bold text-slate-900"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Slug (Auto-generated)
                </label>
                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  placeholder="black-pepper"
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-medium text-slate-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Category
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  required
                  className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-bold text-slate-900 appearance-none"
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Short Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={2}
                placeholder="Brief summary for product cards..."
                className="w-full px-5 py-3 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-medium text-slate-700 resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                Full Story / Long Description
              </label>
              <textarea
                name="longDescription"
                value={formData.longDescription}
                onChange={handleChange}
                rows={6}
                placeholder="Tell the story of how this product is sourced and its health benefits..."
                className="w-full px-5 py-4 rounded-2xl bg-slate-50 border-none focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-medium text-slate-700 leading-relaxed"
              />
            </div>
          </div>

          {/* Variants Section */}
          <div className="bg-white rounded-[2rem] shadow-soft p-8 border border-slate-100 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-50 pb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Pricing & Variants
              </h2>
              <button 
                type="button"
                onClick={addVariant}
                className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-xs font-bold text-kumbil-primary transition-colors border border-kumbil-primary/5"
              >
                + Add Variant
              </button>
            </div>

            <div className="space-y-4">
              {formData.variants.length === 0 ? (
                <div className="text-center py-10 bg-slate-50/50 rounded-3xl border border-dashed border-slate-200">
                  <p className="text-sm text-slate-400">No variants added yet. Add one to set pricing.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {formData.variants.map((v, idx) => (
                    <div key={idx} className="grid grid-cols-5 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 relative group animate-fade-in">
                      <div className="col-span-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Weight</label>
                        <input 
                          type="text" value={v.weight} 
                          onChange={(e) => handleVariantChange(idx, 'weight', e.target.value)}
                          placeholder="250g"
                          className="w-full px-3 py-2 rounded-xl border-none focus:ring-2 focus:ring-kumbil-primary/20 text-xs font-bold"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Price (₹)</label>
                        <input 
                          type="number" value={v.price} 
                          onChange={(e) => handleVariantChange(idx, 'price', Number(e.target.value))}
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-xl border-none focus:ring-2 focus:ring-kumbil-primary/20 text-xs font-bold"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Compare (₹)</label>
                        <input 
                          type="number" value={v.comparePrice || ""} 
                          onChange={(e) => handleVariantChange(idx, 'comparePrice', Number(e.target.value))}
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-xl border-none focus:ring-2 focus:ring-kumbil-primary/20 text-xs text-slate-400"
                        />
                      </div>
                      <div className="col-span-1">
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Stock</label>
                        <input 
                          type="number" value={v.stock} 
                          onChange={(e) => handleVariantChange(idx, 'stock', Number(e.target.value))}
                          placeholder="0"
                          className="w-full px-3 py-2 rounded-xl border-none focus:ring-2 focus:ring-kumbil-primary/20 text-xs font-bold"
                        />
                      </div>
                      <div className="col-span-1 flex items-end">
                        <button 
                          type="button" 
                          onClick={() => removeVariant(idx)}
                          className="w-full py-2 rounded-xl bg-pink-50 text-pink-500 hover:bg-pink-100 transition-colors flex items-center justify-center"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Status & Media */}
        <div className="space-y-6">
          
          {/* Status & Visibility */}
          <div className="bg-white rounded-[2rem] shadow-soft p-8 border border-slate-100 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">
              Status & Logic
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                  Visibility
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button 
                    type="button" 
                    onClick={() => setFormData({...formData, status: 'published'})}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${formData.status === 'published' ? 'bg-kumbil-primary text-white border-kumbil-primary shadow-lg shadow-kumbil-primary/20' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                  >
                    Published
                  </button>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, status: 'draft'})}
                    className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all ${formData.status === 'draft' ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'}`}
                  >
                    Draft
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-amber-50/50 border border-amber-100">
                <div>
                  <div className="text-sm font-bold text-amber-900">Featured Product</div>
                  <div className="text-[10px] text-amber-600 font-medium">Show on home page categories</div>
                </div>
                <input 
                  type="checkbox" 
                  name="featured" 
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-5 h-5 rounded-lg text-amber-500 focus:ring-amber-500 border-amber-300"
                />
              </div>
            </div>
          </div>

          {/* Media Section */}
          <div className="bg-white rounded-[2rem] shadow-soft p-8 border border-slate-100 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b border-slate-50 pb-4">
              Media Gallery
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((num) => {
                const key = `image${num}` as "image1" | "image2" | "image3";
                return (
                  <ImageUpload
                    key={num}
                    label={`Image ${num}${num === 1 ? " (Featured)" : ""}`}
                    value={formData[key]}
                    onChange={(url) => setFormData({ ...formData, [key]: url })}
                  />
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full py-4 rounded-3xl bg-kumbil-primary text-white font-black uppercase tracking-widest shadow-xl shadow-kumbil-primary/30 hover:shadow-2xl hover:bg-kumbil-primary-dark hover:-translate-y-1 transition-all"
            >
              {editId ? "Update Product" : "Create Product"}
            </button>
            <Link
              href="/admin/products"
              className="w-full py-4 rounded-3xl bg-white border border-slate-100 text-slate-400 font-bold text-center text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors"
            >
              Discard Changes
            </Link>
          </div>

        </div>
      </form>
    </div>
  );
}

export default function NewProductPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading…</div>}>
      <NewProductPageInner />
    </Suspense>
  );
}
