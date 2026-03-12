"use client";

import { useState } from "react";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Upload error occurred");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          {label || "Image"}
        </label>
        <label className="cursor-pointer">
          <span className="text-[10px] font-bold text-kumbil-primary hover:underline">
            {uploading ? "Uploading..." : "Upload from Computer"}
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>

      <div className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-50 border-2 border-dashed border-slate-200 hover:border-kumbil-primary transition-all">
        {value ? (
          <>
            <img src={value} className="w-full h-full object-cover" alt="" />
            <button
              type="button"
              onClick={() => onChange("")}
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
            >
              <span className="px-3 py-1.5 bg-white rounded-lg text-xs font-bold text-red-500 shadow-lg">
                Remove
              </span>
            </button>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
            {uploading ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-kumbil-primary"></div>
            ) : (
              <>
                <svg className="w-8 h-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M6.75 7.5l.75-.75a2.25 2.25 0 013.182 0l.75.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-[10px] font-bold uppercase">Image Empty</span>
              </>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-[10px] text-red-500 font-bold">{error}</p>}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Or paste URL here..."
        className="w-full px-4 py-2 rounded-xl bg-slate-50 border-none text-xs font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-kumbil-primary/20"
      />
    </div>
  );
}
