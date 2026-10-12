"use client";

import React from "react";
import {
  Target,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { PROGRAM_OUTCOMES, computePOAttainmentFromCourses } from "@/lib/data/nbaMockData";
import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ReferenceLine,
} from "recharts";

export default function POManagementPage() {
  const poAttainment = computePOAttainmentFromCourses();

  const radarData = PROGRAM_OUTCOMES.map((po, i) => ({
    po: po.code,
    target: po.targetAttainment,
    actual: poAttainment[i]?.actual ?? po.actualAttainment,
  }));

  const barData = PROGRAM_OUTCOMES.map((po, i) => ({
    po: po.code,
    target: po.targetAttainment,
    actual: poAttainment[i]?.actual ?? po.actualAttainment,
    gap: Number((po.targetAttainment - (poAttainment[i]?.actual ?? po.actualAttainment)).toFixed(2)),
  }));

  const metCount = barData.filter((d) => d.actual >= d.target).length;
  const belowCount = barData.filter((d) => d.actual < d.target).length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
              Module 2
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Program Outcomes (PO) Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            PO1–PO12 attainment tracking, gap analysis, and CO–PO mapping overview
          </p>
        </div>
        <Link
          href="/po-management/co-po-mapping"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 shadow-sm transition"
        >
          <Target className="w-4 h-4" /> CO–PO Matrix
        </Link>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/60">
              <Target className="w-5 h-5 text-teal-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">12</p>
              <p className="text-xs text-slate-500">Program Outcomes</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">{metCount}</p>
              <p className="text-xs text-slate-500">POs meeting target</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/60">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{belowCount}</p>
              <p className="text-xs text-slate-500">POs below target</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Radar Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            PO Attainment Radar
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarData}>
              <PolarGrid strokeDasharray="3 3" />
              <PolarAngleAxis dataKey="po" tick={{ fontSize: 11 }} />
              <PolarRadiusAxis domain={[0, 3]} tick={{ fontSize: 10 }} />
              <Radar name="Target" dataKey="target" stroke="#14b8a6" fill="#14b8a6" fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Actual" dataKey="actual" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} strokeWidth={2} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
            Target vs Actual Attainment
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="po" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 3]} tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="target" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Target" />
              <Bar dataKey="actual" radius={[4, 4, 0, 0]} name="Actual">
                {barData.map((entry, i) => (
                  <Cell key={i} fill={entry.actual >= entry.target ? "#22c55e" : "#f59e0b"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* PO Details Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-slate-50 dark:bg-slate-800/40">
                <th className="py-3 px-4 font-semibold">PO</th>
                <th className="py-3 px-4 font-semibold">Title</th>
                <th className="py-3 px-4 font-semibold">Description</th>
                <th className="py-3 px-4 font-semibold text-center">Target</th>
                <th className="py-3 px-4 font-semibold text-center">Actual</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {PROGRAM_OUTCOMES.map((po, i) => {
                const actual = poAttainment[i]?.actual ?? po.actualAttainment;
                const met = actual >= po.targetAttainment;
                return (
                  <tr key={po.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 rounded text-xs font-bold bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-400">
                        {po.code}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{po.title}</td>
                    <td className="py-3 px-4 text-slate-500 max-w-[300px] truncate">{po.description}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold">{po.targetAttainment}</td>
                    <td className="py-3 px-4 text-center font-mono font-bold">{actual}</td>
                    <td className="py-3 px-4 text-center">
                      {met ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" /> Met
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400">
                          <TrendingDown className="w-3 h-3" /> Below
                        </span>
                      )}
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
