import { useState } from 'react';

// Lesson 2: 狀態管理 (useState)
// 目標：建立一個計數器

// Vue 的寫法概念：
// const count = ref(0)
// function increment() { count.value++ }

function Lesson2_State() {
    // useState 回傳兩個值：
    // 1. 當前的狀態值 (count)
    // 2. 修改狀態的函式 (setCount)
    const [count, setCount] = useState(0);

    return (
        <div style={{ padding: '20px', border: '1px solid blue', margin: '10px' }}>
            <h3>計數器範例 (State)</h3>
            <p>目前數字：{count}</p>

            {/* onClick 是 React 的事件綁定 (注意是 camelCase) */}
            <button onClick={() => setCount(count + 1)}>
                點我 +1
            </button>
        </div>
    );
}

export default Lesson2_State;
