'use client';

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useRef } from "react";
import { 
  Search, Menu, X, ChevronRight, ChevronLeft, FileText, Building2, Users, Map, 
  Phone, Mail, Calendar, BarChart3, Download, ExternalLink, ArrowRight,
  Monitor, Globe, MessageSquare, 
  BookOpen, Stethoscope, Landmark, Cloud, CloudRain, CloudLightning, Sun, Wind,
  Clock, Heart, ShieldCheck, ScrollText, Home, HelpCircle, Star,
  ShoppingBag, MapPin, Megaphone, Scale, UserCheck, DatabaseZap, User, UserCircle
} from "lucide-react";

export default function HomeBojong() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/berita?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };
  
  // Weather State
  const [weather, setWeather] = useState<{
    temp: number;
    humidity: number;
    wind: number;
    code: number;
    desc: string;
  } | null>(null);

  // Hero Slides Data
  const heroSlides = [
    {
      img: "/masjid_agung_demak.png",
      caption: "Pemandangan Wilayah Desa Bojong — Kecamatan Wonosegoro, Kabupaten Boyolali"
    },
    {
      img: "/mangrove_morosari.jpg",
      caption: "Potensi Alam dan Lingkungan Hijau Desa Bojong"
    },
    {
      img: "/wisata_bahari.jpg",
      caption: "Kawasan Pertanian dan Kearifan Lokal Warga Desa Bojong"
    },
    {
      img: "/makam_sunan_kalijaga.jpg",
      caption: "Kegiatan Kemasyarakatan dan Kerukunan Warga Desa Bojong"
    }
  ];

  // Auto-slide carousel
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, [heroSlides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  }, [heroSlides.length]);

  useEffect(() => {
    // Fetch Weather Data (Bojong / Demak Coordinates — approx)
    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-6.8948&longitude=110.6386&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok');
        const data = await res.json();
        const current = data.current;
        
        let desc = "Cerah";
        const code = current.weather_code;
        
        // WMO Weather interpretation codes
        if (code === 0) desc = "Cerah";
        else if (code >= 1 && code <= 3) desc = "Berawan";
        else if (code >= 45 && code <= 48) desc = "Berkabut";
        else if (code >= 51 && code <= 67) desc = "Hujan Ringan";
        else if (code >= 80 && code <= 82) desc = "Hujan Deras";
        else if (code >= 95) desc = "Badai Petir";
        
        setWeather({
          temp: Math.round(current.temperature_2m),
          humidity: current.relative_humidity_2m,
          wind: current.wind_speed_10m,
          code: code,
          desc: desc
        });
      } catch (err) {
        console.error("Failed to fetch weather:", err);
      }
    };
    
    fetchWeather();
    // Refresh every 30 minutes
    const weatherInterval = setInterval(fetchWeather, 30 * 60 * 1000);
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Auto-slide every 5 seconds
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);

    // Click-outside handler to close dropdown
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      clearInterval(weatherInterval);
      clearInterval(slideInterval);
    };
  }, []);

  // Helper to get Icon based on code
  const getWeatherIcon = (code: number) => {
    if (code === 0) return <Sun size={64} strokeWidth={1.5} />;
    if (code >= 1 && code <= 3) return <Cloud size={64} strokeWidth={1.5} />;
    if (code >= 51 && code <= 67) return <CloudRain size={64} strokeWidth={1.5} />;
    if (code >= 80 && code <= 86) return <CloudRain size={64} strokeWidth={1.5} />;
    if (code >= 95) return <CloudLightning size={64} strokeWidth={1.5} />;
    return <Sun size={64} strokeWidth={1.5} />;
  };

  const navLinks = [
    { name: "Beranda", href: "#home" },
    { 
      name: "Profil Desa", 
      href: "#", 
      dropdown: [
        { name: "Sejarah", href: "/profil-desa/sejarah" },
        { name: "Visi & Misi", href: "/profil-desa/visi-misi" },
        { name: "Geografis", href: "/profil-desa/geografis" }
      ]
    },
    { 
      name: "Pemerintahan", 
      href: "#",
      dropdown: [
        { name: "Struktur Organisasi", href: "/pemerintahan/struktur-organisasi" },
        { name: "Perangkat Desa", href: "/pemerintahan/perangkat-desa" },
        { name: "BPD & LPM", href: "/pemerintahan/bpd-lpm" }
      ]
    },
    { 
      name: "Layanan Warga", 
      href: "#",
      dropdown: [
        { name: "Surat", href: "/layanan-warga/surat" },
        { name: "Unduh Formulir", href: "/layanan-warga/unduh-formulir" },
        { name: "Pengaduan", href: "/layanan-warga/pengaduan" }
      ]
    },
    { 
      name: "Informasi Publik", 
      href: "#",
      dropdown: [
        { name: "APBDes", href: "/informasi-publik/apbdes" },
        { name: "Realisasi APBDes", href: "/informasi-publik/realisasi-apbdes" },
        { name: "Peraturan Desa", href: "/informasi-publik/peraturan-desa" }
      ]
    },
    { name: "Berita", href: "/berita" },
    { 
      name: "Potensi Desa", 
      href: "#",
      dropdown: [
        { name: "Wisata", href: "/potensi-desa/wisata" },
        { name: "UMKM", href: "/potensi-desa/umkm" },
        { name: "Galeri", href: "/potensi-desa/galeri" }
      ]
    },
    { name: "Kontak", href: "#kontak" },
  ];

  // News Data — Desa Bojong
  const newsData = {
    desa: {
      featured: {
        title: "Musyawarah Desa Bojong Bahas Rencana Pembangunan Tahun 2026",
        date: "10 Agustus 2026",
        author: "Admin Desa",
        category: "PEMERINTAHAN",
        img: "https://images.unsplash.com/photo-1590004987778-832145395a19?auto=format&fit=crop&w=800&q=80"
      },
      list: [
        { title: "Posyandu Rutin Desa Bojong: Imunisasi Anak dan Pemeriksaan Ibu Hamil", date: "8 Agu 2026", category: "Pengumuman", img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&auto=format&fit=crop&q=60" },
        { title: "Kerja Bakti Pembersihan Saluran Irigasi Dusun 3 Desa Bojong", date: "5 Agu 2026", category: "Berita", img: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=200&auto=format&fit=crop&q=60" },
        { title: "Rapat Koordinasi Perangkat Desa dan BPD tentang APBDes 2026", date: "3 Agu 2026", category: "Agenda", img: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=200&auto=format&fit=crop&q=60" },
        { title: "Sosialisasi Program Bantuan Sosial dari Pemerintah Kabupaten", date: "1 Agu 2026", category: "Publikasi", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&auto=format&fit=crop&q=60" }
      ]
    },
    kegiatan: {
      featured: {
        title: "Sosialisasi Pembuatan Lilin dari Minyak Jelantah Bersama Ibu PKK",
        date: "9 Agustus 2026",
        author: "Tim KKN",
        category: "KEGIATAN KKN",
        img: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
      },
      list: [
        { title: "Demo Filterisasi Air Sederhana: Pasir, Kerikil, Arang & Ijuk untuk Warga", date: "7 Agu 2026", category: "Kegiatan", img: "https://images.unsplash.com/photo-1625246333195-5819acf42d91?w=200&auto=format&fit=crop&q=60" },
        { title: "Pemasangan Plang Petunjuk Jalan Berbahasa Jepang di Desa Bojong", date: "4 Agu 2026", category: "Kegiatan", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=200&auto=format&fit=crop&q=60" },
        { title: "Pendataan UMKM Desa Bojong: Gethuk Pak Santo & Jamu Bu Turkidjo", date: "2 Agu 2026", category: "Kegiatan", img: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=200&auto=format&fit=crop&q=60" },
        { title: "Pelatihan Pengelolaan Keuangan Sederhana untuk Pelaku UMKM Desa", date: "30 Jul 2026", category: "Kegiatan", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&auto=format&fit=crop&q=60" }
      ]
    }
  };

  const [activeNewsTab, setActiveNewsTab] = useState<'desa' | 'kegiatan'>('desa');

  return (
    <main>


      {/* ============================================================ */}
      {/* 1. HERO SLIDER — Carousel 3-5 foto, caption bawah kiri       */}
      {/* ============================================================ */}
      <section id="home" className="position-relative vh-100 overflow-hidden">
        {/* Slides */}
        {heroSlides.map((slide, idx) => (
          <div 
            key={idx}
            className="position-absolute w-100 h-100 top-0 start-0"
            style={{ 
              opacity: currentSlide === idx ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              zIndex: currentSlide === idx ? 1 : 0
            }}
          >
            <Image 
              src={slide.img}
              alt={slide.caption} 
              fill
              className="object-fit-cover"
              priority={idx === 0}
            />
            {/* Dark overlay */}
            <div className="position-absolute w-100 h-100 top-0 start-0" 
                 style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.4) 100%)' }}>
            </div>
          </div>
        ))}

        {/* Left Aligned Hero Text — Desa Bojong version */}
        <div className="position-absolute start-0 top-0 w-100 h-100 d-flex align-items-center z-2" style={{ zIndex: 5 }}>
          <div className="container-fluid px-4 px-md-5 mx-0 w-100">
            <div className="row">
              <div className="col-12 col-lg-9 text-start">
                
                {/* Title */}
                <h1 className="text-white text-uppercase mb-2" style={{ fontWeight: 900, fontSize: 'clamp(2.3rem, 5.5vw, 4.2rem)', lineHeight: '1.15', letterSpacing: '0.5px', textShadow: '2px 2px 15px rgba(0,0,0,0.85)' }}>
                  Selamat Datang <br />
                  <span style={{ color: '#fbbf24', textShadow: '0 0 25px rgba(251,191,36,0.6)' }}>di Desa Bojong</span>
                </h1>
                
                {/* Description */}
                <p className="text-light mb-3 fs-5 text-justify opacity-95" style={{ maxWidth: '650px', textShadow: '1px 1px 5px rgba(0,0,0,0.9)', lineHeight: '1.5' }}>
                  Desa mandiri, bersih, dan berdaya. Bersama membangun Desa Bojong yang sejahtera, hijau, dan berkelanjutan untuk generasi mendatang.
                </p>
                
                {/* Action Buttons */}
                <div className="d-flex gap-3 mb-4 flex-wrap">
                  <a href="/profil-desa/sejarah" className="btn btn-warning rounded-pill px-4 py-2.5 fw-black text-dark shadow-lg hover-lift transition-all" style={{ backgroundColor: '#fbbf24', borderColor: '#fbbf24', fontWeight: 900 }}>
                    Jelajahi Desa Bojong
                  </a>
                  <a href="/berita" className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-bold hover-lift transition-all" style={{ border: '2px solid white' }}>
                    Baca Berita
                  </a>
                </div>

                {/* Current Slide Caption & Slide Indicators */}
                <div className="mt-3 pt-3 border-top border-secondary border-opacity-35" style={{ maxWidth: '500px' }}>
                  <p className="text-white mb-2 fs-6 opacity-75 fst-italic">
                    Foto: {heroSlides[currentSlide].caption}
                  </p>
                  <div className="d-flex gap-2 align-items-center">
                    {heroSlides.map((_, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className="border-0 rounded-pill"
                        style={{ 
                          width: currentSlide === idx ? '32px' : '10px', 
                          height: '10px',
                          background: currentSlide === idx ? '#fbbf24' : 'rgba(255,255,255,0.4)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer'
                        }}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        {/* Bottom wave */}
        <div className="position-absolute bottom-0 w-100" style={{ zIndex: 5 }}>
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120">
              <path fill="#ffffff" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,90.7C384,96,480,96,576,85.3C672,75,768,53,864,48C960,43,1056,53,1152,58.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
             </svg>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. QUICK MENU ICONS — akses cepat fitur inti                  */}
      {/* ============================================================ */}
      <section className="py-4 bg-white" style={{ marginTop: '-1px' }}>
        <div className="container">
          <div className="row g-3 row-cols-3 row-cols-md-6 justify-content-center">
            {[
              { name: "Profil Desa", icon: Building2, href: "/profil-desa/sejarah" },
              { name: "Pengumuman", icon: Megaphone, href: "#berita" },
              { name: "Pengaduan", icon: MessageSquare, href: "/layanan-warga/pengaduan" },
              { name: "Bantuan / FAQ", icon: HelpCircle, href: "/layanan-warga/bantuan-faq" },
              { name: "Lapak Bojong", icon: ShoppingBag, href: "/potensi-desa/umkm" },
              { name: "Wisata & Potensi", icon: MapPin, href: "/potensi-desa/wisata" },
            ].map((item, i) => (
              <div className="col scale-in" key={i}>
                <a href={item.href} className="text-decoration-none">
                  <div className="card h-100 py-3 px-2 rounded-3 hover-lift transition-all group" 
                       style={{ cursor: 'pointer', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                    <div className="mx-auto mb-2 d-flex align-items-center justify-content-center transition-colors" 
                         style={{ width: '48px', height: '48px', color: 'var(--primary)' }}>
                       <item.icon size={26} className="group-hover-gold" style={{ transition: 'color 0.3s ease' }} />
                    </div>
                    <h6 className="fw-bold mb-0 text-center transition-colors group-hover-gold-text" style={{ fontSize: '0.75rem', color: 'var(--text-main)' }}>{item.name}</h6>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. SAMBUTAN KEPALA DESA                                       */}
      {/* ============================================================ */}
      <section className="py-5 bg-white position-relative overflow-hidden">
        {/* Decorative background element */}
        <div className="position-absolute top-0 end-0 p-5 opacity-10" style={{ zIndex: 0 }}>
          <div className="display-1 fw-bold text-secondary" style={{ fontSize: '10rem', lineHeight: 0.8 }}>B</div>
        </div>

        <div className="container position-relative z-1">
          <div className="row align-items-center g-5">
            {/* Left: Foto Kepala Desa */}
            <div className="col-lg-5 fade-in-left">
              <div className="card border-0 shadow-lg overflow-hidden" style={{ borderRadius: '16px' }}>
                <div className="position-relative" style={{ height: '480px', background: 'linear-gradient(to bottom, #e2e8f0, #cbd5e1)' }}>
                  <Image 
                    src="/bupati_new.jpg" 
                    alt="Kepala Desa Bojong" 
                    fill 
                    className="object-fit-cover object-top"
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-4 text-center" style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.95), transparent)' }}>
                    <h6 className="text-white fw-bold mb-0 small text-uppercase" style={{ fontSize: '10px', letterSpacing: '2px' }}>Kepala Desa Bojong</h6>
                    <div style={{ width: '40px', height: '2px', background: '#fbbf24', margin: '8px auto' }}></div>
                    <h5 className="text-white fw-bold mb-0" style={{ fontSize: '1.1rem' }}>Kepala Desa</h5>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Sambutan */}
            <div className="col-lg-7 fade-in-right">
               <div className="ps-lg-4">
                  <h2 className="display-6 fw-bold mb-3 mt-2" style={{ color: 'var(--primary)' }}>
                    Selamat Datang di<br/>Website Desa Bojong
                  </h2>

                  <div className="bg-light p-4 rounded-3 border-start border-4 mb-4" style={{ borderColor: 'var(--accent) !important' }}>
                    <p className="mb-0 fst-italic text-muted text-justify" style={{ fontSize: '1.05rem', lineHeight: 1.8 }}>
                      &ldquo;Assalamu&apos;alaikum Wr. Wb. Puji syukur kehadirat Allah SWT, website Desa Bojong hadir sebagai media informasi dan pelayanan bagi seluruh warga. Kami berkomitmen mewujudkan desa yang transparan, partisipatif, dan melayani. Semoga website ini bermanfaat bagi kita semua.&rdquo;
                    </p>
                  </div>
                  
                  <div className="d-flex align-items-center gap-3 mb-4">
                    <div>
                      <div className="fw-bold" style={{ color: 'var(--primary)', fontFamily: 'var(--font-cinzel)', fontSize: '1.1rem' }}>Kepala Desa Bojong</div>
                      <div className="text-muted small">Pemerintah Desa Bojong, Kec. Wonosegoro, Kab. Boyolali</div>
                    </div>
                  </div>

                  <a href="/pemerintahan/perangkat-desa" className="btn btn-primary rounded-pill px-4 fw-bold shadow-sm" style={{ background: 'var(--primary)', borderColor: 'var(--primary)' }}>
                    Profil Lengkap <ArrowRight size={16} className="ms-2" />
                  </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. "BOJONG DESAKU" — foto + angka penduduk                    */}
      {/* ============================================================ */}
      <section className="position-relative py-0 overflow-hidden" style={{ minHeight: '500px' }}>
        {/* Background image */}
        <div className="position-absolute w-100 h-100 top-0 start-0">
          <Image 
            src="/mangrove_morosari.jpg" 
            alt="Pemandangan Desa Bojong" 
            fill 
            className="object-fit-cover"
          />
          <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(to right, rgba(15, 23, 42, 0.85), rgba(30, 58, 138, 0.7))' }}></div>
        </div>

        <div className="container position-relative z-1 py-5">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-5 text-white mb-5 mb-lg-0 fade-in-left">
              <h2 className="display-4 fw-bold mb-3" style={{ fontFamily: 'var(--font-cinzel)', color: '#fbbf24' }}>
                Bojong Desaku
              </h2>
              <p className="fs-5 opacity-75 mb-4 text-justify" style={{ maxWidth: '480px', lineHeight: 1.7 }}>
                Desa yang kaya akan budaya, potensi alam, dan semangat gotong royong masyarakatnya. Berkomitmen menjadi desa mandiri dan sejahtera.
              </p>
              <a href="/profil-desa/demografi" className="btn btn-outline-light rounded-pill px-4 py-2 fw-bold hover-lift">
                Statistik Penduduk <ArrowRight size={18} className="ms-2" />
              </a>
            </div>

            <div className="col-lg-7">
              <div className="row g-3 g-md-4 text-center text-white">
                {[
                  { label: "Total Penduduk", val: "4.523", icon: Users, desc: "Jiwa", color: "#fbbf24", bg: "rgba(251, 191, 36, 0.2)" },
                  { label: "Kepala Keluarga", val: "1.150", icon: Home, desc: "KK", color: "#10b981", bg: "rgba(16, 185, 129, 0.2)" },
                  { label: "Laki-laki", val: "2.276", icon: User, desc: "Jiwa", color: "#60a5fa", bg: "rgba(96, 165, 250, 0.2)" },
                  { label: "Perempuan", val: "2.247", icon: UserCircle, desc: "Jiwa", color: "#f43f5e", bg: "rgba(244, 63, 94, 0.2)" },
                ].map((stat, i) => (
                  <div className="col-6 scale-in" key={i}>
                    <div className="p-4 rounded-4 h-100 hover-lift transition-all border group" 
                         style={{ 
                           background: 'rgba(255, 255, 255, 0.08)', 
                           backdropFilter: 'blur(16px)',
                           borderColor: 'rgba(255,255,255,0.15)' 
                         }}>
                      <div className="d-flex align-items-center justify-content-center mb-3">
                         <div className="rounded-circle d-flex align-items-center justify-content-center transition-colors" 
                              style={{ width: '50px', height: '50px', background: stat.bg, color: stat.color }}>
                           <stat.icon size={24} className="group-hover-white-text transition-colors" />
                         </div>
                      </div>
                      <div className="display-5 fw-bold mb-0 text-white" style={{ fontFamily: 'var(--font-cinzel)', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                         {stat.val}
                      </div>
                      <div className="text-warning fw-bold small mb-2">{stat.desc}</div>
                      <div className="small text-uppercase opacity-75 fw-bold" style={{ letterSpacing: '1px' }}>{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. CUPLIKAN STRUKTUR ORGANISASI (SOTK)                        */}
      {/* ============================================================ */}
      <section className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="text-center mb-5">
            <h6 className="fw-bold text-uppercase ls-2" style={{ color: 'var(--accent)', letterSpacing: '2px' }}>PEMERINTAH DESA BOJONG</h6>
            <h2 className="display-6 fw-bold" style={{ color: 'var(--primary)' }}>Perangkat Desa</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '520px' }}>Kenali wajah-wajah pemerintah Desa Bojong yang melayani kebutuhan warga setiap hari.</p>
          </div>

          <div className="row g-4 justify-content-center mb-4">
            {[
              { name: "Kepala Desa", role: "Kepala Desa Bojong", img: "/bupati_new.jpg" },
              { name: "Sekretaris Desa", role: "Sekretaris Desa", img: "/wakil_bupati_new.png" },
              { name: "Kaur Keuangan", role: "Kepala Urusan Keuangan", img: "/bupati_new.jpg" },
              { name: "Kasi Pemerintahan", role: "Kepala Seksi Pemerintahan", img: "/wakil_bupati_new.png" },
            ].map((person, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="card border-0 shadow-sm h-100 overflow-hidden">
                  <div className="position-relative" style={{ height: '280px', background: 'linear-gradient(to bottom, #e2e8f0, #cbd5e1)' }}>
                    <Image src={person.img} alt={person.name} fill className="object-fit-cover object-top" />
                    <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center" style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.95), transparent)' }}>
                      <h6 className="text-white fw-bold mb-0 small text-uppercase" style={{ fontSize: '10px' }}>{person.role}</h6>
                      <div style={{ width: '24px', height: '2px', background: '#fbbf24', margin: '4px auto' }}></div>
                      <h5 className="text-white fw-bold mb-0" style={{ fontSize: '0.9rem' }}>{person.name}</h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a href="/pemerintahan/perangkat-desa" className="btn btn-outline-primary rounded-pill px-4 fw-bold" style={{ borderColor: 'var(--primary)', color: 'var(--primary)' }}>
              Selengkapnya <ArrowRight size={16} className="ms-2" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. BERITA TERKINI — tag Terpopuler + tabs                     */}
      {/* ============================================================ */}
      <section id="berita" className="py-5" style={{ background: '#f8fafc' }}>
        <div className="container">
          <div className="row g-4">
             {/* Main News List - Left Column */}
            <div className="col-lg-8">
               <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2" style={{ borderColor: 'var(--primary)' }}>
                 <div className="d-flex gap-4">
                    <button 
                      onClick={() => setActiveNewsTab('desa')}
                      className={`h3 fw-bold m-0 bg-transparent border-0 p-0 ${activeNewsTab === 'desa' ? 'text-primary' : 'text-muted'}`} 
                      style={{ transition: 'color 0.3s' }}>
                      Berita Desa
                    </button>
                    <button 
                      onClick={() => setActiveNewsTab('kegiatan')}
                      className={`h3 fw-bold m-0 bg-transparent border-0 p-0 ${activeNewsTab === 'kegiatan' ? 'text-primary' : 'text-muted'}`} 
                      style={{ transition: 'color 0.3s' }}>
                      Kegiatan
                    </button>
                 </div>
                 <a href="/berita" className="text-decoration-none fw-bold small" style={{ color: 'var(--accent)' }}>Berita Lainnya &rarr;</a>
               </div>

               {/* Content switching based on activeNewsTab */}
               <div className="animate-fade-in">
                   {/* Large Featured News with Terpopuler tag */}
                   <div className="card border-0 shadow-sm mb-4">
                     <div className="position-relative" style={{ height: '400px' }}>
                        <Image 
                          src={newsData[activeNewsTab].featured.img} 
                          alt="Featured" 
                          fill 
                          className="object-fit-cover rounded-top"
                        />
                        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.8))' }}>
                           <div className="d-flex gap-2 mb-2">
                             <span className="badge bg-warning text-dark">{newsData[activeNewsTab].featured.category}</span>
                             <span className="badge bg-danger d-flex align-items-center gap-1"><Star size={10} /> Terpopuler</span>
                           </div>
                           <h2 className="fw-bold h3">{newsData[activeNewsTab].featured.title}</h2>
                           <p className="mb-0 small opacity-75">{newsData[activeNewsTab].featured.date} | Oleh {newsData[activeNewsTab].featured.author}</p>
                        </div>
                     </div>
                   </div>

                   {/* List Items with category badges */}
                   <div className="list-group list-group-flush">
                     {newsData[activeNewsTab].list.map((item, i) => (
                       <a href="#" key={i} className="list-group-item list-group-item-action py-3 d-flex gap-3 align-items-start border-bottom">
                         <div className="flex-shrink-0 position-relative rounded overflow-hidden" style={{ width: '120px', height: '80px' }}>
                           <Image src={item.img} alt="thumb" fill className="object-fit-cover" />
                         </div>
                         <div>
                           <div className="d-flex gap-2 align-items-center mb-1">
                             <span className="badge bg-light text-dark border" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                             <span className="small text-muted"><Calendar size={12} className="me-1" />{item.date}</span>
                           </div>
                           <h6 className="fw-bold mb-1" style={{ color: 'var(--text-main)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.title}</h6>
                         </div>
                       </a>
                     ))}
                   </div>
               </div>
            </div>

            {/* Sidebar - Right Column */}
            <div className="col-lg-4">
              
               {/* Pengumuman */}
               <div className="card border-0 shadow-sm mb-4">
                  <div className="card-header fw-bold text-white" style={{ background: 'var(--primary)' }}>
                    Pengumuman Desa
                  </div>
                  <ul className="list-group list-group-flush">
                    {[
                      "Jadwal Posyandu Bulan Agustus 2026 — Setiap Kamis Minggu ke-2",
                      "Pengumuman: Pembagian Bantuan Sosial Tahap III Tahun 2026",
                      "Info Pelayanan Surat di Kantor Desa Selama Bulan Ramadhan"
                    ].map((text, i) => (
                      <li key={i} className="list-group-item py-3">
                         <span className="badge bg-light text-dark border mb-1">Info</span>
                         <p className="mb-0 fw-bold small text-dark hover-primary cursor-pointer">{text}</p>
                      </li>
                    ))}
                  </ul>
               </div>

               {/* Banner Agenda Desa */}
               <div className="mb-4">
                 <div className="bg-light rounded p-4 text-center border border-dashed position-relative overflow-hidden" style={{ height: '200px' }}>
                    <Image 
                      src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80" 
                      fill 
                      alt="Agenda Desa" 
                      className="object-fit-cover opacity-50"
                    />
                    <div className="position-absolute top-50 start-50 translate-middle w-100">
                      <p className="fw-bold m-0 text-dark" style={{ textShadow: '0 2px 4px rgba(255,255,255,0.8)' }}>Agenda & Kegiatan Desa Bojong</p>
                    </div>
                 </div>
               </div>

               {/* Cuaca Widget (compact) */}
               <div className="card border-0 shadow-sm overflow-hidden text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a, #3b82f6)' }}>
                  <div className="card-body p-4">
                     {weather ? (
                        <>
                         <div className="d-flex justify-content-between align-items-start mb-3">
                             <div>
                                 <h6 className="fw-bold text-uppercase opacity-75 mb-1" style={{ fontSize: '0.7rem' }}>Cuaca Desa Bojong</h6>
                                 <h3 className="display-6 fw-bold mb-0">{weather.temp}°C</h3>
                                 <p className="mb-0">{weather.desc}</p>
                             </div>
                             <div className="text-warning">
                                 {getWeatherIcon(weather.code)}
                             </div>
                         </div>
                         <div className="d-flex gap-3 border-top border-white border-opacity-25 pt-3">
                             <div className="d-flex align-items-center gap-1">
                                 <CloudRain size={14} className="opacity-75" />
                                 <span className="small">{weather.humidity}%</span>
                             </div>
                             <div className="d-flex align-items-center gap-1">
                                 <Wind size={14} className="opacity-75" />
                                 <span className="small">{weather.wind} km/h</span>
                             </div>
                         </div>
                        </>
                     ) : (
                        <div className="d-flex justify-content-center align-items-center py-3">
                            <div className="spinner-border spinner-border-sm text-light" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                     )}
                  </div>
               </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 8. GALERI POTENSI DESA                                        */}
      {/* ============================================================ */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="d-flex justify-content-between align-items-end mb-4">
             <div>
               <h4 className="fw-bold mb-0" style={{ color: 'var(--primary)' }}>Potensi Desa Bojong</h4>
               <p className="text-muted mb-0">Wisata, UMKM, dan kekayaan budaya Desa Bojong</p>
             </div>
             <a href="/potensi-desa/wisata" className="text-decoration-none fw-bold small d-none d-md-block" style={{ color: 'var(--accent)' }}>Lihat Semua &rarr;</a>
          </div>

          <div className="row g-4 mb-4">
             {[
               { title: "UMKM Gethuk — Pak Santo", img: "https://images.unsplash.com/photo-1625246333195-5819acf42d91?auto=format&fit=crop&w=400" },
               { title: "Jamu Tradisional — Bu Turkidjo", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400" },
               { title: "Wisata Alam Bojong", img: "/mangrove_morosari.jpg" },
               { title: "Budaya & Tradisi Lokal", img: "/wisata_bahari.jpg" },
             ].map((item, i) => (
               <div className="col-md-3 col-6" key={i}>
                 <div className="card border-0 shadow-sm h-100 overflow-hidden text-white group">
                    <div className="position-relative" style={{ height: '250px' }}>
                      <Image src={item.img} alt={item.title} fill className="object-fit-cover" />
                      <div className="position-absolute bottom-0 start-0 w-100 p-3" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                         <h5 className="h6 fw-bold mb-0">{item.title}</h5>
                      </div>
                    </div>
                 </div>
               </div>
             ))}
          </div>

          {/* Jam Pelayanan Kantor Desa */}
          <div className="row g-4">
             <div className="col-md-6">
                <div className="card border-0 shadow h-100 overflow-hidden text-decoration-none" style={{ background: 'linear-gradient(135deg, #059669, #10b981)' }}>
                  <div className="card-body p-5 d-flex flex-column align-items-center justify-content-center text-center position-relative text-white">
                     {/* Decorative background circle */}
                     <div className="position-absolute top-50 start-50 translate-middle rounded-circle opacity-10" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}></div>
                     
                     <div className="mb-4 position-relative z-1 rounded-circle bg-white d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                        <Clock size={56} className="text-success" />
                     </div>
                     
                     <h3 className="fw-bold text-white mb-1 text-uppercase ls-1 position-relative z-1">Jam Pelayanan</h3>
                     <p className="text-white text-opacity-75 mb-3 fw-bold small position-relative z-1">KANTOR DESA BOJONG</p>
                     
                     <div className="position-relative z-1 text-start w-100" style={{ maxWidth: '280px' }}>
                        <div className="d-flex justify-content-between py-2 border-bottom border-white border-opacity-25">
                           <span className="fw-bold small">Senin — Kamis</span>
                           <span className="small">08:00 — 15:00</span>
                        </div>
                        <div className="d-flex justify-content-between py-2 border-bottom border-white border-opacity-25">
                           <span className="fw-bold small">Jumat</span>
                           <span className="small">08:00 — 11:00</span>
                        </div>
                        <div className="d-flex justify-content-between py-2">
                           <span className="fw-bold small">Sabtu — Minggu</span>
                           <span className="small text-warning">Libur</span>
                        </div>
                     </div>
                  </div>
                </div>
             </div>
             <div className="col-md-6">
               {/* Pengaduan Warga CTA Card */}
               <div className="card border-0 shadow h-100 overflow-hidden" style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)' }}>
                 <div className="card-body p-5 d-flex flex-column align-items-center justify-content-center text-center position-relative text-white">
                    <div className="position-absolute top-50 start-50 translate-middle rounded-circle opacity-10" style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, #fff 0%, transparent 70%)' }}></div>
                    
                    <div className="mb-4 position-relative z-1 rounded-circle bg-white d-flex align-items-center justify-content-center" style={{ width: '120px', height: '120px' }}>
                       <MessageSquare size={56} className="text-danger" />
                    </div>
                    
                    <h3 className="fw-bold text-white mb-1 text-uppercase ls-1 position-relative z-1">Pengaduan Warga</h3>
                    <p className="text-white text-opacity-75 mb-3 fw-bold small position-relative z-1">PUNYA KELUHAN ATAU MASALAH?</p>
                    
                    <div className="position-relative z-1 d-flex flex-column gap-2">
                       <a href="/layanan-warga/pengaduan" className="btn btn-light rounded-pill px-4 fw-bold text-danger shadow-sm">
                         Buat Pengaduan Sekarang
                       </a>
                       <a href="/layanan-warga/bantuan-faq" className="btn btn-outline-light rounded-pill px-4 fw-bold small">
                         Bantuan & FAQ
                       </a>
                    </div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 9. BAND STATISTIK + DUKUNGAN/MITRA (gabungan)                 */}
      {/* ============================================================ */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(to right, #0f172a, #1e293b)' }}>
        <div className="container">
           {/* Stats Row */}
           <div className="row g-5 text-center">
              {[
                { label: "Berita Desa", val: "48" },
                { label: "UMKM Terdaftar", val: "12" },
                { label: "Pengaduan Selesai", val: "35" },
                { label: "Kegiatan KKN", val: "11" }
              ].map((stat, i) => (
                <div className="col-6 col-md-3 position-relative" key={i}>
                   <div className="display-4 fw-bold mb-2 text-warning">{stat.val}</div>
                   <div className="text-uppercase tracking-wider small opacity-75">{stat.label}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 10. PETA WILAYAH — dekat footer                               */}
      {/* ============================================================ */}
      <section className="py-5 bg-white">
        <div className="container">
           <div className="text-center mb-5">
             <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>Peta Desa Bojong</h2>
             <p className="text-muted">Lokasi Kantor Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali</p>
           </div>
           
           <div className="card border-0 shadow-lg overflow-hidden rounded-3">
              <div className="position-relative" style={{ height: '500px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11548.702554851248!2d110.67516078629299!3d-7.27248461243207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e709fc3807741e7%3A0x3654f2f58a25704b!2sBojong%2C%20Kec.%20Wonosegoro%2C%20Kabupaten%20Boyolali%2C%20Jawa%20Tengah!5e1!3m2!1sid!2sid!4v1786519745813!5m2!1sid!2sid" 
                width="1200" 
                height="500" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
              >
              </iframe>
              </div>
           </div>
        </div>
      </section>


      {/* ============================================================ */}
      {/* WHATSAPP FLOATING BUTTON                                      */}
      {/* ============================================================ */}
      <a 
        href="https://wa.me/6208xxxxxxxxxx" 
        target="_blank" 
        rel="noopener noreferrer"
        className="position-fixed d-flex align-items-center justify-content-center shadow-lg"
        style={{ 
          bottom: '24px', 
          right: '96px', 
          width: '60px', 
          height: '60px', 
          borderRadius: '50%',
          background: '#25D366',
          color: 'white',
          zIndex: 9999,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.4)'
        }}
        title="Hubungi via WhatsApp"
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
      >
        <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </main>
  );
}
