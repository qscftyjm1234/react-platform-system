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
import { INITIAL_DEPARTMENTS, INITIAL_ASSIGNMENT_RULES, Department, AssignmentRule } from '@/data/settings';
import { COURSES } from '@/data/courses';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export const SystemSettings: React.FC = () => {
    const [departments, setDepartments] = useState<Department[]>(INITIAL_DEPARTMENTS);
    const [rules, setRules] = useState<AssignmentRule[]>(INITIAL_ASSIGNMENT_RULES);
    const [isDeptModalVisible, setIsDeptModalVisible] = useState(false);
    const [form] = Form.useForm();

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
                        系統中心 · 環境配置
                    </Tag>
                    <Title level={1} className="!text-white !mb-4 !text-4xl lg:!text-5xl !font-black tracking-tight">
                        系統環境設定
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
                                                {COURSES.map(course => {
                                                    const isChecked = rule.courseIds.includes(course.id);
                                                    return (
                                                        <Tag 
                                                            key={course.id}
                                                            className={`rounded-lg cursor-pointer transition-all border-none py-1 px-3 ${isChecked ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 text-gray-500 opacity-60'}`}
                                                        >
                                                            {course.title.split('：')[0]}
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
                            
                            <Button type="dashed" block icon={<PlusOutlined />} className="h-16 rounded-2xl text-gray-400 font-bold border-2">
                                新增分配規則
                            </Button>
                        </div>
                    </TabPane>

                    <TabPane 
                        tab={<span className="flex items-center gap-2 px-4 py-2"><SettingOutlined />通用參數</span>} 
                        key="3"
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
            </Card>

            {/* 部門新增 Modal */}
            <Modal
                title={<span className="text-xl font-black">新增部門</span>}
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
            </Modal>
        </div>
    );
};
