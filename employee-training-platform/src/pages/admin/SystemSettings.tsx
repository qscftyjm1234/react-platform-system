import React, { useState } from 'react';
import {
    Tabs,
    Card,
    Button,
    Tag,
    Space,
    Typography,
    Form,
    Checkbox,
    Row,
    Col,
    Divider,
    Select,
    Modal,
    Input,
    message
} from 'antd';
import {
    PlusOutlined,
    DeleteOutlined,
    EditOutlined,
    SettingOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';
import { INITIAL_ASSIGNMENT_RULES, AssignmentRule, CourseGroup } from '@/data/settings';
import { COURSES, COURSE_GROUPS } from '@/data/courses';

const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Option } = Select;

export const SystemSettings: React.FC = () => {
    const [rules, setRules] = useState<AssignmentRule[]>(INITIAL_ASSIGNMENT_RULES);
    const [groups, setGroups] = useState<CourseGroup[]>(COURSE_GROUPS);
    const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
    const [isRuleModalVisible, setIsRuleModalVisible] = useState(false);
    const [editingGroup, setEditingGroup] = useState<CourseGroup | null>(null);
    const [editingRule, setEditingRule] = useState<AssignmentRule | null>(null);

    const [groupForm] = Form.useForm();
    const [ruleForm] = Form.useForm();

    // --- 群組操作 ---
    const handleGroupClick = (group?: CourseGroup) => {
        if (group) {
            setEditingGroup(group);
            groupForm.setFieldsValue(group);
        } else {
            setEditingGroup(null);
            groupForm.resetFields();
        }
        setIsGroupModalVisible(true);
    };

    const handleSaveGroup = (values: any) => {
        if (editingGroup) {
            setGroups(groups.map(g => g.id === editingGroup.id ? { ...g, ...values } : g));
            message.success('群組已更新');
        } else {
            const newGroup: CourseGroup = {
                id: `group-${Date.now()}`,
                ...values
            };
            setGroups([...groups, newGroup]);
            message.success('新群組已建立');
        }
        setIsGroupModalVisible(false);
    };

    const handleDeleteGroup = (id: string) => {
        Modal.confirm({
            title: '確定要刪除此群組嗎？',
            content: '刪除後，所有關聯此群組的分配規則將受到影響。',
            okText: '確定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                setGroups(groups.filter(g => g.id !== id));
                message.success('群組已刪除');
            }
        });
    };

    // --- 規則操作 ---
    const handleRuleClick = (rule?: AssignmentRule) => {
        if (rule) {
            setEditingRule(rule);
            ruleForm.setFieldsValue(rule);
        } else {
            setEditingRule(null);
            ruleForm.resetFields();
        }
        setIsRuleModalVisible(true);
    };

    const handleSaveRule = (values: any) => {
        if (editingRule) {
            setRules(rules.map(r => r.id === editingRule.id ? { ...r, ...values } : r));
            message.success('規則已更新');
        } else {
            const newRule: AssignmentRule = {
                id: `R${Date.now()}`,
                ...values
            };
            setRules([...rules, newRule]);
            message.success('新規則已建立');
        }
        setIsRuleModalVisible(false);
    };

    const handleDeleteRule = (id: string) => {
        Modal.confirm({
            title: '確定要刪除此分配規則嗎？',
            okText: '確定',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                setRules(rules.filter(r => r.id !== id));
                message.success('規則已刪除');
            }
        });
    };


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
                        定義組織單位與課程的映射關係。系統將根據 HR 同步的 <span className="text-white font-bold underline decoration-blue-400 underline-offset-4">部門與職等</span> 自動指派學習路徑。
                    </Text>
                </div>

                {/* 裝飾 */}
                <div className="absolute top-[-20%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full blur-[100px] opacity-20" />
                <div className="absolute bottom-[-20%] left-[20%] w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20" />
            </div>

            <Card className="shadow-sm border-none rounded-3xl" bodyStyle={{ padding: '0px' }}>
                <Tabs defaultActiveKey="2" className="custom-settings-tabs" size="large">

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
                                            <Button type="text" icon={<EditOutlined />} onClick={() => handleRuleClick(rule)} className="text-gray-400" />
                                            <Button type="text" icon={<DeleteOutlined />} onClick={() => handleDeleteRule(rule.id)} className="text-red-400" />
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

                            <Button
                                type="dashed"
                                block
                                icon={<PlusOutlined />}
                                onClick={() => handleRuleClick()}
                                className="h-16 rounded-2xl text-gray-400 font-bold border-2"
                            >
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
                            <Button type="primary" icon={<PlusOutlined />} onClick={() => handleGroupClick()} className="rounded-xl font-bold h-10 px-6 shadow-md">
                                建立新群組
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {groups.map(group => (
                                <Card key={group.id} className="rounded-2xl border-gray-100 hover:shadow-lg transition-all duration-300">
                                    <div className="flex justify-between items-start mb-4">
                                        <Title level={5} className="!m-0 !font-black !text-gray-800">{group.name}</Title>
                                        <Space>
                                            <Button type="text" size="small" icon={<EditOutlined />} onClick={() => handleGroupClick(group)} />
                                            <Button type="text" size="small" danger icon={<DeleteOutlined />} onClick={() => handleDeleteGroup(group.id)} />
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
            {/* 課程群組 Modal */}
            <Modal
                title={<span className="text-xl font-black">{editingGroup ? '編輯課程群組' : '建立新群組'}</span>}
                visible={isGroupModalVisible}
                onCancel={() => setIsGroupModalVisible(false)}
                onOk={groupForm.submit}
                okText="儲存群組"
                cancelText="取消"
                className="custom-modal"
                centered
            >
                <Form form={groupForm} layout="vertical" onFinish={handleSaveGroup}>
                    <Form.Item
                        name="name"
                        label={<span className="font-bold">群組名稱</span>}
                        rules={[{ required: true, message: '請輸入群組名稱' }]}
                    >
                        <Input placeholder="例如：前端基礎培訓" className="h-10 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label={<span className="font-bold">群組描述</span>}
                    >
                        <Input.TextArea placeholder="簡述此群組的培訓目標" className="rounded-lg" rows={3} />
                    </Form.Item>
                    <Form.Item
                        name="courseIds"
                        label={<span className="font-bold">包含課程</span>}
                        rules={[{ required: true, message: '請至少選擇一門課程' }]}
                    >
                        <Select mode="multiple" placeholder="選擇課程" className="w-full">
                            {COURSES.map(course => (
                                <Option key={course.id} value={course.id}>{course.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>

            {/* 分配規則 Modal */}
            <Modal
                title={<span className="text-xl font-black">{editingRule ? '編輯分配規則' : '新增分配規則'}</span>}
                visible={isRuleModalVisible}
                onCancel={() => setIsRuleModalVisible(false)}
                onOk={ruleForm.submit}
                okText="儲存規則"
                cancelText="取消"
                className="custom-modal"
                centered
            >
                <Form form={ruleForm} layout="vertical" onFinish={handleSaveRule}>
                    <Form.Item
                        name="targetType"
                        label={<span className="font-bold">對象類型</span>}
                        rules={[{ required: true }]}
                        initialValue="dept"
                    >
                        <Select className="h-10">
                            <Option value="dept">部門</Option>
                            <Option value="role">職稱/角色</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="targetValue"
                        label={<span className="font-bold">目標值</span>}
                        rules={[{ required: true, message: '請輸入目標值（如：技術研發部）' }]}
                    >
                        <Input placeholder="輸入部門名稱或職稱" className="h-10 rounded-lg" />
                    </Form.Item>
                    <Form.Item
                        name="groupIds"
                        label={<span className="font-bold">關聯課程群組</span>}
                    >
                        <Select mode="multiple" placeholder="選擇要指派的群組" className="w-full">
                            {groups.map(group => (
                                <Option key={group.id} value={group.id}>{group.name}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="courseIds"
                        label={<span className="font-bold">單獨指派課程 (非選)</span>}
                    >
                        <Select mode="multiple" placeholder="加選個別課程" className="w-full">
                            {COURSES.map(course => (
                                <Option key={course.id} value={course.id}>{course.title}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
