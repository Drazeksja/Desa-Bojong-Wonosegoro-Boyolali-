"use client";

import Image from "next/image";
import { useState } from "react";

type Kegiatan =
  | "Semua"
  | "Kegiatan Desa"
  | "Sosial"
  | "Pemerintahan"
  | "KKN UNDIP 2026";

interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<Kegiatan, "Semua">;
  date: string;
  image: string;
}

const galleryData: GalleryItem[] = [
  {
    id: 1,
    title: "Pemberangkatan & Penerimaan KKN",
    category: "KKN UNDIP 2026",
    date: "9 Juli 2026",
    image: "/awal.jpeg",
  },
  {
    id: 2,
    title: "Kunjungan & Observasi Desa",
    category: "Pemerintahan",
    date: "13 Juli 2026",
    image: "/sowan.jpeg",
  },
  {
    id: 3,
    title: "Kunjungan UMKM Getuk",
    category: "Kegiatan Desa",
    date: "10 Juli 2026",
    image: "/santow.jpeg",
  },
  {
    id: 4,
    title: "Kunjungan UMKM Jamu",
    category: "Kegiatan Desa",
    date: "14 Juli 2026",
    image: "/jmu.jpeg",
  },
  {
    id: 5,
    title: "Kunjungan SDN 1 & SDN 2 Bojong",
    category: "Kegiatan Desa",
    date: "13 Juli 2026",
    image: "/sd.jpeg",
  },
  {
    id: 6,
    title: "Kunjungan TPQ",
    category: "Sosial",
    date: "13 Juli 2026",
    image: "/tpa.jpeg",
  },
  {
    id: 7,
    title: "Senam Bersama SDN 2 Bojong",
    category: "Sosial",
    date: "14 Juli 2026",
    image: "/sd.jpeg",
  },
  {
    id: 8,
    title: "Posyandu",
    category: "Sosial",
    date: "10 Juli 2026",
    image: "/psndu.png",
  },
  {
    id: 9,
    title: "Market Day SDN 2 Bojong",
    category: "Sosial",
    date: "17 Juli 2026",
    image: "/sd.jpeg",
  },
  {
    id: 10,
    title: "Kerja Bakti Bersama Warga",
    category: "Sosial",
    date: "19 Juli 2026",
    image: "/kb.jpeg",
  },
  {
    id: 11,
    title: "Kegiatan PKK",
    category: "Sosial",
    date: "19 Juli 2026",
    image: "/pkk.jpeg",
  },
  {
    id: 12,
    title: "Pelaksanaan Proker Eco Enzyme",
    category: "KKN UNDIP 2026",
    date: "19 Juli 2026",
    image: "/mono.jpeg",
  },
  {
    id: 13,
    title: "Pelaksanaan Proker Literasi Keuangan",
    category: "KKN UNDIP 2026",
    date: "19 Juli 2026",
    image: "/mono.jpeg",
  },
  {
    id: 14,
    title: "Pelaksanaan Proker Sejarah",
    category: "KKN UNDIP 2026",
    date: "23 Juli 2026",
    image: "/toniii.jpeg",
  },
  {
    id: 15,
    title: "Pelaksanaan Proker Komputer",
    category: "KKN UNDIP 2026",
    date: "23 Juli 2026",
    image: "/putra.jpeg",
  },
  {
    id: 16,
    title: "Musyawarah Perencanaan Pembangunan Desa",
    category: "Pemerintahan",
    date: "24 Juli 2026",
    image: "/musren.webp",
  },
  {
    id: 17,
    title: "Pelaksanaan Proker Bahasa",
    category: "KKN UNDIP 2026",
    date: "27 Juli 2026",
    image: "/rudisd.jpeg",
  },
  {
    id: 18,
    title: "Pelaksanaan Proker Konsep Gaya Gerak",
    category: "KKN UNDIP 2026",
    date: "28 Juli 2026",
    image: "/atun.jpeg",
  },
  {
    id: 19,
    title: "Pelaksanaan Proker Anti Bullying",
    category: "KKN UNDIP 2026",
    date: "29 Juli 2026",
    image: "/gina.jpeg",
  },
  {
    id: 20,
    title: "Pelaksanaan Proker Multidisiplin",
    category: "KKN UNDIP 2026",
    date: "3 Agustus 2026",
    image: "/multi.jpeg",
  },
  {
    id: 21,
    title: "Kegiatan GEMA & GEMARI",
    category: "Sosial",
    date: "30 Juli 2026",
    image: "/sd.jpeg",
  },
  {
    id: 22,
    title: "Kegiatan Lomba 17 Agustus",
    category: "Kegiatan Desa",
    date: "8 Agustus 2026",
    image: "/17.png",
  },
  {
    id: 23,
    title: "Persiapan & Pentas Seni Warga",
    category: "Sosial",
    date: "16 Agustus 2026",
    image: "/17.png",
  },
  {
    id: 24,
    title: "Karnaval SDN 1 Bojong",
    category: "Sosial",
    date: "12 Agustus 2026",
    image: "/17.png",
  },
  {
    id: 25,
    title: "Upacara HUT Kemerdekaan RI",
    category: "Kegiatan Desa",
    date: "17 Agustus 2026",
    image: "/17.png",
  },
];

const filters: Kegiatan[] = [
  "Semua",
  "Kegiatan Desa",
  "Sosial",
  "Pemerintahan",
  "KKN UNDIP 2026",
];

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Kegiatan>("Semua");

  const filteredGallery =
    activeFilter === "Semua"
      ? galleryData
      : galleryData.filter((item) => item.category === activeFilter);

  return (
    <main className="bg-light min-vh-100">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <section
        className="position-relative d-flex align-items-center"
        style={{
          minHeight: "330px",
          background:
            "linear-gradient(135deg, var(--primary-dark), var(--primary))",
        }}
      >
        <div className="container position-relative z-10">
          <div className="row">
            <div className="col-lg-8">
              <p
                className="text-uppercase fw-semibold mb-3"
                style={{
                  color: "var(--accent-light)",
                  letterSpacing: "3px",
                  fontSize: "0.8rem",
                }}
              >
                Potensi Desa
              </p>

              <h1
                className="display-4 fw-bold text-white mb-3"
                style={{
                  fontFamily: "var(--font-cinzel), serif",
                }}
              >
                Galeri Desa
              </h1>

              <p
                className="text-white mb-0"
                style={{
                  maxWidth: "650px",
                  opacity: 0.85,
                  fontSize: "1.05rem",
                }}
              >
                Dokumentasi berbagai kegiatan, pelayanan, pembangunan, dan
                aktivitas masyarakat Desa Bojong.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          GALERI
      ===================================================== */}
      <section className="py-5">
        <div className="container">
          {/* FILTER */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {filters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className="btn"
                  style={{
                    padding: "0.65rem 1.25rem",
                    borderRadius: "999px",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    border: `1px solid ${
                      isActive ? "var(--primary)" : "var(--border)"
                    }`,
                    backgroundColor: isActive
                      ? "var(--primary)"
                      : "var(--bg-white)",
                    color: isActive ? "#ffffff" : "var(--text-main)",
                  }}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* JUMLAH FOTO */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2
                className="h4 fw-bold mb-1"
                style={{ color: "var(--primary)" }}
              >
                Dokumentasi Kegiatan
              </h2>

              <p className="text-muted mb-0 small">
                Menampilkan {filteredGallery.length} dokumentasi
                {activeFilter !== "Semua" && ` • ${activeFilter}`}
              </p>
            </div>
          </div>

          {/* GRID FOTO */}
          <div className="row g-4">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="col-12 col-md-6 col-lg-4"
              >
                <article
                  className="gallery-card bg-white h-100 overflow-hidden"
                  style={{
                    border: "1px solid var(--border)",
                  }}
                >
                  {/* FOTO */}
                  <div
                    className="position-relative w-100 overflow-hidden"
                    style={{
                      aspectRatio: "16 / 9",
                    }}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="gallery-image"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* INFORMASI */}
                  <div className="p-4">
                    <span
                      className="d-inline-block mb-2"
                      style={{
                        color: "var(--accent)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {item.category}
                    </span>

                    <h3
                      className="h5 fw-bold mb-2"
                      style={{ color: "var(--primary)" }}
                    >
                      {item.title}
                    </h3>

                    <p className="text-muted small mb-0">
                      {item.date}
                    </p>
                  </div>
                </article>
              </div>
            ))}
          </div>

          {/* TIDAK ADA DATA */}
          {filteredGallery.length === 0 && (
            <div className="text-center py-5">
              <h3
                className="h5 fw-bold"
                style={{ color: "var(--primary)" }}
              >
                Belum ada dokumentasi
              </h3>

              <p className="text-muted mb-0">
                Dokumentasi untuk kategori ini belum tersedia.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          STYLE KHUSUS GALERI
      ===================================================== */}
      <style jsx>{`
        .gallery-card {
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .gallery-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
        }

        .gallery-image {
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .gallery-card:hover .gallery-image {
          transform: scale(1.06);
        }

        button {
          transition:
            background-color 0.2s ease,
            color 0.2s ease,
            border-color 0.2s ease;
        }

        @media (max-width: 767.98px) {
          section:first-child {
            min-height: 280px !important;
          }
        }
      `}</style>
    </main>
  );
}