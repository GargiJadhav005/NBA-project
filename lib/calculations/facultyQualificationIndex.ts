import { CalculationError, round2 } from "./types";
import type { ClassifiedFaculty } from "./facultyQualification";

export type FRequiredMethod = "AUTOMATIC" | "INSTITUTIONAL";

export interface FQIInput {
  studentsN: number;
  xFaculty: ClassifiedFaculty[]; // classification === "X"
  yFaculty: ClassifiedFaculty[]; // classification === "Y"
  fMethod: FRequiredMethod;
  institutionalF?: number; // required when fMethod === "INSTITUTIONAL"
  ratioDenominator?: number; // defaults to 25 per 1:25 SFR requirement
}

export interface FQIBreakdown {
  X: number;
  Y: number;
  F: number;
  fMethod: FRequiredMethod;
  tenX: number;
  sevenY: number;
  sum: number; // 10X + 7Y
  FQ: number;
  formula: string;
  substitution: string;
}

export function calculateFacultyQualificationIndex(input: FQIInput): FQIBreakdown {
  const X = input.xFaculty.length;
  const Y = input.yFaculty.length;

  let F: number;
  if (input.fMethod === "INSTITUTIONAL") {
    if (input.institutionalF === undefined || input.institutionalF === null) {
      throw new CalculationError(
        "Institutional F was selected but no value was provided by the administrator."
      );
    }
    F = input.institutionalF;
  } else {
    const denom = input.ratioDenominator ?? 25;
    F = input.studentsN / denom;
  }

  if (!F || F === 0) {
    throw new CalculationError(
      "Cannot calculate Faculty Qualification Index because required faculty F is zero."
    );
  }

  const tenX = 10 * X;
  const sevenY = 7 * Y;
  const sum = tenX + sevenY;
  const FQ = (2.0 * sum) / F;

  return {
    X,
    Y,
    F: round2(F),
    fMethod: input.fMethod,
    tenX,
    sevenY,
    sum,
    FQ: round2(FQ),
    formula: "FQ = 2.0 × (10X + 7Y) / F",
    substitution: `FQ = 2.0 × ((10 × ${X}) + (7 × ${Y})) / ${round2(F)}`,
  };
}

export function averageFQ(values: number[]): number {
  const valid = values.filter((v) => Number.isFinite(v));
  if (valid.length === 0) return 0;
  return round2(valid.reduce((sum, v) => sum + v, 0) / valid.length);
}
