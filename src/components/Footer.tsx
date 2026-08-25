import Image from "next/image";
import { Globe, Map, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="text-white pt-5 pb-4" style={{ backgroundColor: 'var(--navbar-bg-solid)' }}>
      <div className="container pt-4">
        <div className="row g-4 mb-4">
          <div className="col-lg-4 pe-lg-5">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="position-relative rounded-circle overflow-hidden" 
                   style={{ width: '50px', height: '50px', background: 'white' }}>
                <Image src="/LOGO.webp" alt="Logo Desa Bojong" fill className="object-fit-contain p-1" />
              </div>
              <div>
                <h5 className="fw-bold text-uppercase m-0 lh-1">Pemerintah<br/>Desa Bojong</h5>
              </div>
            </div>
            <p className="text-white-50 small mb-4 text-justify">
              Website resmi Desa Bojong : media informasi, layanan warga, dan promosi potensi desa.
            </p>
            <div className="d-flex gap-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="rounded-circle d-flex align-items-center justify-content-center bg-white bg-opacity-10" style={{ width: '36px', height: '36px' }}>
                  <Globe size={16} />
                </div>
              ))}
            </div>
          </div>

          <div className="col-lg-2">
            <h6 className="fw-bold mb-4 pb-2 border-bottom border-secondary d-inline-block">Tautan Cepat</h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2">
              <li><a href="/#home" className="text-reset text-decoration-none">Beranda</a></li>
              <li><a href="/profil-desa/sejarah" className="text-reset text-decoration-none">Profil Desa</a></li>
              <li><a href="/pemerintahan/perangkat-desa" className="text-reset text-decoration-none">Pemerintahan</a></li>
              <li><a href="/berita" className="text-reset text-decoration-none">Berita & Kegiatan</a></li>
            </ul>
          </div>

          <div className="col-lg-2">
            <h6 className="fw-bold mb-4 pb-2 border-bottom border-secondary d-inline-block">Layanan Warga</h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2">
              <li><a href="/layanan-warga/surat" className="text-reset text-decoration-none">Surat Keterangan</a></li>
              <li><a href="/layanan-warga/pengaduan" className="text-reset text-decoration-none">Pengaduan Warga</a></li>
              <li><a href="/layanan-warga/bantuan-faq" className="text-reset text-decoration-none">Bantuan & FAQ</a></li>
            </ul>
          </div>

          <div className="col-lg-3">
            <h6 className="fw-bold mb-4 pb-2 border-bottom border-secondary d-inline-block">Hubungi Kami</h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-3">
              <li className="d-flex gap-2">
                <Map size={18} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <span>Kantor Desa Bojong, Kec. Wonosegoro, Kab. Boyolali</span>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <Phone size={18} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <span>(0276) 123456</span>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <Mail size={18} className="flex-shrink-0" style={{ color: 'var(--accent)' }} />
                <span>pemdes@bojong.boyolali.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-top border-secondary pt-4 mt-4 text-center text-white-50 small">
          <p className="mb-0">&copy; {new Date().getFullYear()} Pemerintah Desa Bojong. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
