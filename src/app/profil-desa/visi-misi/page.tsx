import { ArrowLeft } from "lucide-react";

export default function VisiMisiDesa() {
  const missions = [
    "Membenahi Birokrasi Aparatur Desa sesuai dengan aturan dan Tufoksinya.",
    "Menjadikan Pemerintahan Desa yang tanggap Aspiratif dalam menyikapi Aspirasi Masyarakat.",
    "Menata Administrasi yang Solid dan Akuntabel.",
    "Pemerataan dalam Membangun Sarana dan Prasarana Infrastruktur berdasarkan Prioritas dan Musyawarah.",
    "Mengaktifkan dan Mengoptimalkan Pembinaan Generasi Muda Karang Taruna.",
    "Membina dan Memajukan Kesehatan dan Pendidikan Formal dan Non formal.",
    "Memperkokoh Persatuan dan Kesatuan Warga, Menciptakan Keamanan dan Ketetraman serta Kedamaian.",
    "Memberikan Pelayanan dan Pengabdian yang mudah kepada Masyarakat.",
    "Merangsang dan Mendukung kegiatan Kemasyarakatan dalam kelembagaan perorangan maupun kelompok."
  ];

  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: '860px' }}>
        
        
        {/* Page Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <h6 className="fw-bold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>Profil Desa Bojong</h6>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Visi & Misi</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '540px', lineHeight: 1.7 }}>
            Arah kebijakan dan komitmen Pemerintah Desa Bojong dalam melayani dan membangun masyarakat.
          </p>
        </div>

        {/* Visi Section */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="text-center fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Visi</h2>
          <div className="text-center mt-4 mb-4">
            <div className="mx-auto" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>
          </div>
          
          <blockquote className="text-center mx-auto py-4" style={{ maxWidth: '700px' }}>
            <p className="display-6 fw-bold mb-4" style={{ color: 'var(--text-main)', fontFamily: 'serif', lineHeight: 1.5 }}>
              &ldquo;Membetulkan yang Kurang Betul dan Meluruskan yang Kurang Lurus&rdquo;
            </p>
            <p className="text-muted mb-0" style={{ fontSize: '0.95rem', letterSpacing: '1px' }}>
              RPJM Desa Tahun 2020 — 2027
            </p>
          </blockquote>
        </section>

        {/* Misi Section */}
        <section className="mb-5">
          <h2 className="text-center fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Misi</h2>
          <div className="text-center mt-4 mb-5">
            <div className="mx-auto" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>
          </div>

          <div className="mx-auto" style={{ maxWidth: '720px' }}>
            {missions.map((misi, i) => (
              <div key={i} className="d-flex gap-3 mb-4 pb-4 border-bottom border-secondary border-opacity-10" style={{ lineHeight: 1.7 }}>
                <span className="fw-bold flex-shrink-0" style={{ color: 'var(--primary-dark)', fontFamily: 'serif', fontSize: '1.5rem', minWidth: '32px' }}>
                  {i + 1}.
                </span>
                <p className="mb-0" style={{ fontSize: '1.05rem', textAlign: 'justify', color: '#374151' }}>
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
