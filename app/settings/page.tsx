"use client";

import React, { useState } from "react";
import { appStore } from "@/lib/data/mockStore";
import { QualificationMappingEntry, Classification } from "@/lib/calculations/facultyQualification";
import { Settings, Plus, CheckCircle2, Shield, BookmarkCheck } from "lucide-react";

export default function SettingsPage() {
  const [mappings, setMappings] = useState<QualificationMappingEntry[]>(appStore.mappings);
  const [newDegree, setNewDegree] = useState("");
  const [newClass, setNewClass] = useState<Classification>("X");
  const [savedNotice, setSavedNotice] = useState(false);

  const handleAddMapping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDegree.trim()) return;

    const updated = [
      ...mappings,
      { sourceQualification: newDegree.trim(), classification: newClass },
    ];
    setMappings(updated);
    appStore.mappings = updated;
    setNewDegree("");
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Settings className="w-6 h-6 text-blue-600" />
            Qualification Mappings &amp; Settings
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Configure degree classification rules (X, Y, EXCLUDE) and assessment cycle parameters
          </p>
        </div>

        {savedNotice && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Mapping Updated
          </span>
        )}
      </div>

      {/* Add New Mapping */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 dark:text-white mb-1">
          Add Degree Classification Mapping
        </h2>
        <p className="text-xs text-slate-500 mb-4">
          NBA rules require strict explicit mapping: never hardcode or guess unmapped qualifications.
        </p>

        <form onSubmit={handleAddMapping} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Degree string (e.g., Ph.D. in Computer Science, M.S., MCA)..."
            value={newDegree}
            onChange={(e) => setNewDegree(e.target.value)}
            className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={newClass}
            onChange={(e) => setNewClass(e.target.value as Classification)}
            className="px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-semibold"
          >
            <option value="X">X (Doctoral / Ph.D. - 10 pts)</option>
            <option value="Y">Y (Postgraduate / M.Tech / M.E. - 7 pts)</option>
            <option value="EXCLUDE">EXCLUDE (B.Tech / Other degrees - 0 pts)</option>
          </select>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Mapping</span>
          </button>
        </form>
      </div>

      {/* Existing Mappings List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">
            Configured Qualification Classifications ({mappings.length})
          </h3>
          <span className="text-xs text-slate-500">Live Evaluation</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                <th className="py-3 px-4 font-semibold">Degree / Qualification String</th>
                <th className="py-3 px-4 font-semibold">Classification</th>
                <th className="py-3 px-4 font-semibold">Points Weight</th>
                <th className="py-3 px-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {mappings.map((m, idx) => {
                let badgeClass = "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300";
                let weight = "7 points";
                if (m.classification === "X") {
                  badgeClass = "bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300";
                  weight = "10 points";
                } else if (m.classification === "EXCLUDE") {
                  badgeClass = "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
                  weight = "0 points (Excluded)";
                }

                return (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                      {m.sourceQualification}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold ${badgeClass}`}>
                        {m.classification}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-600 dark:text-slate-400">
                      {weight}
                    </td>
                    <td className="py-3 px-4 text-emerald-600 font-medium">
                      <span className="inline-flex items-center gap-1">
                        <BookmarkCheck className="w-3.5 h-3.5" /> Active
                      </span>
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
