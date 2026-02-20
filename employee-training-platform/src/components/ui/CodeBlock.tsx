import React from 'react';
import { Button, message, Tooltip } from 'antd';
import { CopyOutlined, ThunderboltFilled, CodeOutlined } from '@ant-design/icons';

interface CodeBlockProps {
    code: string;
    language?: string;
    title?: string;
    showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    code,
    language = 'javascript',
    title,
    showLineNumbers = false
}) => {
    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        message.success({
            content: '程式碼已複製至剪貼簿',
            icon: <ThunderboltFilled className="text-blue-500" />,
            style: { marginTop: '10vh' }
        });
    };

    const isTerminal = language === 'bash' || language === 'shell' || code.trim().startsWith('npm') || code.trim().startsWith('npx') || code.trim().startsWith('node');

    return (
        <div className="group relative my-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            {/* Ambient Background Glow (Subtle) */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-[1.5rem] blur-2xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative rounded-[1.25rem] overflow-hidden border border-slate-800/50 bg-[#0B0E14]/90 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-white/5">
                {/* Modern Window Header */}
                <div className="flex justify-between items-center px-5 py-3.5 bg-white/[0.03] border-b border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-inner opacity-80" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-inner opacity-80" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-inner opacity-80" />
                        </div>

                        <div className="h-4 w-[1px] bg-white/10 mx-1"></div>

                        <div className="flex items-center gap-2">
                            {isTerminal ? (
                                <CodeOutlined className="text-blue-400 text-xs" />
                            ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                            )}
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                {title || (isTerminal ? 'Terminal Console' : `${language.toUpperCase()} Source`)}
                            </span>
                        </div>
                    </div>

                    <Tooltip title="Copy to clipboard">
                        <Button
                            type="text"
                            size="small"
                            icon={<CopyOutlined className="text-[14px]" />}
                            onClick={handleCopy}
                            className="bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-none transition-all duration-300 rounded-lg h-8 px-3 flex items-center gap-2"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-wider">Copy</span>
                        </Button>
                    </Tooltip>
                </div>

                {/* Code Body */}
                <div className="relative overflow-hidden font-mono text-[13px] leading-[1.6]">
                    <pre className="p-6 overflow-x-auto m-0 bg-transparent text-slate-300 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                        <code className={`language-${language} block`}>
                            {code.split('\n').map((line, i) => (
                                <div key={i} className="flex group/line">
                                    {showLineNumbers && (
                                        <span className="w-8 shrink-0 text-slate-600 select-none text-right pr-4 opacity-50">
                                            {i + 1}
                                        </span>
                                    )}
                                    <div className="flex-grow flex gap-3">
                                        {isTerminal && line.trim() !== '' && !line.startsWith('#') && (
                                            <span className="shrink-0 text-blue-500 font-black opacity-80 select-none">$</span>
                                        )}
                                        <span className={`${line.startsWith('#') ? 'text-slate-500' : ''}`}>
                                            {line}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </code>
                    </pre>

                    {/* Syntax Highlight Overlay (Visual Only Hint) */}
                    <div className="absolute top-0 right-0 p-4 pointer-events-none opacity-20">
                        <div className="text-[60px] font-black text-white/5 select-none leading-none">
                            {isTerminal ? 'BASH' : language.slice(0, 2).toUpperCase()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
