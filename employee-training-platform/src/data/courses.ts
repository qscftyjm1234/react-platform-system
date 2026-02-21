import { CourseGroup } from './settings';

export interface Course {
    id: string;
    title: string;
    description: string;
    type: 'required' | 'elective';
    tag: string;
    level: string;
    status: 'enabled' | 'disabled' | 'coming_soon';
    gradient: string;
    border: string;
    text: string;
    btn: string;
    path?: string;
}

export const COURSES: Course[] = [
    {
        id: 'course-react',
        title: 'React 新手教學：從基礎語法到架構設計',
        description: '掌握現代前端開發的核心標準。從基礎語法到架構設計，建立符合企業需求的開發邏輯。',
        type: 'required',
        tag: '必修',
        level: '中階',
        status: 'enabled',
        gradient: 'from-blue-50 to-indigo-50',
        border: 'border-blue-100',
        text: 'text-blue-900',
        btn: 'bg-blue-600 hover:!bg-blue-700',
        path: '/courses/react'
    },
    {
        id: 'course-docker',
        title: 'Docker 實戰大師：從容器化到雲端部署',
        description: '掌握容器技術核心，提升開發效率與環境一致性。',
        type: 'required',
        tag: '必修',
        level: '中階',
        status: 'enabled',
        gradient: 'from-indigo-50 to-blue-50',
        border: 'border-indigo-100',
        text: 'text-indigo-900',
        btn: 'bg-indigo-600 hover:!bg-indigo-700',
        path: '/courses/docker'
    },
    {
        id: 'course-js',
        title: 'JavaScript 現代化全攻略：ES6+ 到異步編程',
        description: '深入理解實戰技巧，打造高效能的現代前端應用。',
        type: 'elective',
        tag: '選修',
        level: '初階',
        status: 'disabled',
        gradient: 'from-amber-50 to-orange-50',
        border: 'border-amber-100',
        text: 'text-amber-900',
        btn: 'bg-amber-600 hover:!bg-amber-700'
    },
    {
        id: 'course-ai',
        title: 'AI 協作進化論：AI 賦能開發實戰',
        description: '從生成式 AI 到現代開發者的賦能之路。探索 AI 協作的無限可能，建立 AI 時代的開發者新思維。',
        type: 'elective',
        tag: '選修',
        level: '初階',
        status: 'enabled',
        gradient: 'from-emerald-50 to-teal-50',
        border: 'border-emerald-100',
        text: 'text-emerald-900',
        btn: 'bg-emerald-600 hover:!bg-emerald-700',
        path: '/courses/ai'
    },
    {
        id: 'course-csharp',
        title: 'C# 核心程式設計：從入門到進階實務',
        description: '掌握 .NET 生態系核心語言，建立強大的物件導向開發能力與伺服器端應用知識。',
        type: 'required',
        tag: '必修',
        level: '初階',
        status: 'coming_soon',
        gradient: 'from-purple-50 to-violet-50',
        border: 'border-purple-100',
        text: 'text-purple-900',
        btn: 'bg-purple-600 hover:!bg-purple-700'
    },
    {
        id: 'course-git',
        title: 'Git 版本控制實戰：團隊協作的技術核心',
        description: '不只是備份！深入理解 Git 分支模型、衝突解決與高效的團隊開發工作流。',
        type: 'required',
        tag: '必修',
        level: '初階',
        status: 'coming_soon',
        gradient: 'from-orange-50 to-amber-50',
        border: 'border-orange-100',
        text: 'text-orange-900',
        btn: 'bg-orange-600 hover:!bg-orange-700'
    },
    {
        id: 'course-typescript',
        title: 'TypeScript 進階實務：建立強型別的開發維護體系',
        description: '超越 JavaScript 的型別安全性，學習如何設計可維護、可擴展的大型前端與後端應用程式。',
        type: 'elective',
        tag: '選修',
        level: '中階',
        status: 'coming_soon',
        gradient: 'from-cyan-50 to-sky-50',
        border: 'border-cyan-100',
        text: 'text-cyan-900',
        btn: 'bg-cyan-600 hover:!bg-cyan-700'
    }
];

export const COURSE_GROUPS: CourseGroup[] = [
    {
        id: 'group-frontend',
        name: '前端通識群組',
        description: '涵蓋 React 與現代化開發必備技能',
        courseIds: ['course-react', 'course-typescript', 'course-js']
    },
    {
        id: 'group-backend',
        name: '後端容器群組',
        description: '雲端原生開發與環境整合核心課程',
        courseIds: ['course-docker', 'course-csharp', 'course-git']
    },
    {
        id: 'group-onboarding',
        name: '新人必修群組',
        description: '所有入職夥伴的共通核心素養',
        courseIds: ['course-git', 'course-ai']
    }
];
