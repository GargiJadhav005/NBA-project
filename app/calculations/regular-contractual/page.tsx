"use client";

import React from "react";
import { appStore } from "@/lib/data/mockStore";
import {
  Users,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function RegularContractualPage() {
  const result = appStore.computeRegularContractual();
  const total = result.regularCount + result.contractualCount;
  const regularPct = total > 0 ? Math.round((result.regularCount / total) * 100) : 0;
  const contractualPct = 100 - regularPct;

  const isCompliant = regularPct >= 75;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            Criterion 5.2 &amp; Cadre
          </span>
          <span className="text-xs text-slate-500 font-medium">
            NBA Accreditation Assessment
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-emerald-600" />
          Regular vs. Contractual Faculty
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Validation of NBA requirement ensuring permanent cadre stability and regular appointment ratio
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Total Faculty</span>
          <div className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {total}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Computer Science &amp; Engg.
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Regular Faculty</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">
            {result.regularCount}{" "}
            <span className="text-sm font-semibold text-emerald-700">
              ({regularPct}%)
            </span>
          </div>
          <span className="text-xs text-emerald-600 mt-1 block font-medium">
            Permanent Cadre
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Contractual Faculty</span>
          <div className="text-3xl font-extrabold text-amber-600 mt-2">
            {result.contractualCount}{" "}
            <span className="text-sm font-semibold text-amber-700">
              ({contractualPct}%)
            </span>
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Adjunct / Term basis
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">NBA Cadre Compliance</span>
          <div className="text-lg font-bold text-slate-900 dark:text-white mt-2.5 flex items-center gap-2">
            {isCompliant ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-600">&ge; 75% Compliant</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span className="text-rose-600">Below Threshold</span>
              </>
            )}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            NBA Requirement: &ge; 75% Regular
          </span>
        </div>
      </div>

      {/* Visual Percentage Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-2">
          Cadre Composition Breakdown
        </h2>
        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
          <div
            style={{ width: `${regularPct}%` }}
            className="bg-emerald-600 h-full transition-all duration-500"
          ></div>
          <div
            style={{ width: `${contractualPct}%` }}
            className="bg-amber-500 h-full transition-all duration-500"
          ></div>
        </div>
        <div className="flex justify-between items-center text-xs mt-2 text-slate-500">
          <span className="flex items-center gap-1.5 font-medium text-emerald-600">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            Regular Faculty ({regularPct}%)
          </span>
          <span className="flex items-center gap-1.5 font-medium text-amber-600">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
            Contractual Faculty ({contractualPct}%)
          </span>
        </div>
      </div>

      {/* Roster comparison grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Regular List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Regular Faculty Roster ({result.regularCount})
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Permanent
            </span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
            {result.regularFaculty.map((f, i) => (
              <div
                key={f.facultyId}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px] w-5">
                    {i + 1}.
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {f.facultyName}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                  Confirmed
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contractual List */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600" />
              Contractual Faculty Roster ({result.contractualCount})
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
              Contract / Adjunct
            </span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1 text-xs">
            {result.contractualFaculty.map((f, i) => (
              <div
                key={f.facultyId}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60"
              >
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-mono text-[11px] w-5">
                    {i + 1}.
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {f.facultyName}
                  </span>
                </div>
                <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                  Term Appointed
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
