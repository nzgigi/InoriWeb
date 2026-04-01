import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.ETSY_PASSWORD ?? "";
const COOKIE_NAME = "etsy_auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    
    if (password !== PASSWORD) {
      return NextResponse.json(
        { ok: false, error: "Mot de passe incorrect" }, 
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true });
    
    res.cookies.set(COOKIE_NAME, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 jours
    });
    
    return res;
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "Erreur serveur" },
      { status: 500 }
    );
  }
}