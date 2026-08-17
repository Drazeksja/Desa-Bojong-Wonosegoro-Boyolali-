import { ArrowLeft, Compass, MapPin, Layers, CloudSun, Ruler } from "lucide-react";

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
      <style>{`
        .geo-header {
          opacity: 0;
          transform: translateY(-20px);
          animation: geoFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .geo-section {
          opacity: 0;
          transform: translateY(25px);
          animation: geoFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .geo-section.delay-1 { animation-delay: 0.15s; }
        .geo-section.delay-2 { animation-delay: 0.3s; }
        .geo-section.delay-3 { animation-delay: 0.45s; }
        .geo-section.delay-4 { animation-delay: 0.6s; }

        .geo-dukuh-card {
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .geo-dukuh-card:hover {
          transform: translateY(-4px);
          border-color: #2c5282 !important;
          box-shadow: 0 8px 20px rgba(44, 82, 130, 0.1);
        }

        .geo-stat-box {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .geo-stat-box:hover {
          transform: scale(1.02);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        @keyframes geoFadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes geoFadeUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .geo-header, .geo-section {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="container mt-5 pt-4" style={{ maxWidth: '940px' }}>
        
        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4 geo-header">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-2" 
               style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <Compass size={14} style={{ color: 'var(--accent)' }} />
            <span className="fw-semibold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '0.72rem' }}>
              Profil Desa Bojong
            </span>
          </div>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Kondisi Geografis</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '580px', lineHeight: 1.7 }}>
            Informasi letak, batas wilayah, bentang luas, topografi perbukitan, dan karakteristik iklim Desa Bojong.
          </p>
        </div>

        {/* Section 1: Letak & Batas Wilayah */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25 geo-section delay-1">
          <div className="d-flex align-items-center gap-2 mb-2">
            <MapPin size={20} style={{ color: '#2c5282' }} />
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.9rem' }}>
              Letak &amp; Batas Wilayah
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify', color: '#374151' }}>
            <span style={{ float: 'left', fontSize: '4rem', lineHeight: '0.7', paddingRight: '10px', paddingTop: '8px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>S</span>
            ecara administratif, Desa <span style={{ fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic' }}>Bojong</span> terletak di Kecamatan Wonosegoro, Kabupaten Boyolali, Provinsi Jawa Tengah. Desa ini berbatasan langsung dengan desa-desa tetangga yang menjadikannya kawasan strategis dalam mendukung pertumbuhan ekonomi antar desa.
          </p>

          <div className="mt-5 row align-items-center g-4">
            <div className="col-md-8">
              <h5 className="fw-bold mb-4" style={{ color: 'var(--text-main)', fontFamily: 'serif', fontSize: '1.15rem' }}>Batas Administratif</h5>
              <div className="rounded-3 overflow-hidden border" style={{ borderColor: '#e2e8f0' }}>
                <table className="w-100 m-0" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    {[
                      { arah: "Utara", desa: "Desa Krobokan" },
                      { arah: "Timur", desa: "Desa Guwo" },
                      { arah: "Selatan", desa: "Desa Banyusri" },
                      { arah: "Barat", desa: "Desa Garangan" },
                    ].map((b, i) => (
                      <tr key={i} style={{ borderBottom: i === 3 ? 'none' : '1px solid #e2e8f0', backgroundColor: i % 2 === 0 ? '#f8fafc' : '#ffffff' }}>
                        <td className="py-3 px-4 fw-bold text-uppercase" style={{ width: '130px', color: '#2c5282', letterSpacing: '1px', fontSize: '0.85rem' }}>{b.arah}</td>
                        <td className="py-3 px-4" style={{ color: '#1e293b', fontSize: '1rem', fontWeight: 500 }}>{b.desa}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-4 text-center d-none d-md-block">
              <div className="p-3">
                <img src="/compass.png" alt="Kompas" style={{ maxWidth: '240px', filter: 'grayscale(60%) opacity(85%)', transition: 'transform 0.5s ease' }} className="hover-lift" />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Luas Wilayah */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25 geo-section delay-2">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Ruler size={20} style={{ color: '#2c5282' }} />
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.9rem' }}>
              Luas Wilayah
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>

          <div className="text-center my-4 p-5 rounded-4 geo-stat-box" style={{ background: 'linear-gradient(135deg, #172554, #1e3a8a)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <p className="mb-1 text-uppercase fw-semibold" style={{ letterSpacing: '2px', fontSize: '0.8rem', color: '#fbbf24' }}>
              Total Luas Wilayah Administratif
            </p>
            <p className="mb-0 text-white" style={{ fontSize: 'clamp(2.8rem, 6vw, 4.2rem)', fontWeight: 'bold', fontFamily: 'serif', lineHeight: 1.2 }}>
              595,11 <span style={{ fontSize: '1.3rem', fontWeight: 'normal', color: 'rgba(255,255,255,0.8)' }}>Hektar</span>
            </p>
          </div>
        </section>

        {/* Section 3: Pembagian Dukuh — Bar Chart */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25 geo-section delay-3">
          <div className="d-flex align-items-center gap-2 mb-2">
            <Layers size={20} style={{ color: '#2c5282' }} />
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.9rem' }}>
              Pembagian Wilayah
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>

          <p className="mb-4" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#374151' }}>
            Desa Bojong terbagi menjadi <strong>9 dukuh</strong> dengan total <strong>23 RT</strong>.
          </p>

          {/* Horizontal Bar Chart */}
          <div className="mb-5 p-4 rounded-4" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
            <p className="fw-bold mb-4 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem', color: '#64748b' }}>Jumlah RT per Dukuh</p>
            {dukuhData.map((d, i) => (
              <div key={i} className="d-flex align-items-center mb-3 gap-3">
                <span className="text-end flex-shrink-0" style={{ width: '130px', fontSize: '0.9rem', color: '#1e293b', fontWeight: 500 }}>{d.name}</span>
                <div className="flex-grow-1 rounded-pill overflow-hidden" style={{ height: '18px', backgroundColor: '#e2e8f0' }}>
                  <div
                    className="rounded-pill"
                    style={{
                      width: `${(d.rt / maxRT) * 100}%`,
                      height: '100%',
                      backgroundColor: '#2c5282',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  ></div>
                </div>
                <span className="flex-shrink-0 fw-bold" style={{ width: '30px', fontSize: '0.95rem', color: '#2c5282', fontFamily: 'serif' }}>{d.rt}</span>
              </div>
            ))}
          </div>

          {/* Dusun Cards - compact grid */}
          <p className="fw-bold mb-3 text-uppercase" style={{ letterSpacing: '1px', fontSize: '0.8rem', color: '#64748b' }}>Daftar Dukuh</p>
          <div className="row g-3">
            {dukuhData.map((d, i) => (
              <div className="col-6 col-md-4" key={i}>
                <div className="p-3 rounded-3 h-100 geo-dukuh-card" style={{ border: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                  <p className="fw-bold mb-1" style={{ fontFamily: 'serif', fontSize: '1rem', color: '#0f172a' }}>Dk. {d.name}</p>
                  <p className="mb-0 small text-muted">{d.rt} RT</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Topografi & Iklim */}
        <section className="mb-5 geo-section delay-4">
          <div className="d-flex align-items-center gap-2 mb-2">
            <CloudSun size={20} style={{ color: '#2c5282' }} />
            <h2 className="fw-bold text-uppercase mb-0" style={{ color: 'var(--primary-dark)', letterSpacing: '2px', fontSize: '0.9rem' }}>
              Topografi &amp; Iklim
            </h2>
          </div>
          <div className="mt-2 mb-4" style={{ width: '40px', height: '2px', backgroundColor: '#2c5282' }}></div>

          <div className="row g-4 mb-5">
            {/* Topografi */}
            <div className="col-md-6">
              <div className="p-4 rounded-4 h-100" style={{ border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <h5 className="fw-bold mb-3 pb-2" style={{ fontFamily: 'serif', color: '#172554', borderBottom: '1px solid #e2e8f0' }}>Topografi</h5>
                <table className="w-100" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td className="py-2.5 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px', width: '110px' }}>Ketinggian</td>
                      <td className="py-2.5" style={{ fontSize: '0.95rem', color: '#1e293b' }}>200 – 228 mdpl</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td className="py-2.5 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px' }}>Karakter</td>
                      <td className="py-2.5" style={{ fontSize: '0.95rem', color: '#1e293b' }}>Perbukitan, kontur berbukit-bukit</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px' }}>Pengaruh</td>
                      <td className="py-2.5" style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6 }}>Mendukung pertumbuhan berbagai jenis tanaman serta keanekaragaman hayati flora</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Iklim */}
            <div className="col-md-6">
              <div className="p-4 rounded-4 h-100" style={{ border: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
                <h5 className="fw-bold mb-3 pb-2" style={{ fontFamily: 'serif', color: '#172554', borderBottom: '1px solid #e2e8f0' }}>Iklim</h5>
                <table className="w-100" style={{ borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td className="py-2.5 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px', width: '110px' }}>Jenis</td>
                      <td className="py-2.5" style={{ fontSize: '0.95rem', color: '#1e293b' }}>Iklim Tropis</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td className="py-2.5 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px' }}>Suhu</td>
                      <td className="py-2.5" style={{ fontSize: '0.95rem', color: '#1e293b' }}>24°C – 30°C</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 text-uppercase fw-bold" style={{ fontSize: '0.75rem', color: '#64748b', letterSpacing: '1px' }}>Curah Hujan</td>
                      <td className="py-2.5" style={{ fontSize: '0.95rem', color: '#1e293b', lineHeight: 1.6 }}>2.000 – 2.500 mm/tahun, mendukung pertanian</td>
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
