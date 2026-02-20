import { useState, useEffect } from 'react';

// Lesson 4: 副作用與生命週期 (useEffect)
// 目標：模擬組件掛載與資料載入 (onMounted)

function Lesson4_Effect() {
    const [data, setData] = useState('載入中...');

    // useEffect 接受兩個參數：
    // 1. 執行的函式
    // 2. 依賴陣列 (Dependency Array)

    // 空陣列 [] 代表只在組件「掛載完成」後執行一次 (等於 onMounted)
    useEffect(() => {
        console.log('組件掛載完成，開始模擬 API 請求');

        // 模擬 2 秒後取得資料
        const timer = setTimeout(() => {
            setData('資料載入成功！');
        }, 2000);

        // 清除函式 (等於 onUnmounted)，組件移除時執行
        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid purple', margin: '10px' }}>
            <h3>生命週期範例 (Effect)</h3>
            <p>API 狀態：{data}</p>
        </div>
    );
}

export default Lesson4_Effect;
