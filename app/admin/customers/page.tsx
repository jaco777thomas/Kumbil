import { prisma } from "@/lib/prisma";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import ExportBtn from "./ExportBtn";

export default async function CustomersPage() {
  const customers = await prisma.customer.findMany({
    orderBy: { joinedAt: "desc" }
  });

  const stats = [
    { label: "Total Customers", value: customers.length.toString(), icon: "👥" },
    { label: "Active This Month", value: "842", icon: "🔥" },
    { label: "Average Lifetime Value", value: formatPrice(2450), icon: "💎" },
    { label: "New Signups", value: "+12", icon: "📈" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Customer Management</h1>
          <p className="text-sm text-slate-500 mt-1">
            Build lasting relationships with your health-conscious community
          </p>
        </div>
        <ExportBtn />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-3xl shadow-soft border border-slate-100">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-lg font-black text-slate-900">{stat.value}</div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2rem] shadow-soft border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table-premium">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Location</th>
                <th>Join Date</th>
                <th>Orders</th>
                <th>Total Spent</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-kumbil-primary/10 to-kumbil-primary/5 flex items-center justify-center text-kumbil-primary font-bold text-sm">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{customer.name}</div>
                        <div className="text-xs text-slate-400">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-xs font-medium text-slate-600">{customer.location || "N/A"}</div>
                  </td>
                  <td className="text-xs text-slate-500">
                    {new Date(customer.joinedAt).toLocaleDateString("en-IN", {
                      day: "numeric", month: "short", year: "numeric"
                    })}
                  </td>
                  <td className="text-center font-bold">{customer.orderCount}</td>
                  <td className="font-bold text-slate-900">{formatPrice(customer.totalSpent)}</td>
                  <td>
                    <button className="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-kumbil-primary transition-all">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
