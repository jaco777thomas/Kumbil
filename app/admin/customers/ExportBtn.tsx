"use client";

export default function ExportBtn() {
  const handleExport = async () => {
    try {
      window.location.href = "/api/customers/export";
    } catch (err) {
      alert("Export failed");
    }
  };

  return (
    <button 
      onClick={handleExport}
      className="px-5 py-2.5 bg-kumbil-primary text-white rounded-2xl text-sm font-bold hover:bg-kumbil-primary-dark transition-all shadow-lg shadow-kumbil-primary/20"
    >
      Export Customer List
    </button>
  );
}
