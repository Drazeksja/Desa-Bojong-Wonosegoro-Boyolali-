'use client';

import { useState, useRef } from "react";

const ADMIN_WA_NUMBER = "6281234567890";

export default function PengaduanWarga() {
  const [nama, setNama] = useState("");
  const [kategori, setKategori] = useState("");
  const [isi, setIsi] = useState("");
  const [noHp, setNoHp] = useState("");
  const [fileName, setFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const kategoriList = [
    "Pelayanan Desa",
    "Infrastruktur",
    "Sarana & Prasarana",
    "Kesehatan",
    "Lingkungan",
    "Keamanan",
    "Lainnya",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama || !kategori || !isi || !noHp) return;

    const tanggal = new Date().toLocaleDateString("id-ID", {
      day: "2-digit", month: "long", year: "numeric"
    });

    const pesan = [
      `[PENGADUAN MASYARAKAT — DESA BOJONG]`,
      `Tanggal     : ${tanggal}`,
      `Nama        : ${nama}`,
      `No. HP/WA   : ${noHp}`,
      `Kategori    : ${kategori}`,
      ``,
      `ISI PENGADUAN:`,
      isi,
      fileName ? `Lampiran    : ${fileName}` : "",
      ``,
      `Pesan ini dikirim melalui formulir pengaduan resmi Website Desa Bojong.`,
    ]
      .filter(l => l !== null && l !== undefined)
      .join("\n");

    const url = `https://wa.me/${ADMIN_WA_NUMBER}?text=${encodeURIComponent(pesan)}`;
    window.open(url, "_blank");
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    border: "1px solid #d1d5db",
    borderRadius: 0,
    backgroundColor: "var(--bg-white)",
    fontSize: "0.95rem",
    padding: "8px 10px",
    boxShadow: "none",
    width: "100%",
    color: "#1e293b",
    outline: "none",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.82rem",
    fontWeight: "600",
    color: "#374151",
    marginBottom: "4px",
  };

  return (
    <main className="pb-5 min-vh-100 pt-5" style={{ backgroundColor: "var(--bg-surface)" }}>
      <div className="container mt-5 pt-3" style={{ maxWidth: "640px" }}>

        {submitted ? (
          /* Konfirmasi */
          <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)" }}>
            <div style={{ height: "10px", backgroundColor: "#d97706" }} />
            <div className="p-4">
              <h2 className="fw-bold mb-1" style={{ fontFamily: "serif", color: "var(--primary-dark)", fontSize: "1.3rem" }}>
                Pengaduan Tersampaikan
              </h2>
              <p className="text-muted mb-4" style={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                Terima kasih, <strong>{nama}</strong>. Pengaduan Anda telah diteruskan ke WhatsApp Petugas Desa Bojong. Mohon tunggu tindak lanjut dalam 1–3 hari kerja.
              </p>
              <div style={{ border: "1px solid var(--border)", backgroundColor: "var(--bg-surface)" }} className="p-3 mb-4">
                <div className="small mb-1"><span className="text-muted">Kategori:</span> <strong>{kategori}</strong></div>
                <div className="small"><span className="text-muted">No. HP:</span> <strong>{noHp}</strong></div>
              </div>
              <button
                onClick={() => { setSubmitted(false); setNama(""); setKategori(""); setIsi(""); setNoHp(""); setFileName(""); }}
                style={{ border: "1px solid var(--primary-dark)", backgroundColor: "transparent", color: "var(--primary-dark)", padding: "8px 20px", fontSize: "0.82rem", fontWeight: "bold", textTransform: "uppercase", letterSpacing: "1px", cursor: "pointer", borderRadius: 0 }}
              >
                Kirim Pengaduan Lain
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header Card — Garis Aksen Atas */}
            <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)", marginBottom: "12px" }}>
              <div style={{ height: "10px", backgroundColor: "#d97706" }} />
              <div className="p-4">
                <h1 className="fw-bold mb-1" style={{ fontFamily: "serif", color: "var(--primary-dark)", fontSize: "1.6rem" }}>
                  Pengaduan Masyarakat
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>
                  Pemerintah Desa Bojong, Kec. Wonosegoro, Kab. Boyolali.<br />
                  Sampaikan keluhan atau laporan Anda. Pengaduan akan diteruskan langsung ke WhatsApp petugas desa.
                </p>
                <p className="mt-2 mb-0" style={{ fontSize: "0.8rem", color: "#dc2626" }}>
                  * Wajib diisi
                </p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>

              {/* Nama */}
              <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)", marginBottom: "12px" }} className="p-4">
                <label style={labelStyle}>Nama Lengkap <span style={{ color: "#dc2626" }}>*</span></label>
                <input
                  type="text"
                  value={nama}
                  onChange={e => setNama(e.target.value)}
                  placeholder="Jawaban Anda"
                  required
                  style={{ ...inputStyle, borderTop: "none", borderLeft: "none", borderRight: "none", borderBottomColor: "#94a3b8", backgroundColor: "transparent", padding: "6px 0" }}
                />
              </div>

              {/* No HP */}
              <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)", marginBottom: "12px" }} className="p-4">
                <label style={labelStyle}>Nomor HP / WhatsApp <span style={{ color: "#dc2626" }}>*</span></label>
                <input
                  type="tel"
                  value={noHp}
                  onChange={e => setNoHp(e.target.value)}
                  placeholder="Contoh: 08123456789"
                  required
                  style={{ ...inputStyle, borderTop: "none", borderLeft: "none", borderRight: "none", borderBottomColor: "#94a3b8", backgroundColor: "transparent", padding: "6px 0" }}
                />
              </div>

              {/* Kategori */}
              <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)", marginBottom: "12px" }} className="p-4">
                <label style={labelStyle}>Kegiatan / Jenis Pengaduan <span style={{ color: "#dc2626" }}>*</span></label>
                <p className="text-muted mb-3" style={{ fontSize: "0.8rem" }}>Pilih salah satu kategori yang paling sesuai</p>
                <div className="d-flex flex-column gap-2">
                  {kategoriList.map(k => (
                    <label key={k} className="d-flex align-items-center gap-2" style={{ cursor: "pointer", fontSize: "0.92rem", color: "#374151" }}>
                      <input
                        type="radio"
                        name="kategori"
                        value={k}
                        checked={kategori === k}
                        onChange={() => setKategori(k)}
                        required
                        style={{ accentColor: "#d97706", width: "16px", height: "16px", flexShrink: 0 }}
                      />
                      {k}
                    </label>
                  ))}
                </div>
              </div>

              {/* Isi Pengaduan */}
              <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)", marginBottom: "12px" }} className="p-4">
                <label style={labelStyle}>Isi Pengaduan / Laporan <span style={{ color: "#dc2626" }}>*</span></label>
                <textarea
                  value={isi}
                  onChange={e => setIsi(e.target.value)}
                  rows={5}
                  placeholder="Tuliskan keluhan Anda secara jelas. Sertakan lokasi dan waktu kejadian bila ada..."
                  required
                  style={{ ...inputStyle, resize: "vertical" }}
                />
              </div>

              {/* Lampiran */}
              <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)", marginBottom: "12px" }} className="p-4">
                <label style={labelStyle}>Lampiran Foto <span className="fw-normal text-muted">(Opsional)</span></label>
                <p className="text-muted mb-2" style={{ fontSize: "0.8rem" }}>Unggah foto pendukung pengaduan Anda (JPG, PNG, maks. 5 MB)</p>
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  style={{ border: "1px solid #94a3b8", backgroundColor: "#f9fafb", padding: "6px 16px", fontSize: "0.82rem", fontWeight: "500", cursor: "pointer", borderRadius: 0, color: "#374151" }}
                >
                  + Tambah File
                </button>
                <input type="file" accept="image/*" ref={fileRef} className="d-none" onChange={handleFileChange} />
                {fileName && (
                  <span className="ms-3 text-muted" style={{ fontSize: "0.82rem" }}>{fileName}</span>
                )}
              </div>

              {/* Tombol Kirim */}
              <div style={{ backgroundColor: "var(--bg-white)", border: "1px solid var(--border)" }} className="p-4 d-flex align-items-center justify-content-between">
                <button
                  type="submit"
                  style={{
                    backgroundColor: "var(--primary-dark)",
                    color: "#fff",
                    border: "none",
                    padding: "11px 28px",
                    fontSize: "0.88rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    cursor: "pointer",
                    borderRadius: 0,
                  }}
                >
                  Kirim Pengaduan
                </button>
                <span className="text-muted" style={{ fontSize: "0.78rem" }}>
                  Diteruskan via WhatsApp Petugas Desa
                </span>
              </div>

            </form>

            {/* Catatan privasi */}
            <p className="text-muted mt-3 text-center" style={{ fontSize: "0.78rem", lineHeight: 1.6 }}>
              Data Anda bersifat resmi dan dijaga kerahasiaannya oleh Pemerintah Desa Bojong.
            </p>
          </>
        )}

      </div>
    </main>
  );
}
