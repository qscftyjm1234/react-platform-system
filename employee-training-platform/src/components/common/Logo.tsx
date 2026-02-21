import React from 'react';
import officialLogo from '@/assets/images/oneLabLogo.jpg';

interface LogoProps {
    className?: string;
    size?: number;
    showText?: boolean;
    textColor?: string;
}

/**
 * Logo - The official corporate logo for Regal Software (瑞嘉軟體)
 */
export const Logo: React.FC<LogoProps> = ({ 
    className = "", 
    size = 32, 
    showText = false,
    textColor = "text-gray-800"
}) => {
    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div 
                className="relative flex items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm"
                style={{ width: size, height: size }}
            >
                <img 
                    src={officialLogo} 
                    alt="瑞嘉軟體" 
                    className="w-full h-full object-cover"
                />
            </div>
            
            {showText && (
                <span className={`text-lg font-bold tracking-tight ${textColor}`}>
                    瑞嘉軟體
                </span>
            )}
        </div>
    );
};
