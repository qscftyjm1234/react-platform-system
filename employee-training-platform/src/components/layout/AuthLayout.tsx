import React from "react";
import { Outlet } from "react-router-dom";
import { Logo } from "@/components/common/Logo";

/**
 * AuthLayout - 用於身分驗證頁面的現代化沉浸式分割版面。
 * 旨在為企業環境營造「大氣」且專業的視覺感受。
 */
export const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* 左側：品牌與視覺（沉浸式區塊） */}
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden bg-blue-600">
        {/* 活力品牌 Mesh Gradient 背景與白色高光 */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] rounded-full opacity-60 animate-pulse"
            style={{ 
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.5) 0%, transparent 70%)',
              filter: 'blur(80px)'
            }} 
          />
          <div 
            className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] rounded-full opacity-40 animate-pulse"
            style={{ 
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, transparent 70%)',
              filter: 'blur(100px)',
              animationDelay: '1s'
            }} 
          />
          {/* 主要白色高光層 */}
          <div 
            className="absolute top-[10%] left-[20%] w-[80%] h-[80%] rounded-full opacity-30 animate-in fade-in duration-1000"
            style={{ 
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.6) 0%, transparent 60%)',
              filter: 'blur(90px)'
            }} 
          />
          <div 
            className="absolute top-[20%] right-[10%] w-[70%] h-[70%] rounded-full opacity-30"
            style={{ 
              background: 'radial-gradient(circle, rgba(147, 197, 253, 0.4) 0%, transparent 70%)',
              filter: 'blur(60px)'
            }} 
          />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay" />
        </div>

        {/* 內容區塊 */}
        <div className="relative z-10 flex flex-col justify-between p-16 w-full text-white">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-6">
              <div className="animate-in zoom-in-50 duration-1000">
                <Logo size={100} />
              </div>
              <div className="flex flex-col">
                <span className="text-6xl font-black tracking-tighter mb-2">瑞嘉軟體</span>
                <span className="text-blue-200/60 text-lg font-bold uppercase tracking-[0.4em] italic">onelab</span>
              </div>
            </div>
          </div>

          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-8">
              科技引領未來，<br />
              人才驅動成長。
            </h1>
            <p className="text-xl text-blue-100/80 leading-relaxed font-light">
              瑞嘉軟體員工教育系統，為您量身打造的專業成長舞台。
              在這裡，我們共同學習、不斷進化，實踐卓越。
            </p>
          </div>

          <div className="flex items-center gap-8 text-blue-200/60 text-sm font-medium">
            <span>&copy; 2026 瑞嘉軟體</span>
            <span>隱私權政策</span>
            <span>服務條款</span>
          </div>
        </div>
      </div>

      {/* 右側：登入表單 */}
      <div className="w-full lg:w-2/5 flex flex-col justify-center items-center px-8 sm:px-12 lg:px-20 bg-gray-50/30">
        {/* 行動裝置版 Logo（僅在小螢幕顯示） */}
        <div className="lg:hidden mb-12 flex flex-col items-center">
          <Logo size={64} className="mb-4" />
          <h2 className="text-2xl font-bold text-gray-900">瑞嘉軟體</h2>
        </div>

        <div className="w-full max-w-md">
          <div className="animate-in fade-in slide-in-from-right-8 duration-700">
            <Outlet />
          </div>
        </div>
        
        <div className="mt-12 lg:hidden text-center text-xs text-gray-400">
            &copy; 2026 瑞嘉軟體. 保留所有權利。
        </div>
      </div>
    </div>
  );
};
