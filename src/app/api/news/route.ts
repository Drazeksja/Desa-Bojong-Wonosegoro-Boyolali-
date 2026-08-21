import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://aaoafpgdolkmaeyzmmnc.supabase.co';
const supabaseUrl = rawUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhb2FmcGdkb2xrbWFleXptbW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODY1NTYwNDcsImV4cCI6MjEwMjEzMjA0N30.5XDrrnkBeKdI7Hp7GoVg7f9jexzERPdZ_Klq95Fj-dE';

const supabaseServer = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  }
});

// GET all news or single news
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const id = searchParams.get("id");

    if (slug) {
      const { data, error } = await supabaseServer
        .from("news")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 404 });
      }
      return NextResponse.json({ success: true, data });
    }

    if (id) {
      const { data, error } = await supabaseServer
        .from("news")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 404 });
      }
      return NextResponse.json({ success: true, data });
    }

    const { data, error } = await supabaseServer
      .from("news")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// POST create news
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, excerpt, content, featured_image, author, status, is_featured } = body;

    if (!title) {
      return NextResponse.json({ success: false, message: "Judul berita wajib diisi" }, { status: 400 });
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "") + "-" + Math.random().toString(36).substring(2, 7);

    const newRecord = {
      title,
      slug: body.slug || (title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "") + "-" + Date.now()),
      category: category || "Berita Desa",
      excerpt: excerpt || title,
      content: content || "",
      featured_image: featured_image || "/musren.webp",
      author: author || "Pemerintah Desa Bojong",
      location: body.location || "Desa Bojong",
      status: status || "terbit",
      is_featured: Boolean(is_featured),
      views: 0,
      published_at: body.published_at || new Date().toISOString(),
      created_at: body.created_at || new Date().toISOString(),
    };

    const { data, error } = await supabaseServer
      .from("news")
      .insert([newRecord])
      .select()
      .single();

    if (error) {
      console.error("SUPABASE SERVER INSERT ERROR:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

// DELETE news
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, message: "ID berita diperlukan" }, { status: 400 });
    }

    const { error } = await supabaseServer.from("news").delete().eq("id", id);
    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Berita berhasil dihapus" });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
