import { FileText, MapPin } from "lucide-react";

export default function SaranaPrasaranaDesa() {
  const indeksKategori = [
    { nama: "PENDIDIKAN", jumlah: "03" },
    { nama: "KEAGAMAAN", jumlah: "05" },
    { nama: "PEMERINTAHAN & PELAYANAN", jumlah: "02" },
    { nama: "KEAMANAN", jumlah: "04" },
    { nama: "OLAHRAGA & RUANG PUBLIK", jumlah: "01" },
    { nama: "INFRASTRUKTUR & JALAN", jumlah: "08" },
  ];

  const inventarisFasilitas = [
    { no: "01", nama: "SD Negeri Bojong", kategori: "Pendidikan", lokasi: "Dukuh Bojong", kondisi: "BAIK", thn: "2010", pengelola: "Pemerintah / Dinas Pendidikan" },
    { no: "02", nama: "TK / PAUD Desa Bojong", kategori: "Pendidikan", lokasi: "Dukuh Bojong", kondisi: "BAIK", thn: "2015", pengelola: "Yayasan / Desa" },
    { no: "03", nama: "PAUD Tunas Bangsa", kategori: "Pendidikan", lokasi: "Dukuh Kliyo", kondisi: "BAIK", thn: "2018", pengelola: "Masyarakat / Desa" },
    { no: "04", nama: "Masjid Utama Desa Bojong", kategori: "Keagamaan", lokasi: "Dukuh Bojong", kondisi: "BAIK", thn: "2008", pengelola: "Takmir Masjid" },
    { no: "05", nama: "Mushola Al-Ikhlas", kategori: "Keagamaan", lokasi: "Dukuh Pendem", kondisi: "BAIK", thn: "2012", pengelola: "Warga Dusun" },
    { no: "06", nama: "Mushola Dk. Kliyo", kategori: "Keagamaan", lokasi: "Dukuh Kliyo", kondisi: "BAIK", thn: "2014", pengelola: "Warga Dusun" },
    { no: "07", nama: "Balai Desa Bojong", kategori: "Pemerintahan", lokasi: "Desa Bojong", kondisi: "BAIK", thn: "2020", pengelola: "Pemerintah Desa" },
    { no: "08", nama: "Polindes Desa Bojong", kategori: "Pelayanan Kesehatan", lokasi: "Desa Bojong", kondisi: "BAIK", thn: "2016", pengelola: "Bidan Desa / Pemdes" },
    { no: "09", nama: "Pos Kamling Dk. Bojong", kategori: "Keamanan", lokasi: "Dukuh Bojong", kondisi: "BAIK", thn: "2019", pengelola: "RT / Warga" },
    { no: "10", nama: "Pos Kamling Dk. Kliyo", kategori: "Keamanan", lokasi: "Dukuh Kliyo", kondisi: "CUKUP", thn: "2017", pengelola: "RT / Warga" },
    { no: "11", nama: "Lapangan Olahraga Desa", kategori: "Olahraga & Ruang Publik", lokasi: "Dukuh Bojong", kondisi: "CUKUP", thn: "2015", pengelola: "Karang Taruna / Desa" },
    { no: "12", nama: "Jembatan Penghubung Dusun", kategori: "Infrastruktur", lokasi: "Dukuh Kliyo - Pendem", kondisi: "PERLU PEMELIHARAAN", thn: "2018", pengelola: "Pemerintah Desa" },
    { no: "13", name: "Jalan Utama Desa (Betonisasi)", kategori: "Infrastruktur", lokasi: "Kawasan Desa Bojong", kondisi: "BAIK", thn: "2022", pengelola: "DPU / Pemdes" },
    { no: "14", name: "Saluran Drainase Utama", kategori: "Infrastruktur", lokasi: "Dukuh Bojong", kondisi: "DALAM PEMBANGUNAN", thn: "2025", pengelola: "Pemerintah Desa" },
  ];

  const riwayatPembangunan = [
    { tahun: "2025", kegiatan: "Pembangunan & Perbaikan Saluran Drainase Utama Dk. Bojong", status: "DALAM PEMBANGUNAN", sdm: "Dana Desa (DD)" },
    { tahun: "2022", kegiatan: "Pengaspalan & Betonisasi Akses Jalan Utama Desa Bojong", status: "SELESAI", sdm: "Alokasi Dana Desa (ADD) & Kabupaten" },
    { tahun: "2020", kegiatan: "Renovasi dan Pembenahan Fasilitas Gedung Balai Desa Bojong", status: "SELESAI", sdm: "Dana Desa (DD)" },
    { tahun: "2018", kegiatan: "Pembangunan Jembatan Penghubung Antar-Dukuh Kliyo - Pendem", status: "SELESAI", sdm: "Swadaya & Dana Desa" },
    { tahun: "2016", kegiatan: "Pembangunan Gedung Polindes & Pelayanan Kesehatan Desa", status: "SELESAI", sdm: "Pemerintah Kabupaten Boyolali" },
  ];

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: '940px' }}>

        {/* Header Section */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <p className="fw-bold text-uppercase mb-2" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>
            INVENTARIS FASILITAS &middot; KONDISI INFRASTRUKTUR &middot; RIWAYAT PEMBANGUNAN
          </p>
          <h1 className="display-4 fw-bold mt-1" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Sarana & Prasarana</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '600px', lineHeight: 1.7 }}>
            Inventaris digital sarana umum, fasilitas pelayanan, dan infrastruktur fisik di Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali.
          </p>
        </div>

        {/* Section 1: Ringkasan / Indeks Fasilitas Desa */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Indeks Inventaris Fasilitas</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify', color: '#374151' }}>
            <span style={{ float: 'left', fontSize: '4rem', lineHeight: '0.7', paddingRight: '10px', paddingTop: '8px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>I</span>
            nventarisasi sarana dan prasarana Desa <span style={{ fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic' }}>Bojong</span> mencakup seluruh aset publik, gedung pemerintah, sarana ibadah, fasilitas pendidikan, hingga infrastruktur jalan dan drainase. Pendataan ini dilakukan secara berkala untuk mendukung transparansi dan perencanaan pembangunan desa.
          </p>

          <div className="row g-3 mt-4">
            {indeksKategori.map((kat, i) => (
              <div className="col-6 col-md-4" key={i}>
                <div className="p-3 text-center" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-surface)' }}>
                  <div className="fw-bold display-6" style={{ fontFamily: 'serif', color: 'var(--primary-dark)', lineHeight: 1 }}>{kat.jumlah}</div>
                  <div className="fw-bold text-uppercase mt-2" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#475569' }}>{kat.nama}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Daftar Inventaris Fasilitas Publik */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Daftar Inventaris Fasilitas</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <div className="table-responsive" style={{ border: '1px solid #d1d5db' }}>
            <table className="w-100" style={{ borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--primary-dark)', color: '#fff' }}>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px', width: '50px' }}>No.</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Nama Fasilitas</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Kategori</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Lokasi</th>
                  <th className="py-3 px-3 text-uppercase fw-bold" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>Status Kondisi</th>
                </tr>
              </thead>
              <tbody>
                {inventarisFasilitas.map((f, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)', backgroundColor: i % 2 === 0 ? 'var(--bg-white)' : 'var(--bg-surface)' }}>
                    <td className="py-3 px-3 fw-bold text-muted" style={{ fontSize: '0.85rem', fontFamily: 'serif' }}>{f.no}</td>
                    <td className="py-3 px-3 fw-bold" style={{ fontSize: '0.95rem', color: '#1e293b' }}>{f.nama}</td>
                    <td className="py-3 px-3 text-muted" style={{ fontSize: '0.85rem' }}>{f.kategori}</td>
                    <td className="py-3 px-3 text-muted" style={{ fontSize: '0.85rem' }}>{f.lokasi}</td>
                    <td className="py-3 px-3" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
                      <span style={{
                        color: f.kondisi === 'BAIK' ? '#166534' :
                               f.kondisi === 'CUKUP' ? '#854d0e' :
                               f.kondisi === 'PERLU PEMELIHARAAN' ? '#991b1b' : '#1e40af',
                        letterSpacing: '0.5px'
                      }}>
                        KONDISI: {f.kondisi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 3: Riwayat Pembangunan & Peta Lokasi */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Catatan Riwayat Pembangunan</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <div className="d-flex flex-column gap-3">
            {riwayatPembangunan.map((item, i) => (
              <div key={i} className="p-3" style={{ border: '1px solid var(--border)', backgroundColor: 'var(--bg-white)' }}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-bold" style={{ fontFamily: 'serif', fontSize: '1.2rem', color: 'var(--primary-dark)' }}>TAHUN {item.tahun}</span>
                  <span className="fw-bold" style={{ fontSize: '0.75rem', color: item.status === 'SELESAI' ? '#166534' : '#1e40af', letterSpacing: '1px' }}>
                    STATUS: {item.status}
                  </span>
                </div>
                <h6 className="fw-bold mb-1" style={{ color: '#1e293b' }}>{item.kegiatan}</h6>
                <p className="small text-muted mb-0">Sumber Dana: {item.sdm}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Catatan Sumber Data & Metadata Transparansi */}
        <section className="mb-4">
          <div className="p-4" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
            <h6 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', fontSize: '0.8rem', letterSpacing: '1px' }}>SUMBER DATA & TRANSPARANSI INVENTARIS</h6>
            <ul className="small text-muted mb-3 ps-3" style={{ lineHeight: 1.6 }}>
              <li>Pemerintah Desa Bojong, Kecamatan Wonosegoro</li>
              <li>Kaur Perencanaan & Pembangunan Desa Bojong</li>
              <li>Hasil Inventarisasi Fasilitas Desa & Observasi Lapangan</li>
            </ul>
            <div className="pt-2 border-top border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
              <span className="fw-bold small text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px', color: '#64748b' }}>STATUS ARSIP: DOKUMEN MONOGRAFI AKTIF</span>
              <span className="small text-muted" style={{ fontSize: '0.75rem' }}>DATA TERAKHIR DIPERBARUI: 12 AGUSTUS 2026</span>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
