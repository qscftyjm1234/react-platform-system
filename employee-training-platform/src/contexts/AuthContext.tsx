import React, { createContext, useContext, useState, useEffect } from 'react';

// 類型定義
export type UserRole = 'admin' | 'employee';

export interface User {
    id: string;
    name: string;
    role: UserRole;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    completedLessons: string[]; // 已完成課程 ID 陣列，例如 "react-1"
    login: (id: string) => void;
    logout: () => void;
    completeLesson: (lessonId: string) => void;
    isLessonUnlocked: (lessonId: string, previousLessonId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 模擬使用者數據
const MOCK_USERS: Record<string, User> = {
    admin: {
        id: 'u-admin',
        name: '系統管理員',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    A1: {
        id: 'u-employee-a1',
        name: '學員 A1',
        role: 'employee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // 從 localStorage 初始化
    useEffect(() => {
        const storedUser = localStorage.getItem('app_user');
        const storedProgress = localStorage.getItem('app_progress');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        if (storedProgress) {
            setCompletedLessons(JSON.parse(storedProgress));
        }
    }, []);

    const login = (id: string) => {
        const newUser = MOCK_USERS[id];
        if (newUser) {
            setUser(newUser);
            localStorage.setItem('app_user', JSON.stringify(newUser));
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('app_user');
    };

    const completeLesson = (lessonId: string) => {
        if (!completedLessons.includes(lessonId)) {
            const newProgress = [...completedLessons, lessonId];
            setCompletedLessons(newProgress);
            localStorage.setItem('app_progress', JSON.stringify(newProgress));
        }
    };

    const isLessonUnlocked = (_lessonId: string, previousLessonId?: string): boolean => {
        // 1. 管理員永遠擁有存取權限
        if (user?.role === 'admin') return true;

        // 2. 如果是第一門課程（無前置課程），永遠保持解鎖狀態
        if (!previousLessonId) return true;

        // 3. 如果前置課程已完成，則解鎖此課程
        return completedLessons.includes(previousLessonId);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated: !!user,
            completedLessons,
            login,
            logout,
            completeLesson,
            isLessonUnlocked
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
