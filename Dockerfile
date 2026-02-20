# 使用 Node.js 20 Alpine 作為基礎映像檔
FROM node:20-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package.json 到工作目錄
COPY package.json ./

# 安裝依賴
RUN npm install

# 複製所有檔案到工作目錄
COPY . .

# 暴露 5173 埠 (Vite 預設埠)
EXPOSE 5173

# 啟動開發伺服器
CMD ["npm", "run", "dev"]
