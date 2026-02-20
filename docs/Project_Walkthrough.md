# React 學習專案導覽 (Vue 開發者版)

我已經為你建立好專案與範例程式碼。請依照以下步驟開始你的學習之旅。

## 1. 專案結構與檔案說明

### 核心檔案

- **`index.html`**
  這是整個網站的入口檔案。
  與傳統 HTML 不同，它的 `<body>` 裡只有一個 `<div id="root"></div>`。
  React 會透過 JavaScript 把所有的畫面「掛載 (mount)」到這個 div 裡面。

- **`src/main.jsx`**
  這是 React 的程式入口點。
  它負責尋找 `index.html` 裡的 `root` 元素，並將 `<App />` 組件渲染進去。

- **`src/App.jsx`**
  這是我們的主組件 (Main Component)。
  所有的課程範例都透過這裡的按鈕進行切換。

- **`src/assets/`**
  存放靜態資源 (如圖片、SVG)。

### 課程範例 (`src/components/`)
這裡存放了所有的學習範例：

| 檔案 | 學習重點 | Vue 對應概念 |
| :--- | :--- | :--- |
| `Lesson1_Component.jsx` | 組件與 Props | Template, Slots, Props |
| `Lesson2_State.jsx` | 狀態 (`useState`) | `ref`, `reactive` |
| `Lesson3_Logic.jsx` | 邏輯控制 | `v-if`, `v-for` |
| `Lesson4_Effect.jsx` | 副作用 (`useEffect`) | `onMounted`, `watch` |
| `Lesson5_Cleanup.jsx` | 效果清理 (Cleanup) | `onUnmounted`, `onBeforeUnmount` |
| `Lesson6_StrictModeDoubleCall.jsx` | 防止重覆執行 (Ref) | (React 特有問題解決) |
| `Lesson7_Ref.jsx` | 引用 (`useRef`) | Template Ref, 一般變數 |
| `Lesson8_Performance.jsx` | 效能優化 | `computed`, 預設響應機制 |
| `Lesson9_Context.jsx` | 全域狀態 (Context) | `provide`, `inject` |
| `Lesson10_CustomHook.jsx` | 自定義 Hook | Composables (組合式函式) |
| `Lesson11_TypeScript.tsx` | TypeScript 基礎 | Interface, Generics |

`src/App.jsx` 已經設定好導覽選單，可以直接切換查看不同的課程範例。

## 2. 啟動方式

由於自動安裝過程遇到網路或路徑問題，請手動執行以下指令：

1.  開啟 VS Code 或命令提示字元 (CMD)。
2.  進入專案資料夾：
    ```bash
    cd "D:\我的文件\Desktop\react-playground"
    ```
3.  重新安裝套件 (如果之前失敗)：
    ```bash
    npm install
    ```
4.  啟動開發伺服器：
    ```bash
    npm run dev
    ```
5.  依照終端機顯示的網址 (通常是 `http://localhost:5173`) 開啟瀏覽器。

## 3. 這份文件的使用方式
- 打開 `src/components/` 中的檔案。
- **閱讀註解**：每一行關鍵程式碼都有繁體中文註解，並附上 Vue 的對應寫法。
- **動手修改**：試著修改 state 的初始值，或是新增一個按鈕，觀察畫面的變化。

祝學習愉快！
