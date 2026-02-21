# React Docker 開發環境使用說明

這個指南將協助您在沒有安裝 Node.js 的情況下，使用 Docker 進行 React 開發。

---

## 💡 案發現場：為什麼會報錯？（教學案例）

如果您遇到 `[Error] Loading PostCSS Plugin failed: Cannot find module 'tailwindcss'`，這是一個非常經典的 Docker 開發情境，讓我們來拆解它：

### 1. 核心觀念：Image (映像檔) vs. Code (程式碼)

- **Image (映像檔)**：像是一個**「已經蓋好的廚房」**。它是根據 `Dockerfile` 和當時的 `package.json` 蓋出來的。
- **Code (程式碼)**：像是**「廚師手上的食譜」**。它是您在本機 (Windows) 修改的檔案，透過 `volumes` 掛載到廚房裡。

### 2. 問題出在哪裡？

當初在蓋這座廚房（執行 `docker build`）時，它是參考**根目錄的 `package.json`**：

1.  根目錄的清單裡**沒有**寫到需要 `tailwindcss`。
2.  所以 Docker 蓋廚房時，就沒有把 `tailwindcss` 這個工具買回來放。
3.  但您的子專案（如 `employee-training-platform`）的食譜裡**明明白白寫著**要用到這個工具。
4.  廚師（Vite/PostCSS）在廚房裡找半天找不到，就崩潰報錯了。

### 3. 解法是什麼？

我們把 `tailwindcss`、`autoprefixer` 等基礎工具**補進根目錄的 `package.json`**：

- 下次 Docker 重新蓋廚房時，就會根據新清單把工具買齊。
- 這樣不管是跑根目錄還是子專案，廚房裡都有足夠的工具可以用了。

---

## 🔥 常見錯誤與疑難排解 (Troubleshooting)

### 1. 報錯：`Cannot find module 'tailwindcss'` 或 `Failed to resolve import "antd"`

- **現象**：啟動時噴出 `PostCSS Plugin failed` 或 Vite 找不到 `antd`、`react-router-dom` 等套件。
- **原因**：因為我們使用的是單一映像檔 (Unified Image)，Docker 容器內的環境是根據根目錄的清單產生的。如果根目錄清單漏掉套件，子專案就無法運作。
- **解法**：我們已經將所有子專案的核心套件全部填入根目錄的 `package.json`。**只要清單有變，請務必重新 Build。**

### 2. 清單改了，但 Docker 好像沒反應？

- **現象**：明明改了 `package.json`，啟動後還是報同樣的錯誤。
- **原因**：Docker 為了省時間會使用「快取 (Cache)」，有時候它不會發現您偷偷加了幾個套件。
- **必殺技**：使用 `--no-cache` 強制重新買齊所有東西。
  ```bash
  docker compose build --no-cache
  ```

### 3. 機器的鬼魂：為什麼 Build 了還是沒用？

- **現象**：明明用了 `--no-cache` 重新 Build 了，進容器看 `package.json` 也是對的，但跑起來還是說少套件。
- **原因**：這是 Docker Compose 最經典的坑。我們在 `docker-compose.yml` 有設定 `node_modules` 的 **Volume (儲存空間)**。這空間一旦建立，除非手動刪除，否則它會「跨越時空」一直存在。即便您換了新映像檔，舊的 `node_modules` 空間還是會被掛載進去，蓋掉新裝好的套件。
- **必殺技**：如果您懷疑是套件沒更新，可以用以下指令**徹底清除環境並重啟**：

  ```bash
  # 停止並刪除容器與「空間 (Volumes)」
  docker compose down -v

  # 重新啟動
  docker compose up -d --build
  ```

- **備註**：`down -v` 的 `-v` 就是刪除 Volume 的關鍵。

### 4. 檔案同步明明開了，但容器內沒更新？

- **現象**：在本機存檔了，但容器日誌沒跳重啟。
- **解法**：請確保 `docker-compose.yml` 中有設定 `CHOKIDAR_USEPOLLING=true`（我們已經預設開啟）。在某些 Windows 環境下，唯有透過「輪調 (Polling)」方式 Docker 才能察覺檔案變動。

---

## 前置要求

- 請確保您已安裝並啟動 **Docker Desktop**。

## 檔案用途說明

您的專案中有三個重要的 Docker 檔案，它們各自負責不同的任務：

### 1. `Dockerfile`

**用途：定義「單一容器」的製作藍圖。**

- 它告訴 Docker 要使用哪個 Node.js 版本 (Node 20 Alpine)。
- 它規定了如何安裝專案相依套件 (`npm install`)。
- 它設定了容器啟動時要執行的指令 (`npm run dev`)。
- **簡單說**：它是製作這個應用程式「映像檔 (Image)」的食譜。

### 2. `docker-compose.yml`

**用途：定義「整個服務」的運作方式。**

- 它使用 `Dockerfile` 來建立服務。
- 它設定了 **Port Mapping** (`5173:5173`)，讓您可以在本機瀏覽器看到容器內的畫面。
- 它設定了 **Volumes** (檔案掛載)，讓您在本機修改程式碼時，容器內會同步更新 (Hot Reload)。
- **簡單說**：它是用來「啟動」和「串接」容器的控制中心。

### 3. `.dockerignore`

**用途：告訴 Docker 哪些檔案「不要」複製進去。**

- 通常會忽略 `node_modules` (因為容器內會自己安裝 Linux 版的套件，不需要本機 Windows 版的)。
- 也會忽略 `.git`、`.env` 等不需要或敏感的檔案。
- **簡單說**：它是為了保持映像檔輕量、乾淨，並避免環境衝突。

## 快速開始

### 1. 啟動伺服器

在專案根目錄執行以下指令來啟動開發環境：

```bash
docker compose up -d --build
```

- `-d`: 在背景執行
- `--build`: 強制重新建置映像檔 (首次執行或 `package.json` 修改後建議加上)

啟動後，請在瀏覽器開啟 [http://localhost:5173](http://localhost:5173)。

### 2. 停止伺服器

```bash
docker compose down
```

### 3. 查看日誌

若要查看伺服器輸出或錯誤訊息：

```bash
docker compose logs -f
```

(按 `Ctrl + C` 離開日誌畫面)

## 如何執行 npm 指令

因為您的電腦已移除 Node.js，所有 npm 指令都必須在 Docker 容器內執行。

### 安裝套件

例如安裝 `axios`：

```bash
docker compose exec app npm install axios
```

### 移除套件

```bash
docker compose exec app npm uninstall package-name
```

### 執行其他腳本

例如執行 lint：

```bash
docker compose exec app npm run lint
```

## 注意事項

- **熱重載 (Hot Reload)**：修改 `src` 內的檔案時，瀏覽器會自動更新。
- **node_modules**：容器內的 `node_modules` 是獨立的，不會干擾本機檔案系統。

## 常見問題 (FAQ)

### Q: 我需要手動下載 Node.js 的 Image 嗎？

**不需要**。
當您執行 `docker compose up` 時，Docker 會自動讀取 `Dockerfile` 中的 `FROM node:20-alpine` 指令，如果您的電腦還沒有這個 Image，Docker 會自動幫您下載。您只需要確保網路連線正常即可。

### Q: 為什麼第一次啟動比較久？

因為 Docker 需要下載 Node.js 的 Image 並安裝 `npm install` 的依賴套件。第二次啟動就會非常快了。

## 進階：子專案與手動執行

### 1. 執行子專案 (例如：employee-training-platform)

如果您想直接執行子專案，可以透過 `--workdir` 指定目錄：

```bash
docker run -it --rm -v .:/app -w /app/employee-training-platform -p 5174:5174 react-playground npm run dev
```

### 2. 為什麼需要修改根目錄的 package.json？

為了確保不論是用 `docker-compose` 或是手動 `docker build` 指令，容器內都有足夠的工具（如 `tailwindcss`）來編譯不同子專案的樣式，我們將基礎的編譯套件放進了根目錄的 `package.json` 中。這能避免出現「Cannot find module 'tailwindcss'」的錯誤。

### 3. 手動建立映像檔

如果您不使用 Docker Compose：

```bash
# 建立映像檔
docker build -t my-react-app .

# 啟動容器
docker run -it --rm -v .:/app -p 5173:5173 my-react-app
```
