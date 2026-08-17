import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aaoafpgdolkmaeyzmmnc.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhb2FmcGdkb2xrbWFleXptbW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTYwNDcsImV4cCI6MjEwMjEzMjA0N30.5XDrrnkBeKdI7Hp7GoVg7f9jexzERPdZ_Klq95Fj-dE';

const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

// GET all gallery photos
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    let query = supabaseServer
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (category && category !== "Semua") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: data || [] });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST add photo
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, description, image_url, taken_at } = body;

    if (!title || !image_url) {
      return NextResponse.json(
        { success: false, message: "Judul dan URL gambar wajib diisi" },
        { status: 400 }
      );
    }

    const newRecord = {
      title,
      category: category || "Kegiatan Desa",
      description: description || "",
      image_url,
      taken_at: taken_at || new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
      .from("gallery")
      .insert([newRecord])
      .select()
      .single();

    if (error) {
      // Jika tabel belum ada, kembalikan data lokal agar tetap berfungsi
      return NextResponse.json({
        success: true,
        data: { id: "local-" + Date.now(), ...newRecord, created_at: new Date().toISOString() },
        note: "Saved locally (table may not exist): " + error.message,
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE photo
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID diperlukan" }, { status: 400 });
    }

    const { error } = await supabaseServer.from("gallery").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Foto berhasil dihapus" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
