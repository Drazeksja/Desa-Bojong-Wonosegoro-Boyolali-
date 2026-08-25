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
import { supabase } from "@/lib/supabase";

export default function HomeBojong() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const [newsCount, setNewsCount] = useState<number>(5); // default/fallback to existing news count

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
      img: "/bg.webp",
      caption: "Pemandangan Wilayah Desa Bojong — Kecamatan Wonosegoro, Kabupaten Boyolali"
    },
    {
      img: "/2.jpeg",
      caption: "Potensi Alam dan Lingkungan Hijau Desa Bojong"
    },
    {
      img: "/3.jpeg",
      caption: "Kawasan Pertanian dan Kearifan Lokal Warga Desa Bojong"
    },
    {
      img: "/4.jpeg",
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
    
    // Fetch actual news count from database
    const fetchNewsCount = async () => {
      try {
        const { count, error } = await supabase
          .from("news")
          .select("*", { count: "exact", head: true });
        if (!error && count !== null) {
          setNewsCount(count);
        }
      } catch (err) {
        console.error("Failed to fetch news count:", err);
      }
    };
    fetchNewsCount();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

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
      {/* 1. HERO SECTION — Single background image & clean layout     */}
      {/* ============================================================ */}
      <section id="home" className="position-relative vh-100 overflow-hidden d-flex align-items-center">
        {/* Single Background Image */}
        <div className="position-absolute w-100 h-100 top-0 start-0" style={{ zIndex: 1 }}>
          <Image 
            src="/bg.webp"
            alt="Desa Bojong" 
            fill
            className="object-fit-cover"
            priority
          />
          {/* Subtle dark overlay for readability */}
          <div 
            className="position-absolute w-100 h-100 top-0 start-0" 
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)' }}
          ></div>
        </div>

        {/* Hero Content — Desa Bojong */}
        <div className="position-relative w-100 z-2" style={{ zIndex: 5 }}>
          <div className="container-fluid px-4 px-md-5">
            <div className="row">
              <div className="col-12 col-lg-8 col-xl-7 text-start">
                
                {/* Badge / Pill info */}
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3" 
                     style={{ background: 'rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                  <MapPin size={15} className="text-white opacity-85" />
                  <span className="text-white small fw-normal" style={{ letterSpacing: '0.3px' }}>
                    Desa Bojong — Kecamatan Wonosegoro, Kabupaten Boyolali
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-white mb-3" style={{ fontWeight: 700, fontSize: 'clamp(2.4rem, 5.5vw, 4.4rem)', lineHeight: '1.15', letterSpacing: '-0.5px' }}>
                  Selamat Datang <br />
                  di <span style={{ color: '#fbbf24' }}>Desa Bojong</span>
                </h1>
                
                {/* Description */}
                <p className="text-white text-opacity-90 mb-4 fs-5" style={{ maxWidth: '620px', lineHeight: '1.6', fontWeight: 400 }}>
                  Desa mandiri, bersih, dan berdaya. Bersama membangun Desa Bojong yang sejahtera, hijau, dan berkelanjutan untuk generasi mendatang.
                </p>
                
                {/* Action Buttons */}
                <div className="d-flex gap-3 flex-wrap align-items-center">
                  <a 
                    href="/profil-desa/sejarah" 
                    className="btn rounded-pill px-4 py-2.5 fw-medium text-white shadow-sm d-inline-flex align-items-center gap-2 text-decoration-none" 
                    style={{ backgroundColor: '#2c5282', borderColor: '#2c5282', transition: 'all 0.3s ease' }}
                  >
                    <span>Jelajahi Desa Bojong</span>
                    <ArrowRight size={18} />
                  </a>
                  <a 
                    href="/berita" 
                    className="btn btn-outline-light rounded-pill px-4 py-2.5 fw-medium text-white d-inline-flex align-items-center gap-2 text-decoration-none" 
                    style={{ border: '1.5px solid rgba(255,255,255,0.75)', backgroundColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(4px)' }}
                  >
                    <FileText size={18} />
                    <span>Baca Berita</span>
                  </a>
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
                    src="/gatot.webp" 
                    alt="Kepala Desa Bojong" 
                    fill 
                    className="object-fit-cover object-top"
                  />
                  <div className="position-absolute bottom-0 start-0 w-100 p-4 text-center" style={{ background: 'linear-gradient(to top, rgba(30, 58, 138, 0.95), transparent)' }}>
                    <h6 className="text-white fw-bold mb-0 small text-uppercase" style={{ fontSize: '10px', letterSpacing: '2px' }}>Kepala Desa Bojong</h6>
                    <div style={{ width: '40px', height: '2px', background: '#fbbf24', margin: '8px auto' }}></div>
                    <h5 className="text-white fw-bold mb-0" style={{ fontSize: '1.1rem' }}>Gatot Madiyo</h5>
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
      {/* 4. "BOJONG DESAKU" — foto + statistik kependudukan             */}
      {/* ============================================================ */}
      <section className="position-relative py-5 py-lg-6 overflow-hidden" style={{ minHeight: '560px' }}>
        {/* Background image — anak.webp dengan gradasi halus agar warna orange di kanan tetap cerah & hidup */}
        <div className="position-absolute w-100 h-100 top-0 start-0">
          <Image 
            src="/anak.webp" 
            alt="Pemandangan Desa Bojong" 
            fill 
            className="object-fit-cover object-center"
            priority
          />
          {/* Subtle directional vignette: gelap lembut di sisi teks kiri, sangat transparan di kanan agar warna orange anak.webp bersinar indah */}
          <div 
            className="position-absolute w-100 h-100 top-0 start-0" 
            style={{ 
              background: 'linear-gradient(90deg, rgba(15, 23, 42, 0.88) 0%, rgba(15, 23, 42, 0.65) 45%, rgba(15, 23, 42, 0.15) 80%, rgba(0, 0, 0, 0.05) 100%)' 
            }}
          ></div>
        </div>

        <div className="container position-relative z-1 py-4 py-md-5">
          <div className="row align-items-center justify-content-between g-5">
            {/* Sisi Teks Kiri — Font Inter lembut & elegan sama dengan Hero */}
            <div className="col-lg-5 text-white fade-in-left">
              {/* Badge */}
              <div 
                className="d-inline-flex align-items-center gap-2 px-3 py-1.5 rounded-pill mb-3"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.1)', 
                  backdropFilter: 'blur(8px)', 
                  border: '1px solid rgba(255, 255, 255, 0.18)' 
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fbbf24' }}></div>
                <span className="text-white small fw-normal" style={{ letterSpacing: '0.5px' }}>
                  Statistik & Wilayah
                </span>
              </div>

              {/* Title serasi dengan Selamat Datang di Desa Bojong */}
              <h2 className="text-white mb-3" style={{ fontWeight: 700, fontSize: 'clamp(2.2rem, 4.5vw, 3.4rem)', lineHeight: '1.15', letterSpacing: '-0.5px' }}>
                Bojong <span style={{ color: '#fbbf24' }}>Desaku</span>
              </h2>

              <p className="text-white text-opacity-85 mb-4 fs-5" style={{ maxWidth: '440px', lineHeight: '1.65', fontWeight: 400 }}>
                Desa mandiri berlandaskan kearifan lokal, potensi sumber daya alam yang lestari, dan semangat kebersamaan masyarakat yang harmonis.
              </p>

              <div>
                <a 
                  href="/profil-desa/demografi" 
                  className="btn rounded-pill px-4 py-2.5 fw-medium text-white d-inline-flex align-items-center gap-2 text-decoration-none shadow-sm"
                  style={{ 
                    backgroundColor: '#2c5282', 
                    borderColor: '#2c5282',
                    transition: 'all 0.3s ease' 
                  }}
                >
                  <span>Data Demografi</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>

            {/* Sisi Card Kanan — Gap lebih jauh, desain minimalis modern ultra-transparan agar latar oranye tetap terlihat utuh */}
            <div className="col-lg-6 ps-lg-4">
              <div className="row g-3 g-md-4">
                {[
                  { label: "Total Penduduk", val: "4.523", icon: Users, desc: "Jiwa", color: "#fbbf24" },
                  { label: "Kepala Keluarga", val: "1.150", icon: Home, desc: "KK", color: "#38bdf8" },
                  { label: "Laki-laki", val: "2.276", icon: User, desc: "Jiwa", color: "#60a5fa" },
                  { label: "Perempuan", val: "2.247", icon: UserCircle, desc: "Jiwa", color: "#f472b6" },
                ].map((stat, i) => (
                  <div className="col-6 scale-in" key={i}>
                    <div 
                      className="p-3 p-md-4 rounded-4 h-100 transition-all d-flex flex-column justify-content-between"
                      style={{ 
                        background: 'rgba(15, 23, 42, 0.35)', 
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.25)',
                        transition: 'transform 0.3s ease, border-color 0.3s ease, background 0.3s ease'
                      }}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <span className="small text-white text-opacity-80 fw-medium" style={{ letterSpacing: '0.3px', fontSize: '0.8rem' }}>
                          {stat.label}
                        </span>
                        <div 
                          className="d-flex align-items-center justify-content-center rounded-circle"
                          style={{ 
                            width: '36px', 
                            height: '36px', 
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: stat.color 
                          }}
                        >
                          <stat.icon size={18} strokeWidth={2} />
                        </div>
                      </div>

                      <div>
                        <div className="d-flex align-items-baseline gap-1.5 mt-1">
                          <span className="display-6 fw-bold text-white mb-0" style={{ letterSpacing: '-0.5px' }}>
                            {stat.val}
                          </span>
                          <span className="small fw-normal text-white text-opacity-70 ms-1" style={{ fontSize: '0.85rem' }}>
                            {stat.desc}
                          </span>
                        </div>
                      </div>
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
              { name: "Gatot Madiyo", role: "Kepala Desa Bojong", img: "/gatot.webp" },
              { name: "Yatmin", role: "Sekretaris Desa", img: "/yatmin.webp" },
              { name: "Endang Suyamti", role: "Kepala Urusan Keuangan", img: "/endang.webp" },
              { name: "Sutarno", role: "Kepala Seksi Pemerintahan", img: "/sutarno.webp" },
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
                   <Link 
                     href="/berita/musrenbangdes-tahun-2026" 
                     className="card border-0 shadow-sm mb-4 text-decoration-none overflow-hidden group"
                   >
                     <div className="position-relative" style={{ height: '400px' }}>
                        <Image 
                          src="/musren.webp" 
                          alt="Musrengbangdes 2026" 
                          fill 
                          className="object-fit-cover object-top"
                        />
                        <div className="position-absolute bottom-0 start-0 w-100 p-4 text-white" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.85))' }}>
                           <div className="d-flex gap-2 mb-2">
                             <span className="badge bg-warning text-dark">{newsData[activeNewsTab].featured.category}</span>
                             <span className="badge bg-danger d-flex align-items-center gap-1"><Star size={10} /> Terpopuler</span>
                           </div>
                           <h2 className="fw-bold h3 text-white">{newsData[activeNewsTab].featured.title}</h2>
                           <p className="mb-0 small opacity-75">{newsData[activeNewsTab].featured.date} | Oleh {newsData[activeNewsTab].featured.author}</p>
                        </div>
                     </div>
                   </Link>

                   {/* List Items with category badges */}
                   <div className="list-group list-group-flush">
                     {newsData[activeNewsTab].list.map((item, i) => (
                       <Link 
                         href="/berita" 
                         key={i} 
                         className="list-group-item list-group-item-action py-3 d-flex gap-3 align-items-start border-bottom"
                       >
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
                       </Link>
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
      {/* 9. BAND STATISTIK DATA DESA                                  */}
      {/* ============================================================ */}
      <section className="py-5 text-white" style={{ background: 'linear-gradient(to right, #0f172a, #1e293b)' }}>
        <div className="container">
           {/* Stats Row */}
           <div className="row g-5 text-center">
              {[
                { label: "Berita Desa", val: `${newsCount}`, href: "/berita" },
                { label: "UMKM Terdaftar", val: "5", href: "/potensi-desa/umkm" },
                { label: "Kategori Pengaduan", val: "7", href: "/layanan-warga/pengaduan" },
                { label: "Kegiatan KKN", val: "11", href: "/berita" }
              ].map((stat, i) => (
                <div className="col-6 col-md-3 position-relative" key={i}>
                   <a href={stat.href} className="text-decoration-none text-white d-block group">
                     <div className="display-4 fw-bold mb-2 text-warning transition-transform group-hover-scale" style={{ letterSpacing: '-1px' }}>
                       {stat.val}
                     </div>
                     <div className="text-uppercase tracking-wider small opacity-75 fw-medium">
                       {stat.label}
                     </div>
                   </a>
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


    </main>
  );
}
