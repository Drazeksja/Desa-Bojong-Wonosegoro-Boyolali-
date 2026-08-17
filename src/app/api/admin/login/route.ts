import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    // Kredensial default admin Desa Bojong
    const validUser = process.env.ADMIN_USERNAME || "admin";
    const validPass = process.env.ADMIN_PASSWORD || "adminbojong2026";

    if (username === validUser && password === validPass) {
      const response = NextResponse.json({ success: true, message: "Login berhasil" });
      
      // Simpan cookie auth admin selama 7 hari
      response.cookies.set("desa_admin_token", "admin_authenticated_session", {
        httpOnly: false, // agar bisa dicek juga di client/localStorage
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "lax",
      });

      return response;
    }

    return NextResponse.json(
      { success: false, message: "Username atau kata sandi admin salah" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}
