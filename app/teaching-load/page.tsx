"use client";

import React, { useState } from "react";
import { appStore, TeachingLoadRecord } from "@/lib/data/mockStore";
import { Layers, Info, CheckCircle2, Search, ArrowRight } from "lucide-react";

export default function TeachingLoadPage() {
  const [loads, setLoads] = useState<TeachingLoadRecord[]>(appStore.teachingLoads);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");

  const sfr = appStore.computeSFR("2025-26");

  const filteredLoads = loads.filter((l) => {
    if (categoryFilter === "a") return l.isOwnDepartment;
    if (categoryFilter === "b") return l.isExternalFaculty;
    if (categoryFilter === "c") return l.servesOtherDepartment;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-blue-600" />
            Teaching Load Allocations
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Fractional teaching contributions for a, b, and c categories per NBA definitions
          </p>
        </div>
      </div>

      {/* Summary KPI banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Own Dept Load (a)</span>
          <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {sfr.a}
          </div>
          <span className="text-[11px] text-slate-400">Total fraction for CSE faculty</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">External Faculty Load (b)</span>
          <div className="text-2xl font-bold text-indigo-600 mt-1">
            {sfr.b}
          </div>
          <span className="text-[11px] text-slate-400">Math, ECE, HSS serving CSE</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Effective Faculty (F = a + b)</span>
          <div className="text-2xl font-bold text-blue-600 mt-1">
            {sfr.F}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">Used for SFR denominator</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
          <span className="text-xs text-slate-500 font-medium">Serving Other Depts (c)</span>
          <div className="text-2xl font-bold text-slate-500 mt-1">
            {sfr.c}
          </div>
          <span className="text-[11px] text-slate-400">Informational only (excluded)</span>
        </div>
      </div>

      {/* Filter and Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Filter Category:</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => setCategoryFilter("ALL")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  categoryFilter === "ALL"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                All ({loads.length})
              </button>
              <button
                onClick={() => setCategoryFilter("a")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  categoryFilter === "a"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Category a ({sfr.contributors.a.length})
              </button>
              <button
                onClick={() => setCategoryFilter("b")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  categoryFilter === "b"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Category b ({sfr.contributors.b.length})
              </button>
              <button
                onClick={() => setCategoryFilter("c")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                  categoryFilter === "c"
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                }`}
              >
                Category c ({sfr.contributors.c.length})
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <th className="py-3 px-4 font-semibold">Faculty Name</th>
                <th className="py-3 px-4 font-semibold">Department</th>
                <th className="py-3 px-4 font-semibold">Program</th>
                <th className="py-3 px-4 font-semibold">Academic Load %</th>
                <th className="py-3 px-4 font-semibold">Calculated Fraction</th>
                <th className="py-3 px-4 font-semibold">NBA Category</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredLoads.map((load) => {
                const fraction = (load.academicLoadPercentage / 100).toFixed(2);
                let badge = { text: "a (Own Dept)", color: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300" };
                if (load.isExternalFaculty) {
                  badge = { text: "b (External Faculty)", color: "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300" };
                } else if (load.servesOtherDepartment) {
                  badge = { text: "c (Serving Elsewhere)", color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300" };
                }

                return (
                  <tr
                    key={load.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {load.facultyName}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {load.department}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {load.program}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium">
                      {load.academicLoadPercentage}%
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-blue-600">
                      {fraction}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${badge.color}`}>
                        {badge.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
