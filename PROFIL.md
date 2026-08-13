# CONTENT STRUCTURE — Profil Desa

Cakupan dropdown "Profil Desa" sesuai navbar: **Sejarah**, **Visi & Misi**, **Geografis**. Desain (warna/komponen) tetap ikut `design.md` — dokumen ini cuma mendefinisikan struktur & field kontennya supaya rapi dan konsisten saat diisi data asli (bukan draf naratif bebas). Pemilik: **Intan** (lihat `skills.md`).

---

## 1. `/profil-desa/sejarah/` — Sejarah Desa

Pakai komponen **Tab** reusable (3 tab). Tiap tab isinya poin-poin, bukan esai panjang.

**Tab 1 — Asal-Usul Nama Desa**
- Judul singkat (mis. "Dari Mana Nama Bojong Berasal")
- Narasi asal-usul (1–3 paragraf pendek, hasil rangkuman wawancara)
- Kutipan langsung dari sesepuh (opsional, 1 kutipan pendek + nama narasumber)

**Tab 2 — Garis Waktu**
- List kronologis berformat: `Tahun/Periode — Peristiwa singkat`
- Minimal cakup: cikal bakal dusun, perubahan status administratif (jadi desa definitif, pemekaran jika ada), peristiwa penting yang diingat warga
- Tiap entri 1 kalimat, jangan paragraf

**Tab 3 — Tokoh & Sesepuh**
- Kartu per tokoh: nama, peran/jasa singkat, foto (jika diizinkan), 1 kutipan/kenangan singkat
- Urutkan dari yang paling relevan dengan sejarah desa dulu, tokoh masa kini di bawah

**Sumber data**: wawancara sesepuh/tokoh desa, cek arsip desa (buku profil desa lama, monografi) untuk validasi tahun.

---

## 2. `/profil-desa/visi-misi/` — Visi & Misi

Tidak perlu Tab — cukup 1 halaman statis, layout sederhana supaya mudah dibaca sekilas (formal, resmi).

- **Visi**: satu kalimat resmi, ditampilkan besar bergaya kutipan (sesuai dokumen resmi desa/RPJMDes, bukan dikarang sendiri)
- **Misi**: list bernomor (biasanya 5–7 poin), tiap poin 1 kalimat
- **Penjabaran singkat** (opsional, collapsible per poin misi jika ada penjelasan lanjut dari perangkat desa — kalau tidak ada, cukup list saja, jangan dipaksa diisi)
- **Periode berlaku** (mis. "RPJMDes 2025–2031") kalau ada, ditaruh kecil di bawah judul untuk konteks resmi

**Sumber data**: dokumen resmi desa (RPJMDes/Perdes terkait), konfirmasi ke Sekretaris Desa atau Kepala Desa.

---

## 3. `/profil-desa/geografis/` — Geografis

Pakai komponen **Tab** reusable juga (3 tab) — konsisten dengan pola Sejarah, karena kontennya natural terbagi:

**Tab 1 — Letak & Batas Wilayah**
- Posisi administratif (kecamatan, kabupaten, provinsi)
- Batas wilayah 4 arah: Utara / Selatan / Timur / Barat — nama desa/wilayah yang berbatasan
- Peta sederhana (embed atau gambar peta wilayah)

**Tab 2 — Luas & Tata Guna Lahan**
- Luas wilayah total (ha/km²)
- Pembagian penggunaan lahan (pemukiman, sawah/pertanian, kebun, fasilitas umum, dll) — bisa dalam bentuk list persentase atau tabel singkat
- Jumlah dusun/RT/RW (pembagian wilayah administratif internal)

**Tab 3 — Topografi & Iklim**
- Ketinggian (mdpl), kontur (dataran/perbukitan)
- Kondisi iklim umum (curah hujan, suhu rata-rata jika ada datanya)
- Catatan relevan (mis. rawan bencana tertentu, sumber air) — isi kalau datanya tersedia, jangan mengarang

**Sumber data**: profil desa/monografi resmi, Kaur Pemerintahan, cross-check peta wilayah administratif yang sudah dipakai di homepage (lihat `design.md` poin 13).

---

## Catatan Umum
- Semua angka/tahun/nama harus dari data resmi atau hasil wawancara — **jangan isi placeholder dengan angka karangan**, kosongkan dulu bagian yang datanya belum ada sampai dikonfirmasi.
- Format pengiriman ke Hafizh: poin-poin sesuai struktur tab di atas (bukan draf naratif panjang), supaya langsung bisa dimasukkan ke komponen Tab reusable dari Tahap 5 di `execution-prompts.md`.
