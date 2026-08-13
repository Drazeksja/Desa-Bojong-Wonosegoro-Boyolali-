"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { NewsItem } from "@/types/news";
import { Plus, Pencil, Trash2, LogOut } from "lucide-react";

const NAVY = "#152238";
const MAROON = "#6B2325";
const BORDER = "#C9C2AE";
const MUTED = "#8B96A5";
const LINK_BLUE = "#1B3B6F";
const SERIF = 'Georgia, "Times New Roman", serif';

export default function BeritaAdminPage() {
  const router = useRouter();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/berita");
  };

  const fetchNews = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("news").select("*").order("created_at", { ascending: false });
    if (!error && data) setNews(data as NewsItem[]);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Hapus berita "${title}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (!error) fetchNews();
  };

  const statusLabel = (status: string) => {
    const map: Record<string, { text: string; color: string }> = {
      terbit: { text: "Terbit", color: LINK_BLUE },
      draft: { text: "Draft", color: MUTED },
      arsip: { text: "Arsip", color: MAROON },
    };
    return map[status] ?? { text: status, color: MUTED };
  };

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4">
        <div className="d-flex justify-content-between align-items-end mb-4 pb-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div>
            <h6 className="fw-bold text-uppercase mb-1" style={{ color: MAROON, letterSpacing: "2px", fontSize: "0.75rem" }}>ADMIN</h6>
            <h1 className="fw-bold mb-0" style={{ color: NAVY, fontFamily: SERIF }}>Kelola Berita</h1>
          </div>
          <div className="d-flex gap-2">
            <Link href="/berita/admin/new" className="btn fw-bold text-white d-inline-flex align-items-center gap-2 px-3 py-2" style={{ background: NAVY, borderRadius: "2px" }}>
              <Plus size={16} /> Berita Baru
            </Link>
            <button onClick={handleLogout} className="btn fw-bold d-inline-flex align-items-center gap-2 px-3 py-2" style={{ border: `1px solid ${MAROON}`, color: MAROON, borderRadius: "2px", background: "transparent" }}>
              <LogOut size={16} /> Keluar
            </button>
          </div>
        </div>

        {loading && <p className="text-muted">Memuat...</p>}

        {!loading && (
          <table className="table" style={{ borderColor: BORDER }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${NAVY}` }}>
                <th className="text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Judul</th>
                <th className="text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Kategori</th>
                <th className="text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Status</th>
                <th className="text-uppercase" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Tanggal</th>
                <th className="text-uppercase text-end" style={{ fontSize: "0.75rem", letterSpacing: "1px" }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {news.map((item) => (
                <tr key={item.id} style={{ borderBottom: `1px solid ${BORDER}` }}>
                  <td className="fw-bold" style={{ color: NAVY }}>{item.title}</td>
                  <td className="text-muted">{item.category}</td>
                  <td>
                    <span className="fw-bold" style={{ color: statusLabel(item.status).color, fontSize: "0.8rem" }}>
                      {statusLabel(item.status).text}
                    </span>
                  </td>
                  <td className="text-muted" style={{ fontSize: "0.85rem" }}>
                    {new Date(item.created_at).toLocaleDateString("id-ID")}
                  </td>
                  <td className="text-end">
                    <Link href={`/berita/admin/${item.id}`} className="btn btn-sm me-2" style={{ border: `1px solid ${NAVY}`, borderRadius: "2px" }}>
                      <Pencil size={14} />
                    </Link>
                    <button onClick={() => handleDelete(item.id, item.title)} className="btn btn-sm" style={{ border: `1px solid ${MAROON}`, color: MAROON, borderRadius: "2px" }}>
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {news.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">Belum ada berita.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
