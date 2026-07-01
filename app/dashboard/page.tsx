"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket, Wrench, Clock, CheckCheck, Plus } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import StatCard from "@/components/StatCard";
import TicketTable, { TicketRow } from "@/components/TicketTable";
import NotificationList, { NotificationItem } from "@/components/NotificationList";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const dummyTickets: TicketRow[] = [
  { id: "#WIS-0042", title: "Email cannot be sent to external domain", category: "Email & Communication", status: "Waiting", timer: "2 hour ago" },
  { id: "#WIS-0042", title: "Email cannot be sent to external domain", category: "Email & Communication", status: "Waiting", timer: "2 hour ago" },
  { id: "#WIS-0042", title: "Email cannot be sent to external domain", category: "Email & Communication", status: "Waiting", timer: "2 hour ago" },
  { id: "#WIS-0042", title: "Email cannot be sent to external domain", category: "Email & Communication", status: "Waiting", timer: "2 hour ago" },
];

const dummyNotifications: NotificationItem[] = [
  { id: "1", message: "Ticket #WIS-0042 is being worked on by Budi (IT Support)", time: "1 hour ago" },
  { id: "2", message: "Ticket #WIS-0042 is being worked on by Budi (IT Support)", time: "1 hour ago" },
];

export default function DashboardPage() {
  const router = useRouter();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetch(`${API_URL}/api/authapi/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.name) setUserName(data.name);
      })
      .catch(() => {
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f3f1ee]">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f1ee]">
      <DashboardNavbar />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {userName && (
          <p className="mb-4 text-sm text-gray-500">
            Welcome back, <span className="font-semibold text-gray-700">{userName}</span>
          </p>
        )}
        <div className="flex flex-col gap-4 sm:flex-row">
          <StatCard
            icon={Ticket}
            iconColor="text-blue-500"
            label="Ticket Total"
            value={10}
            footer="All Time"
          />
          <StatCard
            icon={Wrench}
            iconColor="text-yellow-500"
            label="Being Worked on"
            value={10}
            footer="Active now"
            footerColor="text-yellow-600"
          />
          <StatCard
            icon={Clock}
            iconColor="text-red-500"
            label="waiting for a reply"
            value={10}
            footer="Active now"
            footerColor="text-red-500"
          />
          <StatCard
            icon={CheckCheck}
            iconColor="text-green-500"
            label="Resolved"
            value={10}
            footer=""
            footerColor="text-green-600"
          />
        </div>

        <div className="mt-10 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">New Ticket</h2>
          <button
            onClick={() => router.push("/tickets/create")}
            className="flex items-center gap-1.5 rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black"
          >
            <Plus size={16} />
            Create ticket
          </button>
        </div>
        <div className="mt-4">
          <TicketTable rows={dummyTickets} />
        </div>


        <div className="mt-10">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Notification</h2>
          <NotificationList items={dummyNotifications} />
        </div>
      </main>
    </div>
  );
}