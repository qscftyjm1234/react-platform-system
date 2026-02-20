import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // 監聽所有地址，包括區網和 Docker 容器外部
    port: 5173,
    watch: {
      usePolling: true // 在某些 Docker 環境下需要這個設定才能正確監測檔案變更
    }
  }
})
