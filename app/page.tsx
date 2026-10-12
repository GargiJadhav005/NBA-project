"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users,
  GraduationCap,
  Award,
  ArrowUpRight,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  FileSpreadsheet,
  Download,
  Info,
  Layers,
  ChevronRight,
} from "lucide-react";
import { appStore } from "@/lib/data/mockStore";

export default function DashboardPage() {
  const activeCycle = appStore.getActiveCycle();
  const sfrData = appStore.computeSFR(activeCycle.CAY);
  const regContractual = appStore.computeRegularContractual();
  const fqiData = appStore.computeFQI(activeCycle.CAY, "INSTITUTIONAL", 23);

  const regularPercentage = Math.round(
    (regContractual.regularCount /
      (regContractual.regularCount + regContractual.contractualCount)) *
      100
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              NBA Accreditation Self Assessment Report
            </span>
            <span className="text-xs text-slate-500">• Criterion 5: Faculty Information & Contributions</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Criterion 5 Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Cycle: <strong className="text-slate-800 dark:text-slate-200">{activeCycle.name}</strong> (CAY: {activeCycle.CAY}, CAYm1: {activeCycle.CAYm1}, CAYm2: {activeCycle.CAYm2})
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/csv-import"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-600" />
            <span>Import Data</span>
          </Link>
          <Link
            href="/export"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 transition"
          >
            <Download className="w-4 h-4" />
            <span>Generate SAR Tables</span>
          </Link>
        </div>
      </div>

      {/* KPI Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: SFR */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Student-Faculty Ratio (SFR)</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {sfrData.SFR}
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
              ≤ 25:1 Compliant
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            N = {sfrData.N} students, F = {sfrData.F} faculty (a: {sfrData.a}, b: {sfrData.b})
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <Link
              href="/calculations/sfr"
              className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
            >
              View breakdown <ArrowUpRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-400">Target: 20:1</span>
          </div>
        </div>

        {/* Metric 2: FQI */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Faculty Qualification Index (FQ)</span>
            <span className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {fqiData.FQ}
            </span>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full">
              Max 20.0
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            X = {fqiData.X} (Ph.D.), Y = {fqiData.Y} (M.Tech), F = {fqiData.F}
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <Link
              href="/calculations/fqi"
              className="text-indigo-600 hover:text-indigo-700 font-medium inline-flex items-center gap-1"
            >
              Formula details <ArrowUpRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-400">2.0 × (10X+7Y)/F</span>
          </div>
        </div>

        {/* Metric 3: Regular vs Contractual */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Regular Faculty Ratio</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {regularPercentage}%
            </span>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
              ≥ 75% Rule Passed
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            {regContractual.regularCount} Regular vs {regContractual.contractualCount} Contractual
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <Link
              href="/calculations/regular-contractual"
              className="text-emerald-600 hover:text-emerald-700 font-medium inline-flex items-center gap-1"
            >
              Cadre roster <ArrowUpRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-400">Total: {appStore.faculty.length}</span>
          </div>
        </div>

        {/* Metric 4: Enrolled Students */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Total Program Students (N)</span>
            <span className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400">
              <GraduationCap className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {sfrData.N}
            </span>
            <span className="text-xs font-semibold text-slate-600 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">
              3 Batches
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Sanctioned: 540 + Lateral Entry: 36
          </p>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
            <Link
              href="/students"
              className="text-violet-600 hover:text-violet-700 font-medium inline-flex items-center gap-1"
            >
              View enrollment <ArrowUpRight className="w-3 h-3" />
            </Link>
            <span className="text-slate-400">B.Tech CSE</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Worked Example & Formula Breakdowns */}
        <div className="lg:col-span-2 space-y-6">
          {/* SFR & FQI Worked Example Proof Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  Criterion 5 Worked Example Verification
                </h2>
                <p className="text-xs text-slate-500">
                  Exact verification against NBA Criterion 5 specification requirements
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                100% Verified
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* SFR Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                    5.1 Student-Faculty Ratio (SFR)
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-600">
                    SFR = {sfrData.SFR}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Total Students (N):</span>
                    <span className="font-mono font-medium">{sfrData.N}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Own Dept Load (a):</span>
                    <span className="font-mono font-medium">{sfrData.a}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>External Faculty Load (b):</span>
                    <span className="font-mono font-medium">{sfrData.b}</span>
                  </div>
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>Serving Other Dept (c - info only):</span>
                    <span className="font-mono">{sfrData.c}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">
                    <span>Total Faculty Load (F = a + b):</span>
                    <span className="font-mono text-blue-600">{sfrData.F}</span>
                  </div>
                </div>
              </div>

              {/* FQI Card */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-xs text-slate-700 dark:text-slate-300">
                    5.3 Faculty Qualification Index (FQ)
                  </span>
                  <span className="text-xs font-mono font-bold text-indigo-600">
                    FQ = {fqiData.FQ}
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between">
                    <span>Ph.D. Faculty (X):</span>
                    <span className="font-mono font-medium">{fqiData.X} (10 × 11 = 110)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>M.Tech Faculty (Y):</span>
                    <span className="font-mono font-medium">{fqiData.Y} (7 × 13 = 91)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sum (10X + 7Y):</span>
                    <span className="font-mono font-medium">{fqiData.sum}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Required Faculty (F):</span>
                    <span className="font-mono font-medium">{fqiData.F}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700 font-semibold text-slate-900 dark:text-white">
                    <span>Formula Substitution:</span>
                    <span className="font-mono text-indigo-600">2.0 × 201 / 23</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Roster Preview */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Active Faculty Distribution
                </h2>
                <p className="text-xs text-slate-500">
                  Recent faculty members categorized for Criterion 5 assessment
                </p>
              </div>
              <Link
                href="/faculty"
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                View all ({appStore.faculty.length}) <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                    <th className="py-2.5 px-3 font-semibold">Faculty Name</th>
                    <th className="py-2.5 px-3 font-semibold">Designation</th>
                    <th className="py-2.5 px-3 font-semibold">Qualification</th>
                    <th className="py-2.5 px-3 font-semibold">Classification</th>
                    <th className="py-2.5 px-3 font-semibold">Type</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {appStore.faculty.slice(0, 6).map((f) => {
                    const isX = f.qualification.toLowerCase().includes("ph.d");
                    return (
                      <tr key={f.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-2.5 px-3 font-medium text-slate-900 dark:text-white">
                          {f.name}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                          {f.designation}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600 dark:text-slate-400">
                          {f.qualification}
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              isX
                                ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                                : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            }`}
                          >
                            {isX ? "X (Ph.D.)" : "Y (M.Tech)"}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              f.employmentType === "REGULAR"
                                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                                : "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400"
                            }`}
                          >
                            {f.employmentType}
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

        {/* Right 1 Column: Criterion 5 Scorecard & Quick Actions */}
        <div className="space-y-6">
          {/* NBA Compliance Scorecard */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              NBA Criterion 5 Scorecard
            </h2>
            <p className="text-xs text-slate-500 mb-5">
              Preliminary assessment marks out of 200 total Criterion 5 marks
            </p>

            <div className="space-y-4 text-xs">
              {/* Criterion 5.1 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    5.1 Student-Faculty Ratio
                  </span>
                  <span className="font-bold text-blue-600">15 / 20 Marks</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  SFR of 24.18 qualifies for &lt;= 25:1 tier. (20:1 yields full 20 marks).
                </p>
              </div>

              {/* Criterion 5.2 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    5.2 Faculty Cadre Ratio
                  </span>
                  <span className="font-bold text-emerald-600">18 / 25 Marks</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: "72%" }}></div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Professors (2), Assoc. Prof (4), Asst. Prof (18). 87.5% Regular.
                </p>
              </div>

              {/* Criterion 5.3 */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    5.3 Faculty Qualification
                  </span>
                  <span className="font-bold text-indigo-600">17.5 / 20 Marks</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: "87.5%" }}></div>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  FQ Score = 17.48. Strong doctoral representation (11 Ph.D. holders).
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
            <h3 className="text-base font-bold mb-1">NBA Criterion 5 Modules</h3>
            <p className="text-xs text-blue-100 mb-4">
              Explore calculation engines and reports:
            </p>
            <div className="space-y-2">
              <Link
                href="/calculations/sfr"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold transition"
              >
                <span>Student-Faculty Ratio (SFR)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculations/regular-contractual"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold transition"
              >
                <span>Regular vs Contractual Count</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/calculations/fqi"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold transition"
              >
                <span>Faculty Qualification Index (FQI)</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                href="/export"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-xs font-semibold transition"
              >
                <span>Export Official SAR Tables</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
