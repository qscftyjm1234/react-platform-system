import React from 'react';
import { KPICard } from '../components/dashboard/KPICard';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { 
    BookOutlined, 
    PlayCircleOutlined, 
    CheckCircleOutlined, 
    TrophyOutlined,
    RightOutlined,
    ClockCircleOutlined,
    StarOutlined,
    LockOutlined
} from '@ant-design/icons';
import { Typography, Button, Tag, Progress } from 'antd';
import { useAuth } from '../contexts/AuthContext';

import { COURSES } from '@/data/courses';
import { reactLessons } from '@/data/reactLessons';
import { dockerLessons } from '@/data/dockerLessons';
import { aiLessons } from '@/data/aiLessons';

const { Title, Text } = Typography;

export const Dashboard: React.FC = () => {
    const { user, completedLessons } = useAuth();
    const [notStartedFilter, setNotStartedFilter] = React.useState<'all' | 'required' | 'elective'>('all');
    const [inProgressFilter, setInProgressFilter] = React.useState<'all' | 'required' | 'elective'>('all');

    // Calculate progress for each course
    const coursesWithProgress = React.useMemo(() => {
        return COURSES.map(course => {
            let lessons: any[] = [];
            if (course.id === 'course-react') lessons = reactLessons;
            else if (course.id === 'course-docker') lessons = dockerLessons;
            else if (course.id === 'course-ai') lessons = aiLessons;

            const total = lessons.length;
            const completed = lessons.filter(l => completedLessons.includes(l.id)).length;
            const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
            
            return {
                ...course,
                progress,
                completedCount: completed,
                totalCount: total
            };
        });
    }, [completedLessons]);

    // Categorize courses
    const inProgressCourses = coursesWithProgress.filter(c => c.progress > 0 && c.progress < 100);
    const completedCourses = coursesWithProgress.filter(c => c.progress === 100);
    const notStartedCourses = coursesWithProgress.filter(c => c.progress === 0);

    const filteredInProgress = inProgressCourses.filter(course => 
        inProgressFilter === 'all' || course.type === inProgressFilter
    );

    const filteredNotStarted = notStartedCourses.filter(course => 
        notStartedFilter === 'all' || course.type === notStartedFilter
    );

    const requiredCount = coursesWithProgress.filter(c => c.type === 'required' && c.progress < 100).length;
    const totalCompleted = completedCourses.length;

    // Calculate aggregate progress for banner
    const mandatoryTotalProgress = coursesWithProgress
        .filter(c => c.type === 'required')
        .reduce((acc, c) => acc + c.progress, 0) / (coursesWithProgress.filter(c => c.type === 'required').length || 1);
    
    const electiveTotalProgress = coursesWithProgress
        .filter(c => c.type === 'elective')
        .reduce((acc, c) => acc + c.progress, 0) / (coursesWithProgress.filter(c => c.type === 'elective').length || 1);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* 壯觀的歡迎橫幅 */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 lg:p-12 text-white shadow-2xl shadow-blue-100">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div className="max-w-2xl">
                        <Tag color="blue" className="bg-white/10 border-none text-blue-100 mb-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest leading-none">
                            歡迎回來，{user?.role === 'admin' ? '系統管理員' : '夥伴'}
                        </Tag>
                        <Title level={1} className="!text-white !mb-4 !text-4xl lg:!text-5xl !font-black tracking-tight">
                            早安，{user?.name}。
                        </Title>
                        <Text className="text-blue-100/80 text-lg lg:text-xl font-light leading-relaxed block mb-6">
                            今天是一個學習的好時機。您目前有 <span className="text-white font-bold underline decoration-blue-400 underline-offset-4">{requiredCount} 門</span> 必修課程進行中，快來完成它們吧！
                        </Text>
                        <div className="flex flex-wrap gap-4">
                            <Button type="primary" size="large" className="bg-white text-blue-700 border-none font-bold rounded-xl h-12 px-8 hover:!bg-blue-50 transition-all shadow-lg">
                                繼續學習
                            </Button>
                        </div>
                    </div>
                    
                    {/* 進度摘要卡片 */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full lg:w-80 shadow-inner">
                        <Text className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-4 block">個人學習進度</Text>
                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-blue-50">年度必修</span>
                                    <span className="font-bold">{Math.round(mandatoryTotalProgress)}%</span>
                                </div>
                                <Progress percent={Math.round(mandatoryTotalProgress)} showInfo={false} strokeColor="#60A5FA" trailColor="rgba(255,255,255,0.1)" />
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="font-medium text-blue-50">年度選修</span>
                                    <span className="font-bold">{Math.round(electiveTotalProgress)}%</span>
                                </div>
                                <Progress percent={Math.round(electiveTotalProgress)} showInfo={false} strokeColor="#A78BFA" trailColor="rgba(255,255,255,0.1)" />
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* 裝飾性元素 */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-30" />
                <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20" />
            </div>

            {/* 個人化關鍵指標 (KPIs) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="進行中課程"
                    value={String(inProgressCourses.length)}
                    trend={0}
                    icon={<PlayCircleOutlined className="text-xl" />}
                />
                <KPICard
                    title="已完成課程"
                    value={String(totalCompleted)}
                    trend={0}
                    icon={<CheckCircleOutlined className="text-xl" />}
                />
                <KPICard
                    title="年度積分"
                    value={String(totalCompleted * 100 + coursesWithProgress.reduce((acc, c) => acc + c.progress, 0))}
                    trend={1}
                    icon={<TrophyOutlined className="text-xl" />}
                />
                <KPICard
                    title="學習活躍度"
                    value="高"
                    trend={4.5}
                    icon={<ClockCircleOutlined className="text-xl" />}
                />
            </div>

            {/* 主要內容區域 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    {/* 繼續學習區塊 */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                                    <BookOutlined className="text-xl" />
                                </div>
                                <Title level={4} className="!mb-0">正在進行課程</Title>
                            </div>
                            
                            <div className="flex bg-gray-50 p-1 rounded-xl w-fit">
                                {[
                                    { label: '全部', value: 'all' },
                                    { label: '必修', value: 'required' },
                                    { label: '選修', value: 'elective' }
                                ].map((tab) => (
                                    <button
                                        key={tab.value}
                                        onClick={() => setInProgressFilter(tab.value as any)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            inProgressFilter === tab.value 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <Button type="link" className="text-blue-600 font-bold flex items-center gap-1 group hidden sm:flex">
                                全部課程 <RightOutlined className="text-xs group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredInProgress.length > 0 ? (
                                filteredInProgress.map((course) => (
                                    <div 
                                        key={course.id} 
                                        className="group cursor-pointer bg-gray-50/50 hover:bg-white p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all"
                                        onClick={() => window.location.href = course.path || '#'}
                                    >
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-center gap-2">
                                                <Tag className={`${course.type === 'required' ? 'bg-red-500' : 'bg-blue-500'} text-white border-none text-[9px] font-bold px-1.5 rounded-md`}>
                                                    {course.tag}
                                                </Tag>
                                                <Tag className="bg-white border-gray-100 text-gray-500 text-[9px] font-bold uppercase rounded-md">{course.level}</Tag>
                                            </div>
                                            <Text className="text-[10px] text-gray-400 font-medium">進行中</Text>
                                        </div>
                                        <h3 className="font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-1">{course.title}</h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-xs font-bold">
                                                <span className="text-gray-400">進度</span>
                                                <span className="text-blue-600">{course.progress}%</span>
                                            </div>
                                            <Progress percent={course.progress} showInfo={false} size="small" strokeColor="#2563EB" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                    <div className="col-span-2 py-8 text-center bg-gray-50/30 rounded-xl border border-dashed border-gray-100">
                                    <Text className="text-gray-400 font-medium italic">
                                        {inProgressFilter === 'all' ? '目前沒有進行中的課程，快去下方挑選一門吧！' : `目前沒有進行中的「${inProgressFilter === 'required' ? '必修' : '選修'}」課程`}
                                    </Text>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 選修與必修課程列表區塊 */}
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm overflow-hidden relative">
                         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                                    <StarOutlined className="text-xl" />
                                </div>
                                <Title level={4} className="!mb-0">尚未開始的必修與選修課程</Title>
                            </div>
                            
                            <div className="flex bg-gray-50 p-1 rounded-xl w-fit">
                                {[
                                    { label: '全部', value: 'all' },
                                    { label: '必修', value: 'required' },
                                    { label: '選修', value: 'elective' }
                                ].map((tab) => (
                                    <button
                                        key={tab.value}
                                        onClick={() => setNotStartedFilter(tab.value as any)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                            notStartedFilter === tab.value 
                                            ? 'bg-white text-blue-600 shadow-sm' 
                                            : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredNotStarted.length > 0 ? (
                                filteredNotStarted.map((course) => (
                                    <div 
                                        key={course.id}
                                        className={`bg-gradient-to-br ${course.gradient} p-6 rounded-2xl border ${course.border} flex flex-col justify-between min-h-[160px] transition-all ${course.status === 'coming_soon' ? 'opacity-75 grayscale-[0.3]' : 'hover:shadow-md'} animate-in zoom-in-95 duration-500`}
                                    >
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className={`font-black ${course.text} text-lg truncate flex-1`}>
                                                    {course.status === 'coming_soon' && <LockOutlined className="mr-2 text-sm opacity-50" />}
                                                    {course.title}
                                                </h4>
                                                <Tag className={`${course.type === 'required' ? 'bg-red-500' : 'bg-blue-500'} text-white border-none text-[10px] font-bold px-2 rounded-md`}>
                                                    {course.tag}
                                                </Tag>
                                            </div>
                                            <p className="text-gray-600/70 text-sm line-clamp-2">{course.description}</p>
                                        </div>
                                        <Button 
                                            disabled={course.status === 'coming_soon'}
                                            className={`w-fit text-white border-none font-bold rounded-lg mt-4 ${course.status === 'coming_soon' ? 'bg-gray-300' : course.btn}`}
                                            onClick={() => course.status !== 'coming_soon' && (window.location.href = course.path || '#')}
                                        >
                                            {course.status === 'coming_soon' ? '即將開放' : (course.type === 'required' ? '開始上課' : '了解看看!')}
                                        </Button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-2 py-12 text-center bg-gray-50/50 rounded-2xl border-2 border-dashed border-gray-100">
                                    <Text className="text-gray-400 font-bold">目前沒有符合該分類的「尚未開始」課程</Text>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <ActivityFeed />
                </div>
            </div>
        </div>
    );
};
