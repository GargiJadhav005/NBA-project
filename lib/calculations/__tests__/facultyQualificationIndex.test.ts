import { describe, it, expect } from "vitest";
import { calculateFacultyQualificationIndex } from "../facultyQualificationIndex";
import { CalculationError } from "../types";
import type { ClassifiedFaculty } from "../facultyQualification";

function makeFaculty(count: number, classification: "X" | "Y"): ClassifiedFaculty[] {
  return Array.from({ length: count }, (_, i) => ({
    facultyId: `${classification}-${i}`,
    facultyName: `${classification} Faculty ${i}`,
    qualification: classification === "X" ? "Ph.D." : "B.E.",
    classification,
  }));
}

describe("calculateFacultyQualificationIndex", () => {
  it("matches the worked example from the spec (X=11, Y=13, F=23 -> FQ=17.48)", () => {
    const result = calculateFacultyQualificationIndex({
      studentsN: 0,
      xFaculty: makeFaculty(11, "X"),
      yFaculty: makeFaculty(13, "Y"),
      fMethod: "INSTITUTIONAL",
      institutionalF: 23,
    });
    expect(result.X).toBe(11);
    expect(result.Y).toBe(13);
    expect(result.FQ).toBeCloseTo(17.48, 2);
  });

  it("computes F automatically as N/25 when method is AUTOMATIC", () => {
    const result = calculateFacultyQualificationIndex({
      studentsN: 575,
      xFaculty: makeFaculty(11, "X"),
      yFaculty: makeFaculty(13, "Y"),
      fMethod: "AUTOMATIC",
    });
    expect(result.F).toBeCloseTo(23, 0);
  });

  it("does not silently fall back to automatic F when institutional F is missing", () => {
    expect(() =>
      calculateFacultyQualificationIndex({
        studentsN: 575,
        xFaculty: [],
        yFaculty: [],
        fMethod: "INSTITUTIONAL",
      })
    ).toThrow(CalculationError);
  });

  it("throws a friendly error when F is zero", () => {
    expect(() =>
      calculateFacultyQualificationIndex({
        studentsN: 0,
        xFaculty: [],
        yFaculty: [],
        fMethod: "AUTOMATIC",
      })
    ).toThrow(/required faculty F is zero/);
  });
});
