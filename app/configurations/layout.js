"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Clock, 
  Target, 
  Tag, 
  MapPin, 
  GraduationCap,
  Briefcase,
  Award
} from "lucide-react";

export default function ConfigurationsLayout({ children }) {
  const pathname = usePathname();

  const sidebarSections = [
    // { href: "/configurations/activities", label: "Activity Plans", icon: Target },
    { href: "/configurations/work_locations", label: "Work Locations", icon: MapPin },
    { href: "/configurations/tags", label: "Tags", icon: Tag },
    { href: "/configurations/skill_types", label: "Skill Types", icon: GraduationCap },
    { href: "/configurations/job_positions", label: "Job Positions", icon: Briefcase },
    { href: "/configurations/job_titles", label: "Job Titles", icon: Award },
  ];

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-80 bg-white border border-gray-200 rounded-lg p-4 h-fit sticky top-24">
        <nav className="space-y-6">
          {/* Section Items */}
          <div className="space-y-1">
            {sidebarSections.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
