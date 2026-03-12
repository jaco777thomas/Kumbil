"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface FarmerActionsProps {
  farmerId: string;
  farmerName: string;
}

export default function FarmerActions({ farmerId, farmerName }: FarmerActionsProps) {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${farmerName}? This action cannot be undone.`)) {
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch(`/api/farmers/${farmerId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to delete farmer");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="mt-auto flex gap-2">
      <Link 
        href={`/admin/farmers/${farmerId}`}
        className="flex-1 py-2.5 rounded-xl bg-slate-50 text-slate-700 text-xs font-bold hover:bg-slate-100 transition-colors text-center"
      >
        View Profile
      </Link>
      <Link 
        href={`/admin/farmers/new?edit=${farmerId}`}
        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-kumbil-primary hover:bg-slate-100 transition-colors"
        title="Edit Farmer"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      </Link>
      <button 
        onClick={handleDelete}
        disabled={deleting}
        className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-50"
        title="Delete Farmer"
      >
        {deleting ? (
          <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        )}
      </button>
    </div>
  );
}
