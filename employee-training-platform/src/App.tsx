import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { Dashboard } from './pages/Dashboard'
import { ReactCoursePage } from './pages/courses/react/ReactCoursePage'
import { LessonPage } from './pages/courses/react/LessonPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#3B82F6', // Blue-500
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                },
                components: {
                    Button: {
                        borderRadius: 8,
                        controlHeight: 40,
                        colorPrimary: '#3B82F6',
                        algorithm: true, // Enable automatic derivatives
                    },
                    Card: {
                        borderRadius: 12,
                        boxShadowTertiary: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                    },
                    Layout: {
                        bodyBg: '#f9fafb', // Gray-50
                        siderBg: '#ffffff',
                    },
                    Menu: {
                        itemSelectedBg: '#eff6ff', // Blue-50
                        itemSelectedColor: '#3B82F6', // Blue-600
                        itemBorderRadius: 8,
                    }
                },
            }}
        >
            <BrowserRouter>
                <AuthProvider>
                    <MainLayout>
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/courses/react" element={<ReactCoursePage />} />
                            <Route path="/courses/react/lesson/:lessonId" element={<LessonPage />} />
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </MainLayout>
                </AuthProvider>
            </BrowserRouter>
        </ConfigProvider>
    )
}

export default App
