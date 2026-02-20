import React, { useState, useEffect } from 'react';
import { Avatar, Button, Input, Tag, message, Popconfirm, Space } from 'antd';
import { UserOutlined, SendOutlined, MessageOutlined, EditOutlined, DeleteOutlined, RollbackOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';

interface Comment {
    id: string;
    lessonId: string;
    userId: string;
    userName: string;
    userRole: string;
    content: string;
    timestamp: number;
    parentId?: string; // Support for replies
}

interface CommentSectionProps {
    lessonId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ lessonId }) => {
    const { user } = useAuth();
    const [comments, setComments] = useState<Comment[]>([]);
    const [inputValue, setInputValue] = useState('');

    // States for editing and replying
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState('');
    const [replyingToId, setReplyingToId] = useState<string | null>(null);
    const [replyValue, setReplyValue] = useState('');

    // Load comments from localStorage
    useEffect(() => {
        const stored = localStorage.getItem(`lesson_comments_${lessonId}`);
        if (stored) {
            setComments(JSON.parse(stored));
        } else {
            const mockData: Comment[] = [
                {
                    id: '1',
                    lessonId,
                    userId: 'teacher-1',
                    userName: '黃冠禎',
                    userRole: 'admin',
                    content: '歡迎來到本單元！如果在實作過程中有任何問題，歡迎在下方留言，我會盡快回覆大家。',
                    timestamp: Date.now() - 86400000
                }
            ];
            setComments(mockData);
            localStorage.setItem(`lesson_comments_${lessonId}`, JSON.stringify(mockData));
        }
    }, [lessonId]);

    const saveComments = (newComments: Comment[]) => {
        setComments(newComments);
        localStorage.setItem(`lesson_comments_${lessonId}`, JSON.stringify(newComments));
    };

    const handleSubmit = () => {
        if (!inputValue.trim() || !user) return;

        const newComment: Comment = {
            id: Date.now().toString(),
            lessonId,
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            content: inputValue,
            timestamp: Date.now()
        };

        const updatedComments = [...comments, newComment];
        saveComments(updatedComments);
        setInputValue('');
        message.success('留言已送出！');
    };

    const handleUpdate = (id: string) => {
        if (!editValue.trim()) return;
        const updated = comments.map(c =>
            c.id === id ? { ...c, content: editValue, timestamp: Date.now() } : c
        );
        saveComments(updated);
        setEditingId(null);
        message.success('留言已更新');
    };

    const handleDelete = (id: string) => {
        const updated = comments.filter(c => c.id !== id && c.parentId !== id);
        saveComments(updated);
        message.success('留言已刪除');
    };

    const handleReply = (parentId: string) => {
        if (!replyValue.trim() || !user) return;

        const newReply: Comment = {
            id: Date.now().toString(),
            lessonId,
            userId: user.id,
            userName: user.name,
            userRole: user.role,
            content: replyValue,
            timestamp: Date.now(),
            parentId
        };

        const updatedComments = [...comments, newReply];
        saveComments(updatedComments);
        setReplyingToId(null);
        setReplyValue('');
        message.success('回覆已送出！');
    };

    // Helper to organize comments into a list with replies indented
    const renderCommentItem = (item: Comment, isReply = false) => {
        const isEditing = editingId === item.id;
        const isReplying = replyingToId === item.id;
        const canManage = user && (user.id === item.userId || user.role === 'admin');

        return (
            <div key={item.id} className={`${isReply ? 'ml-12 mt-2 border-l-2 border-slate-100 pl-6' : ''}`}>
                <div className={`p-4 rounded-2xl transition-all ${isEditing ? 'bg-blue-50/50 ring-1 ring-blue-200' : 'hover:bg-slate-50/50'}`}>
                    <div className="flex items-center gap-3 mb-2">
                        <Avatar
                            size={isReply ? 28 : 32}
                            className={`${item.userRole === 'admin' ? 'bg-amber-500 shadow-amber-100' : 'bg-slate-200'}`}
                            icon={<UserOutlined />}
                        />
                        <div className="flex items-center gap-2 flex-grow">
                            <span className={`font-black text-slate-900 ${isReply ? 'text-xs' : 'text-sm'}`}>{item.userName}</span>
                            {item.userRole === 'admin' && (
                                <Tag className="bg-amber-100 text-amber-600 border-none text-[9px] font-black uppercase px-2 py-0.5 rounded-full scale-90">官方導師</Tag>
                            )}
                            <span className="text-[10px] text-slate-300 font-medium ml-auto">
                                {new Date(item.timestamp).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    <div className="pl-0 sm:pl-11">
                        {isEditing ? (
                            <div className="space-y-3">
                                <Input.TextArea
                                    value={editValue}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEditValue(e.target.value)}
                                    autoSize={{ minRows: 2 }}
                                    className="rounded-xl border-slate-200"
                                />
                                <Space>
                                    <Button size="small" type="primary" onClick={() => handleUpdate(item.id)} className="rounded-lg font-bold">儲存變更</Button>
                                    <Button size="small" onClick={() => setEditingId(null)} className="rounded-lg font-bold">取消</Button>
                                </Space>
                            </div>
                        ) : (
                            <div className="text-slate-600 text-[13px] font-medium leading-relaxed whitespace-pre-wrap">
                                {item.content}
                            </div>
                        )}

                        {/* Action Buttons */}
                        {!isEditing && user && (
                            <div className="flex gap-4 mt-3 transition-opacity">
                                <Button
                                    type="link"
                                    size="small"
                                    icon={<RollbackOutlined />}
                                    className="p-0 text-[11px] text-slate-400 font-bold hover:text-blue-600"
                                    onClick={() => {
                                        setReplyingToId(isReplying ? null : item.id);
                                        setReplyValue('');
                                    }}
                                >
                                    回覆
                                </Button>
                                {user.id === item.userId && (
                                    <Button
                                        type="link"
                                        size="small"
                                        icon={<EditOutlined />}
                                        className="p-0 text-[11px] text-slate-400 font-bold hover:text-amber-600"
                                        onClick={() => {
                                            setEditingId(item.id);
                                            setEditValue(item.content);
                                        }}
                                    >
                                        編輯
                                    </Button>
                                )}
                                {canManage && (
                                    <Popconfirm title="確定要刪除這條留言嗎？" onConfirm={() => handleDelete(item.id)} okText="確定" cancelText="取消">
                                        <Button type="link" size="small" icon={<DeleteOutlined />} danger className="p-0 text-[11px] font-bold">
                                            刪除
                                        </Button>
                                    </Popconfirm>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Reply Input Area */}
                {isReplying && (
                    <div className="ml-12 mt-3 p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50 animate-in slide-in-from-top-2 duration-300">
                        <Input.TextArea
                            value={replyValue}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyValue(e.target.value)}
                            placeholder={`回覆 ${item.userName}...`}
                            autoSize={{ minRows: 2 }}
                            className="rounded-xl border-none shadow-sm mb-3"
                        />
                        <Space>
                            <Button size="small" type="primary" onClick={() => handleReply(item.id)} className="rounded-lg font-bold">送出回覆</Button>
                            <Button size="small" onClick={() => setReplyingToId(null)} className="rounded-lg font-bold">取消</Button>
                        </Space>
                    </div>
                )}

                {/* Recursive Replies Rendering */}
                {comments.filter((c: Comment) => c.parentId === item.id).map((reply: Comment) => renderCommentItem(reply, true))}
            </div>
        );
    };

    return (
        <div className="mt-16 p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <MessageOutlined className="text-lg" />
                </div>
                <div>
                    <h3 className="text-lg font-black text-slate-900 m-0">單元問答留言板</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">與導師及同學即時交流</p>
                </div>
            </div>

            {/* Main Input Section */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <Avatar size={32} icon={<UserOutlined />} className="bg-blue-600 shadow-sm" />
                    <span className="text-sm font-black text-slate-800">
                        {user?.name}
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider ml-2 px-2 py-0.5 bg-white rounded-md border border-slate-200">
                            {user?.role === 'admin' ? '導師' : '學員'}
                        </span>
                    </span>
                </div>
                <Input.TextArea
                    value={inputValue}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
                    placeholder="有什麼問題想問老師嗎？"
                    autoSize={{ minRows: 2, maxRows: 6 }}
                    className="rounded-xl border-none shadow-sm placeholder:text-slate-300 font-medium p-3 mb-3"
                />
                <div className="flex justify-end">
                    <Button
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={handleSubmit}
                        disabled={!inputValue.trim()}
                        className="bg-blue-600 border-none rounded-xl h-9 px-6 font-bold shadow-lg shadow-blue-100 flex items-center"
                    >
                        送出問題
                    </Button>
                </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.filter(c => !c.parentId).map(item => (
                        <div key={item.id} className="group">
                            {renderCommentItem(item)}
                        </div>
                    ))
                ) : (
                    <div className="py-10 text-slate-300 font-bold text-center">目前尚無留言，成為第一個發問的人吧！</div>
                )}
            </div>
        </div>
    );
};
