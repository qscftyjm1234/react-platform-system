import React from 'react';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

interface KPICardProps {
    title: string;
    value: string;
    trend: number;
    trendLabel?: string;
    icon?: React.ReactNode;
}

export const KPICard: React.FC<KPICardProps> = ({ title, value, trend, trendLabel, icon }) => {
    const isPositive = trend >= 0;

    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
                    <div className="text-2xl font-bold text-gray-900">{value}</div>
                </div>
                {icon && (
                    <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                        {icon}
                    </div>
                )}
            </div>

            <div className="flex items-center text-sm">
                <span
                    className={`flex items-center font-medium ${isPositive ? 'text-green-600' : 'text-red-600'
                        }`}
                >
                    {isPositive ? <ArrowUpOutlined className="mr-1" /> : <ArrowDownOutlined className="mr-1" />}
                    {Math.abs(trend)}%
                </span>
                <span className="text-gray-400 ml-2">
                    {trendLabel || '與上月相比'}
                </span>
            </div>
        </div>
    );
};
