"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Scale,
  FileSpreadsheet,
  Download,
  Settings,
  Calculator,
  Award,
  Layers,
  ChevronRight,
  Target,
  BookOpen,
  BarChart3,
  FolderOpen,
  Bot,
  Gauge,
  FileText,
} from "lucide-react";

export const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  {
    name: "NBA Criteria",
    href: "/nba-criteria",
    icon: Award,
    subItems: [
      { name: "Criteria Dashboard", href: "/nba-criteria" },
      { name: "Evidence Repository", href: "/nba-criteria/evidence" },
    ],
  },
  {
    name: "PO Management",
    href: "/po-management",
    icon: Target,
    subItems: [
      { name: "PO1–PO12 Overview", href: "/po-management" },
      { name: "CO–PO Mapping", href: "/po-management/co-po-mapping" },
    ],
  },
  {
    name: "Courses & Faculty",
    href: "/courses-faculty",
    icon: BookOpen,
    subItems: [
      { name: "Courses", href: "/courses-faculty" },
      { name: "Faculty Roster", href: "/faculty" },
      { name: "Teaching Load", href: "/teaching-load" },
    ],
  },
  { name: "Student Analytics", href: "/student-analytics", icon: BarChart3 },
  {
    name: "CO–PO Engine",
    href: "/co-po-engine",
    icon: Calculator,
    subItems: [
      { name: "Attainment Dashboard", href: "/co-po-engine" },
      { name: "Gap Analysis", href: "/co-po-engine/gap-analysis" },
    ],
  },
  { name: "NBA Readiness", href: "/nba-readiness", icon: Gauge },
  { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
  {
    name: "Reports",
    href: "/reports",
    icon: FileText,
    subItems: [
      { name: "Generate Reports", href: "/reports" },
      { name: "Export SAR Tables", href: "/export" },
    ],
  },
  {
    name: "Calculations",
    href: "/calculations/sfr",
    icon: Scale,
    subItems: [
      { name: "Student-Faculty Ratio (SFR)", href: "/calculations/sfr" },
      { name: "Regular vs Contractual", href: "/calculations/regular-contractual" },
      { name: "Faculty Qualification (FQI)", href: "/calculations/fqi" },
    ],
  },
  { name: "CSV Import", href: "/csv-import", icon: FileSpreadsheet },
  { name: "Settings & Mappings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl flex flex-col justify-between shrink-0 min-h-screen overflow-y-auto">
      <div className="p-5">
        {/* Brand */}
        <div className="flex items-center gap-3 px-2 py-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
              NBA Accreditation
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              OBE Management System
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href) ||
                  (item.subItems &&
                    item.subItems.some((s) => pathname.startsWith(s.href)));

            return (
              <div key={item.name} className="space-y-1">
                <Link
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-semibold shadow-xs"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
                      }`}
                    />
                    <span>{item.name}</span>
                  </div>
                  {item.subItems && (
                    <ChevronRight
                      className={`w-3.5 h-3.5 transition-transform ${
                        isActive ? "rotate-90 text-blue-600 dark:text-blue-400" : "text-slate-400"
                      }`}
                    />
                  )}
                </Link>

                {/* Sub items if active */}
                {item.subItems && isActive && (
                  <div className="pl-9 pr-2 py-1 space-y-1 border-l-2 border-blue-200 dark:border-blue-900 ml-5 my-1">
                    {item.subItems.map((sub) => {
                      const isSubActive = pathname === sub.href;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`block px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                            isSubActive
                              ? "bg-blue-100/60 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 font-semibold"
                              : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
                          }`}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Cycle Indicator Footer */}
      <div className="p-4 m-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span>Active Cycle</span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
            Live
          </span>
        </div>
        <p className="font-semibold text-sm text-slate-900 dark:text-white">
          2025-26 Assessment Cycle
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          CAY: 2025-26 • CAYm1: 2024-25
        </p>
      </div>
    </aside>
  );
}
