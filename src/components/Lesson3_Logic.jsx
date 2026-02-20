// Lesson 3: 邏輯控制
// 目標：條件渲染 (v-if) 與 列表渲染 (v-for)

function Lesson3_Logic() {
    const isLoggedIn = true;
    const list = [
        { id: 1, name: '學會 Vue' },
        { id: 2, name: '學會 React' },
        { id: 3, name: '成為前端大師' }
    ];

    return (
        <div style={{ padding: '20px', border: '1px solid green', margin: '10px' }}>
            <h3>邏輯控制範例</h3>

            {/* 1. 條件渲染 (v-if) */}
            {/* 使用 && 運算子：如果左邊為真，則顯示右邊 */}
            {isLoggedIn && <p>歡迎回來，使用者！</p>}

            {/* 使用三元運算子 (v-if / v-else) */}
            {isLoggedIn ? <button>登出</button> : <button>登入</button>}

            <hr />

            {/* 2. 列表渲染 (v-for) */}
            {/* 使用 map 函式將資料轉換為 JSX */}
            <ul>
                {list.map((item) => (
                    // key 是必須的，幫助 React 辨識項目 (類似 :key)
                    <li key={item.id}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Lesson3_Logic;
