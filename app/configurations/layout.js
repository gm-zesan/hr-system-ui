"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  User, 
  Clock, 
  Target, 
  Tag, 
  MapPin, 
  GraduationCap,
  Users,
  Briefcase
} from "lucide-react";

export default function ConfigurationsLayout({ children }) {
  const pathname = usePathname();

  const sidebarSections = [
    {
      title: "Employee",
      items: [
        { href: "/configurations/working-schedules", label: "Working Schedules", icon: Clock },
        { href: "/configurations/departure-reasons", label: "Departure Reasons", icon: Target },
        { href: "/configurations/tags", label: "Tags", icon: Tag },
        { href: "/configurations/work-locations", label: "Work Locations", icon: MapPin },
        { href: "/configurations/skill-types", label: "Skill Types", icon: GraduationCap },
      ],
    },
    {
      title: "Recruitment",
      items: [
        { href: "/configurations/employment-types", label: "Employment Types", icon: Briefcase },
        { href: "/configurations/job-positions", label: "Job Positions", icon: Briefcase },
      ],
    },
  ];

  return (
    <div className="flex gap-6">
      {/* Sidebar */}
      <aside className="w-80 bg-white border border-gray-200 rounded-lg p-4 h-fit sticky top-24">
        <nav className="space-y-6">
            <div className="flex items-center gap-3 px-4 py-2.5 mb-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  General
                </h3>
            </div>
            <Link
                href={"/configurations/activity-plans"}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-sm"    
            >
                <GraduationCap className="w-4 h-4" />
                <span>Activity Plans</span>
            </Link>


          {sidebarSections.map((section) => (
            <div key={section.title}>
              {/* Section Header */}
              <div className="flex items-center gap-2 px-4 py-2 mb-1">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>

              {/* Section Items */}
              <div className="space-y-1">
                {section.items.map((item) => {
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
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}
