import Image from "next/image";
import { FileText, CheckCircle2, AlertCircle } from "lucide-react";

export default function KesehatanDesa() {
  // Data Grafik 1: Prevalensi & Indikator Kesehatan Utama Desa Bojong
  const grafikPHBS = [
    { indikator: "Rumah Tangga Ber-PHBS", nilai: 78, target: "85%" },
    { indikator: "Kepemilikan Jamban Sehat", nilai: 92, target: "100%" },
    { indikator: "Balita Ditimbang Rutin (KMS)", nilai: 88, target: "90%" },
    { indikator: "Persalinan oleh Nakes", nilai: 96, target: "100%" },
    { indikator: "Skrining Hipertensi Dewasa/Lansia", nilai: 64, target: "80%" },
  ];

  // Data Tabel Jadwal Pelayanan
  const jadwalPelayanan = [
    { kegiatan: "Posyandu Balita Dk. Bojong", hari: "Senin Minggu I", waktu: "08:00 – 11:00 WIB", lokasi: "Posyandu Bojong", sasaran: "Balita & Ibu Hamil", petugas: "Bidan Desa & Kader" },
    { kegiatan: "Posyandu Balita Dk. Kliyo", hari: "Selasa Minggu I", waktu: "08:00 – 11:00 WIB", lokasi: "Posyandu Kliyo", sasaran: "Balita & Ibu Hamil", petugas: "Bidan Desa & Kader" },
    { kegiatan: "Posyandu Balita Dk. Pendem", hari: "Rabu Minggu II", waktu: "08:00 – 11:00 WIB", lokasi: "Posyandu Pendem", sasaran: "Balita & Ibu Hamil", petugas: "Bidan Desa & Kader" },
    { kegiatan: "Posyandu Lansia & Skrining Hipertensi", hari: "Jumat Minggu III", waktu: "08:30 – 11:30 WIB", lokasi: "Polindes Desa Bojong", sasaran: "Lansia (> 60 Thn)", petugas: "Tim Kesehatan Desa" },
    { kegiatan: "Pemeriksaan Kehamilan (ANC) & TTD", hari: "Setiap Kamis", waktu: "09:00 – 12:00 WIB", lokasi: "Polindes Desa Bojong", sasaran: "Ibu Hamil", petugas: "Bidan Desa" },
  ];

  // Data Tabel Panduan PHBS
  const pilarPHBS = [
    {
      pilar: "I. Pencegahan Penyakit & Lingkungan",
      item: [
        "Mencuci tangan dengan sabun & air mengalir sebelum/setelah aktivitas",
        "Pengelolaan air minum & makanan higienis (memasak matang)",
        "Penggunaan air bersih & penampungan tertutup (bebas kotoran)",
        "Kepemilikan & penggunaan jamban sehat tangki septik",
        "Pengelolaan limbah cair rumah tangga agar tidak menggenang",
        "Pemberantasan Sarana Nyamuk (PSN) 3M Plus secara berkala",
        "Menerapkan Kawasan Bebas Asap Rokok di dalam rumah"
      ]
    },
    {
      pilar: "II. Kesehatan Ibu, Anak & KB",
      item: [
        "Persalinan ditolong oleh Bidan / Bidan Desa / Nakes kompeten",
        "Menimbang berat & tinggi balita setiap bulan di Posyandu",
        "Pemberian Imunisasi Dasar Lengkap (Hepatitis B, BCG, Polio, DPT, MR)",
        "Menjadi akseptor Keluarga Berencana (KB Jangka Pendek / MKJP)"
      ]
    },
    {
      pilar: "III. Gizi Seimbang & Farmasi",
      item: [
        "Pola makan bergizi seimbang sesuai pedoman Isi Piringku",
        "Konsumsi minimal 90 Tablet Tambah Darah (TTD) selama kehamilan",
        "Pemberian Air Susu Ibu (ASI) Eksklusif hingga usia 6 bulan",
        "Penggunaan garam beryodium dalam pengolahan makanan harian"
      ]
    },
    {
      pilar: "IV. Pemeliharaan Kesehatan & UKBM",
      item: [
        "Kepesertaan aktif Jaminan Kesehatan Nasional (BPJS / KIS)",
        "Keaktifan dalam UKBM (Posyandu, Posbindu PTM, Poskesdes)",
        "Pemanfaatan layanan Polindes dan Puskesmas secara berkala"
      ]
    }
  ];

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: '960px' }}>

        {/* Document Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <p className="fw-bold text-uppercase mb-2" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>
            MONOGRAFI DIGITAL &middot; PELAYANAN KESEHATAN MASYARAKAT DESA BOJONG
          </p>
          <h1 className="display-4 fw-bold mt-1" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>
            Edukasi & Pelayanan Kesehatan
          </h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '640px', lineHeight: 1.7 }}>
            Panduan Perilaku Hidup Bersih & Sehat (PHBS), penanganan risiko hipertensi, data indikator pelayanan kesehatan, dan inventaris Posyandu Desa Bojong.
          </p>
        </div>

        {/* Section 1: Pengantar & Permasalahan Hipertensi dengan Frame Foto Acak */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>
                Pendahuluan & Permasalahan Utama
              </h2>
              <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify', color: '#374151' }}>
                <span style={{ float: 'left', fontSize: '4.2rem', lineHeight: '0.7', paddingRight: '12px', paddingTop: '8px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>K</span>
                esehatan merupakan modal utama dalam menjalani aktivitas sehari-hari. Dengan menjaga pola hidup bersih dan sehat, masyarakat Desa <span style={{ fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic' }}>Bojong</span> dapat mencegah berbagai penyakit serta menciptakan lingkungan yang sehat. Sejalan dengan pedoman Kementerian Kesehatan RI (2011), Perilaku Hidup Bersih dan Sehat (PHBS) dilaksanakan atas dasar kesadaran untuk menjaga kesehatan secara mandiri.
              </p>

              {/* Box Warning Hipertensi (Document Style) */}
              <div className="mt-4 p-4" style={{ border: '2px solid var(--primary-dark)', backgroundColor: 'var(--bg-surface)' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <AlertCircle size={20} style={{ color: 'var(--primary-dark)' }} />
                  <h5 className="fw-bold mb-0 text-uppercase" style={{ fontFamily: 'serif', letterSpacing: '1px', fontSize: '1rem', color: 'var(--primary-dark)' }}>
                    Permasalahan Utama: Hipertensi (Tekanan Darah Tinggi)
                  </h5>
                </div>
                <p className="small text-muted mb-3" style={{ lineHeight: 1.7, textAlign: 'justify' }}>
                  Salah satu masalah kesehatan yang paling sering ditemukan pada warga dewasa dan lansia di Desa Bojong adalah <strong>Hipertensi</strong>. Kondisi ini sering tidak menunjukkan gejala khas namun berisiko memicu stroke, penyakit jantung, dan gangguan ginjal.
                </p>
                <div className="fw-bold small text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '1px', fontSize: '0.75rem' }}>
                  Gejala Yang Perlu Diwaspadai:
                </div>
                <div className="row g-2 small text-muted">
                  <div className="col-6">&bull; Sakit kepala bagian belakang</div>
                  <div className="col-6">&bull; Pusing / kepala terasa berat</div>
                  <div className="col-6">&bull; Pandangan kabur</div>
                  <div className="col-6">&bull; Jantung berdebar & mudah lelah</div>
                </div>
              </div>
            </div>

{/* Right: Foto Kegiatan Posyandu - gaya sama seperti foto Kepala Desa, tapi staggered 2 foto */}
<div className="col-lg-5">
  <div className="position-relative py-3">
    {/* Foto 1 */}
    <div
      className="card border-0 shadow-lg overflow-hidden mx-auto mb-4"
      style={{ borderRadius: '16px', maxWidth: '300px', transform: 'rotate(-1.5deg)' }}
    >
      <div
        className="position-relative w-100"
        style={{ height: '220px', background: 'linear-gradient(to bottom, #e2e8f0, #cbd5e1)' }}
      >
        <Image
          src="/w.jpg"
          alt="Foto"
          fill
          className="object-fit-cover"
        />
        <div
          className="position-absolute bottom-0 start-0 w-100 p-3 text-center"
          style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.95), transparent)' }}
        >
          <h6
            className="text-white fw-bold mb-0 small text-uppercase"
            style={{ fontSize: '10px', letterSpacing: '2px' }}
          >
            Bidan Desa
          </h6>
          <div style={{ width: '32px', height: '2px', background: '#fbbf24', margin: '8px auto' }}></div>
          <h5 className="text-white fw-bold mb-0" style={{ fontSize: '0.95rem' }}>
            Ibu Titik Retnowati
          </h5>
        </div>
      </div>
    </div>

    {/* Foto 2 */}
    <div
      className="card border-0 shadow-lg overflow-hidden ms-auto"
      style={{ borderRadius: '16px', maxWidth: '280px', marginTop: '-20px', transform: 'rotate(1.5deg)' }}
    >
      <div
        className="position-relative w-100"
        style={{ height: '200px', background: 'linear-gradient(to bottom, #e2e8f0, #cbd5e1)' }}
      >
        <Image
          src="/i.jpg"
          alt="Foto"
          fill
          className="object-fit-cover"
        />
        <div
          className="position-absolute bottom-0 start-0 w-100 p-3 text-center"
          style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.95), transparent)' }}
        >
          <h6
            className="text-white fw-bold mb-0 small text-uppercase"
            style={{ fontSize: '10px', letterSpacing: '2px' }}
          >
            Ketua Kader Posyandu
          </h6>
          <div style={{ width: '32px', height: '2px', background: '#fbbf24', margin: '8px auto' }}></div>
          <h5 className="text-white fw-bold mb-0" style={{ fontSize: '0.95rem' }}>
            Ibu Rukini
          </h5>
        </div>
      </div>
    </div>
  </div>
</div>
          </div>
        </section>

        {/* Section 2: GRAFIK INDIKATOR KESEHATAN DESA (Grafik Resmi Dokumen, Bukan AI Slop Card) */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>
            Grafik Indikator Pelayanan Kesehatan
          </h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
            Persentase capaian indikator kesehatan dan pelayanan Posyandu di Desa Bojong berdasarkan data pemantauan berkala:
          </p>

          {/* Graphic Bar Chart - Document & Editorial Style */}
          <div className="p-4" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)' }}>
            <h5 className="fw-bold mb-4 text-center text-uppercase" style={{ fontFamily: 'serif', color: 'var(--primary-dark)', fontSize: '1rem', letterSpacing: '1px' }}>
              CAPAIAN INDIKATOR PHBS & PELAYANAN DESA BOJONG (%)
            </h5>

            <div className="d-flex flex-column gap-4">
              {grafikPHBS.map((item, idx) => (
                <div key={idx}>
                  <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.9rem' }}>
                    <span className="fw-bold" style={{ color: '#1e293b' }}>{item.indikator}</span>
                    <span className="fw-bold" style={{ fontFamily: 'serif', color: 'var(--primary-dark)' }}>
                      {item.nilai}% <span className="text-muted fw-normal small">(Target: {item.target})</span>
                    </span>
                  </div>
                  {/* Bar Outer */}
                  <div className="w-100" style={{ height: '18px', backgroundColor: '#e2e8f0', border: '1px solid #cbd5e1' }}>
                    {/* Bar Inner */}
                    <div 
                      style={{ 
                        width: `${item.nilai}%`, 
                        height: '100%', 
                        backgroundColor: 'var(--primary-dark)',
                        transition: 'width 0.6s ease'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between text-muted small" style={{ fontSize: '0.75rem' }}>
              <span>Skala: 0% - 100%</span>
              <span>Sumber: Laporan Bidan Desa & Monografi Kesehatan Bojong</span>
            </div>
          </div>
        </section>

        {/* Section 3: TABEL JADWAL PELAYANAN KESEHATAN (Diperbagus & Resmi) */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="d-flex justify-content-between align-items-end mb-3">
            <div>
              <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>
                Jadwal Pelayanan Kesehatan & Posyandu
              </h2>
              <div className="mt-2" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>
            </div>
          </div>

          <div className="table-responsive" style={{ border: '2px solid var(--primary-dark)' }}>
            <table className="w-100" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary-dark)', color: '#fff' }}>
                  <th className="py-3 px-3 text-uppercase fw-bold border-end border-secondary border-opacity-25" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Nama Pelayanan</th>
                  <th className="py-3 px-3 text-uppercase fw-bold border-end border-secondary border-opacity-25" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Hari & Waktu</th>
                  <th className="py-3 px-3 text-uppercase fw-bold border-end border-secondary border-opacity-25" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Lokasi Fasilitas</th>
                  <th className="py-3 px-3 text-uppercase fw-bold border-end border-secondary border-opacity-25" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Sasaran</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Petugas</th>
                </tr>
              </thead>
              <tbody>
                {jadwalPelayanan.map((j, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', backgroundColor: i % 2 === 0 ? 'var(--bg-white)' : 'var(--bg-surface)' }}>
                    <td className="py-3 px-3 fw-bold border-end" style={{ fontSize: '0.9rem', color: '#0f172a', borderColor: '#e2e8f0' }}>{j.kegiatan}</td>
                    <td className="py-3 px-3 border-end" style={{ fontSize: '0.85rem', color: '#334155', borderColor: '#e2e8f0' }}>
                      <div className="fw-bold">{j.hari}</div>
                      <div className="small text-muted">{j.waktu}</div>
                    </td>
                    <td className="py-3 px-3 border-end" style={{ fontSize: '0.85rem', color: '#334155', borderColor: '#e2e8f0' }}>{j.lokasi}</td>
                    <td className="py-3 px-3 border-end" style={{ fontSize: '0.85rem', color: '#334155', borderColor: '#e2e8f0' }}>{j.sasaran}</td>
                    <td className="py-3 px-3" style={{ fontSize: '0.85rem', color: '#334155' }}>{j.petugas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 4: 4 PILAR UTAMA PHBS (Tabel Dokumentatif & Rapi dari KESEHATAN.md) */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>
            Pedoman 4 Pilar Perilaku Hidup Bersih & Sehat (PHBS)
          </h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <div className="row g-4">
            {pilarPHBS.map((pilar, idx) => (
              <div className="col-md-6" key={idx}>
                <div className="p-4 h-100" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-white)' }}>
                  <h5 className="fw-bold mb-3 pb-2 border-bottom" style={{ fontFamily: 'serif', color: 'var(--primary-dark)', fontSize: '1rem', borderColor: '#cbd5e1' }}>
                    {pilar.pilar}
                  </h5>
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-2" style={{ fontSize: '0.9rem', color: '#334155' }}>
                    {pilar.item.map((it, i) => (
                      <li key={i} className="d-flex align-items-start gap-2">
                        <CheckCircle2 size={16} className="flex-shrink-0 mt-1" style={{ color: 'var(--primary-dark)' }} />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: TAMBAHAN FRAME FOTO RANDOM BERKALA */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-4 text-center" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.85rem', fontFamily: 'serif' }}>
            ARSIP FOTO DOKUMENTASI KESEHATAN DESA
          </h2>

          <div className="row g-4 justify-content-center">
            {[
              { cap: "Pemeriksaan Balita & Imunisasi", rot: 'rotate(-1deg)' },
              { cap: "Penyuluhan PHBS Rumah Tangga", rot: 'rotate(1.5deg)' },
              { cap: "Posyandu Lansia Polindes", rot: 'rotate(-2deg)' },
              { cap: "Pemeriksaan Jentik Nyamuk (PSN)", rot: 'rotate(1deg)' },
            ].map((f, idx) => (
              <div className="col-6 col-md-3" key={idx}>
                <div className="p-2 bg-white shadow-sm h-100" style={{ border: '1px solid #94a3b8', transform: f.rot }}>
                  <div className="position-relative w-100" style={{ height: '140px', backgroundColor: '#cbd5e1' }}>
                    <Image src="/placeholder.webp" alt={f.cap} fill className="object-fit-cover" />
                  </div>
                  <div className="p-2 text-center">
                    <span className="small text-muted" style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '0.75rem' }}>
                      [{f.cap}]
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: DAFTAR PUSTAKA & METADATA TRANSPARANSI */}
        <section className="mb-4">
          <div className="p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h6 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', letterSpacing: '1px' }}>
              DAFTAR PUSTAKA & SUMBER DATA RESMI
            </h6>
            <p className="small text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Kementerian Kesehatan RI. (2011). <em>Pedoman Pembinaan Perilaku Hidup Bersih dan Sehat (PHBS)</em>. Jakarta: Kementerian Kesehatan RI.<br />
              Data Posyandu & Bidan Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali.
            </p>
            <div className="pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="fw-bold small text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#475569' }}>
                STATUS ARSIP: DOKUMEN MONOGRAFI KESEHATAN DESA
              </span>
              <span className="small text-muted" style={{ fontSize: '0.75rem' }}>
                DATA TERAKHIR DIPERBARUI: 12 AGUSTUS 2026
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}