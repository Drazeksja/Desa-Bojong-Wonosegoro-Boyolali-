import Image from "next/image";

export default function StrukturOrganisasi() {
  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: '960px' }}>
        
        {/* Header */}
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <h6 className="fw-bold text-uppercase" style={{ color: 'var(--accent)', letterSpacing: '3px', fontSize: '0.75rem' }}>Pemerintahan Desa Bojong</h6>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Struktur Organisasi</h1>
          <p className="text-muted mt-3 mx-auto" style={{ maxWidth: '580px', lineHeight: 1.7 }}>
            Bagan struktur organisasi dan sistem tata kerja Pemerintah Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali.
          </p>
        </div>

        {/* Deskripsi & Hierarki Garis Komando */}
        <section className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <h2 className="fw-bold text-uppercase mb-2" style={{ color: 'var(--primary-dark)', letterSpacing: '3px', fontSize: '0.85rem' }}>Garis Komando & Tata Kerja</h2>
          <div className="mt-3 mb-4" style={{ width: '40px', height: '2px', backgroundColor: 'var(--primary-dark)' }}></div>

          <p style={{ fontSize: '1.05rem', lineHeight: 1.8, textAlign: 'justify', color: '#374151' }}>
            <span style={{ float: 'left', fontSize: '4rem', lineHeight: '0.7', paddingRight: '10px', paddingTop: '8px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>S</span>
            truktur Organisasi Pemerintah Desa Bojong menganut <span style={{ fontFamily: 'serif', fontWeight: 'bold', fontStyle: 'italic' }}>sistem garis komando</span>. Kepala Desa adalah pimpinan tertinggi pemerintah desa. Di bawahnya terdapat unsur staf/kesekretariatan yang dipimpin oleh Sekretaris Desa (membawahi Kaur Umum & Perencanaan serta Kaur Keuangan). Selain itu, Kepala Desa juga mengomandoi langsung unsur pelaksana teknis (Kepala Seksi/Kasi) dan pelaksana kewilayahan (Kepala Dusun).
          </p>

          {/* Diagram Alur Struktur Organisasi */}
          <div className="mt-5 p-4" style={{ border: '1px solid #d1d5db', backgroundColor: '#f9fafb' }}>
            <h5 className="text-center fw-bold mb-4 text-uppercase" style={{ fontFamily: 'serif', color: 'var(--primary-dark)', letterSpacing: '1px', fontSize: '1rem' }}>Bagan Struktur Organisasi Desa Bojong</h5>
            
            {/* Level 1: Kepala Desa */}
            <div className="text-center mb-3">
              <div className="d-inline-block px-4 py-3 bg-white" style={{ border: '2px solid var(--primary-dark)', minWidth: '240px' }}>
                <div className="fw-bold text-uppercase small" style={{ color: 'var(--primary-dark)', letterSpacing: '1px' }}>Kepala Desa</div>
                <div className="fw-bold fs-5" style={{ fontFamily: 'serif' }}>Gatot Madiyo</div>
              </div>
            </div>

            <div className="text-center my-1">
              <div className="mx-auto" style={{ width: '2px', height: '24px', backgroundColor: '#94a3b8' }}></div>
            </div>

            {/* Level 2: Sekretaris Desa */}
            <div className="text-center mb-3">
              <div className="d-inline-block px-4 py-2 bg-white" style={{ border: '1px solid #475569', minWidth: '220px' }}>
                <div className="fw-bold text-uppercase small text-muted">Sekretaris Desa</div>
                <div className="fw-bold fs-6" style={{ fontFamily: 'serif' }}>Yatmin</div>
              </div>
            </div>

            <div className="text-center my-1">
              <div className="mx-auto" style={{ width: '2px', height: '24px', backgroundColor: '#94a3b8' }}></div>
            </div>

            {/* Level 3: Sub-Unsur (Kaur, Kasi, Kadus) */}
            <div className="row g-4 text-center pt-2">
              <div className="col-md-4">
                <div className="p-3 bg-white h-100" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="fw-bold text-uppercase small text-primary-dark mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Unsur Kesekretariatan (Kaur)</div>
                  
                  <div className="p-2 mb-2 bg-light border">
                    <div className="fw-bold small">Hermin Utari</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Kaur Umum & Perencanaan</div>
                  </div>

                  <div className="p-2 bg-light border">
                    <div className="fw-bold small">Endang Suyamti</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Kaur Keuangan</div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-white h-100" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="fw-bold text-uppercase small text-primary-dark mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Pelaksana Teknis (Kasi)</div>
                  
                  <div className="p-2 mb-2 bg-light border">
                    <div className="fw-bold small">Sutarno</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Kasi Pemerintahan</div>
                  </div>

                  <div className="p-2 bg-light border opacity-75">
                    <div className="small text-muted fst-italic">[Belum Ada Data]</div>
                    <div className="text-muted" style={{ fontSize: '0.75rem' }}>Kasi Kesra & Pelayanan</div>
                  </div>
                </div>
              </div>

              <div className="col-md-4">
                <div className="p-3 bg-white h-100" style={{ border: '1px solid #cbd5e1' }}>
                  <div className="fw-bold text-uppercase small text-primary-dark mb-3" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Pelaksana Kewilayahan (Kadus)</div>
                  
                  <div className="p-1 mb-1 bg-light border text-start ps-2">
                    <span className="fw-bold small">Agus Sumarno</span> <span className="text-muted small">(Kadus I)</span>
                  </div>
                  <div className="p-1 mb-1 bg-light border text-start ps-2">
                    <span className="fw-bold small">Aminanto</span> <span className="text-muted small">(Kadus II)</span>
                  </div>
                  <div className="p-1 mb-1 bg-light border text-start ps-2">
                    <span className="fw-bold small">Ahmadi</span> <span className="text-muted small">(Kadus III)</span>
                  </div>
                  <div className="p-1 bg-light border text-start ps-2 opacity-75">
                    <span className="small text-muted fst-italic">[Belum Ada Data]</span> <span className="text-muted small">(Kadus IV)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}
