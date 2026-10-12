"use client";

import React from "react";
import { appStore } from "@/lib/data/mockStore";
import { averageSFR } from "@/lib/calculations/studentFacultyRatio";
import {
  Download,
  Printer,
  FileSpreadsheet,
  CheckCircle2,
  Award,
} from "lucide-react";

export default function ExportSARPage() {
  const activeCycle = appStore.getActiveCycle();
  const sfrCAY = appStore.computeSFR("2025-26");
  const regContractual = appStore.computeRegularContractual();
  const fqi = appStore.computeFQI("2025-26", "INSTITUTIONAL", 23);

  const sfrAvg = averageSFR([sfrCAY.SFR, 25.0, 24.78]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "NATIONAL BOARD OF ACCREDITATION (NBA) - CRITERION 5 SUMMARY\n";
    csvContent += `Assessment Cycle: ${activeCycle.name}\n\n`;

    csvContent += "TABLE 5.1: STUDENT-FACULTY RATIO (SFR)\n";
    csvContent += "Year,Students (N),Own Dept (a),Other Dept (b),Total Faculty (F=a+b),SFR,Serving Elsewhere (c)\n";
    csvContent += `CAY (2025-26),${sfrCAY.N},${sfrCAY.a},${sfrCAY.b},${sfrCAY.F},${sfrCAY.SFR},${sfrCAY.c}\n`;
    csvContent += `CAYm1 (2024-25),575,20.00,3.00,23.00,25.00,0.50\n`;
    csvContent += `CAYm2 (2023-24),570,19.50,3.50,23.00,24.78,0.50\n`;
    csvContent += `3-Year Average SFR,,,,${sfrAvg},,\n\n`;

    csvContent += "TABLE 5.3: FACULTY QUALIFICATION INDEX (FQI)\n";
    csvContent += "Formula: FQ = 2.0 * (10X + 7Y) / F\n";
    csvContent += `X (Ph.D.),${fqi.X}\n`;
    csvContent += `Y (M.Tech/M.E.),${fqi.Y}\n`;
    csvContent += `Required Faculty (F),${fqi.F}\n`;
    csvContent += `Faculty Qualification Index (FQ),${fqi.FQ}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NBA_SAR_Criterion5_${activeCycle.CAY}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 print:p-0">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="w-6 h-6 text-blue-600" />
            NBA SAR Criterion 5 Official Tables
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Export ready-to-submit official NBA tables and print reports
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs transition"
          >
            <Printer className="w-4 h-4" />
            <span>Print Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Official Formatted Document for View and Print */}
      <div className="bg-white text-slate-900 p-8 rounded-2xl border border-slate-200 shadow-sm print:border-none print:shadow-none print:p-0 space-y-8">
        {/* Document Header */}
        <div className="border-b border-slate-300 pb-4 text-center">
          <h2 className="text-xl font-bold uppercase tracking-wider text-slate-900">
            Self Assessment Report (SAR)
          </h2>
          <h3 className="text-base font-semibold text-slate-700 mt-1">
            CRITERION 5: FACULTY INFORMATION &amp; CONTRIBUTIONS
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Department of Computer Science &amp; Engineering • Assessment Cycle: {activeCycle.name}
          </p>
        </div>

        {/* Table 5.1 */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <h4 className="font-bold text-sm text-slate-900">
              Table B.5.1: Student - Faculty Ratio (SFR) Calculation
            </h4>
            <span className="text-xs font-mono text-slate-500">SFR = N / F</span>
          </div>

          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 border-b border-slate-300">
                <tr>
                  <th className="p-2.5 font-bold border-r border-slate-300">Year</th>
                  <th className="p-2.5 font-bold border-r border-slate-300">
                    Total Students (N)
                  </th>
                  <th className="p-2.5 font-bold border-r border-slate-300">
                    Own Dept (a)
                  </th>
                  <th className="p-2.5 font-bold border-r border-slate-300">
                    Other Dept (b)
                  </th>
                  <th className="p-2.5 font-bold border-r border-slate-300">
                    F = a + b
                  </th>
                  <th className="p-2.5 font-bold border-r border-slate-300">
                    SFR = N / F
                  </th>
                  <th className="p-2.5 font-bold">Serving Other Dept (c)*</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-mono">
                <tr>
                  <td className="p-2.5 font-sans font-semibold border-r border-slate-300">
                    CAY (2025-26)
                  </td>
                  <td className="p-2.5 border-r border-slate-300">{sfrCAY.N}</td>
                  <td className="p-2.5 border-r border-slate-300">{sfrCAY.a}</td>
                  <td className="p-2.5 border-r border-slate-300">{sfrCAY.b}</td>
                  <td className="p-2.5 font-bold border-r border-slate-300">{sfrCAY.F}</td>
                  <td className="p-2.5 font-bold border-r border-slate-300">{sfrCAY.SFR}</td>
                  <td className="p-2.5 text-slate-400">{sfrCAY.c}</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold border-r border-slate-300">
                    CAYm1 (2024-25)
                  </td>
                  <td className="p-2.5 border-r border-slate-300">575</td>
                  <td className="p-2.5 border-r border-slate-300">20.00</td>
                  <td className="p-2.5 border-r border-slate-300">3.00</td>
                  <td className="p-2.5 font-bold border-r border-slate-300">23.00</td>
                  <td className="p-2.5 font-bold border-r border-slate-300">25.00</td>
                  <td className="p-2.5 text-slate-400">0.50</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold border-r border-slate-300">
                    CAYm2 (2023-24)
                  </td>
                  <td className="p-2.5 border-r border-slate-300">570</td>
                  <td className="p-2.5 border-r border-slate-300">19.50</td>
                  <td className="p-2.5 border-r border-slate-300">3.50</td>
                  <td className="p-2.5 font-bold border-r border-slate-300">23.00</td>
                  <td className="p-2.5 font-bold border-r border-slate-300">24.78</td>
                  <td className="p-2.5 text-slate-400">0.50</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-400 font-sans">
                <tr>
                  <td colSpan={5} className="p-2.5 font-bold text-right border-r border-slate-300">
                    3-Year Average SFR (SFR1 + SFR2 + SFR3) / 3:
                  </td>
                  <td colSpan={2} className="p-2.5 font-mono font-extrabold text-blue-700">
                    {sfrAvg}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            * Note: Load &apos;c&apos; is recorded for informational purposes and excluded from F per NBA norms.
          </p>
        </div>

        {/* Table 5.2 */}
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-slate-900">
            Table B.5.2: Faculty Cadre Ratio &amp; Permanence
          </h4>
          <div className="border border-slate-300 rounded-lg overflow-hidden">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 border-b border-slate-300">
                <tr>
                  <th className="p-2.5 font-bold border-r border-slate-300">Cadre</th>
                  <th className="p-2.5 font-bold border-r border-slate-300">Regular</th>
                  <th className="p-2.5 font-bold border-r border-slate-300">Contractual</th>
                  <th className="p-2.5 font-bold">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300 font-mono">
                <tr>
                  <td className="p-2.5 font-sans font-semibold border-r border-slate-300">Professors</td>
                  <td className="p-2.5 border-r border-slate-300">2</td>
                  <td className="p-2.5 border-r border-slate-300">0</td>
                  <td className="p-2.5">2</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold border-r border-slate-300">Associate Professors</td>
                  <td className="p-2.5 border-r border-slate-300">4</td>
                  <td className="p-2.5 border-r border-slate-300">0</td>
                  <td className="p-2.5">4</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-sans font-semibold border-r border-slate-300">Assistant Professors</td>
                  <td className="p-2.5 border-r border-slate-300">15</td>
                  <td className="p-2.5 border-r border-slate-300">3</td>
                  <td className="p-2.5">18</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-300 font-sans font-bold">
                <tr>
                  <td className="p-2.5 border-r border-slate-300">Total</td>
                  <td className="p-2.5 border-r border-slate-300 font-mono">{regContractual.regularCount} (87.5%)</td>
                  <td className="p-2.5 border-r border-slate-300 font-mono">{regContractual.contractualCount} (12.5%)</td>
                  <td className="p-2.5 font-mono">{regContractual.regularCount + regContractual.contractualCount}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Table 5.3 */}
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <h4 className="font-bold text-sm text-slate-900">
              Table B.5.3: Faculty Qualification Index (FQI)
            </h4>
            <span className="text-xs font-mono text-slate-500">
              FQ = 2.0 &times; (10X + 7Y) / F
            </span>
          </div>

          <div className="border border-slate-300 rounded-lg p-4 bg-slate-50 space-y-2 text-xs">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <span className="text-slate-500">X (Ph.D.):</span>
                <p className="font-mono font-bold text-sm text-slate-900">{fqi.X}</p>
              </div>
              <div>
                <span className="text-slate-500">Y (M.Tech/M.E.):</span>
                <p className="font-mono font-bold text-sm text-slate-900">{fqi.Y}</p>
              </div>
              <div>
                <span className="text-slate-500">Required Faculty (F):</span>
                <p className="font-mono font-bold text-sm text-slate-900">{fqi.F}</p>
              </div>
              <div>
                <span className="text-slate-500">Qualification Index (FQ):</span>
                <p className="font-mono font-bold text-base text-blue-700">{fqi.FQ}</p>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 text-slate-600 font-mono text-[11px]">
              Substitution: {fqi.substitution} = {fqi.FQ}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
