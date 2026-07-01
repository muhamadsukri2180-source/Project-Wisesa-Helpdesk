"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import BrandPanel from "@/components/BrandPanel";
import { EyeIcon } from "@/components/EyeIcon";
import { GoogleIcon } from "@/components/GoogleIcon";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/authapi/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }

      // Simpan JWT token dari backend .NET
      if (remember) {
        localStorage.setItem("token", data.token);
      } else {
        sessionStorage.setItem("token", data.token);
      }
      localStorage.setItem("user", JSON.stringify(data.user));

      window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleSignIn() {
    window.location.href = `${API_URL}/api/auth/google`;
  }

  return (
    <main className="flex min-h-screen w-full bg-[#f3f1ee]">
      <div className="flex w-full md:w-1/2 flex-col justify-center px-8 sm:px-16 lg:px-24 py-12">
        <Logo className="mb-10" />

        <h1 className="text-3xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-500 mt-1 mb-8">Please enter your details</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 max-w-md">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-gray-50 px-3.5 py-2.5 pr-10 text-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600 select-none">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="brand-checkbox h-4 w-4 rounded border-gray-300"
              />
              Remember for 30 days
            </label>
            <Link href="/forgot-password" className="font-medium text-brand hover:underline">
              Forgot password
            </Link>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-brand-light py-2.5 text-sm font-semibold text-white transition hover:bg-brand disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <GoogleIcon />
            sign in with Google
          </button>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-medium text-brand hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <BrandPanel side="right" tagline="HELPDESK & TICKETING" />
    </main>
  );
}