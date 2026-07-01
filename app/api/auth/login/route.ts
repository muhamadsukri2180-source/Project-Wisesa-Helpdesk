import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool, sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { email, password, remember } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password wajib diisi." },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const result = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query(
        "SELECT Id, Name, Email, PasswordHash FROM dbo.Users WHERE Email = @email"
      );

    const user = result.recordset[0];

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah." },
        { status: 401 }
      );
    }

    const isValid = await bcrypt.compare(password, user.PasswordHash);

    if (!isValid) {
      return NextResponse.json(
        { message: "Email atau password salah." },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { message: "Login berhasil.", user: { id: user.Id, name: user.Name, email: user.Email } },
      { status: 200 }
    );

    response.cookies.set("session_user", String(user.Id), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: remember ? 60 * 60 * 24 * 30 : 60 * 60 * 24,
    });

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}