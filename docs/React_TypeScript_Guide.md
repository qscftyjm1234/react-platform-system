# React TypeScript 實戰指南 (Vue 開發者版)

這份指南將協助你從 JavaScript 過渡到 TypeScript，讓你的 React 程式碼更安全、更好維護。

## 1. 為什麼要用 TypeScript？

- **自動補全 (IntelliSense)**：不用再猜 Props 有哪些屬性。
- **即時錯誤檢查**：傳錯型別 (例如 string 傳成 number) 馬上就會紅底線報錯。
- **重構更容易**：改一個 Component 的 Props，所有用到的地方都會提醒你修改。

---

## 2. 基礎型別定義

### 定義 Props (Interface)
在 Vue 你可能習慣用 `defineProps({ title: String })`，在 React 我們用 `interface`。

```tsx
// 1. 定義介面
interface ButtonProps {
  label: string;
  count?: number; // ? 代表可選 (Optional)
  onClick: (id: number) => void; // 函式型別
}

// 2. 使用介面
function MyButton({ label, count = 0, onClick }: ButtonProps) {
  return <button onClick={() => onClick(1)}>{label} ({count})</button>;
}
```

### 定義 State (useState 泛型)
通常 `useState` 會自動推斷型別，但有兩種情況需要手動指定：
1. 初始值是 `null`。
2. 是一個物件陣列。

```tsx
interface User {
  id: number;
  name: string;
}

function UserProfile() {
  // 泛型 <User | null>
  const [user, setUser] = useState<User | null>(null);
  
  // 泛型 <User[]>
  const [list, setList] = useState<User[]>([]);
}
```

---

## 3. 事件處理 (Event Types)

在 input 或 button 的 `onChange`, `onClick` 事件中，我們需要定義 `e` (Event) 的型別。

### 常見事件類型
- `React.ChangeEvent<HTMLInputElement>`: Input 輸入
- `React.FormEvent<HTMLFormElement>`: 表單送出
- `React.MouseEvent<HTMLButtonElement>`: 按鈕點擊

```tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  console.log(e.target.value); // TS 知道 e.target 有 value 屬性
};
```

---

## 4. `useRef` 的泛型

`useRef` 有一個小陷阱：如果你是為了抓 DOM，初始值通常是 `null`，這時要小心宣告。

```tsx
// 唯讀的 Ref (抓 DOM 用)
const inputRef = useRef<HTMLInputElement>(null);

// 可變的 Ref (存變數用)
const idRef = useRef<number>(0);
```

---

## 5. 常見問題 (Q&A)

### Q: 為什麼我的 `.jsx` 檔案不能寫 Type？
**A:** TypeScript 只能在 `.ts` 或 `.tsx` 檔案中運作。請將副檔名改為 `.tsx`。

### Q: `children` 的型別是什麼？
**A:** 通常是 `React.ReactNode`。

```tsx
interface LayoutProps {
  children: React.ReactNode;
}
```
