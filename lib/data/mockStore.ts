import {
  calculateStudentFacultyRatio,
  averageSFR,
  SFRBreakdown,
  TeachingLoadContribution,
} from "../calculations/studentFacultyRatio";
import {
  calculateRegularContractual,
  RegularContractualResult,
  FacultyRecordForCount,
} from "../calculations/regularContractual";
import {
  classifyFaculty,
  splitByClassification,
  QualificationMappingEntry,
  ClassifiedFaculty,
  Classification,
} from "../calculations/facultyQualification";
import {
  calculateFacultyQualificationIndex,
  averageFQ,
  FQIBreakdown,
  FRequiredMethod,
} from "../calculations/facultyQualificationIndex";

export interface FacultyRecord {
  id: string;
  facultyCode: string;
  name: string;
  qualification: string;
  specialization?: string;
  university?: string;
  graduationYear?: number;
  designation: string;
  joiningDate: string;
  employmentType: "REGULAR" | "CONTRACTUAL";
  department: string;
  program: string;
  status: "ACTIVE" | "ON_LEAVE" | "LEFT";
}

export interface StudentRecord {
  id: string;
  assessmentCycleId: string;
  academicYear: string;
  program: string;
  sanctionedIntake: number;
  lateralEntryStudents: number;
  totalStudents: number;
}

export interface TeachingLoadRecord {
  id: string;
  facultyId: string;
  facultyName: string;
  assessmentCycleId: string;
  academicYear: string;
  semester?: string;
  program: string;
  department: string;
  academicLoadPercentage: number;
  researchLoadPercentage: number;
  isOwnDepartment: boolean;
  isExternalFaculty: boolean;
  servesOtherDepartment: boolean;
}

export interface AssessmentCycleRecord {
  id: string;
  name: string;
  CAY: string;
  CAYm1: string;
  CAYm2: string;
  isActive: boolean;
}

// Initial Qualification Mappings based on NBA guidelines
export const INITIAL_MAPPINGS: QualificationMappingEntry[] = [
  { sourceQualification: "Ph.D.", classification: "X" },
  { sourceQualification: "Ph.D. in Computer Science", classification: "X" },
  { sourceQualification: "Ph.D. in AI/ML", classification: "X" },
  { sourceQualification: "Doctor of Philosophy", classification: "X" },
  { sourceQualification: "M.Tech", classification: "Y" },
  { sourceQualification: "M.Tech in CSE", classification: "Y" },
  { sourceQualification: "M.Tech in Software Engineering", classification: "Y" },
  { sourceQualification: "M.E.", classification: "Y" },
  { sourceQualification: "M.S.", classification: "Y" },
  { sourceQualification: "B.Tech", classification: "EXCLUDE" },
  { sourceQualification: "B.E.", classification: "EXCLUDE" },
  { sourceQualification: "MCA", classification: "EXCLUDE" },
  { sourceQualification: "M.Sc.", classification: "EXCLUDE" },
];

export const INITIAL_CYCLES: AssessmentCycleRecord[] = [
  {
    id: "cycle-2025-26",
    name: "2025-26 Assessment Cycle",
    CAY: "2025-26",
    CAYm1: "2024-25",
    CAYm2: "2023-24",
    isActive: true,
  },
];

// Initial Faculty Members (CSE Department)
export const INITIAL_FACULTY: FacultyRecord[] = [
  {
    id: "fac-1",
    facultyCode: "CSE001",
    name: "Dr. Rajesh Sharma",
    qualification: "Ph.D. in Computer Science",
    specialization: "Artificial Intelligence & Distributed Systems",
    university: "IIT Delhi",
    graduationYear: 2012,
    designation: "Professor & HOD",
    joiningDate: "2013-07-15",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-2",
    facultyCode: "CSE002",
    name: "Dr. Ananya Sen",
    qualification: "Ph.D.",
    specialization: "Cybersecurity & Cryptography",
    university: "IISc Bangalore",
    graduationYear: 2015,
    designation: "Professor",
    joiningDate: "2016-01-10",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-3",
    facultyCode: "CSE003",
    name: "Dr. Vikramaditya Rao",
    qualification: "Ph.D. in AI/ML",
    specialization: "Machine Learning & Computer Vision",
    university: "IIT Bombay",
    graduationYear: 2018,
    designation: "Associate Professor",
    joiningDate: "2018-08-01",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-4",
    facultyCode: "CSE004",
    name: "Dr. Meenakshi Sundaram",
    qualification: "Ph.D.",
    specialization: "Cloud Computing & Networks",
    university: "IIT Madras",
    graduationYear: 2016,
    designation: "Associate Professor",
    joiningDate: "2017-06-20",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-5",
    facultyCode: "CSE005",
    name: "Dr. Arvind Kulkarni",
    qualification: "Doctor of Philosophy",
    specialization: "Database Systems & Big Data",
    university: "BITS Pilani",
    graduationYear: 2017,
    designation: "Associate Professor",
    joiningDate: "2019-01-05",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-6",
    facultyCode: "CSE006",
    name: "Dr. Sunita Deshmukh",
    qualification: "Ph.D.",
    specialization: "Natural Language Processing",
    university: "IIT Kharagpur",
    graduationYear: 2019,
    designation: "Associate Professor",
    joiningDate: "2020-02-15",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-7",
    facultyCode: "CSE007",
    name: "Dr. Rohan Varma",
    qualification: "Ph.D.",
    specialization: "Embedded Systems & IoT",
    university: "IIT Roorkee",
    graduationYear: 2020,
    designation: "Assistant Professor",
    joiningDate: "2021-07-01",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-8",
    facultyCode: "CSE008",
    name: "Dr. Priya Nambiar",
    qualification: "Ph.D.",
    specialization: "Formal Methods & Verification",
    university: "IIT Kanpur",
    graduationYear: 2021,
    designation: "Assistant Professor",
    joiningDate: "2021-11-10",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-9",
    facultyCode: "CSE009",
    name: "Dr. Karthik Subramanian",
    qualification: "Ph.D.",
    specialization: "High Performance Computing",
    university: "IIT Guwahati",
    graduationYear: 2022,
    designation: "Assistant Professor",
    joiningDate: "2022-08-16",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-10",
    facultyCode: "CSE010",
    name: "Dr. Deepa Nair",
    qualification: "Ph.D.",
    specialization: "Software Architecture & DevOps",
    university: "NIT Trichy",
    graduationYear: 2022,
    designation: "Assistant Professor",
    joiningDate: "2023-01-09",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-11",
    facultyCode: "CSE011",
    name: "Dr. Amit Patel",
    qualification: "Ph.D.",
    specialization: "Computer Graphics & AR/VR",
    university: "NIT Surathkal",
    graduationYear: 2023,
    designation: "Assistant Professor",
    joiningDate: "2023-07-10",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  // M.Tech Faculty (Classification Y)
  {
    id: "fac-12",
    facultyCode: "CSE012",
    name: "Prof. Neha Gupta",
    qualification: "M.Tech in CSE",
    specialization: "Data Structures & Algorithms",
    university: "DTU Delhi",
    graduationYear: 2018,
    designation: "Assistant Professor",
    joiningDate: "2019-08-01",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-13",
    facultyCode: "CSE013",
    name: "Prof. Siddharth Jain",
    qualification: "M.Tech",
    specialization: "Computer Networks",
    university: "IIIT Allahabad",
    graduationYear: 2019,
    designation: "Assistant Professor",
    joiningDate: "2020-09-01",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-14",
    facultyCode: "CSE014",
    name: "Prof. Pooja Agarwal",
    qualification: "M.Tech in Software Engineering",
    specialization: "Web Technologies & UI/UX",
    university: "NSUT Delhi",
    graduationYear: 2020,
    designation: "Assistant Professor",
    joiningDate: "2021-02-01",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-15",
    facultyCode: "CSE015",
    name: "Prof. Rahul Menon",
    qualification: "M.E.",
    specialization: "Compiler Design",
    university: "Anna University",
    graduationYear: 2019,
    designation: "Assistant Professor",
    joiningDate: "2021-08-15",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-16",
    facultyCode: "CSE016",
    name: "Prof. Shilpa Reddy",
    qualification: "M.S.",
    specialization: "Information Retrieval",
    university: "IIIT Hyderabad",
    graduationYear: 2021,
    designation: "Assistant Professor",
    joiningDate: "2022-01-10",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-17",
    facultyCode: "CSE017",
    name: "Prof. Manoj Kumar",
    qualification: "M.Tech",
    specialization: "Operating Systems",
    university: "NIT Calicut",
    graduationYear: 2021,
    designation: "Assistant Professor",
    joiningDate: "2022-07-20",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-18",
    facultyCode: "CSE018",
    name: "Prof. Kavita Joshi",
    qualification: "M.Tech",
    specialization: "Object Oriented Design",
    university: "VNIT Nagpur",
    graduationYear: 2022,
    designation: "Assistant Professor",
    joiningDate: "2023-01-15",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-19",
    facultyCode: "CSE019",
    name: "Prof. Harish Bhat",
    qualification: "M.Tech",
    specialization: "Cloud Computing",
    university: "NIT Rourkela",
    graduationYear: 2022,
    designation: "Assistant Professor",
    joiningDate: "2023-08-01",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-20",
    facultyCode: "CSE020",
    name: "Prof. Tanvi Chopra",
    qualification: "M.Tech",
    specialization: "Mobile Computing",
    university: "Thapar University",
    graduationYear: 2023,
    designation: "Assistant Professor",
    joiningDate: "2023-09-01",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-21",
    facultyCode: "CSE021",
    name: "Prof. Gourav Mishra",
    qualification: "M.Tech",
    specialization: "Data Mining",
    university: "MANIT Bhopal",
    graduationYear: 2023,
    designation: "Assistant Professor",
    joiningDate: "2024-01-08",
    employmentType: "REGULAR",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-22",
    facultyCode: "CSE022",
    name: "Prof. Swati Saxena",
    qualification: "M.Tech",
    specialization: "Bioinformatics",
    university: "MNIT Jaipur",
    graduationYear: 2022,
    designation: "Assistant Professor (Adjunct)",
    joiningDate: "2024-07-15",
    employmentType: "CONTRACTUAL",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-23",
    facultyCode: "CSE023",
    name: "Prof. Alok Tiwari",
    qualification: "M.Tech",
    specialization: "Cyber Physical Systems",
    university: "IIIT Jabalpur",
    graduationYear: 2023,
    designation: "Assistant Professor (Contractual)",
    joiningDate: "2024-08-01",
    employmentType: "CONTRACTUAL",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
  {
    id: "fac-24",
    facultyCode: "CSE024",
    name: "Prof. Ritu Bansal",
    qualification: "M.Tech",
    specialization: "Software Testing",
    university: "PEC Chandigarh",
    graduationYear: 2023,
    designation: "Assistant Professor (Contractual)",
    joiningDate: "2024-08-10",
    employmentType: "CONTRACTUAL",
    department: "Computer Science & Engineering",
    program: "B.Tech Computer Science and Engineering",
    status: "ACTIVE",
  },
];

// Initial Student Enrollments for CAY, CAYm1, CAYm2
export const INITIAL_STUDENTS: StudentRecord[] = [
  {
    id: "stu-cay",
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2025-26",
    program: "B.Tech Computer Science and Engineering",
    sanctionedIntake: 540,
    lateralEntryStudents: 36,
    totalStudents: 576, // Worked example matches N=576
  },
  {
    id: "stu-caym1",
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2024-25",
    program: "B.Tech Computer Science and Engineering",
    sanctionedIntake: 540,
    lateralEntryStudents: 35,
    totalStudents: 575,
  },
  {
    id: "stu-caym2",
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2023-24",
    program: "B.Tech Computer Science and Engineering",
    sanctionedIntake: 540,
    lateralEntryStudents: 30,
    totalStudents: 570,
  },
];

// Initial Teaching Loads calibrated for the worked example:
// a = 20.50 (own faculty load)
// b = 3.32 (external faculty load from Math, ECE, HSS serving CSE)
// c = 0.50 (CSE faculty serving another dept, e.g. IT)
// F = a + b = 23.82 -> SFR = 576 / 23.82 = 24.18
export const INITIAL_TEACHING_LOADS: TeachingLoadRecord[] = [
  // Faculty in Department (contribute to `a` totaling 2050% = 20.5)
  ...INITIAL_FACULTY.slice(0, 20).map((f, i) => ({
    id: `tl-own-${f.id}`,
    facultyId: f.id,
    facultyName: f.name,
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2025-26",
    program: "B.Tech Computer Science and Engineering",
    department: "Computer Science & Engineering",
    academicLoadPercentage: i === 0 ? 50 : 100, // Dr. Rajesh Sharma has 50% admin load, 19 others have 100% -> 19.5 + 1.0 from others
    researchLoadPercentage: 20,
    isOwnDepartment: true,
    isExternalFaculty: false,
    servesOtherDepartment: false,
  })),
  {
    id: "tl-own-21",
    facultyId: INITIAL_FACULTY[20].id,
    facultyName: INITIAL_FACULTY[20].name,
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2025-26",
    program: "B.Tech Computer Science and Engineering",
    department: "Computer Science & Engineering",
    academicLoadPercentage: 100,
    researchLoadPercentage: 0,
    isOwnDepartment: true,
    isExternalFaculty: false,
    servesOtherDepartment: false,
  },
  // External Faculty from other departments serving CSE (b = 3.32 -> 332%)
  {
    id: "tl-ext-1",
    facultyId: "ext-1",
    facultyName: "Dr. Ramanujan K. (Mathematics Dept)",
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2025-26",
    program: "B.Tech Computer Science and Engineering",
    department: "Mathematics",
    academicLoadPercentage: 132,
    researchLoadPercentage: 0,
    isOwnDepartment: false,
    isExternalFaculty: true,
    servesOtherDepartment: false,
  },
  {
    id: "tl-ext-2",
    facultyId: "ext-2",
    facultyName: "Dr. Bhabha H. (Electronics & Comm Dept)",
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2025-26",
    program: "B.Tech Computer Science and Engineering",
    department: "Electronics & Communication",
    academicLoadPercentage: 100,
    researchLoadPercentage: 0,
    isOwnDepartment: false,
    isExternalFaculty: true,
    servesOtherDepartment: false,
  },
  {
    id: "tl-ext-3",
    facultyId: "ext-3",
    facultyName: "Prof. Tagore R. (Humanities Dept)",
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2025-26",
    program: "B.Tech Computer Science and Engineering",
    department: "Humanities & Social Sciences",
    academicLoadPercentage: 100,
    researchLoadPercentage: 0,
    isOwnDepartment: false,
    isExternalFaculty: true,
    servesOtherDepartment: false,
  },
  // CSE Faculty serving other departments (c = 0.50 -> 50%)
  {
    id: "tl-serv-1",
    facultyId: INITIAL_FACULTY[0].id,
    facultyName: INITIAL_FACULTY[0].name,
    assessmentCycleId: "cycle-2025-26",
    academicYear: "2025-26",
    program: "B.Tech Information Technology",
    department: "Computer Science & Engineering",
    academicLoadPercentage: 50,
    researchLoadPercentage: 0,
    isOwnDepartment: false,
    isExternalFaculty: false,
    servesOtherDepartment: true,
  },
];

// App Data Store (In-Memory with localStorage hydration in browser)
class Store {
  cycles: AssessmentCycleRecord[] = [...INITIAL_CYCLES];
  faculty: FacultyRecord[] = [...INITIAL_FACULTY];
  students: StudentRecord[] = [...INITIAL_STUDENTS];
  teachingLoads: TeachingLoadRecord[] = [...INITIAL_TEACHING_LOADS];
  mappings: QualificationMappingEntry[] = [...INITIAL_MAPPINGS];

  getActiveCycle(): AssessmentCycleRecord {
    return this.cycles.find((c) => c.isActive) || this.cycles[0];
  }

  // Calculations
  computeSFR(academicYear: string = "2025-26"): SFRBreakdown {
    const studentRec = this.students.find((s) => s.academicYear === academicYear);
    const studentsN = studentRec ? studentRec.totalStudents : 576;

    const loadsForYear = this.teachingLoads.filter(
      (l) => l.academicYear === academicYear
    );

    const contributions: TeachingLoadContribution[] = loadsForYear.map((l) => ({
      facultyId: l.facultyId,
      facultyName: l.facultyName,
      academicLoadPercentage: l.academicLoadPercentage,
      isOwnDepartment: l.isOwnDepartment,
      servesOtherDepartment: l.servesOtherDepartment,
      isExternalFaculty: l.isExternalFaculty,
    }));

    return calculateStudentFacultyRatio({
      studentsN,
      loads: contributions,
    });
  }

  computeRegularContractual(): RegularContractualResult {
    const records: FacultyRecordForCount[] = this.faculty.map((f) => ({
      facultyId: f.id,
      facultyName: f.name,
      employmentType: f.employmentType,
    }));
    return calculateRegularContractual(records);
  }

  computeFQI(
    academicYear: string = "2025-26",
    fMethod: FRequiredMethod = "INSTITUTIONAL",
    institutionalF: number = 23
  ): FQIBreakdown & {
    classifiedFaculty: ClassifiedFaculty[];
    unclassified: ClassifiedFaculty[];
    excluded: ClassifiedFaculty[];
  } {
    const studentRec = this.students.find((s) => s.academicYear === academicYear);
    const studentsN = studentRec ? studentRec.totalStudents : 576;

    const facultyToClassify = this.faculty.map((f) => ({
      facultyId: f.id,
      facultyName: f.name,
      qualification: f.qualification,
    }));

    const classified = classifyFaculty(facultyToClassify, this.mappings);
    const split = splitByClassification(classified);

    const fqiResult = calculateFacultyQualificationIndex({
      studentsN,
      xFaculty: split.X,
      yFaculty: split.Y,
      fMethod,
      institutionalF,
      ratioDenominator: 25,
    });

    return {
      ...fqiResult,
      classifiedFaculty: classified,
      unclassified: split.UNCLASSIFIED,
      excluded: split.EXCLUDE,
    };
  }
}

export const appStore = new Store();
