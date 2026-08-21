import { NextResponse } from "next/server";
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
      return NextResponse.json({ success: false, message: "File gambar tidak ditemukan" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Format nama file unik dan bersih
    const originalExt = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '.jpg';
    const cleanExt = originalExt.toLowerCase();
    const filename = `berita-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${cleanExt}`;
    const contentType = file.type || "image/jpeg";

    // 1. Coba upload ke Supabase Storage (Mencoba bucket 'news-images', lalu 'news', lalu 'public')
    const possibleBuckets = ["news-images", "news", "public"];

    for (const bucketName of possibleBuckets) {
      try {
        const { data: storageData, error: storageErr } = await supabaseServer.storage
          .from(bucketName)
          .upload(`uploads/${filename}`, buffer, {
            contentType: contentType,
            upsert: true,
          });

        if (!storageErr && storageData) {
          const { data: publicUrlData } = supabaseServer.storage
            .from(bucketName)
            .getPublicUrl(`uploads/${filename}`);

          if (publicUrlData?.publicUrl) {
            return NextResponse.json({
              success: true,
              url: publicUrlData.publicUrl,
              bucket: bucketName,
              source: "supabase_storage",
            });
          }
        }
      } catch (sErr) {
        // Coba bucket berikutnya
      }
    }

    // 2. Fallback Tanpa Filesystem (Data URL / Base64)
    // Solusi ini 100% tahan error "EROFS: read-only file system" di Vercel / serverless hosting
    const base64Data = buffer.toString("base64");
    const dataUrl = `data:${contentType};base64,${base64Data}`;

    return NextResponse.json({
      success: true,
      url: dataUrl,
      source: "data_url",
    });

  } catch (error: any) {
    console.error("Upload handler exception:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal mengunggah gambar" },
      { status: 500 }
    );
  }
}
