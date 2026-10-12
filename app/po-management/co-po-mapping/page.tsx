"use client";

import React, { useState } from "react";
import { COURSES, PROGRAM_OUTCOMES } from "@/lib/data/nbaMockData";

export default function COPOMappingPage() {
  const [selectedCourse, setSelectedCourse] = useState(COURSES[0].id);
  const course = COURSES.find((c) => c.id === selectedCourse) || COURSES[0];

  const levelColor = (level: number) => {
    if (level === 3) return "bg-emerald-600 text-white";
    if (level === 2) return "bg-blue-500 text-white";
    if (level === 1) return "bg-amber-400 text-slate-900";
    return "bg-slate-100 dark:bg-slate-800 text-slate-400";
  };

  const levelLabel = (level: number) => {
    if (level === 3) return "3";
    if (level === 2) return "2";
    if (level === 1) return "1";
    return "—";
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 dark:bg-teal-950 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
            Module 2
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          CO–PO Mapping Matrix
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Articulation matrix showing the correlation between Course Outcomes and Program Outcomes
        </p>
      </div>

      {/* Course Selector */}
      <div className="flex items-center gap-4">
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Select Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
        >
          {COURSES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.code} – {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 text-xs">
        <span className="font-semibold text-slate-600 dark:text-slate-400">Correlation Level:</span>
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 rounded flex items-center justify-center bg-emerald-600 text-white font-bold">3</span>
          <span className="text-slate-500">High</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 rounded flex items-center justify-center bg-blue-500 text-white font-bold">2</span>
          <span className="text-slate-500">Medium</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 rounded flex items-center justify-center bg-amber-400 text-slate-900 font-bold">1</span>
          <span className="text-slate-500">Low</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-6 h-6 rounded flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-400 font-bold">—</span>
          <span className="text-slate-500">No correlation</span>
        </div>
      </div>

      {/* Mapping Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="font-bold text-slate-900 dark:text-white">
            {course.code}: {course.name}
          </h2>
          <p className="text-xs text-slate-500">
            Faculty: {course.facultyName} • Semester {course.semester} • {course.credits} Credits
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-center text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
                <th className="py-3 px-4 text-left font-semibold text-slate-500 min-w-[200px]">Course Outcome</th>
                <th className="py-3 px-2 font-semibold text-slate-500">Bloom&apos;s</th>
                <th className="py-3 px-2 font-semibold text-slate-500">Target</th>
                <th className="py-3 px-2 font-semibold text-slate-500">Actual</th>
                {PROGRAM_OUTCOMES.map((po) => (
                  <th key={po.id} className="py-3 px-1 font-semibold text-slate-500 min-w-[40px]">
                    {po.code}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {course.courseOutcomes.map((co) => (
                <tr key={co.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                  <td className="py-3 px-4 text-left">
                    <span className="font-bold text-slate-800 dark:text-white">{co.code}: </span>
                    <span className="text-slate-600 dark:text-slate-400">{co.description}</span>
                  </td>
                  <td className="py-3 px-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      {co.bloomLevel}
                    </span>
                  </td>
                  <td className="py-3 px-2 font-mono font-bold text-slate-700 dark:text-slate-300">{co.targetAttainment}</td>
                  <td className="py-3 px-2 font-mono font-bold">
                    <span className={co.actualAttainment >= co.targetAttainment ? "text-emerald-600" : "text-amber-600"}>
                      {co.actualAttainment}
                    </span>
                  </td>
                  {co.poMapping.map((level, pi) => (
                    <td key={pi} className="py-3 px-1">
                      <span className={`inline-flex w-7 h-7 rounded items-center justify-center text-[11px] font-bold ${levelColor(level)}`}>
                        {levelLabel(level)}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
