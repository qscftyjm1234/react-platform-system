import React from 'react';
import { KPICard } from '../components/dashboard/KPICard';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { UserOutlined, BookOutlined, RiseOutlined, ClockCircleOutlined } from '@ant-design/icons';

export const Dashboard: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">儀表板概覽</h1>
                <p className="text-gray-500">歡迎回來！以下是今天的最新動態。</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <KPICard
                    title="總員工人數"
                    value="2,543"
                    trend={12.5}
                    icon={<UserOutlined className="text-xl" />}
                />
                <KPICard
                    title="課程完成率"
                    value="85%"
                    trend={5.2}
                    icon={<BookOutlined className="text-xl" />}
                />
                <KPICard
                    title="平均測驗分數"
                    value="92.4"
                    trend={-2.1}
                    icon={<RiseOutlined className="text-xl" />}
                />
                <KPICard
                    title="總訓練時數"
                    value="456h"
                    trend={8.4}
                    icon={<ClockCircleOutlined className="text-xl" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                            學習路徑進度 (開發中)
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 h-64 flex items-center justify-center text-gray-400">
                            部門績效分析 (開發中)
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
