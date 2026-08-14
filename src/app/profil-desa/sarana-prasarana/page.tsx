"use client";

import { useMemo, useState } from "react";

/* =========================================================
   DATA — Sarana & Prasarana Desa Bojong
   (dipindahkan langsung dari data resmi desa, 20 titik)
   Setiap fasilitas punya foto landscape (.webp) sendiri.
   Ganti path "image" di bawah dengan lokasi foto asli,
   misalnya taruh file di /public/images/facilities/ lalu
   akses sebagai "/images/facilities/nama-file.webp"
   ========================================================= */

type CategoryKey =
  | "keamanan"
  | "pendidikan"
  | "infrastruktur"
  | "ibadah"
  | "kesehatan"
  | "olahraga"
  | "pemerintahan";

type Facility = {
  id: number;
  name: string;
  address: string;
  description: string;
  category: CategoryKey;
  image: string;
};

const FACILITIES: Facility[] = [
  {
    id: 1,
    name: "Poskamling RT 005, RW 001",
    address: "RT 005, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Pos keamanan lingkungan yang digunakan sebagai tempat kegiatan ronda dan pemantauan keamanan serta ketertiban masyarakat di lingkungan RT 05/RW 01.",
    category: "keamanan",
    image: "/PK1.jpeg",
  },
  {
    id: 2,
    name: "SDN 01 Bojong",
    address: "RT 006, RW 002, Bogor Pereng, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas pendidikan dasar yang digunakan untuk menunjang kegiatan belajar mengajar bagi masyarakat Desa Bojong dan sekitarnya.",
    category: "pendidikan",
    image: "/sd1.jpeg",
  },
  {
    id: 3,
    name: "Jembatan Kliyo",
    address: "RT 005, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Infrastruktur penghubung antarwilayah yang mendukung mobilitas masyarakat serta akses transportasi dan aktivitas sehari-hari warga.",
    category: "infrastruktur",
    image: "/JK1.jpeg",
  },
  {
    id: 4,
    name: "Poskamling RT 001, RW 002",
    address:
      "RT 001, RW 002, Bogor Pereng, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas keamanan lingkungan yang dimanfaatkan sebagai tempat ronda dan kegiatan pemantauan keamanan serta ketertiban warga di lingkungan RT 001/RW 002.",
    category: "keamanan",
    image: "/PK2.jpeg",
  },
  {
    id: 5,
    name: "SDN 02 Bojong",
    address:
      "RT 004, RW 004, Bogor Krajan, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas pendidikan dasar yang digunakan untuk mendukung kegiatan belajar mengajar bagi masyarakat Desa Bojong dan sekitarnya.",
    category: "pendidikan",
    image: "/sd2.jpeg",
  },
  {
    id: 6,
    name: "Balai Desa Bojong",
    address:
      "RT 004, RW 004, Bogor Krajan, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas pemerintahan desa yang digunakan untuk pelayanan administrasi, kegiatan pemerintahan, serta berbagai kegiatan masyarakat Desa Bojong.",
    category: "pemerintahan",
    image: "/BD.jpeg",
  },
  {
    id: 7,
    name: "PAUD Al-Hidayah",
    address: "RT 002, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas pendidikan anak usia dini yang digunakan untuk mendukung proses pembelajaran dan perkembangan anak di lingkungan Desa Bojong.",
    category: "pendidikan",
    image: "/PAUD.webp",
  },
  {
    id: 8,
    name: "Masjid Al-Muchsinin",
    address: "RT 003, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Sarana ibadah masyarakat yang digunakan untuk kegiatan keagamaan, ibadah, serta aktivitas sosial kemasyarakatan.",
    category: "ibadah",
    image: "/MASJID.webp",
  },
  {
    id: 9,
    name: "TPA Al-Falah",
    address: "RT 002, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas pendidikan keagamaan yang digunakan untuk mendukung kegiatan pembelajaran Al-Qur'an dan pendidikan agama bagi anak-anak di lingkungan Desa Bojong.",
    category: "pendidikan",
    image: "/TPA.webp",
  },
  {
    id: 10,
    name: "Masjid Al-Huda",
    address:
      "RT 001, RW 002, Bogor Pereng, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Sarana ibadah masyarakat yang digunakan untuk kegiatan keagamaan, ibadah, serta aktivitas sosial dan kemasyarakatan warga.",
    category: "ibadah",
    image: "/MASJID2.webp",
  },
  {
    id: 11,
    name: "Jembatan Bogor Pereng",
    address:
      "RT 006, RW 001, Bogor Pereng, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Infrastruktur penghubung yang mendukung akses dan mobilitas masyarakat serta memperlancar aktivitas warga antarwilayah.",
    category: "infrastruktur",
    image: "/JK2.jpeg",
  },
  {
    id: 12,
    name: "Jembatan Kliyo II",
    address: "RT 002, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Infrastruktur penghubung yang menunjang mobilitas masyarakat dan mempermudah akses transportasi serta aktivitas sehari-hari warga.",
    category: "infrastruktur",
    image: "/JK3.jpeg",
  },
  {
    id: 13,
    name: "Poskamling Bogor Krajan",
    address:
      "RT 005, RW 004, Bogor Krajan, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas keamanan lingkungan yang digunakan untuk kegiatan ronda dan pemantauan keamanan serta ketertiban masyarakat RT 005 RW 004.",
    category: "keamanan",
    image: "/PK3.jpeg",
  },
  {
    id: 14,
    name: "Polindes",
    address:
      "RT 006, RW 001, Dukuh Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas pelayanan kesehatan yang digunakan untuk mendukung pelayanan kesehatan dasar bagi masyarakat Desa Bojong.",
    category: "kesehatan",
    image: "/PL.jpeg",
  },
  {
    id: 15,
    name: "Jembatan Bogor Krajan",
    address:
      "RT 005, RW 004, Bogor Krajan, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Infrastruktur penghubung yang mendukung kelancaran akses transportasi dan mobilitas masyarakat antarwilayah.",
    category: "infrastruktur",
    image: "/JK4.jpeg",
  },
  {
    id: 16,
    name: "Lapangan Sepak Bola",
    address: "Bogor Pereng, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Sarana olahraga yang digunakan untuk kegiatan sepak bola, aktivitas olahraga, serta kegiatan masyarakat di Desa Bojong.",
    category: "olahraga",
    image: "/LSB.jpeg",
  },
  {
    id: 17,
    name: "Poskamling Kliyo",
    address: "RT 006, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas keamanan lingkungan yang dimanfaatkan sebagai tempat ronda dan pemantauan keamanan serta ketertiban warga RT 006 RW 001.",
    category: "keamanan",
    image: "/PK4.jpeg",
  },
  {
    id: 18,
    name: "Poskamling Bogor Krajan II",
    address:
      "RT 004, RW 004, Bogor Krajan, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas pendukung keamanan lingkungan yang digunakan untuk kegiatan ronda dan menjaga keamanan serta ketertiban masyarakat RT 004, RW 004.",
    category: "keamanan",
    image: "/PK5.jpeg",
  },
  {
    id: 19,
    name: "Jembatan Kliyo III",
    address:
      "RT 001/002, RW 001, Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Infrastruktur penghubung yang menunjang mobilitas masyarakat dan mempermudah akses transportasi serta aktivitas sehari-hari warga.",
    category: "infrastruktur",
    image: "/JK6.webp",
  },
  {
    id: 20,
    name: "Poskamling Dukuh Kliyo",
    address:
      "RT 003, RW 001, Dukuh Kliyo, Bojong, Kec. Wonosegoro, Kab. Boyolali",
    description:
      "Fasilitas keamanan lingkungan yang digunakan sebagai tempat ronda dan mendukung kegiatan pemantauan keamanan serta ketertiban warga RT 003 RW 001.",
    category: "keamanan",
    image: "/PK6.jpeg",
  },
];

/* =========================================================
   ICON (khusus untuk pin alamat, tetap SVG kecil karena
   bukan foto identitas fasilitas)
   ========================================================= */

type IconProps = { size?: number; color?: string; className?: string };

const PinIcon = ({ size = 16, color = "currentColor", className }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke={color}
    fill="none"
    strokeWidth={1.6}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 21s-6.3-5.5-6.3-10.8A6.3 6.3 0 0 1 18.3 10.2C18.3 15.5 12 21 12 21Z" />
    <circle cx="12" cy="10.2" r="2.1" />
  </svg>
);

/* =========================================================
   KATEGORI — hanya label & warna (dipakai untuk badge & dropdown),
   fotonya sudah melekat langsung di setiap data fasilitas di atas.
   ========================================================= */

const CATEGORIES: {
  key: CategoryKey;
  label: string;
  color: string;
}[] = [
  { key: "keamanan", label: "Keamanan", color: "var(--primary-dark)" },
  { key: "pendidikan", label: "Pendidikan", color: "var(--accent)" },
  { key: "infrastruktur", label: "Infrastruktur", color: "var(--primary)" },
  { key: "ibadah", label: "Ibadah", color: "var(--accent-light)" },
  { key: "kesehatan", label: "Kesehatan", color: "var(--primary-light)" },
  { key: "olahraga", label: "Olahraga", color: "var(--accent)" },
  { key: "pemerintahan", label: "Pemerintahan", color: "var(--primary-dark)" },
];

const getCategory = (key: CategoryKey) =>
  CATEGORIES.find((c) => c.key === key) ?? CATEGORIES[0];

/* =========================================================
   PAGE
   ========================================================= */

export default function SaranaPrasaranaPage() {
  const [active, setActive] = useState<CategoryKey | "semua">("semua");

  const counts = useMemo(() => {
    const map = new Map<CategoryKey, number>();
    FACILITIES.forEach((f) => map.set(f.category, (map.get(f.category) ?? 0) + 1));
    return map;
  }, []);

  const filtered = useMemo(() => {
    if (active === "semua") return FACILITIES;
    return FACILITIES.filter((f) => f.category === active);
  }, [active]);

  return (
    <main className="sp-page">
      {/* HERO */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <p className="fw-bold text-uppercase mb-2" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>
            MONOGRAFI DIGITAL &middot; DATA SARANA PRASARANA DESA BOJONG
          </p>
          <h1 className="display-4 fw-bold mt-1" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>
            Sarana &amp; Prasarana 
          </h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '640px', lineHeight: 1.7 }}>
            Titik sarana dan prasarana yang tersebar di wilayah Desa Bojong menopang keamanan, pendidikan, kesehatan, ibadah,hingga mobilitas warga sehari-hari.
          </p>
        </div>

      <div className="sp-divider container" />

      {/* FILTER */}
      <div className="sp-filter container fade-in-up">
        <label className="sp-select-label" htmlFor="sp-category-select">
          Filter kategori
        </label>
        <div className="sp-select-wrap">
          <select
            id="sp-category-select"
            className="sp-select"
            value={active}
            onChange={(e) => setActive(e.target.value as CategoryKey | "semua")}
          >
            <option value="semua">Semua ({FACILITIES.length})</option>
            {CATEGORIES.filter((c) => counts.has(c.key)).map((c) => (
              <option key={c.key} value={c.key}>
                {c.label} ({counts.get(c.key)})
              </option>
            ))}
          </select>
          <span className="sp-select-chevron" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </div>
      </div>

      {/* GRID */}
      <section className="container sp-grid-wrap">
        <div className="grid md:grid-cols-2 sp-grid" key={active}>
          {filtered.map((f, i) => {
            const cat = getCategory(f.category);
            return (
              <article
                key={f.id}
                className="card sp-card"
                style={{ animationDelay: `${(i % 6) * 70}ms` }}
              >
                <div className="sp-media">
                  <img
                    src={f.image}
                    alt={f.name}
                    className="sp-media-img"
                    loading="lazy"
                  />
                  <span className="sp-badge" style={{ color: cat.color }}>
                    {cat.label}
                  </span>
                </div>

                <div className="sp-body">
                  <h2 className="sp-name">{f.name}</h2>
                  <p className="sp-address">
                    <PinIcon size={14} className="sp-address-icon" />
                    <span>{f.address}</span>
                  </p>
                  <p className="sp-desc">{f.description}</p>
                </div>
              </article>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="sp-empty">Belum ada data untuk kategori ini.</p>
        )}
      </section>

      <style jsx>{`
        .sp-page {
          padding-top: 6.5rem;
          padding-bottom: 4rem;
          background: var(--bg-white);
        }

        .sp-hero {
          text-align: center;
          max-width: 720px;
          margin: 0 auto;
        }
        .sp-eyebrow {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.35rem;
        }
        .sp-eyebrow--accent {
          color: var(--accent);
        }
        .sp-title {
          font-family: var(--font-cinzel), serif;
          font-size: 2.4rem;
          font-weight: 700;
          color: var(--primary);
          margin: 0.6rem 0 1rem;
          line-height: 1.15;
        }
        .sp-lead {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
        }

        .sp-divider {
          height: 1px;
          background: var(--border);
          margin: 2.5rem auto;
          max-width: 1200px;
        }

        .sp-filter {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 2.75rem;
        }
        .sp-select-label {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .sp-select-wrap {
          position: relative;
          width: 100%;
          max-width: 320px;
        }
        .sp-select {
          appearance: none;
          -webkit-appearance: none;
          width: 100%;
          padding: 0.65rem 2.4rem 0.65rem 1rem;
          border-radius: 0.75rem;
          border: 1.5px solid var(--border);
          background: var(--bg-white);
          color: var(--text-main);
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .sp-select:hover {
          border-color: var(--primary);
        }
        .sp-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.06);
        }
        .sp-select-chevron {
          position: absolute;
          top: 50%;
          right: 0.85rem;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .sp-grid-wrap {
          min-height: 200px;
        }
        .sp-grid {
          gap: 1.75rem;
        }
        @media (min-width: 1100px) {
          .sp-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }

        .sp-card {
          overflow: hidden;
          background: var(--bg-white);
          border: 1px solid var(--border);
          border-radius: 1rem;
          animation: sp-enter 0.6s cubic-bezier(0.25, 1, 0.5, 1) both;
        }
        @keyframes sp-enter {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .sp-media {
          position: relative;
          height: 180px;
          overflow: hidden;
          background: var(--bg-surface);
        }
        .sp-media-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .sp-card:hover .sp-media-img {
          transform: scale(1.05);
        }
        .sp-badge {
          position: absolute;
          top: 0.75rem;
          left: 0.75rem;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(2px);
          padding: 0.3rem 0.6rem;
          border-radius: 9999px;
        }
        :global([data-theme="dark"]) .sp-badge {
          background: rgba(0, 0, 0, 0.55);
        }

        .sp-body {
          padding: 1.1rem 1.25rem 1.35rem;
        }
        .sp-name {
          font-size: 1.05rem;
          font-weight: 700;
          color: var(--text-main);
          margin-bottom: 0.4rem;
          line-height: 1.35;
        }
        .sp-address {
          display: flex;
          align-items: flex-start;
          gap: 0.35rem;
          font-size: 0.78rem;
          color: var(--text-muted);
          margin-bottom: 0.65rem;
          line-height: 1.5;
        }
        .sp-address-icon {
          flex-shrink: 0;
          margin-top: 0.15rem;
          color: var(--accent);
        }
        .sp-desc {
          font-size: 0.86rem;
          line-height: 1.6;
          color: var(--text-muted);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .sp-empty {
          text-align: center;
          color: var(--text-muted);
          padding: 3rem 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .sp-card {
            animation: none;
          }
          .sp-media-img {
            transition: none;
          }
        }
      `}</style>
    </main>
  );
}