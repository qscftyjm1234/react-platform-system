import React, { useState } from 'react';
import {
    Table,
    Tag,
    Space,
    Input,
    Typography,
    Avatar,
    Progress,
    Button,
    Select
} from 'antd';
import {
    SearchOutlined,
    UserOutlined,
    TeamOutlined,
    CheckCircleOutlined,
    ArrowUpOutlined,
    FilterOutlined,
    ExportOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { KPICard } from '@/components/dashboard/KPICard';
import { EMPLOYEES, Employee } from '@/data/users';
import { COURSES } from '@/data/courses';

const { Title, Text } = Typography;
const { Option } = Select;

export const EmployeeManagement: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const [deptFilter, setDeptFilter] = useState('all');

    const filteredEmployees = EMPLOYEES.filter(emp => {
        const matchesSearch = emp.name.includes(searchText) || emp.id.includes(searchText);
        const matchesDept = deptFilter === 'all' || emp.dept === deptFilter;
        return matchesSearch && matchesDept;
    });

    const depts = Array.from(new Set(EMPLOYEES.map(emp => emp.dept)));

    const columns = [
        {
            title: '員工資訊',
            key: 'employee',
            render: (_: any, record: Employee) => (
                <Space>
                    <Avatar src={record.avatar} icon={<UserOutlined />} />
                    <div>
                        <div className="font-bold text-gray-800">{record.name}</div>
                        <div className="text-xs text-gray-500">{record.id} · {record.role}</div>
                    </div>
                </Space>
            ),
        },
        {
            title: '部門',
            dataIndex: 'dept',
            key: 'dept',
            render: (dept: string) => <Tag color="blue" className="rounded-md border-none px-2">{dept}</Tag>,
        },
        {
            title: '課程完成進度',
            key: 'progress',
            width: 300,
            render: (_: any, record: Employee) => (
                <div className="w-full space-y-2">
                    {record.progress.map(p => {
                        const course = COURSES.find(c => c.id === p.courseId);
                        if (!course) return null;
                        return (
                            <div key={p.courseId} className="flex flex-col gap-1">
                                <div className="flex justify-between text-[10px]">
                                    <span className="text-gray-500 font-medium truncate w-32">{course.title.split('：')[0]}</span>
                                    <span className="text-blue-600 font-bold">{p.progress}%</span>
                                </div>
                                <Progress percent={p.progress} size="small" showInfo={false} strokeColor={p.progress === 100 ? '#10B981' : '#3B82F6'} />
                            </div>
                        );
                    })}
                </div>
            ),
        },
        {
            title: '最後活躍時間',
            dataIndex: 'lastActive',
            key: 'lastActive',
            render: (date: string) => <Text type="secondary" className="text-xs">{date}</Text>,
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Button type="link" size="small" className="font-bold">查看詳情</Button>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* 壯觀的管理中心橫幅 */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 lg:p-12 text-white shadow-2xl shadow-blue-100">
                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                    <div className="max-w-2xl">
                        <Tag color="blue" className="bg-white/10 border-none text-blue-100 mb-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest leading-none">
                            管理員專區 · 數據中心
                        </Tag>
                        <Title level={1} className="!text-white !mb-4 !text-4xl lg:!text-5xl !font-black tracking-tight">
                            員工管理中心
                        </Title>
                        <Text className="text-blue-100/80 text-lg lg:text-xl font-light leading-relaxed block mb-6">
                            歡迎來到人才培育基地。這裡您可以掌握每一位夥伴的學習脈動，讓團隊在 <span className="text-white font-bold underline decoration-blue-400 underline-offset-4">AI 時代</span> 保持領先。
                        </Text>
                        <div className="flex flex-wrap gap-4">
                            <Button type="primary" size="large" icon={<UsergroupAddOutlined />} className="bg-white text-blue-700 border-none font-bold rounded-xl h-12 px-8 hover:!bg-blue-50 transition-all shadow-lg">
                                新增員工
                            </Button>
                            <Button size="large" icon={<ExportOutlined />} className="bg-white/10 text-white border-white/20 font-bold rounded-xl h-12 px-8 hover:!bg-white/20 transition-all">
                                匯出全體報表
                            </Button>
                        </div>
                    </div>

                    {/* 快速概覽卡片 */}
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 w-full lg:w-80 shadow-inner">
                        <Text className="text-blue-100 text-xs font-bold uppercase tracking-widest mb-4 block">今日關鍵提示</Text>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-400">
                                    <CheckCircleOutlined />
                                </div>
                                <div>
                                    <div className="text-xs text-blue-200">課程平均完成率</div>
                                    <div className="text-lg font-bold">78.5%</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl border border-white/10">
                                <div className="w-10 h-10 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-400">
                                    <TeamOutlined />
                                </div>
                                <div>
                                    <div className="text-xs text-blue-200">本週活躍學員</div>
                                    <div className="text-lg font-bold">42 位</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 裝飾性元素 */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20" />
            </div>

            {/* 數據指標 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="總員工人數"
                    value={String(EMPLOYEES.length)}
                    trend={2.4}
                    icon={<TeamOutlined className="text-xl" />}
                />
                <KPICard
                    title="核心課程完成率"
                    value="78%"
                    trend={5.2}
                    icon={<CheckCircleOutlined className="text-xl" />}
                />
                <KPICard
                    title="本月新增時數"
                    value="1,240"
                    trend={12}
                    icon={<ArrowUpOutlined className="text-xl" />}
                />
                <KPICard
                    title="活躍用戶比例"
                    value="92%"
                    trend={-1.5}
                    icon={<UserOutlined className="text-xl" />}
                />
            </div>

            {/* 員工列表清單 */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-sm overflow-hidden relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-gray-50 rounded-2xl text-gray-400 border border-gray-100">
                            <TeamOutlined className="text-xl" />
                        </div>
                        <div>
                            <Title level={4} className="!mb-0">全體員工學習進度牆</Title>
                            <Text className="text-gray-400 text-xs font-medium">即時更新每位夥伴的數位化轉型進程</Text>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Input
                            prefix={<SearchOutlined className="text-gray-400" />}
                            placeholder="搜尋姓名或員工編號..."
                            className="w-full md:w-64 h-10 rounded-xl bg-gray-50 border-gray-100 focus:bg-white transition-all"
                            value={searchText}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
                        />
                        <Select
                            defaultValue="all"
                            className="w-full md:w-40 h-10 rounded-xl"
                            suffixIcon={<FilterOutlined />}
                            onChange={setDeptFilter}
                        >
                            <Option value="all">所有部門</Option>
                            {depts.map(d => <Option key={d} value={d}>{d}</Option>)}
                        </Select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        dataSource={filteredEmployees}
                        rowKey="id"
                        pagination={{
                            pageSize: 8,
                            className: "!mt-8 custom-pagination"
                        }}
                        className="employee-table ant-table-custom"
                    />
                </div>
            </div>
        </div>
    );
};
