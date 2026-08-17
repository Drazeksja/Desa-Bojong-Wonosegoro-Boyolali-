'use client';

import React from 'react';
import { ArrowUpRight, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RealisasiAPBDesPage() {
  // =========================================================
  // DATA REALISASI APBDES DESA BOJONG
  // SUMBER: DATA REALISASI APBDES 2026 PER SUMBER DANA JULI 2026
  // =========================================================

  const data = [
    {
      name: "PAD",
      label: "Pendapatan Asli Desa",
      anggaran: 33672000,
      realisasi: 0,
      keterangan: "Penerimaan hasil aset & usaha desa semester II"
    },
    {
      name: "DD",
      label: "Dana Desa (APBN)",
      anggaran: 373456000,
      realisasi: 373456000,
      keterangan: "Realisasi Tahap I & II 100%"
    },
    {
      name: "ADD",
      label: "Alokasi Dana Desa (APBD Kab)",
      anggaran: 558523000,
      realisasi: 285470775,
      keterangan: "Penyaluran bertahap operasional & Siltap"
    },
    {
      name: "PBH",
      label: "Bagi Hasil Pajak & Retribusi",
      anggaran: 118112000,
      realisasi: 17471000,
      keterangan: "Realisasi bagi hasil pajak daerah"
    },
    {
      name: "PBK/BKK",
      label: "Bantuan Keuangan Kabupaten",
      anggaran: 75000000,
      realisasi: 75000000,
      keterangan: "Realisasi BKK sarana infrastruktur"
    },
    {
      name: "PBP",
      label: "Bantuan Keuangan Provinsi",
      anggaran: 255475000,
      realisasi: 0,
      keterangan: "Proses administrasi pencairan tahap lanjutan"
    },
    {
      name: "SILPA",
      label: "Sisa Lebih Perhitungan Anggaran",
      anggaran: 25951371,
      realisasi: 22969842,
      keterangan: "Penggunaan saldo kas tahun sebelumnya"
    }
  ];

  const totalAnggaran = 1440189371;
  const totalRealisasi = 774367617;
  const persentaseRealisasi = (totalRealisasi / totalAnggaran) * 100;

  const formatRp = (angka: number): string => {
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(angka);
  };

  const formatPercent = (angka: number): string => {
    return angka.toFixed(2).replace('.', ',');
  };

  return (
    <main className="bg-white min-vh-100 pb-5 pt-5">
      <style>{`
        .real-header {
          opacity: 0;
          transform: translateY(-20px);
          animation: realFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .real-section {
          opacity: 0;
          transform: translateY(25px);
          animation: realFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .real-section.delay-1 { animation-delay: 0.15s; }
        .real-section.delay-2 { animation-delay: 0.3s; }
        .real-section.delay-3 { animation-delay: 0.45s; }

        .real-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .real-card:hover {
          border-color: #cbd5e1;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.04);
        }

        .table-row-hover {
          transition: background-color 0.2s ease;
        }
        .table-row-hover:hover {
          background-color: #f8fafc;
        }

        @keyframes realFadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes realFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container mt-5 pt-4" style={{ maxWidth: '940px' }}>

        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4 real-header">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-2" 
               style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <span className="fw-semibold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '0.72rem' }}>
              Pemerintah Desa Bojong &middot; Transparansi Keuangan
            </span>
          </div>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>
            Laporan Realisasi APBDes
          </h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '580px', lineHeight: 1.7 }}>
            Laporan pertanggungjawaban realisasi anggaran pendapatan dan belanja Desa Bojong sampai dengan bulan Juli Tahun Anggaran 2026 per sumber dana.
          </p>
        </div>

        {/* Ringkasan Realisasi 3 Kolom */}
        <section className="mb-5 real-section delay-1">
          <div className="row g-3">
            {/* Total Anggaran */}
            <div className="col-md-4">
              <div className="real-card p-4 h-100" style={{ background: '#f8fafc' }}>
                <span className="text-uppercase fw-semibold small text-muted d-block mb-1" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                  Total Pagu Anggaran
                </span>
                <div className="h4 fw-bold mb-1" style={{ color: '#172554', letterSpacing: '-0.5px' }}>
                  Rp {formatRp(totalAnggaran)}
                </div>
                <span className="small text-muted">7 Pos Sumber Dana</span>
              </div>
            </div>

            {/* Total Realisasi */}
            <div className="col-md-4">
              <div className="real-card p-4 h-100" style={{ background: '#f8fafc' }}>
                <span className="text-uppercase fw-semibold small text-muted d-block mb-1" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                  Realisasi sd Juli 2026
                </span>
                <div className="h4 fw-bold mb-1" style={{ color: '#2c5282', letterSpacing: '-0.5px' }}>
                  Rp {formatRp(totalRealisasi)}
                </div>
                <span className="small text-muted">Sisa: Rp {formatRp(totalAnggaran - totalRealisasi)}</span>
              </div>
            </div>

            {/* Persentase Capaian */}
            <div className="col-md-4">
              <div className="real-card p-4 h-100" style={{ background: '#2c5282', color: '#ffffff' }}>
                <span className="text-uppercase fw-semibold small text-white text-opacity-75 d-block mb-1" style={{ letterSpacing: '1px', fontSize: '0.75rem' }}>
                  Persentase Capaian
                </span>
                <div className="h3 fw-bold mb-1 text-white" style={{ letterSpacing: '-0.5px' }}>
                  {formatPercent(persentaseRealisasi)}%
                </div>
                <span className="small text-warning">Semester I Berjalan</span>
              </div>
            </div>
          </div>
        </section>

        {/* Progress Bar Keseluruhan */}
        <section className="mb-5 real-section delay-1">
          <div className="real-card p-4 p-md-5">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="fw-bold text-dark" style={{ fontSize: '0.95rem' }}>Progres Realisasi Keuangan Desa</span>
              <span className="fw-bold" style={{ color: '#2c5282', fontSize: '1.1rem' }}>{formatPercent(persentaseRealisasi)}%</span>
            </div>
            
            <div className="w-100 rounded-pill overflow-hidden my-3" style={{ height: '18px', backgroundColor: '#e2e8f0' }}>
              <div 
                className="rounded-pill" 
                style={{ 
                  width: `${persentaseRealisasi}%`, 
                  height: '100%', 
                  backgroundColor: '#2c5282',
                  transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
              ></div>
            </div>

            <div className="d-flex justify-content-between text-muted small mt-2" style={{ fontSize: '0.78rem' }}>
              <span>Terealisasi: <strong>Rp {formatRp(totalRealisasi)}</strong></span>
              <span>Sisa Pagu: <strong>Rp {formatRp(totalAnggaran - totalRealisasi)}</strong></span>
            </div>
          </div>
        </section>

        {/* GRAFIK ANGGARAN VS REALISASI PER SUMBER DANA */}
        <section className="mb-5 real-section delay-2">
          <div className="real-card p-4 p-md-5">
            <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
              <div>
                <h5 className="fw-bold mb-1" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>
                  Grafik Capaian per Sumber Dana
                </h5>
                <p className="text-muted small mb-0">Perbandingan alokasi pagu anggaran dan penyerapan dana</p>
              </div>
              <div className="d-none d-sm-flex align-items-center gap-3 small">
                <div className="d-flex align-items-center gap-1.5">
                  <span style={{ width: '10px', height: '10px', backgroundColor: '#cbd5e1', borderRadius: '2px' }}></span>
                  <span className="text-muted">Pagu</span>
                </div>
                <div className="d-flex align-items-center gap-1.5">
                  <span style={{ width: '10px', height: '10px', backgroundColor: '#2c5282', borderRadius: '2px' }}></span>
                  <span className="text-muted">Realisasi</span>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-4">
              {data.map((item, index) => {
                const percent = item.anggaran > 0 ? (item.realisasi / item.anggaran) * 100 : 0;
                return (
                  <div key={index} className="pb-3 border-bottom" style={{ borderColor: '#f1f5f9' }}>
                    <div className="d-flex justify-content-between align-items-baseline mb-1.5">
                      <div>
                        <span className="fw-bold text-dark me-2" style={{ fontSize: '0.92rem' }}>{item.name}</span>
                        <span className="text-muted small">({item.label})</span>
                      </div>
                      <div className="text-end">
                        <span className="fw-bold me-2" style={{ color: '#2c5282', fontSize: '0.9rem' }}>{formatPercent(percent)}%</span>
                        <span className="text-muted small">Rp {formatRp(item.realisasi)} / Rp {formatRp(item.anggaran)}</span>
                      </div>
                    </div>

                    {/* Double Bar Comparison */}
                    <div className="d-flex flex-column gap-1">
                      {/* Pagu Background Bar */}
                      <div className="w-100 rounded-pill overflow-hidden" style={{ height: '8px', backgroundColor: '#e2e8f0' }}>
                        <div 
                          className="rounded-pill" 
                          style={{ 
                            width: `${Math.min(percent, 100)}%`, 
                            height: '100%', 
                            backgroundColor: '#2c5282',
                            transition: 'width 0.8s ease'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TABEL RINCIAN LENGKAP */}
        <section className="mb-5 real-section delay-3">
          <div className="real-card overflow-hidden">
            <div className="py-3 px-4" style={{ backgroundColor: '#172554', color: '#fff' }}>
              <h5 className="fw-bold mb-0 text-white" style={{ fontSize: '1rem', fontFamily: 'serif' }}>
                Tabel Rincian Realisasi per Sumber Dana
              </h5>
            </div>

            <div className="table-responsive">
              <table className="table align-middle m-0" style={{ fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc', color: '#475569' }}>
                    <th className="py-3 px-4 text-uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Sumber Dana</th>
                    <th className="py-3 px-3 text-end text-uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Pagu Anggaran</th>
                    <th className="py-3 px-3 text-end text-uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Realisasi</th>
                    <th className="py-3 px-4 text-end text-uppercase fw-semibold" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>Capaian</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => {
                    const percent = item.anggaran > 0 ? (item.realisasi / item.anggaran) * 100 : 0;
                    return (
                      <tr key={index} className="table-row-hover" style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td className="py-3 px-4">
                          <div className="fw-bold text-dark">{item.name}</div>
                          <div className="text-muted small" style={{ fontSize: '0.75rem' }}>{item.label}</div>
                        </td>
                        <td className="py-3 px-3 text-end text-muted">Rp {formatRp(item.anggaran)}</td>
                        <td className="py-3 px-3 text-end fw-semibold" style={{ color: '#2c5282' }}>Rp {formatRp(item.realisasi)}</td>
                        <td className="py-3 px-4 text-end">
                          <span 
                            className="badge rounded-pill fw-semibold px-2.5 py-1" 
                            style={{ 
                              backgroundColor: percent === 100 ? 'rgba(5, 150, 105, 0.1)' : percent > 0 ? 'rgba(44, 82, 130, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                              color: percent === 100 ? '#059669' : percent > 0 ? '#2c5282' : '#64748b'
                            }}
                          >
                            {formatPercent(percent)}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  
                  {/* Total Row */}
                  <tr style={{ backgroundColor: '#f8fafc', borderTop: '2px solid #2c5282' }}>
                    <td className="py-3 px-4 fw-bold" style={{ color: '#172554' }}>TOTAL KESELURUHAN</td>
                    <td className="py-3 px-3 text-end fw-bold" style={{ color: '#172554' }}>Rp {formatRp(totalAnggaran)}</td>
                    <td className="py-3 px-3 text-end fw-bold" style={{ color: '#2c5282' }}>Rp {formatRp(totalRealisasi)}</td>
                    <td className="py-3 px-4 text-end">
                      <span className="badge rounded-pill bg-primary fw-bold px-2.5 py-1" style={{ backgroundColor: '#2c5282' }}>
                        {formatPercent(persentaseRealisasi)}%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Footer Metadata */}
        <div className="text-center text-muted small pt-2" style={{ fontSize: '0.75rem' }}>
          <ArrowUpRight size={13} className="me-1" />
          Sumber data: Laporan Resmi Capaian Realisasi Keuangan Desa Bojong per Sumber Dana sd Juli 2026.
        </div>

      </div>
    </main>
  );
}