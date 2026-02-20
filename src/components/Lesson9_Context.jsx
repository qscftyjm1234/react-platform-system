import { createContext, useState, useContext } from 'react';

// Lesson 9: Context (全域狀態)
// 目標：跨組件傳遞資料，避免 Prop Drilling (一層層傳 props)
// Vue 對照：provide / inject

// 1. 建立 Context (通常會分開一個檔案，這裡為了教學放一起)
const ThemeContext = createContext(null);
const UserContext = createContext(null);

// --- 子組件 (不需要透過 props 拿 theme) ---
function ThemedButton() {
    // 3. 使用 Context (Consume)
    const theme = useContext(ThemeContext);

    return (
        <button style={{
            backgroundColor: theme === 'dark' ? '#333' : '#eee',
            color: theme === 'dark' ? '#fff' : '#000',
            border: '1px solid #999',
            padding: '10px 20px',
            cursor: 'pointer'
        }}>
            我是 {theme === 'dark' ? '深色' : '淺色'} 按鈕
        </button>
    );
}

function UserInfo() {
    const user = useContext(UserContext);

    if (!user) return <p>未登入</p>;

    return (
        <div style={{ marginTop: '10px', borderTop: '1px solid #ccc', paddingTop: '10px' }}>
            <p>目前使用者: <strong>{user.name}</strong></p>
            <p>權限: {user.role}</p>
        </div>
    );
}

export default function Lesson9_Context() {
    const [theme, setTheme] = useState('light');
    const [user, setUser] = useState({ name: 'React新手', role: 'Developer' });

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <div style={{ padding: '20px', border: '1px solid green', margin: '10px' }}>
            <h3>Lesson 9: Context (全域狀態)</h3>

            <button onClick={toggleTheme}>
                切換主題 (目前: {theme})
            </button>

            <div style={{ marginTop: '20px', padding: '20px', border: '2px dashed orange' }}>
                <p>這裡示範 Provider 包覆範圍內的組件，可以直接拿到資料。</p>

                {/* 2. 提供 Context (Provide) */}
                <ThemeContext.Provider value={theme}>
                    <UserContext.Provider value={user}>

                        {/* 這些組件裡面沒有傳 props，但它們能拿到 theme 和 user */}
                        <ThemedButton />
                        <UserInfo />

                    </UserContext.Provider>
                </ThemeContext.Provider>
            </div>
        </div>
    );
}
