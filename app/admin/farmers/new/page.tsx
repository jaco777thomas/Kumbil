"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ImageUpload from "@/components/admin/ImageUpload";

function FarmerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(!!editId);
  const [formData, setFormData] = useState({
    name: "",
    farmName: "",
    village: "",
    region: "Wayanad",
    since: new Date().getFullYear().toString(),
    bio: "",
    photo: "",
    crops: [] as string[],
  });
  const [newCrop, setNewCrop] = useState("");

  useEffect(() => {
    if (editId) {
      const fetchFarmer = async () => {
        try {
          const res = await fetch(`/api/farmers/${editId}`);
          if (res.ok) {
            const data = await res.json();
            setFormData({
              name: data.name || "",
              farmName: data.farmName || "",
              village: data.village || "",
              region: data.region || "Wayanad",
              since: data.since || "",
              bio: data.description || "",
              photo: data.photo || "",
              crops: data.crops || [],
            });
          }
        } catch (err) {
          console.error("Failed to fetch farmer:", err);
        } finally {
          setFetching(false);
        }
      };
      fetchFarmer();
    }
  }, [editId]);

  const addCrop = () => {
    if (newCrop && !formData.crops.includes(newCrop)) {
      setFormData({ ...formData, crops: [...formData.crops, newCrop] });
      setNewCrop("");
    }
  };

  const removeCrop = (crop: string) => {
    setFormData({ ...formData, crops: formData.crops.filter(c => c !== crop) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editId ? `/api/farmers/${editId}` : "/api/farmers";
      const method = editId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        router.push("/admin/farmers");
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || `Failed to ${editId ? "update" : "register"} farmer`);
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-20 text-center font-bold text-slate-400">Loading farmer details...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">{editId ? "Edit Farmer" : "Register New Farmer"}</h1>
          <p className="text-sm text-slate-500">{editId ? "Update farmer partner details" : "Add a new farmer partner to our marketplace"}</p>
        </div>
        <Link href="/admin/farmers" className="text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors">
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Farmer Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-bold"
                placeholder="e.g. Rajan Kutty"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Farm Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-kumbil-primary/20 text-sm font-bold"
                placeholder="e.g. Rajan's Hill Farm"
                value={formData.farmName}
                onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Village</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm"
                  placeholder="e.g. Meppadi"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Serving Since</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm"
                  placeholder="e.g. 1998"
                  value={formData.since}
                  onChange={(e) => setFormData({ ...formData, since: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <ImageUpload 
              label="Farmer Photo"
              value={formData.photo}
              onChange={(url) => setFormData({ ...formData, photo: url })}
            />
            <div>
              <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Bio / Story</label>
              <textarea
                className="w-full px-4 py-3 rounded-xl bg-white border border-slate-200 focus:ring-2 focus:ring-kumbil-primary/20 text-sm min-h-[100px]"
                placeholder="Share the farmer's journey..."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-soft">
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Major Crops</label>
          <div className="flex flex-wrap gap-2 mb-4">
            {formData.crops.map(crop => (
              <span key={crop} className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-bold">
                {crop}
                <button type="button" onClick={() => removeCrop(crop)} className="hover:text-red-500">×</button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm"
              placeholder="Add crop (e.g. Turmeric)"
              value={newCrop}
              onChange={(e) => setNewCrop(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCrop())}
            />
            <button
              type="button"
              onClick={addCrop}
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
          {loading ? (editId ? "Updating..." : "Registering...") : (editId ? "Update Farmer" : "Register Farmer")}
        </button>
      </form>
    </div>
  );
}

export default function RegisterFarmerPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold text-slate-400">Loading form...</div>}>
      <FarmerForm />
    </Suspense>
  );
}
