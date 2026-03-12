"use client";

import { useState, useTransition } from "react";

const VALID_STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"];

export default function AdminOrderStatusChanger({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  const handleChange = async (newStatus: string) => {
    if (newStatus === status) return;

    startTransition(async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        });
        if (res.ok) {
          setStatus(newStatus);
        }
      } catch {
        // silent fail — will show stale value
      }
    });
  };

  return (
    <select
      value={status}
      onChange={(e) => handleChange(e.target.value)}
      disabled={isPending}
      className={`text-xs font-medium px-2 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-kumbil-primary/20 transition-all cursor-pointer ${
        isPending ? "opacity-50 cursor-wait" : ""
      }`}
    >
      {VALID_STATUSES.map((s) => (
        <option key={s} value={s}>
          {s.charAt(0).toUpperCase() + s.slice(1)}
        </option>
      ))}
    </select>
  );
}
