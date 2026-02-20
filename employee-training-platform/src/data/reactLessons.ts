export interface ComparisonCode {
  framework: string;
  label: string;
  code: string;
  description: string;
}

export interface LessonContent {
  id: string;
  title: string;
  type?: string;
  level: '初階' | '中階' | '進階';
  description?: string;
  duration?: string;
  prevLesson?: string;
  nextLesson?: string;
  status?: 'completed' | 'current' | 'locked';
  concept: {
    title: string;
    description: string;
    bullets?: string[];
    imageUrl?: string;
    code?: string;
    action?: {
      label: string;
      href: string;
    };
    checkPoints?: {
      title: string;
      code: string;
    }[];
    commandBreakdown?: {
      token: string;
      title: string;
      description: string;
    }[];
    steps?: {
      title: string;
      description: string;
      command: string;
    }[];
  }[];
  comparison?: {
    title: string;
    description: string;
    examples: ComparisonCode[];
  };
  playground?: {
    initialCode: string;
    solutionCode?: string;
  };
}

export const reactLessons: LessonContent[] = [
  {
    id: "1",
    title: "Lesson 1: 起源 - 安裝 Node.js 與 npm 環境",
    description: "在寫任何 React 程式之前，你必須先在電腦裝上「電力系統」。這節課我們只做一件事：搞定環境。",
    prevLesson: "無（這是首篇單元）",
    nextLesson: "Lesson 2: 哲學 - 為什麼要用 React 開發？",
    duration: "15 分鐘",
    type: "環境建置",
    level: "初階",
    status: "current",
    concept: [
      {
        title: "1. 什麼是 Node.js？（你的電腦發電機）",
        description: "JavaScript 本來只能在「瀏覽器」裡跑。Node.js 就像是把發電機搬到了你的電腦桌面，讓你的電腦可以直接看懂並執行 JavaScript 寫的工具。沒有它，你就無法使用現代化的 React 開發流程。",
        steps: [
          { title: "下載", description: "前往 nodejs.org 下載 LTS 版本（這代表穩定且長期支援）。", command: "下載安裝檔" },
          { title: "安裝", description: "執行安裝檔，除了按 Next，請確定勾選了「Add to PATH」。", command: "點擊安裝" },
          { title: "驗證", description: "打開你的黑視窗（終端機），輸入指令確認版本。", command: "node -v" }
        ],
        action: {
          label: "前往 Node.js 官方網站",
          href: "https://nodejs.org/"
        }
      },
      {
        title: "2. 認識 npm（你的物流中心）",
        description: "npm 是隨著 Node.js 一起裝好的。它就像是程式界的「App Store」或是「百貨商城」。如果你需要 React 的功能，你就叫 npm 去下載。它會幫你管理所有的包裹。",
        checkPoints: [
          { title: "檢查 npm 是否到場", code: "npm -v" }
        ]
      },
      {
        title: "3. 終端機基本功（開發者的遙控器）",
        description: "你不需要背指令，只需要知道這兩個最常用的動作：",
        bullets: [
          "cd (進入)：帶你進入某個資料夾。",
          "dir / ls (查看)：看看現在這裡有什麼文件。"
        ],
        code: "cd Desktop\ndir",
      }
    ]
  },
  {
    id: "2",
    title: "Lesson 2: 哲學 - 為什麼要用 React 開發？",
    description: "傳統網頁是一次性的手動建築，而 React 是一套自動化的生產體系。了解資料驅動與組件化，你才能掌握現代開發的核心。",
    prevLesson: "Lesson 1: 環境安裝",
    nextLesson: "Lesson 3: 建構 - 如何搭建您的第一個 React 專案",
    duration: "20 分鐘",
    type: "核心觀念",
    level: "初階",
    status: "current",
    concept: [
      {
        title: "1. 資料驅動：讓畫面自動跟隨數據",
        description: "以前寫網頁是「體力活」，你要親自指揮電腦修改每一個標籤。現在框架把開發變成了「自動化管理」：",
        bullets: [
          "資料驅動 (Data-Driven)：想像你在百貨公司改了一個商品的後台價格，全公司的電子標籤就「瞬間同步」了。你只需要管好資料（Data），不用管畫面（UI）怎麼變。畫面是資料的影子。"
        ],
        code: "// 傳統：手動抓標籤，有 10 個地方要改就要抓 10 次\ndocument.getElementById('price').innerText = '99';\n\n// 框架：資料一變，引用資料的地方全自動更新\nprice.value = 99; // 畫面所有看到 price 的地方都變了"
      },
      {
        title: "2. 組件複用：定義一次，到處使用",
        description: "在傳統網頁，如果你要三個按鈕，你得把 HTML 複製三次。如果你想改按鈕顏色，你得改三個地方。\n\n- **組件 (Component)**：就像是一個「印章」或「模具」。你定義好『按鈕長怎樣、點了做什麼』，以後只需要蓋章（呼叫組件）即可。這就是為什麼 React 跟 Vue 能極速開發的原因。",
        code: "// 定義一次模具\nfunction MyButton({ text }) { \n  return <button className=\"btn\">{text}</button>; \n}\n\n// 到處蓋章使用，維護只需要改上面那個模具\n<MyButton text=\"送出\" />\n<MyButton text=\"取消\" />"
      },
      {
        title: "3. 最終目標：打造 SPA（像 App 一樣的網頁）",
        description: "當你學會了「資料驅動」與「組件複用」後，你就能做出 SPA (Single Page Application)。",
        bullets: [
          "傳統網頁：像是在翻實體書，換一頁就要重新下載整張紙（整頁閃白、重新讀取）。",
          "SPA 網頁：像是在用 FB 或 IG 的 App，切換功能時「上方導覽列沒變，只有內容變了」。這就是 SPA 的魅力：它不需要整頁重整，所以使用者會覺得超級絲滑！"
        ],
        code: "// 傳統：點擊連結，瀏覽器會『重新下載』整面網頁\n<a href=\"/about\">關於我們</a>\n\n// SPA：點擊連結，畫面只會『局部更換』，不需重整\n<Link to=\"/about\">關於我們</Link>"
      },
      {
        title: "4. 前端框架選擇（以 Vue 為例）",
        description: "不管是 React 還是 Vue，都具備「資料驅動」與「組件複用」這兩大秘密武器。Vue 像是工具齊全的懶人包，標籤感更強；React 則像是靈活的樂高組，邏輯感更強。對於企業級應用來說，這些框架能保證你的程式碼更容易維護、出錯率更低。",
        code: "// React：邏輯寫在 JavaScript 裡\nreturn <div>{ isShow ? <Menu /> : null }</div>;\n\n// Vue：邏輯寫在 HTML 標籤裡 (v-if)\n<div v-if=\"isShow\"><Menu /></div>"
      }
    ],
    comparison: {
      title: "開發體感對決：React vs Vue",
      description: "這兩者沒有好壞，只有適不適合你的思考路徑。",
      examples: [
        {
          framework: "react",
          label: "React (邏輯驅動)",
          code: "const Greeting = () => (\n  <div>{isMorning ? '早安' : '晚安'}</div>\n);",
          description: "【純粹 JS】如果你喜歡用陣列方法 (map, filter) 來處理畫面，你會愛死 React。它沒有多餘的語法，只有純 JS 邏輯。"
        },
        {
          framework: "vue",
          label: "Vue (模板驅動)",
          code: "<div v-if=\"isMorning\">早安</div>\n<div v-else>晚安</div>",
          description: "【特製語法】Vue 創造了 v-if 這種自定義屬性。它的標籤感更強，對於從傳統 HTML/CSS 轉過來的人來說，這非常直覺。"
        }
      ]
    }
  },
  {
    id: "3",
    title: "Lesson 3: 建構 - 如何搭建您的第一個 React 專案",
    description: "工欲善其事，必先利其器。這節課我們將使用 Vite 建立專案，並深入認識 Vite 幫我們準備好的資料夾結構。",
    prevLesson: "Lesson 2: React 哲學",
    nextLesson: "Lesson 4: 基礎 - JSX 與元件的寫作藝術",
    duration: "20 分鐘",
    type: "環境建置",
    level: "初階",
    concept: [
      {
        title: "1. 為什麼用 Vite？（告別手動時代）",
        description: "在開始寫第一行 React 之前，我們需要先蓋好房子的「支架」。",
        bullets: [
          "自動化：一秒生成標準資料夾，免去手動建檔與連結的麻煩。",
          "極速：存檔瞬間畫面就變，不再需要手動按 F5 重新整理。",
          "現代化：只給你最需要的零件，保持專案輕巧不肥大。"
        ],
        checkPoints: [
          { title: "Vite 速度", code: "300ms (極速)" },
          { title: "手動搬磚", code: "30min+ (緩慢)" }
        ]
      },
      {
        title: "2. 動手實作：一鍵建立您的專案",
        description: "現在就跟著指令，召喚您的建築機器人吧：",
        code: "npm create vite@latest my-app -- --template react",
        commandBreakdown: [
          { token: "npm create vite", title: "召喚機器人", description: "抓取最新的專案範本。" },
          { token: "my-app", title: "資料夾名稱", description: "您的專案名字。" },
          { token: "--template react", title: "指定設計圖", description: "指定要 React 的結構。" }
        ],
        steps: [
          { title: "進入工地", description: "cd my-app", command: "cd my-app" },
          { title: "裝備工具", description: "npm install", command: "npm install" },
          { title: "發動機器", description: "npm run dev", command: "npm run dev" }
        ]
      },
      {
        title: "3. 專案地圖：資料夾裡裝了什麼？",
        description: "打開 VS Code 後，你會看到一堆檔案。別擔心，這裡有你的「專案指南針」：",
        bullets: [
          "src/：專案的核心心臟。你的所有程式碼（.tsx, .css）都會住在這裡。",
          "src/App.tsx / App.css：這是你的第一個組件與外衣。網頁的主體就是從這裡動工。",
          "index.html：應用程式的基地。React 會把所有寫在 src 裡的邏輯，最終塞進這個 HTML 的 div 之中。",
          "main.tsx：專案的點火裝置。它負責將 React 代碼掛載到 HTML 上。",
          "package.json：專案的「菜單清單」。紀錄了工具（依賴）以及啟動方式。",
          "node_modules/：這是超大工具箱。絕對不要手動進去修改它。"
        ]
      }
    ]
  },
  {
    id: "4",
    title: "Lesson 4: 啟動 - React 基本語法與元件入門",
    description: "地基打好後，現在正式點火啟動！這單元是您進入 React 程式開發的第一站，我們將學習如何用元件思考並寫下第一行 JSX。",
    prevLesson: "Lesson 3: 專案建立",
    nextLesson: "Lesson 5: 互動 - useState 與「畫面的開關」",
    duration: "25 分鐘",
    type: "核心觀念",
    level: "初階",
    concept: [
      {
        title: "1. 元件 (Components)：網頁的組合積木",
        description: "在 React 裡，所有的畫面都是由「元件」拼成的。一個元件本質上就是一個傳回 HTML 的 JavaScript 函式。",
        bullets: [
          "規則一：函式名稱的第一個字母必須是「大寫」（例如 Welcome）。",
          "規則二：它必須傳回 (return) 一段看起來像 HTML 的東西（JSX）。",
          "優點：你可以像玩樂高一樣，把導覽列、按鈕、側選單分別寫好，再拼在一起。"
        ],
        code: "function Welcome() {\n  return <h1>哈囉！這是我的第一個元件</h1>;\n}"
      },
      {
        title: "2. JSX：給 HTML 注入 JavaScript 大腦",
        description: "JSX 讓我們能在 JavaScript 裡直接寫 HTML 標籤。它是 React 最強大的語法特色。",
        bullets: [
          "動態顯示：你可以在標籤內用 { } 包住任何變數（例如：<h1>{userName}</h1>）。",
          "邏輯控制：你可以直接在 JSX 裡根據條件顯示不同的內容。",
          "自動防護：React 會自動幫你過濾掉危險字串，防止 XSS 攻擊。"
        ],
        code: "const user = '小明';\nreturn (\n  <div>\n    <h1>你好, {user}!</h1>\n    <p>今天也是寫程式的好日子。</p>\n  </div>\n);"
      },
      {
        title: "3. 關鍵差異：Vue vs React 組件",
        description: "如果您熟悉 Vue，這裡有一個簡單的直覺對比：",
        bullets: [
          "Vue (SFC)：使用 .vue 檔案，將 Template (HTML)、Script (JS)、Style (CSS) 明確分開。",
          "React (JSX)：使用 .jsx/tsx 檔案，主張「一切皆為 JavaScript」。HTML 就是 JS 的一部分。",
          "核心思維：Vue 像是寫「加強版的 HTML」，React 像是寫「能產出 HTML 的 JavaScript」。"
        ]
      },
      {
        title: "4. JSX 的屬性規則 (對比 Vue)",
        description: "在 JSX 寫屬性時，有幾個跟純 HTML 不同的小地方：",
        bullets: [
          "class 變成了 className：因為 class 是 JS 的保留字。",
          "for 變成了 htmlFor：用於 label 標籤（例如：<label htmlFor=\"user\">）。",
          "v-html 變成了 dangerouslySetInnerHTML：React 故意取一個很長的名字，提醒你這有安全性風險。格式為：<div dangerouslySetInnerHTML={{ __html: myHtml }} />。",
          "style 變成物件：React 的 style 必須傳入一個物件，且要用小駝峰命名。例如 style={{ color: 'red' }}。",
          "單標籤必須閉合：在 HTML 裡 <img> 可以不寫結尾，但在 JSX 裡必須寫成 <img /> 或 <img></img>。"
        ],
        code: "// 特殊屬性範例\n<label htmlFor=\"email\">電子信箱：</label>\n<input id=\"email\" className=\"form-input\" />\n\n// v-html 的 React 版\n<div dangerouslySetInnerHTML={{ __html: '<strong>危險內容</strong>' }} />"
      }
    ],
    comparison: {
      title: "語法對照：Vue Template vs React JSX",
      description: "在 Vue 裡您寫 HTML，在 React 裡您寫產出 HTML 的 JavaScript。",
      examples: [
        {
          framework: "vue",
          label: "Vue SFC",
          description: "使用 template 標籤分離 HTML，動態資料用 {{ }}。",
          code: "<template>\n  <div class=\"card\">\n    <h1>{{ title }}</h1>\n  </div>\n</template>\n\n<script setup>\nconst title = 'Hello Vue'\n</script>"
        },
        {
          framework: "react",
          label: "React JSX",
          description: "使用 className 代替 class，整段 HTML 都是可回傳的 JS 物件。",
          code: "function App() {\n  const title = 'Hello React';\n  return (\n    <div className=\"card\">\n      <h1>{title}</h1>\n    </div>\n  );\n}"
        }
      ]
    },
    playground: {
      initialCode: `function TitleCard() {
  const name = "React 學習者";
  return (
    <div className="p-8 bg-white rounded-3xl border-2 border-slate-100 shadow-xl max-w-sm">
      <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2">課程實踐</div>
      <h2 className="text-2xl font-black text-slate-800 mb-4">哈囉, {name}！</h2>
      <p className="text-slate-500 text-sm font-medium">這是你的第一個 JSX。試著修改標題文字看看！</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="p-10 bg-slate-50 min-h-[300px] flex items-center justify-center">
      <TitleCard />
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "5",
    title: "Lesson 5: 狀態 - useState 與「畫面的開關」",
    description: "在 Vue 裡您用 ref()，在 React 我們用 useState。它是告訴 React「資料變了，請重新畫圖」的唯一訊號燈。",
    prevLesson: "Lesson 4: JSX 與元件基礎",
    nextLesson: "Lesson 6: 通訊 - Props 與組件間的包裹傳遞",
    duration: "25 分鐘",
    type: "狀態管理",
    level: "初階",
    concept: [
      {
        title: "1. 為什麼不能用普通變數？",
        description: "普通的 JS 變數變更時，React 是「感覺不到」的。useState 會傳回一個具有「通知功能」的變數。",
        bullets: [
          "Vue 對照：這就像 Vue 的 ref()，但 React 需要你主動呼叫一個 setter 函式。",
          "觸發更新：當你呼叫 setCount 時，React 會把整個組件函式「再執行一次」，產出新的畫面。",
          "記憶功能：即使組件函式重新跑，useState 也能幫你抓牢目前的數值不被重置。"
        ]
      },
      {
        title: "2. 解構語法：[數據, 設定函式]",
        description: "useState 的回傳值是一個固定格式的陣列。我們通常用「解構」的方式把兩者取出來：",
        code: "const [count, setCount] = useState(0);\n\n// count 是目前的值 (Vue 的 count.value)\n// setCount 是修改它的唯一管道 (Vue 的 count.value = ...)"
      }
    ],
    comparison: {
      title: "狀態對照：Vue ref() vs React useState",
      description: "雖然概念相同，但 React 的更新是「函式重新執行」，這點非常不同。",
      examples: [
        {
          framework: "vue",
          label: "Vue ref",
          description: "直接修改 .value，Vue 會追蹤依賴並只更新變動的 DOM。",
          code: "const count = ref(0);\nconst add = () => count.value++;"
        },
        {
          framework: "react",
          label: "React useState",
          description: "必須呼叫 Setter，這會觸發整份組件函式重新執行一次。",
          code: "const [count, setCount] = useState(0);\nconst add = () => setCount(count + 1);"
        }
      ]
    },
    playground: {
      initialCode: `import { useState } from 'react';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-10 flex flex-col items-center gap-6">
      <div className="text-6xl font-black text-slate-900">{count}</div>
      <button 
        onClick={() => setCount(count + 1)}
        className="px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg active:scale-95 transition-all"
      >
        增加次數
      </button>
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "6",
    title: "Lesson 6: 通訊 - Props 與組件間的「包裹傳遞」",
    description: "學習讓元件之間對話。父母元件可以把資料包裝好，傳遞給小孩元件使用，實現組件的高度重複利用性。",
    prevLesson: "Lesson 5: useState 狀態",
    nextLesson: "Lesson 7: 循環 - 渲染列表與 Key 的秘密",
    duration: "20 分鐘",
    type: "元件架構",
    level: "初階",
    concept: [
      {
        title: "1. Props：父組件寄出的包裹",
        description: "Props 就像是父組件寄給子組件的包裹。內裝唯讀資料，子組件只能讀取，不能自行拆改。",
        bullets: [
          "唯讀性：Props 是不可變的。如果你想改它，必須去改父組件傳下來的來源資料。",
          "單向傳遞：資料永遠是從上面（父）傳到下面（子），這讓 Debug 變得非常容易。",
          "核心觀念：Data Flows Down (資料向下流動)。"
        ]
      },
      {
        title: "2. 回呼函式：子組件對父組件的「回報」",
        description: "如果子組件想要改父組件的東西怎麼辦？父組件可以傳一個「功能按鈕」（函式）給子組件。",
        bullets: [
          "Vue 對照：這就是 Vue 的自定義事件與 emit()，但在 React 裡就是傳一個普通的 Props 函式。",
          "觸發邏輯：子組件點擊時，點的其實是父組件「寄放在這裡」的開關。",
          "雙向溝通：資料向下，行為（函式）向上。"
        ],
        code: "// 父組件傳入：\n<Child onAdd={() => setCount(count + 1)} />\n\n// 子組件呼叫：\n<button onClick={props.onAdd}>加 1</button>"
      }
    ],
    comparison: {
      title: "通訊對照：Vue vs React 組件通信",
      description: "兩者都是單向資料流，但 React 不使用自定義事件（emit），而是直接傳遞函式。",
      examples: [
        {
          framework: "vue",
          label: "Vue Props & Emit",
          description: "使用 defineProps 接收資料，defineEmits 發送事件。",
          code: "// 子組件\nconst emit = defineEmits(['add']);\n<button @click=\"emit('add')\">+</button>"
        },
        {
          framework: "react",
          label: "React Props (Function)",
          description: "直接把函式當成 Prop 傳進去，子組件直接執行它。",
          code: "// 子組件\nfunction Child({ onAdd }) {\n  return <button onClick={onAdd}>+</button>\n}"
        }
      ]
    },
    playground: {
      initialCode: `function Child({ count, onAdd, onMinus }) {
  return (
    <div className="p-6 bg-white border-2 border-dashed border-slate-200 rounded-3xl text-center space-y-4">
      <div className="text-xs font-black text-slate-400 uppercase tracking-widest">子元件 (Child)</div>
      <div className="text-4xl font-black text-blue-600">{count}</div>
      <div className="flex gap-2 justify-center">
        <button 
          onClick={onMinus}
          className="w-12 h-12 flex items-center justify-center bg-slate-100 rounded-xl font-bold hover:bg-slate-200 active:scale-90 transition-all"
        >
          -
        </button>
        <button 
          onClick={onAdd}
          className="w-12 h-12 flex items-center justify-center bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 active:scale-90 transition-all shadow-lg shadow-blue-200"
        >
          +
        </button>
      </div>
      <p className="text-[10px] text-slate-400">我這裡沒有 State，我只是執行父元件傳來的任務</p>
    </div>
  );
}

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8 space-y-6 max-w-sm mx-auto bg-slate-50 rounded-[2.5rem] border border-slate-100">
      <div className="text-center">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">父元件 (Parent)</h3>
        <p className="text-xs text-slate-500 font-medium">State 存放在這裡</p>
      </div>
      
      <Child 
        count={count} 
        onAdd={() => setCount(count + 1)} 
        onMinus={() => setCount(count - 1)} 
      />
      
      <div className="pt-4 border-t border-slate-200/60 flex justify-between items-center text-[10px] font-bold text-slate-400 px-2">
        <span>同步狀態驗證</span>
        <span className="bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full">{count}</span>
      </div>
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "7",
    title: "Lesson 7: 循環 - 渲染列表與 Key 的秘密",
    description: "在 Vue 你用 v-for，在 React 我們用 JavaScript 的 .map()。學會如何高效地顯示一整串數據。",
    prevLesson: "Lesson 6: Props 傳遞",
    nextLesson: "Lesson 8: 參照 - useRef 與表單處理",
    duration: "20 分鐘",
    type: "核心語法",
    level: "初階",
    concept: [
      {
        title: "1. 列表渲染：用 .map() 代替 v-for",
        description: "在 React 中，我們不使用特殊指令，而是直接使用 JS 原生的陣列方法來跑迴圈。",
        bullets: [
          "轉換：.map() 會把每一筆資料「轉換」成一個 JSX 元素。",
          "自動收集：React 會自動幫你把 map 跑出來的陣列渲染到畫面上。",
          "純粹 JS：這意味著你可以在 map 裡用任何判斷式或邏輯。"
        ],
        code: "const fruits = ['蘋果', '香蕉'];\nreturn fruits.map(item => <li>{item}</li>);"
      },
      {
        title: "2. Key 的重要性：這不是可選的",
        description: "當你顯示列表時，React 要求每個元素都要有一個唯一的 ID，也就是「Key」。",
        bullets: [
          "身份證：Key 就像是元件的身份證。當資料變動時，React 靠 Key 來決定要「重新渲染」還是「直接搬移」。",
          "效能關鍵：有了 Key，React 就不需要重畫整張表，只需要更新變動的那一項。",
          "不可重複：在同一層清單中，Key 絕對不能重複。"
        ]
      }
    ],
    comparison: {
      title: "清單對照：Vue v-for vs React .map()",
      description: "React 不使用指令，而是回到純粹的 JavaScript 運算。",
      examples: [
        {
          framework: "vue",
          label: "Vue v-for",
          description: "使用 v-for 語法，由 Vue 框架負責跑迴圈。",
          code: "<li v-for=\"item in items\" :key=\"item.id\">{{ item.name }}</li>"
        },
        {
          framework: "react",
          label: "React .map()",
          description: "用 JS 陣列方法將物件「映射」成 JSX 元素。",
          code: "{items.map(item => (\n  <li key={item.id}>{item.name}</li>\n))}"
        }
      ]
    },
    playground: {
      initialCode: `export default function App() {
  const tasks = [
    { id: 1, text: '學習 JSX', status: 'done' },
    { id: 2, text: '掌握 Props', status: 'todo' },
    { id: 3, text: '理解 State', status: 'todo' }
  ];

  return (
    <div className="p-8">
      <h3 className="text-xl font-black mb-6">我的任務清單</h3>
      <div className="space-y-2">
        {tasks.map(task => (
          <div key={task.id} className="flex items-center justify-between p-4 bg-white border rounded-2xl">
            <span className={task.status === 'done' ? 'line-through text-slate-400' : 'font-bold'}>
              {task.text}
            </span>
            <div className={\`px-3 py-1 rounded-full text-[10px] font-black uppercase \${
              task.status === 'done' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'
            }\`}>
              {task.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "8",
    title: "Lesson 8: 參照 - useRef 與表單處理",
    description: "學會如何直接抓取 DOM 元素，以及如何處理受控與非受控元件。這在處理 Input 或第三方外掛時至關重要。",
    prevLesson: "Lesson 7: 列表渲染",
    nextLesson: "Lesson 9: 副作用 - useEffect 與 API 串接",
    duration: "25 分鐘",
    type: "進階勾子",
    level: "中階",
    concept: [
      {
        title: "1. useRef：不重繪的私人物件",
        description: "useRef 有兩個主要用途：抓 DOM 元素，或者存一個變更時不觸發畫面更新的變數。",
        bullets: [
          "存取 DOM：就像 Vue 的 ref，讓你可以直接對 HTML 標籤做事情（例如設 Focus）。",
          "靜態儲存：如果你改變 useRef 的值，畫面「不會」重新渲染。適合存 Timer ID 等。",
          "持久性：它的值在整個元件生命週期中都會保持不變。"
        ],
        code: "const inputRef = useRef();\n// 讓輸入框聚焦\ninputRef.current.focus();"
      },
      {
        title: "2. 受控元件：資料的完全掌控",
        description: "大部分在 React 裡的表單都是「受控」的。意思是你必須用 State 來同步 Input 的值。",
        code: "<input value={text} onChange={(e) => setText(e.target.value)} />"
      }
    ],
    comparison: {
      title: "引用對照：Vue ref (DOM) vs React useRef",
      description: "抓取 DOM 原生元素的方式非常相似，關鍵在於掛載時機。",
      examples: [
        {
          framework: "vue",
          label: "Vue ref",
          description: "定義 const myRef = ref(null) 並在標籤寫 ref=\"myRef\"。",
          code: "<input ref=\"myInput\" />\nconst myInput = ref(null);"
        },
        {
          framework: "react",
          label: "React useRef",
          description: "定義 const myRef = useRef(null) 並在標籤寫 ref={myRef}。",
          code: "const myInput = useRef(null);\n<input ref={myInput} />"
        }
      ]
    },
    playground: {
      initialCode: `import { useState, useRef } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const inputRef = useRef();

  const handleClear = () => {
    setName('');
    inputRef.current.focus();
  };

  return (
    <div className="p-10 space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-black uppercase text-slate-400">您的姓名</label>
        <input 
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="請輸入姓名"
          className="w-full p-4 rounded-2xl border-2 border-slate-100 focus:border-blue-500 outline-none transition-all"
        />
      </div>
      
      <div className="flex gap-4">
        <button onClick={() => alert('你好 ' + name)} className="flex-1 bg-blue-600 text-white p-4 rounded-2xl font-bold">送出</button>
        <button onClick={handleClear} className="px-6 bg-slate-100 text-slate-500 p-4 rounded-2xl font-bold">重填</button>
      </div>

      <p className="text-sm text-slate-400 italic">目前輸入：{name}</p>
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "9",
    title: "Lesson 9: 副作用 - useEffect 與「現實世界的連結」",
    description: "處理元件生命中的各種事件。例如：網頁剛載入時去網路抓資料，或者資料變動時做個紀錄。",
    prevLesson: "Lesson 8: useRef 參照",
    nextLesson: "Lesson 10: 導覽 - React Router 與單頁應用",
    duration: "30 分鐘",
    type: "生命週期",
    level: "中階",
    concept: [
      {
        title: "1. 什麼是 useEffect (副作用)？",
        description: "在 React 裡，渲染必須是乾淨的。但有些事情會影響外面，比如「抓取 API 資料」或「更改網頁標題」。",
        bullets: [
          "同步功能：它讓你的元件能與外界（API、LocalStorage）同步。",
          "自動執行：React 會確保它在畫面渲染完成後才跑，避免干擾顯示速度。",
          "清理機制：它還能讓你處理「清理」動作（像是清除 Timer），防止記憶體洩漏。"
        ]
      },
      {
        title: "2. 依賴陣列 [ ] 的魔法",
        description: "這是控制 Effect 何時執行的開關。",
        bullets: [
          "無陣列：每次重新渲染都跑（慎用！）。",
          "空陣列 []：只在第一次掛載時跑一次（最常用於抓資料）。",
          "有變數 [count]：只有當 count 改變時才跑。"
        ]
      }
    ],
    comparison: {
      title: "生命週期對照：Vue 監聽 vs React 副作用",
      description: "React 將所有副作用統合成一個 Hook，這是對 Vue 開發者來說最大的邏輯轉變。",
      examples: [
        {
          framework: "vue",
          label: "Vue 生命週期",
          description: "掛載（onMounted）與監聽（watch）是分開的兩個 API。",
          code: "onMounted(() => { ... });\nwatch(count, () => { ... });"
        },
        {
          framework: "react",
          label: "React useEffect",
          description: "一個 useEffect 就能搞定。依賴陣列 [] = 掛載，[count] = 監聽。",
          code: "useEffect(() => { ... }, []);\nuseEffect(() => { ... }, [count]);"
        }
      ]
    },
    playground: {
      initialCode: `import { useState, useEffect } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模擬網路請求
    setTimeout(() => {
      setData({ title: 'React 學習冒險', desc: '這是一段來自 API 的資料。' });
      setLoading(false);
    }, 2000);
  }, []); // 僅執行一次

  return (
    <div className="p-10 text-center">
      {loading ? (
        <div className="animate-pulse text-slate-400">正在連線至伺服器...</div>
      ) : (
        <div className="p-8 bg-blue-50 rounded-3xl border-2 border-blue-100">
          <h1 className="text-2xl font-black text-blue-700 mb-2">{data.title}</h1>
          <p className="text-blue-500 font-medium">{data.desc}</p>
        </div>
      )}
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "10",
    title: "Lesson 10: 導覽 - React Router 與單頁應用 (SPA)",
    description: "讓你的 Web App 擁有多個頁面。學習如何在不重新整理瀏覽器的情況下，實現極速的頁面跳轉。",
    prevLesson: "Lesson 9: useEffect 副作用",
    nextLesson: "Lesson 11: 管理 - Context API 全域廣播",
    duration: "40 分鐘",
    type: "路由機制",
    level: "中階",
    concept: [
      {
        title: "1. 什麼是 SPA？（秒開的秘密）",
        description: "SPA 代表 Single Page Application。換頁時網際網路並不會重新下載整份 HTML。感覺就像 App 一樣流暢。",
        bullets: [
          "局部更新：只更換中間的內容，導覽列與標籤列完全不動。",
          "前端路由：由 JS 決定網址改變時要顯示哪個組件。",
          "閃電速度：因為不用完整載入，所以使用者體驗極佳。"
        ]
      },
      {
        title: "2. Link 與 Route 配對",
        description: "在 React Router 中，Link 負責改變網址，而 Route 負責監聽網址路由並決定渲染誰。",
        code: "<Link to=\"/about\">關於</Link>\n<Route path=\"/about\" element={<About />} />"
      }
    ],
    comparison: {
      title: "路由對照：Vue Router vs React Router",
      description: "兩者概念極其接近，都是宣告式路由（Declarative Routing）。",
      examples: [
        {
          framework: "vue",
          label: "Vue 路由",
          description: "使用 router-link 跳轉，router-view 顯示內容。",
          code: "<router-link to=\"/home\">首頁</router-link>\n<router-view />"
        },
        {
          framework: "react",
          label: "React 路由",
          description: "使用 Link 跳轉，Route 決定在哪裡顯示哪個元件。",
          code: "<Link to=\"/home\">首頁</Link>\n<Route path=\"/home\" element={<Home />} />"
        }
      ]
    },
    playground: {
      initialCode: `import { useState } from 'react';

function Home() { return <div className="p-8 bg-blue-50 text-blue-700 rounded-3xl">這裡是首頁</div>; }
function About() { return <div className="p-8 bg-amber-50 text-amber-700 rounded-3xl">關於我們</div>; }

export default function App() {
  const [route, setRoute] = useState('home');

  return (
    <div className="p-10">
       <div className="flex gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl w-fit">
          <button onClick={() => setRoute('home')} className={\`px-6 py-2 rounded-xl text-xs font-black \${route === 'home' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}\`}>首頁</button>
          <button onClick={() => setRoute('about')} className={\`px-6 py-2 rounded-xl text-xs font-black \${route === 'about' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}\`}>關於</button>
       </div>
       <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          {route === 'home' ? <Home /> : <About />}
       </div>
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "11",
    title: "Lesson 11: 管理 - Context API 與全域廣播系統",
    description: "擺脫層層傳遞的麻煩。學習如何建立一個全區都聽得到的廣播，讓任何角落的元件都能直接抓到資料。",
    prevLesson: "Lesson 10: React Router",
    nextLesson: "Lesson 12: 效能 - memo, useMemo 與 useCallback",
    duration: "45 分鐘",
    type: "狀態管理",
    level: "進階",
    concept: [
      {
        title: "1. 什麼是 Prop Drilling？",
        description: "層層傳遞資料非常累人。Context API 讓你在最上層裝一個「大喇叭」。",
        bullets: [
          "廣播站 (Provider)：在最外層定義資料並發送。",
          "耳機 (useContext)：任何內層元件只要帶上耳機就能直接聽到資料。",
          "場景：非常適合存放「使用者登入資訊」、「深淺色主題」等全域資料。"
        ]
      }
    ],
    comparison: {
      title: "全域對照：Vue 提供/注入 vs React 上下文",
      description: "這是在不使用 Pinia/Redux 的情況下，最標準的跨層級傳遞方式。",
      examples: [
        {
          framework: "vue",
          label: "Vue 注入",
          description: "父組件 provide，下方任何子組件 inject。",
          code: "provide('theme', 'dark');\nconst theme = inject('theme');"
        },
        {
          framework: "react",
          label: "React Context",
          description: "使用 Provider 包裝，子組件用 useContext 讀取。",
          code: "<Theme.Provider value=\"dark\">\nconst theme = useContext(Theme);"
        }
      ]
    },
    playground: {
      initialCode: `import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function Badge() {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className={\`p-10 rounded-3xl transition-all duration-500 \${isDark ? 'bg-slate-900 text-white shadow-2xl' : 'bg-white text-slate-900 border'}\`}>
      <h2 className="text-xl font-black mb-1">{isDark ? '🌙 深色模式' : '☀️ 亮色模式'}</h2>
      <p className="text-xs opacity-60 font-medium text-blue-400">目前正透過 Context 感應模式...</p>
    </div>
  );
}

export default function App() {
  const [isDark, setIsDark] = useState(false);
  return (
    <ThemeContext.Provider value={{ isDark }}>
      <div className="p-10 flex flex-col items-center gap-10">
        <Badge />
        <button 
          onClick={() => setIsDark(!isDark)} 
          className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black active:scale-95 transition-all shadow-xl"
        >
          切換全域模式
        </button>
      </div>
    </ThemeContext.Provider>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "12",
    title: "Lesson 12: 效能 - memo, useMemo 與 useCallback",
    description: "學會 React 的效能三兄弟。在開發超大型應用程式時，你必須學會如何精準地節省運算資源。",
    prevLesson: "Lesson 11: Context API",
    nextLesson: "Lesson 13: 邏輯 - 自定義 Hooks (Custom Hooks)",
    duration: "40 分鐘",
    type: "效能優化",
    level: "進階",
    concept: [
      {
        title: "1. 效能優化三兄弟：何時該出手？",
        description: "React 預設會重新渲染整個元件數。這三者是用來告訴 React：「如果資料沒變，請不要浪費體力重畫。」",
        bullets: [
          "memo：組件級快取。只要傳進去的 Props 沒變，組件就不會重新跑一次邏輯。",
          "useMemo：計算結果快取。像 Vue 的 computed，適合用於複雜的資料過濾或數學運算。",
          "useCallback：函式快取。避免每次渲染都產生新的函式記憶體位置。"
        ]
      }
    ],
    comparison: {
      title: "效能對照：Vue 計算屬性 vs React 快取記憶",
      description: "React 的優化是手動的，這點與 Vue 的自動追蹤非常不同。",
      examples: [
        {
          framework: "vue",
          label: "Vue 計算屬性",
          description: "自動追蹤依賴，只要依賴變了就會自動重新計算並快取。",
          code: "const double = computed(() => count.value * 2);"
        },
        {
          framework: "react",
          label: "React useMemo",
          description: "必須手動指定依賴陣列，否則無法正確快取結果。",
          code: "const double = useMemo(() => count * 2, [count]);"
        }
      ]
    },
    playground: {
      initialCode: `import { useState, useMemo } from 'react';

export default function App() {
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState('');

  // 只有當 search 變動時，才會重新計算「超級沉重」的列表
  const result = useMemo(() => {
    console.log('正在進行沉重的過濾運算...');
    return "您的搜尋內容長度是 " + search.length;
  }, [search]);

  return (
    <div className="p-10 space-y-6">
      <div className="p-6 bg-slate-50 rounded-2xl">
        <div className="text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">不相干的計數器</div>
        <div className="text-2xl font-black mb-4">{count}</div>
        <button onClick={() => setCount(count + 1)} className="px-4 py-2 bg-white border rounded-xl font-bold font-sm">加一 (不會觸發過濾運算)</button>
      </div>

      <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-100">
        <div className="text-xs font-black text-blue-400 mb-2 uppercase tracking-widest">搜尋處理</div>
        <input 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          className="w-full p-4 rounded-xl border-none outline-none mb-4"
          placeholder="輸入文字測試 useMemo..."
        />
        <div className="text-blue-600 font-bold">{result}</div>
      </div>
    </div>
  );
}`,
      solutionCode: ""
    }
  },
  {
    id: "13",
    title: "Lesson 13: 邏輯 - 自定義 Hooks (Custom Hooks)",
    description: "將複用的邏輯封裝起來。學會自定義 Hook，代表你已經具備開發大型專業 React 應用的能力。",
    prevLesson: "Lesson 12: 效能優化",
    nextLesson: "恭喜完課！開始實戰專案吧",
    duration: "45 分鐘",
    type: "進階模式",
    level: "進階",
    concept: [
      {
        title: "1. 為什麼要自定義 Hook？",
        description: "命名必須以 use 開頭。它讓你可以把 useState 與 useEffect 的組合精華提取出來，讓多個不同元件共用一套「大腦」。",
        bullets: [
          "簡化程式碼：讓你的主元件只負責顯示畫面，邏輯都交給 Hook 處理。",
          "高度複用：例如「偵測視窗大小」、「抓取 API」、「讀取 LocalStorage」，寫一次就能到處用。",
          "Vue 的 Composables：這就是 React 版的 Composable 函式。"
        ],
        code: "function useCounter() {\n  const [count, setCount] = useState(0);\n  const add = () => setCount(c => c + 1);\n  return { count, add };\n}"
      }
    ],
    comparison: {
      title: "邏輯對照：Vue 組合式函式 vs React 自定義 Hook",
      description: "這是目前前端開發的主流：將邏輯與 UI 徹底分離。",
      examples: [
        {
          framework: "vue",
          label: "Vue 組合式函式",
          description: "使用 useXXX 命名，回傳響應式狀態與方法。",
          code: "export function useCounter() {\n  const count = ref(0);\n  return { count };\n}"
        },
        {
          framework: "react",
          label: "React 自定義 Hook",
          description: "同樣習慣 useXXX 命名，回傳狀態與更新方法。",
          code: "export function useCounter() {\n  const [count, setCount] = useState(0);\n  return { count };\n}"
        }
      ]
    },
    playground: {
      initialCode: `import { useState, useEffect } from 'react';

// 自定義 Hook：偵測滑鼠位置
function useMousePosition() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return pos;
}

export default function App() {
  const { x, y } = useMousePosition();

  return (
    <div className="p-10 flex flex-col items-center justify-center min-h-[300px]">
      <div className="relative w-64 h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] flex items-center justify-center overflow-hidden">
        <div className="text-center z-10">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">座標傳感器</div>
          <div className="text-xl font-mono font-black text-slate-700">X: {x}</div>
          <div className="text-xl font-mono font-black text-slate-700">Y: {y}</div>
        </div>
        {/* 跟隨滑鼠的動態小球 */}
        <div 
          className="absolute w-8 h-8 bg-blue-500 rounded-full blur-xl opacity-20 transition-all duration-300"
          style={{ transform: \`translate(\${x/20}px, \${y/20}px)\` }}
        />
      </div>
    </div>
  );
}`,
      solutionCode: ""
    }
  }
];
