import { useState, useEffect } from 'react';

// Lesson 10: 自定義 Hook (Custom Hook)
// 目標：邏輯複用 (類似 Vue 的 Composables)

// --- 1. 定義一個 Custom Hook ---
// 慣例：一定要用 "use" 開頭
function useWindowSize() {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        // 定義事件處理函式
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // 監聽 resize 事件
        window.addEventListener('resize', handleResize);

        // 清理函式 (很重要！避免記憶體洩漏)
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // 只在掛載時執行一次

    return size;
}

// --- 2. 另一個 Custom Hook 範例 (模擬 API) ---
function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // 模擬 API 延遲
        const timer = setTimeout(() => {
            setData(`Data from ${url} (Random: ${Math.floor(Math.random() * 100)})`);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, [url]);

    return { data, loading };
}

// --- 3. 組件使用 Custom Hook ---
export default function Lesson10_CustomHook() {
    // 使用就像一般 Hook 一樣
    const { width, height } = useWindowSize();
    const { data, loading } = useFetch('https://api.example.com/user');

    return (
        <div style={{ padding: '20px', border: '1px solid teal', margin: '10px' }}>
            <h3>Lesson 10: Custom Hook (邏輯複用)</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>1. useWindowSize</h4>
                <p>目前視窗大小：</p>
                <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    {width} x {height}
                </p>
                <p style={{ color: 'gray', fontSize: '0.9em' }}>(試著縮放瀏覽器視窗看看)</p>
            </div>

            <div>
                <h4>2. useFetch (模擬)</h4>
                {loading ? (
                    <p>載入中...</p>
                ) : (
                    <p style={{ color: 'green' }}>{data}</p>
                )}
            </div>
        </div>
    );
}
