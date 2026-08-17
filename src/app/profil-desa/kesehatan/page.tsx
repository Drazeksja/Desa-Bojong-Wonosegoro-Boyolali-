'use client';

import { useState } from "react";
import Image from "next/image";
import { 
  HeartPulse, Activity, ShieldCheck, ChevronDown, ChevronUp, AlertCircle, 
  Baby, Utensils, Droplets, Sparkles, Building, BookOpen, CheckCircle2, 
  Smile, Apple, CigaretteOff, Users, Calendar, Stethoscope, Scale
} from "lucide-react";

export default function KesehatanDesa() {
  // State accordion utama: null atau id yang aktif (hanya 1 yang terbuka sekaligus)
  const [activeAccordion, setActiveAccordion] = useState<string | null>("pencegahan-lingkungan");

  const toggleAccordion = (id: string) => {
    setActiveAccordion(prev => (prev === id ? null : id));
  };

  // Data Grafik Prevalensi & Indikator Kesehatan Utama Desa Bojong
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

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <style>{`
        .kes-header {
          opacity: 0;
          transform: translateY(-20px);
          animation: kesFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .kes-accordion-item {
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: #ffffff;
          margin-bottom: 1rem;
        }

        .kes-accordion-item:hover {
          border-color: #cbd5e1;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
        }

        .kes-accordion-item.active {
          border-color: #2c5282;
          box-shadow: 0 10px 30px rgba(44, 82, 130, 0.08);
        }

        .kes-accordion-header {
          padding: 1.25rem 1.5rem;
          cursor: pointer;
          user-select: none;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background-color: #ffffff;
          transition: background-color 0.25s ease;
        }

        .kes-accordion-header:hover {
          background-color: #f8fafc;
        }

        .kes-accordion-item.active .kes-accordion-header {
          background-color: #f1f5f9;
          border-bottom: 1px solid #e2e8f0;
        }

        .kes-accordion-content {
          padding: 1.75rem 1.5rem;
          line-height: 1.8;
          color: #334155;
          background-color: #ffffff;
          animation: kesContentFade 0.4s ease forwards;
        }

        .kes-subcard {
          background-color: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 1.25rem 1.5rem;
          margin-bottom: 1.25rem;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .kes-subcard:hover {
          border-color: #cbd5e1;
        }

        @keyframes kesFadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes kesContentFade {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      <div className="container mt-5 pt-4" style={{ maxWidth: '960px' }}>

        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4 kes-header">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-2" 
               style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <HeartPulse size={14} style={{ color: 'var(--accent)' }} />
            <span className="fw-semibold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '0.72rem' }}>
              Profil Desa Bojong &middot; Kesehatan
            </span>
          </div>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>
            Edukasi &amp; Pelayanan Kesehatan
          </h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '640px', lineHeight: 1.7 }}>
            Panduan lengkap Perilaku Hidup Bersih &amp; Sehat (PHBS), edukasi risiko hipertensi, jadwal pelayanan Posyandu, serta pemanfaatan fasilitas kesehatan masyarakat Desa Bojong.
          </p>
        </div>

        {/* Section 1: Pendahuluan & Hipertensi */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="row g-5 align-items-center">
            <div className="col-lg-7">
              <div className="d-flex align-items-center gap-2 mb-2">
                <Activity size={20} style={{ color: '#2c5282' }} />
                <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.85rem' }}>
                  Pendahuluan &amp; Permasalahan Utama
                </h2>
              </div>
              <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>

              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify', color: '#374151' }}>
                <span style={{ float: 'left', fontSize: '4.2rem', lineHeight: '0.7', paddingRight: '12px', paddingTop: '8px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>K</span>
                esehatan merupakan modal utama dalam menjalani aktivitas sehari-hari. Dengan menjaga pola hidup bersih dan sehat, masyarakat Desa Bojong dapat mencegah berbagai penyakit, meningkatkan kualitas hidup, serta menciptakan lingkungan yang lebih sehat dan nyaman. Oleh karena itu, setiap individu memiliki peran penting dalam menerapkan kebiasaan hidup sehat di lingkungan keluarga maupun masyarakat.
              </p>
              <p style={{ fontSize: '1.02rem', lineHeight: 1.75, textAlign: 'justify', color: '#374151' }}>
                Sebagai upaya meningkatkan derajat kesehatan masyarakat, Kementerian Kesehatan Republik Indonesia mendorong penerapan <strong>Perilaku Hidup Bersih dan Sehat (PHBS)</strong>, yaitu sekumpulan perilaku yang dilakukan atas dasar kesadaran sehingga setiap individu dan keluarga mampu menjaga kesehatannya secara mandiri.
              </p>

              {/* Box Warning Hipertensi */}
              <div className="mt-4 p-4 rounded-4" style={{ border: '1.5px solid #2c5282', backgroundColor: '#f8fafc' }}>
                <div className="d-flex align-items-center gap-2 mb-3">
                  <AlertCircle size={22} style={{ color: '#2c5282' }} />
                  <h5 className="fw-bold mb-0 text-uppercase" style={{ fontFamily: 'serif', letterSpacing: '0.5px', fontSize: '1rem', color: '#172554' }}>
                    Permasalahan Utama: Hipertensi (Tekanan Darah Tinggi)
                  </h5>
                </div>
                <p className="small text-muted mb-3" style={{ lineHeight: 1.7, textAlign: 'justify' }}>
                  Salah satu permasalahan kesehatan yang paling sering ditemukan di Desa Bojong adalah <strong>hipertensi</strong> atau tekanan darah tinggi. Hipertensi sering kali tidak menunjukkan gejala yang khas, namun jika tidak dikendalikan, dapat meningkatkan risiko penyakit jantung, stroke, hingga gangguan ginjal.
                </p>
                <div className="fw-bold small text-uppercase mb-2" style={{ color: '#2c5282', letterSpacing: '1px', fontSize: '0.75rem' }}>
                  Tanda &amp; Gejala Yang Perlu Diwaspadai:
                </div>
                <div className="row g-2 small text-muted">
                  <div className="col-sm-6">&bull; Sakit kepala, terutama di bagian belakang kepala</div>
                  <div className="col-sm-6">&bull; Pusing atau kepala terasa berat</div>
                  <div className="col-sm-6">&bull; Pandangan kabur</div>
                  <div className="col-sm-6">&bull; Jantung berdebar &amp; mudah lelah</div>
                  <div className="col-sm-6">&bull; Mimisan (pada beberapa kasus)</div>
                </div>
              </div>
            </div>

            {/* Right: Foto Tokoh Kesehatan */}
            <div className="col-lg-5">
              <div className="position-relative py-3">
                {/* Foto 1: Bidan Desa */}
                <div className="card border-0 shadow-lg overflow-hidden mx-auto mb-4" style={{ borderRadius: '16px', maxWidth: '300px', transform: 'rotate(-1.5deg)' }}>
                  <div className="position-relative w-100" style={{ height: '220px', background: 'linear-gradient(to bottom, #e2e8f0, #cbd5e1)' }}>
                    <Image src="/w.jpg" alt="Bidan Desa" fill className="object-fit-cover" />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center" style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.95), transparent)' }}>
                      <h6 className="text-white fw-bold mb-0 small text-uppercase" style={{ fontSize: '10px', letterSpacing: '2px' }}>Bidan Desa</h6>
                      <div style={{ width: '32px', height: '2px', background: '#fbbf24', margin: '8px auto' }}></div>
                      <h5 className="text-white fw-bold mb-0" style={{ fontSize: '0.95rem' }}>Ibu Titik Retnowati</h5>
                    </div>
                  </div>
                </div>

                {/* Foto 2: Ketua Kader */}
                <div className="card border-0 shadow-lg overflow-hidden ms-auto" style={{ borderRadius: '16px', maxWidth: '280px', marginTop: '-20px', transform: 'rotate(1.5deg)' }}>
                  <div className="position-relative w-100" style={{ height: '200px', background: 'linear-gradient(to bottom, #e2e8f0, #cbd5e1)' }}>
                    <Image src="/i.jpg" alt="Ketua Kader" fill className="object-fit-cover" />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center" style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.95), transparent)' }}>
                      <h6 className="text-white fw-bold mb-0 small text-uppercase" style={{ fontSize: '10px', letterSpacing: '2px' }}>Ketua Kader Posyandu</h6>
                      <div style={{ width: '32px', height: '2px', background: '#fbbf24', margin: '8px auto' }}></div>
                      <h5 className="text-white fw-bold mb-0" style={{ fontSize: '0.95rem' }}>Ibu Rukini</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* Section 2: PANDUAN LENGKAP KESEHATAN (DROPDOWN ACCORDION MENUTUP OTOMATIS) */}
        {/* ========================================================================= */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center gap-2 mb-1">
              <BookOpen size={22} style={{ color: '#2c5282' }} />
              <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '1.1rem', fontFamily: 'serif' }}>
                Panduan Lengkap Edukasi &amp; Pilar PHBS
              </h2>
            </div>
            <p className="text-muted small mx-auto" style={{ maxWidth: '600px' }}>
              Klik salah satu bidang di bawah untuk membaca panduan, manfaat, dan langkah teknis selengkapnya secara komprehensif. (Hanya satu menu yang terbuka sekaligus).
            </p>
            <div className="mx-auto mt-2 mb-4" style={{ width: '50px', height: '2px', backgroundColor: '#2c5282' }}></div>
          </div>

          <div className="kes-accordion-wrapper">

            {/* ----------------- PILAR 1 ----------------- */}
            <div className={`kes-accordion-item ${activeAccordion === "pencegahan-lingkungan" ? "active" : ""}`}>
              <div 
                className="kes-accordion-header"
                onClick={() => toggleAccordion("pencegahan-lingkungan")}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2.5 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: activeAccordion === "pencegahan-lingkungan" ? '#2c5282' : '#e2e8f0', color: activeAccordion === "pencegahan-lingkungan" ? '#fff' : '#2c5282' }}>
                    <Droplets size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#0f172a', fontSize: '1.05rem', fontFamily: 'serif' }}>
                      Bidang I: Pencegahan &amp; Penanggulangan Penyakit serta Penyehatan Lingkungan
                    </h5>
                    <span className="small text-muted">
                      Cuci tangan sabun, air bersih, jamban sehat, pengelolaan limbah cair, PSN jentik nyamuk, &amp; bebas asap rokok.
                    </span>
                  </div>
                </div>
                <div>
                  {activeAccordion === "pencegahan-lingkungan" ? (
                    <ChevronUp size={22} style={{ color: '#2c5282' }} />
                  ) : (
                    <ChevronDown size={22} className="text-muted" />
                  )}
                </div>
              </div>

              {activeAccordion === "pencegahan-lingkungan" && (
                <div className="kes-accordion-content">
                  
                  {/* Sub 1: Mencuci Tangan */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold text-primary mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      1. Mencuci Tangan Menggunakan Sabun
                    </h6>
                    <p className="small mb-3">
                      Tangan sering menjadi media perpindahan bakteri, virus, maupun parasit dari benda atau permukaan yang terkontaminasi ke mulut, hidung, atau mata.
                    </p>
                    <div className="row g-3 small">
                      <div className="col-md-4">
                        <strong className="d-block mb-1 text-dark">Manfaat Utama:</strong>
                        <ul className="ps-3 mb-0 text-muted">
                          <li>Mengurangi penyebaran kuman dan virus.</li>
                          <li>Mencegah diare, influenza, dan infeksi saluran cerna.</li>
                          <li>Melindungi keluarga dari penularan penyakit.</li>
                          <li>Menjaga higienitas saat mengolah makanan.</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <strong className="d-block mb-1 text-dark">Kapan Harus Cuci Tangan?</strong>
                        <ul className="ps-3 mb-0 text-muted">
                          <li>Sebelum makan &amp; menyiapkan makanan.</li>
                          <li>Setelah dari toilet / membersihkan bayi.</li>
                          <li>Setelah batuk, bersin, atau membuang ingus.</li>
                          <li>Setelah memegang hewan, sampah, atau dari luar rumah.</li>
                          <li>Sebelum dan sesudah merawat orang sakit.</li>
                        </ul>
                      </div>
                      <div className="col-md-4">
                        <strong className="d-block mb-1 text-dark">Langkah Cuci Tangan yang Benar:</strong>
                        <ol className="ps-3 mb-0 text-muted">
                          <li>Basahi tangan dengan air mengalir &amp; gunakan sabun.</li>
                          <li>Gosok telapak, punggung tangan, dan sela-sela jari.</li>
                          <li>Bersihkan ujung kuku dan gosok ibu jari bergantian.</li>
                          <li>Bilas dengan air mengalir &amp; keringkan dengan handuk bersih/tisu.</li>
                        </ol>
                      </div>
                    </div>
                  </div>

                  {/* Sub 2: Mengelola Air Minum & Makanan */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      2. Mengelola Air Minum dan Makanan yang Memenuhi Syarat Kesehatan
                    </h6>
                    <p className="small mb-2">
                      Air minum yang dikonsumsi harus aman, bersih, dan memenuhi persyaratan kesehatan, sedangkan makanan harus diolah, disimpan, dan disajikan secara higienis untuk mencegah kontaminasi kuman penyebab penyakit serta menurunkan risiko keracunan makanan.
                    </p>
                    <strong className="small d-block mb-1 text-dark">Tips Pengelolaan:</strong>
                    <ul className="ps-3 mb-0 small text-muted">
                      <li>Gunakan air minum yang telah diolah dengan benar (dimasak hingga mendidih atau air minum terstandar).</li>
                      <li>Simpan air minum dalam wadah tertutup dan ambil menggunakan alat yang bersih.</li>
                      <li>Cuci bahan pangan menggunakan air bersih mengalir dan masak hingga matang sempurna.</li>
                      <li>Simpan makanan dalam wadah tertutup serta pisahkan bahan mentah dari makanan matang untuk mencegah kontaminasi silang.</li>
                    </ul>
                  </div>

                  {/* Sub 3: Menggunakan Air Bersih */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      3. Menggunakan Air Bersih
                    </h6>
                    <div className="row g-3 small">
                      <div className="col-md-6">
                        <strong className="d-block mb-1 text-dark">Manfaat:</strong>
                        <ul className="ps-3 mb-0 text-muted">
                          <li>Mencegah penyebaran penyakit yang ditularkan melalui air (water-borne diseases).</li>
                          <li>Menjaga kebersihan diri, makanan, dan lingkungan keluarga.</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <strong className="d-block mb-1 text-dark">Cara Menjaga Kualitas Air:</strong>
                        <ul className="ps-3 mb-0 text-muted">
                          <li>Gunakan sumber air yang terlindungi dari pencemaran.</li>
                          <li>Jaga jarak sumber air dengan tangki septik/sampah minimal 10 meter.</li>
                          <li>Bersihkan tempat penampungan air secara berkala.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sub 4: Menggunakan Jamban Sehat */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      4. Menggunakan Jamban Sehat
                    </h6>
                    <p className="small mb-2">
                      Jamban sehat adalah fasilitas BAB/BAK yang membuang tinja ke tangki septik atau sistem pengolahan aman, memutus rantai penularan diare, kolera, disentri, tifoid, dan kecacingan.
                    </p>
                    <div className="row g-3 small text-muted">
                      <div className="col-md-6">
                        <strong className="text-dark d-block mb-1">Ciri-Ciri Jamban Sehat:</strong>
                        <ul className="ps-3 mb-0">
                          <li>Kotoran dialirkan ke tangki septik kedap air.</li>
                          <li>Tidak mencemari sumber air minum dan tidak berbau.</li>
                          <li>Bebas dari lalat, kecoa, maupun tikus, serta mudah dibersihkan.</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <strong className="text-dark d-block mb-1">Dampak Positif:</strong>
                        <p className="mb-0">Mewujudkan lingkungan desa yang higienis, terbebas dari Buang Air Besar Sembarangan (BABS / ODF).</p>
                      </div>
                    </div>
                  </div>

                  {/* Sub 5: Mengelola Limbah Cair */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      5. Mengelola Limbah Cair Sesuai Standar Kesehatan
                    </h6>
                    <p className="small text-muted mb-2">
                      Limbah cair rumah tangga (mandi, mencuci, memasak) dialirkan ke saluran pembuangan/SPAL tertutup agar tidak menimbulkan genangan air atau mencemari air tanah.
                    </p>
                    <ul className="ps-3 mb-0 small text-muted">
                      <li>Jangan membuang limbah cair langsung ke saluran irigasi atau halaman tanpa resapan.</li>
                      <li>Hindari membuang minyak goreng bekas (jelantah) atau bahan kimia ke saluran air umum.</li>
                    </ul>
                  </div>

                  {/* Sub 6: Memberantas Jentik Nyamuk */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      6. Memberantas Jentik Nyamuk (Pemberantasan Sarang Nyamuk 3M Plus)
                    </h6>
                    <p className="small text-muted mb-2">
                      Mencegah perkembangbiakan nyamuk <em>Aedes aegypti</em> untuk memutus rantai Demam Berdarah Dengue (DBD) dan Chikungunya:
                    </p>
                    <ul className="ps-3 mb-0 small text-muted">
                      <li><strong>Menguras:</strong> Tempat penampungan air minimal 1 kali seminggu.</li>
                      <li><strong>Menutup:</strong> Rapat-rapat semua penampungan air.</li>
                      <li><strong>Mendaur ulang:</strong> Barang bekas yang berpotensi menampung air hujan.</li>
                      <li><strong>Plus:</strong> Menaburkan larvasida (abate), memelihara ikan pemakan jentik, dan memasang kawat kasa.</li>
                    </ul>
                  </div>

                  {/* Sub 7: Tidak Merokok Dalam Ruangan */}
                  <div className="kes-subcard mb-0">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      7. Tidak Merokok di Dalam Ruangan (Kawasan Bebas Asap Rokok)
                    </h6>
                    <p className="small text-muted mb-2">
                      Melindungi perokok pasif (bayi, anak-anak, ibu hamil, lansia) dari bahaya racun asap rokok yang memicu infeksi pernapasan, asma, serangan jantung, dan stroke.
                    </p>
                    <p className="small text-muted mb-0">
                      Biasakan hanya merokok di area terbuka di luar rumah serta saling mengedukasi anggota keluarga mengenai bahaya paparan residu asap rokok (third-hand smoke).
                    </p>
                  </div>

                </div>
              )}
            </div>


            {/* ----------------- PILAR 2 ----------------- */}
            <div className={`kes-accordion-item ${activeAccordion === "kia-kb" ? "active" : ""}`}>
              <div 
                className="kes-accordion-header"
                onClick={() => toggleAccordion("kia-kb")}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2.5 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: activeAccordion === "kia-kb" ? '#2c5282' : '#e2e8f0', color: activeAccordion === "kia-kb" ? '#fff' : '#2c5282' }}>
                    <Baby size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#0f172a', fontSize: '1.05rem', fontFamily: 'serif' }}>
                      Bidang II: Kesehatan Ibu, Anak, &amp; Keluarga Berencana (KB)
                    </h5>
                    <span className="small text-muted">
                      Persalinan nakes, penimbangan rutin balita, imunisasi dasar lengkap, &amp; akseptor program KB.
                    </span>
                  </div>
                </div>
                <div>
                  {activeAccordion === "kia-kb" ? (
                    <ChevronUp size={22} style={{ color: '#2c5282' }} />
                  ) : (
                    <ChevronDown size={22} className="text-muted" />
                  )}
                </div>
              </div>

              {activeAccordion === "kia-kb" && (
                <div className="kes-accordion-content">
                  
                  {/* Sub 1: Persalinan Nakes */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      1. Meminta Pertolongan Persalinan kepada Tenaga Kesehatan
                    </h6>
                    <p className="small mb-3">
                      Persalinan sebaiknya ditolong oleh tenaga kesehatan yang kompeten (dokter atau bidan desa) di fasilitas pelayanan kesehatan untuk memastikan proses berlangsung aman, mendeteksi dini komplikasi, dan memberikan penanganan cepat saat darurat.
                    </p>
                    <div className="row g-3 small text-muted">
                      <div className="col-md-6">
                        <strong className="text-dark d-block mb-1">Manfaat:</strong>
                        <ul className="ps-3 mb-0">
                          <li>Meningkatkan keselamatan ibu dan bayi.</li>
                          <li>Mencegah komplikasi perdarahan, infeksi, dan asfiksia pada bayi baru lahir.</li>
                        </ul>
                      </div>
                      <div className="col-md-6">
                        <strong className="text-dark d-block mb-1">Persiapan Persalinan:</strong>
                        <ul className="ps-3 mb-0">
                          <li>Pemeriksaan kehamilan (ANC) rutin minimal 6 kali selama hamil.</li>
                          <li>Siapkan tempat, tabungan bersalin, donor darah pendamping, dan transportasi siaga.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Sub 2: Menimbang Balita */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      2. Menimbang Balita Setiap Bulan di Posyandu
                    </h6>
                    <p className="small text-muted mb-2">
                      Hasil penimbangan berat dan pengukuran panjang/tinggi badan balita dicatat pada Buku KIA (KMS). Hal ini memungkinkan deteksi dini risiko gangguan pertumbuhan (stunting, wasting, gizi kurang) sehingga intervensi gizi dapat segera dilakukan.
                    </p>
                  </div>

                  {/* Sub 3: Imunisasi Dasar Lengkap */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      3. Memberikan Imunisasi Dasar Lengkap kepada Bayi
                    </h6>
                    <p className="small text-muted mb-2">
                      Imunisasi membentuk antibodi spesifik terhadap penyakit berbahaya yang dapat menyebabkan kecacatan atau kematian, serta membangun kekebalan kelompok (herd immunity) di Desa Bojong.
                    </p>
                    <div className="p-3 rounded bg-white border small text-muted">
                      <strong>Jadwal Vaksinasi Dasar (0–18 Bulan):</strong> Hepatitis B (saat lahir), BCG &amp; Polio tetes (1 bulan), DPT-HB-Hib &amp; Polio suntik (2, 3, 4 bulan), Campak-Rubela / MR (9 bulan), serta imunisasi lanjutan pada usia 18 bulan.
                    </div>
                  </div>

                  {/* Sub 4: Akseptor KB */}
                  <div className="kes-subcard mb-0">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      4. Menjadi Akseptor Keluarga Berencana (KB)
                    </h6>
                    <p className="small text-muted mb-2">
                      KB membantu pasangan usia subur merencanakan jumlah dan jarak kelahiran yang ideal demi menjaga kesehatan reproduksi ibu serta mengoptimalkan pengasuhan anak.
                    </p>
                    <ul className="ps-3 mb-0 small text-muted">
                      <li><strong>Metode Jangka Pendek:</strong> Pil KB, Suntik KB 1 atau 3 bulan, Kondom.</li>
                      <li><strong>Metode Kontrasepsi Jangka Panjang (MKJP):</strong> IUD (Spiral), Implan/Susuk, Tubektomi (MOW), dan Vasektomi (MOP).</li>
                    </ul>
                  </div>

                </div>
              )}
            </div>


            {/* ----------------- PILAR 3 ----------------- */}
            <div className={`kes-accordion-item ${activeAccordion === "gizi-farmasi" ? "active" : ""}`}>
              <div 
                className="kes-accordion-header"
                onClick={() => toggleAccordion("gizi-farmasi")}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2.5 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: activeAccordion === "gizi-farmasi" ? '#2c5282' : '#e2e8f0', color: activeAccordion === "gizi-farmasi" ? '#fff' : '#2c5282' }}>
                    <Apple size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#0f172a', fontSize: '1.05rem', fontFamily: 'serif' }}>
                      Bidang III: Gizi Seimbang &amp; Farmasi
                    </h5>
                    <span className="small text-muted">
                      Pedoman Isi Piringku, Tablet Tambah Darah (TTD) ibu hamil, ASI Eksklusif 6 bulan, &amp; garam beryodium.
                    </span>
                  </div>
                </div>
                <div>
                  {activeAccordion === "gizi-farmasi" ? (
                    <ChevronUp size={22} style={{ color: '#2c5282' }} />
                  ) : (
                    <ChevronDown size={22} className="text-muted" />
                  )}
                </div>
              </div>

              {activeAccordion === "gizi-farmasi" && (
                <div className="kes-accordion-content">
                  
                  {/* Sub 1: Gizi Seimbang Isi Piringku */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      1. Mengonsumsi Makanan Bergizi Seimbang (Isi Piringku)
                    </h6>
                    <p className="small text-muted mb-2">
                      Dalam satu kali makan, porsi piring dibagi: <strong>1/2 piring</strong> diisi sayuran dan buah-buahan, sedangkan <strong>1/2 piring lainnya</strong> diisi makanan pokok (karbohidrat) dan lauk-pauk (protein hewani &amp; nabati).
                    </p>
                    <ul className="ps-3 mb-0 small text-muted">
                      <li>Batasi asupan Gula, Garam, dan Lemak (anjuran per hari: maks 4 sdm gula, 1 sdt garam, 5 sdm minyak).</li>
                      <li>Biasakan minum air putih minimal 8 gelas per hari dan rutin beraktivitas fisik minimal 30 menit sehari.</li>
                    </ul>
                  </div>

                  {/* Sub 2: TTD Ibu Hamil */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      2. Mengonsumsi Tablet Tambah Darah (TTD) Selama Kehamilan
                    </h6>
                    <p className="small text-muted mb-2">
                      Ibu hamil dianjurkan mengonsumsi <strong>minimal 90 tablet</strong> selama kehamilan untuk mencegah anemia defisiensi besi, mengurangi risiko perdarahan saat bersalin, dan mencegah bayi lahir dengan berat badan rendah (BBLR).
                    </p>
                    <p className="small text-muted mb-0">
                      <em>Tips Minum:</em> Minum TTD dengan air putih atau air jeruk (vitamin C membantu penyerapan zat besi). Hindari minum bersamaan dengan teh, kopi, atau susu karena dapat menghambat penyerapan.
                    </p>
                  </div>

                  {/* Sub 3: ASI Eksklusif */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      3. Memberikan Air Susu Ibu (ASI) Eksklusif kepada Bayi
                    </h6>
                    <p className="small text-muted mb-2">
                      Memberikan ASI saja tanpa tambahan makanan/cairan lain sejak bayi lahir hingga berusia 6 bulan. ASI mengandung nutrisi paling sempurna dan antibodi alami yang melindungi bayi dari diare dan pneumonia.
                    </p>
                    <p className="small text-muted mb-0">
                      Setelah 6 bulan, lanjutkan pemberian ASI hingga usia 2 tahun didampingi Makanan Pendamping ASI (MP-ASI) yang padat gizi.
                    </p>
                  </div>

                  {/* Sub 4: Garam Beryodium */}
                  <div className="kes-subcard mb-0">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      4. Menggunakan Garam Beryodium
                    </h6>
                    <p className="small text-muted mb-0">
                      Yodium sangat esensial untuk fungsi hormon tiroid yang mengatur metabolisme dan perkembangan otak anak. Penggunaan garam beryodium mencegah Gangguan Akibat Kekurangan Yodium (GAKY), seperti pembesaran kelenjar gondok dan hambatan pertumbuhan fisik/mental. Simpan garam di wadah tertutup rapat dan kering.
                    </p>
                  </div>

                </div>
              )}
            </div>


            {/* ----------------- PILAR 4 ----------------- */}
            <div className={`kes-accordion-item ${activeAccordion === "pemeliharaan-ukbm" ? "active" : ""}`}>
              <div 
                className="kes-accordion-header"
                onClick={() => toggleAccordion("pemeliharaan-ukbm")}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="p-2.5 rounded-circle d-flex align-items-center justify-content-center" style={{ backgroundColor: activeAccordion === "pemeliharaan-ukbm" ? '#2c5282' : '#e2e8f0', color: activeAccordion === "pemeliharaan-ukbm" ? '#fff' : '#2c5282' }}>
                    <Building size={22} />
                  </div>
                  <div>
                    <h5 className="fw-bold mb-0" style={{ color: '#0f172a', fontSize: '1.05rem', fontFamily: 'serif' }}>
                      Bidang IV: Pemeliharaan Kesehatan &amp; Upaya Kesehatan Bersumberdaya Masyarakat (UKBM)
                    </h5>
                    <span className="small text-muted">
                      Jaminan kesehatan BPJS/KIS, keaktifan posyandu/posbindu, &amp; pemanfaatan layanan Polindes/Puskesmas.
                    </span>
                  </div>
                </div>
                <div>
                  {activeAccordion === "pemeliharaan-ukbm" ? (
                    <ChevronUp size={22} style={{ color: '#2c5282' }} />
                  ) : (
                    <ChevronDown size={22} className="text-muted" />
                  )}
                </div>
              </div>

              {activeAccordion === "pemeliharaan-ukbm" && (
                <div className="kes-accordion-content">
                  
                  {/* Sub 1: Jaminan Kesehatan */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      1. Ikut Serta dalam Program Jaminan Kesehatan (BPJS / KIS)
                    </h6>
                    <p className="small text-muted mb-0">
                      Kepesertaan aktif jaminan kesehatan memberikan perlindungan finansial dan memastikan warga mendapatkan akses pengobatan bermutu tanpa kendala biaya saat mengalami sakit atau situasi darurat medis.
                    </p>
                  </div>

                  {/* Sub 2: UKBM */}
                  <div className="kes-subcard">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      2. Aktif Memanfaatkan &amp; Mengembangkan Upaya Kesehatan Bersumberdaya Masyarakat (UKBM)
                    </h6>
                    <p className="small text-muted mb-2">
                      UKBM merupakan wujud gotong royong masyarakat dalam memelihara kesehatan bersama. Fasilitas UKBM di Desa Bojong meliputi:
                    </p>
                    <ul className="ps-3 mb-0 small text-muted">
                      <li><strong>Posyandu Balita:</strong> Pemantauan tumbuh kembang, imunisasi, dan PMT.</li>
                      <li><strong>Posyandu Lansia &amp; Posbindu PTM:</strong> Skrining rutin tekanan darah, gula darah, dan kolesterol untuk warga dewasa &amp; lansia.</li>
                      <li><strong>Kader Kesehatan Desa:</strong> Penyuluhan pintu ke pintu (door-to-door) serta pemantauan jentik berkala.</li>
                    </ul>
                  </div>

                  {/* Sub 3: Pemanfaatan Puskesmas & Polindes */}
                  <div className="kes-subcard mb-0">
                    <h6 className="fw-bold mb-2" style={{ color: '#2c5282', fontSize: '1rem' }}>
                      3. Memanfaatkan Layanan Puskesmas dan Fasilitas Kesehatan Secara Optimal
                    </h6>
                    <p className="small text-muted mb-0">
                      Masyarakat diimbau rutin memanfaatkan layanan promotif dan preventif di Polindes Desa Bojong maupun Puskesmas Wonosegoro, bukan hanya saat sakit parah, sehingga penyakit kronis dapat terdeteksi sejak stadium awal.
                    </p>
                  </div>

                </div>
              )}
            </div>

          </div>
        </section>

        {/* Section 3: GRAFIK INDIKATOR KESEHATAN DESA */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Scale size={20} style={{ color: '#2c5282' }} />
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.85rem' }}>
              Grafik Indikator Capaian Kesehatan Desa
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>

          <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
            Persentase capaian indikator kesehatan dan pelayanan Posyandu di Desa Bojong berdasarkan data pemantauan berkala:
          </p>

          <div className="p-4 rounded-4" style={{ border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <h5 className="fw-bold mb-4 text-center text-uppercase" style={{ fontFamily: 'serif', color: 'var(--primary-dark)', fontSize: '1rem', letterSpacing: '1px' }}>
              CAPAIAN INDIKATOR PHBS &amp; PELAYANAN DESA BOJONG (%)
            </h5>

            <div className="d-flex flex-column gap-4">
              {grafikPHBS.map((item, idx) => (
                <div key={idx}>
                  <div className="d-flex justify-content-between align-items-center mb-1" style={{ fontSize: '0.9rem' }}>
                    <span className="fw-bold" style={{ color: '#1e293b' }}>{item.indikator}</span>
                    <span className="fw-bold" style={{ fontFamily: 'serif', color: '#2c5282' }}>
                      {item.nilai}% <span className="text-muted fw-normal small">(Target: {item.target})</span>
                    </span>
                  </div>
                  <div className="w-100 rounded-pill overflow-hidden" style={{ height: '16px', backgroundColor: '#e2e8f0' }}>
                    <div 
                      className="rounded-pill"
                      style={{ 
                        width: `${item.nilai}%`, 
                        height: '100%', 
                        backgroundColor: '#2c5282',
                        transition: 'width 0.8s ease'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between text-muted small" style={{ fontSize: '0.75rem' }}>
              <span>Skala Indikator: 0% - 100%</span>
              <span>Sumber Data: Laporan Bidan Desa &amp; Monografi Kesehatan Bojong</span>
            </div>
          </div>
        </section>

        {/* Section 4: JADWAL PELAYANAN KESEHATAN */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Calendar size={20} style={{ color: '#2c5282' }} />
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.85rem' }}>
              Jadwal Pelayanan Kesehatan &amp; Posyandu
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>

          <div className="table-responsive rounded-4 overflow-hidden border" style={{ borderColor: '#e2e8f0' }}>
            <table className="w-100 m-0" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: '#172554', color: '#fff' }}>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Nama Pelayanan</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Hari &amp; Waktu</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Lokasi Fasilitas</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Sasaran</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Petugas</th>
                </tr>
              </thead>
              <tbody>
                {jadwalPelayanan.map((j, i) => (
                  <tr key={i} style={{ borderBottom: i === jadwalPelayanan.length - 1 ? 'none' : '1px solid #e2e8f0', backgroundColor: i % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td className="py-3 px-3 fw-bold" style={{ fontSize: '0.9rem', color: '#0f172a' }}>{j.kegiatan}</td>
                    <td className="py-3 px-3" style={{ fontSize: '0.85rem', color: '#334155' }}>
                      <div className="fw-bold">{j.hari}</div>
                      <div className="small text-muted">{j.waktu}</div>
                    </td>
                    <td className="py-3 px-3" style={{ fontSize: '0.85rem', color: '#334155' }}>{j.lokasi}</td>
                    <td className="py-3 px-3" style={{ fontSize: '0.85rem', color: '#334155' }}>{j.sasaran}</td>
                    <td className="py-3 px-3" style={{ fontSize: '0.85rem', color: '#334155' }}>{j.petugas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 6: DAFTAR PUSTAKA */}
        <section className="mb-4">
          <div className="p-4 rounded-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <h6 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', letterSpacing: '1px' }}>
              DAFTAR PUSTAKA &amp; REFERENSI RESMI
            </h6>
            <p className="small text-muted mb-3" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>
              Kementerian Kesehatan RI. (2011). <em>Pedoman Pembinaan Perilaku Hidup Bersih dan Sehat (PHBS)</em>. Jakarta: Kementerian Kesehatan RI.<br />
              Data Operasional Bidan Desa &amp; Kader Kesehatan Posyandu Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali.
            </p>
            <div className="pt-3 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="fw-bold small text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#475569' }}>
                STATUS ARSIP: DOKUMEN EDUKASI KESEHATAN MASYARAKAT DESA
              </span>
              <span className="small text-muted" style={{ fontSize: '0.75rem' }}>
                DATA TERAKHIR DIPERBARUI: TAHUN 2026
              </span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}