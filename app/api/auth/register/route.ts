import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getPool, sql } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Semua field wajib diisi." },
        { status: 400 }
      );
    }

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("email", sql.NVarChar, email)
      .query("SELECT Id FROM dbo.Users WHERE Email = @email");

    if (existing.recordset.length > 0) {
      return NextResponse.json(
        { message: "Email sudah terdaftar." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("email", sql.NVarChar, email)
      .input("passwordHash", sql.NVarChar, passwordHash)
      .query(
        `INSERT INTO dbo.Users (Name, Email, PasswordHash)
         VALUES (@name, @email, @passwordHash)`
      );

    return NextResponse.json(
      { message: "Registrasi berhasil." },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}