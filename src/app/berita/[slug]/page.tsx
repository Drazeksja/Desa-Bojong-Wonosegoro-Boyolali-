"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  User,
  Clock,
  MapPin,
  Share2,
  Bookmark,
  ArrowLeft,
  ChevronRight,
  Eye,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  Tag,
  Sparkles,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { NewsArticle, DEFAULT_NEWS } from "@/lib/newsData";

export default function DetailBeritaPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [recentNews, setRecentNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticleAndRecent = async () => {
      setLoading(true);
      try {
        let foundArticle: NewsArticle | null = null;
        const decodedSlug = slug ? decodeURIComponent(slug) : "";

        // 1. Coba ambil langsung dari Supabase Client berdasarkan slug
        if (decodedSlug) {
          const { data, error } = await supabase
            .from("news")
            .select("*")
            .eq("slug", decodedSlug)
            .maybeSingle();

          if (!error && data) {
            foundArticle = data as NewsArticle;
          }
        }

        // 2. Jika belum ketemu, coba cek berdasarkan ID jika formatnya UUID
        if (!foundArticle && decodedSlug) {
          const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(decodedSlug);
          if (isUuid) {
            const { data, error } = await supabase
              .from("news")
              .select("*")
              .eq("id", decodedSlug)
              .maybeSingle();

            if (!error && data) {
              foundArticle = data as NewsArticle;
            }
          }
        }

        // 3. Jika belum ketemu (misal RLS issue), gunakan fallback fetch ke internal API /api/news
        if (!foundArticle && decodedSlug) {
          try {
            const res = await fetch(`/api/news?slug=${encodeURIComponent(decodedSlug)}`);
            const json = await res.json();
            if (json.success && json.data) {
              foundArticle = json.data as NewsArticle;
            }
          } catch (e) {
            console.error("API /api/news fetch fallback error:", e);
          }
        }

        // 4. Fallback ke DEFAULT_NEWS jika data tidak ada di Supabase (berita bawaan demo)
        if (!foundArticle && decodedSlug) {
          const fallback = DEFAULT_NEWS.find(
            (n) => n.slug === decodedSlug || n.id === decodedSlug
          );
          if (fallback) {
            foundArticle = fallback;
          }
        }

        setArticle(foundArticle);

        // 5. Tambah views otomatis jika ada ID berita dari database
        if (foundArticle && foundArticle.id && !foundArticle.id.startsWith("demo-")) {
          supabase
            .from("news")
            .update({ views: (foundArticle.views || 0) + 1 })
            .eq("id", foundArticle.id)
            .then();
        }

        // 6. Ambil berita terkini (Recent News) untuk sidebar
        let fetchedRecent: NewsArticle[] = [];
        try {
          const { data: recentData } = await supabase
            .from("news")
            .select("id,title,slug,category,excerpt,content,featured_image,author,status,is_featured,views,created_at,published_at")
            .eq("status", "terbit")
            .order("created_at", { ascending: false })
            .limit(6);

          if (recentData && recentData.length > 0) {
            fetchedRecent = (recentData as NewsArticle[]).filter(
              (n) => n.slug !== decodedSlug && n.id !== decodedSlug
            );
          }
        } catch (e) {
          console.error("Recent news fetch error:", e);
        }

        if (fetchedRecent.length > 0) {
          setRecentNews(fetchedRecent);
        } else {
          setRecentNews(
            DEFAULT_NEWS.filter((n) => n.slug !== decodedSlug && n.id !== decodedSlug)
          );
        }
      } catch (err) {
        console.error("Error fetching article details:", err);
        const decodedSlug = slug ? decodeURIComponent(slug) : "";
        const fallback = DEFAULT_NEWS.find(
          (n) => n.slug === decodedSlug || n.id === decodedSlug
        );
        setArticle(fallback || null);
        setRecentNews(DEFAULT_NEWS.filter((n) => n.slug !== decodedSlug));
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticleAndRecent();
    }
  }, [slug]);

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return "Terbaru";
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;

    const url = window.location.href;

    // Format Rich HTML: Hanya tautan URL saja berwarna biru dan bergaris bawah (clickable di Word, Docs, Email, dll)
    const htmlFormatted = `<a href="${url}" style="color: #2563eb; text-decoration: underline;">${url}</a>`;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        const textBlob = new Blob([url], { type: "text/plain" });
        const htmlBlob = new Blob([htmlFormatted], { type: "text/html" });
        await navigator.clipboard.write([
          new ClipboardItem({
            "text/plain": textBlob,
            "text/html": htmlBlob,
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(url);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      } catch (fallbackErr) {
        console.error("Gagal menyalin link:", fallbackErr);
      }
    }
  };

  const shareViaWhatsApp = () => {
    if (typeof window !== "undefined" && article) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`*${article.title}*\n\nBaca selengkapnya di Portal Berita Desa Bojong:\n`);
      window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
    }
  };

  const shareViaFacebook = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    }
  };

  const shareViaTwitter = () => {
    if (typeof window !== "undefined" && article) {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(article.title);
      window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, "_blank");
    }
  };

  // Estimate reading time
  const readingTime = article?.content
    ? Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200))
    : 2;

  return (
    <main className="bg-[#f8fafc] min-vh-100 pb-5" style={{ minHeight: "100vh" }}>
      {/* Top Banner / Breadcrumb area */}
      <div className="bg-white border-bottom py-3">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 small">
                <li className="breadcrumb-item">
                  <Link href="/" className="text-decoration-none text-muted">
                    Beranda
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <Link href="/berita" className="text-decoration-none text-muted">
                    Warta Berita
                  </Link>
                </li>
                {article && (
                  <li className="breadcrumb-item active text-truncate" style={{ maxWidth: "250px" }} aria-current="page">
                    {article.category}
                  </li>
                )}
              </ol>
            </nav>

            <Link
              href="/berita"
              className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-inline-flex align-items-center gap-1 text-decoration-none"
            >
              <ArrowLeft size={14} />
              <span>Semua Berita</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-4 py-lg-5">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status" />
            <p className="text-muted small mt-2">Memuat halaman berita nasional...</p>
          </div>
        ) : !article ? (
          <div className="text-center py-5 bg-white rounded-4 p-5 shadow-sm">
            <AlertCircle size={48} className="text-warning mb-3" />
            <h3 className="fw-bold text-dark mb-2">Berita Tidak Ditemukan</h3>
            <p className="text-muted mb-4">
              Maaf, artikel berita yang Anda cari tidak tersedia atau telah dihapus.
            </p>
            <Link href="/berita" className="btn btn-primary rounded-pill px-4">
              Kembali ke Daftar Berita
            </Link>
          </div>
        ) : (
          <div className="row g-4 g-lg-5">
            {/* MAIN ARTICLE COLUMN (National News Editorial Style) */}
            <div className="col-lg-8">
              <article className="bg-white p-4 p-md-5 rounded-4 shadow-sm border border-light">
                
                {/* Category & Badge Row */}
                <div className="d-flex align-items-center gap-2 mb-3 flex-wrap">
                  <span
                    className="badge rounded-pill px-3 py-2 fw-semibold"
                    style={{
                      backgroundColor: "#1e3a8a",
                      color: "#fff",
                      fontSize: "0.8rem",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {article.category.toUpperCase()}
                  </span>

                  {article.is_featured && (
                    <span className="badge bg-danger rounded-pill px-3 py-2 fw-semibold d-inline-flex align-items-center gap-1 text-uppercase" style={{ fontSize: "0.75rem" }}>
                      <Sparkles size={12} /> Berita Utama
                    </span>
                  )}
                </div>

                {/* Main Headline */}
                <h1
                  className="fw-bold mb-3 text-dark"
                  style={{
                    fontFamily: "Georgia, Cambria, 'Times New Roman', serif",
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    lineHeight: 1.3,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {article.title}
                </h1>

                {/* Excerpt / Lead Paragraph */}
                {article.excerpt && (
                  <p
                    className="lead text-secondary fw-normal mb-4"
                    style={{
                      fontStyle: "italic",
                      fontSize: "1.15rem",
                      lineHeight: 1.6,
                      borderLeft: "4px solid #3b82f6",
                      paddingLeft: "1rem",
                    }}
                  >
                    {article.excerpt}
                  </p>
                )}

                {/* Metadata Strip */}
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 py-3 border-top border-bottom mb-4 text-muted small">
                  <div className="d-flex flex-wrap align-items-center gap-3">
                    <div className="d-flex align-items-center gap-1 fw-medium text-dark">
                      <User size={15} className="text-primary" />
                      <span>{article.author || "Redaksi Bojong"}</span>
                    </div>
                    <span>•</span>
                    <div className="d-flex align-items-center gap-1">
                      <Calendar size={15} />
                      <span>{formatDate(article.published_at || article.created_at)}</span>
                    </div>
                    <span>•</span>
                    <div className="d-flex align-items-center gap-1">
                      <Clock size={15} />
                      <span>{readingTime} menit baca</span>
                    </div>
                    {article.views !== undefined && article.views > 0 && (
                      <>
                        <span>•</span>
                        <div className="d-flex align-items-center gap-1">
                          <Eye size={15} />
                          <span>{article.views} pembaca</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Share Quick Icons */}
                  <div className="d-flex align-items-center gap-2">
                    <button
                      type="button"
                      onClick={shareViaWhatsApp}
                      className="btn btn-sm btn-outline-success rounded-circle p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Bagikan ke WhatsApp"
                    >
                      <MessageCircle size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={shareViaFacebook}
                      className="btn btn-sm btn-outline-primary rounded-circle p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Bagikan ke Facebook"
                    >
                      <Facebook size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={shareViaTwitter}
                      className="btn btn-sm btn-outline-info rounded-circle p-2 d-flex align-items-center justify-content-center"
                      style={{ width: "32px", height: "32px" }}
                      title="Bagikan ke Twitter / X"
                    >
                      <Twitter size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={handleShare}
                      className="btn btn-sm btn-light border rounded-pill px-2 py-1 small d-inline-flex align-items-center gap-1"
                      title="Salin tautan"
                    >
                      {copied ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
                      <span style={{ fontSize: "0.75rem" }}>{copied ? "Tersalin" : "Salin"}</span>
                    </button>
                  </div>
                </div>

                {/* Hero Featured Image */}
                <div className="position-relative w-100 rounded-3 overflow-hidden mb-4 shadow-sm" style={{ height: "420px", backgroundColor: "#e2e8f0" }}>
                  <Image
                    src={article.featured_image || "/musren.webp"}
                    alt={article.title}
                    fill
                    priority
                    unoptimized={true}
                    className="object-fit-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                  />
                </div>

                {/* Caption / Location */}
                <div className="text-muted small mb-4 pb-2 border-bottom d-flex align-items-center justify-content-between">
                  <span>
                    <em>Dokumentasi: {article.title}</em>
                  </span>
                  {article.location && (
                    <span className="d-inline-flex align-items-center gap-1 text-primary">
                      <MapPin size={13} /> {article.location}
                    </span>
                  )}
                </div>

                {/* Article Body Content (Typography tuned for reading) */}
                <div
                  className="article-body text-dark"
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: "2.0",
                    color: "#1e293b",
                    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
                  }}
                >
                  {(() => {
                    if (!article.content) {
                      return <p className="mb-4">{article.excerpt}</p>;
                    }

                    // 1. Coba split berdasarkan double newline (\n\n) atau single newline (\n)
                    let paragraphs = article.content
                      .split(/\r?\n+/)
                      .map((p) => p.trim())
                      .filter((p) => p.length > 0);

                    // 2. Jika berita disimpan dalam 1 baris string yang sangat panjang tanpa newline,
                    // pecah setiap 2-3 kalimat menjadi 1 paragraf agar nyaman dibaca.
                    if (paragraphs.length === 1 && paragraphs[0].length > 250) {
                      const sentences = paragraphs[0].match(/[^.!?]+[.!?]+(\s+|$)/g) || [paragraphs[0]];
                      const chunked: string[] = [];
                      let currentChunk = "";
                      let sentenceCount = 0;

                      for (const sentence of sentences) {
                        currentChunk += sentence;
                        sentenceCount++;
                        if (sentenceCount >= 2 && currentChunk.length > 180) {
                          chunked.push(currentChunk.trim());
                          currentChunk = "";
                          sentenceCount = 0;
                        }
                      }
                      if (currentChunk.trim()) {
                        chunked.push(currentChunk.trim());
                      }
                      if (chunked.length > 0) {
                        paragraphs = chunked;
                      }
                    }

                    return paragraphs.map((para, i) => (
                      <p
                        key={i}
                        className="mb-4 pb-1"
                        style={{
                          textAlign: "justify",
                          textJustify: "inter-word",
                          letterSpacing: "0.01em",
                        }}
                      >
                        {i === 0 && (
                          <strong className="text-primary-dark me-2">
                            BOJONG, BOYOLALI —
                          </strong>
                        )}
                        {para}
                      </p>
                    ));
                  })()}
                </div>

                {/* Author Box & Tag Footer */}
                <div className="mt-5 pt-4 border-top">
                  <div className="p-3 bg-light rounded-3 d-flex align-items-center gap-3">
                    <div
                      className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold"
                      style={{ width: "48px", height: "48px", fontSize: "1.2rem" }}
                    >
                      {(article.author || "Admin")[0]}
                    </div>
                    <div>
                      <div className="fw-bold text-dark">{article.author || "Pemerintah Desa Bojong"}</div>
                      <div className="small text-muted">Publikasi Informasi & Humas Resmi Desa Bojong, Kec. Wonosegoro</div>
                    </div>
                  </div>
                </div>

                {/* Share bar at bottom */}
                <div className="mt-4 pt-3 d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <span className="text-muted small fw-semibold">Bagikan artikel ini ke masyarakat:</span>
                  <div className="d-flex gap-2">
                    <button
                      onClick={shareViaWhatsApp}
                      className="btn btn-success btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                    >
                      <MessageCircle size={15} /> WhatsApp
                    </button>
                    <button
                      onClick={shareViaFacebook}
                      className="btn btn-primary btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                    >
                      <Facebook size={15} /> Facebook
                    </button>
                    <button
                      onClick={handleShare}
                      className="btn btn-outline-secondary btn-sm rounded-pill px-3 d-flex align-items-center gap-1"
                    >
                      {copied ? <Check size={15} className="text-success" /> : <Share2 size={15} />}
                      {copied ? "Link Disalin!" : "Salin Link"}
                    </button>
                  </div>
                </div>

              </article>
            </div>

            {/* SIDEBAR COLUMN (National Portal Style: Trending, Recent, Categories) */}
            <div className="col-lg-4">
              <div className="sticky-top" style={{ top: "90px", zIndex: 10 }}>
                
                {/* Recent News Widget */}
                <div className="bg-white p-4 rounded-4 shadow-sm border mb-4">
                  <div className="d-flex align-items-center justify-content-between pb-3 mb-3 border-bottom">
                    <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2" style={{ fontSize: "1.1rem" }}>
                      <TrendingUp size={18} className="text-primary" />
                      Berita Terkini
                    </h5>
                    <Link href="/berita" className="small text-primary text-decoration-none fw-semibold">
                      Lihat Semua
                    </Link>
                  </div>

                  <div className="d-flex flex-column gap-3">
                    {recentNews.map((item, idx) => (
                      <Link
                        key={item.id || idx}
                        href={`/berita/${item.slug || item.id}`}
                        className="text-decoration-none group d-flex gap-3 align-items-start pb-3 border-bottom border-light"
                      >
                        <div
                          className="position-relative rounded-2 overflow-hidden flex-shrink-0"
                          style={{ width: "85px", height: "65px", backgroundColor: "#e2e8f0" }}
                        >
                          <Image
                            src={item.featured_image || "/musren.webp"}
                            alt={item.title}
                            fill
                            unoptimized={true}
                            className="object-fit-cover"
                            sizes="85px"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <span
                            className="badge bg-light text-primary border mb-1"
                            style={{ fontSize: "0.65rem" }}
                          >
                            {item.category}
                          </span>
                          <h6
                            className="fw-bold mb-1 text-dark hover-primary"
                            style={{
                              fontSize: "0.88rem",
                              lineHeight: 1.4,
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {item.title}
                          </h6>
                          <span className="small text-muted" style={{ fontSize: "0.75rem" }}>
                            {formatDate(item.published_at || item.created_at)}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Banner / Layanan Cepat Warga */}
                <div
                  className="p-4 rounded-4 text-white shadow-sm position-relative overflow-hidden mb-4"
                  style={{
                    background: "linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)",
                  }}
                >
                  <span className="badge bg-warning text-dark px-3 py-1 mb-2 fw-semibold">
                    Layanan Mandiri
                  </span>
                  <h5 className="fw-bold mb-2">Butuh Surat Keterangan Desa?</h5>
                  <p className="small opacity-75 mb-3">
                    Ajukan permohonan surat pengantar, domisili, atau usaha secara cepat tanpa antre langsung dari ponsel Anda.
                  </p>
                  <Link
                    href="/layanan-warga/surat"
                    className="btn btn-light btn-sm rounded-pill px-3 fw-semibold text-primary d-inline-flex align-items-center gap-1"
                  >
                    <span>Ajukan Surat Sekarang</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
