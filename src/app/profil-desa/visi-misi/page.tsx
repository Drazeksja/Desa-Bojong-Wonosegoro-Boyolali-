import { Star, Award, Target, Compass, CheckCircle2 } from "lucide-react";

export default function VisiMisiDesa() {
  const missions = [
    "Membenahi Birokrasi Aparatur Desa sesuai dengan aturan dan Tupoksinya.",
    "Menjadikan Pemerintahan Desa yang tanggap aspiratif dalam menyikapi aspirasi masyarakat.",
    "Menata administrasi yang solid, transparan, dan akuntabel.",
    "Pemerataan dalam membangun sarana dan prasarana infrastruktur berdasarkan prioritas dan musyawarah.",
    "Mengaktifkan dan mengoptimalkan pembinaan generasi muda Karang Taruna.",
    "Membina dan memajukan kesehatan serta pendidikan formal dan non-formal.",
    "Memperkokoh persatuan dan kesatuan warga, menciptakan keamanan, ketenteraman, serta kedamaian.",
    "Memberikan pelayanan dan pengabdian yang mudah, ramah, dan cepat kepada masyarakat.",
    "Merangsang dan mendukung kegiatan kemasyarakatan dalam kelembagaan perorangan maupun kelompok."
  ];

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <style>{`
        .vm-header {
          opacity: 0;
          transform: translateY(-20px);
          animation: vmFadeDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .vm-visi-card {
          opacity: 0;
          transform: translateY(25px) scale(0.98);
          animation: vmFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.15s forwards;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
        }

        .vm-visi-card:hover {
          transform: translateY(-5px) scale(1.005);
          box-shadow: 0 20px 40px rgba(15, 23, 42, 0.18) !important;
        }

        .vm-misi-section {
          opacity: 0;
          transform: translateY(25px);
          animation: vmFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .vm-misi-card {
          opacity: 0;
          transform: translateY(20px);
          animation: vmFadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }

        .vm-misi-card:hover {
          transform: translateX(8px);
          background-color: #f1f5f9 !important;
          border-color: #2c5282 !important;
          box-shadow: 0 8px 20px rgba(44, 82, 130, 0.08);
        }

        @keyframes vmFadeDown {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes vmFadeUp {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .vm-header, .vm-visi-card, .vm-misi-section, .vm-misi-card {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="container mt-5 pt-4" style={{ maxWidth: '880px' }}>

        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4 vm-header">
          <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-2" 
               style={{ background: 'rgba(217, 119, 6, 0.08)', border: '1px solid rgba(217, 119, 6, 0.2)' }}>
            <Compass size={14} style={{ color: 'var(--accent)' }} />
            <span className="fw-semibold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '2px', fontSize: '0.72rem' }}>
              Profil Desa Bojong
            </span>
          </div>

          <h1
            className="display-4 fw-bold mt-2"
            style={{
              color: 'var(--primary-dark)',
              fontFamily: 'serif'
            }}
          >
            Visi &amp; Misi
          </h1>

          <p
            className="text-muted mt-3 mx-auto"
            style={{
              maxWidth: '560px',
              lineHeight: 1.7
            }}
          >
            Arah kebijakan fundamental dan komitmen terpadu Pemerintah Desa Bojong dalam mewujudkan desa mandiri, transparan, dan melayani masyarakat.
          </p>
        </div>


        {/* ================= VISI ================= */}
        <section className="mb-5">
          <div
            className="position-relative text-center p-5 shadow-lg overflow-hidden vm-visi-card"
            style={{
              backgroundColor: '#172554',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            {/* Ambient Background Accent */}
            <div className="position-absolute top-0 end-0 p-5 opacity-10" style={{ pointerEvents: 'none' }}>
              <Star size={160} color="#fbbf24" />
            </div>

            {/* Icon + Judul */}
            <div className="d-inline-flex justify-content-center align-items-center gap-2 mb-4 px-3 py-1.5 rounded-pill" style={{ background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
              <Star size={18} style={{ color: '#fbbf24' }} fill="#fbbf24" />
              <span className="fw-bold text-uppercase" style={{ color: '#fbbf24', fontSize: '0.8rem', letterSpacing: '2px' }}>
                Visi Desa Bojong
              </span>
            </div>

            {/* Isi Visi */}
            <blockquote className="mb-0 position-relative z-1">
              <p
                className="display-6 fw-bold mb-4 text-white"
                style={{
                  fontFamily: 'serif',
                  lineHeight: 1.45,
                  fontSize: 'clamp(1.4rem, 3.5vw, 2.1rem)'
                }}
              >
                &ldquo;Membetulkan yang Kurang Betul dan Meluruskan yang Kurang Lurus&rdquo;
              </p>

              <div className="d-inline-block px-3 py-1 rounded" style={{ background: 'rgba(255, 255, 255, 0.08)' }}>
                <span className="text-white text-opacity-80 small fw-medium" style={{ letterSpacing: '0.5px' }}>
                  RPJM Desa Bojong Tahun 2020 — 2027
                </span>
              </div>
            </blockquote>
          </div>
        </section>


        {/* ================= MISI ================= */}
        <section className="mb-5 vm-misi-section">

          {/* Judul Misi */}
          <div className="text-center mb-5">
            <div className="d-inline-flex align-items-center gap-2 mb-2">
              <Target size={24} style={{ color: '#2c5282' }} />
              <h2 className="fw-bold mb-0" style={{ color: 'var(--primary-dark)', fontSize: '1.75rem', fontFamily: 'serif' }}>
                Misi Pembangunan Desa
              </h2>
            </div>
            <p className="text-muted small mx-auto" style={{ maxWidth: '480px' }}>
              9 Langkah konkret pelaksanaan tata kelola pemerintahan, infrastruktur, dan pemberdayaan masyarakat.
            </p>
            <div
              className="mx-auto mt-3"
              style={{
                width: '40px',
                height: '3px',
                backgroundColor: '#2c5282',
                borderRadius: '2px'
              }}
            />
          </div>


          {/* Daftar Misi Grid/List */}
          <div className="d-flex flex-column gap-3">
            {missions.map((misi, i) => (
              <div
                key={i}
                className="p-3 p-md-4 d-flex align-items-start gap-3 vm-misi-card"
                style={{
                  backgroundColor: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '16px',
                  animationDelay: `${0.35 + i * 0.07}s`
                }}
              >
                <div 
                  className="flex-shrink-0 d-flex align-items-center justify-content-center rounded-circle fw-bold"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: '#2c5282',
                    color: '#ffffff',
                    fontSize: '0.85rem'
                  }}
                >
                  {i + 1}
                </div>

                <p
                  className="mb-0 text-start flex-grow-1"
                  style={{
                    fontSize: '1rem',
                    color: '#1e293b',
                    lineHeight: 1.65,
                    fontWeight: 450
                  }}
                >
                  {misi}
                </p>
              </div>
            ))}
          </div>

        </section>

      </div>
    </main>
  );
}