import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aaoafpgdolkmaeyzmmnc.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhb2FmcGdkb2xrbWFleXptbW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTYwNDcsImV4cCI6MjEwMjEzMjA0N30.5XDrrnkBeKdI7Hp7GoVg7f9jexzERPdZ_Klq95Fj-dE';

const supabaseServer = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "File tidak ditemukan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Format nama file unik
    const ext = path.extname(file.name) || ".jpg";
    const filename = `berita-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;

    // 1. Coba upload ke Supabase Storage (jika bucket 'news' atau 'public' sudah ada)
    try {
      const { data: storageData, error: storageErr } = await supabaseServer.storage
        .from("news")
        .upload(`uploads/${filename}`, buffer, {
          contentType: file.type,
          upsert: true,
        });

      if (!storageErr && storageData) {
        const { data: publicUrlData } = supabaseServer.storage
          .from("news")
          .getPublicUrl(`uploads/${filename}`);

        return NextResponse.json({
          success: true,
          url: publicUrlData.publicUrl,
          source: "supabase_storage",
        });
      }
    } catch (sErr) {
      // lanjut ke fallback local server storage
    }

    // 2. Fallback: Simpan ke folder /public/uploads di server
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      source: "local_storage",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengunggah gambar" },
      { status: 500 }
    );
  }
}
