"use client";

import React, { useState } from "react";
import { appStore } from "@/lib/data/mockStore";
import {
  Award,
  Calculator,
  HelpCircle,
  CheckCircle2,
  FileText,
  Sliders,
} from "lucide-react";

export default function FQIPage() {
  const [fMethod, setFMethod] = useState<"INSTITUTIONAL" | "AUTOMATIC">(
    "INSTITUTIONAL"
  );
  const [institutionalF, setInstitutionalF] = useState<number>(23);

  const fqi = appStore.computeFQI("2025-26", fMethod, institutionalF);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            Criterion 5.3
          </span>
          <span className="text-xs text-slate-500 font-medium">
            NBA Accreditation Assessment
          </span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-6 h-6 text-indigo-600" />
          Faculty Qualification Index (FQI)
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">
          Pure calculation engine assessing doctoral (X) and post-graduate (Y) qualifications
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">FQI Score (FQ)</span>
          <div className="text-3xl font-extrabold text-indigo-600 mt-2">
            {fqi.FQ} <span className="text-sm font-medium text-slate-400">/ 20</span>
          </div>
          <span className="text-xs text-emerald-600 mt-1 block font-medium">
            High accreditation rating
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Ph.D. Faculty (X)</span>
          <div className="text-3xl font-extrabold text-purple-600 mt-2">
            {fqi.X}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            10 &times; {fqi.X} = {fqi.tenX} points
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">M.Tech / M.E. Faculty (Y)</span>
          <div className="text-3xl font-extrabold text-blue-600 mt-2">
            {fqi.Y}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            7 &times; {fqi.Y} = {fqi.sevenY} points
          </span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs text-slate-500 font-medium">Required Faculty (F)</span>
          <div className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mt-2">
            {fqi.F}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">
            Method: {fqi.fMethod}
          </span>
        </div>
      </div>

      {/* Formula & Method Selection Box */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-indigo-600" />
              Mathematical Formula &amp; Substitution
            </h2>
            <p className="text-xs text-slate-500">
              Prescribed formula: <strong>FQ = 2.0 &times; (10X + 7Y) / F</strong>
            </p>
          </div>

          {/* Method selector */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 font-medium">F Calculation:</span>
            <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
              <button
                onClick={() => setFMethod("INSTITUTIONAL")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  fMethod === "INSTITUTIONAL"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500"
                }`}
              >
                Institutional F ({institutionalF})
              </button>
              <button
                onClick={() => setFMethod("AUTOMATIC")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  fMethod === "AUTOMATIC"
                    ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs"
                    : "text-slate-500"
                }`}
              >
                Automatic (N / 25)
              </button>
            </div>
          </div>
        </div>

        {/* Step-by-Step Mathematical Walkthrough */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-700/60 font-mono text-xs space-y-2">
          <div className="text-slate-500">1. Formula Definition:</div>
          <div className="font-bold text-indigo-600 dark:text-indigo-400">
            {fqi.formula}
          </div>

          <div className="text-slate-500 pt-2">2. Parameter Value Substitution:</div>
          <div className="text-slate-800 dark:text-slate-200">
            {fqi.substitution}
          </div>

          <div className="text-slate-500 pt-2">3. Intermediate Calculation:</div>
          <div className="text-slate-800 dark:text-slate-200">
            FQ = 2.0 &times; ({fqi.tenX} + {fqi.sevenY}) / {fqi.F} = 2.0 &times; {fqi.sum} / {fqi.F} = {(2.0 * fqi.sum).toFixed(2)} / {fqi.F}
          </div>

          <div className="text-slate-500 pt-2">4. Final Rounded Result:</div>
          <div className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
            FQ = {fqi.FQ}
          </div>
        </div>
      </div>

      {/* Roster of Classified Faculty */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ph.D. Holders (X) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
              Category X: Ph.D. Faculty ({fqi.X})
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
              Weight: 10 pts
            </span>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1 text-xs">
            {fqi.classifiedFaculty
              .filter((f) => f.classification === "X")
              .map((f, i) => (
                <div
                  key={f.facultyId}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {i + 1}. {f.facultyName}
                  </span>
                  <span className="text-[11px] text-purple-700 dark:text-purple-400 font-semibold">
                    {f.qualification}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* M.Tech Holders (Y) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
              Category Y: Post-Graduate Faculty ({fqi.Y})
            </h3>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              Weight: 7 pts
            </span>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1 text-xs">
            {fqi.classifiedFaculty
              .filter((f) => f.classification === "Y")
              .map((f, i) => (
                <div
                  key={f.facultyId}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60"
                >
                  <span className="font-medium text-slate-800 dark:text-slate-200">
                    {i + 1}. {f.facultyName}
                  </span>
                  <span className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold">
                    {f.qualification}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
