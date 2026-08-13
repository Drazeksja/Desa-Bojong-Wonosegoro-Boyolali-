# SKILLS — Peran & Tanggung Jawab Tim Website Desa Bojong

11 anggota, dibagi 3 kelompok peran: **Fitur Tipe 1** (modul info), **Fitur Tipe 2** (publikasi kegiatan), **Fitur Pendukung/Teknis**.

## Fitur Tipe 1 — Modul Informasi (tab/dropdown, data dari survei & wawancara)

| Nama | Bidang | Modul | Halaman | Narasumber |
|---|---|---|---|---|
| Gede | Akuntansi Perpajakan | Kependudukan & Ekonomi Desa | `/profil-desa/demografi/` | Kaur Pemerintahan, Kaur Keuangan/Kasi Kesra, BPS Kecamatan |
| Dahayu | Keperawatan | Kesehatan & Posyandu | `/layanan-warga/kesehatan-posyandu/` | Bidan desa, kader Posyandu |
| Shinta | Akuntansi | UMKM "Lapak Bojong" | `/potensi-desa/umkm/` | Pak Santo (Gethuk), Bu Turkidjo (Jamu), UMKM baru |
| Maya | Manajemen & Adm. Logistik | Sarana Prasarana | `/profil-desa/sarana-prasarana/` | Kepala Dusun/perangkat desa, observasi lapangan |
| Gina | Hukum | Hukum, Perizinan & Peraturan Desa | `/layanan-warga/hukum-perizinan/`, `/informasi-publik/peraturan-desa/` | OSS/Dinkes, Sekretaris Desa |
| Intan | Sejarah | Sejarah Desa & Pemerintahan | `/profil-desa/sejarah/`, `/pemerintahan/` | Sesepuh/tokoh desa, Sekretaris Desa |

**Skill yang dipakai bersama**: wawancara narasumber, ringkas data jadi poin per tab (bukan esai panjang), dokumentasi foto asli.

## Fitur Tipe 2 — Publikasi Kegiatan (artikel liputan lapangan)

| Nama | Bidang | Kegiatan | Catatan |
|---|---|---|---|
| Nur Khasanah | Agribisnis | Sosialisasi lilin dari minyak jelantah bersama Ibu PKK | Kolaborasi dengan Uswatun (acara sama) |
| Uswatun/Sanah | Fisika | Sosialisasi filterisasi air (demo galon: pasir, kerikil, arang, ijuk) | Bisa 1 artikel gabungan dengan Nur |
| Carles | Bahasa & Kebudayaan Jepang | Plang petunjuk jalan berbahasa Jepang (nilai keselamatan jalan) | Koordinasi titik lokasi dengan perangkat desa |

**Skill yang dipakai**: dokumentasi foto/video before-after, penulisan artikel liputan, koordinasi jadwal kegiatan.

## Fitur Pendukung & Teknis

| Nama | Bidang | Peran |
|---|---|---|
| Zanetta | Ilmu Komunikasi | Fitur mandiri **Pengaduan & Pusat Bantuan Warga** — `/layanan-warga/pengaduan/` (kategori, alur status, SOP) + `/layanan-warga/bantuan-faq/` (agregasi FAQ dari semua modul Fitur Tipe 1 jadi satu portal bantuan) |
| Hafizh | Teknik Komputer | PIC Teknis — bangun Next.js, integrasi konten 10 anggota lain, CRUD Berita & Pengaduan, panel admin, `/kontak/`, deploy |

## Alur Kerja Serah-Terima Konten
1. Tiap pemegang modul (Tipe 1 & 2) mengumpulkan data → tulis dalam poin-poin per tab/bagian → kirim ke Hafizh dalam format dokumen terstruktur (bukan draf naratif panjang).
2. Zanetta menarik FAQ ringkas dari tiap modul Tipe 1 untuk halaman `/bantuan-faq/` — koordinasi dengan pemilik modul masing-masing.
3. Hafizh memasukkan konten ke komponen tab/accordion reusable sesuai `design.md`.
