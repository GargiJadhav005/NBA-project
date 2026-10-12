import { describe, it, expect } from "vitest";
import { calculateRegularContractual } from "../regularContractual";

describe("calculateRegularContractual", () => {
  it("counts regular and contractual faculty separately", () => {
    const result = calculateRegularContractual([
      { facultyId: "1", facultyName: "A", employmentType: "REGULAR" },
      { facultyId: "2", facultyName: "B", employmentType: "REGULAR" },
      { facultyId: "3", facultyName: "C", employmentType: "CONTRACTUAL" },
    ]);
    expect(result.regularCount).toBe(2);
    expect(result.contractualCount).toBe(1);
    expect(result.regularFaculty.map((f) => f.facultyName)).toEqual(["A", "B"]);
  });

  it("handles zero faculty", () => {
    const result = calculateRegularContractual([]);
    expect(result.regularCount).toBe(0);
    expect(result.contractualCount).toBe(0);
  });
});
