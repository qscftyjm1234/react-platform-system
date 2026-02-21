export interface UserProgress {
  courseId: string;
  progress: number;
}

export interface Employee {
  id: string;
  name: string;
  avatar: string;
  role: string;
  dept: string;
  email: string;
  joinDate: string;
  lastActive: string;
  progress: UserProgress[];
}

export const EMPLOYEES: Employee[] = [
  {
    id: 'E001',
    name: '張家豪',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    role: '資深後端工程師',
    dept: '技術研發部',
    email: 'jiahao.zhang@example.com',
    joinDate: '2023-01-15',
    lastActive: '2026-02-21',
    progress: [
      { courseId: 'course-react', progress: 100 },
      { courseId: 'course-docker', progress: 85 },
      { courseId: 'course-ai', progress: 40 }
    ]
  },
  {
    id: 'E002',
    name: '李小美',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
    role: '前端工程師',
    dept: '技術研發部',
    email: 'xiaomei.li@example.com',
    joinDate: '2023-06-10',
    lastActive: '2026-02-20',
    progress: [
      { courseId: 'course-react', progress: 100 },
      { courseId: 'course-docker', progress: 20 },
      { courseId: 'course-ai', progress: 60 }
    ]
  },
  {
    id: 'E003',
    name: '王大同',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Gracie',
    role: '產品經理',
    dept: '產品策劃部',
    email: 'datong.wang@example.com',
    joinDate: '2022-11-05',
    lastActive: '2026-02-18',
    progress: [
      { courseId: 'course-react', progress: 10 },
      { courseId: 'course-docker', progress: 5 },
      { courseId: 'course-ai', progress: 95 }
    ]
  },
  {
    id: 'E004',
    name: '林雅婷',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eden',
    role: 'UI/UX 設計師',
    dept: '設計中心',
    email: 'yating.lin@example.com',
    joinDate: '2023-03-22',
    lastActive: '2026-02-21',
    progress: [
      { courseId: 'course-react', progress: 30 },
      { courseId: 'course-docker', progress: 0 },
      { courseId: 'course-ai', progress: 100 }
    ]
  },
  {
    id: 'E005',
    name: '陳志明',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=George',
    role: 'DevOps 工程師',
    dept: '技術運維部',
    email: 'zhiming.chen@example.com',
    joinDate: '2023-08-01',
    lastActive: '2026-02-21',
    progress: [
      { courseId: 'course-react', progress: 50 },
      { courseId: 'course-docker', progress: 100 },
      { courseId: 'course-ai', progress: 70 }
    ]
  },
  {
    id: 'E006',
    name: '郭靜宜',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jasper',
    role: '人事專員',
    dept: '行政人資部',
    email: 'jingyi.guo@example.com',
    joinDate: '2024-01-20',
    lastActive: '2026-02-19',
    progress: [
      { courseId: 'course-react', progress: 0 },
      { courseId: 'course-docker', progress: 0 },
      { courseId: 'course-ai', progress: 80 }
    ]
  }
];
