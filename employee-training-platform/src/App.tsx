import { ConfigProvider, App as AntdApp } from 'antd'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { MainLayout } from './components/layout/MainLayout'
import { AuthLayout } from './components/layout/AuthLayout'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { Dashboard } from './pages/Dashboard'
import { ReactCoursePage } from './pages/courses/react/ReactCoursePage'
import { LessonPage } from './pages/courses/react/LessonPage'
import { DockerCoursePage } from './pages/courses/docker/DockerCoursePage'
import { DockerLessonPage } from './pages/courses/docker/DockerLessonPage'
import { AICoursePage } from './pages/courses/ai/AICoursePage'
import { AILessonPage } from './pages/courses/ai/AILessonPage'
import { EmployeeManagement } from './pages/admin/EmployeeManagement'
import { SystemSettings } from './pages/admin/SystemSettings'
import { LoginPage } from './pages/LoginPage'
import { AuthProvider } from './contexts/AuthContext'

function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#3B82F6', // 藍色-500
                    borderRadius: 8,
                    fontFamily: 'Inter, sans-serif',
                },
                components: {
                    Button: {
                        borderRadius: 8,
                        controlHeight: 40,
                        colorPrimary: '#3B82F6',
                        algorithm: true, // 啟用自動衍生算法
                    },
                    Card: {
                        borderRadius: 12,
                        boxShadowTertiary: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                    },
                    Layout: {
                        bodyBg: '#f9fafb', // 灰色-50
                        siderBg: '#ffffff',
                    },
                    Menu: {
                        itemSelectedBg: '#eff6ff', // 藍色-50
                        itemSelectedColor: '#3B82F6', // 藍色-600
                        itemBorderRadius: 8,
                    },
                    Tag: {
                        borderRadiusSM: 6,
                    }
                },
            }}
        >
            <AntdApp>
                <BrowserRouter>
                    <AuthProvider>
                        <Routes>
                            {/* 身分驗證佈局路由 */}
                            <Route element={<AuthLayout />}>
                                <Route path="/login" element={<LoginPage />} />
                            </Route>

                            {/* 受保護的主要佈局路由 */}
                            <Route element={<ProtectedRoute />}>
                                <Route element={<MainLayout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/courses/react" element={<ReactCoursePage />} />
                                    <Route path="/courses/react/lesson/:lessonId" element={<LessonPage />} />
                                    <Route path="/courses/docker" element={<DockerCoursePage />} />
                                    <Route path="/courses/docker/lesson/:lessonId" element={<DockerLessonPage />} />
                                    <Route path="/courses/ai" element={<AICoursePage />} />
                                    <Route path="/courses/ai/lesson/:lessonId" element={<AILessonPage />} />
                                    <Route path="/admin/employees" element={<EmployeeManagement />} />
                                    <Route path="/admin/settings" element={<SystemSettings />} />
                                </Route>
                            </Route>

                            {/* 將所有其他路徑導流至儀表板（將觸發 ProtectedRoute） */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </AntdApp>
        </ConfigProvider>
    )
}

export default App
