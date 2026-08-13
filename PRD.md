# PRD — Website Desa Bojong

## 1. Ringkasan Proyek
Website resmi Desa Bojong, dibangun tim KKN (11 orang) sebagai media informasi, layanan warga, dan promosi potensi desa. Dibangun dengan coding penuh (Next.js), bukan WordPress/CMS instan.

## 2. Tujuan
- Warga bisa mengakses info kependudukan, kesehatan, hukum/perizinan, dan layanan desa tanpa datang ke kantor.
- Perangkat desa punya kanal resmi untuk berita, pengumuman, dan transparansi anggaran (APBDes).
- Mempromosikan UMKM dan potensi desa ke luar (wisatawan, pembeli, calon investor kecil).
- Menyediakan kanal pengaduan warga yang terstruktur.

## 3. Target Pengguna
- Warga Desa Bojong (akses layanan, info kesehatan/hukum, pengaduan)
- Perangkat desa (publikasi berita/pengumuman, transparansi APBDes)
- Pihak luar: wisatawan, pembeli UMKM, peneliti/mahasiswa

## 4. Referensi Struktur & Konten
**Acuan utama layout & warna: portal resmi Kabupaten Demak** (screenshot terlampir). Struktur halaman Beranda mengikuti urutan blok berikut, diadaptasi skala desa:

| Blok Demak (acuan) | Adaptasi Bojong |
|---|---|
| Hero foto landmark + judul sambutan + badge "Portal Resmi" | Hero foto landmark Bojong + judul sambutan + badge "Website Resmi Desa Bojong" |
| Foto Bupati/Wakil + panel "Punya Masalah Layanan Umum" (CTA laporan) | Foto Kepala Desa/perangkat + panel CTA menuju fitur Pengaduan (Zanetta) |
| Tab "Berita Demak / Berita OPD" + daftar berita bertanggal + sidebar Video & Pengumuman | Tab "Berita Desa / Kegiatan" (termasuk kategori Publikasi Kegiatan) + sidebar Pengumuman |
| Grid ikon "Layanan Digital Terintegrasi" (CCTV, WiFi, E-Surat, dst) | Grid ikon layanan desa: Surat Keterangan, Surat Domisili, Unduh Formulir, Pengaduan, dst |
| "Portal Kota Wali" — galeri kartu wisata/budaya | "Potensi Desa Bojong" — galeri kartu wisata, UMKM, budaya lokal |
| Widget Cuaca + widget Pantauan Lalu Lintas (2 kartu berdampingan) | Widget Cuaca Bojong + widget kedua (mis. jam pelayanan kantor desa / kontak darurat) |
| "Link Terkait" — grid logo aplikasi terintegrasi kabupaten | "Link Terkait" — grid ke instansi terkait (kecamatan, dinas terkait, SP4N-LAPOR) |
| Statistik counter (berita, berkas APBD, dst) di band gelap | Statistik counter (berita, UMKM terdaftar, pengaduan selesai, dst) |
| Peta area (Google Maps embed) | Peta wilayah administratif Bojong |
| Footer gelap: identitas, tautan cepat, layanan publik, kontak, statistik pengunjung | Footer serupa, identitas Desa Bojong |

Detail palet warna & tipografi ada di `design.md`.

## 5. Sitemap
```
/ (Beranda)
├── /profil-desa/ → sejarah, visi-misi, geografis, demografi, sarana-prasarana
├── /pemerintahan/ → struktur-organisasi, perangkat-desa, bpd-lpm
├── /layanan-warga/ → kesehatan-posyandu, hukum-perizinan, surat-keterangan,
│                      surat-domisili, unduh-formulir, pengaduan, bantuan-faq
├── /informasi-publik/ → apbdes, realisasi-apbdes, peraturan-desa
├── /berita-kegiatan/ → kategori: Berita, Pengumuman, Agenda, Publikasi Kegiatan
├── /potensi-desa/ → wisata, umkm, galeri
└── /kontak/
```
(Rincian pemilik tiap halaman ada di `skills.md`.)

## 6. Fitur Fungsional Utama
- **Fitur Tipe 1 — Modul info tab/dropdown** per bidang (kependudukan-ekonomi, kesehatan-posyandu, hukum-perizinan, sejarah-pemerintahan, sarpras, UMKM).
- **Fitur Tipe 2 — Publikasi kegiatan**: artikel liputan (jelantah, filterisasi air, plang jalan Jepang), masuk sistem Berita dengan kategori khusus.
- **Fitur Pengaduan**: form + kategori + status (Diterima/Diproses/Selesai).
- **Fitur Bantuan/FAQ terpadu**: agregasi FAQ dari semua modul info.
- **Panel admin sederhana**: CRUD Berita & Pengaduan untuk serah terima ke perangkat desa.

## 7. Tech Stack
- Next.js (App Router) + Tailwind CSS (token warna/tipografi custom, bukan preset default)
- Supabase (data Berita & Pengaduan)
- Deploy: Vercel
- Peta: Google Maps embed (statis, bukan API interaktif kompleks)

## 8. Non-Fungsional
- Mobile-first (mayoritas warga akses dari HP)
- Ringan (foto dioptimasi, hindari library berat yang tidak perlu)
- Struktur SEO dasar (title/meta per halaman) supaya termuat di pencarian "Desa Bojong"

## 9. Di Luar Cakupan (batch ini)
- Integrasi API APBDes real-time ke Siskeudes (isi manual/CMS sederhana dulu)
- Live CCTV/lalu lintas (tidak relevan skala desa)
- Login warga / akun personal (pengaduan tanpa akun dulu)
