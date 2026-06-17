import React from 'react';

const BottomNavigation: React.FC = () => {
  const navItems = [
    '首页',
    '隐患管理',
    '施工配合',
    '异常管理',
    '数据统计'
  ];

  return (
    <div className="bottom-nav fixed bottom-0 left-0 right-0 px-6 py-3">
      <div className="flex justify-around items-center">
        {navItems.map((item, index) => (
          <button
            key={index}
            className="flex flex-col items-center gap-1 text-gray-600 hover:text-gas-blue transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <span className="text-xs">{item}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
