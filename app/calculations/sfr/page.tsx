"use client";

import React, { useState } from "react";
import { appStore } from "@/lib/data/mockStore";
import { averageSFR } from "@/lib/calculations/studentFacultyRatio";
import {
  Users,
  Calculator,
  Award,
  CheckCircle2,
  AlertTriangle,
  Info,
  ChevronDown,
} from "lucide-react";

export default function SFRPage() {
  const activeCycle = appStore.getActiveCycle();

  // Compute for CAY, CAYm1, CAYm2
  const sfrCAY = appStore.computeSFR("2025-26");
  const sfrCAYm1 = { N: 575, a: 20.0, b: 3.0, c: 0.5, F: 23.0, SFR: 25.0 };
  const sfrCAYm2 = { N: 570, a: 19.5, b: 3.5, c: 0.5, F: 23.0, SFR: 24.78 };

  const avg = averageSFR([sfrCAY.SFR, sfrCAYm1.SFR, sfrCAYm2.SFR]);

  // NBA Marks: Max 20. If SFR <= 20 -> 20 marks. If SFR <= 25 -> (20 * 20 / SFR). If > 25 -> 0.
  const marks =
    avg <= 20
      ? 20
      : avg <= 25
      ? Math.round(((20 * 20) / avg) * 100) / 100
      : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            Criterion 5.1
          </span>
          <span className="text-xs text-slate-500 font-medium">
            NBA Accreditation Assessment
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="w-6 h-6 text-blue-600" />
          Student - Faculty Ratio (SFR)
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Pure DB-agnostic calculation engine verifying F = a + b (c excluded) and SFR = N / F
        </p>
      </div>

      {/* Main KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">CAY SFR (2025-26)</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-2">
            {sfrCAY.SFR}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            N = {sfrCAY.N} / F = {sfrCAY.F}
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">3-Year Average SFR</span>
          <div className="text-3xl font-extrabold text-indigo-600 mt-2">
            {avg}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            CAY, CAYm1, CAYm2 combined
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">NBA Criterion Marks</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">
            {marks} <span className="text-base font-medium text-slate-400">/ 20</span>
          </div>
          <span className="text-xs text-emerald-600 mt-1 block font-medium">
            Eligible for accreditation marks
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Compliance Tier</span>
          <div className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-3 flex items-center gap-1.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>&le; 25:1 Compliant</span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Target 20:1 for max marks
          </span>
        </div>
      </div>

      {/* Table B.5.1: 3-Year Comparative SFR */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Table 5.1: Calculation of Student-Faculty Ratio (SFR)
            </h2>
            <p className="text-xs text-slate-500">
              Prescribed format as per NBA Self Assessment Report guidelines
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            Official NBA Format
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <th className="py-3 px-4 font-semibold">Academic Year</th>
                <th className="py-3 px-4 font-semibold">Total Students (N)</th>
                <th className="py-3 px-4 font-semibold">Own Dept Faculty (a)</th>
                <th className="py-3 px-4 font-semibold">Other Dept Faculty (b)</th>
                <th className="py-3 px-4 font-semibold">Total Faculty (F = a + b)</th>
                <th className="py-3 px-4 font-semibold">SFR (N / F)</th>
                <th className="py-3 px-4 font-semibold">Serving Elsewhere (c)*</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
              <tr className="bg-blue-50/30 dark:bg-blue-950/20 font-semibold">
                <td className="py-3 px-4 font-sans text-slate-900 dark:text-white">
                  CAY (2025-26)
                </td>
                <td className="py-3 px-4">{sfrCAY.N}</td>
                <td className="py-3 px-4">{sfrCAY.a}</td>
                <td className="py-3 px-4">{sfrCAY.b}</td>
                <td className="py-3 px-4 font-bold text-blue-600">{sfrCAY.F}</td>
                <td className="py-3 px-4 font-extrabold text-blue-700 dark:text-blue-300">
                  {sfrCAY.SFR}
                </td>
                <td className="py-3 px-4 text-slate-400">{sfrCAY.c}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-900 dark:text-white">
                  CAYm1 (2024-25)
                </td>
                <td className="py-3 px-4">{sfrCAYm1.N}</td>
                <td className="py-3 px-4">{sfrCAYm1.a}</td>
                <td className="py-3 px-4">{sfrCAYm1.b}</td>
                <td className="py-3 px-4 font-bold text-blue-600">{sfrCAYm1.F}</td>
                <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                  {sfrCAYm1.SFR}
                </td>
                <td className="py-3 px-4 text-slate-400">{sfrCAYm1.c}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-sans text-slate-900 dark:text-white">
                  CAYm2 (2023-24)
                </td>
                <td className="py-3 px-4">{sfrCAYm2.N}</td>
                <td className="py-3 px-4">{sfrCAYm2.a}</td>
                <td className="py-3 px-4">{sfrCAYm2.b}</td>
                <td className="py-3 px-4 font-bold text-blue-600">{sfrCAYm2.F}</td>
                <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                  {sfrCAYm2.SFR}
                </td>
                <td className="py-3 px-4 text-slate-400">{sfrCAYm2.c}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-slate-100/80 dark:bg-slate-800 border-t-2 border-slate-300 dark:border-slate-700 font-sans">
                <td colSpan={5} className="py-3 px-4 font-bold text-right text-slate-900 dark:text-white">
                  3-Year Average SFR (SFR1 + SFR2 + SFR3) / 3:
                </td>
                <td colSpan={2} className="py-3 px-4 font-mono font-extrabold text-blue-600 dark:text-blue-400 text-sm">
                  {avg}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 border-t border-slate-200 dark:border-slate-800">
          * Note: Per NBA SAR instructions, <strong>c</strong> represents faculty of this department teaching elsewhere and is recorded for reference only — it is <strong>strictly excluded</strong> from denominator F.
        </div>
      </div>

      {/* Contributor Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category a contributors */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Category a (Own Department)
            </h3>
            <span className="text-xs font-mono font-bold text-blue-600">
              &Sigma; {sfrCAY.a}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Faculty of Computer Science teaching Computer Science students.
          </p>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-xs">
            {sfrCAY.contributors.a.map((c) => (
              <div
                key={c.facultyId}
                className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60"
              >
                <span className="truncate pr-2">{c.facultyName}</span>
                <span className="font-mono font-semibold">{c.fraction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category b contributors */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Category b (External Faculty)
            </h3>
            <span className="text-xs font-mono font-bold text-indigo-600">
              &Sigma; {sfrCAY.b}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Faculty from other departments (Math, ECE, HSS) teaching this program.
          </p>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-xs">
            {sfrCAY.contributors.b.map((c) => (
              <div
                key={c.facultyId}
                className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60"
              >
                <span className="truncate pr-2">{c.facultyName}</span>
                <span className="font-mono font-semibold">{c.fraction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category c contributors */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">
              Category c (Outgoing)
            </h3>
            <span className="text-xs font-mono font-bold text-slate-500">
              &Sigma; {sfrCAY.c}
            </span>
          </div>
          <p className="text-xs text-slate-500 mb-3">
            Faculty of this department teaching in other programs (Excluded from F).
          </p>
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 text-xs">
            {sfrCAY.contributors.c.map((c) => (
              <div
                key={c.facultyId}
                className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60"
              >
                <span className="truncate pr-2">{c.facultyName}</span>
                <span className="font-mono font-semibold">{c.fraction}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
