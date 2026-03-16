"use client";

import { useRouter } from "next/navigation";

const STATS = [
  { label: "Total Rooms", value: "3", change: "+0%", icon: "room" },
  { label: "Services", value: "4", change: "+0%", icon: "service" },
  { label: "Tours", value: "4", change: "+0%", icon: "tour" },
  { label: "Packages", value: "5", change: "+0%", icon: "package" },
  { label: "Gallery Photos", value: "8", change: "+0%", icon: "gallery" },
];

const QUICK_ACTIONS = [
  { label: "Manage Rooms", description: "Create, update rooms & pricing", href: "/admin/dashboard/rooms" },
  { label: "Manage Services", description: "Update service images", href: "/admin/dashboard/services" },
  { label: "Manage Tours", description: "Create, update tour experiences", href: "/admin/dashboard/tours" },
  { label: "Manage Packages", description: "Create, update promotional offers", href: "/admin/dashboard/packages" },
  { label: "Manage Gallery", description: "Add, remove gallery photos", href: "/admin/dashboard/gallery" },
];

export default function DashboardPage() {
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
          Welcome back, Admin
        </h1>
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
          Manage your hotel rooms, services, tours and packages from here.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-6"
            style={{
              backgroundColor: "#1a1d27",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: "rgba(179,153,119,0.12)" }}
              >
                {stat.icon === "room" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B39977" strokeWidth="1.8">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                ) : stat.icon === "tour" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B39977" strokeWidth="1.8">
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 10-16 0c0 3 2.7 7 8 11.7z" />
                  </svg>
                ) : stat.icon === "package" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B39977" strokeWidth="1.8">
                    <path d="M20 12V8H6a2 2 0 01-2-2c0-1.1.9-2 2-2h12v4" />
                    <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
                    <path d="M18 12a2 2 0 000 4h4v-4h-4z" />
                  </svg>
                ) : stat.icon === "gallery" ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B39977" strokeWidth="1.8">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#B39977" strokeWidth="1.8">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                )}
              </div>
              <span
                className="text-xs px-2 py-1 rounded-full"
                style={{
                  backgroundColor: "rgba(52, 211, 153, 0.1)",
                  color: "#34D399",
                }}
              >
                {stat.change}
              </span>
            </div>
            <p className="text-3xl font-bold mb-1" style={{ color: "#FFFFFF" }}>
              {stat.value}
            </p>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.4)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold mb-4" style={{ color: "#FFFFFF" }}>
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {QUICK_ACTIONS.map((action) => (
            <button
              key={action.href}
              onClick={() => router.push(action.href)}
              className="rounded-2xl p-6 text-left transition-all duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: "#1a1d27",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <h4 className="text-sm font-semibold mb-1" style={{ color: "#B39977" }}>
                {action.label}
              </h4>
              <p className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>
                {action.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
