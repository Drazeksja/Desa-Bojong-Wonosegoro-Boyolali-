'use client';

import React from 'react';
import {
  Wallet,
  TrendingUp,
  BarChart3,
  PieChart,
  Landmark,
  FileCheck2,
  ArrowUpRight
} from 'lucide-react';

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
      realisasi: 0
    },
    {
      name: "DD",
      label: "Dana Desa",
      anggaran: 373456000,
      realisasi: 373456000
    },
    {
      name: "ADD",
      label: "Alokasi Dana Desa",
      anggaran: 558523000,
      realisasi: 285470775
    },
    {
      name: "PBH",
      label: "Pajak & Retribusi / Bagi Hasil",
      anggaran: 118112000,
      realisasi: 17471000
    },
    {
      name: "PBK/BKK",
      label: "PBK / BKK",
      anggaran: 75000000,
      realisasi: 75000000
    },
    {
      name: "PBP",
      label: "Penerimaan Bantuan / PBP",
      anggaran: 255475000,
      realisasi: 0
    },
    {
      name: "SILPA",
      label: "SiLPA",
      anggaran: 25951371,
      realisasi: 22969842
    }
  ];

  const totalAnggaran = 1440189371;
  const totalRealisasi = 774367617;

  const persentaseRealisasi =
    (totalRealisasi / totalAnggaran) * 100;

  const formatRp = (angka: number): string => {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0
  }).format(angka);
};

const formatPercent = (angka: number): string => {
  return angka.toFixed(2).replace('.', ',');
};


  return (
    <main className="bg-white min-vh-100 pb-5 pt-5">

      {/* =====================================================
          STYLE
      ===================================================== */}
      <style>{`

        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .delay-1 {
          animation-delay: 0.1s;
        }

        .delay-2 {
          animation-delay: 0.2s;
        }

        .delay-3 {
          animation-delay: 0.3s;
        }

        .delay-4 {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .realisasi-card {
          transition: all 0.25s ease;
        }

        .realisasi-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(37, 99, 235, 0.08);
        }

        .source-bar {
          height: 12px;
          border-radius: 100px;
          background-color: #e5e7eb;
          overflow: hidden;
        }

        .source-bar-fill {
          height: 100%;
          border-radius: 100px;
          background-color: #2563eb;
          transition: width 0.8s ease;
        }

        .donut-chart {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          position: relative;
          background:
            conic-gradient(
              #2563eb 0% 48.23%,
              #60a5fa 48.23% 85.10%,
              #93c5fd 85.10% 87.36%,
              #bfdbfe 87.36% 88.68%,
              #dbeafe 88.68% 100%
            );
        }

        .donut-chart::after {
          content: "";
          position: absolute;
          width: 125px;
          height: 125px;
          background: white;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .donut-center {
          position: absolute;
          z-index: 2;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          width: 100%;
        }

        .table-row-hover {
          transition: background-color 0.2s ease;
        }

        .table-row-hover:hover {
          background-color: #f8fbff;
        }

        .illustration-box {
          background:
            linear-gradient(
              145deg,
              #eff6ff 0%,
              #ffffff 100%
            );
          border: 1px solid rgba(37, 99, 235, 0.12);
          border-radius: 24px;
        }

        @media (max-width: 767px) {
          .donut-chart {
            width: 190px;
            height: 190px;
          }

          .donut-chart::after {
            width: 108px;
            height: 108px;
          }
        }

      `}</style>


      {/* =====================================================
          CONTAINER UTAMA
      ===================================================== */}
      <div
        className="container mt-5 pt-4"
        style={{ maxWidth: '900px' }}
      >


        {/* ===================================================
            PAGE HEADER
        =================================================== */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">

          <h6
            className="fw-bold text-uppercase"
            style={{
              color: 'var(--accent)',
              letterSpacing: '3px',
              fontSize: '0.75rem'
            }}
          >
            Informasi Publik
          </h6>

          <h1
            className="display-4 fw-bold mt-2"
            style={{
              color: 'var(--primary-dark)',
              fontFamily: 'serif'
            }}
          >
            Realisasi APBDes
          </h1>

          <p
            className="text-muted mt-3 mx-auto"
            style={{
              maxWidth: '540px',
              lineHeight: 1.7
            }}
          >
            Informasi capaian realisasi keuangan Desa Bojong
            sampai dengan bulan Juli Tahun Anggaran 2026
            sebagai bentuk transparansi pengelolaan keuangan desa.
          </p>

        </div>


        {/* ===================================================
            RINGKASAN UTAMA
        =================================================== */}
        <section className="mb-5 fade-in-up delay-1">

          <div className="row g-3">

            {/* TOTAL ANGGARAN */}
            <div className="col-md-4">
              <div
                className="realisasi-card h-100 p-4 text-center"
                style={{
                  backgroundColor: '#f8fbff',
                  border: '1px solid rgba(37, 99, 235, 0.12)',
                  borderRadius: '20px'
                }}
              >

                <div
                  className="d-flex justify-content-center mb-3"
                  style={{ color: '#2563eb' }}
                >
                  <Landmark size={32} strokeWidth={1.8} />
                </div>

                <div
                  className="text-uppercase fw-bold mb-2"
                  style={{
                    color: '#64748b',
                    fontSize: '0.72rem',
                    letterSpacing: '1.5px'
                  }}
                >
                  Total Anggaran
                </div>

                <div
                  className="fw-bold"
                  style={{
                    color: '#1e3a8a',
                    fontSize: '1.35rem'
                  }}
                >
                  Rp {formatRp(totalAnggaran)}
                </div>

              </div>
            </div>


            {/* TOTAL REALISASI */}
            <div className="col-md-4">
              <div
                className="realisasi-card h-100 p-4 text-center"
                style={{
                  backgroundColor: '#f8fbff',
                  border: '1px solid rgba(37, 99, 235, 0.12)',
                  borderRadius: '20px'
                }}
              >

                <div
                  className="d-flex justify-content-center mb-3"
                  style={{ color: '#2563eb' }}
                >
                  <Wallet size={32} strokeWidth={1.8} />
                </div>

                <div
                  className="text-uppercase fw-bold mb-2"
                  style={{
                    color: '#64748b',
                    fontSize: '0.72rem',
                    letterSpacing: '1.5px'
                  }}
                >
                  Total Realisasi
                </div>

                <div
                  className="fw-bold"
                  style={{
                    color: '#1e3a8a',
                    fontSize: '1.35rem'
                  }}
                >
                  Rp {formatRp(totalRealisasi)}
                </div>

              </div>
            </div>


            {/* CAPAIAN */}
            <div className="col-md-4">
              <div
                className="realisasi-card h-100 p-4 text-center"
                style={{
                  backgroundColor: '#2563eb',
                  borderRadius: '20px'
                }}
              >

                <div
                  className="d-flex justify-content-center mb-3"
                  style={{ color: '#ffffff' }}
                >
                  <TrendingUp size={32} strokeWidth={1.8} />
                </div>

                <div
                  className="text-uppercase fw-bold mb-2"
                  style={{
                    color: '#dbeafe',
                    fontSize: '0.72rem',
                    letterSpacing: '1.5px'
                  }}
                >
                  Capaian Realisasi
                </div>

                <div
                  className="fw-bold"
                  style={{
                    color: '#ffffff',
                    fontSize: '1.8rem'
                  }}
                >
                  {formatPercent(persentaseRealisasi)}%
                </div>

              </div>
            </div>

          </div>

        </section>


        {/* ===================================================
            GAMBAR / ILUSTRASI TRANSPARANSI
        =================================================== */}
        <section className="mb-5 fade-in-up delay-1">

          <div className="illustration-box p-4 p-md-5">

            <div className="row align-items-center g-4">

              <div className="col-md-5 text-center">

                {/* SVG IMAGE */}
                <svg
                  viewBox="0 0 320 230"
                  width="100%"
                  style={{ maxWidth: '280px' }}
                  xmlns="http://www.w3.org/2000/svg"
                >

                  {/* Gedung */}
                  <rect
                    x="65"
                    y="85"
                    width="190"
                    height="110"
                    rx="5"
                    fill="#dbeafe"
                  />

                  {/* Atap */}
                  <path
                    d="M45 90 L160 35 L275 90 Z"
                    fill="#2563eb"
                  />

                  {/* Pilar */}
                  <rect
                    x="82"
                    y="105"
                    width="25"
                    height="80"
                    fill="#ffffff"
                  />

                  <rect
                    x="125"
                    y="105"
                    width="25"
                    height="80"
                    fill="#ffffff"
                  />

                  <rect
                    x="170"
                    y="105"
                    width="25"
                    height="80"
                    fill="#ffffff"
                  />

                  <rect
                    x="213"
                    y="105"
                    width="25"
                    height="80"
                    fill="#ffffff"
                  />

                  {/* Pintu */}
                  <rect
                    x="142"
                    y="145"
                    width="36"
                    height="50"
                    rx="3"
                    fill="#1e3a8a"
                  />

                  {/* Grafik */}
                  <rect
                    x="225"
                    y="45"
                    width="55"
                    height="45"
                    rx="8"
                    fill="#ffffff"
                    stroke="#2563eb"
                    strokeWidth="2"
                  />

                  <path
                    d="M235 78 L248 65 L258 70 L272 53"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <circle
                    cx="272"
                    cy="53"
                    r="4"
                    fill="#2563eb"
                  />

                  {/* Tanah */}
                  <rect
                    x="30"
                    y="195"
                    width="260"
                    height="8"
                    rx="4"
                    fill="#93c5fd"
                  />

                </svg>

              </div>


              <div className="col-md-7">

                <div
                  className="text-uppercase fw-bold mb-2"
                  style={{
                    color: '#2563eb',
                    letterSpacing: '2px',
                    fontSize: '0.75rem'
                  }}
                >
                  Transparansi Keuangan Desa
                </div>

                <h3
                  className="fw-bold mb-3"
                  style={{
                    color: 'var(--primary-dark)',
                    fontFamily: 'serif'
                  }}
                >
                  Realisasi APBDes Desa Bojong
                </h3>

                <p
                  className="text-muted mb-0"
                  style={{
                    lineHeight: 1.8,
                    fontSize: '0.95rem'
                  }}
                >
                  Data menunjukkan perkembangan realisasi keuangan
                  Desa Bojong sampai dengan bulan Juli 2026.
                  Informasi ini disajikan agar masyarakat dapat
                  mengetahui penggunaan dan capaian anggaran desa
                  secara terbuka dan mudah dipahami.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            PROGRESS REALISASI
        =================================================== */}
        <section className="mb-5 fade-in-up delay-2">

          <div
            className="p-4 p-md-5 border border-secondary border-opacity-25"
            style={{ borderRadius: '22px' }}
          >

            <div className="text-center mb-4">

              <div
                className="d-flex justify-content-center align-items-center gap-2 mb-2"
                style={{ color: '#2563eb' }}
              >
                <BarChart3 size={25} />

                <h6
                  className="fw-bold text-uppercase mb-0"
                  style={{
                    letterSpacing: '1.5px',
                    fontSize: '0.8rem'
                  }}
                >
                  Capaian Realisasi Anggaran
                </h6>
              </div>

              <p
                className="text-muted mb-0"
                style={{ fontSize: '0.9rem' }}
              >
                Sampai dengan bulan Juli 2026
              </p>

            </div>


            {/* Progress */}
            <div className="mb-3">

              <div className="d-flex justify-content-between mb-2">

                <span
                  className="fw-semibold"
                  style={{ color: '#374151' }}
                >
                  Realisasi
                </span>

                <span
                  className="fw-bold"
                  style={{ color: '#2563eb' }}
                >
                  {formatPercent(persentaseRealisasi)}%
                </span>

              </div>

              <div
                style={{
                  height: '18px',
                  borderRadius: '100px',
                  backgroundColor: '#dbeafe',
                  overflow: 'hidden'
                }}
              >

                <div
                  style={{
                    width: `${persentaseRealisasi}%`,
                    height: '100%',
                    backgroundColor: '#2563eb',
                    borderRadius: '100px'
                  }}
                />

              </div>

            </div>


            <div className="row mt-4 text-center">

              <div className="col-6">

                <div
                  className="fw-bold"
                  style={{
                    color: '#1e3a8a',
                    fontSize: '1.1rem'
                  }}
                >
                  Rp {formatRp(totalRealisasi)}
                </div>

                <div
                  className="text-muted"
                  style={{ fontSize: '0.75rem' }}
                >
                  Sudah Direalisasikan
                </div>

              </div>


              <div className="col-6">

                <div
                  className="fw-bold"
                  style={{
                    color: '#64748b',
                    fontSize: '1.1rem'
                  }}
                >
                  Rp {formatRp(totalAnggaran - totalRealisasi)}
                </div>

                <div
                  className="text-muted"
                  style={{ fontSize: '0.75rem' }}
                >
                  Belum Terealisasi
                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            GRAFIK ANGGARAN VS REALISASI
        =================================================== */}
        <section className="mb-5 fade-in-up delay-2">

          <div
            className="p-4 p-md-5 border border-secondary border-opacity-25"
            style={{ borderRadius: '22px' }}
          >

            <div className="text-center mb-5">

              <div
                className="d-flex justify-content-center align-items-center gap-2"
                style={{ color: '#2563eb' }}
              >
                <BarChart3 size={25} />

                <h6
                  className="fw-bold text-uppercase mb-0"
                  style={{
                    letterSpacing: '1.5px',
                    fontSize: '0.8rem'
                  }}
                >
                  Grafik Anggaran & Realisasi
                </h6>
              </div>

              <p
                className="text-muted mt-2 mb-0"
                style={{ fontSize: '0.9rem' }}
              >
                Perbandingan setiap sumber dana Desa Bojong
              </p>

            </div>


            <div className="d-flex flex-column gap-4">

              {data.map((item, index) => {

                const percent =
                  item.anggaran > 0
                    ? (item.realisasi / item.anggaran) * 100
                    : 0;

                return (
                  <div key={index}>

                    <div className="d-flex justify-content-between align-items-end mb-2">

                      <div>

                        <div
                          className="fw-bold"
                          style={{
                            color: '#374151',
                            fontSize: '0.9rem'
                          }}
                        >
                          {item.name}
                        </div>

                        <div
                          className="text-muted"
                          style={{ fontSize: '0.75rem' }}
                        >
                          {item.label}
                        </div>

                      </div>


                      <div className="text-end">

                        <div
                          className="fw-bold"
                          style={{
                            color: '#2563eb',
                            fontSize: '0.85rem'
                          }}
                        >
                          {formatPercent(percent)}%
                        </div>

                        <div
                          className="text-muted"
                          style={{ fontSize: '0.7rem' }}
                        >
                          Rp {formatRp(item.realisasi)}
                        </div>

                      </div>

                    </div>


                    {/* Anggaran */}
                    <div
                      className="position-relative mb-2"
                      style={{
                        height: '10px',
                        borderRadius: '100px',
                        backgroundColor: '#dbeafe'
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: '100px',
                          backgroundColor: '#93c5fd'
                        }}
                      />
                    </div>


                    {/* Realisasi */}
                    <div
                      style={{
                        height: '10px',
                        borderRadius: '100px',
                        backgroundColor: '#f1f5f9',
                        overflow: 'hidden'
                      }}
                    >
                      <div
                        style={{
                          width: `${Math.min(percent, 100)}%`,
                          height: '100%',
                          borderRadius: '100px',
                          backgroundColor: '#2563eb'
                        }}
                      />
                    </div>

                  </div>
                );

              })}

            </div>


            {/* Legend */}
            <div className="d-flex justify-content-center gap-4 mt-5">

              <div className="d-flex align-items-center gap-2">

                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: '#93c5fd'
                  }}
                />

                <span
                  className="text-muted"
                  style={{ fontSize: '0.75rem' }}
                >
                  Anggaran
                </span>

              </div>


              <div className="d-flex align-items-center gap-2">

                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    backgroundColor: '#2563eb'
                  }}
                />

                <span
                  className="text-muted"
                  style={{ fontSize: '0.75rem' }}
                >
                  Realisasi
                </span>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            DETAIL DATA
        =================================================== */}
        <section className="mb-5 fade-in-up delay-4">

          <div
            className="p-4 p-md-5 border border-secondary border-opacity-25"
            style={{ borderRadius: '22px' }}
          >

            <div className="text-center mb-4">

              <div
                className="d-flex justify-content-center align-items-center gap-2"
                style={{ color: '#2563eb' }}
              >
                <FileCheck2 size={25} />

                <h6
                  className="fw-bold text-uppercase mb-0"
                  style={{
                    letterSpacing: '1.5px',
                    fontSize: '0.8rem'
                  }}
                >
                  Rincian Realisasi Per Sumber Dana
                </h6>

              </div>

            </div>


            <div className="table-responsive">

              <table
                className="table align-middle mb-0"
                style={{ fontSize: '0.85rem' }}
              >

                <thead>

                  <tr
                    style={{
                      backgroundColor: '#2563eb',
                      color: '#ffffff'
                    }}
                  >

                    <th
                      className="p-3"
                      style={{
                        borderTopLeftRadius: '10px'
                      }}
                    >
                      Sumber Dana
                    </th>

                    <th className="p-3 text-end">
                      Anggaran
                    </th>

                    <th className="p-3 text-end">
                      Realisasi
                    </th>

                    <th
                      className="p-3 text-end"
                      style={{
                        borderTopRightRadius: '10px'
                      }}
                    >
                      Capaian
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {data.map((item, index) => {

                    const percent =
                      item.anggaran > 0
                        ? (item.realisasi / item.anggaran) * 100
                        : 0;

                    return (
                      <tr
                        key={index}
                        className="table-row-hover"
                      >

                        <td className="p-3">

                          <div
                            className="fw-bold"
                            style={{
                              color: '#1e3a8a'
                            }}
                          >
                            {item.name}
                          </div>

                          <div
                            className="text-muted"
                            style={{
                              fontSize: '0.7rem'
                            }}
                          >
                            {item.label}
                          </div>

                        </td>


                        <td className="p-3 text-end">

                          Rp {formatRp(item.anggaran)}

                        </td>


                        <td
                          className="p-3 text-end fw-bold"
                          style={{
                            color: '#2563eb'
                          }}
                        >

                          Rp {formatRp(item.realisasi)}

                        </td>


                        <td className="p-3 text-end">

                          <span
                            className="fw-bold"
                            style={{
                              color:
                                percent === 100
                                  ? '#2563eb'
                                  : '#64748b'
                            }}
                          >
                            {formatPercent(percent)}%
                          </span>

                        </td>

                      </tr>
                    );

                  })}


                  {/* TOTAL */}
                  <tr>

                    <td
                      className="p-3 fw-bold"
                      style={{
                        color: '#1e3a8a',
                        borderTop: '2px solid #2563eb'
                      }}
                    >
                      TOTAL
                    </td>

                    <td
                      className="p-3 text-end fw-bold"
                      style={{
                        borderTop: '2px solid #2563eb'
                      }}
                    >
                      Rp {formatRp(totalAnggaran)}
                    </td>

                    <td
                      className="p-3 text-end fw-bold"
                      style={{
                        color: '#2563eb',
                        borderTop: '2px solid #2563eb'
                      }}
                    >
                      Rp {formatRp(totalRealisasi)}
                    </td>

                    <td
                      className="p-3 text-end fw-bold"
                      style={{
                        color: '#2563eb',
                        borderTop: '2px solid #2563eb'
                      }}
                    >
                      {formatPercent(persentaseRealisasi)}%
                    </td>

                  </tr>

                </tbody>

              </table>

            </div>

          </div>

        </section>


        {/* ===================================================
            FOOTER INFORMATION
        =================================================== */}
        <div
          className="text-center text-muted pt-2"
          style={{ fontSize: '0.75rem' }}
        >

          <ArrowUpRight
            size={13}
            className="me-1"
          />

          Sumber data: Capaian Realisasi Keuangan Desa
          sampai dengan Bulan Juli 2026

        </div>

      </div>

    </main>
  );
}