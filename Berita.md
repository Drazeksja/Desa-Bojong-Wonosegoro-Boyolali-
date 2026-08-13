# Konsep Fitur Berita Desa — CMS CRUD + Supabase

## 1. Konsep Umum

Fitur **Berita** dibuat sebagai **CMS berita desa** yang memungkinkan admin:

- menambah berita
- melihat daftar berita
- mengedit berita
- menghapus berita
- menyimpan berita sebagai draft
- menerbitkan berita
- menentukan berita unggulan

Data berita disimpan di **Supabase Database**, sedangkan gambar berita disimpan di **Supabase Storage**.

Desain tetap mengikuti identitas utama website Desa Bojong:

- formal
- tegas
- konservatif
- administratif
- sederhana
- profesional
- tidak terasa seperti dashboard SaaS
- tidak menggunakan gaya AI generik

---

# 2. Struktur Data Berita

| Field | Fungsi |
|---|---|
| `id` | ID berita |
| `judul` | Judul berita |
| `slug` | URL berita |
| `kategori` | Kategori berita |
| `gambar_utama` | Foto utama berita |
| `ringkasan` | Cuplikan singkat berita |
| `isi` | Isi berita lengkap |
| `penulis` | Nama penulis/admin |
| `tanggal_publikasi` | Tanggal dan waktu publikasi |
| `lokasi` | Lokasi kegiatan/peristiwa |
| `status` | Draft / Terbit / Arsip |
| `featured` | Penanda berita unggulan |
| `views` | Jumlah kunjungan |
| `created_at` | Waktu pembuatan |
| `updated_at` | Waktu terakhir diubah |

Database boleh memiliki banyak field, tetapi **card publik tidak perlu menampilkan semuanya**.

---

# 3. CRUD Admin

## Halaman Daftar Berita

Judul halaman:

**BERITA DESA**

Tombol utama:

`+ TAMBAH BERITA`

Daftar berita ditampilkan sebagai tabel administratif:

| No | Judul | Kategori | Penulis | Tanggal | Status | Aksi |
|---:|---|---|---|---|---|---|
| 01 | Musyawarah Desa Tahun 2026 | Pemerintahan | Admin Desa | 12 Agu 2026 | Terbit | Edit |
| 02 | Kegiatan Posyandu Desa Bojong | Kesehatan | Admin Desa | 10 Agu 2026 | Terbit | Edit |
| 03 | Pembangunan Jalan Dusun | Infrastruktur | Admin Desa | - | Draft | Edit |

Aksi yang tersedia:

- Lihat
- Edit
- Hapus

Tambahkan:

- pencarian berita
- filter kategori
- filter status
- pagination jika jumlah berita sudah banyak

---

# 4. Form Tambah / Edit Berita

## INFORMASI BERITA

### Judul Berita

Input satu baris.

Contoh:

> Pemdes Bojong Gelar Musyawarah Desa untuk Penyusunan Program Tahun 2026

### Slug

Otomatis dibuat dari judul.

Contoh:

`pemdes-bojong-gelar-musyawarah-desa-penyusunan-program-2026`

Admin tetap dapat mengedit jika diperlukan.

### Kategori

Dropdown:

- Pemerintahan
- Kegiatan Desa
- Pembangunan
- Sosial
- Kesehatan
- Pendidikan
- Infrastruktur
- Pengumuman
- Lainnya

### Tanggal Publikasi

Date/time picker.

### Penulis

Contoh:

`Admin Desa`

### Lokasi

Contoh:

`Balai Desa Bojong`

---

# 5. Gambar Utama

## GAMBAR UTAMA

Admin dapat upload foto dokumentasi kegiatan.

Rekomendasi:

- rasio sekitar 16:9
- resolusi cukup untuk desktop dan mobile
- foto dokumentasi nyata
- hindari gambar stock yang tidak berhubungan dengan berita

Sistem dapat menampilkan preview sebelum disimpan.

File gambar disimpan di **Supabase Storage**, bukan langsung di row database.

---

# 6. Ringkasan Berita

## RINGKASAN

Textarea singkat untuk menjadi cuplikan pada halaman daftar/card.

Contoh:

> Pemerintah Desa Bojong melaksanakan musyawarah desa untuk membahas penyusunan program pembangunan dan kegiatan desa tahun 2026.

Ringkasan sebaiknya dibatasi sekitar 200–250 karakter agar konsisten pada card.

---

# 7. Isi Berita

## ISI BERITA

Gunakan rich text editor agar admin tidak perlu menulis HTML.

Fitur yang cocok:

- Bold
- Italic
- Heading
- Link
- Quote
- Ordered List
- Unordered List
- Image
- Alignment

Contoh struktur artikel:

### Judul / Pembuka

Paragraf pembuka menjelaskan inti kegiatan.

### Isi

Beberapa paragraf yang menjelaskan:

- apa kegiatannya
- kapan kegiatan berlangsung
- siapa yang hadir
- apa hasil atau tujuan kegiatan

### Penutup

Kesimpulan atau informasi lanjutan.

---

# 8. Status Publikasi

Admin dapat memilih:

`DRAFT`

atau

`TERBIT`

Opsional:

`ARSIP`

Fungsi:

### Draft
Berita tersimpan tetapi belum tampil di website publik.

### Terbit
Berita tampil di website publik.

### Arsip
Berita tidak lagi menjadi berita aktif tetapi masih tersimpan.

Tombol:

`SIMPAN DRAFT`

`TERBITKAN BERITA`

---

# 9. Berita Unggulan

Tambahkan pilihan:

`[ ] Jadikan berita unggulan`

Jika aktif, berita dapat muncul pada bagian paling atas halaman Berita.

Jangan terlalu banyak berita diberi status unggulan. Idealnya satu berita utama atau beberapa berita terpilih saja.

---

# 10. Bentuk Card Berita Publik

Pola card menggunakan elemen yang umum pada portal berita: **foto, kategori, judul, waktu/tanggal, dan identitas penulis/sumber**.

Struktur card:

```text
[FOTO BERITA]

PEMERINTAHAN

Pemdes Bojong Gelar Musyawarah Desa
untuk Penyusunan Program Tahun 2026

12 Agustus 2026 · Admin Desa

BACA BERITA →
```

Elemen utama card:

1. Foto utama
2. Kategori
3. Judul
4. Tanggal publikasi
5. Penulis
6. Link menuju berita lengkap

Tidak perlu memasukkan terlalu banyak informasi ke dalam card.

---

# 11. Berita Utama

Bagian paling atas halaman Berita dapat memiliki satu berita unggulan.

Format:

## BERITA UTAMA

`[ FOTO BESAR ]`

### Pemdes Bojong Gelar Musyawarah Desa untuk Penyusunan Program Tahun 2026

`PEMERINTAHAN · 12 AGUSTUS 2026`

Ringkasan singkat berita.

`BACA SELENGKAPNYA →`

Berita lainnya ditempatkan setelah berita utama.

Struktur:

```text
BERITA
│
├── Berita Utama
│
├── Berita Terbaru
│   ├── Card
│   ├── Card
│   ├── Card
│   └── Card
│
└── Semua Berita
```

---

# 12. Metadata Card

Metadata card dapat menggunakan format sederhana:

**12 Agustus 2026 · Admin Desa**

Alternatif jika lokasi ingin ditampilkan:

**12 Agustus 2026 · Desa Bojong · Admin Desa**

Jangan menampilkan metadata terlalu banyak.

---

# 13. Halaman Detail Berita

Saat card diklik, buka halaman artikel.

Struktur:

# Pemdes Bojong Gelar Musyawarah Desa untuk Penyusunan Program Tahun 2026

`PEMERINTAHAN`

**12 Agustus 2026 · Admin Desa**  
**Desa Bojong**

`[ FOTO UTAMA ]`

> Ringkasan / lead berita.

Kemudian isi berita lengkap.

Di bagian bawah dapat ditambahkan:

**Diterbitkan oleh Pemerintah Desa Bojong**

Kemudian:

## BERITA LAINNYA

Tampilkan beberapa berita terkait atau berita terbaru.

---

# 14. Kategori Berita

Gunakan kategori yang sederhana dan relevan untuk desa:

- **Pemerintahan**
- **Kegiatan Desa**
- **Pembangunan**
- **Sosial**
- **Kesehatan**
- **Pendidikan**
- **Infrastruktur**
- **Pengumuman**
- **Lainnya**

Jangan membuat kategori terlalu banyak.

---

# 15. Struktur Supabase

Tabel utama:

```text
news
├── id
├── title
├── slug
├── category
├── excerpt
├── content
├── featured_image
├── author
├── location
├── published_at
├── status
├── is_featured
├── views
├── created_at
└── updated_at
```

Disarankan:

- `id` menggunakan UUID
- `slug` dibuat unik
- `status` menggunakan nilai terkontrol
- `published_at` boleh kosong untuk draft
- `is_featured` menggunakan boolean
- `created_at` dan `updated_at` dibuat otomatis

---

# 16. Supabase Storage

Jangan menyimpan file gambar langsung di database.

Gunakan struktur:

```text
Supabase
│
├── Database
│   └── news
│       └── featured_image = path / URL gambar
│
└── Storage
    └── news-images/
        ├── berita-001.jpg
        ├── berita-002.jpg
        └── berita-003.jpg
```

Database hanya menyimpan URL atau path file.

---

# 17. Alur CRUD

```text
ADMIN
  │
  ├── Tambah Berita
  │      ↓
  │   Upload Foto
  │      ↓
  │   Isi Judul, Kategori, Ringkasan, Isi
  │      ↓
  │   Simpan
  │
  ├── Edit Berita
  │      ↓
  │   Update Database
  │
  ├── Hapus Berita
  │      ↓
  │   Delete Database + Image
  │
  └── Publish
         ↓
      Supabase
         ↓
   Website Publik
```

---

# 18. Alur Publik Website

```text
ADMIN
   ↓
Input Berita
   ↓
Supabase Database
   +
Supabase Storage
   ↓
Website Desa
   ↓
Card Berita
   ↓
Halaman Detail Berita
```

Berita yang statusnya `TERBIT` otomatis tersedia di halaman publik.

Berita `DRAFT` tidak ditampilkan kepada pengunjung.

---

# 19. Gaya Visual Admin

Panel admin harus tetap mengikuti gaya utama Desa Bojong.

Gunakan:

- background putih tulang / abu-abu kertas
- navy tua
- cokelat tua
- border tipis
- typography formal
- tabel administratif
- tombol sederhana
- radius kecil
- shadow sangat minim

Hindari:

- gradient
- glassmorphism
- floating cards
- rounded 20–30px
- icon bubble
- warna neon
- dashboard SaaS
- efek glow
- visual AI generik

Bahasa UI sebaiknya:

**BERITA DESA**  
**TAMBAH BERITA**  
**DAFTAR BERITA**  
**STATUS PUBLIKASI**  
**TERBIT**  
**DRAFT**  
**ARSIP**

Bukan:

**Add New Post**  
**Analytics**  
**Engagement**  
**Content Performance**

---

# 20. Gaya Visual Card Publik

Card berita tetap formal dan sederhana.

Contoh:

```text
┌──────────────────────────────────────────┐
│                                          │
│              FOTO BERITA                 │
│                                          │
└──────────────────────────────────────────┘

PEMERINTAHAN

Pemdes Bojong Gelar Musyawarah Desa
untuk Penyusunan Program Tahun 2026

12 Agustus 2026 · Admin Desa

BACA BERITA →
```

Karakter desain:

- foto menjadi elemen visual utama
- judul tegas
- kategori kecil
- metadata sederhana
- border tipis
- sedikit atau tanpa shadow
- tidak menggunakan gradient
- tidak menggunakan badge warna-warni
- sudut tidak terlalu membulat

---

# 21. Prinsip Akhir

Fitur Berita harus terasa sebagai **media informasi resmi Pemerintah Desa Bojong**, bukan blog pribadi dan bukan dashboard SaaS.

Tujuan utamanya:

**Admin memasukkan berita → berita disimpan di Supabase → berita diterbitkan → card otomatis muncul di website → pengunjung membuka artikel lengkap.**

Keseluruhan sistem harus sederhana bagi admin tetapi memiliki struktur database yang cukup kuat untuk berkembang di masa depan.

Konsep besarnya:

> **CMS BERITA DESA BOJONG**
>
> Sistem pengelolaan berita resmi yang sederhana, terstruktur, mudah digunakan, dan tetap mempertahankan karakter visual formal, administratif, dan konservatif dari website Desa Bojong.
