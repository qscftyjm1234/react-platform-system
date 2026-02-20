import React from 'react';
import { Avatar, List } from 'antd';
import { UserOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';

interface Activity {
    id: string;
    user: string;
    action: string;
    target: string;
    time: string;
    status: 'completed' | 'pending' | 'in-progress';
}

const activities: Activity[] = [
    {
        id: '1',
        user: 'Sarah Smith',
        action: 'completed module',
        target: 'Security Basics',
        time: '2 hours ago',
        status: 'completed',
    },
    {
        id: '2',
        user: 'John Doe',
        action: 'started course',
        target: 'Advanced React Patterns',
        time: '4 hours ago',
        status: 'in-progress',
    },
    {
        id: '3',
        user: 'System',
        action: 'updated policy',
        target: 'Remote Work Guidelines',
        time: '1 day ago',
        status: 'completed',
    },
    {
        id: '4',
        user: 'Mike Johnson',
        action: 'pending review',
        target: 'Frontend Assessment',
        time: '1 day ago',
        status: 'pending',
    },
];

export const ActivityFeed: React.FC = () => {
    return (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
                <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View All
                </button>
            </div>

            <List
                itemLayout="horizontal"
                dataSource={activities}
                renderItem={(item) => (
                    <List.Item className="!px-0 !border-b-0 hover:bg-gray-50 rounded-lg p-2 transition-colors">
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    icon={<UserOutlined />}
                                    className="bg-primary-100 text-primary-600"
                                />
                            }
                            title={
                                <span className="text-sm text-gray-900">
                                    <span className="font-semibold">{item.user}</span> {item.action}{' '}
                                    <span className="font-medium text-primary-600">{item.target}</span>
                                </span>
                            }
                            description={
                                <div className="flex items-center mt-1 text-xs text-gray-400">
                                    <ClockCircleOutlined className="mr-1" />
                                    <span>{item.time}</span>
                                    {item.status === 'completed' && (
                                        <span className="ml-3 flex items-center text-green-600">
                                            <CheckCircleOutlined className="mr-1" /> Completed
                                        </span>
                                    )}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};
