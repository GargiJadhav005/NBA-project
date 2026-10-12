"use client";

import React, { useState } from "react";
import { appStore, StudentRecord } from "@/lib/data/mockStore";
import { GraduationCap, Save, Info, CheckCircle2 } from "lucide-react";

export default function StudentsPage() {
  const [students, setStudents] = useState<StudentRecord[]>(appStore.students);
  const [hasSaved, setHasSaved] = useState(false);

  const handleUpdate = (
    id: string,
    field: "sanctionedIntake" | "lateralEntryStudents",
    val: number
  ) => {
    const updated = students.map((s) => {
      if (s.id === id) {
        const sanctioned = field === "sanctionedIntake" ? val : s.sanctionedIntake;
        const lateral = field === "lateralEntryStudents" ? val : s.lateralEntryStudents;
        return {
          ...s,
          [field]: val,
          totalStudents: sanctioned + lateral,
        };
      }
      return s;
    });

    setStudents(updated);
    appStore.students = updated;
    setHasSaved(true);
    setTimeout(() => setHasSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-blue-600" />
            Student Enrollment Data (N)
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Maintain sanctioned intake and lateral entry numbers across assessment cycle years
          </p>
        </div>

        {hasSaved && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Changes Auto-Saved to Calculations
          </span>
        )}
      </div>

      {/* Info Notice */}
      <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-semibold text-sm mb-0.5">NBA Definition of N (Total Students):</p>
          <p className="text-blue-800/80 dark:text-blue-300/80">
            For Under Graduate Engineering programs, <strong>N = Total Sanctioned Intake + Lateral Entry Students</strong> across 2nd, 3rd, and 4th years of study under consideration. N is the numerator for the Student-Faculty Ratio (SFR = N / F) and determines required faculty F in the AUTOMATIC method (F = N / 25).
          </p>
        </div>
      </div>

      {/* Student Enrollment Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <th className="py-3 px-4 font-semibold">Academic Year</th>
                <th className="py-3 px-4 font-semibold">Program</th>
                <th className="py-3 px-4 font-semibold">Sanctioned Intake</th>
                <th className="py-3 px-4 font-semibold">Lateral Entry</th>
                <th className="py-3 px-4 font-semibold">Total Students (N)</th>
                <th className="py-3 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {students.map((s) => (
                <tr
                  key={s.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition"
                >
                  <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                    {s.academicYear}
                    {s.academicYear === "2025-26" && (
                      <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                        CAY (Current)
                      </span>
                    )}
                    {s.academicYear === "2024-25" && (
                      <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        CAYm1
                      </span>
                    )}
                    {s.academicYear === "2023-24" && (
                      <span className="ml-2 px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        CAYm2
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                    {s.program}
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={s.sanctionedIntake}
                      onChange={(e) =>
                        handleUpdate(
                          s.id,
                          "sanctionedIntake",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-right font-mono font-semibold"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <input
                      type="number"
                      value={s.lateralEntryStudents}
                      onChange={(e) =>
                        handleUpdate(
                          s.id,
                          "lateralEntryStudents",
                          parseInt(e.target.value) || 0
                        )
                      }
                      className="w-24 px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-right font-mono font-semibold"
                    />
                  </td>
                  <td className="py-3 px-4 font-mono font-extrabold text-sm text-blue-600 dark:text-blue-400">
                    {s.totalStudents}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
