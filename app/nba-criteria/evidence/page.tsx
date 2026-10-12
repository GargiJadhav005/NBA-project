"use client";

import React, { useState } from "react";
import {
  FolderOpen,
  Upload,
  Search,
  Filter,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Download,
  Eye,
  Trash2,
} from "lucide-react";
import { EVIDENCE_DOCUMENTS, NBA_CRITERIA } from "@/lib/data/nbaMockData";

export default function EvidenceRepositoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [filterCriterion, setFilterCriterion] = useState<string>("ALL");
  const [showUploadModal, setShowUploadModal] = useState(false);

  const filtered = EVIDENCE_DOCUMENTS.filter((doc) => {
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase()) && !doc.description.toLowerCase().includes(searchTerm.toLowerCase()))
      return false;
    if (filterStatus !== "ALL" && doc.status !== filterStatus) return false;
    if (filterCriterion !== "ALL" && doc.criterionId !== filterCriterion) return false;
    return true;
  });

  const verifiedCount = EVIDENCE_DOCUMENTS.filter((d) => d.status === "VERIFIED").length;
  const uploadedCount = EVIDENCE_DOCUMENTS.filter((d) => d.status === "UPLOADED").length;
  const missingCount = EVIDENCE_DOCUMENTS.filter((d) => d.status === "MISSING").length;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 dark:bg-violet-950 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
              Module 6
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            NBA Evidence Repository
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
            Upload, categorize, and track evidence documents for NBA accreditation
          </p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 shadow-sm transition"
        >
          <Upload className="w-4 h-4" /> Upload Evidence
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-emerald-600">{verifiedCount}</p>
            <p className="text-xs text-slate-500">Verified</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/60">
            <Upload className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{uploadedCount}</p>
            <p className="text-xs text-slate-500">Uploaded (Pending Review)</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4">
          <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600">{missingCount}</p>
            <p className="text-xs text-slate-500">Missing</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>
        <select
          value={filterCriterion}
          onChange={(e) => setFilterCriterion(e.target.value)}
          className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="ALL">All Criteria</option>
          {NBA_CRITERIA.map((c) => (
            <option key={c.id} value={c.id}>
              Criterion {c.number}
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          {["ALL", "VERIFIED", "UPLOADED", "MISSING"].map((s) => (
            <button
              key={s}
              onClick={() => setFilterStatus(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold transition ${
                filterStatus === s
                  ? "bg-violet-600 text-white"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              }`}
            >
              {s === "ALL" ? "All" : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 bg-slate-50 dark:bg-slate-800/40">
                <th className="py-3 px-4 font-semibold">Document</th>
                <th className="py-3 px-4 font-semibold">Criterion</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Year</th>
                <th className="py-3 px-4 font-semibold">Size</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((doc) => {
                const criterion = NBA_CRITERIA.find((c) => c.id === doc.criterionId);
                return (
                  <tr key={doc.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-violet-500 shrink-0" />
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white truncate max-w-[220px]">
                            {doc.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[220px]">
                            {doc.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                      {criterion ? `Criterion ${criterion.number}` : "—"}
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {doc.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{doc.academicYear}</td>
                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400 font-mono">{doc.fileSize}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.status === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400"
                            : doc.status === "UPLOADED"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400"
                            : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400"
                        }`}
                      >
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-blue-600 transition">
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-emerald-600 transition">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4 border border-slate-200 dark:border-slate-800">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Upload Evidence</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Document Name</label>
                <input className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" placeholder="e.g., PO_Attainment_Report.pdf" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Criterion</label>
                <select className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm">
                  {NBA_CRITERIA.map((c) => (
                    <option key={c.id} value={c.id}>Criterion {c.number}: {c.title}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Category</label>
                <input className="mt-1 w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm" placeholder="e.g., Assessment, Feedback, Report" />
              </div>
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm text-slate-500">Drag & drop file here or click to browse</p>
                <p className="text-xs text-slate-400 mt-1">PDF, XLSX, ZIP up to 20 MB</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 rounded-xl text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 transition"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
