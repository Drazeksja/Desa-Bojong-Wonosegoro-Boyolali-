import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `Kamu adalah "Kang Bot" — asisten virtual Desa Bojong yang asik, friendly, dan helpful banget. Kamu kayak admin desa yang gaul tapi tetap informatif dan bisa dipercaya.

Gaya bicara kamu:
- Santai, hangat, dan akrab — kayak ngobrol sama orang yang udah kenal lama
- Boleh pakai bahasa campuran Indonesia-Jawa ringan sesekali (misalnya: "monggo", "njuk", "Alhamdulillah") tapi tetap mudah dimengerti semua orang
- Hindari bahasa robot atau terlalu formal
- Pakai emoji yang pas dan tidak berlebihan untuk membuat obrolan lebih hidup 😊
- Kalau nggak tahu sesuatu, jujur dan arahkan ke kantor desa dengan nada yang tetap positif
- Jawaban singkat, jelas, dan padat — bukan paragraf panjang yang boring
- Kalau ada yang tanya hal di luar desa, ramah-ramah aja bilang "wah itu di luar ranahku nih, aku spesialis Desa Bojong haha"

INFORMASI RESMI DESA BOJONG (gunakan ini sebagai referensi utama):

📍 LOKASI & GEOGRAFI
- Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali, Jawa Tengah
- Luas: 595,11 hektar
- Topografi perbukitan, ketinggian 200–228 mdpl
- Iklim tropis: suhu 24–30°C, curah hujan 2.000–2.500 mm/tahun
- Batas wilayah: Utara (Desa Krobokan), Timur (Desa Guwo), Selatan (Desa Banyusri), Barat (Desa Garangan)

🏘️ WILAYAH ADMINISTRASI
- 9 Dukuh: Kliyo (7 RT), Pendem (4 RT), Bojong (3 RT), Bogor Pereng (2 RT), Bogor Kopen (2 RT), Bogorkrajan (2 RT), Tempuran (1 RT), Jonggol (1 RT), Bogor (1 RT)
- Total: 23 RT

👨‍💼 PERANGKAT DESA
- Kepala Desa: Sutarno
- Sekretaris Desa: Yatmin
- Kasi Pemerintahan: Gatot Trimulyono
- Kasi Kesejahteraan: Tri Endang Kusumawardhani
- Kasi Pelayanan: Sri Hermin Harsiwi
- Kaur Keuangan: Agus Santoso
- Kaur Umum: Aminanto
- Kaur TU & Perencanaan: Ahmadi

🏥 KESEHATAN & POSYANDU
- Posyandu Balita Dukuh Bojong: Senin Minggu I, 08.00–11.00 WIB
- Posyandu Balita Dukuh Kliyo: Selasa Minggu I, 08.00–11.00 WIB
- Posyandu Lansia: Jumat Minggu III, 08.30–11.30 WIB di Polindes
- Pemeriksaan Kehamilan (ANC): Setiap Kamis, 09.00–12.00 WIB di Polindes
- Bidan Desa: siap melayani warga

📋 LAYANAN WARGA
- Surat Keterangan Tidak Mampu (SKTM): bawa KTP + KK, gratis
- Surat Keterangan Usaha (SKU): bawa KTP + KK + foto lokasi usaha
- Surat Keterangan Domisili: bawa KTP + KK
- Surat Pengantar SKCK: bawa KTP + KK
- Surat Keterangan Menikah: bawa KTP + KK + surat dari RT
- Semua layanan surat: Senin–Jumat, 08.00–14.00 WIB di kantor desa

📢 PENGADUAN WARGA
- Bisa via website di halaman Pengaduan
- Atau langsung ke kantor desa
- Akan ditindaklanjuti oleh perangkat desa

💰 APBDES & KEUANGAN
- Informasi lengkap APBDes bisa dilihat di menu Informasi Publik
- Total APBDes 2025 sekitar Rp 1,5 miliar
- Dana Desa digunakan untuk pembangunan infrastruktur, pemberdayaan, dan pelayanan

🌾 POTENSI DESA / UMKM
- Produk unggulan: Kripik singkong, kripik pisang, jamu tradisional gendong
- Pertanian: padi, jagung, singkong
- Perikanan kolam

🎓 KKN & KEGIATAN
- Kegiatan KKN: total 11 kegiatan yang sudah/sedang berjalan
- Musrenbangdes rutin diadakan setiap tahun untuk perencanaan pembangunan desa

📞 KONTAK
- Alamat: Kantor Desa Bojong, Kec. Wonosegoro, Kab. Boyolali, Jawa Tengah
- Jam Pelayanan: Senin–Jumat, 08.00–14.00 WIB
- Website: tersedia menu lengkap di website ini`;

export async function POST(request: NextRequest) {
  let message = "";
  let history: { role: string; text: string }[] = [];

  try {
    const body = await request.json();
    message = body.message || "";
    history = body.history || [];

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Pesan tidak valid" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const reply = getOfflineReply(message);
      return NextResponse.json({ reply });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_CONTEXT,
    });

    // Filter history: hapus item dengan text kosong agar tidak error
    const chatHistory = (history || [])
      .filter((msg: { role: string; text: string }) => msg.text && msg.text.trim().length > 0)
      .map((msg: { role: string; text: string }) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 600,
        temperature: 0.85,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const reply = getOfflineReply(message);
    return NextResponse.json({ reply });
  }
}

// Fallback jawaban berbasis keyword saat API tidak tersedia
function getOfflineReply(message: string): string {
  const m = message.toLowerCase();

  if (m.includes("posyandu") || m.includes("kesehatan")) {
    return "Halo! 👋 Untuk jadwal Posyandu:\n\n🟢 Posyandu Balita Dk. Bojong → Senin Minggu I, 08.00–11.00 WIB\n🟢 Posyandu Balita Dk. Kliyo → Selasa Minggu I, 08.00–11.00 WIB\n🟢 Posyandu Lansia → Jumat Minggu III, 08.30–11.30 WIB di Polindes\n\nMau info lainnya? 😊";
  }
  if (m.includes("surat") || m.includes("layanan") || m.includes("dokumen")) {
    return "Untuk layanan surat di Desa Bojong bisa langsung ke kantor desa! 📄\n\nLayanan tersedia:\n• SKTM (Keterangan Tidak Mampu)\n• SKU (Keterangan Usaha)\n• Domisili, SKCK, Nikah, dll\n\n⏰ Jam buka: Senin–Jumat, 08.00–14.00 WIB\nBawa KTP + KK ya! 😊";
  }
  if (m.includes("kepala desa") || m.includes("perangkat") || m.includes("pak kades")) {
    return "Kepala Desa Bojong saat ini Bapak Sutarno 👨‍💼\n\nPerangkat lainnya:\n• Sekdes: Yatmin\n• Kasi Pelayanan: Sri Hermin Harsiwi\n• Kaur Keuangan: Agus Santoso\n\nAda yang mau ditanyakan? 😊";
  }
  if (m.includes("luas") || m.includes("wilayah") || m.includes("dukuh") || m.includes("rt")) {
    return "Desa Bojong punya luas 595,11 hektar 🗺️\n\nTerdiri dari 9 dukuh & 23 RT:\nKliyo, Pendem, Bojong, Bogor Pereng, Bogor Kopen, Bogorkrajan, Tempuran, Jonggol, Bogor\n\nLokasinya di Kec. Wonosegoro, Kab. Boyolali, Jateng 📍";
  }
  if (m.includes("umkm") || m.includes("produk") || m.includes("kripik") || m.includes("jamu")) {
    return "Wah, Desa Bojong punya UMKM keren lho! 🌟\n\n✅ Kripik singkong & pisang\n✅ Jamu tradisional gendong\n✅ Hasil pertanian: padi, jagung, singkong\n\nProduk lokal ini bisa dilihat di menu Potensi Desa ya! 😊";
  }
  if (m.includes("apbdes") || m.includes("anggaran") || m.includes("keuangan")) {
    return "Info APBDes Desa Bojong bisa dilihat lengkap di menu Informasi Publik → APBDes & Realisasi 📊\n\nTransparansi keuangan desa itu penting, dan Desa Bojong komitmen untuk terbuka ke warga! 💪";
  }
  if (m.includes("pengaduan") || m.includes("lapor") || m.includes("komplain")) {
    return "Mau lapor atau ngadu sesuatu? Bisa banget! 📢\n\n1️⃣ Via website → menu Layanan Warga → Pengaduan\n2️⃣ Langsung ke kantor desa\n\nSemua pengaduan akan ditindaklanjuti oleh perangkat desa. Monggo! 🙏";
  }
  if (m.includes("sejarah") || m.includes("asal usul")) {
    return "Desa Bojong punya sejarah yang menarik! 📜\n\nLokasinya di Kec. Wonosegoro, Kab. Boyolali, dikelilingi alam perbukitan yang indah dengan ketinggian 200–228 mdpl.\n\nInfo lebih lengkap ada di menu Profil Desa → Sejarah ya! 😊";
  }
  if (m.includes("halo") || m.includes("hai") || m.includes("hi") || m.includes("assalamu") || m.includes("permisi")) {
    return "Halo halo! 👋😄 Selamat datang di Kang Bot — asisten virtual Desa Bojong!\n\nMau tanya apa nih? Soal layanan surat, jadwal posyandu, info desa, atau yang lain — aku siap bantu! 🙌";
  }
  if (m.includes("terima kasih") || m.includes("makasih") || m.includes("thanks")) {
    return "Sama-sama! 😊 Senang bisa bantu. Kalau ada pertanyaan lain, jangan ragu ya — Kang Bot siap 24 jam! 🙌\n\nSalam dari Desa Bojong! 🌿";
  }

  return "Halo! 👋 Aku Kang Bot, asisten virtual Desa Bojong.\n\nMaaf, aku lagi nggak bisa terhubung ke server AI nih. Tapi bisa coba tanya soal:\n• Jadwal Posyandu\n• Layanan Surat\n• Info Perangkat Desa\n• UMKM & Potensi Desa\n• Pengaduan\n\nAtau langsung ke kantor desa ya! 🏢 Senin–Jumat, 08.00–14.00 WIB 🙏";
}
