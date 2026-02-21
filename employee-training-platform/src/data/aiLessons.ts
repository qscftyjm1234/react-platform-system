import { LessonContent } from "./reactLessons";

export const aiLessons: LessonContent[] = [
  {
    id: "ai-1",
    title: "Lesson 1: AI 隊友現身 - 生成式 AI 的本質與轉化",
    description: "在開始寫指令之前，我們先來理解：為什麼 AI 突然變得這麼聰明？它到底是個「回答機器」還是「生產引擎」？",
    prevLesson: "無（這是首篇單元）",
    nextLesson: "Lesson 2: 咒語工程的藝術 - 什麼是 Prompt 與如何寫好它",
    duration: "15 分鐘",
    type: "核心觀念",
    level: "初階",
    status: "current",
    concept: [
      {
        title: "1. 搜尋時代 vs. 生成時代",
        description: "過去我們遇到問題會去 Google 搜尋「現成的答案」。現在，AI 是根據你的需求「現場運算出答案」。這就像是從『翻閱字典』進化到『擁有一位隨身作家』。",
        bullets: [
          "搜尋：大海撈針，找別人寫好的東西。",
          "生成：按需定製，創造這世界上還不存在的程式碼或文字。"
        ]
      },
      {
        title: "2. 理解機率的魔法",
        description: "AI 本質上是「預測下一個字」的機率機器。雖然它很強大，但它並不像人類那樣真正『理解』邏輯。它是在海量的知識庫中，找出最合乎你語境的關聯性。",
        checkPoints: [
          { title: "AI 的運算", code: "Context + Probabilities = Output" }
        ]
      },
      {
        title: "3. 開發者的「外骨骼」",
        description: "不要把 AI 當成取代你的敵人，要把他當成你的「鋼鐵人外骨骼」。你依然是那個控制方向的大腦，而 AI 負責提供動力（快速產出代碼）與支撐（檢查錯誤）。"
      }
    ]
  },
  {
    id: "ai-2",
    title: "Lesson 2: 咒語工程的藝術 - 什麼是 Prompt 與如何寫好它",
    description: "本單元將深入解析「Prompt (提示詞/咒語)」的定義，並透過對照表教你如何下出神級指令。",
    prevLesson: "Lesson 1: AI 本質",
    nextLesson: "Lesson 3: 咒語書存放地 - 探索 .agent 與 System Rules",
    duration: "20 分鐘",
    type: "實戰技巧",
    level: "初階",
    concept: [
      {
        title: "1. 什麼是 Prompt？程式碼界的「遙控器」",
        description: "Prompt 就是你對 AI 下達的「對話式指令」。在程式語言中，你要寫特定的語法（如 if/else）電腦才會動；在 AI 時代，你用「白話文」就能驅動強大的計算能力。這就像是擁有一個萬能遙控器，按下正確的按鈕（Prompt），AI 就會為你產出結果。",
        bullets: [
          "定義：Prompt 是你給 AI 的任何輸入，包含問題、任務描述或範例。",
          "目標：減少模糊度。好的 Prompt 就像是給實習生的「精確 SOP 手冊」。"
        ]
      },
      {
        title: "2. 爛咒語 vs. 神咒語 (對照表)",
        description: "看看同樣的任務，指令的不同會如何大幅影響 AI 的輸出品質：",
        commandBreakdown: [
          { token: "爛咒語", title: "過於模糊", description: "『幫我寫一個登入頁面。』-> AI 會隨便生一個格式跟功能都不確定的頁面。" },
          { token: "神咒語", title: "精確定義", description: "『身為資深前端，請用 React 與 Vanilla CSS 寫一個登入組件。包含 Email 驗證、RWD 佈局，且背景色使用 #f9fafb。』" }
        ]
      },
      {
        title: "3. 黃金寫法公式：R-C-T-C",
        description: "不知道怎麼寫？直接套這個公式：",
        bullets: [
          "Role (角色)：設定 AI 背景（如：你是資深測試工程師）。",
          "Context (背景)：提供資訊（如：這是一個電商專案）。",
          "Task (任務)：明確目標（如：幫我寫這段 API 的單元測試）。",
          "Constraints (限制)：規定範圍（如：不要使用 external lib）。"
        ],
        code: "# 實戰範例：\n你是資深 React 教師(Role)，正在開發一個教學系統(Context)。請幫我寫一個顯示「課程進度」的元件(Task)，要求使用 TailwindCSS 並具有滑動動畫(Constraints)。"
      }
    ]
  },
  {
    id: "ai-3",
    title: "Lesson 3: 咒語書存放地 - 探索 .agent 與 System Rules",
    description: "寫好了 Prompt 該放哪？為什麼 AI 總是記得我們的專案規範？本單元解密專案中的「咒語檔案系統」。",
    prevLesson: "Lesson 2: 寫好 Prompt",
    nextLesson: "Lesson 4: 協作實務 - 讓 AI 幫你重構與除錯",
    duration: "25 分鐘",
    type: "專案深度整合",
    level: "中階",
    concept: [
      {
        title: "1. Prompt 放在哪裡？專案的「大腦皮層」",
        description: "如果每次問 AI 都要重複設定背景，那太累了。在我們的專案中，我們利用目錄來「持久化」Prompt。",
        bullets: [
          ".agent/rules.md：存放「全局規則」。AI 每次讀取專案都會參考這裡，知道我們愛用 TypeScript 而不是 JS。",
          ".agent/workflows/：存放「標準作業程序」。告訴 AI 特定任務（如 /create_course）該點哪個檔案、搬哪個目錄。"
        ]
      },
      {
        title: "2. 本機 System Prompt：隱形的指令",
        description: "除了專案檔案，你在 AI 工具（如 Cursor 或 ChatGPT）的設定中，可以設定一個「System Prompt」。它就像是隱藏在 AI 大腦深處的總綱領。",
        code: "// 範例：你在個人設定中寫下：\n// 『回覆時務必簡潔，程式碼範例必須包含註解，且使用繁體中文。』\n// 這樣你之後問問題就不需要再重複這些要求了。"
      },
      {
        title: "3. 怎麼找靈感？Prompt 社群平台",
        description: "不需要自己硬想！有很多地方可以找別人的咒語範例（Prompt Libraries）：",
        bullets: [
          "OpenAI Prompt Engineering Guide：官方出的教科書。",
          "PromptBase：各行各業的進階指令庫。",
          "專案內部的 .agent 目錄：參考我們先前寫好的 Workflow 文件。"
        ]
      }
    ]
  },
  {
    id: "ai-4",
    title: "Lesson 4: 協作實務 - 讓 AI 幫你重構與除錯",
    description: "學會了寫 Prompt 與存放位置，現在看 AI 如何實踐在你的代碼日常中。",
    prevLesson: "Lesson 3: 咒語存放",
    nextLesson: "Lesson 5: 終極進化 - AI 時代下的開發者新體感",
    duration: "25 分鐘",
    type: "代碼協作",
    level: "中階",
    concept: [
      {
        title: "1. 實戰重構範例",
        description: "如果你有一段寫得很醜、很久、沒人看得懂的程式碼，丟給 AI 並下達以下 Prompt：",
        code: "『請幫我重構這段程式碼。目標：1. 提升可讀性、2. 提取重複邏輯。請解釋你的優化重點。』",
        bullets: [
          "優點：AI 會快速產出 Clean Code 建議，你可以從中學習命名藝術。"
        ]
      },
      {
        title: "2. 讓 AI 寫單元測試 (教學範例)",
        description: "寫測試的 Prompt 範例：",
        code: "『這是一個處理購物車金額計算的函式。請幫我寫 Vitest 測試案例，包含「空購物車」、「負數金額」等邊界情況處理。』",
        bullets: [
          "價值：AI 能想到你沒想到的「負面測試」，讓程式碼更強健。"
        ]
      }
    ]
  },
  {
    id: "ai-5",
    title: "Lesson 5: 終極進化 - AI 時代下的開發者新體感",
    description: "總結：從「碼農」進化為「架構設計師」。",
    prevLesson: "Lesson 4: 實戰協作",
    nextLesson: "無（恭喜完成 AI 賦能之旅！）",
    duration: "15 分鐘",
    type: "趨勢思維",
    level: "進階",
    concept: [
      {
        title: "1. 未來的學習路徑",
        description: "AI 降低了語法門檻，但也提高了「架構思考」的要求。你的競爭力將來自於：",
        bullets: [
          "判讀力：一眼看出 AI 給的程式碼有沒有 Bug。",
          "架構力：設計大型系統中元件與資料流的關係。"
        ]
      },
      {
        title: "2. 保持好奇，大口吃 AI",
        description: "不要害怕新工具。AI 是最好的私人家教。遇到不懂的觀念，直接叫它用「簡單的例子」解釋給你聽。",
        checkPoints: [
          { title: "AI 賦能公式", code: "Your Idea + AI Execution = Unstoppable Speed" }
        ]
      }
    ]
  }
];
