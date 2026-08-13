'use client';

import React from 'react';

export default function APBDesPage() {
  // Data Pendapatan
  const pendapatanTotal = 1205263000;
  const pendapatan = [
    { name: "Pendapatan Asli Desa", value: 33672000 },
    { name: "Pendapatan Transfer", value: 1170091000 },
    { name: "Pendapatan Lain-lain", value: 1500000 },
  ];

  // Data Belanja
  const belanjaTotal = 1231214371;
  const belanja = [
    { name: "Penyelenggaraan Pemerintah Desa", value: 712337312, color: "var(--primary-dark)", percent: 57.9 },
    { name: "Pelaksanaan Pembangunan Desa", value: 475236059, color: "var(--primary-light)", percent: 38.6 },
    { name: "Penanggulangan Bencana & Mendesak", value: 24400000, color: "var(--accent)", percent: 2.0 },
    { name: "Pembinaan Kemasyarakatan Desa", value: 11525000, color: "#64748b", percent: 0.9 },
    { name: "Pemberdayaan Masyarakat Desa", value: 7716000, color: "#94a3b8", percent: 0.6 },
  ];

  const pembiayaanNetto = 25951371;

  const formatRp = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <main className="bg-white min-vh-100 pb-5 pt-5">
      {/* Styles untuk animasi fade-in-up ringan */}
      <style>{`
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        .delay-3 { animation-delay: 0.3s; }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Tambahan agar pie chart text rapi */
        .pie-label {
          position: absolute;
          color: white;
          font-weight: bold;
          font-size: 0.95rem;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.6);
          pointer-events: none;
        }
      `}</style>

      {/* Container utama ala dokumen */}
      <div className="container mt-5 pt-4 bg-white" style={{ maxWidth: '900px' }}>
       
        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <h6 className="fw-bold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>Informasi Publik</h6>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Anggaran Pendapatan & Belanja Desa</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '540px', lineHeight: 1.7 }}>
            Ringkasan data APBDes Tahun Anggaran 2026, mencakup rincian Pendapatan Desa, distribusi Belanja Desa, dan status Pembiayaan Netto sebagai wujud transparansi Pemerintah Desa Bojong.
          </p>
        </div>

        {/* SECTION 1: RINGKASAN & PENDAPATAN */}
        <div className="mb-5 pb-4 fade-in-up delay-1">
          <h6 className="fw-bold text-uppercase mb-4" style={{ color: 'var(--primary-light)', letterSpacing: '2px', fontSize: '0.85rem' }}>
            1. PENDAPATAN DESA (TAHUN 2026)
          </h6>
          
          <div className="row g-5 align-items-start">
            {/* Teks Pengantar dengan Drop Cap rapi */}
            <div className="col-md-6">
               <p className="text-justify text-muted" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
                 <span style={{ float: 'left', fontSize: '4.8rem', lineHeight: '0.7', paddingRight: '12px', paddingTop: '10px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>P</span>
                 endapatan Desa Bojong pada tahun anggaran 2026 didominasi oleh Dana Transfer yang bersumber dari Pemerintah Pusat dan Daerah. Selain itu, upaya optimalisasi Pendapatan Asli Desa (PADes) juga terus didorong melalui pengelolaan aset dan potensi desa secara mandiri.
               </p>
               
               <div className="arsip-card p-4 mt-4 border-start border-4" style={{ borderColor: 'var(--primary-dark)', backgroundColor: '#f8fafc' }}>
                  <h6 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', fontSize: '0.75rem' }}>TOTAL PENDAPATAN DESA</h6>
                  <div className="fw-bold" style={{ color: 'var(--primary-dark)', fontSize: '1.8rem' }}>Rp {formatRp(pendapatanTotal)}</div>
               </div>
            </div>

            {/* Tabel Rincian Pendapatan */}
            <div className="col-md-6">
              <div className="border border-secondary border-opacity-25">
                 <div className="p-3 text-center" style={{ backgroundColor: 'var(--primary-dark)', color: 'white' }}>
                    <h6 className="fw-bold text-uppercase m-0" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>Rincian Pendapatan</h6>
                 </div>
                 <div className="bg-white">
                    {pendapatan.map((item, idx) => (
                      <div key={idx} className="d-flex justify-content-between p-3 border-bottom border-secondary border-opacity-10" style={{ fontSize: '0.9rem' }}>
                        <span className="text-secondary fw-medium">{item.name}</span>
                        <span className="fw-bold" style={{ color: 'var(--primary-dark)' }}>{formatRp(item.value)}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-5 border-secondary border-opacity-25 fade-in-up delay-1" />

        {/* SECTION 2: GRAFIK INDIKATOR BELANJA */}
        <div className="mb-5 pb-4 fade-in-up delay-2">
          <h6 className="fw-bold text-uppercase mb-3" style={{ color: 'var(--primary-light)', letterSpacing: '2px', fontSize: '0.85rem' }}>
            2. GRAFIK INDIKATOR BELANJA DESA
          </h6>
          <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
            Distribusi alokasi anggaran belanja Desa Bojong berdasarkan bidang pelaksanaan (Total Belanja: <strong className="text-dark">Rp {formatRp(belanjaTotal)}</strong>).
          </p>

          <div className="arsip-card p-4 p-md-5 border border-secondary border-opacity-25">
             <h6 className="text-center fw-bold mb-5 text-uppercase" style={{ color: 'var(--primary-dark)', letterSpacing: '1px', fontSize: '0.8rem' }}>
               PERSENTASE ALOKASI BELANJA DESA BOJONG (%)
             </h6>
             
             <div className="row g-4 align-items-center">
                {/* Visual Grafik Lingkaran (Pie Chart) - Dibuat presisi dan rapi */}
                <div className="col-md-5 d-flex justify-content-center position-relative">
                  <div 
                    className="rounded-circle shadow-sm position-relative" 
                    style={{ 
                      width: '220px', 
                      height: '220px',
                      background: `conic-gradient(
                        var(--primary-dark) 0% 57.9%,
                        var(--primary-light) 57.9% 96.5%,
                        var(--accent) 96.5% 98.5%,
                        #64748b 98.5% 99.4%,
                        #94a3b8 99.4% 100%
                      )`
                    }}
                  >
                     {/* Label 57.9% diposisikan lurus di dalam area biru tua */}
                     <span className="pie-label" style={{ top: '32%', right: '22%' }}>57.9%</span>
                     {/* Label 38.6% diposisikan lurus di dalam area biru muda */}
                     <span className="pie-label" style={{ bottom: '25%', left: '22%' }}>38.6%</span>
                  </div>
                </div>

                {/* Legend (Keterangan Rincian) diluruskan dengan flexbox */}
                <div className="col-md-7">
                  <div className="d-flex flex-column gap-3">
                    {belanja.map((item, index) => (
                      <div key={index} className="d-flex justify-content-between align-items-center border-bottom border-secondary border-opacity-25 pb-2">
                        <div className="d-flex align-items-center gap-3">
                          {/* Kotak warna legenda */}
                          <div style={{ width: '14px', height: '14px', backgroundColor: item.color, flexShrink: 0 }}></div>
                          <span className="fw-bold text-dark" style={{ fontSize: '0.9rem' }}>{item.name}</span>
                        </div>
                        <div className="text-end ms-3">
                          <div className="fw-bold" style={{ color: 'var(--primary-dark)', fontSize: '0.9rem' }}>{item.percent}%</div>
                          <div className="text-muted" style={{ fontSize: '0.75rem' }}>(Rp {formatRp(item.value)})</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
             </div>

             <div className="mt-4 text-end text-muted" style={{ fontSize: '0.75rem' }}>
                Skala: 0% - 100% &nbsp;|&nbsp; Sumber: Dokumen APBDes Bojong 2026
             </div>
          </div>
        </div>

        <hr className="mb-5 border-secondary border-opacity-25 fade-in-up delay-2" />

        {/* SECTION 3: PEMBIAYAAN */}
        <div className="mb-5 fade-in-up delay-3">
          <h6 className="fw-bold text-uppercase mb-4" style={{ color: 'var(--primary-light)', letterSpacing: '2px', fontSize: '0.85rem' }}>
            3. PEMBIAYAAN DESA
          </h6>
          
          <div className="row g-4 align-items-stretch">
             {/* Info Box */}
             <div className="col-md-6">
               <div className="border border-secondary border-opacity-25 p-4 h-100 d-flex flex-column justify-content-center bg-light">
                  <h6 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)', fontSize: '0.95rem' }}>Defisit & Pembiayaan Netto</h6>
                  <p className="mb-0 text-justify text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                    Selisih antara total pendapatan dan belanja menghasilkan angka defisit sebesar <strong className="text-dark">Rp {formatRp(pembiayaanNetto)}</strong>. Defisit ini ditutup secara penuh melalui Penerimaan Pembiayaan (SiLPA tahun sebelumnya), sehingga Sisa Lebih Pembiayaan Anggaran (SiLPA) tahun berjalan menjadi bersaldo Rp 0 (Anggaran Berimbang).
                  </p>
               </div>
             </div>
             
             {/* Tabel Ringkasan */}
             <div className="col-md-6">
                <div className="border border-secondary border-opacity-25 h-100">
                  <table className="table mb-0" style={{ fontSize: '0.9rem' }}>
                    <tbody>
                      <tr>
                        <td className="p-3 fw-semibold text-secondary bg-light w-50 border-bottom border-secondary border-opacity-25">Penerimaan Pembiayaan</td>
                        <td className="p-3 text-end fw-bold border-bottom border-secondary border-opacity-25" style={{ color: 'var(--primary-dark)' }}>Rp {formatRp(25951371)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 fw-semibold text-secondary bg-light border-bottom border-secondary border-opacity-25">Pengeluaran Pembiayaan</td>
                        <td className="p-3 text-end fw-bold border-bottom border-secondary border-opacity-25" style={{ color: 'var(--primary-dark)' }}>Rp 0</td>
                      </tr>
                      <tr>
                        <td className="p-3 fw-bold text-uppercase" style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', borderBottom: '2px solid var(--primary-dark)' }}>Pembiayaan Netto</td>
                        <td className="p-3 text-end fw-bold" style={{ color: 'var(--primary-dark)', borderBottom: '2px solid var(--primary-dark)' }}>Rp {formatRp(25951371)}</td>
                      </tr>
                      <tr>
                        <td className="p-3 fw-bold text-uppercase text-white" style={{ backgroundColor: 'var(--primary-dark)', fontSize: '0.8rem' }}>SiLPA Berjalan</td>
                        <td className="p-3 text-end fw-bold text-white" style={{ backgroundColor: 'var(--primary-dark)' }}>Rp 0</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
             </div>
          </div>
        </div>

      </div>
    </main>
  );
}