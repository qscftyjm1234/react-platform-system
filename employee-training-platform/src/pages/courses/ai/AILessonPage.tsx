import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Breadcrumb, Button, Tag, Avatar, Tooltip } from 'antd';
import {
    CheckCircleOutlined,
    ArrowLeftOutlined,
    ArrowRightOutlined,
    LockOutlined,
    ThunderboltFilled,
    ShareAltOutlined,
    MoreOutlined,
    InfoCircleOutlined,
    DownloadOutlined
} from '@ant-design/icons';
import { aiLessons } from '@/data/aiLessons';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { useAuth } from '@/contexts/AuthContext';
import { message } from 'antd';

import { CommentSection } from '@/components/ui/CommentSection';

const { Title, Text } = Typography;

export const AILessonPage: React.FC = () => {
    const { lessonId } = useParams();
    const navigate = useNavigate();
    const { user, completeLesson, completedLessons, isLessonUnlocked } = useAuth();
    const [scrolled, setScrolled] = React.useState(false);

    const lessonIndex = aiLessons.findIndex(l => l.id === lessonId);
    const lesson = aiLessons[lessonIndex];
    const prevLesson = lessonIndex > 0 ? aiLessons[lessonIndex - 1] : null;
    const nextLesson = lessonIndex < aiLessons.length - 1 ? aiLessons[lessonIndex + 1] : null;

    const isCompleted = lesson ? completedLessons.includes(lesson.id) : false;
    const isUnlocked = lesson ? isLessonUnlocked(lesson.id, prevLesson?.id) : false;

    // Reset scroll position when lesson changes
    React.useEffect(() => {
        const container = document.querySelector('main');
        if (container) {
            container.scrollTo({ top: 0, behavior: 'instant' });
        }
    }, [lessonId]);

    // Handle scroll shadow for header
    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!lesson) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 animate-in fade-in zoom-in duration-500">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                    <InfoCircleOutlined style={{ fontSize: '24px' }} />
                </div>
                <div className="text-center">
                    <Title level={4} className="text-slate-900 m-0 mb-1">找不到該單元</Title>
                    <Text className="text-slate-500 font-medium">請確認連結是否正確或返回課程列表</Text>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/courses/ai')}
                    className="bg-emerald-600 border-none rounded-xl h-11 px-6 font-bold shadow-lg shadow-emerald-100"
                >
                    返回課程清單
                </Button>
            </div>
        );
    }

    if (!isUnlocked && user?.role !== 'admin') {
        return (
            <div className="max-w-[800px] mx-auto py-20 px-8 text-center bg-white rounded-[3rem] border-2 border-slate-50 shadow-xl mt-12 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                    <LockOutlined style={{ fontSize: '40px' }} />
                </div>
                <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">單元尚未解鎖</h1>
                <p className="text-slate-500 text-lg font-medium mb-8 max-w-md mx-auto">
                    請先完成前一單元「<span className="text-emerald-600">{prevLesson?.title}</span>」，方可進入此單元。
                </p>
                <div className="flex justify-center gap-4">
                    <Button
                        size="large"
                        shape="round"
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/courses/ai')}
                        className="h-14 px-8 font-bold border-slate-200 text-slate-600"
                    >
                        返回課程清單
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        shape="round"
                        onClick={() => prevLesson && navigate(`/courses/ai/lesson/${prevLesson.id}`)}
                        className="h-14 px-8 font-black bg-emerald-600 border-none shadow-lg shadow-emerald-100"
                    >
                        前往前一單元
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen bg-white">
            <header className={`sticky top-0 z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/80 backdrop-blur-md border-slate-200 py-3 shadow-sm' : 'bg-white/50 border-transparent py-4'
                }`}>
                <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Tooltip title="返回課程總覽">
                            <Button
                                type="text"
                                icon={<ArrowLeftOutlined />}
                                onClick={() => navigate('/courses/ai')}
                                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-500"
                            />
                        </Tooltip>
                        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>
                        <div className="hidden md:block">
                            <Breadcrumb
                                items={[
                                    { title: <span className="text-slate-400 font-medium hover:text-slate-600 cursor-pointer text-[10px] uppercase tracking-wider" onClick={() => navigate('/courses/ai')}>AI 賦能</span> },
                                    { title: <span className="text-slate-900 text-[10px] font-black uppercase tracking-wider">{lesson.title}</span> },
                                ]}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button icon={<ShareAltOutlined />} type="text" className="rounded-lg text-slate-400 font-bold text-xs hover:text-emerald-600 transition-colors">分享單元</Button>
                        <Button icon={<MoreOutlined />} type="text" className="rounded-lg text-slate-400 hover:text-emerald-600 transition-colors" />
                        <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-3">
                            <Avatar size={36} className="bg-emerald-600 ring-4 ring-emerald-50 border border-emerald-200 font-black text-white">A</Avatar>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-4 md:px-8 pt-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8">
                        <div className="mb-12 space-y-4">
                            <Tag className="bg-emerald-600 border-none text-white font-black px-3 py-0.5 rounded-full m-0 text-[10px] tracking-[0.2em] uppercase shadow-lg shadow-emerald-100">
                                AI 課程 {lessonId?.replace('ai-', '')}
                            </Tag>
                            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight leading-[1.2]">
                                {lesson.title}
                            </h1>
                            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                                {lesson.description}
                            </p>
                        </div>

                        <div className="space-y-20">
                            <div className="scroll-mt-32">
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
                                                <div className="p-1 border border-emerald-100 rounded-2xl bg-emerald-50/30 mb-8 inline-block">
                                                    <Button
                                                        type="primary"
                                                        size="large"
                                                        icon={<DownloadOutlined />}
                                                        href={item.action.href}
                                                        target="_blank"
                                                        className="h-12 px-8 rounded-xl bg-emerald-600 border-none font-black text-xs hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 uppercase tracking-widest"
                                                    >
                                                        {item.action.label}
                                                    </Button>
                                                </div>
                                            )}

                                            {item.commandBreakdown && (
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                                                    {item.commandBreakdown.map((part, pIdx) => (
                                                        <div key={pIdx} className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-emerald-300 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-50/50 group">
                                                            <div className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">{part.title}</div>
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <code className="text-emerald-600 font-black text-sm bg-emerald-50/50 px-2 py-0.5 rounded">{part.token}</code>
                                                                <div className="h-2 w-2 rounded-full bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
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
                                                    title="示範與說明"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="mt-20 pt-12 border-t-2 border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-8">
                            <Button
                                type="text"
                                icon={<ArrowLeftOutlined />}
                                disabled={!prevLesson}
                                className="h-14 px-8 rounded-2xl text-slate-400 font-black text-xs hover:bg-slate-50 uppercase tracking-widest disabled:opacity-30"
                                onClick={() => prevLesson && navigate(`/courses/ai/lesson/${prevLesson.id}`)}
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
                                        message.success('恭喜完成此 AI 學習單元！');
                                    }
                                }}
                                className={`h-16 px-12 rounded-[1.5rem] border-none font-black text-sm transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest ${isCompleted
                                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-100'
                                    : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
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
                                    className={`h-14 px-8 rounded-2xl font-black text-xs uppercase tracking-widest disabled:opacity-30 ${(!isCompleted && nextLesson && user?.role !== 'admin') ? 'text-slate-300' : 'text-emerald-600 hover:bg-emerald-50'
                                        }`}
                                    onClick={() => nextLesson && navigate(`/courses/ai/lesson/${nextLesson.id}`)}
                                >
                                    {(!isCompleted && nextLesson && user?.role !== 'admin') ? '單元鎖定中' : '下一單元'}
                                </Button>
                            </Tooltip>
                        </div>
                    </div>

                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            <div className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100">
                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                    <div className="w-1 h-4 bg-emerald-500 rounded-full"></div>
                                    單元進度摘要
                                </h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">預估學習時間</div>
                                        <div className="text-xl font-black text-slate-900">{lesson.duration}</div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">單元類型</div>
                                        <Tag className="bg-emerald-100 text-emerald-600 border-none font-bold px-3 py-1 rounded-full">{lesson.type}</Tag>
                                    </div>
                                    <div>
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">難易度</div>
                                        <div className="text-sm font-bold text-slate-700">{lesson.level}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <CommentSection lessonId={lesson.id} />
        </div>
    );
};
