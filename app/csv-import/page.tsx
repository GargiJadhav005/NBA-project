"use client";

import React, { useState } from "react";
import Papa from "papaparse";
import { appStore, FacultyRecord } from "@/lib/data/mockStore";
import {
  FileSpreadsheet,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Download,
  ArrowRight,
} from "lucide-react";

export default function CSVImportPage() {
  const [importTarget, setImportTarget] = useState<"FACULTY" | "STUDENTS" | "LOADS">(
    "FACULTY"
  );
  const [parsedData, setParsedData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          setParsedData(results.data);
          setHeaders(Object.keys(results.data[0] as object));
          setIsSuccess(false);
          setErrorMsg("");
        } else {
          setErrorMsg("Could not parse records from this CSV file.");
        }
      },
      error: (err) => {
        setErrorMsg("Error parsing CSV: " + err.message);
      },
    });
  };

  const handleConfirmImport = () => {
    if (parsedData.length === 0) return;

    if (importTarget === "FACULTY") {
      const newFaculty: FacultyRecord[] = parsedData.map((row, i) => ({
        id: `imported-${Date.now()}-${i}`,
        facultyCode: row["Faculty Code"] || row["facultyCode"] || `CSE${100 + i}`,
        name: row["Name"] || row["name"] || "Faculty Member",
        qualification: row["Qualification"] || row["qualification"] || "M.Tech",
        designation: row["Designation"] || row["designation"] || "Assistant Professor",
        specialization: row["Specialization"] || row["specialization"] || "",
        employmentType:
          row["Employment Type"]?.toUpperCase() === "CONTRACTUAL"
            ? "CONTRACTUAL"
            : "REGULAR",
        department: "Computer Science & Engineering",
        program: "B.Tech Computer Science and Engineering",
        status: "ACTIVE",
        joiningDate: row["Joining Date"] || "2024-01-01",
      }));

      appStore.faculty.push(...newFaculty);
      setIsSuccess(true);
      setParsedData([]);
    }
  };

  const sampleCsvContent =
    "Faculty Code,Name,Qualification,Designation,Specialization,Employment Type\n" +
    "CSE030,Dr. Neelesh Mehta,Ph.D. in Computer Science,Professor,5G Communications,REGULAR\n" +
    "CSE031,Prof. Rina Sen,M.Tech,Assistant Professor,Cloud Security,CONTRACTUAL";

  const downloadSample = () => {
    const blob = new Blob([sampleCsvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "faculty_sample_template.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6 text-blue-600" />
            CSV Data Import Pipeline
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Batch import Faculty Roster, Student Enrollment, and Teaching Load data
          </p>
        </div>

        <button
          onClick={downloadSample}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <Download className="w-4 h-4 text-blue-600" />
          <span>Download Sample CSV Template</span>
        </button>
      </div>

      {/* Target Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setImportTarget("FACULTY")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            importTarget === "FACULTY"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
          }`}
        >
          Faculty Roster
        </button>
        <button
          onClick={() => setImportTarget("STUDENTS")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            importTarget === "STUDENTS"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
          }`}
        >
          Student Enrollments (N)
        </button>
        <button
          onClick={() => setImportTarget("LOADS")}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
            importTarget === "LOADS"
              ? "bg-blue-600 text-white shadow-xs"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
          }`}
        >
          Teaching Loads (a / b / c)
        </button>
      </div>

      {/* Upload Zone */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 text-center hover:border-blue-500 transition">
        <div className="mx-auto w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-blue-600 mb-3">
          <Upload className="w-6 h-6" />
        </div>
        <h3 className="font-semibold text-sm text-slate-900 dark:text-white">
          Upload CSV for {importTarget}
        </h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Drag and drop your spreadsheet here or click to browse files from your computer
        </p>
        <label className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-xs">
          <span>Choose File</span>
          <input
            type="file"
            accept=".csv,text/csv"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {/* Success Notification */}
      {isSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center gap-3 text-xs text-emerald-800 dark:text-emerald-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <div>
            <p className="font-semibold">Import Complete!</p>
            <p>
              Records successfully merged into Criterion 5 calculation engine. All metrics updated.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 flex items-center gap-3 text-xs text-rose-800 dark:text-rose-300">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Preview Table */}
      {parsedData.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs space-y-4 p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                CSV Preview ({parsedData.length} records detected)
              </h3>
              <p className="text-xs text-slate-500">
                Verify parsed fields before committing to live database
              </p>
            </div>
            <button
              onClick={handleConfirmImport}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-xs"
            >
              <FileCheck className="w-4 h-4" />
              <span>Confirm &amp; Import</span>
            </button>
          </div>

          <div className="overflow-x-auto max-h-80 border border-slate-200 dark:border-slate-800 rounded-xl">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                  {headers.map((h) => (
                    <th key={h} className="py-2.5 px-3 font-semibold">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {parsedData.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                    {headers.map((h) => (
                      <td key={h} className="py-2 px-3 font-mono text-[11px]">
                        {row[h] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
