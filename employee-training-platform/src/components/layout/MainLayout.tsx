import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Badge } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DashboardOutlined,
    TeamOutlined,
    SettingOutlined,
    BellOutlined,
    SearchOutlined,
    CodeOutlined,
    ContainerOutlined,
    BulbOutlined,
    RobotOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

interface MainLayoutProps {
    children: React.ReactNode;
}

import { useAuth } from '@/contexts/AuthContext';

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    // Determine current selected key based on path
    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === '/') return 'dashboard';
        if (path.includes('/courses/react')) return 'course-react';
        if (path.includes('/courses/docker')) return 'course-docker';
        return 'dashboard';
    };

    const isLessonPage = location.pathname.includes('/courses/react/lesson/');

    return (
        <Layout className="min-h-screen">
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={260}
                className="!bg-white shadow-sm border-r border-gray-100 z-20"
                theme="light"
            >
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-blue-200 shadow-lg">
                            E
                        </div>
                        {!collapsed && (
                            <span className="text-lg font-bold text-gray-800 tracking-tight">教育訓練平台</span>
                        )}
                    </div>
                </div>
                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[getSelectedKey()]}
                    className="!border-r-0 px-3 pt-4 flex flex-col gap-1"
                    items={[
                        {
                            key: 'dashboard',
                            icon: <DashboardOutlined />,
                            label: '儀表板',
                            onClick: () => navigate('/')
                        },
                        {
                            type: 'group',
                            label: collapsed ? '' : '課程管理',
                            children: [
                                {
                                    key: 'course-js',
                                    icon: <BulbOutlined />,
                                    label: 'JS 基礎教學',
                                    disabled: true,
                                },
                                {
                                    key: 'course-react',
                                    icon: <CodeOutlined />,
                                    label: 'React 新手入門',
                                    onClick: () => navigate('/courses/react')
                                },
                                {
                                    key: 'course-docker',
                                    icon: <ContainerOutlined />,
                                    label: 'Docker 實戰大師',
                                    disabled: true, // Future course
                                },
                                {
                                    key: 'course-ai',
                                    icon: <RobotOutlined />,
                                    label: 'AI 基礎教學',
                                    disabled: true,
                                },
                            ]
                        },
                        {
                            type: 'divider'
                        },
                        {
                            key: 'employees',
                            icon: <TeamOutlined />,
                            label: '員工管理',
                        },
                        {
                            key: 'settings',
                            icon: <SettingOutlined />,
                            label: '系統設定',
                        },
                    ]}
                />
            </Sider>
            <Layout className="!bg-gray-50/50">
                <Header className="!bg-white/80 backdrop-blur-md !px-6 border-b border-gray-100 flex justify-between items-center h-16 sticky top-0 z-10 transition-all">
                    <div className="flex items-center gap-4">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            className="!w-10 !h-10 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                        />
                        <div className="hidden md:flex items-center relative">
                            <SearchOutlined className="absolute left-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="搜尋課程、員工..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white w-64 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <Badge count={3} size="small" offset={[-2, 2]}>
                            <Button type="text" icon={<BellOutlined />} shape="circle" className="text-gray-500 hover:bg-gray-100" />
                        </Badge>
                        <div className="h-6 w-[1px] bg-gray-200"></div>
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors border border-transparent hover:border-gray-100">
                            <Avatar size={36} src={user?.avatar} className="bg-blue-100" />
                            <div className="hidden md:flex flex-col items-start justify-center ml-1 leading-none">
                                <div className="text-sm font-bold text-gray-700 mb-0.5">{user?.name}</div>
                                <div className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">{user?.role === 'admin' ? '系統管理員' : '學員'}</div>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content className={`${isLessonPage ? 'p-0' : 'p-6 md:p-8'} overflow-y-auto h-[calc(100vh-64px)] scroll-smooth`}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
