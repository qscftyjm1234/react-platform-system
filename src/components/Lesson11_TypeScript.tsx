
import { useState } from 'react';

// Lesson 11: TypeScript 基礎元件 (TSX)
// 目標：學習 Interface 定義 Props 與 Event 類型

// 1. 定義 Props 的 Interface (介面)
interface ButtonProps {
    label: string;
    onClick?: () => void; // ? 代表可選屬性
    disabled?: boolean;
}

// 2. 定義 User 資料結構
interface User {
    id: number;
    name: string;
    email: string;
}

// --- 子組件 (使用 Props Interface) ---
function TsButton({ label, onClick, disabled = false }: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                margin: '5px',
                padding: '8px 16px',
                opacity: disabled ? 0.5 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer'
            }}
        >
            {label}
        </button>
    );
}

export default function Lesson11_TypeScript() {
    // 3. useState 指定泛型 <User | null>
    // 代表 user 可以是 User 物件，也可以是 null
    const [user, setUser] = useState<User | null>(null);

    // 4. Input 事件類型: React.ChangeEvent<HTMLInputElement>
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleLogin = () => {
        setUser({
            id: 1,
            name: inputValue || '訪客',
            email: 'test@example.com'
        });
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #007acc', margin: '10px' }}>
            <h3 style={{ color: '#007acc' }}>Lesson 11: TypeScript 入門</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>Props 與 Event 類型</h4>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="輸入名字..."
                />
                <TsButton label="登入" onClick={handleLogin} disabled={!inputValue} />
                <TsButton label="登出" onClick={() => setUser(null)} disabled={!user} />
            </div>

            <div>
                <h4>User 狀態 (泛型)</h4>
                {user ? (
                    <div style={{ background: '#e6f7ff', padding: '10px' }}>
                        <p>ID: {user.id}</p>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                    </div>
                ) : (
                    <p style={{ color: 'gray' }}>未登入</p>
                )}
            </div>
        </div>
    );
}
