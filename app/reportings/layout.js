"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

export default function ReportingsLayout({ children }) {
  const pathname = usePathname();

  const sidebarItems = [
    { href: "/reportings/skills", label: "Skills", icon: GraduationCap },
  ];

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-80 bg-white border border-gray-200 rounded-lg p-4 h-fit sticky top-24">
        <nav className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
