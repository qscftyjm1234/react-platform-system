import { useState, useEffect } from 'react';

// Lesson 5: 清理副作用 (Cleanup Function)
// 目標：解決 Strict Mode 下重複執行 Effect 的問題，以及防止 Race Condition

function Lesson5_Cleanup() {
    const [user, setUser] = useState(null);
    const [id, setId] = useState(1);

    useEffect(() => {
        // 設定一個旗標，代表這個 Effect 是否還「活著」
        let isActive = true;

        // 或者是使用 AbortController (更進階的做法)
        const controller = new AbortController();

        console.log(`開始請求 User ID: ${id}`);

        fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
            signal: controller.signal // 將 signal 綁定給 fetch
        })
            .then(res => res.json())
            .then(data => {
                // 只有當這個 Effect 還有效時，才設定狀態
                if (isActive) {
                    console.log(`請求成功! User: ${data.name}`);
                    setUser(data);
                } else {
                    console.log('忽略本次結果 (因為元件已卸載或 id 改變)');
                }
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    console.log('請求已被取消');
                } else {
                    console.error('請求失敗', err);
                }
            });

        // Cleanup Function: 當元件卸載，或下一次 Effect 執行前會先跑這個
        return () => {
            console.log(`清理上一次的副作用 (取消 ID: ${id} 的請求)`);
            isActive = false; // 標記失效
            controller.abort(); // 中斷 fetch 請求
        };
    }, [id]); // 依賴 id，所以 id 變的時候會先執行 cleanup，再執行新的 effect

    return (
        <div style={{ padding: '20px', border: '1px solid orange', margin: '10px' }}>
            <h3>Lesson 5: 清理副作用 (解決重複請求)</h3>
            <p>即使在 Strict Mode 下跑兩次，雖然 console 會看到兩次開始，但第一次的請求會被 abort 或忽略。</p>
            <p>當前 User ID: {id}</p>
            <button onClick={() => setId(id + 1)}>下一個 User (快速點擊測試)</button>
            {user ? <p>名字: {user.name}</p> : <p>載入中...</p>}
        </div>
    );
}

export default Lesson5_Cleanup;
