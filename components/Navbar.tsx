"use client";

import Link from "next/link";
import { Download, FileSpreadsheet, PlusCircle, CheckCircle2 } from "lucide-react";

export function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-300">
          Criterion 5
        </span>
        <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-200 hidden sm:block">
          Faculty Information & Contributions — NBA Self Assessment Report
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href="/csv-import"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
        >
          <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
          <span>Import CSV</span>
        </Link>
        <Link
          href="/export"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-sm transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export SAR Tables</span>
        </Link>
      </div>
    </header>
  );
}
