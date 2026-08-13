import { ArrowLeft } from "lucide-react";

export default function GeografisDesa() {
  const dukuhData = [
    { name: "Kliyo", rt: 7 },
    { name: "Pendem", rt: 4 },
    { name: "Bojong", rt: 3 },
    { name: "Bogor Pereng", rt: 2 },
    { name: "Bogor Kopen", rt: 2 },
    { name: "Bogorkrajan", rt: 2 },
    { name: "Tempuran", rt: 1 },
    { name: "Jonggol", rt: 1 },
    { name: "Bogor", rt: 1 },
  ];

  const maxRT = Math.max(...dukuhData.map(d => d.rt));

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: '920px' }}>
        

        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <h6 className="fw-bold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>Profil Desa Bojong</h6>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Kondisi Geografis</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '560px', lineHeight: 1.7 }}>
            Informasi letak, luas wilayah, topografi, dan iklim yang membentuk karakteristik Desa Bojong.
          </p>
        </div>

        {/* Section 1: Letak & Batas Wilayah */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Letak & Batas Wilayah</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify', color: '#374151' }}>
            <span style={{ float: 'left', fontSize: '4rem', lineHeight: '0.7', paddingRight: '10px', paddingTop: '8px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>S</span>
            ecara administratif, Desa <span style={{ fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic' }}>Bojong</span> terletak di Kecamatan Wonosegoro, Kabupaten Boyolali, Provinsi Jawa Tengah. Desa ini berbatasan langsung dengan desa-desa tetangga yang menjadikannya kawasan strategis dalam mendukung pertumbuhan ekonomi antar desa.
          </p>

          <div className="mt-5 row align-items-center">
            <div className="col-md-8">
              <h5 className="fw-bold mb-4" style={{ color: 'var(--text-main)', fontFamily: 'serif', fontSize: '1.15rem' }}>Batas Administratif</h5>
              <table className="w-100" style={{ borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    { arah: "Utara", desa: "Desa Krobokan" },
                    { arah: "Timur", desa: "Desa Guwo" },
                    { arah: "Selatan", desa: "Desa Banyusri" },
                    { arah: "Barat", desa: "Desa Garangan" },
                  ].map((b, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <td className="py-3 fw-bold text-uppercase" style={{ width: '120px', color: 'var(--primary-dark)', letterSpacing: '1px', fontSize: '0.85rem' }}>{b.arah}</td>
                      <td className="py-3" style={{ color: '#374151', fontSize: '1.05rem' }}>{b.desa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-md-4 text-center d-none d-md-block">
              <img src="/compass.png" alt="Kompas" style={{ maxWidth: '280px', filter: 'grayscale(100%) opacity(80%)' }} />
            </div>
          </div>
        </section>

        {/* Section 2: Luas Wilayah */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Luas Wilayah</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <div className="text-center my-5 py-4" style={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
            <p className="mb-1 text-uppercase fw-bold" style={{ letterSpacing: '2px', fontSize: '0.75rem', color: '#6b7280' }}>Total Luas Wilayah</p>
            <p className="mb-0" style={{ fontSize: '3.5rem', fontWeight: 'bold', fontFamily: 'serif', color: 'var(--primary-dark)', lineHeight: 1.2 }}>
              595,11 <span style={{ fontSize: '1.2rem', fontWeight: 'normal', color: '#6b7280' }}>Hektar</span>
            </p>
          </div>
        </section>

        {/* Section 3: Pembagian Dukuh — Bar Chart */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Pembagian Wilayah</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <p className="mb-5" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#374151' }}>
            Desa Bojong terbagi menjadi <strong>9 dukuh</strong> dengan total <strong>23 RT</strong>.
          </p>

          {/* Horizontal Bar Chart */}
          <div className="mb-5">
            <p className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem', color: '#6b7280' }}>Jumlah RT per Dukuh</p>
            {dukuhData.map((d, i) => (
              <div key={i} className="d-flex align-items-center mb-3 gap-3">
                <span className="text-end flex-shrink-0" style={{ width: '130px', fontSize: '0.9rem', color: '#374151', fontWeight: 500 }}>{d.name}</span>
                <div className="flex-grow-1" style={{ height: '22px', backgroundColor: '#f3f4f6' }}>
                  <div
                    style={{
                      width: `${(d.rt / maxRT) * 100}%`,
                      height: '100%',
                      backgroundColor: 'var(--primary-dark)',
                      transition: 'width 0.5s ease',
                    }}
                  ></div>
                </div>
                <span className="flex-shrink-0 fw-bold" style={{ width: '30px', fontSize: '0.9rem', color: 'var(--primary-dark)', fontFamily: 'serif' }}>{d.rt}</span>
              </div>
            ))}
          </div>

          {/* Dusun Cards - compact grid */}
          <p className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem', color: '#6b7280' }}>Daftar Dukuh</p>
          <div className="row g-3">
            {dukuhData.map((d, i) => (
              <div className="col-6 col-md-4" key={i}>
                <div className="p-3 h-100" style={{ border: '1px solid var(--border)', backgroundColor: i === 0 ? 'var(--bg-surface)' : 'var(--bg-white)' }}>
                  <p className="fw-bold mb-1" style={{ fontFamily: 'serif', fontSize: '1rem', color: 'var(--text-main)' }}>Dk. {d.name}</p>
                  <p className="mb-0" style={{ fontSize: '0.85rem', color: '#6b7280' }}>{d.rt} RT</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Topografi & Iklim */}
        <section className="mb-5">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Topografi & Iklim</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <div className="row g-0 mb-5" style={{ border: '1px solid #d1d5db' }}>
            {/* Topografi */}
            <div className="col-md-6" style={{ borderRight: '1px solid #d1d5db' }}>
              <div className="p-4">
                <h5 className="fw-bold mb-4 pb-2" style={{ fontFamily: 'serif', color: 'var(--text-main)', borderBottom: '1px solid #e5e7eb' }}>Topografi</h5>
                <table className="w-100" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td className="py-2 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '1px', width: '110px' }}>Ketinggian</td>
                      <td className="py-2" style={{ fontSize: '1rem', color: '#111827' }}>200 – 228 mdpl</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td className="py-2 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '1px' }}>Karakter</td>
                      <td className="py-2" style={{ fontSize: '1rem', color: '#111827' }}>Perbukitan, kontur berbukit-bukit</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '1px' }}>Pengaruh</td>
                      <td className="py-2" style={{ fontSize: '1rem', color: '#111827', lineHeight: 1.6 }}>Mendukung pertumbuhan berbagai jenis tanaman serta keanekaragaman hayati flora</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Iklim */}
            <div className="col-md-6">
              <div className="p-4">
                <h5 className="fw-bold mb-4 pb-2" style={{ fontFamily: 'serif', color: 'var(--text-main)', borderBottom: '1px solid #e5e7eb' }}>Iklim</h5>
                <table className="w-100" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td className="py-2 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '1px', width: '110px' }}>Jenis</td>
                      <td className="py-2" style={{ fontSize: '1rem', color: '#111827' }}>Iklim Tropis</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td className="py-2 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '1px' }}>Suhu</td>
                      <td className="py-2" style={{ fontSize: '1rem', color: '#111827' }}>24°C – 30°C</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#6b7280', letterSpacing: '1px' }}>Curah Hujan</td>
                      <td className="py-2" style={{ fontSize: '1rem', color: '#111827', lineHeight: 1.6 }}>2.000 – 2.500 mm/tahun, mendukung pertanian</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
