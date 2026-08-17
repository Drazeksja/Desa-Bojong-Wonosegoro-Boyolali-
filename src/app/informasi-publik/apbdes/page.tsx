'use client';

import React from 'react';
import { ArrowUpRight, TrendingUp, Landmark, FileText, ArrowRight } from 'lucide-react';

export default function APBDesPage() {
  // Data Pendapatan
  const pendapatanTotal = 1205263000;
  const pendapatan = [
    { name: "Pendapatan Asli Desa (PADes)", value: 33672000, percent: 2.8 },
    { name: "Pendapatan Transfer (DD, ADD, Bagi Hasil, dll)", value: 1170091000, percent: 97.1 },
    { name: "Pendapatan Lain-lain", value: 1500000, percent: 0.1 },
  ];

  // Data Belanja
  const belanjaTotal = 1231214371;
  const belanja = [
    { name: "Penyelenggaraan Pemerintahan Desa", value: 712337312, color: "#172554", percent: 57.9 },
    { name: "Pelaksanaan Pembangunan Desa", value: 475236059, color: "#2c5282", percent: 38.6 },
    { name: "Penanggulangan Bencana & Mendesak", value: 24400000, color: "#d97706", percent: 2.0 },
    { name: "Pembinaan Kemasyarakatan Desa", value: 11525000, color: "#475569", percent: 0.9 },
    { name: "Pemberdayaan Masyarakat Desa", value: 7716000, color: "#94a3b8", percent: 0.6 },
  ];

  const pembiayaanNetto = 25951371;

  const formatRp = (angka: number) => {
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(angka);
  };

  return (
    <main className="bg-white min-vh-100 pb-5 pt-5">
      <style>{`
        .apb-header {
          opacity: 0;
          transform: translateY(-20px);
          animation: apbFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .apb-section {
          opacity: 0;
          transform: translateY(25px);
          animation: apbFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .apb-section.delay-1 { animation-delay: 0.15s; }
        .apb-section.delay-2 { animation-delay: 0.3s; }
        .apb-section.delay-3 { animation-delay: 0.45s; }

        .apb-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .apb-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        @keyframes apbFadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes apbFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .apb-pie-label {
          position: absolute;
          color: white;
          font-weight: 700;
          font-size: 0.88rem;
          text-shadow: 0 1px 4px rgba(0,0,0,0.6);
          pointer-events: none;
        }
      `}</style>

      <div className="container mt-5 pt-4" style={{ maxWidth: '940px' }}>
       
        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4 apb-header">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-2" 
               style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <span className="fw-semibold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '0.72rem' }}>
              Pemerintah Desa Bojong &middot; Transparansi Keuangan
            </span>
          </div>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>
            Anggaran Pendapatan &amp; Belanja Desa
          </h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '580px', lineHeight: 1.7 }}>
            Dokumen resmi APBDes Tahun Anggaran 2026 yang memuat alokasi Pendapatan Desa, distribusi Belanja Berdasarkan Bidang, dan status Pembiayaan Netto.
          </p>
        </div>

        {/* Ringkasan Angka Utama */}
        <div className="row g-3 mb-5 apb-section delay-1">
          <div className="col-md-4">
            <div className="apb-card p-4 h-100" style={{ background: '#f8fafc' }}>
              <span className="text-uppercase fw-semibold small text-muted d-block mb-1" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                Total Pendapatan
              </span>
              <div className="h4 fw-bold mb-1" style={{ color: '#2c5282', letterSpacing: '-0.5px' }}>
                Rp {formatRp(pendapatanTotal)}
              </div>
              <span className="small text-muted">3 Pos Sumber Penerimaan</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="apb-card p-4 h-100" style={{ background: '#f8fafc' }}>
              <span className="text-uppercase fw-semibold small text-muted d-block mb-1" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                Total Belanja
              </span>
              <div className="h4 fw-bold mb-1" style={{ color: '#172554', letterSpacing: '-0.5px' }}>
                Rp {formatRp(belanjaTotal)}
              </div>
              <span className="small text-muted">5 Bidang Pelaksanaan</span>
            </div>
          </div>

          <div className="col-md-4">
            <div className="apb-card p-4 h-100" style={{ background: '#172554', color: '#ffffff' }}>
              <span className="text-uppercase fw-semibold small text-white text-opacity-75 d-block mb-1" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                Status Anggaran
              </span>
              <div className="h4 fw-bold mb-1 text-white" style={{ letterSpacing: '-0.5px' }}>
                Anggaran Berimbang
              </div>
              <span className="small text-warning">SiLPA Berjalan: Rp 0</span>
            </div>
          </div>
        </div>

        {/* SECTION 1: PENDAPATAN */}
        <div className="mb-5 pb-5 border-bottom border-secondary border-opacity-25 apb-section delay-1">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.9rem' }}>
              1. Rincian Pendapatan Desa (2026)
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>
          
          <div className="row g-4 align-items-center">
            <div className="col-md-5">
              <p className="text-muted mb-4" style={{ lineHeight: '1.8', fontSize: '0.95rem' }}>
                Pendapatan Desa Bojong bersumber utama dari Dana Transfer (Dana Desa, Alokasi Dana Desa, serta Bagian Hasil Pajak dan Retribusi Daerah) serta diimbangi penerimaan Pendapatan Asli Desa (PADes).
              </p>
              <div className="p-3.5 rounded-3 border" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0' }}>
                <span className="small text-muted text-uppercase fw-bold d-block" style={{ fontSize: '0.72rem', letterSpacing: '1px' }}>
                  Akumulasi Pendapatan
                </span>
                <span className="h4 fw-bold mb-0" style={{ color: '#2c5282' }}>
                  Rp {formatRp(pendapatanTotal)}
                </span>
              </div>
            </div>

            <div className="col-md-7">
              <div className="apb-card overflow-hidden">
                <div className="py-2.5 px-4" style={{ backgroundColor: '#172554', color: '#fff' }}>
                  <span className="fw-bold text-uppercase small" style={{ letterSpacing: '1px', fontSize: '0.78rem' }}>Sumber Pendapatan</span>
                </div>
                <div className="p-0">
                  {pendapatan.map((item, idx) => (
                    <div key={idx} className="d-flex justify-content-between align-items-center p-3 px-4 border-bottom border-secondary border-opacity-10" style={{ fontSize: '0.9rem' }}>
                      <div>
                        <span className="text-dark fw-medium d-block">{item.name}</span>
                        <span className="small text-muted">{item.percent}% dari total penerimaan</span>
                      </div>
                      <span className="fw-bold" style={{ color: '#2c5282', fontSize: '0.95rem' }}>
                        Rp {formatRp(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: BELANJA */}
        <div className="mb-5 pb-5 border-bottom border-secondary border-opacity-25 apb-section delay-2">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.9rem' }}>
              2. Alokasi Belanja Desa Berdasarkan Bidang
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>
          
          <div className="apb-card p-4 p-md-5">
            <div className="row g-4 align-items-center">
              {/* Donut Chart */}
              <div className="col-md-5 d-flex justify-content-center position-relative">
                <div 
                  className="rounded-circle position-relative d-flex align-items-center justify-content-center" 
                  style={{ 
                    width: '210px', 
                    height: '210px',
                    background: `conic-gradient(
                      #172554 0% 57.9%,
                      #2c5282 57.9% 96.5%,
                      #d97706 96.5% 98.5%,
                      #475569 98.5% 99.4%,
                      #94a3b8 99.4% 100%
                    )`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                  }}
                >
                  <div 
                    className="rounded-circle bg-white d-flex flex-column align-items-center justify-content-center text-center shadow-sm"
                    style={{ width: '130px', height: '130px' }}
                  >
                    <span className="small text-muted text-uppercase fw-semibold" style={{ fontSize: '0.68rem', letterSpacing: '0.5px' }}>Total Belanja</span>
                    <span className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>100%</span>
                  </div>
                </div>
              </div>

              {/* Rincian Bidang */}
              <div className="col-md-7">
                <div className="d-flex flex-column gap-3">
                  {belanja.map((item, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center pb-2 border-bottom" style={{ borderColor: '#f1f5f9' }}>
                      <div className="d-flex align-items-center gap-2.5">
                        <div style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: item.color, flexShrink: 0 }}></div>
                        <div>
                          <span className="fw-medium text-dark d-block" style={{ fontSize: '0.88rem' }}>{item.name}</span>
                          <span className="text-muted small" style={{ fontSize: '0.75rem' }}>Rp {formatRp(item.value)}</span>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className="fw-bold" style={{ color: '#2c5282', fontSize: '0.92rem' }}>{item.percent}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-top d-flex justify-content-between text-muted small" style={{ fontSize: '0.75rem', borderColor: '#f1f5f9' }}>
              <span>Skala Alokasi: 0% — 100%</span>
              <span>Sumber: Lembaran APBDes Bojong Tahun Anggaran 2026</span>
            </div>
          </div>
        </div>

        {/* SECTION 3: PEMBIAYAAN & ANGGARAN BERIMBANG */}
        <div className="mb-4 apb-section delay-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.9rem' }}>
              3. Pembiayaan Desa
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>
          
          <div className="row g-4 align-items-stretch">
            <div className="col-md-6">
              <div className="apb-card p-4 h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#f8fafc' }}>
                <div>
                  <h6 className="fw-bold mb-2" style={{ color: '#172554', fontSize: '0.95rem' }}>Defisit &amp; Pembiayaan Netto</h6>
                  <p className="mb-0 text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.7', textAlign: 'justify' }}>
                    Selisih antara total pendapatan dan belanja menghasilkan defisit sebesar <strong className="text-dark">Rp {formatRp(pembiayaanNetto)}</strong>. Defisit ditutup sepenuhnya melalui Penerimaan Pembiayaan (SiLPA tahun sebelumnya), sehingga Sisa Lebih Pembiayaan Anggaran (SiLPA) tahun berjalan menjadi bersaldo Rp 0 (Anggaran Berimbang).
                  </p>
                </div>
                <div className="mt-3 pt-3 border-top border-secondary border-opacity-15">
                  <a href="/informasi-publik/realisasi-apbdes" className="text-decoration-none fw-semibold small d-inline-flex align-items-center gap-1" style={{ color: '#2c5282' }}>
                    <span>Lihat Laporan Realisasi Keuangan</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="apb-card overflow-hidden h-100">
                <table className="table m-0" style={{ fontSize: '0.9rem' }}>
                  <tbody>
                    <tr>
                      <td className="p-3 fw-medium text-muted w-50 border-bottom">Penerimaan Pembiayaan (SiLPA)</td>
                      <td className="p-3 text-end fw-bold border-bottom" style={{ color: '#2c5282' }}>Rp {formatRp(25951371)}</td>
                    </tr>
                    <tr>
                      <td className="p-3 fw-medium text-muted border-bottom">Pengeluaran Pembiayaan</td>
                      <td className="p-3 text-end fw-bold border-bottom" style={{ color: '#64748b' }}>Rp 0</td>
                    </tr>
                    <tr>
                      <td className="p-3 fw-bold text-uppercase border-bottom" style={{ color: '#172554', fontSize: '0.8rem' }}>Pembiayaan Netto</td>
                      <td className="p-3 text-end fw-bold border-bottom" style={{ color: '#2c5282' }}>Rp {formatRp(25951371)}</td>
                    </tr>
                    <tr style={{ backgroundColor: '#172554' }}>
                      <td className="p-3 fw-bold text-uppercase text-white" style={{ fontSize: '0.8rem' }}>SiLPA Tahun Berjalan</td>
                      <td className="p-3 text-end fw-bold text-warning">Rp 0</td>
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