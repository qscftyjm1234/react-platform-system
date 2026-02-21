import React, { useState } from 'react';
import { Layout, Menu, Button, Avatar, Badge, Dropdown, Tag } from 'antd';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
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
    RobotOutlined,
    LogoutOutlined,
    UserOutlined,
    SwapOutlined
} from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import { Logo } from '@/components/common/Logo';
import { COURSES } from '@/data/courses';

const { Header, Sider, Content } = Layout;

export const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, login, logout } = useAuth();

    const handleRoleSwitch = () => {
        const nextUserId = user?.role === 'admin' ? 'A1' : 'u-admin';
        login(nextUserId);
    };

    // 根據路徑確定當前選中的選單項目
    const getSelectedKey = () => {
        const path = location.pathname;
        if (path === '/') return 'dashboard';
        if (path.includes('/courses/react')) return 'course-react';
        if (path.includes('/courses/docker')) return 'course-docker';
        if (path.includes('/admin/employees')) return 'employees';
        if (path.includes('/admin/settings')) return 'settings';
        return 'dashboard';
    };

    const isLessonPage = location.pathname.includes('/lesson/');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const userMenuItems = [
        {
            key: 'profile',
            label: '個人檔案',
            icon: <UserOutlined />,
        },
        {
            key: 'settings',
            label: '偏好設定',
            icon: <SettingOutlined />,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: '登出系統',
            icon: <LogoutOutlined />,
            danger: true,
            onClick: handleLogout,
        },
    ];

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
                        <Logo size={32} />
                        {!collapsed && (
                            <span className="text-lg font-bold text-gray-800 tracking-tight">瑞嘉軟體教育系統</span>
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
                            label: '儀表板概覽',
                            onClick: () => navigate('/')
                        },
                        {
                            type: 'group',
                            label: collapsed ? '' : '課程管理系統',
                            children: COURSES.map(course => ({
                                key: course.id,
                                icon: course.id === 'course-js' ? <BulbOutlined /> : 
                                      course.id === 'course-react' ? <CodeOutlined /> :
                                      course.id === 'course-docker' ? <ContainerOutlined /> :
                                      <RobotOutlined />,
                                label: (
                                    <div className="flex items-center justify-between w-full">
                                        <span className="truncate mr-2">{course.title.split('：')[0]}</span>
                                        <Tag className={`${course.type === 'required' ? 'bg-red-500' : 'bg-blue-500'} text-white border-none text-[8px] font-bold px-1 rounded-md leading-normal m-0 flex-shrink-0`}>
                                            {course.tag}
                                        </Tag>
                                    </div>
                                ),
                                disabled: course.status === 'disabled' || course.status === 'coming_soon',
                                onClick: course.path ? () => navigate(course.path!) : undefined
                            }))
                        },
                        {
                            type: 'divider'
                        },
                        user?.role === 'admin' ? {
                            key: 'employees',
                            icon: <TeamOutlined />,
                            label: '員工管理中心',
                            onClick: () => navigate('/admin/employees')
                        } : null,
                        user?.role === 'admin' ? {
                            key: 'settings',
                            icon: <SettingOutlined />,
                            label: '系統環境設定',
                            onClick: () => navigate('/admin/settings')
                        } : null,
                    ].filter(Boolean) as any}
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
                                placeholder="搜尋課程內容、員工資訊..."
                                className="pl-10 pr-4 py-2 bg-gray-50 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:bg-white w-64 transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <Badge count={3} size="small" offset={[-2, 2]}>
                            <Button type="text" icon={<BellOutlined />} shape="circle" className="text-gray-500 hover:bg-gray-100" />
                        </Badge>
                        
                        <Button
                            onClick={handleRoleSwitch}
                            icon={<SwapOutlined />}
                            className="bg-blue-600 border-none text-white hover:bg-blue-700 font-bold rounded-full px-4 text-xs h-9 transition-all shadow-sm"
                        >
                            {user?.role === 'admin' ? '切換為學員' : '管理員模式'}
                        </Button>

                        <div className="h-6 w-[1px] bg-gray-200"></div>
                        
                        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
                            <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-full pr-4 transition-colors border border-transparent hover:border-gray-100">
                                <Avatar size={36} src={user?.avatar} className="bg-blue-100" />
                                <div className="hidden md:flex flex-col items-start justify-center ml-1 leading-none">
                                    <div className="text-sm font-bold text-gray-700 mb-0.5">{user?.name}</div>
                                    <div className="text-[10px] text-gray-500 font-medium tracking-wide uppercase">{user?.role === 'admin' ? '系統管理員' : '夥伴學員'}</div>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Content className={`${isLessonPage ? 'p-0' : 'p-6 md:p-8'} overflow-y-auto h-[calc(100vh-64px)] scroll-smooth`}>
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
