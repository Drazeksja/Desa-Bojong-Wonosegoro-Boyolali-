'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Facebook,
  Instagram,
  Youtube
} from "lucide-react";

export default function Footer() {
  const [visitorStats, setVisitorStats] = useState<{
    online: number;
    month: number;
    total: number;
  }>({
    online: 1,
    month: 0,
    total: 0
  });

  useEffect(() => {
    // Generate persistent client ID if not exists
    let visitorId = localStorage.getItem("desa_vid");
    let isNew = false;
    if (!visitorId) {
      visitorId = "usr_" + Math.random().toString(36).substring(2, 10) + Date.now().toString(36);
      localStorage.setItem("desa_vid", visitorId);
      isNew = true;
    }

    // Ping visitor API
    const recordVisit = async () => {
      try {
        const res = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId, isNewVisitor: isNew }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setVisitorStats({
              online: data.online,
              month: data.month,
              total: data.total
            });
          }
        }
      } catch (e) {
        console.error("Visitor tracking error:", e);
      }
    };

    recordVisit();

    // Heartbeat every 2 minutes to keep online status active
    const heartbeat = setInterval(() => {
      fetch("/api/visitors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId, isNewVisitor: false }),
      }).then(res => res.json()).then(data => {
        if (data?.success) {
          setVisitorStats({
            online: data.online,
            month: data.month,
            total: data.total
          });
        }
      }).catch(() => {});
    }, 120000);

    return () => clearInterval(heartbeat);
  }, []);

  return (
    <footer className="text-white pt-5 pb-4" style={{ backgroundColor: 'var(--navbar-bg-solid, #111827)' }}>
      <div className="container">
        {/* Top 4-Column Grid: Balanced & Professional */}
        <div className="row g-4 mb-5 pb-2">
          {/* Kolom 1: Profil & Identitas Desa */}
          <div className="col-lg-4 col-md-6 pe-lg-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="position-relative rounded-circle overflow-hidden flex-shrink-0 bg-white shadow-sm" 
                   style={{ width: '48px', height: '48px' }}>
                <Image src="/LOGO.webp" alt="Logo Desa Bojong" fill className="object-fit-contain p-1" priority />
              </div>
              <div>
                <h6 className="fw-bold text-uppercase m-0 tracking-wide text-white">
                  Pemerintah Desa Bojong
                </h6>
                <small className="text-white-50" style={{ fontSize: '0.75rem' }}>
                  Kec. Wonosegoro, Kab. Boyolali
                </small>
              </div>
            </div>
            <p className="text-white-50 small mb-4 lh-base" style={{ maxWidth: '340px' }}>
              Portal resmi pelayanan masyarakat, publikasi kegiatan, transparansi anggaran, serta promosi potensi dan inovasi Desa Bojong.
            </p>
            <div>
              <span className="text-white-50 small d-block mb-2 text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}>
                Media Sosial
              </span>
              <div className="d-flex gap-2">
                <a href="#" className="rounded d-flex align-items-center justify-content-center bg-white bg-opacity-10 text-white text-decoration-none transition-all hover-opacity" style={{ width: '34px', height: '34px' }} title="Facebook">
                  <Facebook size={15} />
                </a>
                <a href="#" className="rounded d-flex align-items-center justify-content-center bg-white bg-opacity-10 text-white text-decoration-none transition-all hover-opacity" style={{ width: '34px', height: '34px' }} title="Instagram">
                  <Instagram size={15} />
                </a>
                <a href="#" className="rounded d-flex align-items-center justify-content-center bg-white bg-opacity-10 text-white text-decoration-none transition-all hover-opacity" style={{ width: '34px', height: '34px' }} title="YouTube">
                  <Youtube size={15} />
                </a>
              </div>
            </div>
          </div>

          {/* Kolom 2: Navigasi Cepat */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-semibold mb-3 text-white" style={{ fontSize: '0.9rem', letterSpacing: '0.03em' }}>
              Jelajah
            </h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2 mb-0">
              <li><a href="/" className="text-reset text-decoration-none hover-text-white">Beranda</a></li>
              <li><a href="/profil-desa/sejarah" className="text-reset text-decoration-none hover-text-white">Profil Desa</a></li>
              <li><a href="/pemerintahan/perangkat-desa" className="text-reset text-decoration-none hover-text-white">Pemerintahan</a></li>
              <li><a href="/berita" className="text-reset text-decoration-none hover-text-white">Berita Terkini</a></li>
              <li><a href="/potensi-desa/umkm" className="text-reset text-decoration-none hover-text-white">Potensi UMKM</a></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Publik */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="fw-semibold mb-3 text-white" style={{ fontSize: '0.9rem', letterSpacing: '0.03em' }}>
              Layanan Warga
            </h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2 mb-0">
              <li><a href="/layanan-warga/surat" className="text-reset text-decoration-none hover-text-white">Surat Keterangan</a></li>
              <li><a href="/layanan-warga/pengaduan" className="text-reset text-decoration-none hover-text-white">Layanan Pengaduan</a></li>
              <li><a href="/informasi-publik/apbdes" className="text-reset text-decoration-none hover-text-white">APBDes Transparan</a></li>
              <li><a href="/layanan-warga/bantuan-faq" className="text-reset text-decoration-none hover-text-white">Bantuan & FAQ</a></li>
            </ul>
          </div>

          {/* Kolom 4: Kontak Kantor */}
          <div className="col-lg-4 col-md-6">
            <h6 className="fw-semibold mb-3 text-white" style={{ fontSize: '0.9rem', letterSpacing: '0.03em' }}>
              Kantor Desa
            </h6>
            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2 mb-0">
              <li className="d-flex gap-2">
                <MapPin size={16} className="flex-shrink-0 mt-1 text-warning" />
                <span>Desa Bojong, Kec. Wonosegoro, Kab. Boyolali, Jawa Tengah 57382</span>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <Phone size={16} className="flex-shrink-0 text-warning" />
                <span>(0276) 123456</span>
              </li>
              <li className="d-flex gap-2 align-items-center">
                <Mail size={16} className="flex-shrink-0 text-warning" />
                <span>pemdes@bojong.boyolali.go.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Clean Structured Visitor Widget */}
        <div className="pt-4 border-top border-white border-opacity-10">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            {/* Copyright */}
            <div className="text-white-50 small text-center text-md-start">
              &copy; {new Date().getFullYear()} Pemerintah Desa Bojong. Hak Cipta Dilindungi.
            </div>

            {/* Statistik Pengunjung (Data Asli: Online, Bulan Ini, Total) */}
            <div className="d-flex align-items-center gap-3 text-white-50 small">
              <span className="text-uppercase fw-semibold" style={{ fontSize: '0.72rem', letterSpacing: '0.06em', color: 'rgba(255,255,255,0.45)' }}>
                Pengunjung:
              </span>

              {/* Online */}
              <div className="d-flex align-items-center gap-1">
                <span className="d-inline-block rounded-circle bg-success me-1" style={{ width: '6px', height: '6px' }}></span>
                <span>Online</span>
                <span className="fw-semibold text-white font-monospace ms-1">{visitorStats.online}</span>
              </div>

              <span className="text-white-50 opacity-25">|</span>

              {/* Bulan Ini */}
              <div className="d-flex align-items-center gap-1">
                <span>Bulan Ini</span>
                <span className="fw-semibold text-white font-monospace ms-1">{visitorStats.month.toLocaleString('id-ID')}</span>
              </div>

              <span className="text-white-50 opacity-25">|</span>

              {/* Total */}
              <div className="d-flex align-items-center gap-1">
                <span>Total</span>
                <span className="fw-semibold text-white font-monospace ms-1">{visitorStats.total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
