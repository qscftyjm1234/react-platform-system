import { LessonContent } from "./reactLessons";

export const dockerLessons: LessonContent[] = [
  {
    id: "docker-1",
    title: "Lesson 1: 為什麼要用 Docker？（物流革命與標準化）",
    description: "在寫程式之前，我們先來解決那個困擾工程師數十年的惡夢：「為什麼在我電腦上是好的，去你那裡就壞了？」",
    prevLesson: "無（這是首篇單元）",
    nextLesson: "Lesson 2: 核心 - Image 與 Container 的廚房哲學",
    duration: "15 分鐘",
    type: "環境觀念",
    level: "初階",
    status: "current",
    concept: [
      {
        title: "1. 碼頭上的亂象 (Matrix of Pain)",
        description: "想像你是 19 世紀的商人，要運送絲綢、鋼琴、茶葉。每種東西形狀不同，搬上船要花幾小時，還可能被壓壞。程式開發也是如此：你的程式需要特定的 Node.js 版本、特定的資料庫、特定的 Linux 套件。",
        bullets: [
          "傳統惡夢：A 同事裝了 Node 18，B 同事裝了 Node 20，伺服器裝了 Node 14。結果同一個程式在三個地方跑出三種結果。",
          "解決方案：貨櫃 (Container)。不管裡面裝的是什麼，外面封裝成統一尺寸的鋼鐵箱子。只要碼頭（作業系統）有吊車（Docker），就能無障礙運作。"
        ]
      },
      {
        title: "2. 什麼是「環境一致性」？",
        description: "Docker 讓你把「你的程式」+「所需的作業系統零件」+「所需的軟體」全部打包在一起。這個包包被稱為「映像檔 (Image)」。",
        checkPoints: [
          { title: "環境封裝", code: "Code + Runtime + System Libs = Docker Image" }
        ]
      },
      {
        title: "3. Docker 的核心優勢",
        description: "為什麼全球工程師都愛用 Docker？因為它具備三大無可取代的好處：",
        bullets: [
          "輕量：不像虛擬機 (Virtual Machine) 要模擬一整台電腦。Docker 共用電腦核心，只帶走必要的零件，啟動只需一秒。",
          "秒速：存檔重啟就像開關燈一樣快。",
          "隔離：即使你在貨櫃裡把作業系統炸了，你外面的電腦（Windows/Mac）還是平安無事。"
        ]
      }
    ]
  },
  {
    id: "docker-2",
    title: "Lesson 2: 核心 - 映像檔 (Image) 與 容器 (Container) 的廚房哲學",
    description: "這是所有新手最容易搞混的地方。請務必記住這個「蓋廚房」的比喻。",
    prevLesson: "Lesson 1: 教學起源",
    nextLesson: "Lesson 3: 藍圖 - 如何寫出一份好的 Dockerfile",
    duration: "20 分鐘",
    type: "核心技術",
    level: "初階",
    status: "current",
    concept: [
      {
        title: "1. Image (映像檔)：成品廚房的「模具」",
        description: "映像檔是一個「唯讀」的檔案，它是靜態的。就像是一間「已經蓋好、設備齊全的示範廚房」。",
        bullets: [
          "它是範本：裡面包含 Node.js、Vite、React 的所有開機零件。",
          "它是靜態的：你不能直接在 Image 裡面修改東西。如果你想改，就必須重新「建置 (Build)」出一個新的 Image。"
        ],
        code: "// 看看我電腦裡有哪些「示範廚房」庫存\ndocker images"
      },
      {
        title: "2. Container (容器)：正式運作的「廚房實體」",
        description: "當你根據 Image「啟動」它，它就變成了一個正在動的 Container。這是一間「活著的廚房」，廚師（Vite）在裡面工作，爐火（伺服器）正在燃燒。",
        bullets: [
          "它是動態的：它可以被暫停、重啟、刪除。",
          "它是實例：你可以從同一個 Image 變出 10 個一模一樣的 Container。"
        ],
        code: "// 看看我有幾間廚房正在「開火執勤」\ndocker ps"
      },
      {
        title: "3. 重點筆記：映像檔 vs 容器",
        description: "Image = 安裝光碟 / 示範屋 (靜態)\nContainer = 已經裝好的電腦 / 正在住人的房子 (動態)",
        checkPoints: [
          { title: "Image 屬性", code: "Read-Only (唯讀)" },
          { title: "Container 屬性", code: "Writable Layer (可讀寫層)" }
        ]
      }
    ]
  },
  {
    id: "docker-3",
    title: "Lesson 3: 藍圖 - 解構 Dockerfile 的每一行指令",
    description: "Dockerfile 就是你的「食譜」。它描述了要如何從一個全空的空間，一步步裝修成你要的開發環境。",
    prevLesson: "Lesson 2: 廚房哲學",
    nextLesson: "Lesson 4: 指揮官 - Docker Compose 的管理藝術",
    duration: "25 分鐘",
    type: "環境建置",
    level: "初階",
    concept: [
      {
        title: "1. Dockerfile 的製作流程",
        description: "這就像是在跟我下指令：我想用 Node 20 版，我想把檔案放進去，我想要裝套件。",
        code: "# 1. 選擇基礎建材 (作業系統)\nFROM node:20-alpine\n\n# 2. 決定工作台位置\nWORKDIR /app\n\n# 3. 複製清單並安裝套件\nCOPY package.json ./\nRUN npm install\n\n# 4. 把剩下的食材(程式碼)都搬進去\nCOPY . .\n\n# 5. 通知廚師開火\nCMD [\"npm\", \"run\", \"dev\"]",
        commandBreakdown: [
          { token: "FROM", title: "基石", description: "決定你要用哪一家的 Node.js 版本。" },
          { token: "WORKDIR", title: "搬家", description: "進入容器後，預設要在哪個資料夾工作（類似 cd）。" },
          { token: "RUN", title: "裝潢", description: "建置 Image 時執行的動作，通常用來裝軟體。" },
          { token: "COPY", title: "進貨", description: "把本機電腦的檔案複製進容器裡面。" },
          { token: "CMD", title: "啟動", description: "容器跑起來後，第一件要執行的事。一間廚房只能有一個啟動指令。" }
        ]
      },
      {
        title: "2. 什麼是 .dockerignore？",
        description: "就像垃圾桶。有些重裝（如 node_modules）或秘密（如 .env）我們不希望塞進映像檔裡，這能讓你的 Image 變得又輕又快。",
        bullets: [
          "node_modules：我們在容器內會重新安裝 Linux 版本，不需從 Windows 複製過去。",
          ".git：版本控制紀錄通常太大，不需要塞進跑程式的環境。"
        ]
      }
    ]
  },
  {
    id: "docker-4",
    title: "Lesson 4: 指揮官 - Docker Compose 的生產線管理",
    description: "當你不想每次都打一長串 `docker run` 指令時，這就是你的自動化劇本。",
    prevLesson: "Lesson 3: Dockerfile 藍圖",
    nextLesson: "Lesson 5: 魔法門 - Volumes 虛擬掛載的真相",
    duration: "20 分鐘",
    type: "自動化",
    level: "中階",
    status: "current",
    concept: [
      {
        title: "1. 為什麼要用 Compose？",
        description: "手動啟動一個容器像是在家自己煎蛋。使用 Docker Compose 則像是請了一位「全自動經理」。你只要寫一份 `docker-compose.yml`，他就會自動幫你開門、接電、連線。",
        steps: [
          { title: "啟動生產線", description: "把計畫書內的所有服務都開起來。", command: "docker compose up -d" },
          { title: "更新重建", description: "如果你改了清單，強制他重蓋一次。", command: "docker compose up -d --build" },
          { title: "全體下班", description: "關掉所有服務並收起來。", command: "docker compose down" }
        ]
      },
      {
        title: "2. 解構 docker-compose.yml",
        description: "這是一份配置書，讓我們看看裡面最重要的關鍵字：",
        bullets: [
          "services：你要開這間工廠裡的哪些部門（例如 front-end, database）。",
          "ports：開後門。'5173:5173' 代表「我本機電腦」敲 5173 門，可以傳到「容器內部」的 5173 房。",
          "volumes：時空傳送門（下一單元重點）。讓你在外面改 code，裡面即時生效。"
        ]
      }
    ]
  },
  {
    id: "docker-5",
    title: "Lesson 5: 魔法門 - Volumes 與 Hot Reload 的同步真相",
    description: "為什麼我在 Windows 存檔，Docker 容器內的網頁會自動更新？這不是魔法，這是「儲存空間掛載」。",
    prevLesson: "Lesson 4: Compose 管理",
    nextLesson: "Lesson 6: 協議 - 在 Docker 中執行 npm 指令",
    duration: "15 分鐘",
    type: "運作機制",
    level: "中階",
    status: "current",
    concept: [
      {
        title: "1. Volume 是什麼？（時空傳送門）",
        description: "預設情況下，容器裡面是一個「孤島」。你在外面改 code，裡面是感覺不到的。Volume 就像是在你的 Windows 資料夾與容器資料夾之間開了一個「傳送門」。",
        bullets: [
          "鏡像映射：外面的檔案變動，裡面的檔案會「瞬間同步」。",
          "Hot Reload：因為檔案變了，容器內的 Vite 就能察覺並重載網頁。",
          "持久化：即使容器被毀滅了，你的程式碼還是好端端地躺在你的 Windows 硬碟裡。"
        ]
      },
      {
        title: "2. node_modules 的特殊處理",
        description: "你會在計畫書看到一行奇怪的 `node_modules` 掛載。那是為了避免容器去讀取你本機的 Windows 版套件（通常不相容），並保護容器內辛苦安裝好的 Linux 套件不被蓋掉。",
        checkPoints: [
          { title: "Volume 同步", code: ".:/app (同步目前資料夾)" },
          { title: "匿名 Volume", code: "/app/node_modules (保護內部套件)" }
        ]
      }
    ]
  },
  {
    id: "docker-6",
    title: "Lesson 6: 協議 - 如何在 Docker 容器內執行 npm 指令",
    description: "既然你的電腦已經沒有 Node.js 了，那你該怎麼 `npm install` 呢？",
    prevLesson: "Lesson 5: Volumes 機制",
    nextLesson: "Lesson 7: 救難隊 - 遇到鬼擋牆時的救援清單",
    duration: "20 分鐘",
    type: "實務操作",
    level: "中階",
    status: "current",
    concept: [
      {
        title: "1. docker compose exec：滲透指令",
        description: "這個指令就像是派一個特務鑽進正在運行的容器裡執行命令。你不需要在本機裝 Node，你只要叫容器內的 Node 幫你裝東西。",
        code: "// 安裝新套件 (axios)\ndocker compose exec app npm install axios\n\n// 執行 Lint 檢查\ndocker compose exec app npm run lint",
        commandBreakdown: [
          { token: "exec", title: "執行", description: "命令 Docker 進入一個「活著」的容器。" },
          { token: "app", title: "服務名稱", description: "這是在 docker-compose.yml 裡定義的名字。" },
          { token: "npm install", title: "目標指令", description: "要在容器內跑的真正命令。" }
        ]
      },
      {
        title: "2. 為什麼執行後本機沒有 node_modules？",
        description: "其實有，但有時候 IDE 可能會慢一拍。只要你在容器內執行了 install，容器內的廚房就會立刻拿到新餐具，網頁就能跑了。",
        bullets: [
          "建議：如果是增加新套件，執行 exec 後建議重啟一下 `docker compose up -d` 確保萬無一失。"
        ]
      }
    ]
  },
  {
    id: "docker-7",
    title: "Lesson 7: 救難隊 - 遇到「鬼擋牆」時的緊急救援手冊",
    description: "如果你遇到奇奇怪怪的錯誤，請按照這份清單由上而下執行，通常能解決 99% 的問題。",
    prevLesson: "Lesson 6: npm 操作",
    nextLesson: "無（恭喜完成！）",
    duration: "15 分鐘",
    type: "疑難排解",
    level: "進階",
    status: "current",
    concept: [
      {
        title: "1. 究極重整：清除時空殘留 (-v)",
        description: "這是最強的一招。有時候舊的儲存空間會卡到舊資料。這條指令會徹底摧毀環境並用全新的狀態重啟。",
        code: "docker compose down -v\ndocker compose up -d --build",
        bullets: [
          "down -v：不只關門，還會把傳送門背後的臨時倉庫拆了。",
          "up --build：強迫重新閱讀食譜 (Dockerfile) 再蓋一次廚房。"
        ]
      },
      {
        title: "2. 聽聽死者的遺言：Logs",
        description: "網頁打不開、白畫面？別猜了，直接看容器內部的錯誤日誌。",
        code: "docker compose logs -f",
        bullets: [
          "-f：這叫「追蹤模式」。當有人敲門或出錯，日誌會即時跳出來給你看。"
        ]
      },
      {
        title: "3. 重建快取 (--no-cache)",
        description: "如果你懷疑 Docker 安裝套件時偷懶用了舊的緩存，請強制它從頭開始：",
        code: "docker compose build --no-cache"
      }
    ]
  }
];
