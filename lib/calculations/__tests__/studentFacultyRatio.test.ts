import { describe, it, expect } from "vitest";
import { calculateStudentFacultyRatio, averageSFR } from "../studentFacultyRatio";
import { CalculationError } from "../types";

describe("calculateStudentFacultyRatio", () => {
  it("matches the worked example from the spec (N=576, a=20.50, b=3.32 -> SFR=24.18)", () => {
    const result = calculateStudentFacultyRatio({
      studentsN: 576,
      loads: [
        { facultyId: "f1", facultyName: "Faculty A", academicLoadPercentage: 2050, isOwnDepartment: true, servesOtherDepartment: false, isExternalFaculty: false },
        { facultyId: "f2", facultyName: "Faculty B", academicLoadPercentage: 332, isOwnDepartment: false, servesOtherDepartment: false, isExternalFaculty: true },
        { facultyId: "f3", facultyName: "Faculty C", academicLoadPercentage: 50, isOwnDepartment: false, servesOtherDepartment: true, isExternalFaculty: false },
      ],
    });

    expect(result.a).toBeCloseTo(20.5, 2);
    expect(result.b).toBeCloseTo(3.32, 2);
    expect(result.c).toBeCloseTo(0.5, 2);
    expect(result.F).toBeCloseTo(23.82, 2);
    expect(result.SFR).toBeCloseTo(24.18, 1);
  });

  it("excludes c from F", () => {
    const result = calculateStudentFacultyRatio({
      studentsN: 100,
      loads: [
        { facultyId: "f1", facultyName: "A", academicLoadPercentage: 100, isOwnDepartment: true, servesOtherDepartment: false, isExternalFaculty: false },
        { facultyId: "f2", facultyName: "B", academicLoadPercentage: 100, isOwnDepartment: false, servesOtherDepartment: true, isExternalFaculty: false },
      ],
    });
    expect(result.F).toBe(1);
    expect(result.c).toBe(1);
  });

  it("throws a friendly error when F is zero", () => {
    expect(() =>
      calculateStudentFacultyRatio({ studentsN: 100, loads: [] })
    ).toThrow(CalculationError);
  });

  it("throws when student count is negative", () => {
    expect(() =>
      calculateStudentFacultyRatio({ studentsN: -1, loads: [] })
    ).toThrow(CalculationError);
  });

  it("throws when a teaching load percentage is negative", () => {
    expect(() =>
      calculateStudentFacultyRatio({
        studentsN: 100,
        loads: [{ facultyId: "f1", facultyName: "A", academicLoadPercentage: -10, isOwnDepartment: true, servesOtherDepartment: false, isExternalFaculty: false }],
      })
    ).toThrow(CalculationError);
  });

  it("averageSFR ignores non-finite values and rounds to 2dp", () => {
    expect(averageSFR([24.18, 25.5, NaN])).toBeCloseTo(24.84, 2);
  });

  it("averageSFR returns 0 for an empty list", () => {
    expect(averageSFR([])).toBe(0);
  });
});
