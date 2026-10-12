export interface FacultyRecordForCount {
  facultyId: string;
  facultyName: string;
  employmentType: "REGULAR" | "CONTRACTUAL";
}

export interface RegularContractualResult {
  regularCount: number;
  contractualCount: number;
  regularFaculty: { facultyId: string; facultyName: string }[];
  contractualFaculty: { facultyId: string; facultyName: string }[];
}

export function calculateRegularContractual(
  records: FacultyRecordForCount[]
): RegularContractualResult {
  const regularFaculty = records
    .filter((r) => r.employmentType === "REGULAR")
    .map(({ facultyId, facultyName }) => ({ facultyId, facultyName }));

  const contractualFaculty = records
    .filter((r) => r.employmentType === "CONTRACTUAL")
    .map(({ facultyId, facultyName }) => ({ facultyId, facultyName }));

  return {
    regularCount: regularFaculty.length,
    contractualCount: contractualFaculty.length,
    regularFaculty,
    contractualFaculty,
  };
}
