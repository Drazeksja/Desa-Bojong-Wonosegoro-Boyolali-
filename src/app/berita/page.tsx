"use client";

import React, {
  useState,
  useEffect,
  Suspense,
} from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Search,
  Calendar,
  User,
  Plus,
  Trash2,
  LogOut,
  ChevronRight,
  Sparkles,
  FileText,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { supabase } from "@/lib/supabase";
import { NewsArticle, DEFAULT_NEWS } from "@/lib/newsData";

/* =========================================================
   CATEGORY
========================================================= */

const CATEGORIES = [
  "Semua",
  "Pemerintahan",
  "Potensi Desa",
  "Kesehatan",
  "Kegiatan Warga",
  "Pengumuman",
];

/* =========================================================
   BERITA CONTENT
========================================================= */

function BeritaContent() {
  const router = useRouter();

  /* -------------------------------------------------------
     ADMIN
  ------------------------------------------------------- */

  const [isAdmin, setIsAdmin] = useState(false);

  /* -------------------------------------------------------
     NEWS
  ------------------------------------------------------- */

  const [newsList, setNewsList] =
    useState<NewsArticle[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedArticle, setSelectedArticle] =
    useState<NewsArticle | null>(null);

  /* -------------------------------------------------------
     SEARCH & FILTER
  ------------------------------------------------------- */

  const [searchQuery, setSearchQuery] =
    useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("Semua");

  /* -------------------------------------------------------
     FORM
  ------------------------------------------------------- */

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [formData, setFormData] = useState({
    title: "",
    category: "Pemerintahan",
    excerpt: "",
    content: "",
    featured_image: "",
    author: "Pemerintah Desa Bojong",
    is_featured: false,
  });

  /* -------------------------------------------------------
     IMAGE
  ------------------------------------------------------- */

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [imagePreview, setImagePreview] =
    useState("");

  const [uploadingImg, setUploadingImg] =
    useState(false);

  /* -------------------------------------------------------
     SUBMIT
  ------------------------------------------------------- */

  const [submitting, setSubmitting] =
    useState(false);

  /* -------------------------------------------------------
     ALERT
  ------------------------------------------------------- */

  const [alertMsg, setAlertMsg] =
    useState<{
      type: "success" | "error";
      text: string;
    } | null>(null);

  /* =======================================================
     CEK ADMIN
  ======================================================= */

  useEffect(() => {
    // Login admin disimpan oleh halaman login.
    // Parameter URL ?admin=true tidak dianggap sebagai autentikasi.
    const storedAuth =
      typeof window !== "undefined" &&
      localStorage.getItem("desa_admin_auth") === "true";

    setIsAdmin(Boolean(storedAuth));
  }, []);

  /* =======================================================
     LOAD NEWS
  ======================================================= */

  const loadNews = async () => {
    setLoading(true);
    setAlertMsg(null);

    try {
      /*
       * Pengunjung publik hanya membaca berita yang sudah terbit.
       * Query ini sengaja disamakan dengan policy RLS:
       * USING (status = 'terbit')
       */
      const { data, error } = await supabase
        .from("news")
        .select(
          "id,title,slug,category,excerpt,content,featured_image,author,status,is_featured,views,created_at,published_at"
        )
        .eq("status", "terbit")
        .order("published_at", {
          ascending: false,
          nullsFirst: false,
        })
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error("SUPABASE NEWS SELECT ERROR:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
        });

        setNewsList([]);
        setAlertMsg({
          type: "error",
          text:
            `Gagal mengambil berita dari Supabase: ${
              error.message || "error tidak diketahui"
            }`,
        });
        return;
      }

      if (data && data.length > 0) {
        setNewsList(data as NewsArticle[]);
      } else {
        // Gunakan DEFAULT_NEWS jika database belum ada baris berita terbit
        setNewsList(DEFAULT_NEWS);
      }
    } catch (error: any) {
      console.error("LOAD NEWS EXCEPTION:", error);
      setNewsList(DEFAULT_NEWS);
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     LOAD SAAT HALAMAN DIBUKA
  ======================================================= */

  useEffect(() => {
    loadNews();
  }, []);

  /* =======================================================
     FILTER NEWS
  ======================================================= */

  const filteredNews =
    newsList.filter((item) => {
      const title =
        item.title?.toLowerCase() || "";

      const excerpt =
        item.excerpt?.toLowerCase() || "";

      const query =
        searchQuery.toLowerCase();

      const matchesSearch =
        title.includes(query) ||
        excerpt.includes(query);

      const matchesCategory =
        selectedCategory === "Semua" ||
        item.category ===
          selectedCategory;

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  /* =======================================================
     UPLOAD GAMBAR
  ======================================================= */

  const handleImageUpload = async (
    file: File
  ) => {
    /*
     * Maksimal 5 MB
     */
    if (file.size > 5 * 1024 * 1024) {
      setAlertMsg({
        type: "error",
        text:
          "Ukuran gambar maksimal 5 MB.",
      });

      return;
    }

    setImageFile(file);

    setImagePreview(
      URL.createObjectURL(file)
    );

    setUploadingImg(true);

    try {
      let uploadedUrl = "";

      // 1. Coba upload langsung dari Supabase Client ke bucket 'news-images'
      try {
        const fileExt = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '.jpg';
        const cleanName = `news-${Date.now()}-${Math.random().toString(36).substring(2, 7)}${fileExt.toLowerCase()}`;
        
        const { data: directUpload, error: directErr } = await supabase.storage
          .from("news-images")
          .upload(`uploads/${cleanName}`, file, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          });

        if (!directErr && directUpload) {
          const { data: urlRes } = supabase.storage
            .from("news-images")
            .getPublicUrl(`uploads/${cleanName}`);
          if (urlRes?.publicUrl) {
            uploadedUrl = urlRes.publicUrl;
          }
        }
      } catch (dErr) {
        // lanjut ke /api/upload
      }

      // 2. Jika belum berhasil, panggil /api/upload
      if (!uploadedUrl) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch("/api/upload", {
          method: "POST",
          body: fd,
        });

        const json = await res.json();

        if (!res.ok || !json.success || !json.url) {
          throw new Error(
            json.message || "Gagal mengunggah gambar."
          );
        }

        uploadedUrl = json.url;
      }

      setFormData((prev) => ({
        ...prev,
        featured_image: uploadedUrl,
      }));

      setAlertMsg({
        type: "success",
        text: "Gambar berhasil diunggah.",
      });
    } catch (error: any) {
      console.error("Upload error:", error);

      setImageFile(null);
      setImagePreview("");

      setFormData((prev) => ({
        ...prev,
        featured_image: "",
      }));

      setAlertMsg({
        type: "error",
        text:
          "Gagal mengunggah gambar: " +
          (error?.message || "Error tidak diketahui."),
      });
    } finally {
      setUploadingImg(false);
    }
  };

  /* =======================================================
     BUAT SLUG
  ======================================================= */

  const createSlug = (
    title: string
  ) => {
    const baseSlug =
      title
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(
          /[\u0300-\u036f]/g,
          ""
        )
        .replace(
          /[^a-z0-9\s-]/g,
          ""
        )
        .replace(
          /\s+/g,
          "-"
        )
        .replace(
          /-+/g,
          "-"
        )
        .replace(
          /^-|-$/g,
          "");

    return (
      baseSlug +
      "-" +
      Date.now()
    );
  };

  /* =======================================================
     TAMBAH BERITA
  ======================================================= */

  const handleCreateNews = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!isAdmin) {
      setAlertMsg({
        type: "error",
        text:
          "Anda tidak memiliki akses sebagai admin.",
      });

      return;
    }

    const title =
      formData.title.trim();

    const content =
      formData.content.trim();

    if (!title) {
      setAlertMsg({
        type: "error",
        text:
          "Judul berita wajib diisi.",
      });

      return;
    }

    if (!content) {
      setAlertMsg({
        type: "error",
        text:
          "Isi berita wajib diisi.",
      });

      return;
    }

    if (uploadingImg) {
      setAlertMsg({
        type: "error",
        text:
          "Tunggu sampai gambar selesai diunggah.",
      });

      return;
    }

    setSubmitting(true);
    setAlertMsg(null);

    try {
      const now =
        new Date().toISOString();

      const articleData = {
        title,

        slug: createSlug(title),

        category:
          formData.category,

        excerpt:
          formData.excerpt.trim() ||
          `${title.substring(
            0,
            120
          )}...`,

        content,

        featured_image:
          formData.featured_image ||
          "/musren.webp",

        author:
          formData.author.trim() ||
          "Pemerintah Desa Bojong",

        status: "terbit",

        is_featured:
          formData.is_featured,

        views: 0,

        created_at: now,

        published_at: now,
      };

      console.log(
        "Menyimpan berita ke Supabase:",
        articleData
      );

      /* ---------------------------------------------------
         INSERT LANGSUNG KE DATABASE
      --------------------------------------------------- */

      const {
        data,
        error,
      } = await supabase
        .from("news")
        .insert(articleData)
        .select("*")
        .single();

      /* ---------------------------------------------------
         JIKA ERROR
      --------------------------------------------------- */

      if (error) {
        console.error(
          "SUPABASE INSERT ERROR:",
          error
        );

        throw new Error(
          error.message ||
            "Berita gagal disimpan ke database."
        );
      }

      /* ---------------------------------------------------
         JIKA DATA TIDAK KEMBALI
      --------------------------------------------------- */

      if (!data) {
        throw new Error(
          "Database tidak mengembalikan data berita."
        );
      }

      console.log(
        "Berita berhasil disimpan:",
        data
      );

      /* ---------------------------------------------------
         UPDATE UI HANYA SETELAH DATABASE BERHASIL
      --------------------------------------------------- */

      setNewsList((prev) => [
        data as NewsArticle,
        ...prev.filter(
          (item) =>
            item.id !== data.id
        ),
      ]);

      /* ---------------------------------------------------
         RESET FORM
      --------------------------------------------------- */

      setFormData({
        title: "",
        category: "Pemerintahan",
        excerpt: "",
        content: "",
        featured_image: "",
        author:
          "Pemerintah Desa Bojong",
        is_featured: false,
      });

      setImageFile(null);
      setImagePreview("");

      setShowAddForm(false);

      /* ---------------------------------------------------
         SUCCESS
      --------------------------------------------------- */

      setAlertMsg({
        type: "success",
        text:
          "Berita berhasil disimpan ke database dan diterbitkan.",
      });
    } catch (error: any) {
      console.error(
        "Gagal membuat berita:",
        error
      );

      /*
       * PENTING:
       * Tidak ada lagi localItem.
       *
       * Kalau database gagal,
       * berita TIDAK dimasukkan ke state.
       */

      setAlertMsg({
        type: "error",
        text:
          error?.message ||
          "Berita gagal disimpan.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  /* =======================================================
     HAPUS BERITA
  ======================================================= */

  const handleDeleteNews = async (
    id: string,
    title: string
  ) => {
    if (!isAdmin) {
      setAlertMsg({
        type: "error",
        text:
          "Anda tidak memiliki akses sebagai admin.",
      });

      return;
    }

    const confirmed =
      window.confirm(
        `Hapus berita:\n\n"${title}"?\n\nData akan dihapus permanen dari database.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setAlertMsg(null);

      const {
        error,
      } = await supabase
        .from("news")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(
          "SUPABASE DELETE ERROR:",
          error
        );

        throw new Error(
          error.message ||
            "Berita gagal dihapus."
        );
      }

      /*
       * UI baru diubah setelah database
       * benar-benar berhasil dihapus.
       */

      setNewsList((prev) =>
        prev.filter(
          (item) =>
            item.id !== id
        )
      );

      setAlertMsg({
        type: "success",
        text:
          "Berita berhasil dihapus dari database.",
      });
    } catch (error: any) {
      console.error(
        "Gagal menghapus berita:",
        error
      );

      setAlertMsg({
        type: "error",
        text:
          error?.message ||
          "Berita gagal dihapus.",
      });
    }
  };

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = async () => {
    localStorage.removeItem(
      "desa_admin_auth"
    );

    localStorage.removeItem(
      "desa_admin_user"
    );

    try {
      await fetch(
        "/api/admin/logout",
        {
          method: "POST",
        }
      );
    } catch {
      // Tidak perlu menghentikan logout
    }

    setIsAdmin(false);

    router.push("/berita");
  };

  /* =======================================================
     FORMAT DATE
  ======================================================= */

  const formatDate = (
    dateStr: string
  ) => {
    try {
      return new Date(
        dateStr
      ).toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      );
    } catch {
      return dateStr;
    }
  };

  /* =======================================================
     REMOVE IMAGE
  ======================================================= */

  const removeImage = () => {
    setImageFile(null);

    setImagePreview("");

    setFormData((prev) => ({
      ...prev,
      featured_image: "",
    }));
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="bg-white min-vh-100 pb-5 pt-5">

      <style>{`

        .news-header {
          opacity: 0;
          transform: translateY(-20px);
          animation:
            newsFadeDown
            0.8s
            cubic-bezier(0.16, 1, 0.3, 1)
            forwards;
        }

        .news-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .news-card:hover {
          transform: translateY(-4px);
          border-color: #cbd5e1;
          box-shadow:
            0 12px 30px
            rgba(0, 0, 0, 0.06);
        }

        .news-image {
          transition:
            transform 0.45s ease;
        }

        .news-card:hover .news-image {
          transform: scale(1.04);
        }

        .admin-form {
          border:
            1px solid
            rgba(44, 82, 130, 0.18);
        }

        @keyframes newsFadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

      `}</style>

      <div
        className="container mt-5 pt-4"
        style={{
          maxWidth: "1080px",
        }}
      >

        {/* =================================================
            ADMIN BANNER
        ================================================= */}

        {isAdmin && (
          <div
            className="
              p-3
              mb-4
              rounded-4
              text-white
              d-flex
              flex-wrap
              align-items-center
              justify-content-between
              gap-3
              shadow-sm
            "
            style={{
              background:
                "linear-gradient(135deg, #172554 0%, #2c5282 100%)",
            }}
          >

            <div className="d-flex align-items-center gap-3">

              <div
                className="
                  rounded-circle
                  bg-white
                  p-2
                  d-flex
                  align-items-center
                  justify-content-center
                "
                style={{
                  width: "40px",
                  height: "40px",
                }}
              >
                <Sparkles
                  size={20}
                  style={{
                    color: "#2c5282",
                  }}
                />
              </div>

              <div>

                <span className="badge bg-warning text-dark fw-bold mb-1">
                  MODE ADMIN DESA AKTIF
                </span>

                <p className="mb-0 small text-white text-opacity-90">
                  Anda dapat menambah,
                  mengelola, dan
                  menghapus berita Desa
                  Bojong.
                </p>

              </div>

            </div>

            <div className="d-flex align-items-center gap-2 ms-auto">

              <button
                onClick={() =>
                  setShowAddForm(
                    !showAddForm
                  )
                }
                className="
                  btn
                  btn-warning
                  btn-sm
                  fw-bold
                  d-inline-flex
                  align-items-center
                  gap-1
                  px-3
                  py-2
                  rounded-pill
                  shadow-sm
                "
              >
                <Plus size={16} />

                <span>
                  {showAddForm
                    ? "Tutup Form"
                    : "Tulis Berita Baru"}
                </span>
              </button>

              <button
                onClick={
                  handleLogout
                }
                className="
                  btn
                  btn-outline-light
                  btn-sm
                  fw-bold
                  d-inline-flex
                  align-items-center
                  gap-1
                  px-3
                  py-2
                  rounded-pill
                "
              >
                <LogOut size={15} />

                <span>
                  Keluar Admin
                </span>
              </button>

            </div>

          </div>
        )}

        {/* =================================================
            ALERT
        ================================================= */}

        {alertMsg && (
          <div
            className={`
              alert
              ${
                alertMsg.type ===
                "success"
                  ? "alert-success"
                  : "alert-danger"
              }
              d-flex
              align-items-center
              justify-content-between
              rounded-3
              py-2
              px-3
              mb-4
            `}
          >

            <div className="d-flex align-items-center gap-2 small">

              {alertMsg.type ===
              "success" ? (
                <CheckCircle2
                  size={18}
                />
              ) : (
                <AlertCircle
                  size={18}
                />
              )}

              <span>
                {alertMsg.text}
              </span>

            </div>

            <button
              type="button"
              className="btn-close btn-sm"
              onClick={() =>
                setAlertMsg(null)
              }
            />

          </div>
        )}

        {/* =================================================
            FORM TAMBAH BERITA
        ================================================= */}

        {isAdmin &&
          showAddForm && (
            <div
              className="
                card
                border-0
                shadow-lg
                rounded-4
                p-4
                p-md-5
                mb-5
                bg-white
                admin-form
              "
            >

              <div className="
                d-flex
                justify-content-between
                align-items-center
                pb-3
                mb-4
                border-bottom
              ">

                <div>

                  <h4
                    className="fw-bold mb-1"
                    style={{
                      color:
                        "#172554",
                      fontFamily:
                        "serif",
                    }}
                  >
                    Formulir Publikasi
                    Berita Baru
                  </h4>

                  <p className="text-muted small mb-0">
                    Berita akan langsung
                    disimpan ke database
                    Supabase.
                  </p>

                </div>

                <button
                  type="button"
                  className="btn-close"
                  onClick={() =>
                    setShowAddForm(
                      false
                    )
                  }
                />

              </div>

              <form
                onSubmit={
                  handleCreateNews
                }
              >

                <div className="row g-3">

                  {/* JUDUL */}

                  <div className="col-md-8">

                    <label className="
                      form-label
                      small
                      fw-bold
                      text-dark
                      text-uppercase
                    ">
                      Judul Berita *
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="
                        Contoh:
                        Pembangunan Saluran
                        Irigasi Desa Bojong
                      "
                      value={
                        formData.title
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          title:
                            e.target
                              .value,
                        })
                      }
                      required
                    />

                  </div>

                  {/* KATEGORI */}

                  <div className="col-md-4">

                    <label className="
                      form-label
                      small
                      fw-bold
                      text-dark
                      text-uppercase
                    ">
                      Kategori *
                    </label>

                    <select
                      className="form-select"
                      value={
                        formData.category
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category:
                            e.target
                              .value,
                        })
                      }
                    >

                      <option value="Pemerintahan">
                        Pemerintahan
                      </option>

                      <option value="Potensi Desa">
                        Potensi Desa
                      </option>

                      <option value="Kesehatan">
                        Kesehatan
                      </option>

                      <option value="Kegiatan Warga">
                        Kegiatan Warga
                      </option>

                      <option value="Pengumuman">
                        Pengumuman
                      </option>

                    </select>

                  </div>

                  {/* EXCERPT */}

                  <div className="col-12">

                    <label className="
                      form-label
                      small
                      fw-bold
                      text-dark
                      text-uppercase
                    ">
                      Ringkasan Singkat
                    </label>

                    <textarea
                      rows={2}
                      className="form-control"
                      placeholder="
                        Ringkasan singkat
                        yang akan tampil
                        pada card berita.
                      "
                      value={
                        formData.excerpt
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          excerpt:
                            e.target
                              .value,
                        })
                      }
                    />

                  </div>

                  {/* GAMBAR */}

                  <div className="col-md-6">

                    <label className="
                      form-label
                      small
                      fw-bold
                      text-dark
                      text-uppercase
                    ">
                      Gambar Sampul
                    </label>

                    <div
                      className="
                        position-relative
                        rounded-3
                        overflow-hidden
                      "
                      style={{
                        border:
                          "2px dashed #cbd5e1",
                        background:
                          imagePreview
                            ? "transparent"
                            : "#f8fafc",
                        minHeight:
                          "140px",
                        cursor:
                          "pointer",
                      }}
                      onClick={() =>
                        document
                          .getElementById(
                            "img-upload-input"
                          )
                          ?.click()
                      }
                    >

                      {imagePreview ? (
                        <div
                          className="
                            position-relative
                            w-100
                          "
                          style={{
                            height:
                              "180px",
                          }}
                        >

                          <img
                            src={
                              imagePreview
                            }
                            alt="Preview"
                            style={{
                              width:
                                "100%",
                              height:
                                "100%",
                              objectFit:
                                "cover",
                              display:
                                "block",
                            }}
                          />

                          <button
                            type="button"
                            className="
                              position-absolute
                              top-0
                              end-0
                              m-2
                              badge
                              border-0
                              text-white
                              px-2
                              py-1
                              rounded-2
                            "
                            style={{
                              background:
                                "rgba(0,0,0,0.65)",
                              fontSize:
                                "0.7rem",
                            }}
                            onClick={(
                              e
                            ) => {
                              e.stopPropagation();
                              removeImage();
                            }}
                          >
                            ✕ Hapus
                          </button>

                          {uploadingImg && (
                            <div
                              className="
                                position-absolute
                                top-0
                                start-0
                                w-100
                                h-100
                                d-flex
                                align-items-center
                                justify-content-center
                              "
                              style={{
                                background:
                                  "rgba(255,255,255,0.75)",
                              }}
                            >

                              <div
                                className="
                                  spinner-border
                                  spinner-border-sm
                                  text-primary
                                "
                              />

                              <span className="ms-2 small fw-semibold">
                                Mengunggah...
                              </span>

                            </div>
                          )}

                        </div>
                      ) : (
                        <div className="
                          d-flex
                          flex-column
                          align-items-center
                          justify-content-center
                          text-muted
                          py-4
                        ">

                          {uploadingImg ? (
                            <>
                              <div className="
                                spinner-border
                                spinner-border-sm
                                text-primary
                                mb-2
                              " />

                              <span className="small">
                                Mengunggah
                                gambar...
                              </span>
                            </>
                          ) : (
                            <>
                              <Plus
                                size={30}
                                className="mb-2"
                              />

                              <span
                                className="small fw-semibold"
                                style={{
                                  color:
                                    "#2c5282",
                                }}
                              >
                                Klik untuk
                                memilih
                                gambar
                              </span>

                              <span
                                className="small mt-1"
                                style={{
                                  fontSize:
                                    "0.72rem",
                                }}
                              >
                                JPG, PNG,
                                WebP —
                                Maks. 5 MB
                              </span>
                            </>
                          )}

                        </div>
                      )}

                    </div>

                    <input
                      id="img-upload-input"
                      type="file"
                      accept="image/*"
                      className="d-none"
                      onChange={(e) => {
                        const file =
                          e.target.files?.[0];

                        if (file) {
                          handleImageUpload(
                            file
                          );
                        }

                        e.currentTarget.value =
                          "";
                      }}
                    />

                    {formData.featured_image &&
                      !uploadingImg && (
                        <div className="
                          form-text
                          text-success
                          small
                          mt-1
                        ">
                          ✓ Gambar berhasil
                          diunggah
                        </div>
                      )}

                  </div>

                  {/* PENULIS */}

                  <div className="col-md-6">

                    <label className="
                      form-label
                      small
                      fw-bold
                      text-dark
                      text-uppercase
                    ">
                      Penulis / Redaksi
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="
                        Pemerintah Desa Bojong
                      "
                      value={
                        formData.author
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          author:
                            e.target
                              .value,
                        })
                      }
                    />

                  </div>

                  {/* KONTEN */}

                  <div className="col-12">

                    <label className="
                      form-label
                      small
                      fw-bold
                      text-dark
                      text-uppercase
                    ">
                      Isi Berita *
                    </label>

                    <textarea
                      rows={14}
                      className="form-control"
                      placeholder="
                        Tuliskan isi berita
                        secara lengkap...
                      "
                      value={
                        formData.content
                      }
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          content:
                            e.target
                              .value,
                        })
                      }
                      required
                      style={{
                        textAlign:
                          "justify",
                        lineHeight:
                          "1.75",
                        fontSize:
                          "0.93rem",
                        resize:
                          "vertical",
                      }}
                    />

                    <div className="
                      form-text
                      small
                      text-muted
                      mt-1
                      d-flex
                      justify-content-between
                    ">
                      <span>💡 <em>Tips: Tekan <strong>Enter 2x</strong> antar paragraf untuk memberi jeda dan jarak baca yang rapi.</em></span>
                      <span>
                        Karakter:{" "}
                        <strong>
                          {formData.content.length.toLocaleString(
                            "id-ID"
                          )}
                        </strong>
                      </span>
                    </div>

                  </div>

                  {/* FEATURED */}

                  <div className="col-12">

                    <div className="
                      form-check
                      p-3
                      rounded-3
                      border
                      bg-light
                    ">

                      <input
                        id="featured-news"
                        type="checkbox"
                        className="form-check-input"
                        checked={
                          formData.is_featured
                        }
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            is_featured:
                              e.target
                                .checked,
                          })
                        }
                      />

                      <label
                        htmlFor="featured-news"
                        className="
                          form-check-label
                          fw-semibold
                        "
                      >
                        Jadikan berita
                        unggulan
                      </label>

                    </div>

                  </div>

                  {/* BUTTON */}

                  <div className="
                    col-12
                    pt-3
                    border-top
                    d-flex
                    justify-content-end
                    gap-2
                  ">

                    <button
                      type="button"
                      className="
                        btn
                        btn-light
                        px-4
                      "
                      onClick={() =>
                        setShowAddForm(
                          false
                        )
                      }
                    >
                      Batal
                    </button>

                    <button
                      type="submit"
                      disabled={
                        submitting ||
                        uploadingImg
                      }
                      className="
                        btn
                        fw-bold
                        text-white
                        px-4
                        d-inline-flex
                        align-items-center
                        gap-2
                      "
                      style={{
                        background:
                          "#2c5282",
                      }}
                    >

                      {submitting ? (
                        <>
                          <span className="
                            spinner-border
                            spinner-border-sm
                          " />

                          <span>
                            Menyimpan...
                          </span>
                        </>
                      ) : (
                        <>
                          <Plus
                            size={16}
                          />

                          <span>
                            Terbitkan
                            Berita
                          </span>
                        </>
                      )}

                    </button>

                  </div>

                </div>

              </form>

            </div>
          )}

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="
          mb-5
          text-center
          border-bottom
          border-secondary
          border-opacity-25
          pb-4
          news-header
        ">

          <div
            className="
              d-inline-flex
              align-items-center
              gap-2
              px-3
              py-1
              rounded-pill
              mb-2
            "
            style={{
              background:
                "rgba(217,119,6,0.08)",
              border:
                "1px solid rgba(217,119,6,0.2)",
            }}
          >

            <span
              className="
                fw-semibold
                text-uppercase
              "
              style={{
                color:
                  "var(--accent)",
                letterSpacing:
                  "2px",
                fontSize:
                  "0.72rem",
              }}
            >
              Portal Berita ·
              Informasi Desa
              Bojong
            </span>

          </div>

          <h1
            className="
              display-4
              fw-bold
              mt-2
            "
            style={{
              color:
                "var(--primary-dark)",
              fontFamily:
                "serif",
            }}
          >
            Kabar & Warta Desa
          </h1>

          <p
            className="
              text-muted
              mt-3
              mx-auto
            "
            style={{
              maxWidth:
                "600px",
              lineHeight:
                1.7,
            }}
          >
            Pusat publikasi
            informasi kegiatan
            pemerintahan,
            pembangunan,
            ekonomi UMKM,
            dan dinamika
            kemasyarakatan
            Desa Bojong.
          </p>

        </div>

        {/* =================================================
            SEARCH & FILTER
        ================================================= */}

        <div className="
          row
          g-3
          align-items-center
          justify-content-between
          mb-5
        ">

          <div className="col-lg-8">

            <div className="
              d-flex
              flex-wrap
              gap-2
            ">

              {CATEGORIES.map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        cat
                      )
                    }
                    className={`
                      btn
                      btn-sm
                      rounded-pill
                      px-3
                      py-1
                      fw-semibold
                    `}
                    style={{
                      backgroundColor:
                        selectedCategory ===
                        cat
                          ? "#2c5282"
                          : "#f8fafc",
                      color:
                        selectedCategory ===
                        cat
                          ? "#fff"
                          : "#64748b",
                      border:
                        "1px solid " +
                        (selectedCategory ===
                        cat
                          ? "#2c5282"
                          : "#e2e8f0"),
                      fontSize:
                        "0.82rem",
                    }}
                  >
                    {cat}
                  </button>
                )
              )}

            </div>

          </div>

          <div className="col-lg-4">

            <div className="
              input-group
              rounded-pill
              overflow-hidden
              border
              shadow-sm
              bg-light
            ">

              <span className="
                input-group-text
                bg-transparent
                border-0
                text-muted
                ps-3
              ">
                <Search
                  size={16}
                />
              </span>

              <input
                type="text"
                className="
                  form-control
                  bg-transparent
                  border-0
                  py-2
                "
                placeholder="
                  Cari judul berita...
                "
                value={
                  searchQuery
                }
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                style={{
                  fontSize:
                    "0.88rem",
                }}
              />

              {searchQuery && (
                <button
                  type="button"
                  className="
                    btn
                    btn-sm
                    bg-transparent
                    border-0
                    text-muted
                    pe-3
                  "
                  onClick={() =>
                    setSearchQuery(
                      ""
                    )
                  }
                >
                  &times;
                </button>
              )}

            </div>

          </div>

        </div>

        {/* =================================================
            LOADING
        ================================================= */}

        {loading && (
          <div className="
            text-center
            py-5
          ">

            <div
              className="
                spinner-border
                text-primary
              "
              role="status"
            />

            <p className="
              text-muted
              small
              mt-2
            ">
              Memuat daftar
              warta desa...
            </p>

          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!loading &&
          filteredNews.length ===
            0 && (
            <div className="
              text-center
              py-5
              my-4
              p-5
              rounded-4
              border
              bg-light
            ">

              <FileText
                size={42}
                className="
                  text-muted
                  opacity-50
                  mb-3
                "
              />

              <h5 className="
                fw-bold
                text-dark
              ">
                Tidak ada berita
                yang ditemukan
              </h5>

              <p className="
                text-muted
                small
                mb-0
              ">
                Coba ubah kata kunci
                pencarian atau
                pilih kategori lain.
              </p>

            </div>
          )}

        {/* =================================================
            NEWS GRID
        ================================================= */}

        {!loading &&
          filteredNews.length >
            0 && (
            <div className="row g-4">

              {filteredNews.map(
                (article) => (
                  <div
                    key={article.id}
                    className="
                      col-md-6
                      col-lg-4
                    "
                  >

                    <article
                      className="
                        news-card
                        h-100
                        d-flex
                        flex-column
                      "
                    >

                      {/* FOTO */}

                      <Link
                        href={`/berita/${article.slug || article.id}`}
                        className="
                          position-relative
                          w-100
                          overflow-hidden
                          d-block
                        "
                        style={{
                          height:
                            "210px",
                          backgroundColor:
                            "#e2e8f0",
                        }}
                      >

                        <Image
                          src={
                            article.featured_image ||
                            "/musren.webp"
                          }
                          alt={
                            article.title
                          }
                          fill
                          className="
                            object-fit-cover
                            news-image
                          "
                          sizes="
                            (max-width: 768px)
                            100vw,
                            (max-width: 1200px)
                            50vw,
                            360px
                          "
                        />

                        <div className="
                          position-absolute
                          top-0
                          start-0
                          m-3
                        ">

                          <span
                            className="
                              badge
                              rounded-pill
                              shadow-sm
                              fw-bold
                              px-3
                              py-1
                            "
                            style={{
                              backgroundColor:
                                "#2c5282",
                              color:
                                "#fff",
                              fontSize:
                                "0.72rem",
                            }}
                          >
                            {
                              article.category
                            }
                          </span>

                        </div>

                      </Link>

                      {/* BODY */}

                      <div className="
                        p-4
                        d-flex
                        flex-column
                        flex-grow-1
                      ">

                        <div className="
                          d-flex
                          align-items-center
                          gap-3
                          text-muted
                          small
                          mb-2
                        ">

                          <span className="
                            d-inline-flex
                            align-items-center
                            gap-1
                          ">
                            <Calendar
                              size={13}
                            />

                            <span>
                              {formatDate(
                                article.created_at
                              )}
                            </span>
                          </span>

                          <span>
                            &bull;
                          </span>

                          <span className="
                            d-inline-flex
                            align-items-center
                            gap-1
                          ">
                            <User
                              size={13}
                            />

                            <span>
                              {article.author ||
                                "Admin"}
                            </span>
                          </span>

                        </div>

                        <h5
                          className="
                            fw-bold
                            mb-2
                          "
                          style={{
                            color:
                              "#0f172a",
                            fontSize:
                              "1.05rem",
                            lineHeight:
                              1.45,
                            fontFamily:
                              "serif",
                          }}
                        >

                          <Link
                            href={`/berita/${article.slug || article.id}`}
                            className="
                              text-start
                              text-decoration-none
                              text-dark
                              fw-bold
                              hover-primary
                              d-block
                            "
                            style={{
                              fontSize: "1.05rem",
                              lineHeight: 1.45,
                              fontFamily: "serif",
                            }}
                          >
                            {article.title}
                          </Link>

                        </h5>

                        <p
                          className="
                            text-muted
                            small
                            mb-4
                            flex-grow-1
                          "
                          style={{
                            lineHeight:
                              1.65,
                            display:
                              "-webkit-box",
                            WebkitLineClamp:
                              3,
                            WebkitBoxOrient:
                              "vertical",
                            overflow:
                              "hidden",
                          }}
                        >
                          {
                            article.excerpt
                          }
                        </p>

                        <div className="
                          pt-3
                          border-top
                          d-flex
                          align-items-center
                          justify-content-between
                          mt-auto
                        ">

                          <Link
                            href={`/berita/${article.slug || article.id}`}
                            className="
                              fw-semibold
                              small
                              d-inline-flex
                              align-items-center
                              gap-1
                              text-decoration-none
                            "
                            style={{
                              color: "#2c5282",
                            }}
                          >
                            <span>Baca Selengkapnya</span>
                            <ChevronRight size={14} />
                          </Link>

                          {isAdmin && (
                            <button
                              type="button"
                              onClick={() =>
                                handleDeleteNews(
                                  article.id,
                                  article.title
                                )
                              }
                              className="
                                btn
                                btn-outline-danger
                                btn-sm
                                p-1
                                px-2
                                rounded-2
                              "
                              title="Hapus Berita"
                            >
                              <Trash2
                                size={14}
                              />
                            </button>
                          )}

                        </div>

                      </div>

                    </article>

                  </div>
                )
              )}

            </div>
          )}

      </div>
    </main>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function BeritaPage() {
  return (
    <Suspense
      fallback={
        <main className="
          bg-white
          min-vh-100
          py-5
          d-flex
          align-items-center
          justify-content-center
        ">
          <div className="text-center">

            <div
              className="
                spinner-border
                text-primary
              "
              role="status"
            />

            <p className="
              text-muted
              small
              mt-2
            ">
              Memuat halaman
              warta desa...
            </p>

          </div>
        </main>
      }
    >
      <BeritaContent />
    </Suspense>
  );
}