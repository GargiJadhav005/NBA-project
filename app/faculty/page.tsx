"use client";

import React, { useState } from "react";
import { appStore, FacultyRecord } from "@/lib/data/mockStore";
import {
  Users,
  Search,
  Filter,
  Plus,
  GraduationCap,
  Briefcase,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

export default function FacultyPage() {
  const [facultyList, setFacultyList] = useState<FacultyRecord[]>(appStore.faculty);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("ALL");
  const [filterQual, setFilterQual] = useState<string>("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Faculty Form State
  const [formData, setFormData] = useState({
    facultyCode: "",
    name: "",
    qualification: "Ph.D. in Computer Science",
    designation: "Assistant Professor",
    specialization: "",
    university: "",
    joiningDate: new Date().toISOString().split("T")[0],
    employmentType: "REGULAR" as "REGULAR" | "CONTRACTUAL",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE" as "ACTIVE" | "ON_LEAVE" | "LEFT",
  });

  const filteredFaculty = facultyList.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.facultyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.qualification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.specialization?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "ALL" || f.employmentType === filterType;

    const matchesQual =
      filterQual === "ALL" ||
      (filterQual === "X" && f.qualification.toLowerCase().includes("ph.d")) ||
      (filterQual === "Y" &&
        (f.qualification.toLowerCase().includes("m.tech") ||
          f.qualification.toLowerCase().includes("m.e.") ||
          f.qualification.toLowerCase().includes("m.s.")));

    return matchesSearch && matchesType && matchesQual;
  });

  const handleAddFaculty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.facultyCode) return;

    const newRecord: FacultyRecord = {
      id: `fac-${Date.now()}`,
      ...formData,
    };

    appStore.faculty.unshift(newRecord);
    setFacultyList([...appStore.faculty]);
    setIsModalOpen(false);
    setFormData({
      facultyCode: "",
      name: "",
      qualification: "Ph.D. in Computer Science",
      designation: "Assistant Professor",
      specialization: "",
      university: "",
      joiningDate: new Date().toISOString().split("T")[0],
      employmentType: "REGULAR",
      department: "Computer Science & Engineering",
      program: "B.Tech Computer Science and Engineering",
      status: "ACTIVE",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" />
            Faculty Directory
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage academic faculty records, qualifications, and employment cadre
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by name, code, specialization..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Employment Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Filter className="w-3.5 h-3.5" />
            <span>Type:</span>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
            >
              <option value="ALL">All Employment Types</option>
              <option value="REGULAR">Regular Only</option>
              <option value="CONTRACTUAL">Contractual Only</option>
            </select>
          </div>

          {/* Qualification Filter */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span>Classification:</span>
            <select
              value={filterQual}
              onChange={(e) => setFilterQual(e.target.value)}
              className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
            >
              <option value="ALL">All Classifications</option>
              <option value="X">X (Ph.D. / Doctoral)</option>
              <option value="Y">Y (M.Tech / Postgrad)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Faculty Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <th className="py-3 px-4 font-semibold">Faculty</th>
                <th className="py-3 px-4 font-semibold">Designation & Dept</th>
                <th className="py-3 px-4 font-semibold">Qualification</th>
                <th className="py-3 px-4 font-semibold">Specialization</th>
                <th className="py-3 px-4 font-semibold">Type</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Joining Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredFaculty.map((f) => {
                const isPhd = f.qualification.toLowerCase().includes("ph.d");
                return (
                  <tr
                    key={f.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {f.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {f.facultyCode}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800 dark:text-slate-200 font-medium">
                        {f.designation}
                      </div>
                      <div className="text-[11px] text-slate-400">{f.department}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isPhd
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300"
                          }`}
                        >
                          {isPhd ? "X" : "Y"}
                        </span>
                        <span className="text-slate-700 dark:text-slate-300">
                          {f.qualification}
                        </span>
                      </div>
                      {f.university && (
                        <div className="text-[11px] text-slate-400 mt-0.5">
                          {f.university} {f.graduationYear && `(${f.graduationYear})`}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {f.specialization || "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                          f.employmentType === "REGULAR"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-200/50 dark:border-amber-800/50"
                        }`}
                      >
                        {f.employmentType}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {f.joiningDate || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 flex justify-between items-center">
          <span>Showing {filteredFaculty.length} of {facultyList.length} faculty</span>
          <span>Computer Science & Engineering</span>
        </div>
      </div>

      {/* Add Faculty Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Add New Faculty Member
            </h2>
            <form onSubmit={handleAddFaculty} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Faculty Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CSE025"
                    value={formData.facultyCode}
                    onChange={(e) =>
                      setFormData({ ...formData, facultyCode: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Jane Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Designation
                  </label>
                  <select
                    value={formData.designation}
                    onChange={(e) =>
                      setFormData({ ...formData, designation: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option>Professor</option>
                    <option>Associate Professor</option>
                    <option>Assistant Professor</option>
                    <option>Assistant Professor (Contractual)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Qualification
                  </label>
                  <select
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({ ...formData, qualification: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Ph.D. in Computer Science">Ph.D. in Computer Science (X)</option>
                    <option value="Ph.D.">Ph.D. (X)</option>
                    <option value="M.Tech in CSE">M.Tech in CSE (Y)</option>
                    <option value="M.Tech">M.Tech (Y)</option>
                    <option value="M.E.">M.E. (Y)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                  Specialization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Systems & Cloud Computing"
                  value={formData.specialization}
                  onChange={(e) =>
                    setFormData({ ...formData, specialization: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        employmentType: e.target.value as "REGULAR" | "CONTRACTUAL",
                      })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <option value="REGULAR">REGULAR</option>
                    <option value="CONTRACTUAL">CONTRACTUAL</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-medium mb-1">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) =>
                      setFormData({ ...formData, joiningDate: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-white bg-blue-600 hover:bg-blue-700 font-medium"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
