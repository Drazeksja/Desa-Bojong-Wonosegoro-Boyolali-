'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Calendar, 
  User, 
  ArrowLeft, 
  Share2, 
  Clock, 
  ChevronRight,
  Eye,
  Tag
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface NewsDetail {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  status: string;
  views: number;
  created_at: string;
  published_at: string;
}

const DEFAULT_FALLBACKS: Record<string, NewsDetail> = {
  'musrenbangdes-tahun-2026': {
    id: 'demo-1',
    title: 'Musrenbangdes Tahun 2026: Penetapan RKPDes untuk Kemajuan Desa Bojong',
    slug: 'musrenbangdes-tahun-2026',
    category: 'Pemerintahan',
    excerpt: 'Pemerintah Desa Bojong sukses menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) penetapan RKPDes 2026 bersama BPD dan tokoh masyarakat.',
    content: `Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) tahun anggaran 2026 di Desa Bojong telah sukses dilaksanakan bertempat di Balai Desa Bojong. Kegiatan krusial ini dihadiri oleh Kepala Desa Bojong, seluruh jajaran perangkat desa, Badan Permusyawaratan Desa (BPD), Ketua RT dan RW se-Desa Bojong, Tokoh Agama, Tokoh Masyarakat, serta perwakilan generasi muda Karang Taruna.

Dalam musyawarah tersebut, dibahas dan disepakati sejumlah usulan prioritas pembangunan di berbagai sektor vital, meliputi:
1. Pembangunan dan perbaikan infrastruktur jalan rabat beton dan drainase saluran irigasi pertanian guna mendukung mobilitas warga dan ketahanan pangan desa.
2. Pemberdayaan ekonomi produktif masyarakat desa melalui penguatan modal dan pembinaan kelompok tani serta pelaku UMKM lokal Desa Bojong.
3. Peningkatan kualitas pelayanan kesehatan dasar masyarakat melalui dukungan pos kesehatan Posyandu dan Posbindu di setiap dukuh.
4. Program sanitasi lingkungan dan peningkatan kesadaran PHBS (Perilaku Hidup Bersih dan Sehat) untuk pencegahan stunting.

Kepala Desa Bojong menegaskan bahwa partisipasi aktif dan keterbukaan seluruh lapisan masyarakat merupakan kunci utama keberhasilan pelaksanaan pembangunan desa. Dengan adanya transparansi dan kolaborasi yang solid, diharapkan seluruh program kerja tahun 2026 dapat terealisasi secara maksimal demi kesejahteraan seluruh warga Desa Bojong.`,
    featured_image: '/musren.webp',
    author: 'Pemerintah Desa Bojong',
    status: 'terbit',
    views: 189,
    created_at: '2026-08-10T10:00:00Z',
    published_at: '2026-08-10T10:00:00Z'
  },
  'pemberdayaan-umkm-desa-bojong': {
    id: 'demo-2',
    title: 'Pemberdayaan UMKM Kripik & Jamu Tradisional Khas Desa Bojong',
    slug: 'pemberdayaan-umkm-desa-bojong',
    category: 'Potensi Desa',
    excerpt: 'Program pendampingan dan promosi produk unggulan lokal desa guna memperluas jangkauan pasar para pelaku usaha mikro di Bojong.',
    content: `Desa Bojong menyimpan beragam potensi produk lokal unggulan yang memiliki daya saing tinggi. Produk-produk seperti olahan kripik singkong gurih, kripik pisang aneka rasa, hingga racikan jamu tradisional berbahan herbal alami telah menjadi mata pencaharian andalan bagi banyak keluarga di Bojong.

Pemerintah Desa Bojong bersama tim pendamping terus mendorong peningkatan kapasitas pelaku UMKM melalui bimbingan teknis pengemasan produk yang higienis dan menarik, pengurusan legalitas izin P-IRT, serta digitalisasi pemasaran melalui katalog online website desa.

Melalui program pemberdayaan ini, diharapkan para pelaku usaha mikro Desa Bojong mampu memperluas pangsa pasar ke luar kecamatan dan kabupaten, sehingga dapat meningkatkan taraf perekonomian masyarakat secara berkelanjutan.`,
    featured_image: '/kripik.jpeg',
    author: 'Tim Penggerak UMKM',
    status: 'terbit',
    views: 132,
    created_at: '2026-08-08T09:00:00Z',
    published_at: '2026-08-08T09:00:00Z'
  },
  'penyuluhan-phbs-desa-bojong': {
    id: 'demo-3',
    title: 'Penyuluhan Perilaku Hidup Bersih & Sehat (PHBS) di Balai Desa Bojong',
    slug: 'penyuluhan-phbs-desa-bojong',
    category: 'Kesehatan',
    excerpt: 'Bidan desa dan kader kesehatan memberikan edukasi komprehensif mengenai 4 pilar PHBS, pencegahan stunting, dan sanitasi keluarga.',
    content: `Dalam rangka meningkatkan derajat kesehatan masyarakat dan mencegah terjadinya kasus stunting, Tim Penggerak PKK dan Kader Kesehatan Desa Bojong yang didampingi oleh Bidan Desa menyelenggarakan sosialisasi PHBS (Perilaku Hidup Bersih dan Sehat).

Kegiatan ini memfokuskan edukasi pada 4 pilar utama:
1. Pencegahan penyakit menular dan penyehatan lingkungan, termasuk kebiasaan mencuci tangan memakai sabun pada air mengalir dan pemberantasan sarang nyamuk (PSN 3M Plus).
2. Pemeliharaan kesehatan ibu, bayi, dan balita, mulai dari pemeriksaan kehamilan rutin (ANC), persalinan di fasilitas kesehatan, pemberian ASI eksklusif, hingga penimbangan berkala di Posyandu.
3. Pemenuhan gizi seimbang dengan panduan Isi Piringku dan konsumsi air minum yang telah dimasak matang.
4. Pemanfaatan fasilitas pelayanan kesehatan seperti Polindes dan Puskesmas secara aktif.

Masyarakat yang hadir terlihat sangat antusias, terutama saat sesi tanya jawab mengenai pola asuh anak dan pencegahan anemia pada ibu hamil dan remaja putri.`,
    featured_image: '/anak.webp',
    author: 'Kader Posyandu Bojong',
    status: 'terbit',
    views: 104,
    created_at: '2026-08-05T08:30:00Z',
    published_at: '2026-08-05T08:30:00Z'
  },
  'kerja-bakti-massal-hut-ri': {
    id: 'demo-4',
    title: 'Kerja Bakti Massal Sambut HUT RI di Lingkungan RT/RW Desa Bojong',
    slug: 'kerja-bakti-massal-hut-ri',
    category: 'Kegiatan Warga',
    excerpt: 'Warga antusias membersihkan jalan desa, saluran drainase, serta memasang umbul-umbul merah putih menyemarakkan kemerdekaan.',
    content: `Menyambut Hari Kemerdekaan Republik Indonesia, seluruh warga di wilayah RT dan RW Desa Bojong secara serentak melaksanakan kerja bakti massal membersihkan lingkungan.

Gotong royong dimulai sejak pagi hari dengan fokus pembersihan saluran drainase pinggir jalan utama guna menghindari genangan air, perapian dahan pepohonan yang mengganggu kabel listrik, serta pemasangan bendera dan umbul-umbul merah putih di sepanjang jalan protokol desa.

Semangat kebersamaan yang terjalin erat ini menjadi cerminan nyata kerukunan dan kekompakan warga Desa Bojong dalam melestarikan tradisi luhur gotong royong warisan para leluhur.`,
    featured_image: '/bg.webp',
    author: 'Karang Taruna Bojong',
    status: 'terbit',
    views: 118,
    created_at: '2026-08-01T07:00:00Z',
    published_at: '2026-08-01T07:00:00Z'
  }
};

export default function DetailBeritaPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const router = useRouter();

  const [article, setArticle] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        // Cek dari Supabase
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .or(`slug.eq.${slug},id.eq.${slug}`)
          .single();

        if (!error && data) {
          setArticle(data as NewsDetail);
        } else if (DEFAULT_FALLBACKS[slug]) {
          setArticle(DEFAULT_FALLBACKS[slug]);
        } else {
          // Cari substring di fallbacks
          const found = Object.values(DEFAULT_FALLBACKS).find(
            (item) => item.slug === slug || item.id === slug || slug.includes(item.slug)
          );
          setArticle(found || DEFAULT_FALLBACKS['musrenbangdes-tahun-2026']);
        }
      } catch (err) {
        setArticle(DEFAULT_FALLBACKS[slug] || DEFAULT_FALLBACKS['musrenbangdes-tahun-2026']);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      return new Date(dateStr).toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <main className="bg-white min-vh-100 py-5 d-flex align-items-center justify-content-center">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="text-muted small mt-2">Memuat naskah berita...</p>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="bg-white min-vh-100 py-5">
        <div className="container mt-5 pt-5 text-center" style={{ maxWidth: '600px' }}>
          <h3 className="fw-bold">Berita Tidak Ditemukan</h3>
          <p className="text-muted">Halaman berita yang Anda tuju tidak tersedia atau telah diarsipkan.</p>
          <Link href="/berita" className="btn btn-primary rounded-pill px-4">
            Kembali ke Indeks Berita
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-vh-100 pb-5 pt-5">
      <div className="container mt-5 pt-4" style={{ maxWidth: '860px' }}>
        
        {/* Breadcrumb & Navigasi Kembali */}
        <div className="d-flex align-items-center justify-content-between mb-4 pb-2 border-bottom">
          <Link href="/berita" className="text-decoration-none small fw-semibold text-muted d-inline-flex align-items-center gap-1.5 hover-primary">
            <ArrowLeft size={16} />
            <span>Semua Berita Desa</span>
          </Link>

          <span className="badge rounded-pill fw-bold px-3 py-1.5" style={{ backgroundColor: 'rgba(44, 82, 130, 0.1)', color: '#2c5282' }}>
            {article.category}
          </span>
        </div>

        {/* Judul Artikel */}
        <h1 className="display-6 fw-bold mb-3" style={{ color: '#0f172a', fontFamily: 'serif', lineHeight: 1.35 }}>
          {article.title}
        </h1>

        {/* Metadata Bar */}
        <div className="d-flex flex-wrap align-items-center gap-3 text-muted small pb-3 mb-4 border-bottom" style={{ fontSize: '0.82rem' }}>
          <div className="d-flex align-items-center gap-1.5">
            <User size={15} className="text-primary" />
            <span className="fw-medium text-dark">{article.author || 'Pemerintah Desa Bojong'}</span>
          </div>
          <span>&bull;</span>
          <div className="d-flex align-items-center gap-1.5">
            <Calendar size={15} />
            <span>{formatDate(article.created_at || article.published_at)}</span>
          </div>
        </div>

        {/* Gambar Utama */}
        {article.featured_image && (
          <div className="position-relative w-100 rounded-4 overflow-hidden mb-4 shadow-sm" style={{ height: '380px', backgroundColor: '#f1f5f9' }}>
            <Image
              src={article.featured_image}
              alt={article.title}
              fill
              className="object-fit-cover"
              sizes="(max-width: 860px) 100vw, 860px"
              priority
            />
          </div>
        )}

        {/* Excerpt Highlight Box */}
        {article.excerpt && (
          <div className="p-3.5 px-4 mb-4 rounded-3 border-start border-4" style={{ backgroundColor: '#f8fafc', borderColor: '#2c5282' }}>
            <p className="fw-medium text-muted fst-italic mb-0" style={{ lineHeight: 1.7, fontSize: '0.95rem' }}>
              &ldquo;{article.excerpt}&rdquo;
            </p>
          </div>
        )}

        {/* Konten Isi Berita */}
        <div className="article-body text-dark" style={{ lineHeight: 1.9, fontSize: '1.02rem', textAlign: 'justify' }}>
          {article.content ? (
            article.content.split('\n\n').map((para, i) => (
              <p key={i} className="mb-4">
                {para}
              </p>
            ))
          ) : (
            <p>{article.excerpt}</p>
          )}
        </div>

        {/* Footer Artikel */}
        <div className="mt-5 pt-4 border-top d-flex flex-wrap align-items-center justify-content-between gap-3">
          <div className="d-flex align-items-center gap-2">
            <Tag size={16} className="text-muted" />
            <span className="small text-muted">Kategori: <strong>{article.category}</strong></span>
          </div>

          <Link href="/berita" className="btn fw-semibold rounded-pill px-4 text-white shadow-sm" style={{ background: '#2c5282', fontSize: '0.85rem' }}>
            Lihat Berita Lainnya
          </Link>
        </div>

      </div>
    </main>
  );
}
