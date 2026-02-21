import React, { useState } from 'react';
import {
    Tabs,
    Card,
    Table,
    Button,
    Tag,
    Space,
    Typography,
    Modal,
    Form,
    Input,
    Checkbox,
    Row,
    Col,
    Divider,
    message,
    Select
} from 'antd';
import {
    TeamOutlined,
    PlusOutlined,
    DeleteOutlined,
    EditOutlined,
    SettingOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { INITIAL_DEPARTMENTS, INITIAL_ASSIGNMENT_RULES, Department, AssignmentRule, CourseGroup } from '@/data/settings';
import { COURSES, COURSE_GROUPS } from '@/data/courses';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export const SystemSettings: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
    const [rules] = useState<AssignmentRule[]>(INITIAL_ASSIGNMENT_RULES);
    const [groups, setGroups] = useState<CourseGroup[]>(COURSE_GROUPS);
    const [isDeptModalVisible, setIsDeptModalVisible] = useState(false);
    const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [groupForm] = Form.useForm();

    const handleAddDept = (values: any) => {
        const newDept: Department = {
            id: `D${departments.length + 1}`,
            name: values.name,
            employeeCount: 0
        };
        setDepartments([...departments, newDept]);
        setIsDeptModalVisible(false);
        form.resetFields();
        message.success('已成功新增部門');
    };

    const deptColumns = [
        {
            title: '部門名稱',
            dataIndex: 'name',
            key: 'name',
            render: (text: string) => <Text className="font-bold">{text}</Text>
        },
        {
            title: '部門編號',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '當前人數',
            dataIndex: 'employeeCount',
            key: 'employeeCount',
            render: (count: number) => <Tag color="blue">{count} 人</Tag>
        },
        {
            title: '操作',
            key: 'action',
            render: () => (
                <Space size="middle">
                    <Button type="text" icon={<EditOutlined />} />
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Space>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
            {/* Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 lg:p-12 text-white shadow-2xl shadow-blue-100">
                <div className="relative z-10">
                    <Tag color="blue" className="bg-white/10 border-none text-blue-100 mb-4 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest leading-none">
                        教務中心 · 策略配置
                    </Tag>
                    <Title level={1} className="!text-white !mb-4 !text-4xl lg:!text-5xl !font-black tracking-tight">
                        培訓策略設定
                    </Title>
                    <Text className="text-blue-100/80 text-lg lg:text-xl font-light leading-relaxed block">
                        在這裡您可以管理組織架構，並定義基於 <span className="text-white font-bold underline decoration-blue-400 underline-offset-4">部門與角色</span> 的自動化學習路徑。
                    </Text>
                </div>

                {/* 裝飾 */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20" />
            </div>

            <Card className="shadow-sm border-none rounded-3xl" bodyStyle={{ padding: '0px' }}>
                <Tabs defaultActiveKey="1" className="custom-settings-tabs" size="large">
                    <TabPane
                        tab={<span className="flex items-center gap-2 px-4 py-2"><TeamOutlined />部門管理</span>}
                        key="1"
                        className="p-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <Title level={4} className="!mb-1">部門列表</Title>
                                <Text type="secondary">定義公司內部的組織單位</Text>
                            </div>
                            <Button type="primary" icon={<PlusOutlined />} className="rounded-xl font-bold h-10 px-6 shadow-md" onClick={() => setIsDeptModalVisible(true)}>
                                新增部門
                            </Button>
                        </div>
                        <Table
                            columns={deptColumns}
                            dataSource={departments}
                            rowKey="id"
                            className="ant-table-custom"
                            pagination={false}
                        />
                    </TabPane>

                    <TabPane
                        tab={<span className="flex items-center gap-2 px-4 py-2"><SafetyCertificateOutlined />自動課程分配</span>}
                        key="2"
                        className="p-8"
                    >
                        <div className="mb-8">
                            <Title level={4} className="!mb-1">分配規則設定</Title>
                            <Text type="secondary">根據部門或角色自動為員工開啟特定課程</Text>
                        </div>

                        <div className="space-y-6">
                            {rules.map((rule) => (
                                <Card key={rule.id} className="bg-gray-50 border-gray-100 rounded-2xl shadow-none">
                                    <Row gutter={24} align="middle">
                                        <Col span={6}>
                                            <div className="flex flex-col">
                                                <Tag className="w-fit mb-2 border-none bg-blue-100 text-blue-700 font-bold uppercase tracking-tighter text-[10px]">
                                                    {rule.targetType === 'dept' ? '按部門' : '按角色'}
                                                </Tag>
                                                <Text className="text-lg font-black text-gray-800">{rule.targetValue}</Text>
                                            </div>
                                        </Col>
                                        <Col span={14}>
                                            <div className="flex flex-wrap gap-2">
                                                {rule.courseIds.map(courseId => {
                                                    const course = COURSES.find(c => c.id === courseId);
                                                    return (
                                                        <Tag key={courseId} className="rounded-lg bg-blue-600 text-white border-none py-1 px-3">
                                                            {course?.title.split('：')[0]}
                                                        </Tag>
                                                    );
                                                })}
                                                {rule.groupIds?.map(groupId => {
                                                    const group = groups.find(g => g.id === groupId);
                                                    return (
                                                        <Tag key={groupId} className="rounded-lg bg-emerald-600 text-white border-none py-1 px-3">
                                                            [組] {group?.name}
                                                        </Tag>
                                                    );
                                                })}
                                            </div>
                                        </Col>
                                        <Col span={4} className="text-right">
                                            <Button type="text" icon={<EditOutlined />} className="text-gray-400" />
                                            <Button type="text" icon={<DeleteOutlined />} className="text-red-400" />
                                        </Col>
                                    </Row>
                                </Card>
                            ))}

                            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100/50 flex items-start gap-4">
                                <SafetyCertificateOutlined className="text-blue-600 text-xl mt-1" />
                                <div>
                                    <Text className="font-bold text-blue-900 block mb-1">自動分配邏輯</Text>
                                    <Text type="secondary" className="text-sm">
                                        當新員工匯入時，系統會自動根據其「部門」或「職稱」比對上方規則。
                                        符合規則的員工將會自動被指派對應的課程與課程群組。
                                    </Text>
                                </div>
                            </div>

                            <Button type="dashed" block icon={<PlusOutlined />} className="h-16 rounded-2xl text-gray-400 font-bold border-2">
                                新增分配規則
                            </Button>
                        </div>
                    </TabPane>

                    <TabPane
                        tab={<span className="flex items-center gap-2 px-4 py-2"><SettingOutlined />課程群組管理</span>}
                        key="3"
                        className="p-8"
                    >
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <Title level={4} className="!mb-1">學習路徑 (Learning Paths)</Title>
                                <Text type="secondary">定義課程群組，簡化大規模課程分配</Text>
                            </div>
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsGroupModalVisible(true)} className="rounded-xl font-bold h-10 px-6 shadow-md">
                                建立新群組
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groups.map(group => (
                                <Card key={group.id} className="rounded-2xl border-gray-100 hover:shadow-lg transition-all duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <Title level={5} className="!m-0 !font-black !text-gray-800">{group.name}</Title>
                                        <Space>
                                            <Button type="text" size="small" icon={<EditOutlined />} />
                                            <Button type="text" size="small" danger icon={<DeleteOutlined />} />
                                        </Space>
                                    </div>
                                    <p className="text-gray-500 mb-6 text-sm line-clamp-2">{group.description}</p>
                                    <div className="space-y-3">
                                        <div className="text-[10px] font-black uppercase text-gray-400 tracking-widest">包含課程 ({group.courseIds.length})</div>
                                        <div className="flex flex-wrap gap-1">
                                            {group.courseIds.map(cid => {
                                                const course = COURSES.find(c => c.id === cid);
                                                return <Tag key={cid} className="m-0 border-gray-100 bg-gray-50 text-gray-500 text-[11px] py-0">{course?.title.split('：')[0]}</Tag>;
                                            })}
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </TabPane>

                    <TabPane
                        tab={<span className="flex items-center gap-2 px-4 py-2"><SettingOutlined />通用參數</span>}
                        key="4"
                        className="p-8"
                    >
                        <div className="max-w-xl space-y-8">
                            <div>
                                <Title level={4} className="!mb-4">系統通知設定</Title>
                                <Checkbox defaultChecked>課程逾期提醒</Checkbox>
                                <Divider className="my-4" />
                                <Checkbox defaultChecked>新課程上架通知</Checkbox>
                                <Divider className="my-4" />
                                <Checkbox>管理員報表日誌 (每週)</Checkbox>
                            </div>

                            <div>
                                <Title level={4} className="!mb-4">數據保留期限</Title>
                                <Select defaultValue="365" className="w-full h-10 rounded-xl">
                                    <Option value="180">180 天</Option>
                                    <Option value="365">1 年</Option>
                                    <Option value="730">2 年</Option>
                                </Select>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>
            </Card >

            {/* 部門新增 Modal */}
            < Modal
                title={< span className="text-xl font-black" > 新增部門</span >}
                visible={isDeptModalVisible}
                onCancel={() => setIsDeptModalVisible(false)}
                footer={null}
                className="custom-modal"
                centered
            >
                <Form form={form} layout="vertical" onFinish={handleAddDept}>
                    <Form.Item
                        name="name"
                        label={<span className="font-bold">部門名稱</span>}
                        rules={[{ required: true, message: '請輸入部門名稱' }]}
                    >
                        <Input placeholder="例如：法律事務部" className="h-10 rounded-lg" />
                    </Form.Item>
                    <Form.Item className="mb-0 text-right">
                        <Space>
                            <Button onClick={() => setIsDeptModalVisible(false)} className="rounded-lg">取消</Button>
                            <Button type="primary" htmlType="submit" className="rounded-lg font-bold px-6">確認新增</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal >
        </div >
    );
};
