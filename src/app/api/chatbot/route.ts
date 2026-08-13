import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_CONTEXT = `Kamu adalah asisten AI resmi Desa Bojong, Kecamatan Wonosegoro, Kabupaten Boyolali, Jawa Tengah. Tugasmu adalah membantu warga dengan informasi dan pertanyaan seputar desa.

Informasi penting tentang Desa Bojong:
- Lokasi: Kecamatan Wonosegoro, Kabupaten Boyolali, Jawa Tengah
- Luas wilayah: 595,11 hektar
- Terdiri dari 9 dukuh: Kliyo (7 RT), Pendem (4 RT), Bojong (3 RT), Bogor Pereng (2 RT), Bogor Kopen (2 RT), Bogorkrajan (2 RT), Tempuran (1 RT), Jonggol (1 RT), Bogor (1 RT) - Total 23 RT
- Batas wilayah: Utara (Desa Krobokan), Timur (Desa Guwo), Selatan (Desa Banyusri), Barat (Desa Garangan)
- Ketinggian: 200-228 mdpl, topografi perbukitan
- Iklim: Tropis, suhu 24-30 derajat Celsius, curah hujan 2.000-2.500 mm/tahun

Layanan yang tersedia:
- Surat keterangan warga (di kantor desa)
- Pengaduan masyarakat (via website atau WhatsApp petugas desa)
- Informasi APBDes (Anggaran Pendapatan dan Belanja Desa)
- Jadwal Posyandu dan layanan kesehatan desa
- Informasi profil desa, perangkat desa, sejarah desa

Posyandu dan Kesehatan:
- Posyandu Balita Dk. Bojong: Senin Minggu I, 08.00-11.00 WIB
- Posyandu Balita Dk. Kliyo: Selasa Minggu I, 08.00-11.00 WIB
- Posyandu Lansia: Jumat Minggu III, 08.30-11.30 WIB di Polindes
- Pemeriksaan Kehamilan: Setiap Kamis, 09.00-12.00 WIB di Polindes

Kontak:
- Alamat: Kantor Desa Bojong, Kec. Wonosegoro, Kab. Boyolali
- Telepon: (0276) 123456
- Email: pemdes@bojong.boyolali.go.id

Panduan perilakumu:
- Selalu ramah, sopan, dan profesional
- Jawab dalam Bahasa Indonesia yang baik dan mudah dipahami
- Jika tidak tahu sesuatu yang spesifik, arahkan ke kantor desa
- Fokus pada informasi Desa Bojong dan layanan pemerintahan desa
- Berikan jawaban yang singkat, padat, dan informatif
- Awali percakapan dengan hangat dan perkenalan sebagai asisten desa`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Pesan tidak valid" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "AQ.Ab8RN6IWhmAzDXV4Tt77QygUudQ3agIjyV0LA7fpvmT5yjTfxA") {
      return NextResponse.json(
        { error: "API key Gemini belum dikonfigurasi. Silakan hubungi admin desa." },
        { status: 503 }
      );
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_CONTEXT,
    });

    const chatHistory = (history || []).map((msg: { role: string; text: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }],
    }));

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ reply: text });
  } catch (error: unknown) {
    console.error("Gemini API Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Terjadi kesalahan: ${errorMessage}` },
      { status: 500 }
    );
  }
}
