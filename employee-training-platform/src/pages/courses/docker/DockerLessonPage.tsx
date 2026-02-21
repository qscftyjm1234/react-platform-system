import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Breadcrumb, Button, Tag, Avatar, Tooltip } from 'antd';
import {
    CheckCircleOutlined,
    CodeOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    LockOutlined,
    ThunderboltFilled,
    ShareAltOutlined,
    MoreOutlined,
    InfoCircleOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { dockerLessons } from '@/data/dockerLessons';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Playground } from '@/components/ui/Playground';
import { useAuth } from '@/contexts/AuthContext';
import { message } from 'antd';

import { CommentSection } from '@/components/ui/CommentSection';

const { Title, Text } = Typography;

export const DockerLessonPage: React.FC = () => {
    const params = useParams();
    const lessonId = params.lessonId || '';
    const navigate = useNavigate();
    const { user, completeLesson, completedLessons, isLessonUnlocked } = useAuth();
    const [activeSection, setActiveSection] = React.useState(0);
    const [scrolled, setScrolled] = React.useState(false);

    const lessonIndex = dockerLessons.findIndex(l => l.id === lessonId);
    const lesson = dockerLessons[lessonIndex];
    const prevLesson = lessonIndex > 0 ? dockerLessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < dockerLessons.length - 1 ? dockerLessons[lessonIndex + 1] : null;

    const isCompleted = lesson ? completedLessons.includes(lesson.id) : false;
    const isUnlocked = lesson ? isLessonUnlocked(lesson.id, prevLesson?.id) : false;


    // Reset UI state when lesson changes
    React.useEffect(() => {
        // Scroll to top of the main content area
        const container = document.querySelector('main');
        if (container) {
            container.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [lessonId]);

    // Dynamic Section Configuration
    const sections = React.useMemo(() => {
        if (!lesson) return [];
        const base = [{ id: 'section-0', title: '核心觀念與建置', label: '核心觀念' }];
        if (lesson.comparison) {
            base.push({ id: 'section-1', title: '架構生態系比較', label: '架構比較' });
        }
        if (lesson.playground) {
            base.push({ id: 'section-2', title: '動手實作區塊', label: '動手實作' });
        }
        return base;
    }, [lesson]);

    // Handle initial scroll and spy logic
    React.useEffect(() => {
        const scrollContainer = document.querySelector('main');
        const handleScroll = () => {
            if (!scrollContainer) return;
            setScrolled(scrollContainer.scrollTop > 40);

            const viewportHeight = scrollContainer.clientHeight;
            const triggerLine = viewportHeight * 0.3;

            let activeIndex = 0;
            for (let i = 0; i < sections.length; i++) {
                const el = document.getElementById(sections[i].id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= triggerLine + 100) {
                        activeIndex = i;
                    }
                }
            }
            setActiveSection(activeIndex);
        };

        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();
        }
        return () => scrollContainer?.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollToSection = (index: number) => {
        const sectionId = sections[index]?.id;
        const el = document.getElementById(sectionId);
        const container = document.querySelector('main');
        if (el && container) {
            container.scrollTo({
                top: el.offsetTop - 120, // Account for sticky header
                behavior: 'smooth'
            });
        }
    };

    if (!lesson || (!isUnlocked && user?.role !== 'admin')) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <LockOutlined style={{ fontSize: '24px' }} />
                </div>
                <div className="text-center">
                    <Title level={4} className="text-slate-900 m-0 mb-1">
                        {!lesson ? '找不到該單元' : '單元尚未解鎖'}
                    </Title>
                    <Text className="text-slate-500 font-medium">
                        {!lesson ? '請確認連結是否正確或返回課程列表' : `請先完成前一單元「${prevLesson?.title}」`}
                    </Text>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/courses/docker')}
                    className="bg-indigo-600 border-none rounded-xl h-11 px-6 font-bold shadow-lg shadow-indigo-100"
                >
                    返回課程清單
                </Button>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white">
            {/* Floating Header */}
            <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm' : 'bg-white/50 border-transparent py-4'
                }`}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Tooltip title="返回課程總覽">
                            <Button
                                type="text"
                                icon={<ArrowLeftOutlined />}
                                onClick={() => navigate('/courses/docker')}
                                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500"
                            />
                        </Tooltip>
                        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>
                        <div className="hidden md:block">
                            <Breadcrumb
                                items={[
                                    { title: <span className="text-slate-400 hover:text-slate-600 cursor-pointer text-xs font-semibold uppercase tracking-wider" onClick={() => navigate('/courses/docker')}>Docker 實戰</span> },
                                    { title: <span className="text-slate-900 text-xs font-black uppercase tracking-wider">{lesson.title}</span> },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button icon={<ShareAltOutlined />} type="text" className="rounded-lg text-slate-400 font-bold text-xs hover:text-indigo-600 transition-colors">分享單元</Button>
                        <Button icon={<MoreOutlined />} type="text" className="rounded-lg text-slate-400 hover:text-indigo-600 transition-colors" />
                        <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-3">
                            <Avatar size={36} className="bg-indigo-600 ring-4 ring-indigo-50 border border-indigo-200 font-black text-white">A</Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content Workspace */}
                    <div className="lg:col-span-8">
                        <div className="mb-12 space-y-4">
                            <Tag className="bg-indigo-600 border-none text-white font-black px-3 py-0.5 rounded-full m-0 text-[10px] tracking-[0.2em] uppercase shadow-lg shadow-indigo-100">
                                單元 {lessonId}
                            </Tag>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                                {lesson.title}
                            </h1>
                            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                                {lesson.description}
                            </p>
                        </div>

                        <div className="space-y-20">
                            {/* Section 0: Concepts */}
                            <div id="section-0" className="scroll-mt-32">
                                <div className="space-y-12">
                                    {lesson.concept.map((item, index) => (
                                        <div key={index} className="animate-in slide-in-from-bottom-4 duration-700 delay-100">
                                            <h2 className="text-xl font-bold text-slate-900 mb-4 tracking-tight">{item.title}</h2>
                                            <p className="text-slate-500 text-base font-medium leading-relaxed mb-8">
                                                {item.description}
                                            </p>

                                            {item.bullets && (
                                                <ul className="space-y-4 mb-8 pl-0 list-none">
                                                    {item.bullets.map((bullet, bIdx) => (
                                                        <li key={bIdx} className="flex items-start gap-4 group">
                                                            <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-100 transition-colors">
                                                                <CheckCircleOutlined className="text-emerald-500 text-[10px]" />
                                                            </div>
                                                            <span className="text-slate-600 text-[15px] font-medium leading-relaxed">{bullet}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}

                                            {item.action && (
                                                <div className="p-1 border border-indigo-100 rounded-2xl bg-indigo-50/30 mb-8 inline-block">
                                                    <Button
                                                        type="primary"
                                                        size="large"
                                                        icon={<DownloadOutlined />}
                                                        href={item.action.href}
                                                        target="_blank"
                                                        className="h-12 px-8 rounded-xl bg-indigo-600 border-none font-black text-xs hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 uppercase tracking-widest"
                                                    >
                                                        {item.action.label}
                                                    </Button>
                                                </div>
                                            )}

                                            {item.commandBreakdown && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                                    {item.commandBreakdown.map((part, pIdx) => (
                                                        <div key={pIdx} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-indigo-300 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-50/50 group">
                                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{part.title}</div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <code className="text-indigo-600 font-black text-sm bg-indigo-50/50 px-2 py-0.5 rounded">{part.token}</code>
                                                                <div className="h-2 w-2 rounded-full bg-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                            </div>
                                                            <p className="text-[12px] text-slate-500 m-0 font-semibold leading-normal">{part.description}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {item.code && (
                                                <CodeBlock
                                                    code={item.code}
                                                    language="bash"
                                                    title="終端機控制台"
                                                />
                                            )}

                                            {item.steps && (
                                                <div className="grid grid-cols-1 gap-4 mb-8">
                                                    {item.steps.map((step, sIdx) => (
                                                        <div key={sIdx} className="flex gap-6 items-start p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                                            <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-indigo-50 text-indigo-600 font-black text-[11px] shrink-0">
                                                                {sIdx + 1}
                                                            </div>
                                                            <div className="space-y-3 flex-grow">
                                                                <div className="text-[15px] font-bold text-slate-900 tracking-tight">{step.title}</div>
                                                                <div className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center justify-between group">
                                                                    <code className="text-[13px] text-indigo-600 font-bold">{step.command}</code>
                                                                    <CodeOutlined className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                                                                </div>
                                                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{step.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Section 1: Comparison */}
                            {lesson.comparison && (
                                <div id="section-1" className="scroll-mt-32">
                                    <div className="flex items-center gap-4 mb-10">
                                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight m-0">{lesson.comparison.title}</h2>
                                        <div className="h-[2px] flex-grow bg-slate-100"></div>
                                    </div>
                                    {/* ... comparison logic ... */}
                                </div>
                            )}

                            {/* Section 2: Playground */}
                            {lesson.playground && (
                                <div id="section-2" className="scroll-mt-32">
                                    <div className="flex flex-col gap-4 mb-10">
                                        <div className="flex items-center gap-4">
                                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight m-0">線上沙盒驗證</h2>
                                            <Tag className="bg-emerald-100 text-emerald-600 border-none font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-tighter">即時程式測試</Tag>
                                            <div className="h-[2px] flex-grow bg-slate-100"></div>
                                        </div>
                                    </div>
                                    <div className="rounded-[2.5rem] overflow-hidden border-4 border-slate-50 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] bg-white ring-1 ring-slate-200">
                                        <Playground initialCode={lesson.playground.initialCode} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bottom Action Footer */}
                        <div className="mt-20 pt-12 border-t-2 border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-8">
                            <Button
                                type="text"
                                disabled={!prevLesson}
                                icon={<ArrowLeftOutlined />}
                                className="h-14 px-8 rounded-2xl text-slate-400 font-black text-xs hover:bg-slate-50 uppercase tracking-widest disabled:opacity-30"
                                onClick={() => prevLesson && navigate(`/courses/docker/lesson/${prevLesson.id}`)}
                            >
                                上一單元
                            </Button>

                            <Button
                                type="primary"
                                size="large"
                                icon={isCompleted ? <CheckCircleOutlined /> : <ThunderboltFilled />}
                                onClick={() => {
                                    if (lesson) {
                                        completeLesson(lesson.id);
                                        message.success('已完成此單元！');
                                    }
                                }}
                                className={`h-16 px-12 rounded-[1.5rem] border-none font-black text-sm transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest ${isCompleted
                                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
                                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                                    } shadow-xl`}
                            >
                                {isCompleted ? '單元已完成' : '標記為已完成'}
                            </Button>

                            <Tooltip title={!isCompleted && nextLesson && user?.role !== 'admin' ? "請先完成目前的單元，方可進入下一單元" : ""}>
                                <Button
                                    type="text"
                                    disabled={!nextLesson || (!isCompleted && user?.role !== 'admin')}
                                    icon={(!isCompleted && nextLesson && user?.role !== 'admin') ? <LockOutlined /> : <ArrowRightOutlined />}
                                    iconPosition="end"
                                    className={`h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 ${(!isCompleted && nextLesson && user?.role !== 'admin') ? 'text-slate-300' : 'text-indigo-600 hover:bg-indigo-50'
                                        }`}
                                    onClick={() => nextLesson && navigate(`/courses/docker/lesson/${nextLesson.id}`)}
                                >
                                    {(!isCompleted && nextLesson && user?.role !== 'admin') ? '單元鎖定中' : '下一單元'}
                                </Button>
                            </Tooltip>
                        </div>

                        <div className="mt-20 pt-10 border-t border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">上一課回顧</div>
                                    <div className="text-sm font-bold text-slate-700">{lesson.prevLesson || "無"}</div>
                                </div>
                                <div className="p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100/50">
                                    <div className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mb-2">下一課預告</div>
                                    <div className="text-sm font-bold text-indigo-800">{lesson.nextLesson || "即將推出"}</div>
                                </div>
                            </div>
                        </div>

                        <CommentSection lessonId={lesson.id} />
                    </div>

                    {/* Right Info Sidebar */}
                    <aside className="lg:col-span-4 space-y-6">
                        <div className="sticky top-32 space-y-8">
                            <div className="bg-white border-2 border-slate-50 rounded-[2rem] p-8 shadow-sm">
                                <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6 pb-4 border-b border-slate-50 flex justify-between items-center">
                                    <span>單元導覽導軌</span>
                                </div>

                                <nav className="space-y-1">
                                    {sections.map((s, idx) => (
                                        <button
                                            key={s.id}
                                            onClick={() => scrollToSection(idx)}
                                            className={`w-full group text-left p-4 rounded-2xl transition-all duration-300 flex items-center justify-between ${activeSection === idx ? 'bg-indigo-50/50' : 'hover:bg-slate-50/50'
                                                }`}
                                        >
                                            <div className="flex flex-col gap-0.5">
                                                <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${activeSection === idx ? 'text-indigo-400' : 'text-slate-300'
                                                    }`}>
                                                    {s.label}
                                                </span>
                                                <span className={`text-[14px] font-bold transition-colors ${activeSection === idx ? 'text-indigo-600' : 'text-slate-900'
                                                    }`}>
                                                    {s.title}
                                                </span>
                                            </div>
                                            <div className={`w-2 h-2 rounded-full transition-all duration-500 ${activeSection === idx ? 'bg-indigo-600 scale-125 shadow-lg shadow-indigo-200' : 'bg-slate-100 group-hover:bg-slate-200'
                                                }`}></div>
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="relative bg-white border border-slate-100 rounded-[2rem] p-8 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                                        <ThunderboltFilled style={{ fontSize: '20px' }} />
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-amber-600 uppercase tracking-widest">課程設計者提示</div>
                                        <div className="text-sm font-black text-slate-900">核心思維</div>
                                    </div>
                                </div>
                                <p className="text-slate-500 text-[13px] leading-relaxed font-semibold m-0">
                                    「環境的一致性是所有大型應用的開發基礎。掌握了 Docker，你就掌握了掌控雲端世界的遙控器。」
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
};
