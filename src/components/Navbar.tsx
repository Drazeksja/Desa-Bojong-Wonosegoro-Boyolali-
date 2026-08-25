'use client';

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);
  

  
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === '/';
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const navLinks = [
    { name: "Beranda", href: "/" },
    { 
      name: "Profil Desa", 
      href: "#", 
      dropdown: [
        { name: "Sejarah", href: "/profil-desa/sejarah" },
        { name: "Visi & Misi", href: "/profil-desa/visi-misi" },
        { name: "Geografis", href: "/profil-desa/geografis" },
        { name: "Kesehatan", href: "/profil-desa/kesehatan" },
        { name: "Sarana & Prasarana", href: "/profil-desa/sarana-prasarana" }
      ]
    },
    { 
      name: "Pemerintahan", 
      href: "/pemerintahan/perangkat-desa"
    },
    { 
      name: "Layanan Warga", 
      href: "#",
      dropdown: [
        { name: "Surat Keterangan", href: "/layanan-warga/surat" },
        { name: "Pengaduan", href: "/layanan-warga/pengaduan" }
      ]
    },
    { 
      name: "Informasi Publik", 
      href: "#",
      dropdown: [
        { name: "APBDes", href: "/informasi-publik/apbdes" },
        { name: "Realisasi APBDes", href: "/informasi-publik/realisasi-apbdes" }
      ]
    },
    { name: "Berita", href: "/berita" },
    { 
      name: "Potensi Desa", 
      href: "#",
      dropdown: [
        { name: "UMKM", href: "/potensi-desa/umkm" },
        { name: "Galeri", href: "/potensi-desa/galeri" }
      ]
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/berita?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Set initial state
    handleScroll();
    
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
    };
  }, []);

  const navbarSolid = !isHome || isScrolled;

  return (
    <nav ref={navRef} className={`navbar navbar-dark navbar-expand-lg fixed-top transition-all ${navbarSolid ? 'shadow-sm py-2 navbar-scrolled' : 'bg-transparent py-4 navbar-transparent'} ${isMobileMenuOpen ? 'navbar-mobile-open' : ''}`} 
         style={navbarSolid || isMobileMenuOpen ? { backgroundColor: 'var(--navbar-bg-solid)' } : { background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)' }}>
      <div className="container-fluid px-4 px-xl-5 d-flex justify-content-between align-items-center">
        <a className="navbar-brand d-flex align-items-center gap-3 text-white" href="/">
          <div className="position-relative rounded-circle overflow-hidden" 
               style={{ width: '45px', height: '45px', background: 'white' }}>
            <Image src="/logo.jpeg" alt="Logo Desa Bojong" fill className="object-fit-contain p-1" priority />
          </div>
          <div className="d-flex flex-column lh-1 navbar-brand-text text-white">
            <span className="fw-bold text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>Pemerintah Desa</span>
            <span className="fw-black text-uppercase" style={{ fontSize: '1.2rem', fontWeight: 900, letterSpacing: '2px' }}>Bojong</span>
          </div>
        </a>
        
        <button className="navbar-toggler" type="button" onClick={() => { setIsMobileMenuOpen(!isMobileMenuOpen); setOpenDropdown(null); }}>
          <span className={`navbar-toggler-icon ${!navbarSolid && !isMobileMenuOpen ? 'filter-white' : ''}`}></span>
        </button>

        <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''} w-100`}>
          <ul className="navbar-nav mx-auto gap-3 gap-xl-4 align-items-lg-center">
            {navLinks.map((link, idx) => (
              <li 
                className={`nav-item ${link.dropdown ? 'dropdown custom-dropdown' : ''}`} 
                key={idx}
                onMouseEnter={() => {
                  if (link.dropdown) {
                    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                    setOpenDropdown(idx);
                  }
                }}
                onMouseLeave={() => {
                  if (link.dropdown) {
                    dropdownTimeoutRef.current = setTimeout(() => setOpenDropdown(null), 200);
                  }
                }}
              >
                {link.dropdown ? (
                  <>
                    <button 
                      type="button"
                      className="nav-link dropdown-toggle custom-nav-link px-2 py-2 border-0 bg-transparent text-white" 
                      onClick={() => setOpenDropdown(openDropdown === idx ? null : idx)}
                    >
                      {link.name}
                    </button>
                    <ul className={`dropdown-menu shadow-lg border-0 custom-dropdown-menu ${openDropdown === idx ? 'show' : ''}`}>
                      {link.dropdown.map((subItem, subIdx) => (
                        <li key={subIdx}>
                          <a 
                            href={subItem.href} 
                            className="dropdown-item small py-2 custom-dropdown-item"
                            onClick={() => { setOpenDropdown(null); setIsMobileMenuOpen(false); }}
                          >
                            {subItem.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <a 
                    className="nav-link custom-nav-link px-2 py-2 text-white" 
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center ms-lg-auto mt-3 mt-lg-0">
            {isSearchOpen && (
              <form onSubmit={handleSearch} className="me-2" style={{ animation: 'fadeIn 0.3s' }}>
                <input 
                  type="text" 
                  className="form-control rounded-pill px-3 py-1" 
                  placeholder="Cari informasi..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{ width: '180px', fontSize: '0.85rem', borderColor: 'var(--primary)' }}
                />
              </form>
            )}
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="btn rounded-circle p-2 search-btn text-white d-flex align-items-center justify-content-center"
              aria-label="Search"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={18} />}
            </button>

          </div>
        </div>
      </div>
    </nav>
  );
}
