import React, { createContext, useContext, useState, useEffect } from 'react';

// Types
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
    completedLessons: string[]; // Array of Lesson IDs e.g. "react-1"
    login: (role: UserRole) => void;
    logout: () => void;
    completeLesson: (lessonId: string) => void;
    isLessonUnlocked: (lessonId: string, previousLessonId?: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock Users
const MOCK_USERS: Record<UserRole, User> = {
    admin: {
        id: 'u-admin',
        name: '系統管理員',
        role: 'admin',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'
    },
    employee: {
        id: 'u-employee',
        name: '新進員工',
        role: 'employee',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka'
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);

    // Init from localStorage
    useEffect(() => {
        const storedUser = localStorage.getItem('app_user');
        const storedProgress = localStorage.getItem('app_progress');

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            // Default to admin for first time experience convenience, or null
            login('admin');
        }

        if (storedProgress) {
            setCompletedLessons(JSON.parse(storedProgress));
        }
    }, []);

    const login = (role: UserRole) => {
        const newUser = MOCK_USERS[role];
        setUser(newUser);
        localStorage.setItem('app_user', JSON.stringify(newUser));

        // Reset progress on role switch simply for demo purposes? 
        // Or keep it separate. For now, let's keep progress shared or reset if needed.
        // Let's NOT reset progress automatically to allow testing.
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
        // 1. Admin always has access
        if (user?.role === 'admin') return true;

        // 2. If it's the very first lesson (no previous lesson), it's always unlocked
        if (!previousLessonId) return true;

        // 3. If previous lesson is completed, this one is unlocked
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
