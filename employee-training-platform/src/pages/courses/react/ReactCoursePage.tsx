import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Typography, Breadcrumb, Progress, Button, Avatar, Tag, Input, Empty, Tooltip } from 'antd';
import {
    PlayCircleOutlined,
    CheckCircleOutlined,
    LockOutlined,
    ClockCircleOutlined,
    UserOutlined,
    BookOutlined,
    ThunderboltFilled,
    SearchOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { reactLessons } from '@/data/reactLessons';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text } = Typography;

export const ReactCoursePage: React.FC = () => {
    const navigate = useNavigate();
    const { user, login, completedLessons } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const searchInputRef = useRef<any>(null);

    // Data source
    const lessons = reactLessons;

    // Filtered lessons
    const filteredLessons = useMemo(() => {
        return lessons.filter(lesson =>
            lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.level.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [lessons, searchTerm]);

    // Calculate progress
    const completedCount = lessons.filter(l => completedLessons.includes(l.id)).length;
    const progressPercent = Math.round((completedCount / lessons.length) * 100);
    const isFullProgress = progressPercent === 100;

    // Keyboard shortcut for search
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                searchInputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleRoleSwitch = () => {
        const newRole = user?.role === 'admin' ? 'employee' : 'admin';
        login(newRole);
    };

    return (
        <div className="max-w-[1200px] mx-auto pb-24 px-4 md:px-8 animate-in fade-in duration-700">
            {/* Enterprise Header Area */}
            <div className="py-10 mb-8 border-b border-slate-200/60">
                <div className="flex items-center gap-2 mb-6">
                    <Breadcrumb
                        items={[
                            { title: <span className="text-slate-400 font-medium hover:text-slate-600 cursor-pointer transition-colors" onClick={() => navigate('/')}>學習儀表板</span> },
                            { title: <span className="text-slate-900 font-semibold">專業 React 開發</span> },
                        ]}
                        className="text-[12px] font-medium"
                    />
                    <Tag className="bg-slate-100 border-slate-200 text-slate-500 font-black px-2 py-0 rounded m-0 text-[10px] uppercase tracking-tight">企業級專案</Tag>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                    <div className="max-w-3xl">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm ring-1 ring-blue-700/10">
                                <ThunderboltFilled />
                            </div>
                            <Title level={1} style={{ margin: 0, fontSize: '2rem', fontWeight: 900 }} className="text-slate-900 tracking-tighter">React 新手入門</Title>
                        </div>
                        <Text className="text-slate-500 text-base font-medium leading-relaxed block max-w-2xl">
                            掌握現代前端開發的核心標準。從基礎語法到架構設計，建立符合企業需求的開發邏輯。
                        </Text>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-6 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                            <div className="space-y-1.5">
                                <div className="flex justify-between items-end gap-12">
                                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">課程總進度</span>
                                    <span className="text-sm font-bold text-slate-900">{progressPercent}%</span>
                                </div>
                                <Progress
                                    percent={progressPercent}
                                    strokeColor="#2563eb"
                                    trailColor="#f1f5f9"
                                    showInfo={false}
                                    strokeWidth={4}
                                    className="m-0 min-w-[160px]"
                                />
                                <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-tight">已完成 {completedCount} / {lessons.length} 單元</div>
                            </div>
                        </div>
                        <Button
                            onClick={handleRoleSwitch}
                            className="bg-blue-600 border-none text-white hover:bg-blue-700 font-bold rounded-xl h-[58px] px-6 transition-all shadow-lg shadow-blue-100"
                        >
                            {user?.role === 'admin' ? '切換為學員模式' : '切換管理系統'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Syllabus List (Main Content) */}
                <div className="lg:col-span-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 px-1">
                        <div className="flex items-center gap-2">
                            <BookOutlined className="text-slate-400" />
                            <h3 className="text-slate-900 font-black text-sm tracking-tight m-0 uppercase">課程教學大綱</h3>
                        </div>

                        <div className="flex-1 max-w-sm ml-auto">
                            <Input
                                ref={searchInputRef}
                                placeholder="搜尋單元標題、關鍵字 (Ctrl+K)"
                                prefix={<SearchOutlined className="text-slate-300" />}
                                value={searchTerm}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                                className="rounded-xl border-slate-200 focus:border-blue-500 hover:border-blue-300 h-10 transition-all font-medium"
                                allowClear
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        {filteredLessons.length > 0 ? (
                            filteredLessons.map((item) => {
                                const realIndex = lessons.findIndex(l => l.id === item.id);
                                const isCompleted = completedLessons.includes(item.id);
                                const isCurrent = !isCompleted && (realIndex === 0 || (realIndex > 0 && completedLessons.includes(lessons[realIndex - 1].id)));
                                const isLocked = !isCompleted && !isCurrent && user?.role !== 'admin';

                                return (
                                    <div
                                        key={item.id}
                                        className={`group relative flex items-center justify-between p-4 pl-0 rounded-xl border transition-all duration-200 ${isLocked
                                            ? 'bg-slate-50/40 border-slate-100 opacity-60'
                                            : 'bg-white border-slate-200/60 hover:border-blue-200 hover:shadow-sm'
                                            }`}
                                    >
                                        <div className="flex items-center gap-2 flex-grow">
                                            <div className="w-12 flex justify-center flex-shrink-0">
                                                {isCompleted ? (
                                                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                                                        <CheckCircleOutlined className="text-[12px]" />
                                                    </div>
                                                ) : isLocked ? (
                                                    <LockOutlined className="text-slate-300 text-[14px]" />
                                                ) : (
                                                    <span className="text-[12px] font-bold text-slate-400">{realIndex + 1 < 10 ? `0${realIndex + 1}` : realIndex + 1}</span>
                                                )}
                                            </div>

                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 flex-grow">
                                                <div className="min-w-[260px]">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${item.level === '初階' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                                                            item.level === '中階' ? 'bg-blue-50 text-blue-600 border border-blue-100' :
                                                                'bg-amber-50 text-amber-600 border border-amber-100'
                                                            }`}>
                                                            {item.level}
                                                        </span>
                                                        <span className="text-slate-400 text-[10px] uppercase font-bold tracking-tight opacity-60">{item.type}</span>
                                                    </div>
                                                    <h4 className={`text-[15px] font-bold m-0 transition-colors ${isLocked ? 'text-slate-400' : 'text-slate-900 group-hover:text-blue-600'
                                                        }`}>
                                                        {item.title}
                                                    </h4>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                                                        <ClockCircleOutlined className="text-[12px]" />
                                                        {item.duration}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pr-2">
                                            {!isLocked && (
                                                <Button
                                                    type="text"
                                                    icon={<PlayCircleOutlined />}
                                                    className="rounded-xl h-10 w-10 flex items-center justify-center transition-all bg-white border border-slate-200 text-slate-400 hover:bg-blue-600 hover:border-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-100 hover:scale-105"
                                                    onClick={() => navigate(`/courses/react/lesson/${item.id}`)}
                                                />
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="py-20 bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-100 flex flex-col items-center">
                                <Empty
                                    description={<span className="text-slate-400 font-bold">找不到與「{searchTerm}」相關的課程單元</span>}
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                />
                                <Button type="link" onClick={() => setSearchTerm('')} className="font-bold text-blue-600">清除搜尋條件</Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Info Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/50">
                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8 border-b border-slate-100 pb-4 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                            課程概覽數據
                        </div>

                        <div className="space-y-6 mb-10">
                            <SidebarInfoItem icon={<UserOutlined />} label="適合對象" value="前端開發工程師" />
                            <SidebarInfoItem icon={<BookOutlined />} label="模組數量" value={`${lessons.length} 個專業單元`} />
                            <SidebarInfoItem icon={<PlayCircleOutlined />} label="教學形式" value="互動式引導與動手實作" />
                        </div>

                        <Tooltip title={!isFullProgress ? "需完成 100% 課程單元方可領取證書" : ""}>
                            <Button
                                block
                                type="primary"
                                disabled={!isFullProgress}
                                icon={<SafetyCertificateOutlined />}
                                className={`h-12 rounded-xl border-none font-bold text-sm transition-all shadow-lg ${isFullProgress ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100/50' : 'bg-slate-100 text-slate-400 shadow-none'}`}
                            >
                                獲取結業證書
                            </Button>
                        </Tooltip>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">課程設計者</div>
                        <div className="flex items-center gap-4 mb-4">
                            <Avatar size={48} icon={<UserOutlined />} className="bg-slate-100 text-slate-400 shrink-0 border border-slate-100" />
                            <div>
                                <h4 className="font-black text-slate-900 text-base m-0 leading-tight">黃冠禎</h4>
                                <div className="text-slate-400 text-[11px] font-black uppercase tracking-wider">技術架構部 / 前端研發小組</div>
                            </div>
                        </div>
                        <p className="text-slate-500 text-[13px] leading-relaxed font-medium mb-0">
                            深耕 React 十年，專注於可擴展性架構與卓越的 UI/UX 實現。
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SidebarInfoItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        <div className="flex items-center gap-2.5">
            <span className="text-blue-600 opacity-80">{icon}</span>
            <span className="font-bold text-slate-700 text-[13px]">{value}</span>
        </div>
    </div>
);
