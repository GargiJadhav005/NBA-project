"use client";

import React, { useState } from "react";
import {
  BarChart3,
  Search,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
} from "lucide-react";
import { STUDENT_RESULTS, COURSES } from "@/lib/data/nbaMockData";
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
  PieChart,
  Pie,
  LineChart,
  Line,
} from "recharts";

export default function StudentAnalyticsPage() {
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredResults = STUDENT_RESULTS.filter((r) => {
    if (selectedCourse !== "ALL" && r.courseId !== selectedCourse) return false;
    if (searchTerm && !r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) && !r.rollNumber.includes(searchTerm))
      return false;
    return true;
  });

  // Grade distribution
  const gradeMap: Record<string, number> = {};
  filteredResults.forEach((r) => {
    gradeMap[r.grade] = (gradeMap[r.grade] || 0) + 1;
  });
  const gradeData = ["O", "A+", "A", "B+", "B", "C", "F"]
    .filter((g) => gradeMap[g])
    .map((g) => ({ grade: g, count: gradeMap[g] || 0 }));

  const gradeColors: Record<string, string> = {
    O: "#22c55e", "A+": "#3b82f6", A: "#6366f1", "B+": "#8b5cf6",
    B: "#f59e0b", C: "#f97316", F: "#ef4444",
  };

  // Course-wise average
  const courseAvg = COURSES.map((c) => {
    const courseResults = STUDENT_RESULTS.filter((r) => r.courseId === c.id);
    const avg = courseResults.length > 0
      ? Math.round(courseResults.reduce((s, r) => s + r.totalMarks, 0) / courseResults.length)
      : 0;
    return { course: c.code, avg, name: c.name };
  });

  // Attendance distribution
  const attendanceRanges = [
    { range: "90-100%", count: 0 },
    { range: "80-89%", count: 0 },
    { range: "70-79%", count: 0 },
    { range: "<70%", count: 0 },
  ];
  filteredResults.forEach((r) => {
    if (r.attendance >= 90) attendanceRanges[0].count++;
    else if (r.attendance >= 80) attendanceRanges[1].count++;
    else if (r.attendance >= 70) attendanceRanges[2].count++;
    else attendanceRanges[3].count++;
  });

  // Weak students (total < 50)
  const weakStudents = filteredResults.filter((r) => r.totalMarks < 50);

  // Stats
  const avgTotal = filteredResults.length > 0
    ? Math.round(filteredResults.reduce((s, r) => s + r.totalMarks, 0) / filteredResults.length)
    : 0;
  const avgAttendance = filteredResults.length > 0
    ? Math.round(filteredResults.reduce((s, r) => s + r.attendance, 0) / filteredResults.length)
    : 0;
  const passRate = filteredResults.length > 0
    ? Math.round((filteredResults.filter((r) => r.totalMarks >= 40).length / filteredResults.length) * 100)
    : 0;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
            Module 4
          </span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Student Performance Analytics
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Examination results, attendance tracking, and weak-subject identification
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Avg Score</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{avgTotal}%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Avg Attendance</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{avgAttendance}%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Pass Rate</p>
          <p className="text-3xl font-bold text-emerald-600 mt-2">{passRate}%</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <p className="text-xs text-slate-500 font-medium">Weak Students</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{weakStudents.length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or roll number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        >
          <option value="ALL">All Courses</option>
          {COURSES.map((c) => (
            <option key={c.id} value={c.id}>{c.code} – {c.name}</option>
          ))}
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Grade Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} name="Students">
                {gradeData.map((entry, i) => (
                  <Cell key={i} fill={gradeColors[entry.grade] || "#6366f1"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Course-wise Average */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
          <h2 className="text-base font-bold text-slate-900 dark:text-white mb-4">Course-wise Average Score</h2>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={courseAvg} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="course" type="category" tick={{ fontSize: 11 }} width={60} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 12 }} />
              <Bar dataKey="avg" fill="#06b6d4" radius={[0, 6, 6, 0]} name="Avg Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 dark:text-white">Student Results</h2>
          <span className="text-xs text-slate-500">{filteredResults.length} records</span>
        </div>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="sticky top-0 bg-slate-50 dark:bg-slate-800/80">
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500">
                <th className="py-3 px-4 font-semibold">Roll No.</th>
                <th className="py-3 px-4 font-semibold">Name</th>
                <th className="py-3 px-4 font-semibold">Course</th>
                <th className="py-3 px-4 font-semibold text-center">Internal</th>
                <th className="py-3 px-4 font-semibold text-center">External</th>
                <th className="py-3 px-4 font-semibold text-center">Total</th>
                <th className="py-3 px-4 font-semibold text-center">Grade</th>
                <th className="py-3 px-4 font-semibold text-center">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredResults.slice(0, 50).map((r) => (
                <tr key={r.id} className={`hover:bg-slate-50/50 dark:hover:bg-slate-800/40 ${r.totalMarks < 50 ? "bg-red-50/30 dark:bg-red-950/10" : ""}`}>
                  <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-400">{r.rollNumber}</td>
                  <td className="py-2.5 px-4 font-medium text-slate-900 dark:text-white">{r.studentName}</td>
                  <td className="py-2.5 px-4 text-slate-600 dark:text-slate-400">{r.courseCode}</td>
                  <td className="py-2.5 px-4 text-center font-mono">{r.internalMarks}/40</td>
                  <td className="py-2.5 px-4 text-center font-mono">{r.externalMarks}/60</td>
                  <td className="py-2.5 px-4 text-center font-mono font-bold">{r.totalMarks}</td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      r.grade === "O" || r.grade === "A+" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                      : r.grade === "F" ? "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400"
                    }`}>
                      {r.grade}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center">
                    <span className={`font-mono font-semibold ${r.attendance < 75 ? "text-red-600" : "text-slate-600 dark:text-slate-400"}`}>
                      {r.attendance}%
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
