import React, { useState, useEffect, useRef, useMemo, useCallback, useContext, createContext, memo, useReducer, useLayoutEffect, Fragment } from 'react';
import { Button, Input, Card, Space, Divider } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

interface PlaygroundProps {
    initialCode: string;
}

export const Playground: React.FC<PlaygroundProps> = ({ initialCode }) => {
    const [key, setKey] = useState(0);

    // 提供給沙盒的執行作用域
    const scope = {
        useState,
        useEffect,
        useRef,
        useMemo,
        useCallback,
        useContext,
        createContext,
        memo,
        useReducer,
        useLayoutEffect,
        Fragment,
        // Ant Design Components
        Button,
        Input,
        Card,
        Space,
        Divider,
        React
    };

    return (
        <div className="h-[600px] flex flex-col bg-[#1e1e1e] rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
            <LiveProvider
                key={key}
                code={initialCode.trim()}
                scope={scope}
                noInline={initialCode.includes('render(') || initialCode.includes('export default')}
                transformCode={(code: string) => {
                    // 1. 移除所有的 import 語句（因為我們已經在 scope 提供了）
                    let transformed = code.replace(/import\s+[\s\S]*?from\s+['"][^'"]+['"];?/g, '');

                    // 2. 處理 export default
                    // 支援兩種寫法： export default function App() ... 或 export default App;
                    if (transformed.includes('export default')) {
                        const match = transformed.match(/export default\s+function\s+(\w+)/);
                        if (match) {
                            const componentName = match[1];
                            transformed = transformed.replace(/export default\s+function\s+(\w+)/, 'function $1');
                            transformed = `${transformed}\nrender(<${componentName} />);`;
                        } else {
                            const nameMatch = transformed.match(/export default\s+(\w+);?/);
                            if (nameMatch) {
                                const componentName = nameMatch[1];
                                transformed = transformed.replace(/export default\s+(\w+);?/, '');
                                transformed = `${transformed}\nrender(<${componentName} />);`;
                            }
                        }
                    } else if (transformed.includes('function App')) {
                        // 如果沒有 export default 但有 App 函式，也自動幫忙渲染
                        transformed = `${transformed}\nrender(<App />);`;
                    }

                    return transformed;
                }}
            >
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                    {/* 編輯器區域 */}
                    <div className="flex flex-col border-r border-slate-800 overflow-hidden">
                        <div className="bg-[#1e1e1e] px-6 py-3 flex justify-between items-center border-b border-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                </div>
                                <span className="text-slate-500 text-[10px] font-black uppercase tracking-widest ml-2">編輯器 — App.tsx</span>
                            </div>
                            <Button
                                type="text"
                                size="small"
                                icon={<ReloadOutlined className="text-[10px]" />}
                                onClick={() => setKey(prev => prev + 1)}
                                className="text-slate-500 hover:text-white hover:bg-slate-800 rounded-lg h-8 px-3 font-bold text-[10px] uppercase tracking-tighter"
                            >
                                重置代碼
                            </Button>
                        </div>
                        <div className="flex-1 overflow-auto custom-scrollbar">
                            <LiveEditor
                                className="font-mono text-[13px] leading-relaxed"
                                style={{
                                    fontFamily: 'JetBrains Mono, Menlo, Monaco, Consolas, monospace',
                                }}
                            />
                        </div>
                    </div>

                    {/* 預覽區域 */}
                    <div className="flex flex-col bg-white overflow-hidden">
                        <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex justify-between items-center">
                            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest">實時預覽</span>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">即時渲染中</span>
                            </div>
                        </div>
                        <div className="flex-1 p-8 bg-slate-50/30 overflow-auto relative">
                            {/* 網格背景 */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }}
                            />

                            <div className="relative h-full flex items-center justify-center">
                                <LivePreview className="w-full" />
                            </div>

                            <LiveError className="absolute bottom-4 left-4 right-4 p-4 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-xs font-mono whitespace-pre-wrap animate-in fade-in slide-in-from-bottom-2" />
                        </div>
                    </div>
                </div>
            </LiveProvider>

            <div className="bg-[#1e1e1e] border-t border-slate-800 px-6 py-3">
                <p className="text-[10px] text-slate-500 font-medium m-0 flex items-center gap-2">
                    <span className="bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded text-[9px] font-black uppercase">提示</span>
                    試著修改左側程式碼，右側畫面會自動同步更新。如有報錯請根據錯誤訊息調整。
                </p>
            </div>
        </div>
    );
};
