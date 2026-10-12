"use client";

import React, { useState } from "react";
import {
  Award,
  CheckCircle2,
  AlertCircle,
  Clock,
  ChevronRight,
  FileText,
  Search,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { NBA_CRITERIA, EVIDENCE_DOCUMENTS } from "@/lib/data/nbaMockData";

export default function NBACriteriaPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  const totalMax = NBA_CRITERIA.reduce((s, c) => s + c.maxMarks, 0);
  const totalScored = NBA_CRITERIA.reduce((s, c) => s + c.scored, 0);
  const overallPercent = Math.round((totalScored / totalMax) * 100);

  const totalSub = NBA_CRITERIA.reduce((s, c) => s + c.subCriteria.length, 0);
  const completeSub = NBA_CRITERIA.reduce(
    (s, c) => s + c.subCriteria.filter((sc) => sc.status === "COMPLETE").length,
    0
  );
  const pendingSub = NBA_CRITERIA.reduce(
    (s, c) => s + c.subCriteria.filter((sc) => sc.status === "PENDING").length,
    0
  );
  const partialSub = totalSub - completeSub - pendingSub;

  const filteredCriteria = NBA_CRITERIA.filter((c) => {
    if (searchTerm && !c.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (filterStatus === "ALL") return true;
    return c.subCriteria.some((sc) => sc.status === filterStatus);
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Module 1
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            NBA Criteria Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Track all 10 NBA criteria, sub-criteria completion, and evidence status
          </p>
        </div>
        <Link
          href="/nba-criteria/evidence"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
        >
          <FileText className="w-4 h-4" /> Evidence Repository
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Overall Score</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              {totalScored}
            </span>
            <span className="text-sm text-slate-500">/ {totalMax}</span>
          </div>
          <div className="mt-3 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
          <p className="text-xs text-slate-500 mt-1">{overallPercent}% achieved</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Complete Sub-Criteria</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-3xl font-bold text-emerald-600">{completeSub}</div>
          <p className="text-xs text-slate-500 mt-1">of {totalSub} sub-criteria</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Partial</span>
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-3xl font-bold text-amber-600">{partialSub}</div>
          <p className="text-xs text-slate-500 mt-1">need more evidence</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium">
            <span>Pending</span>
            <span className="p-2 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3 text-3xl font-bold text-red-600">{pendingSub}</div>
          <p className="text-xs text-slate-500 mt-1">no evidence uploaded</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search criteria..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2">
          {["ALL", "COMPLETE", "PARTIAL", "PENDING"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                filterStatus === s
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Criteria List */}
      <div className="space-y-4">
        {filteredCriteria.map((criterion) => {
          const pct = Math.round((criterion.scored / criterion.maxMarks) * 100);
          const evidenceCount = criterion.subCriteria.reduce(
            (s, sc) => s + sc.evidenceIds.length,
            0
          );
          return (
            <div
              key={criterion.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm ${
                        pct >= 80
                          ? "bg-gradient-to-br from-emerald-500 to-emerald-700"
                          : pct >= 60
                          ? "bg-gradient-to-br from-amber-500 to-amber-700"
                          : "bg-gradient-to-br from-red-500 to-red-700"
                      }`}
                    >
                      {criterion.number}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                        Criterion {criterion.number}: {criterion.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {criterion.subCriteria.length} sub-criteria • {evidenceCount} evidence documents
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {criterion.scored}
                    </span>
                    <span className="text-sm text-slate-500"> / {criterion.maxMarks}</span>
                    <p className={`text-xs font-semibold ${pct >= 80 ? "text-emerald-600" : pct >= 60 ? "text-amber-600" : "text-red-600"}`}>
                      {pct}%
                    </p>
                  </div>
                </div>

                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mb-4">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500"
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Sub-criteria */}
                <div className="space-y-2">
                  {criterion.subCriteria.map((sc) => (
                    <div
                      key={sc.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                    >
                      <div className="flex items-center gap-3">
                        {sc.status === "COMPLETE" ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        ) : sc.status === "PARTIAL" ? (
                          <Clock className="w-4 h-4 text-amber-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                        <div>
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {sc.code}
                          </span>
                          <span className="text-xs text-slate-500 ml-2">{sc.title}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                          {sc.scored}/{sc.maxMarks}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            sc.status === "COMPLETE"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                              : sc.status === "PARTIAL"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400"
                              : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"
                          }`}
                        >
                          {sc.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
