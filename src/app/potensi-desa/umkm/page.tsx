"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff, Phone, MapPin, Clock } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Data — diringkas dari umkm.docx (5 UMKM Desa Bojong)               */
/* ------------------------------------------------------------------ */

interface Umkm {
  slug: string;
  name: string;
  owner: string;
  category: string;
  src?: string;
  established?: string;
  description: string;
  products: string[];
  priceInfo: string;
  highlights: string[];
  marketArea?: string;
  whatsapp?: string;
}

const UMKM_LIST: Umkm[] = [
  {
    slug: "keripik-mugi-berkah",
    name: "Keripik Mugi Berkah",
    owner: "Ibu Surani",
    category: "Makanan Ringan",
    src: "/kripik.jpeg",
    established: "± 12 tahun berdiri",
    description:
      "Usaha keripik rumahan yang berawal dari ketertarikan Ibu Surani belajar mengolah keripik dari pelaku usaha di Banyusri. Ciri khasnya ada pada bentuk potongan yang lebih sederhana, tidak memanjang seperti keripik pada umumnya.",
    products: ["Keripik Pisang", "Keripik Singkong", "Keripik Talas"],
    priceInfo: "Rp10.000 / bungkus (± 1 kg)",
    highlights: [
      "± 30 bungkus diproduksi per hari",
      "Bahan baku datang 4× seminggu dari supplier",
      "Keripik pisang jadi produk terlaris",
    ],
    marketArea:
      "Mitra pasar lokal & pelanggan tetap dari Sukoharjo (± 100 bungkus/pesanan)",
    whatsapp: "0856-4052-4579 ",
  },
  {
    slug: "gavin-mebel-project",
    name: "Gavin Mebel Project",
    owner: "Pak Eko",
    category: "Mebel & Furnitur Kayu",
    src: "/mebel.jpeg",
    established: "Usaha keluarga turun-temurun",
    description:
      "Usaha mebel berbahan kayu jati yang dirintis dengan modal terbatas dan keahlian perkayuan warisan keluarga. Melayani pesanan custom ukuran, model, hingga motif ukiran sesuai kebutuhan pelanggan.",
    products: ["Lemari", "Meja & Kursi", "Sofa Kayu", "Dipan", "Kusen & Pintu"],
    priceInfo: "Menyesuaikan desain",
    highlights: [
      "Bahan baku utama kayu jati pilihan",
      "Menerima pesanan custom penuh",
      "Pernah ekspor & jadi pemasok toko mebel",
    ],
    marketArea: "Boyolali, dan luar kota: Semarang, Purwokerto, Karawang",
    whatsapp: "0857-1222-2075",
  },
  {
    slug: "gethuk-lindri-dukuh-bojong",
    name: "Getuk Lindri Dukuh Bojong",
    owner: "Bapak Sabarno",
    category: "Makanan Tradisional",
    src: "/sabar.jpg",
    description:
      "Dukuh Bojong dikenal sebagai salah satu sentra industri getuk lindri, dengan produksi dimulai dini hari (± pukul 02.00 WIB) lalu langsung dipasarkan pagi harinya menggunakan sepeda motor dan gerobak keliling.",
    products: ["Getuk Lindri"],
    priceInfo: "Rp500 / buah, atau Rp1.000 / 2 buah",
    highlights: [
      "Produksi dimulai pukul 02.00 WIB",
      "Penjual keliling bersistem komisi",
      "Belum memiliki merek/label dagang",
    ],
    marketArea: "Purwodadi, Demak, Kudus, Pati",
    whatsapp: "0838-7214-4948",
  },
  {
    slug: "gethuk-berkah-pak-santo",
    name: "Getuk Berkah Pak Santo",
    owner: "Bapak Kuntet (nama usaha: GeTuk Berkah Santoso)",
    category: "Makanan Tradisional",
    src: "/santow.jpeg",
    established: "Usaha keluarga sejak ± 1980-an, mandiri ± 4 tahun",
    description:
      "Diteruskan dari usaha keluarga, kini menjadi salah satu produsen getuk lindri terbesar di Dukuh Bojong dengan kapasitas produksi harian yang tinggi dan jaringan pedagang keliling yang sudah mapan.",
    products: ["Getuk Lindri"],
    priceInfo: "Rp500 / biji",
    highlights: [
      "± 150 kg singkong diolah per hari",
      "Produksi 4.000–5.000 biji per hari",
      "Dikerjakan oleh ± 7 pekerja",
    ],
    marketArea:
      "Distribusi lewat pedagang keliling sejak pukul 02.00–04.00 WIB",
    whatsapp: "0889-8041-9217",
  },
  {
    slug: "jamu-bapak-turkidjo",
    name: "Jamu Tradisional",
    owner: "Ibu Ngatini & Bapak Turkidjo",
    category: "Minuman Herbal",
    src: "/jamu.jpeg",
    established: "Mulai produksi saat pandemi COVID-19",
    description:
      "Awalnya dibuat untuk pengobatan mandiri, kini jamu racikan rumahan ini dibuat dari rempah segar tanpa pengawet. Sudah mengantongi sertifikat kesehatan dan pernah tampil di pameran UMKM tingkat kota.",
    products: ["Jamu Temulawak (terlaris)", "Varian jamu rempah lainnya"],
    priceInfo: "Rp13.000 / bungkus plastik",
    highlights: [
      "Tanpa pengawet, tahan hingga 6 bulan",
      "Sudah bersertifikat kesehatan",
      "Pernah tampil di pameran UMKM Solo",
    ],
    marketArea: "Sekitar desa, pernah kirim pesanan hingga luar pulau",
    whatsapp: "0856-4508-1007",
  },
];

/* ------------------------------------------------------------------ */
/*  Foto per UMKM dengan fallback                                      */
/* ------------------------------------------------------------------ */

function UmkmPhoto({
  src,
  name,
}: {
  src?: string;
  name: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="umkm-photo-frame">
      {!failed && src ? (
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          style={{ objectFit: "cover" }}
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="umkm-photo-placeholder">
          <ImageOff size={26} strokeWidth={1.5} />
          <span>Foto belum tersedia</span>
        </div>
      )}

      <span className="umkm-photo-category">
        {/* filled via parent */}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Card                                                                */
/* ------------------------------------------------------------------ */

function UmkmCard({ item }: { item: Umkm }) {
  return (
    <div className="umkm-card h-100">
      <div className="umkm-photo-wrap">
        <UmkmPhoto src={item.src} name={item.name} />
        <span className="umkm-badge">{item.category}</span>
      </div>

      <div className="umkm-card-body">
        <h3 className="umkm-name">{item.name}</h3>

        <p className="umkm-owner">
          {item.owner}
          {item.established && (
            <span className="umkm-established">
              {" "}
              · {item.established}
            </span>
          )}
        </p>

        <p className="umkm-desc">{item.description}</p>

        <div className="umkm-products">
          {item.products.map((p) => (
            <span key={p} className="umkm-product-tag">
              {p}
            </span>
          ))}
        </div>

        <div className="umkm-price-row">
          <span>Harga</span>
          <strong>{item.priceInfo}</strong>
        </div>

        <ul className="umkm-highlights">
          {item.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {item.marketArea && (
          <p className="umkm-meta">
            <MapPin size={14} /> {item.marketArea}
          </p>
        )}

        {item.whatsapp && (
          <a
            href={`https://wa.me/62${item.whatsapp
              .replace(/^0/, "")
              .replace(/-/g, "")
              .trim()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="umkm-wa-button"
          >
            <Phone size={15} /> {item.whatsapp}
          </a>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function UmkmDesa() {
  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: "1180px" }}>
        {/* Kop halaman */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <p className="umkm-letterhead">PEMERINTAH DESA BOJONG</p>

          <h6
            className="fw-bold text-uppercase"
            style={{
              color: "var(--accent)",
              letterSpacing: "2px",
            }}
          >
            POTENSI DESA
          </h6>

          <h1
            className="display-4 fw-bold mt-2"
            style={{
              color: "var(--primary-dark)",
              fontFamily: "serif",
            }}
          >
            UMKM Desa Bojong
          </h1>

          <p
            className="text-muted mx-auto mt-3"
            style={{ maxWidth: "640px" }}
          >
            Mengenal lebih dekat pelaku usaha mikro, kecil, dan menengah yang
            menjadi penggerak ekonomi warga Desa Bojong dari kudapan tradisional
            hingga kerajinan kayu.
          </p>
        </div>

        {/* Grid kartu UMKM */}
        <div className="row g-4">
          {UMKM_LIST.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.slug}>
              <UmkmCard item={item} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .umkm-letterhead {
          font-size: 0.7rem;
          letter-spacing: 3px;
          color: #6b6355;
          text-transform: uppercase;
          margin-bottom: 0.75rem;
        }

        .umkm-card {
          display: flex;
          flex-direction: column;
          background: #fff;
          border: 1px solid #c7c1b4;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .umkm-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 30px rgba(22, 35, 63, 0.14);
          border-color: var(--primary-dark);
        }

        .umkm-photo-wrap {
          position: relative;
        }

        .umkm-photo-frame {
          position: relative;
          width: 100%;
          height: 200px;
          background: #f1efe9;
          overflow: hidden;
        }

        .umkm-photo-frame img {
          transition: transform 0.35s ease;
        }

        .umkm-card:hover .umkm-photo-frame img {
          transform: scale(1.06);
        }

        .umkm-photo-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          color: #a39d8c;
          font-size: 0.75rem;
        }

        .umkm-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--primary-dark);
          color: #fff;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          padding: 0.3rem 0.65rem;
        }

        .umkm-card-body {
          padding: 1.3rem 1.4rem 1.5rem;
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .umkm-name {
          font-family: serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--primary-dark);
          margin-bottom: 0.2rem;
        }

        .umkm-owner {
          font-size: 0.82rem;
          color: #6b6355;
          margin-bottom: 0.75rem;
        }

        .umkm-established {
          font-style: italic;
        }

        .umkm-desc {
          font-size: 0.9rem;
          line-height: 1.65;
          color: #2a2a26;
          margin-bottom: 1rem;
        }

        .umkm-products {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }

        .umkm-product-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--primary-dark);
          border: 1px solid #c7c1b4;
          padding: 0.25rem 0.6rem;
        }

        .umkm-price-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-size: 0.85rem;
          color: #2a2a26;
          border-top: 1px solid #e7e3d8;
          border-bottom: 1px solid #e7e3d8;
          padding: 0.6rem 0;
          margin-bottom: 0.9rem;
        }

        .umkm-price-row strong {
          color: #9c2963;
        }

        .umkm-highlights {
          list-style: none;
          padding: 0;
          margin: 0 0 1rem;
        }

        .umkm-highlights li {
          position: relative;
          padding-left: 1rem;
          font-size: 0.82rem;
          color: #2a2a26;
          margin-bottom: 0.4rem;
          line-height: 1.5;
        }

        .umkm-highlights li::before {
          content: "\\2013";
          position: absolute;
          left: 0;
          color: var(--accent);
        }

        .umkm-meta {
          display: flex;
          align-items: flex-start;
          gap: 0.4rem;
          font-size: 0.78rem;
          color: #6b6355;
          margin-bottom: 0.9rem;
        }

        .umkm-wa-button {
          margin-top: auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          font-size: 0.85rem;
          font-weight: 700;
          color: #fff;
          background: var(--primary-dark);
          padding: 0.55rem 1rem;
          text-decoration: none;
          transition: background 0.2s ease;
        }

        .umkm-wa-button:hover {
          background: #9c2963;
          color: #fff;
        }
      `}</style>
    </main>
  );
}