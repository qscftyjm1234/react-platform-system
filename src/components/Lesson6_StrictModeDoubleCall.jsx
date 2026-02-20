import { useState, useEffect, useRef } from 'react';

// Lesson 6: 解決 Strict Mode 下的重複執行 (使用 useRef)
// 目標：防止資料庫寫入或 API 呼叫被執行兩次

function Lesson6_StrictModeDoubleCall() {
    const [count, setCount] = useState(0);
    // 1. 使用 useRef 來追蹤是否已經執行過
    // useRef 的特性是：數值改變不會觸發重新渲染 (Non-reactive)
    const hasRun = useRef(false);

    useEffect(() => {
        // 2. 如果已經執行過，就直接 return 掉
        if (hasRun.current) {
            console.log('Lesson 6: 攔截到第二次執行，已忽略。');
            return;
        }

        // 3. 標記為已執行
        hasRun.current = true;

        // --- 這裡放你的「只能跑一次」的邏輯 ---
        console.log('Lesson 6:這行程式碼只會執行一次 (模擬資料庫異動)');
        setCount(c => c + 1);
        // -------------------------------------

    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid red', margin: '10px' }}>
            <h3>Lesson 6: 嚴格模式下的「防重覆」執行</h3>
            <p>使用 <code>useRef</code> 來確保 useEffect 內的邏輯只會跑一次。</p>
            <p>即使在開發模式 (Strict Mode)，你也只會看到一次「模擬資料庫異動」。</p>
            <p>執行次數: {count}</p>
        </div>
    );
}

export default Lesson6_StrictModeDoubleCall;
