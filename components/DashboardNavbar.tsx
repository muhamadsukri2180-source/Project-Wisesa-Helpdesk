"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Ticket, Plus, Bell, User } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/tickets", label: "All Ticket", icon: Ticket },
  { href: "/tickets/create", label: "Create Ticket", icon: Plus },
  { href: "/notifications", label: "Notification", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

export default function DashboardNavbar() {
  const pathname = usePathname();

  return (
    <header className="bg-brand text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="shrink-0">
            <path d="M3 20L7 4L11 20L13 10L15 20L19 4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight">wisecon</p>
            <p className="text-[10px] font-semibold tracking-widest text-white/80">
              HELPDESK &amp; TICKETING
            </p>
          </div>
        </div>

        <nav className="flex items-center gap-8">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex flex-col items-center gap-1 text-sm font-medium transition ${
                  active ? "text-white" : "text-white/75 hover:text-white"
                }`}
              >
                <span className="text-white/50">···</span>
                <span className="flex items-center gap-1.5">
                  <Icon size={16} />
                  <span className={active ? "underline underline-offset-4" : ""}>
                    {label}
                  </span>
                </span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}