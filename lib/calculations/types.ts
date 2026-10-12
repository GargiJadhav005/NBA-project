// Shared types for the SAR Criterion 5 calculation engine.
// These functions are pure — they take plain data in and return plain
// results out. They never touch Prisma directly, so they can be unit
// tested in isolation and reused identically whether the underlying
// records came from CSV import or manual entry (see section 32 of spec).

export class CalculationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CalculationError";
  }
}

/** Round to 2 decimal places for display. Never used on intermediate values. */
export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Converts a percentage (0-100) to a fractional value (0-1). */
export function percentToFraction(percentage: number): number {
  if (percentage < 0) {
    throw new CalculationError("Teaching load cannot be negative.");
  }
  return percentage / 100;
}
