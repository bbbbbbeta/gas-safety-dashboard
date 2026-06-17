import React, { ReactNode } from 'react';

interface ManagementSectionProps {
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
}

const ManagementSection: React.FC<ManagementSectionProps> = ({ title, headerRight, children }) => {
  return (
    <div className="management-section mb-6">
      {/* 标题栏 */}
      <div className="section-header relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 py-4">
        <div className="relative z-10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-wide">
            {title}
          </h2>
          {headerRight && (
            <div className="header-right-content flex items-center gap-4">
              {headerRight}
            </div>
          )}
        </div>
        
        {/* 装饰图形 */}
        <div className="absolute right-0 top-0 h-full w-64 opacity-20">
          <svg viewBox="0 0 200 100" className="h-full w-full">
            <path
              d="M 0,50 Q 50,30 100,50 T 200,50 L 200,100 L 0,100 Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
      
      {/* 内容区域 */}
      <div className="section-content rounded-b-2xl bg-white dark:bg-gray-800 shadow-lg p-6 border border-t-0 border-blue-100 dark:border-blue-900">
        {children}
      </div>
    </div>
  );
};

export default ManagementSection;