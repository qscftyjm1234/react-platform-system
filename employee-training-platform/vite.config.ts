import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        host: true, // 監聽所有 IP，讓 Docker 外部可以存取
        port: 5174, // 避開外層專案的 5173
        watch: {
            usePolling: true
        }
    }
})
