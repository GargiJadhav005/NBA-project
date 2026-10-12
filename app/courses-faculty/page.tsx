"use client";

import React, { useState } from "react";
import {
  BookOpen,
  Users,
  Search,
  GraduationCap,
  Layers,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { COURSES } from "@/lib/data/nbaMockData";
import { appStore } from "@/lib/data/mockStore";

export default function CoursesFacultyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSemester, setFilterSemester] = useState<string>("ALL");

  const filtered = COURSES.filter((c) => {
    if (searchTerm && !c.name.toLowerCase().includes(searchTerm.toLowerCase()) && !c.code.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    if (filterSemester !== "ALL" && c.semester !== parseInt(filterSemester)) return false;
    return true;
  });

  const semesters = [...new Set(COURSES.map((c) => c.semester))].sort();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300 border border-orange-200 dark:border-orange-800">
              Module 3
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Courses & Faculty Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Course catalog, faculty allocation, and course outcome management
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/faculty"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition"
          >
            <Users className="w-4 h-4 text-blue-600" /> Faculty Roster
          </Link>
          <Link
            href="/teaching-load"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition"
          >
            <Layers className="w-4 h-4 text-indigo-600" /> Teaching Load
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-50 dark:bg-orange-950/60">
              <BookOpen className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{COURSES.length}</p>
              <p className="text-xs text-slate-500">Total Courses</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{appStore.faculty.length}</p>
              <p className="text-xs text-slate-500">Total Faculty</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/60">
              <GraduationCap className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {COURSES.reduce((s, c) => s + c.credits, 0)}
              </p>
              <p className="text-xs text-slate-500">Total Credits</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60">
              <Layers className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {COURSES.reduce((s, c) => s + c.courseOutcomes.length, 0)}
              </p>
              <p className="text-xs text-slate-500">Course Outcomes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <select
          value={filterSemester}
          onChange={(e) => setFilterSemester(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm"
        >
          <option value="ALL">All Semesters</option>
          {semesters.map((s) => (
            <option key={s} value={s}>Semester {s}</option>
          ))}
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs p-5 hover:shadow-md transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-400">
                    {course.code}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    Sem {course.semester}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                    {course.credits} Cr
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white">{course.name}</h3>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                course.type === "THEORY" ? "bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300"
                : course.type === "LAB" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-300"
              }`}>
                {course.type}
              </span>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              <span className="font-semibold">Faculty:</span> {course.facultyName}
            </p>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Course Outcomes ({course.courseOutcomes.length})
              </p>
              {course.courseOutcomes.map((co) => (
                <div
                  key={co.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-orange-600">{co.code}</span>
                    <span className="text-[11px] text-slate-600 dark:text-slate-400 truncate max-w-[200px]">
                      {co.description}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono font-bold ${
                    co.actualAttainment >= co.targetAttainment ? "text-emerald-600" : "text-amber-600"
                  }`}>
                    {co.actualAttainment}/{co.targetAttainment}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
