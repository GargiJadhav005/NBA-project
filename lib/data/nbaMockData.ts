// =============================================================
// NBA Accreditation Mock Data — powers all 10 modules
// =============================================================

// ---- NBA Criteria (Module 1 + 6 + 8) ----
export interface NBACriterion {
  id: string;
  number: number;
  title: string;
  maxMarks: number;
  scored: number;
  subCriteria: NBASubCriterion[];
}

export interface NBASubCriterion {
  id: string;
  code: string;
  title: string;
  maxMarks: number;
  scored: number;
  evidenceIds: string[];
  status: "COMPLETE" | "PARTIAL" | "PENDING";
}

export interface EvidenceDocument {
  id: string;
  name: string;
  criterionId: string;
  subCriterionId: string;
  category: string;
  uploadDate: string;
  academicYear: string;
  fileSize: string;
  status: "UPLOADED" | "VERIFIED" | "MISSING";
  description: string;
}

export const NBA_CRITERIA: NBACriterion[] = [
  {
    id: "c1",
    number: 1,
    title: "Vision, Mission and Program Educational Objectives",
    maxMarks: 60,
    scored: 55,
    subCriteria: [
      { id: "c1-1", code: "1.1", title: "Vision and Mission of the Institute and Department", maxMarks: 15, scored: 14, evidenceIds: ["ev-1", "ev-2"], status: "COMPLETE" },
      { id: "c1-2", code: "1.2", title: "Program Educational Objectives (PEOs)", maxMarks: 20, scored: 18, evidenceIds: ["ev-3"], status: "COMPLETE" },
      { id: "c1-3", code: "1.3", title: "PEO to Mission Mapping", maxMarks: 15, scored: 13, evidenceIds: ["ev-4"], status: "PARTIAL" },
      { id: "c1-4", code: "1.4", title: "Stakeholder Feedback Process", maxMarks: 10, scored: 10, evidenceIds: ["ev-5", "ev-6"], status: "COMPLETE" },
    ],
  },
  {
    id: "c2",
    number: 2,
    title: "Program Curriculum and Teaching-Learning Processes",
    maxMarks: 120,
    scored: 97,
    subCriteria: [
      { id: "c2-1", code: "2.1", title: "Curriculum Design", maxMarks: 30, scored: 27, evidenceIds: ["ev-7"], status: "COMPLETE" },
      { id: "c2-2", code: "2.2", title: "Teaching-Learning Delivery", maxMarks: 30, scored: 24, evidenceIds: ["ev-8"], status: "PARTIAL" },
      { id: "c2-3", code: "2.3", title: "Assessment and Evaluation", maxMarks: 30, scored: 26, evidenceIds: ["ev-9", "ev-10"], status: "COMPLETE" },
      { id: "c2-4", code: "2.4", title: "Student Performance Analysis", maxMarks: 30, scored: 20, evidenceIds: [], status: "PENDING" },
    ],
  },
  {
    id: "c3",
    number: 3,
    title: "Course Outcomes and Program Outcomes",
    maxMarks: 200,
    scored: 146,
    subCriteria: [
      { id: "c3-1", code: "3.1", title: "CO Attainment Analysis", maxMarks: 60, scored: 44, evidenceIds: ["ev-11"], status: "PARTIAL" },
      { id: "c3-2", code: "3.2", title: "PO Attainment Calculation", maxMarks: 60, scored: 45, evidenceIds: ["ev-12"], status: "PARTIAL" },
      { id: "c3-3", code: "3.3", title: "CO-PO Mapping Matrix", maxMarks: 40, scored: 32, evidenceIds: ["ev-13"], status: "COMPLETE" },
      { id: "c3-4", code: "3.4", title: "Gap Analysis & Action Taken", maxMarks: 40, scored: 25, evidenceIds: [], status: "PENDING" },
    ],
  },
  {
    id: "c4",
    number: 4,
    title: "Students' Performance",
    maxMarks: 150,
    scored: 127,
    subCriteria: [
      { id: "c4-1", code: "4.1", title: "Enrollment and Success Rate", maxMarks: 50, scored: 45, evidenceIds: ["ev-14"], status: "COMPLETE" },
      { id: "c4-2", code: "4.2", title: "Placement and Higher Studies", maxMarks: 50, scored: 42, evidenceIds: ["ev-15"], status: "COMPLETE" },
      { id: "c4-3", code: "4.3", title: "Professional Activities", maxMarks: 50, scored: 40, evidenceIds: ["ev-16"], status: "PARTIAL" },
    ],
  },
  {
    id: "c5",
    number: 5,
    title: "Faculty Information and Contributions",
    maxMarks: 200,
    scored: 170,
    subCriteria: [
      { id: "c5-1", code: "5.1", title: "Student Faculty Ratio", maxMarks: 50, scored: 42, evidenceIds: ["ev-17"], status: "COMPLETE" },
      { id: "c5-2", code: "5.2", title: "Faculty Cadre Ratio", maxMarks: 50, scored: 45, evidenceIds: ["ev-18"], status: "COMPLETE" },
      { id: "c5-3", code: "5.3", title: "Faculty Qualifications", maxMarks: 50, scored: 43, evidenceIds: ["ev-19"], status: "COMPLETE" },
      { id: "c5-4", code: "5.4", title: "Faculty Contributions", maxMarks: 50, scored: 40, evidenceIds: ["ev-20"], status: "PARTIAL" },
    ],
  },
  {
    id: "c6",
    number: 6,
    title: "Facilities and Technical Support",
    maxMarks: 100,
    scored: 64,
    subCriteria: [
      { id: "c6-1", code: "6.1", title: "Infrastructure", maxMarks: 40, scored: 30, evidenceIds: [], status: "PENDING" },
      { id: "c6-2", code: "6.2", title: "Laboratory Equipment", maxMarks: 30, scored: 18, evidenceIds: ["ev-21"], status: "PARTIAL" },
      { id: "c6-3", code: "6.3", title: "Library & Computing Facilities", maxMarks: 30, scored: 16, evidenceIds: [], status: "PENDING" },
    ],
  },
  {
    id: "c7",
    number: 7,
    title: "Academic Support Units and Teaching-Learning Process",
    maxMarks: 50,
    scored: 35,
    subCriteria: [
      { id: "c7-1", code: "7.1", title: "Training & Placement Cell", maxMarks: 25, scored: 20, evidenceIds: ["ev-22"], status: "PARTIAL" },
      { id: "c7-2", code: "7.2", title: "Academic Support Systems", maxMarks: 25, scored: 15, evidenceIds: [], status: "PENDING" },
    ],
  },
  {
    id: "c8",
    number: 8,
    title: "Governance, Institutional Support and Financial Resources",
    maxMarks: 50,
    scored: 40,
    subCriteria: [
      { id: "c8-1", code: "8.1", title: "Institutional Governance", maxMarks: 25, scored: 22, evidenceIds: ["ev-23"], status: "COMPLETE" },
      { id: "c8-2", code: "8.2", title: "Budget and Financial Support", maxMarks: 25, scored: 18, evidenceIds: ["ev-24"], status: "PARTIAL" },
    ],
  },
  {
    id: "c9",
    number: 9,
    title: "Continuous Improvement",
    maxMarks: 50,
    scored: 38,
    subCriteria: [
      { id: "c9-1", code: "9.1", title: "IQAC / Quality Assurance", maxMarks: 25, scored: 20, evidenceIds: ["ev-25"], status: "PARTIAL" },
      { id: "c9-2", code: "9.2", title: "Actions Taken on Feedback", maxMarks: 25, scored: 18, evidenceIds: [], status: "PENDING" },
    ],
  },
  {
    id: "c10",
    number: 10,
    title: "First Year Academics",
    maxMarks: 20,
    scored: 16,
    subCriteria: [
      { id: "c10-1", code: "10.1", title: "FY Curriculum and Pedagogy", maxMarks: 20, scored: 16, evidenceIds: ["ev-26"], status: "COMPLETE" },
    ],
  },
];

export const EVIDENCE_DOCUMENTS: EvidenceDocument[] = [
  { id: "ev-1", name: "Vision_Mission_Board_Resolution.pdf", criterionId: "c1", subCriterionId: "c1-1", category: "Resolution", uploadDate: "2025-08-15", academicYear: "2025-26", fileSize: "2.4 MB", status: "VERIFIED", description: "Board of Governors' resolution approving vision & mission statements." },
  { id: "ev-2", name: "Department_Mission_Display_Photos.zip", criterionId: "c1", subCriterionId: "c1-1", category: "Photographs", uploadDate: "2025-08-20", academicYear: "2025-26", fileSize: "15.2 MB", status: "VERIFIED", description: "Photos showing mission displayed in department, labs, and website." },
  { id: "ev-3", name: "PEO_Stakeholder_Mapping.xlsx", criterionId: "c1", subCriterionId: "c1-2", category: "Mapping", uploadDate: "2025-09-01", academicYear: "2025-26", fileSize: "340 KB", status: "VERIFIED", description: "PEO formulation process with stakeholder input." },
  { id: "ev-4", name: "PEO_Mission_Matrix.pdf", criterionId: "c1", subCriterionId: "c1-3", category: "Matrix", uploadDate: "2025-09-10", academicYear: "2025-26", fileSize: "1.1 MB", status: "UPLOADED", description: "Matrix showing PEO alignment with institutional mission." },
  { id: "ev-5", name: "Alumni_Feedback_2025.xlsx", criterionId: "c1", subCriterionId: "c1-4", category: "Feedback", uploadDate: "2025-09-15", academicYear: "2025-26", fileSize: "780 KB", status: "VERIFIED", description: "Alumni survey results and analysis." },
  { id: "ev-6", name: "Industry_Feedback_Report.pdf", criterionId: "c1", subCriterionId: "c1-4", category: "Feedback", uploadDate: "2025-09-18", academicYear: "2025-26", fileSize: "1.5 MB", status: "VERIFIED", description: "Industry advisory board feedback analysis." },
  { id: "ev-7", name: "Curriculum_Structure_BOS.pdf", criterionId: "c2", subCriterionId: "c2-1", category: "Curriculum", uploadDate: "2025-07-10", academicYear: "2025-26", fileSize: "5.2 MB", status: "VERIFIED", description: "Board of Studies approved curriculum with credit distribution." },
  { id: "ev-8", name: "Teaching_Methods_Portfolio.pdf", criterionId: "c2", subCriterionId: "c2-2", category: "Portfolio", uploadDate: "2025-10-01", academicYear: "2025-26", fileSize: "3.8 MB", status: "UPLOADED", description: "ICT tools, flipped classroom, and project-based learning evidence." },
  { id: "ev-9", name: "Question_Papers_CAY.zip", criterionId: "c2", subCriterionId: "c2-3", category: "Assessment", uploadDate: "2025-10-05", academicYear: "2025-26", fileSize: "22.1 MB", status: "VERIFIED", description: "Internal and external question papers with Bloom's taxonomy tagging." },
  { id: "ev-10", name: "Rubrics_and_Evaluation.pdf", criterionId: "c2", subCriterionId: "c2-3", category: "Assessment", uploadDate: "2025-10-05", academicYear: "2025-26", fileSize: "1.9 MB", status: "VERIFIED", description: "Rubrics for assignments, labs, and projects." },
  { id: "ev-11", name: "CO_Attainment_Sheets.xlsx", criterionId: "c3", subCriterionId: "c3-1", category: "Attainment", uploadDate: "2025-10-10", academicYear: "2025-26", fileSize: "4.5 MB", status: "UPLOADED", description: "Course-wise CO attainment calculation sheets." },
  { id: "ev-12", name: "PO_Attainment_Report.pdf", criterionId: "c3", subCriterionId: "c3-2", category: "Attainment", uploadDate: "2025-10-10", academicYear: "2025-26", fileSize: "2.3 MB", status: "UPLOADED", description: "Program outcome attainment consolidated report." },
  { id: "ev-13", name: "CO_PO_Mapping_Matrix.xlsx", criterionId: "c3", subCriterionId: "c3-3", category: "Matrix", uploadDate: "2025-09-20", academicYear: "2025-26", fileSize: "890 KB", status: "VERIFIED", description: "CO-PO articulation matrix for all courses." },
  { id: "ev-14", name: "Enrollment_Success_Rate.xlsx", criterionId: "c4", subCriterionId: "c4-1", category: "Statistics", uploadDate: "2025-09-25", academicYear: "2025-26", fileSize: "650 KB", status: "VERIFIED", description: "Year-wise enrollment, dropout, and success rate data." },
  { id: "ev-15", name: "Placement_Records_2025.xlsx", criterionId: "c4", subCriterionId: "c4-2", category: "Placement", uploadDate: "2025-10-01", academicYear: "2025-26", fileSize: "1.2 MB", status: "VERIFIED", description: "Company-wise placement data with CTC details." },
  { id: "ev-16", name: "Student_Publications.pdf", criterionId: "c4", subCriterionId: "c4-3", category: "Activities", uploadDate: "2025-10-05", academicYear: "2025-26", fileSize: "980 KB", status: "UPLOADED", description: "Papers published by students in conferences and journals." },
  { id: "ev-17", name: "SFR_Calculation_Sheet.xlsx", criterionId: "c5", subCriterionId: "c5-1", category: "Calculation", uploadDate: "2025-08-10", academicYear: "2025-26", fileSize: "420 KB", status: "VERIFIED", description: "Student Faculty Ratio computation with teaching load." },
  { id: "ev-18", name: "Faculty_Cadre_Details.xlsx", criterionId: "c5", subCriterionId: "c5-2", category: "Faculty", uploadDate: "2025-08-10", academicYear: "2025-26", fileSize: "380 KB", status: "VERIFIED", description: "Professor/Associate/Assistant breakdown with appointment orders." },
  { id: "ev-19", name: "FQI_Qualification_Proof.zip", criterionId: "c5", subCriterionId: "c5-3", category: "Faculty", uploadDate: "2025-08-15", academicYear: "2025-26", fileSize: "48.5 MB", status: "VERIFIED", description: "Ph.D. and M.Tech degree certificates for all faculty." },
  { id: "ev-20", name: "Faculty_Publications_List.xlsx", criterionId: "c5", subCriterionId: "c5-4", category: "Publications", uploadDate: "2025-10-08", academicYear: "2025-26", fileSize: "1.1 MB", status: "UPLOADED", description: "Research publications, consultancy, and funded projects." },
  { id: "ev-21", name: "Lab_Equipment_Inventory.xlsx", criterionId: "c6", subCriterionId: "c6-2", category: "Inventory", uploadDate: "2025-09-05", academicYear: "2025-26", fileSize: "2.8 MB", status: "UPLOADED", description: "Laboratory equipment inventory with procurement dates." },
  { id: "ev-22", name: "Placement_Cell_Report.pdf", criterionId: "c7", subCriterionId: "c7-1", category: "Report", uploadDate: "2025-09-20", academicYear: "2025-26", fileSize: "3.2 MB", status: "UPLOADED", description: "Training & Placement cell activities and outcomes." },
  { id: "ev-23", name: "Governance_Structure.pdf", criterionId: "c8", subCriterionId: "c8-1", category: "Governance", uploadDate: "2025-07-20", academicYear: "2025-26", fileSize: "1.8 MB", status: "VERIFIED", description: "Organizational chart and governance policies." },
  { id: "ev-24", name: "Budget_Allocation_2025.xlsx", criterionId: "c8", subCriterionId: "c8-2", category: "Finance", uploadDate: "2025-08-01", academicYear: "2025-26", fileSize: "560 KB", status: "UPLOADED", description: "Department-wise budget allocation and utilization." },
  { id: "ev-25", name: "IQAC_Minutes.pdf", criterionId: "c9", subCriterionId: "c9-1", category: "Quality", uploadDate: "2025-09-28", academicYear: "2025-26", fileSize: "2.1 MB", status: "UPLOADED", description: "IQAC meeting minutes and action items." },
  { id: "ev-26", name: "FY_Curriculum_Report.pdf", criterionId: "c10", subCriterionId: "c10-1", category: "Curriculum", uploadDate: "2025-07-15", academicYear: "2025-26", fileSize: "1.4 MB", status: "VERIFIED", description: "First year curriculum structure and pedagogy." },
];

// ---- Program Outcomes (Module 2) ----
export interface ProgramOutcome {
  id: string;
  code: string;
  title: string;
  description: string;
  targetAttainment: number; // 0-3
  actualAttainment: number;
}

export const PROGRAM_OUTCOMES: ProgramOutcome[] = [
  { id: "po1", code: "PO1", title: "Engineering Knowledge", description: "Apply the knowledge of mathematics, science, engineering fundamentals, and an engineering specialization to the solution of complex engineering problems.", targetAttainment: 2.5, actualAttainment: 2.7 },
  { id: "po2", code: "PO2", title: "Problem Analysis", description: "Identify, formulate, review research literature, and analyze complex engineering problems reaching substantiated conclusions.", targetAttainment: 2.5, actualAttainment: 2.4 },
  { id: "po3", code: "PO3", title: "Design/Development of Solutions", description: "Design solutions for complex engineering problems and design system components or processes that meet the specified needs.", targetAttainment: 2.0, actualAttainment: 1.8 },
  { id: "po4", code: "PO4", title: "Conduct Investigations", description: "Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data.", targetAttainment: 2.0, actualAttainment: 2.1 },
  { id: "po5", code: "PO5", title: "Modern Tool Usage", description: "Create, select, and apply appropriate techniques, resources, and modern engineering and IT tools.", targetAttainment: 2.5, actualAttainment: 2.6 },
  { id: "po6", code: "PO6", title: "The Engineer and Society", description: "Apply reasoning informed by the contextual knowledge to assess societal, health, safety, legal and cultural issues.", targetAttainment: 2.0, actualAttainment: 2.2 },
  { id: "po7", code: "PO7", title: "Environment and Sustainability", description: "Understand the impact of the professional engineering solutions in societal and environmental contexts.", targetAttainment: 2.0, actualAttainment: 1.9 },
  { id: "po8", code: "PO8", title: "Ethics", description: "Apply ethical principles and commit to professional ethics and responsibilities.", targetAttainment: 2.5, actualAttainment: 2.8 },
  { id: "po9", code: "PO9", title: "Individual and Teamwork", description: "Function effectively as an individual, and as a member or leader in diverse teams.", targetAttainment: 2.5, actualAttainment: 2.5 },
  { id: "po10", code: "PO10", title: "Communication", description: "Communicate effectively on complex engineering activities with the engineering community and society.", targetAttainment: 2.0, actualAttainment: 2.3 },
  { id: "po11", code: "PO11", title: "Project Management and Finance", description: "Demonstrate knowledge and understanding of engineering and management principles.", targetAttainment: 2.0, actualAttainment: 2.0 },
  { id: "po12", code: "PO12", title: "Life-long Learning", description: "Recognize the need for and have the preparation and ability to engage in independent and life-long learning.", targetAttainment: 2.0, actualAttainment: 2.1 },
];

// ---- Courses & Course Outcomes (Module 3 + 5) ----
export interface Course {
  id: string;
  code: string;
  name: string;
  semester: number;
  credits: number;
  type: "THEORY" | "LAB" | "PROJECT";
  facultyId: string;
  facultyName: string;
  courseOutcomes: CourseOutcome[];
}

export interface CourseOutcome {
  id: string;
  code: string;
  description: string;
  bloomLevel: string;
  targetAttainment: number;
  actualAttainment: number;
  // CO-PO mapping: level 1 (low), 2 (medium), 3 (high), 0 (no correlation)
  poMapping: number[];
}

export const COURSES: Course[] = [
  {
    id: "crs-1", code: "CS301", name: "Data Structures & Algorithms", semester: 3, credits: 4, type: "THEORY",
    facultyId: "fac-3", facultyName: "Dr. Vikramaditya Rao",
    courseOutcomes: [
      { id: "co-1-1", code: "CO1", description: "Understand and implement linear data structures", bloomLevel: "Apply", targetAttainment: 2.5, actualAttainment: 2.6, poMapping: [3, 2, 1, 0, 2, 0, 0, 0, 0, 0, 0, 0] },
      { id: "co-1-2", code: "CO2", description: "Analyze time and space complexity of algorithms", bloomLevel: "Analyze", targetAttainment: 2.5, actualAttainment: 2.3, poMapping: [3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0] },
      { id: "co-1-3", code: "CO3", description: "Design efficient solutions using tree and graph structures", bloomLevel: "Create", targetAttainment: 2.0, actualAttainment: 2.1, poMapping: [2, 2, 3, 2, 2, 0, 0, 0, 1, 0, 0, 1] },
      { id: "co-1-4", code: "CO4", description: "Apply sorting and searching techniques to real-world problems", bloomLevel: "Apply", targetAttainment: 2.0, actualAttainment: 1.9, poMapping: [2, 1, 2, 1, 3, 1, 0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    id: "crs-2", code: "CS302", name: "Database Management Systems", semester: 3, credits: 4, type: "THEORY",
    facultyId: "fac-5", facultyName: "Dr. Arvind Kulkarni",
    courseOutcomes: [
      { id: "co-2-1", code: "CO1", description: "Design ER models and relational schemas", bloomLevel: "Create", targetAttainment: 2.5, actualAttainment: 2.4, poMapping: [2, 2, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0] },
      { id: "co-2-2", code: "CO2", description: "Write complex SQL queries and optimize them", bloomLevel: "Apply", targetAttainment: 2.5, actualAttainment: 2.7, poMapping: [3, 2, 2, 0, 3, 0, 0, 0, 0, 0, 0, 0] },
      { id: "co-2-3", code: "CO3", description: "Implement normalization up to BCNF", bloomLevel: "Analyze", targetAttainment: 2.0, actualAttainment: 2.0, poMapping: [3, 3, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0] },
    ],
  },
  {
    id: "crs-3", code: "CS401", name: "Operating Systems", semester: 4, credits: 4, type: "THEORY",
    facultyId: "fac-17", facultyName: "Prof. Manoj Kumar",
    courseOutcomes: [
      { id: "co-3-1", code: "CO1", description: "Explain process management and scheduling algorithms", bloomLevel: "Understand", targetAttainment: 2.5, actualAttainment: 2.5, poMapping: [3, 2, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0] },
      { id: "co-3-2", code: "CO2", description: "Analyze deadlock prevention and avoidance strategies", bloomLevel: "Analyze", targetAttainment: 2.0, actualAttainment: 1.8, poMapping: [2, 3, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0] },
      { id: "co-3-3", code: "CO3", description: "Implement memory management techniques", bloomLevel: "Apply", targetAttainment: 2.0, actualAttainment: 2.2, poMapping: [2, 2, 3, 1, 2, 0, 0, 0, 1, 0, 0, 0] },
    ],
  },
  {
    id: "crs-4", code: "CS402", name: "Computer Networks", semester: 4, credits: 3, type: "THEORY",
    facultyId: "fac-13", facultyName: "Prof. Siddharth Jain",
    courseOutcomes: [
      { id: "co-4-1", code: "CO1", description: "Understand OSI and TCP/IP reference models", bloomLevel: "Understand", targetAttainment: 2.5, actualAttainment: 2.6, poMapping: [3, 1, 0, 0, 2, 1, 0, 0, 0, 1, 0, 0] },
      { id: "co-4-2", code: "CO2", description: "Analyze routing protocols and network security", bloomLevel: "Analyze", targetAttainment: 2.0, actualAttainment: 1.7, poMapping: [2, 3, 2, 2, 2, 1, 0, 1, 0, 0, 0, 0] },
      { id: "co-4-3", code: "CO3", description: "Design network topologies for given requirements", bloomLevel: "Create", targetAttainment: 2.0, actualAttainment: 2.1, poMapping: [1, 2, 3, 1, 3, 0, 1, 0, 2, 1, 0, 0] },
    ],
  },
  {
    id: "crs-5", code: "CS501", name: "Machine Learning", semester: 5, credits: 4, type: "THEORY",
    facultyId: "fac-3", facultyName: "Dr. Vikramaditya Rao",
    courseOutcomes: [
      { id: "co-5-1", code: "CO1", description: "Implement supervised learning algorithms", bloomLevel: "Apply", targetAttainment: 2.5, actualAttainment: 2.3, poMapping: [3, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 1] },
      { id: "co-5-2", code: "CO2", description: "Evaluate model performance using metrics", bloomLevel: "Evaluate", targetAttainment: 2.0, actualAttainment: 2.0, poMapping: [2, 3, 1, 3, 2, 0, 0, 0, 0, 0, 0, 1] },
      { id: "co-5-3", code: "CO3", description: "Apply unsupervised learning to real datasets", bloomLevel: "Apply", targetAttainment: 2.0, actualAttainment: 1.6, poMapping: [2, 2, 3, 3, 3, 1, 1, 0, 2, 1, 0, 1] },
    ],
  },
  {
    id: "crs-6", code: "CS502", name: "Software Engineering", semester: 5, credits: 3, type: "THEORY",
    facultyId: "fac-10", facultyName: "Dr. Deepa Nair",
    courseOutcomes: [
      { id: "co-6-1", code: "CO1", description: "Apply SDLC models to software projects", bloomLevel: "Apply", targetAttainment: 2.0, actualAttainment: 2.2, poMapping: [1, 1, 3, 0, 2, 1, 0, 1, 2, 2, 3, 1] },
      { id: "co-6-2", code: "CO2", description: "Design UML diagrams for system modeling", bloomLevel: "Create", targetAttainment: 2.0, actualAttainment: 2.1, poMapping: [1, 2, 3, 0, 2, 0, 0, 0, 1, 2, 2, 0] },
      { id: "co-6-3", code: "CO3", description: "Perform software testing and quality assurance", bloomLevel: "Evaluate", targetAttainment: 2.0, actualAttainment: 1.9, poMapping: [2, 2, 2, 2, 2, 0, 0, 1, 1, 1, 2, 0] },
    ],
  },
  {
    id: "crs-7", code: "CS601", name: "Artificial Intelligence", semester: 6, credits: 4, type: "THEORY",
    facultyId: "fac-1", facultyName: "Dr. Rajesh Sharma",
    courseOutcomes: [
      { id: "co-7-1", code: "CO1", description: "Apply search algorithms and heuristics", bloomLevel: "Apply", targetAttainment: 2.5, actualAttainment: 2.4, poMapping: [3, 3, 2, 2, 2, 0, 0, 0, 0, 0, 0, 1] },
      { id: "co-7-2", code: "CO2", description: "Design knowledge representation systems", bloomLevel: "Create", targetAttainment: 2.0, actualAttainment: 2.0, poMapping: [2, 2, 3, 2, 2, 1, 0, 1, 1, 1, 0, 1] },
      { id: "co-7-3", code: "CO3", description: "Implement neural network architectures", bloomLevel: "Apply", targetAttainment: 2.0, actualAttainment: 1.7, poMapping: [3, 2, 3, 3, 3, 0, 1, 0, 1, 0, 0, 2] },
    ],
  },
  {
    id: "crs-8", code: "CS603", name: "Cybersecurity Fundamentals", semester: 6, credits: 3, type: "THEORY",
    facultyId: "fac-2", facultyName: "Dr. Ananya Sen",
    courseOutcomes: [
      { id: "co-8-1", code: "CO1", description: "Identify common security threats and vulnerabilities", bloomLevel: "Understand", targetAttainment: 2.5, actualAttainment: 2.8, poMapping: [2, 2, 1, 1, 2, 2, 0, 3, 0, 1, 0, 1] },
      { id: "co-8-2", code: "CO2", description: "Apply cryptographic techniques for data protection", bloomLevel: "Apply", targetAttainment: 2.5, actualAttainment: 2.3, poMapping: [3, 2, 2, 2, 3, 1, 0, 2, 0, 0, 0, 1] },
      { id: "co-8-3", code: "CO3", description: "Design secure network architectures", bloomLevel: "Create", targetAttainment: 2.0, actualAttainment: 1.9, poMapping: [2, 2, 3, 1, 3, 2, 1, 2, 1, 1, 1, 1] },
    ],
  },
];

// ---- Student Performance (Module 4) ----
export interface StudentResult {
  id: string;
  studentName: string;
  rollNumber: string;
  semester: number;
  courseId: string;
  courseCode: string;
  courseName: string;
  internalMarks: number; // out of 40
  externalMarks: number; // out of 60
  totalMarks: number;
  grade: string;
  attendance: number; // percentage
  assignmentScore: number; // out of 20
  labScore: number; // out of 25
}

const studentNames = [
  "Aarav Mehta", "Priya Singh", "Rahul Verma", "Sneha Patil", "Vikram Joshi",
  "Ananya Gupta", "Rohan Desai", "Kavita Nair", "Aditya Sharma", "Pooja Reddy",
  "Arjun Kumar", "Neha Agarwal", "Siddharth Iyer", "Divya Choudhary", "Karan Malhotra",
  "Ishita Bansal", "Tanmay Patel", "Riya Saxena", "Dhruv Kapoor", "Shreya Jain",
];

function generateGrade(total: number): string {
  if (total >= 90) return "O";
  if (total >= 80) return "A+";
  if (total >= 70) return "A";
  if (total >= 60) return "B+";
  if (total >= 50) return "B";
  if (total >= 40) return "C";
  return "F";
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const STUDENT_RESULTS: StudentResult[] = [];
let resultId = 1;
COURSES.forEach((course, ci) => {
  studentNames.forEach((name, si) => {
    const seed = ci * 100 + si;
    const internal = Math.round(22 + seededRandom(seed) * 18);
    const external = Math.round(30 + seededRandom(seed + 1) * 30);
    const total = internal + external;
    const attendance = Math.round(70 + seededRandom(seed + 2) * 30);
    const assignmentScore = Math.round(10 + seededRandom(seed + 3) * 10);
    const labScore = course.type === "LAB" ? Math.round(12 + seededRandom(seed + 4) * 13) : Math.round(15 + seededRandom(seed + 4) * 10);
    STUDENT_RESULTS.push({
      id: `res-${resultId++}`,
      studentName: name,
      rollNumber: `CSE${String(2025000 + si + 1)}`,
      semester: course.semester,
      courseId: course.id,
      courseCode: course.code,
      courseName: course.name,
      internalMarks: internal,
      externalMarks: external,
      totalMarks: total,
      grade: generateGrade(total),
      attendance,
      assignmentScore,
      labScore,
    });
  });
});

// ---- AI Chat Messages (Module 7 + Feature) ----
export interface AIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export const SAMPLE_AI_CHAT: AIChatMessage[] = [
  { id: "msg-1", role: "user", content: "Which NBA criteria have incomplete evidence?", timestamp: "2025-10-12T10:30:00" },
  { id: "msg-2", role: "assistant", content: "Based on the current evidence repository, the following criteria have incomplete evidence:\n\n• **Criterion 2** – Sub-criterion 2.4 (Student Performance Analysis) has no uploaded evidence.\n• **Criterion 3** – Sub-criterion 3.4 (Gap Analysis & Action Taken) has no evidence documents.\n• **Criterion 6** – Sub-criteria 6.1 (Infrastructure) and 6.3 (Library & Computing Facilities) are missing evidence.\n• **Criterion 7** – Sub-criterion 7.2 (Academic Support Systems) has no uploaded documents.\n• **Criterion 9** – Sub-criterion 9.2 (Actions Taken on Feedback) needs documentation.\n\nI recommend prioritizing Criterion 6 as it has the lowest completion rate at 64%.", timestamp: "2025-10-12T10:30:05" },
  { id: "msg-3", role: "user", content: "Show courses where PO3 attainment is below target.", timestamp: "2025-10-12T10:32:00" },
  { id: "msg-4", role: "assistant", content: "PO3 (Design/Development of Solutions) has a target attainment of **2.0** and current actual attainment of **1.8**. The following courses contribute to PO3 underperformance:\n\n| Course | CO | PO3 Mapping Level | CO Attainment | Gap |\n|--------|-----|----|----|----|\n| CS501 Machine Learning | CO3 | 3 (High) | 1.6 | -0.4 |\n| CS601 Artificial Intelligence | CO3 | 3 (High) | 1.7 | -0.3 |\n| CS603 Cybersecurity | CO3 | 3 (High) | 1.9 | -0.1 |\n\n**Recommended actions:** Focus remedial workshops on Machine Learning practical applications and AI implementation labs.", timestamp: "2025-10-12T10:32:08" },
];

// ---- Utility: compute overall readiness (Module 8) ----
export function computeOverallReadiness(): { overall: number; byCriterion: { id: string; number: number; title: string; percentage: number }[] } {
  let totalMax = 0;
  let totalScored = 0;
  const byCriterion = NBA_CRITERIA.map((c) => {
    totalMax += c.maxMarks;
    totalScored += c.scored;
    return { id: c.id, number: c.number, title: c.title, percentage: Math.round((c.scored / c.maxMarks) * 100) };
  });
  return { overall: Math.round((totalScored / totalMax) * 100), byCriterion };
}

// ---- Utility: compute PO attainment from CO data (Module 5) ----
export function computePOAttainmentFromCourses(): { poCode: string; target: number; actual: number }[] {
  return PROGRAM_OUTCOMES.map((po, poIndex) => {
    let weightedSum = 0;
    let totalWeight = 0;
    COURSES.forEach((course) => {
      course.courseOutcomes.forEach((co) => {
        const level = co.poMapping[poIndex];
        if (level > 0) {
          weightedSum += co.actualAttainment * level;
          totalWeight += level;
        }
      });
    });
    const actual = totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 100) / 100 : 0;
    return { poCode: po.code, target: po.targetAttainment, actual };
  });
}
