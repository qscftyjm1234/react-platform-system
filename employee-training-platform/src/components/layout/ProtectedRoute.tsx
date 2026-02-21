import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

/**
 * ProtectedRoute - 包裝組件，若使用者未經身分驗證則重新導向至 /login。
 */
export const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        // 重新導向至登入頁，但儲存當前位置以便登入後導回
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};
