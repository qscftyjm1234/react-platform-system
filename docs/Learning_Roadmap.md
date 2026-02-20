# Vue 轉 React 實戰學習指南

這份指南專為 Vue 開發者設計，用你熟悉的觀念來學 React。
我們直接看程式碼，直接動手做。

## 第一階段：建立環境與寫出第一個組件

### 步驟 1：建立專案
1. 開啟終端機 (Terminal)
2. 輸入指令：`npm create vite@latest my-react-app -- --template react`
3. 進入資料夾：`cd my-react-app`
4. 安裝套件：`npm install`
5. 啟動專案：`npm run dev`

### 步驟 2：理解 React 組件 (對照 Vue)
Vue 使用 `.vue` 檔 (Template/Script/Style 分離)，React 使用 `.jsx` 檔 (JavaScript 全部包辦)。

**Vue 的寫法 (回憶一下)：**
```html
<template>
  <button>按鈕</button>
</template>
<script setup>
  // 邏輯寫在這裡
</script>
```

**React 的寫法 (我們要學的)：**
React 組件就是一個「回傳 HTML (JSX) 的 JavaScript 函式」。
```jsx
function MyButton() {
  return <button>按鈕</button>;
}
export default MyButton;
```

---

## 第二階段：讓畫面動起來 (資料與狀態)

在 Vue 你習慣用 `ref` 或 `data`，在 React 我們用 `useState`。

### 步驟 3：使用 `useState`
**Vue:**
```js
const count = ref(0);
count.value++; // 修改時直接改 value
```

**React (必須用設定函式):**
```jsx
import { useState } from 'react';

function Counter() {
  // [變數名稱, 設定變數的函式] = useState(初始值)
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      點擊次數: {count}
    </button>
  );
}
```

---

## 第三階段：邏輯控制 (判斷與迴圈)

React 沒有 `v-if` 或 `v-for`，我們直接寫 JavaScript。

### 步驟 4：條件顯示 (v-if 對照)
**Vue:** `<div v-if="isValid">顯示內容</div>`

**React:** 使用 `&&` 符號
```jsx
{isValid && <div>顯示內容</div>}
```

### 步驟 5：列表迴圈 (v-for 對照)
**Vue:** `<li v-for="item in list">{{ item }}</li>`

**React:** 使用 `.map()`
```jsx
{list.map(item => (
  <li key={item.id}>{item.name}</li>
))}
```

---

## 第四階段：副作用與 API (生命週期)

在 Vue 你用 `onMounted`，在 React 我們用 `useEffect`。

### 步驟 6：載入資料
**Vue:**
```js
onMounted(() => {
  console.log("組件掛載完成");
});
```

**React:**
```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log("組件掛載完成 (只執行一次)");
  }, []); // 空陣列表示只在第一次執行

  return <div>你好</div>;
}
```

---

## 第五階段：進階 Hooks 與效能優化 (Advanced Hooks)

這裡我們進入 React 最深水的區域，也是與 Vue 差異最大的地方。

### 1. `useRef` - 抓取 DOM 與 變數暫存

**Vue 對照：** `ref` (在 template 上) 或 一般變數 (非響應式)。

`useRef` 有兩個主要用途：

#### (1) 存取 DOM 元素
就像在 Vue 裡面 `<div ref="myDiv">`，React 也是用 `ref` 屬性。

```jsx
const inputRef = useRef(null);

// 聚焦 input
inputRef.current.focus();

return <input ref={inputRef} />;
```

#### (2) 儲存「不觸發渲染」的變數
`useState` 改變時會觸發畫面更新 (Re-render)。
`useRef` 改變時 **不會** 觸發畫面更新。
適合用來存：Timer ID、上一前次的值、追蹤是否為第一次渲染。

```jsx
const count = useRef(0);
count.current++; // 畫面數字不會變！
```

---

### 2. 效能優化三兄弟 (`memo`, `useMemo`, `useCallback`)

React 的預設行為是：**只要父組件更新，所有子組件都會重新渲染** (不管 Props 有沒有變)。
這跟 Vue (自動依賴追蹤) 很不一樣，所以 React 需要手動優化。

#### (1) `memo` - 組件級別的快取
**Vue 對照：** Vue 的預設行為 (只有 Props 變才更新)。

高階組件 (HOC)，用來包住組件。如果 Props 沒變，就不重新渲染。

```jsx
const Child = memo(function Child({ name }) {
  return <div>{name}</div>;
});
```

#### (2) `useMemo` - 計算結果的快取
**Vue 對照：** `computed`。

如果某個計算很花時間 (例如過濾大陣列)，我們不希望每次 render 都重算。

```jsx
// 只有當 list 或 filter 改變時，才重新計算 filteredList
const filteredList = useMemo(() => {
  return list.filter(item => item.includes(filter));
}, [list, filter]);
```

#### (3) `useCallback` - 函式的快取
**Vue 對照：** 比較少直接對應，類似將函式定義在 setup 外或保持引用不變。

**這是 React 最難懂的地方。**
每次組件 Re-render，裡面的 function 都會被「重新建立」成一個新的物件。
如果你把這個 function 當作 props 傳給 `memo` 包裝的子組件，子組件會覺得「Props 變了 (因為 function 記憶體位置變了)」，導致 `memo` 失效。

```jsx
// 這樣寫，handleClick 每次記憶體位置都一樣
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

---

### 3. `useContext` - 跨層級傳遞資料

**Vue 對照：** `provide` / `inject`。

解決 Prop Drilling (資料一層一層傳下去) 的問題。

1. **Create**: `const MyContext = createContext(defaultValue);`
2. **Provide**: `<MyContext.Provider value={...}>`
3. **Consume**: `const value = useContext(MyContext);`

---

### 4. Custom Hook - 自定義 Hook

**Vue 對照：** Composables (組合式函式)。

把邏輯抽離出來，讓多個組件共用。命名慣例一定要用 `use` 開頭。

```jsx
function useWindowSize() {
  const [size, setSize] = useState(window.innerWidth);
  // ... 監聽 resize 事件 ...
  return size;
}
```

---

## 接下來的實作計畫
我會依照上面的順序，在你的專案中建立範例檔案，你只需要跟著操作即可。
