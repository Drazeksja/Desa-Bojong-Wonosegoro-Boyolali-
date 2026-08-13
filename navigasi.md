Menu navbar dari Profil Desa sampai Potensi Desa sudah punya folder & page.tsx di /src/app,
tapi waktu diklik tidak menuju ke halaman yang dituju (cuma seperti diklik doang, tidak navigasi).
Ini kemungkinan besar bukan soal file belum ada, tapi soal komponen menu/dropdown-nya yang
salah wiring. Tolong urut cek dan perbaiki:

1. Buka komponen Navbar (dan komponen dropdown-nya kalau terpisah, cek juga Tabs.tsx kalau
   dipakai untuk dropdown menu, bukan cuma untuk tab konten). Pastikan setiap item menu
   memakai <Link href="..."> dari "next/link" yang benar-benar membungkus teks/ikon menu —
   bukan <div>/<button> dengan onClick yang cuma toggle state buka-tutup dropdown tanpa route.

2. Cek satu per satu href tiap item menu, cocokkan PERSIS dengan path folder di /src/app
   (case-sensitive, termasuk tanda "-"), contoh yang wajib benar:
   - Profil Desa: /profil-desa/sejarah, /profil-desa/visi-misi, /profil-desa/geografis
   - Pemerintahan: /pemerintahan/... (cek nama sub-route sesuai folder)
   - Layanan Warga: /layanan-warga/...
   - Informasi Publik: /informasi-publik/apbdes, /informasi-publik/peraturan-desa, /informasi-publik/realisasi-apbdes
   - Potensi Desa: /potensi-desa/...

3. Kalau dropdown pakai state (misal useState untuk buka/tutup submenu), pastikan event
   handler dropdown TIDAK memasang onClick={(e) => e.preventDefault()} atau sejenisnya di
   elemen Link-nya — itu penyebab umum klik "kepencet" tapi tidak pindah halaman.

4. Kalau dropdown-nya pakai library (Radix, Headless UI, dll), cek apakah item di dalam
   trigger/dropdown-nya sudah dibungkus <Link> dengan benar, bukan cuma <DropdownMenuItem>
   tanpa href/onSelect yang mengarahkan router.

5. Setelah diperbaiki, buka tiap halaman satu per satu (klik dari menu, bukan ketik manual di
   address bar) dari Profil Desa sampai Potensi Desa, pastikan URL di browser berubah dan
   konten halaman termuat tanpa reload aneh atau tetap di Beranda.

6. Kalau setelah dicek semua Link sudah benar tapi tetap tidak jalan, cek juga apakah ada
   file page.tsx yang isinya kosong/error (folder ada tapi page.tsx belum di-export dengan
   benar, mis. lupa `export default function Page()`), laporkan folder mana yang bermasalah.
