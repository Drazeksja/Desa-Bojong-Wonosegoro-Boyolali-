import Image from "next/image";
import { Users, User } from "lucide-react";

export default function PerangkatDesa() {
  const pimpinan = [
    { title: "Kepala Desa", name: "Gatot Madiyo", group: "Pimpinan Tinggi" },
    { title: "Sekretaris Desa", name: "Yatmin", group: "Pimpinan Staf" }
  ];

  const kesekretariatan = [
    { title: "Kaur Umum & Perencanaan", name: "Hermin Utari" },
    { title: "Kaur Keuangan", name: "Endang Suyamti" }
  ];

  const pelaksanaTeknis = [
    { title: "Kasi Pemerintahan", name: "Sutarno" },
    { title: "Kasi Kesra & Pelayanan", name: "Data Belum Tersedia", empty: true }
  ];

  const pelaksanaKewilayahan = [
    { title: "Kepala Dusun I", name: "Agus Sumarno" },
    { title: "Kepala Dusun II", name: "Aminanto" },
    { title: "Kepala Dusun III", name: "Ahmadi" },
    { title: "Kepala Dusun IV", name: "Data Belum Tersedia", empty: true }
  ];

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: '960px' }}>
        
        {/* Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <h6 className="fw-bold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>Pemerintahan Desa Bojong</h6>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Perangkat Desa & Struktur Organisasi</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '580px', lineHeight: 1.7 }}>
            Susunan kepemimpinan, unsur staf kesekretariatan, pelaksana teknis, dan pelaksana kewilayahan Pemerintah Desa Bojong.
          </p>
        </div>

        {/* Deskripsi & Struktur Organisasi */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Hierarki Struktur Organisasi</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify', color: '#374151' }}>
            <span style={{ float: 'left', fontSize: '4rem', lineHeight: '0.7', paddingRight: '10px', paddingTop: '8px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>S</span>
            truktur Organisasi Pemerintah Desa Bojong menganut <span style={{ fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic' }}>sistem garis komando</span>. Kepala Desa adalah pimpinan tertinggi pemerintah desa. Di bawahnya terdapat unsur staf/kesekretariatan yang dipimpin oleh Sekretaris Desa (membawahi Kaur Umum & Perencanaan serta Kaur Keuangan). Selain itu, Kepala Desa juga mengomandoi langsung unsur pelaksana teknis (Kepala Seksi/Kasi) dan pelaksana kewilayahan (Kepala Dusun).
          </p>

          {/* Gambar Bagan Struktur Organisasi (landscape, besar) */}
          <div className="mt-5 position-relative w-100" style={{ aspectRatio: '16 / 9' }}>
            <Image
              src="/struktur.webp"
              alt="Bagan Struktur Organisasi Pemerintah Desa Bojong"
              fill
              className="object-fit-contain"
              sizes="(min-width: 960px) 960px, 100vw"
              priority
            />
          </div>
        </section>

        {/* Section 2: Daftar Card Perangkat Desa */}
        <section className="mb-5">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Daftar Perangkat Desa</h2>
          <div className="mt-3 mb-5" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          {/* Pimpinan */}
          <div className="mb-5">
            <h5 className="fw-bold mb-4 pb-2 border-bottom" style={{ fontFamily: 'serif', color: 'var(--primary-dark)' }}>Pimpinan Desa</h5>
            <div className="row g-4 justify-content-center">
              {pimpinan.map((p, i) => (
                <div className="col-sm-6 col-md-5" key={i}>
                  <div className="p-3 h-100 text-center" style={{ border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
                    <div className="mx-auto mb-3 position-relative" style={{ width: '130px', height: '160px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                      <Image src="/placeholder.webp" alt={p.name} fill className="object-fit-cover" />
                    </div>
                    <h6 className="fw-bold mb-1" style={{ fontFamily: 'serif', fontSize: '1.1rem', color: 'var(--text-main)' }}>{p.name}</h6>
                    <p className="text-uppercase fw-bold mb-0" style={{ fontSize: '0.8rem', color: 'var(--primary-dark)', letterSpacing: '1px' }}>{p.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Unsur Kesekretariatan (Kaur) */}
          <div className="mb-5">
            <h5 className="fw-bold mb-4 pb-2 border-bottom" style={{ fontFamily: 'serif', color: 'var(--primary-dark)' }}>Unsur Kesekretariatan (Kaur)</h5>
            <div className="row g-4">
              {kesekretariatan.map((p, i) => (
                <div className="col-sm-6 col-md-6" key={i}>
                  <div className="p-3 d-flex align-items-center gap-3" style={{ border: '1px solid #cbd5e1', backgroundColor: '#fff' }}>
                    <div className="flex-shrink-0 position-relative" style={{ width: '90px', height: '110px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                      <Image src="/placeholder.webp" alt={p.name} fill className="object-fit-cover" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ fontFamily: 'serif', fontSize: '1.05rem', color: 'var(--text-main)' }}>{p.name}</h6>
                      <p className="text-muted small mb-0 fw-bold">{p.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pelaksana Teknis (Kasi) */}
          <div className="mb-5">
            <h5 className="fw-bold mb-4 pb-2 border-bottom" style={{ fontFamily: 'serif', color: 'var(--primary-dark)' }}>Pelaksana Teknis (Kasi)</h5>
            <div className="row g-4">
              {pelaksanaTeknis.map((p, i) => (
                <div className="col-sm-6 col-md-6" key={i}>
                  <div className="p-3 d-flex align-items-center gap-3" style={{ border: '1px solid #cbd5e1', backgroundColor: p.empty ? '#f9fafb' : '#fff' }}>
                    <div className="flex-shrink-0 position-relative d-flex align-items-center justify-content-center" style={{ width: '90px', height: '110px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9' }}>
                      <Image src="/placeholder.webp" alt={p.name} fill className="object-fit-cover opacity-50" />
                    </div>
                    <div>
                      <h6 className="fw-bold mb-1" style={{ fontFamily: 'serif', fontSize: '1.05rem', color: p.empty ? '#94a3b8' : 'var(--text-main)', fontStyle: p.empty ? 'italic' : 'normal' }}>
                        {p.name}
                      </h6>
                      <p className="text-muted small mb-0 fw-bold">{p.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pelaksana Kewilayahan (Kepala Dusun) */}
          <div className="mb-5">
            <h5 className="fw-bold mb-4 pb-2 border-bottom" style={{ fontFamily: 'serif', color: 'var(--primary-dark)' }}>Pelaksana Kewilayahan (Kepala Dusun)</h5>
            <div className="row g-4">
              {pelaksanaKewilayahan.map((p, i) => (
                <div className="col-6 col-md-3" key={i}>
                  <div className="p-3 text-center h-100" style={{ border: '1px solid #cbd5e1', backgroundColor: p.empty ? '#f9fafb' : '#fff' }}>
                    <div className="mx-auto mb-3 position-relative" style={{ width: '80px', height: '100px', border: '1px solid #e2e8f0', backgroundColor: '#f1f5f9' }}>
                      <Image src="/placeholder.webp" alt={p.name} fill className="object-fit-cover opacity-75" />
                    </div>
                    <h6 className="fw-bold mb-1" style={{ fontFamily: 'serif', fontSize: '0.95rem', color: p.empty ? '#94a3b8' : 'var(--text-main)', fontStyle: p.empty ? 'italic' : 'normal' }}>
                      {p.name}
                    </h6>
                    <p className="text-muted small mb-0" style={{ fontSize: '0.8rem' }}>{p.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

      </div>
    </main>
  );
}