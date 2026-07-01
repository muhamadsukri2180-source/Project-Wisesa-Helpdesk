import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wisecon Helpdesk & Ticketing",
  description: "Sign in or create an account for Wisecon Helpdesk & Ticketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased text-gray-900">{children}</body>
    </html>
  );
}