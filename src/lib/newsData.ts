export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  featured_image: string | null;
  author: string;
  status: string;
  is_featured: boolean;
  views: number;
  created_at: string;
  published_at: string | null;
  location?: string | null;
}

export const DEFAULT_NEWS: NewsArticle[] = [
  {
    id: "demo-1",
    title: "Musrenbangdes Tahun 2026: Penetapan RKPDes untuk Kemajuan Desa Bojong",
    slug: "musrenbangdes-tahun-2026",
    category: "Pemerintahan",
    excerpt:
      "Pemerintah Desa Bojong sukses menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) penetapan RKPDes 2026 bersama BPD dan tokoh masyarakat.",
    content: `Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) tahun 2026 di Desa Bojong telah sukses dilaksanakan di Balai Desa Bojong. Kegiatan penting ini dihadiri oleh Kepala Desa Bojong, seluruh perangkat desa, Badan Permusyawaratan Desa (BPD), Ketua RT/RW, Tokoh Agama, Tokoh Masyarakat, perwakilan perempuan, serta Karang Taruna.

Dalam musyawarah ini, dibahas berbagai usulan prioritas pembangunan di bidang infrastruktur jalan pertanian, pemberdayaan ekonomi masyarakat melalui kelompok tani dan UMKM, serta peningkatan sarana kesehatan desa seperti Posyandu dan Posbindu.

Kepala Desa Bojong menegaskan pentingnya partisipasi aktif seluruh elemen warga dalam mengawal setiap proses perencanaan hingga realisasi anggaran demi kemajuan bersama yang transparan dan akuntabel.

"Perencanaan yang matang dengan melibatkan seluruh unsur masyarakat adalah kunci keberhasilan pembangunan desa yang berkeadilan dan tepat sasaran," ungkap Kepala Desa dalam sambutannya.`,
    featured_image: "/musren.webp",
    author: "Pemerintah Desa Bojong",
    status: "terbit",
    is_featured: true,
    views: 185,
    created_at: "2026-08-10T10:00:00Z",
    published_at: "2026-08-10T10:00:00Z",
    location: "Balai Desa Bojong",
  },
  {
    id: "demo-2",
    title: "Pemberdayaan UMKM Kripik & Jamu Tradisional Khas Desa Bojong",
    slug: "pemberdayaan-umkm-desa-bojong",
    category: "Potensi Desa",
    excerpt:
      "Program pendampingan dan promosi produk unggulan lokal desa guna memperluas jangkauan pasar para pelaku usaha mikro di Bojong.",
    content: `Desa Bojong memiliki potensi UMKM yang sangat menjanjikan, mulai dari olahan kripik singkong, kripik pisang, hingga jamu tradisional yang dibuat dengan resep turun-temurun.

Pemerintah Desa Bojong bekerja sama dengan mahasiswa KKN dan dinas terkait memberikan pendampingan intensif bagi pelaku usaha lokal. Pendampingan meliputi inovasi kemasan modern, perizinan P-IRT & sertifikasi halal, serta strategi pemasaran digital melalui media sosial dan marketplace.

Diharapkan dengan adanya program ini, produk khas Bojong dapat dikenal lebih luas hingga luar daerah Kabupaten Boyolali dan meningkatkan kesejahteraan para perajin lokal.`,
    featured_image: "/kripik.jpeg",
    author: "Tim Penggerak UMKM",
    status: "terbit",
    is_featured: false,
    views: 124,
    created_at: "2026-08-08T09:00:00Z",
    published_at: "2026-08-08T09:00:00Z",
    location: "Dusun Krajan, Desa Bojong",
  },
  {
    id: "demo-3",
    title: "Penyuluhan Perilaku Hidup Bersih & Sehat di Desa Bojong",
    slug: "penyuluhan-phbs-desa-bojong",
    category: "Kesehatan",
    excerpt:
      "Bidan desa dan kader kesehatan memberikan edukasi mengenai perilaku hidup bersih dan sehat kepada masyarakat Desa Bojong.",
    content: `Sebagai upaya mewujudkan masyarakat yang sehat dan bebas dari stunting, Kader Kesehatan Desa Bojong bersama Bidan Desa menyelenggarakan kegiatan edukasi PHBS (Perilaku Hidup Bersih dan Sehat).

Kegiatan mencakup demonstrasi cuci tangan 6 langkah menggunakan sabun, pentingnya pengelolaan sampah rumah tangga, sanitasi air bersih, serta pemenuhan gizi seimbang untuk balita dan lansia.

Warga menyambut baik penyuluhan ini dan berkomitmen untuk menerapkannya dalam kehidupan sehari-hari di lingkungan masing-masing.`,
    featured_image: "/anak.webp",
    author: "Kader Posyandu Bojong",
    status: "terbit",
    is_featured: false,
    views: 98,
    created_at: "2026-08-05T08:30:00Z",
    published_at: "2026-08-05T08:30:00Z",
    location: "Poskesdes Desa Bojong",
  },
  {
    id: "demo-4",
    title: "Kerja Bakti Massal Sambut HUT RI di Lingkungan Desa Bojong",
    slug: "kerja-bakti-massal-hut-ri",
    category: "Kegiatan Warga",
    excerpt:
      "Warga antusias membersihkan jalan desa, saluran drainase, serta memasang umbul-umbul merah putih.",
    content: `Semangat gotong royong warga Desa Bojong tampak nyata dalam kegiatan kerja bakti bersama menyambut Hari Kemerdekaan Republik Indonesia.

Mulai dari bapak-bapak, pemuda Karang Taruna, hingga ibu-ibu turut ambil bagian membersihkan bahu jalan utama, mengeruk sedimentasi parit irigasi, mengecat gapura masuk dusun, dan memasang bendera merah putih.

Kegiatan diakhiri dengan makan tumpeng bersama sebagai wujud rasa syukur dan kebersamaan antarwarga.`,
    featured_image: "/bg.webp",
    author: "Karang Taruna Bojong",
    status: "terbit",
    is_featured: false,
    views: 110,
    created_at: "2026-08-01T07:00:00Z",
    published_at: "2026-08-01T07:00:00Z",
    location: "Seluruh Wilayah Desa Bojong",
  },
];
