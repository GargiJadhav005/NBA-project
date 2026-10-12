import { CalculationError, percentToFraction, round2 } from "./types";

/**
 * A single teaching-load contribution record used to compute a/b/c.
 * `academicLoadPercentage` is 0-100 as stored in the DB; this module
 * converts to fractional internally.
 */
export interface TeachingLoadContribution {
  facultyId: string;
  facultyName: string;
  academicLoadPercentage: number;
  isOwnDepartment: boolean;       // contributes to `a` when true and program matches
  servesOtherDepartment: boolean; // contributes to `c` when true (faculty of this program serving elsewhere)
  isExternalFaculty: boolean;     // contributes to `b` when true (faculty from elsewhere serving this program)
}

export interface SFRInput {
  studentsN: number;
  loads: TeachingLoadContribution[];
}

export interface SFRBreakdown {
  N: number;
  a: number; // faculty of this program/department (fractional load)
  b: number; // faculty serving this program from another department (fractional load)
  c: number; // faculty of this program serving another department (fractional load) — informational only
  F: number; // F = a + b (per SAR definition; c is intentionally excluded)
  SFR: number;
  contributors: {
    a: { facultyId: string; facultyName: string; fraction: number }[];
    b: { facultyId: string; facultyName: string; fraction: number }[];
    c: { facultyId: string; facultyName: string; fraction: number }[];
  };
}

export function calculateStudentFacultyRatio(input: SFRInput): SFRBreakdown {
  if (input.studentsN < 0) {
    throw new CalculationError("Student count cannot be negative.");
  }

  const contributors: SFRBreakdown["contributors"] = { a: [], b: [], c: [] };
  let a = 0;
  let b = 0;
  let c = 0;

  for (const load of input.loads) {
    const fraction = percentToFraction(load.academicLoadPercentage);
    const entry = { facultyId: load.facultyId, facultyName: load.facultyName, fraction: round2(fraction) };

    if (load.isExternalFaculty) {
      // faculty from another department serving this program
      b += fraction;
      contributors.b.push(entry);
    } else if (load.servesOtherDepartment) {
      // faculty of this program serving another department — c, informational only
      c += fraction;
      contributors.c.push(entry);
    } else if (load.isOwnDepartment) {
      a += fraction;
      contributors.a.push(entry);
    }
  }

  const F = a + b; // per SAR definition, c is excluded from F

  if (F === 0) {
    throw new CalculationError(
      "Cannot calculate Student-Faculty Ratio because faculty load (F) is missing or zero."
    );
  }

  const SFR = input.studentsN / F;

  return {
    N: input.studentsN,
    a: round2(a),
    b: round2(b),
    c: round2(c),
    F: round2(F),
    SFR: round2(SFR),
    contributors,
  };
}

export function averageSFR(values: number[]): number {
  const valid = values.filter((v) => Number.isFinite(v));
  if (valid.length === 0) return 0;
  return round2(valid.reduce((sum, v) => sum + v, 0) / valid.length);
}
