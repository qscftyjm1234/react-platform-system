export interface Department {
  id: string;
  name: string;
  employeeCount: number;
}

export interface AssignmentRule {
  id: string;
  targetType: 'dept' | 'role';
  targetValue: string; // e.g., '技術研發部' or 'Junior'
  courseIds: string[];
}

export const INITIAL_DEPARTMENTS: Department[] = [
  { id: 'D1', name: '技術研發部', employeeCount: 45 },
  { id: 'D2', name: '產品策劃部', employeeCount: 12 },
  { id: 'D3', name: '設計中心', employeeCount: 8 },
  { id: 'D4', name: '技術運維部', employeeCount: 15 },
  { id: 'D5', name: '行政人資部', employeeCount: 6 },
];

export const INITIAL_ASSIGNMENT_RULES: AssignmentRule[] = [
  {
    id: 'R1',
    targetType: 'dept',
    targetValue: '技術研發部',
    courseIds: ['course-react', 'course-docker'],
  },
  {
    id: 'R2',
    targetType: 'role',
    targetValue: '前端工程師',
    courseIds: ['course-react', 'course-typescript'],
  },
  {
    id: 'R3',
    targetType: 'dept',
    targetValue: '行政人資部',
    courseIds: ['course-ai'],
  },
];
