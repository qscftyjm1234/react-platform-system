import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, App as AntdApp } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, BulbOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const { Title, Text, Link } = Typography;

export const LoginPage: React.FC = () => {
    const { message: antdMessage } = AntdApp.useApp();
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [form] = Form.useForm();

    // 從 location state 獲取返回的 URL，如果沒有則預設跳轉至首頁
    const from = (location.state as any)?.from?.pathname || '/';

    const onFinish = (values: any) => {
        setLoading(true);
        console.log('登入數據:', values);
        const { username, password } = values;
        
        // 模擬登入行為
        setTimeout(() => {
            if (username === 'admin' && password === 'admin') {
                login('admin');
                antdMessage.success('登入成功！歡迎回來，系統管理員');
                navigate(from, { replace: true });
            } else if (username === 'A1' && password === 'A1') {
                login('A1');
                antdMessage.success('登入成功！歡迎回來，學員 A1');
                navigate(from, { replace: true });
            } else {
                antdMessage.error('登入失敗！請檢查帳號密碼是否正確。');
                setLoading(false);
            }
        }, 800);
    };

    const handleQuickLogin = (username: string, password: string) => {
        form.setFieldsValue({ username, password });
        form.submit();
    };

    return (
        <div>
            <div className="mb-10 text-left">
                <Title level={2} className="!mb-2 !font-black !text-gray-900 tracking-tight">登入系統</Title>
                <Text className="text-gray-500 text-lg">誠摯歡迎您，請填寫您的帳號資訊</Text>
            </div>

            <Form
                form={form}
                name="login_form"
                initialValues={{ remember: true, username: 'admin' }}
                onFinish={onFinish}
                layout="vertical"
                size="large"
                className="space-y-6"
            >
                <Form.Item
                    name="username"
                    label={<span className="text-gray-600 font-semibold text-sm uppercase tracking-wider">使用者帳號</span>}
                    rules={[{ required: true, message: '請輸入帳號' }]}
                    className="!mb-6"
                >
                    <Input 
                        prefix={<UserOutlined className="text-gray-400 mr-2" />} 
                        placeholder="admin 或 A1" 
                        className="h-14 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all text-base"
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    label={<span className="text-gray-600 font-semibold text-sm uppercase tracking-wider">密碼</span>}
                    rules={[{ required: true, message: '請輸入密碼' }]}
                    className="!mb-6"
                >
                    <Input.Password
                        prefix={<LockOutlined className="text-gray-400 mr-2" />}
                        placeholder="請輸入密碼"
                        className="h-14 rounded-xl border-gray-200 hover:border-blue-400 focus:border-blue-500 transition-all text-base"
                    />
                </Form.Item>

                <div className="flex items-center justify-between mb-8">
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox className="text-sm font-medium text-gray-600">記住我的登入資訊</Checkbox>
                    </Form.Item>
                    <Link className="text-sm font-bold text-blue-600 hover:text-blue-700">忘記密碼？</Link>
                </div>

                <Form.Item className="!mb-8">
                    <Button 
                        type="primary" 
                        htmlType="submit" 
                        loading={loading} 
                        block 
                        icon={<LoginOutlined />}
                        className="h-14 text-lg font-black rounded-xl shadow-xl shadow-blue-100 hover:shadow-blue-200 hover:-translate-y-0.5 transition-all bg-blue-600 border-none"
                    >
                        進入系統
                    </Button>
                </Form.Item>
            </Form>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3">
                <div className="flex items-center gap-2 text-blue-600">
                    <BulbOutlined className="text-base" />
                    <Text className="text-xs font-bold uppercase tracking-widest">快捷登入入口</Text>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div 
                        onClick={() => handleQuickLogin('admin', 'admin')}
                        className="bg-gray-50 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group"
                    >
                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1 group-hover:text-blue-400">系統管理員</div>
                        <div className="text-sm font-mono font-bold text-gray-700">admin / admin</div>
                    </div>
                    <div 
                        onClick={() => handleQuickLogin('A1', 'A1')}
                        className="bg-gray-50 p-3 rounded-xl border border-gray-100 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all group"
                    >
                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-1 group-hover:text-blue-400">一般學員</div>
                        <div className="text-sm font-mono font-bold text-gray-700">A1 / A1</div>
                    </div>
                </div>
            </div>
            
            <div className="mt-10 text-center flex items-center justify-center gap-2">
                <div className="h-[1px] w-8 bg-gray-200" />
                <Text className="text-sm text-gray-400">瑞嘉軟體 &middot; 教育培訓平台</Text>
                <div className="h-[1px] w-8 bg-gray-200" />
            </div>
        </div>
    );
};
