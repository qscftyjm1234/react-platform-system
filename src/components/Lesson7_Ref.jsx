import { useRef, useState } from 'react';

// Lesson 7: useRef 的兩種用法
// 1. 操作 DOM (聚焦 Input)
// 2. 儲存 Mutable 變數 (不觸發 Re-render)

export default function Lesson7_Ref() {
    // 用法 1: DOM 參考
    const inputRef = useRef(null);

    // 用法 2: Mutable 變數
    const renderCount = useRef(0);

    // 為了證明這一頁有在 Re-render，我們還是需要一個 State
    const [text, setText] = useState('');

    // 每次組件執行 (Render)，這個計數器就 +1
    // 注意：我們沒有用 setState，所以這個 +1 不會「觸發」更新
    // 而是「被動」紀錄 updating 次數
    renderCount.current++;

    const handleFocus = () => {
        // 直接操作原生 DOM API
        inputRef.current.focus();
        inputRef.current.style.backgroundColor = '#f0f8ff';
    };

    return (
        <div style={{ border: '1px solid blue', padding: '20px', margin: '10px' }}>
            <h3>Lesson 7: useRef 範例</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>1. DOM 操作</h4>
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="輸入文字觸發 Render..."
                />
                <button onClick={handleFocus} style={{ marginLeft: '10px' }}>
                    聚焦 Input
                </button>
            </div>

            <div>
                <h4>2. 渲染計數器 (不會觸發更新)</h4>
                <p>你在 Input 打字時，畫面會更新 (State 改變)。</p>
                <p>Render Count: <strong>{renderCount.current}</strong></p>
                <p style={{ color: 'gray', fontSize: '0.9em' }}>
                    (觀察：這個 Render Count 數值會隨著你打字而增加，因為組件一直在重新渲染。但如果我們嘗試直接修改它，畫面是不會變的。)
                </p>
            </div>
        </div>
    );
}
