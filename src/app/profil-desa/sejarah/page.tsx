import Image from "next/image";
import { ArrowLeft, Users } from "lucide-react";

export default function SejarahDesa() {
  return (
    <main className="pb-5 bg-white min-vh-100 pt-5">
      <div className="container mt-5 pt-4">
        
        
        <div className="mb-5 text-center border-bottom border-secondary border-opacity-25 pb-4">
          <h6 className="fw-bold text-uppercase ls-2" style={{ color: 'var(--accent)', letterSpacing: '2px' }}>PROFIL DESA</h6>
          <h1 className="display-4 fw-bold mt-2" style={{ color: 'var(--primary-dark)', fontFamily: 'serif' }}>Sejarah Desa Bojong</h1>
        </div>

        {/* Section 1: Asal Usul */}
        <div className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="row g-5 align-items-start">
            <div className="col-lg-4">
              <div className="position-relative w-100 bg-light border border-secondary border-opacity-50 p-2" style={{ height: '400px' }}>
                <div className="w-100 h-100 position-relative border" style={{ borderColor: '#ced4da' }}>
                  <Image src="/placeholder.webp" alt="Foto Arsip Desa" fill className="object-fit-cover" />
                  <div className="position-absolute top-50 start-50 translate-middle text-muted bg-white bg-opacity-75 px-3 py-1 rounded" style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: '0.85rem' }}>Foto Arsip Desa</div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div style={{ lineHeight: 1.8, fontSize: '1.1rem', color: '#1e293b' }}>
                <p className="text-justify" style={{ textAlign: 'justify' }}>
                  <span style={{ float: 'left', fontSize: '4.8rem', lineHeight: '0.7', paddingRight: '12px', paddingTop: '10px', fontFamily: 'serif', fontWeight: 'bold', color: 'var(--primary-dark)' }}>M</span>
                  engingat Sejarah Desa <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem' }}>Bojong</span> yang kami dengar dari beberapa Tokoh Masyarakat, pada zaman dahulu hiduplah seorang pengembara bersama istrinya yang singgah di hutan <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem' }}>Jonggol</span>.
                </p>
                <p className="text-justify mt-3" style={{ textAlign: 'justify' }}>
                  Di sana, istri tersebut sedang hamil tua. Pada waktu melahirkan, anaknya meninggal dunia (dalam bahasa Jawa disebut <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem' }}>Bajang</span>) dan dikubur di tengah hutan (yang sekarang dikenal dengan pemakaman Punden Jonggol).
                </p>
                <p className="text-justify mt-3" style={{ textAlign: 'justify' }}>
                  Sejak peristiwa tersebut, daerah itu mulai dikenal dengan sebutan <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem' }}>Bojong</span> yang berasal dari kata <span style={{ fontFamily: 'serif', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1.2rem' }}>Bajang</span>.
                </p>
                
                <blockquote className="mt-5 p-4 fs-5" style={{ borderLeft: '4px solid var(--primary-dark)', backgroundColor: '#f8fafc', fontFamily: 'serif' }}>
                  "Nama desa ini menyimpan sejarah yang sangat erat dengan leluhur kita yang pernah singgah di hutan Jonggol."
                  <br/>
                  <span className="fw-bold mt-3 d-inline-block text-dark fs-6" style={{ fontFamily: 'var(--font-inter), sans-serif' }}>— Tokoh Masyarakat Bojong</span>
                </blockquote>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Garis Waktu Horizontal */}
        <div className="mb-5 pb-5 border-bottom border-secondary border-opacity-25">
          <div className="text-center mb-5">
            <h3 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)', letterSpacing: '1px', fontFamily: 'serif' }}>GARIS WAKTU KEPEMIMPINAN</h3>
          </div>
          
          <div className="d-flex overflow-auto pb-4 pt-2 position-relative" style={{ scrollbarWidth: 'thin' }}>
            <div className="position-absolute bg-secondary opacity-25" style={{ height: '2px', width: '100%', top: '15px', left: '0' }}></div>
            {[
              { year: "Masa Silam", event: "Pengembara singgah di hutan Jonggol." },
              { year: "19.. - 19..", event: "Masa kepemimpinan Wiro Supartono." },
              { year: "19.. - 19..", event: "Masa kepemimpinan Kusnudin." },
              { year: "2001 - 2007", event: "Masa kepemimpinan Djaenal." },
              { year: "2007 - 2019", event: "Masa kepemimpinan Suparno (2 Periode)." },
              { year: "2019 - Skrg", event: "Masa kepemimpinan Gatot Madiyo." }
            ].map((item, i) => (
              <div key={i} className="position-relative text-center px-3" style={{ minWidth: '200px', flex: '1' }}>
                <div className="position-relative z-1 mb-3 d-flex justify-content-center" style={{ marginTop: '8px' }}>
                  <div className="bg-white border border-dark rounded-circle d-flex align-items-center justify-content-center" style={{ width: '16px', height: '16px' }}>
                    <div className="bg-dark rounded-circle" style={{ width: '6px', height: '6px' }}></div>
                  </div>
                </div>
                <h5 className="fw-bold mb-2" style={{ color: 'var(--accent)', fontFamily: 'serif' }}>{item.year}</h5>
                <p className="text-muted small mb-0 mx-auto" style={{ maxWidth: '160px' }}>{item.event}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Tokoh & Sesepuh (Kumpulan Foto) */}
        <div className="mb-5">
          <div className="text-center mb-5">
            <h3 className="fw-bold mb-3" style={{ color: 'var(--primary-dark)', letterSpacing: '1px', fontFamily: 'serif' }}>TOKOH & KEPALA DESA</h3>
          </div>
          
          <div className="row g-4 justify-content-center">
            {[
              { name: "Wiro Supartono", role: "19.. - 19.." },
              { name: "Kusnudin", role: "19.. - 19.." },
              { name: "Djaenal", role: "2001 - 2007" },
              { name: "Suparno", role: "2007 - 2019" },
              { name: "Gatot Madiyo", role: "2019 - Sekarang", current: true }
            ].map((tokoh, i) => (
              <div className="col-6 col-md-4 col-lg-2" key={i}>
                <div className="text-center">
                  <div className="border border-secondary border-opacity-50 p-1 mb-3 mx-auto" style={{ width: '130px', height: '160px', backgroundColor: '#f8fafc' }}>
                    <div className="w-100 h-100 d-flex align-items-center justify-content-center border" style={{ borderColor: '#e2e8f0', backgroundColor: '#e9ecef' }}>
                      <Users size={32} className="text-muted opacity-25" />
                    </div>
                  </div>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--text-main)', fontSize: '1rem', fontFamily: 'serif' }}>{tokoh.name}</h6>
                  <p className={`mb-0 small ${tokoh.current ? 'text-primary fw-bold' : 'text-muted'}`} style={{ fontSize: '0.85rem' }}>{tokoh.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
