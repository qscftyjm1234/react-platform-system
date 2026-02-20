# React Docker 開發環境使用說明

這個指南將協助您在沒有安裝 Node.js 的情況下，使用 Docker 進行 React 開發。

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
