import { describe, it, expect } from "vitest";
import { classifyFaculty, splitByClassification } from "../facultyQualification";

const mappings = [
  { sourceQualification: "Ph.D.", classification: "X" as const },
  { sourceQualification: "M.E.", classification: "X" as const },
  { sourceQualification: "M.Phil", classification: "X" as const },
  { sourceQualification: "B.E.", classification: "Y" as const },
  { sourceQualification: "M.Sc.", classification: "Y" as const },
];

describe("classifyFaculty", () => {
  it("classifies known qualifications using the mapping table, not hard-coded rules", () => {
    const result = classifyFaculty(
      [
        { facultyId: "1", facultyName: "A", qualification: "Ph.D." },
        { facultyId: "2", facultyName: "B", qualification: "B.E." },
      ],
      mappings
    );
    expect(result[0].classification).toBe("X");
    expect(result[1].classification).toBe("Y");
  });

  it("is case/whitespace insensitive", () => {
    const result = classifyFaculty(
      [{ facultyId: "1", facultyName: "A", qualification: "  ph.d.  " }],
      mappings
    );
    expect(result[0].classification).toBe("X");
  });

  it("marks unmapped qualifications as UNCLASSIFIED rather than guessing", () => {
    const result = classifyFaculty(
      [{ facultyId: "1", facultyName: "A", qualification: "M.Tech" }],
      mappings
    );
    expect(result[0].classification).toBe("UNCLASSIFIED");
  });

  it("splitByClassification groups faculty into buckets", () => {
    const classified = classifyFaculty(
      [
        { facultyId: "1", facultyName: "A", qualification: "Ph.D." },
        { facultyId: "2", facultyName: "B", qualification: "B.E." },
        { facultyId: "3", facultyName: "C", qualification: "M.Tech" },
      ],
      mappings
    );
    const split = splitByClassification(classified);
    expect(split.X).toHaveLength(1);
    expect(split.Y).toHaveLength(1);
    expect(split.UNCLASSIFIED).toHaveLength(1);
  });
});
