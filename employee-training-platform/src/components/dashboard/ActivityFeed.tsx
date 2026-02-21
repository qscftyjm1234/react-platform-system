import React from 'react';
import { Avatar, List, Tag } from 'antd';
import {
    MessageOutlined,
    ClockCircleOutlined,
    BellOutlined,
    NotificationOutlined
} from '@ant-design/icons';

type ActivityType = 'reply' | 'new_course' | 'achievement';

interface Activity {
    id: string;
    user: string;
    type: ActivityType;
    action: string;
    content?: string;
    target: string;
    time: string;
    isNew?: boolean;
}

const activities: Activity[] = [
    {
        id: '1',
        user: '技術導師 / 黃冠禎',
        type: 'reply',
        action: '回覆了您的留言',
        content: '「這部分的效能優化建議可以參考 React 官方文件關於 useMemo 的說明...」',
        target: 'React 效能優化實戰',
        time: '10 分鐘前',
        isNew: true,
    },
    {
        id: '2',
        user: '教育訓練小組',
        type: 'new_course',
        action: '發佈了新課程',
        target: '2026 年度資訊安全守則',
        time: '3 小時前',
        isNew: true,
    },
    {
        id: '3',
        user: '李小龍',
        type: 'reply',
        action: '在您的討論中留言',
        content: '「我也遇到同樣的問題，感謝您的分享！」',
        target: 'TypeScript 進階型別運用',
        time: '昨天',
    },
    {
        id: '4',
        user: '系統管理員',
        type: 'new_course',
        action: '發佈了新課程',
        target: '跨團隊團隊協作溝通術',
        time: '2 天前',
    },
];

export const ActivityFeed: React.FC = () => {
    const getIcon = (type: ActivityType) => {
        switch (type) {
            case 'reply':
                return <MessageOutlined className="text-blue-500" />;
            case 'new_course':
                return <NotificationOutlined className="text-amber-500" />;
            default:
                return <BellOutlined className="text-gray-400" />;
        }
    };

    const getAvatarBg = (type: ActivityType) => {
        switch (type) {
            case 'reply':
                return 'bg-blue-50';
            case 'new_course':
                return 'bg-amber-50';
            default:
                return 'bg-gray-50';
        }
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <h3 className="text-lg font-black text-gray-900 m-0">動態通知</h3>
                    <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-bold uppercase tracking-wider">
                    忽略全部
                </button>
            </div>

            <List<Activity>
                itemLayout="horizontal"
                dataSource={activities}
                renderItem={(item) => (
                    <List.Item className="!px-0 !border-b-0 group cursor-pointer">
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    icon={getIcon(item.type)}
                                    className={`${getAvatarBg(item.type)} border-none`}
                                />
                            }
                            title={
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[13px] text-gray-900 font-bold">
                                            {item.user} <span className="font-medium text-gray-400 mx-1">{item.action}</span>
                                        </span>
                                        {item.isNew && (
                                            <Tag className="bg-blue-600 text-white border-none text-[8px] px-1.5 leading-none h-4 flex items-center m-0 font-black rounded-full">NEW</Tag>
                                        )}
                                    </div>
                                    <div className="text-[11px] font-black text-blue-600 truncate max-w-[200px]">
                                        #{item.target}
                                    </div>
                                </div>
                            }
                            description={
                                <div className="space-y-2 mt-1">
                                    {item.content && (
                                        <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-600 italic leading-relaxed border-l-2 border-gray-200">
                                            {item.content}
                                        </div>
                                    )}
                                    <div className="flex items-center text-[10px] text-gray-400 font-medium tracking-tight">
                                        <ClockCircleOutlined className="mr-1" />
                                        <span>{item.time}</span>
                                    </div>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};
