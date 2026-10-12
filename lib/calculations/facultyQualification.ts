export type Classification = "X" | "Y" | "EXCLUDE" | "UNCLASSIFIED";

export interface QualificationMappingEntry {
  sourceQualification: string;
  classification: Classification;
}

export interface FacultyForClassification {
  facultyId: string;
  facultyName: string;
  qualification: string;
}

export interface ClassifiedFaculty extends FacultyForClassification {
  classification: Classification;
}

/**
 * Classifies faculty using the QualificationMapping table (never hard-coded —
 * see spec section 17). Any qualification with no mapping entry is returned
 * as UNCLASSIFIED so the admin can map it later; the system must not guess.
 */
export function classifyFaculty(
  faculty: FacultyForClassification[],
  mappings: QualificationMappingEntry[]
): ClassifiedFaculty[] {
  const mapIndex = new Map(
    mappings.map((m) => [normalize(m.sourceQualification), m.classification])
  );

  return faculty.map((f) => ({
    ...f,
    classification: mapIndex.get(normalize(f.qualification)) ?? "UNCLASSIFIED",
  }));
}

function normalize(qualification: string): string {
  return qualification.trim().toLowerCase();
}

export function splitByClassification(classified: ClassifiedFaculty[]) {
  return {
    X: classified.filter((f) => f.classification === "X"),
    Y: classified.filter((f) => f.classification === "Y"),
    EXCLUDE: classified.filter((f) => f.classification === "EXCLUDE"),
    UNCLASSIFIED: classified.filter((f) => f.classification === "UNCLASSIFIED"),
  };
}
