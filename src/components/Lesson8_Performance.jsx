import { useState, useMemo, memo, useCallback } from 'react';

// Lesson 8: 效能優化三兄弟
// 1. memo: 組件快取 (類似 Vue 的預設行為)
// 2. useMemo: 計算快取 (類似 Vue 的 computed)
// 3. useCallback: 函式快取 (為了配合 memo)

// --- 子組件 ---
// 使用 memo 包起來，代表：只有當 props 改變時，才會重新渲染
const ExpensiveChild = memo(function ExpensiveChild({ onClick, label }) {
    console.log(`[子組件] ${label} 渲染了！`);

    // 模擬耗時的渲染 (讓畫面稍微卡頓一下，更有感)
    let start = performance.now();
    while (performance.now() - start < 50) { } // 卡 50ms

    return (
        <div style={{ padding: '10px', border: '1px solid gray', margin: '5px' }}>
            <p>我是 {label}</p>
            <button onClick={onClick}>點我 (子組件按鈕)</button>
        </div>
    );
});

export default function Lesson8_Performance() {
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    // --- useMemo 範例 ---
    // 模擬一個耗時的計算
    const heavyCalculation = (num) => {
        console.log('[重計算] 正在跑迴圈...');
        let result = 0;
        for (let i = 0; i < 10000000; i++) {
            result += num;
        }
        return result;
    }

    // 當 count 改變時，重算。當 text 改變時，不重算 (使用快取)。
    const computedValue = useMemo(() => {
        return heavyCalculation(count);
    }, [count]); // 依賴陣列：只有 count 變了才跑


    // --- useCallback 範例 ---

    // ❌ 錯誤寫法：
    // 每次父組件渲染，handleBad 都會變成一個「新的函式」
    // 導致 ExpensiveChild 覺得 props 變了，所以跟著重繪 (memo 失效)
    const handleBad = () => {
        console.log('Bad Click');
    };

    // ✅ 正確寫法：
    // 使用 useCallback 記住這個函式，除非依賴變了，否則回傳同一個記憶體位置
    const handleGood = useCallback(() => {
        console.log('Good Click');
    }, []); // 空陣列：永遠不改變

    return (
        <div style={{ padding: '20px', border: '1px solid purple', margin: '10px' }}>
            <h3>Lesson 8: 效能優化 (打開 Console 觀察)</h3>

            <div style={{ marginBottom: '20px' }}>
                <h4>1. useMemo (Computed)</h4>
                <p>Count: {count} (會觸發重算)</p>
                <p>計算結果: {computedValue}</p>
                <button onClick={() => setCount(c => c + 1)}>Count + 1</button>

                <br /><br />
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="在這裡打字..."
                />
                <p>打字時，App 會重繪，但不會觸發 [重計算]。</p>
            </div>

            <hr />

            <div>
                <h4>2. memo & useCallback</h4>
                <p>觀察 Console：打字時，哪個子組件會跟著閃爍(重繪)？</p>

                {/* 雖然有用 memo，但因為 handleBad 每次都變，所以還是會重繪 */}
                <ExpensiveChild label="❌ 沒優化組件" onClick={handleBad} />

                {/* 有用 memo，且 handleGood 被 cached 住，所以不會重繪 */}
                <ExpensiveChild label="✅ 有優化組件" onClick={handleGood} />
            </div>
        </div>
    );
}
