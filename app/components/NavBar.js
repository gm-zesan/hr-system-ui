"use client";

import { Search, Hexagon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import profile from "../../public/profile.avif";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/employees", label: "Employees" },
    { href: "/departments", label: "Departments" },
    { href: "/reportings", label: "Reportings" },
    { href: "/configurations", label: "Configurations" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 h-16 px-4 md:px-6 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo & Title & Nav */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <Hexagon className="text-purple-600 fill-purple-600 w-full h-full" />
          </div>
          <span className="text-xl font-bold text-gray-900">Employees</span>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-md font-medium text-gray-500">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-blue-600 bg-blue-50"
                    : "hover:text-gray-800"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Right: Search & Profile */}
      <div className="flex items-center gap-4">
        <div className="relative w-64 hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        <button className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
          <Image
            src={profile}
            alt="Profile"
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </header>
  );
}
