"use client";

import React from "react";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { COURSES, PROGRAM_OUTCOMES, computePOAttainmentFromCourses } from "@/lib/data/nbaMockData";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  LineChart,
  Line,
  ReferenceLine,
} from "recharts";

export default function COPOEnginePage() {
  const poAttainment = computePOAttainmentFromCourses();

  // CO attainment per course
  const coAttainmentData = COURSES.map((c) => ({
    course: c.code,
    name: c.name,
    cos: c.courseOutcomes.map((co) => ({
      code: co.code,
      target: co.targetAttainment,
      actual: co.actualAttainment,
      met: co.actualAttainment >= co.targetAttainment,
    })),
    avgAttainment: Number(
      (c.courseOutcomes.reduce((s, co) => s + co.actualAttainment, 0) / c.courseOutcomes.length).toFixed(2)
    ),
    avgTarget: Number(
      (c.courseOutcomes.reduce((s, co) => s + co.targetAttainment, 0) / c.courseOutcomes.length).toFixed(2)
    ),
  }));

  const totalCOs = COURSES.reduce((s, c) => s + c.courseOutcomes.length, 0);
  const metCOs = COURSES.reduce(
    (s, c) => s + c.courseOutcomes.filter((co) => co.actualAttainment >= co.targetAttainment).length,
    0
  );
  const coAttainmentRate = Math.round((metCOs / totalCOs) * 100);

  const metPOs = poAttainment.filter((po) => po.actual >= po.target).length;
  const poAttainmentRate = Math.round((metPOs / 12) * 100);

  // Bar chart data for PO
  const poBarData = poAttainment.map((po) => ({
    ...po,
    gap: Number((po.target - po.actual).toFixed(2)),
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              Module 5
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            CO–PO Attainment Engine
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Automatically calculate CO attainment, derive PO attainment, and compare targets
          </p>
        </div>
        <Link
          href="/co-po-engine/gap-analysis"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition"
        >
          <AlertTriangle className="w-4 h-4" /> Gap Analysis <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">CO Attainment Rate</p>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{coAttainmentRate}%</p>
          <p className="text-xs text-slate-500 mt-1">{metCOs}/{totalCOs} COs met target</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">PO Attainment Rate</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{poAttainmentRate}%</p>
          <p className="text-xs text-slate-500 mt-1">{metPOs}/12 POs met target</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Total Courses</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{COURSES.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Total COs Mapped</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{totalCOs}</p>
        </div>
      </div>

      {/* PO Attainment Chart */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">
          PO Attainment: Target vs Actual
        </h2>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={poBarData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="poCode" tick={{ fontSize: 11 }} />
            <YAxis domain={[0, 3]} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
            <Legend wrapperStyle={{ fontSize: 12 }} />
            <Bar dataKey="target" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Target" />
            <Bar dataKey="actual" radius={[4, 4, 0, 0]} name="Actual">
              {poBarData.map((entry, i) => (
                <Cell key={i} fill={entry.actual >= entry.target ? "#22c55e" : "#f59e0b"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Course-wise CO Attainment */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">Course-wise CO Attainment</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-slate-50 dark:bg-slate-800/40">
                <th className="py-3 px-4 font-semibold">Course</th>
                <th className="py-3 px-4 font-semibold">CO</th>
                <th className="py-3 px-4 font-semibold text-center">Target</th>
                <th className="py-3 px-4 font-semibold text-center">Actual</th>
                <th className="py-3 px-4 font-semibold text-center">Gap</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {COURSES.flatMap((course) =>
                course.courseOutcomes.map((co, ci) => {
                  const gap = Number((co.targetAttainment - co.actualAttainment).toFixed(2));
                  return (
                    <tr key={co.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      {ci === 0 ? (
                        <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white" rowSpan={course.courseOutcomes.length}>
                          <span className="font-bold text-indigo-600">{course.code}</span>
                          <br />
                          <span className="text-[10px] text-slate-500">{course.name}</span>
                        </td>
                      ) : null}
                      <td className="py-2.5 px-4">
                        <span className="font-bold">{co.code}</span>
                        <span className="text-slate-500 ml-1 truncate">{co.description.substring(0, 40)}…</span>
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono font-bold">{co.targetAttainment}</td>
                      <td className="py-2.5 px-4 text-center font-mono font-bold">
                        <span className={co.actualAttainment >= co.targetAttainment ? "text-emerald-600" : "text-amber-600"}>
                          {co.actualAttainment}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-center font-mono">
                        {gap > 0 ? (
                          <span className="text-red-600">-{gap}</span>
                        ) : (
                          <span className="text-emerald-600">+{Math.abs(gap)}</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-center">
                        {co.actualAttainment >= co.targetAttainment ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                        ) : (
                          <AlertTriangle className="w-4 h-4 text-amber-600 mx-auto" />
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
