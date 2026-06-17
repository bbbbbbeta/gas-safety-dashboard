import React, { useState, useMemo } from 'react';
import DateRangePicker from './DateRangePicker';
import GroupSelector from './GroupSelector';

const ManagementSubject: React.FC = () => {
  const [sortType, setSortType] = useState<'score' | 'name'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const rawData = [
    {
      id: '01',
      name: '运维一所',
      value: 100,
      color: 'from-red-500 to-red-600'
    },
    {
      id: '02',
      name: '运维二所',
      value: 85,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      id: '03',
      name: '综合服务所',
      value: 72,
      color: 'from-yellow-500 to-green-500'
    },
    {
      id: '04',
      name: '抢修中心',
      value: 90,
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const sortedData = useMemo(() => {
    const data = [...rawData];
    
    if (sortType === 'score') {
      data.sort((a, b) => {
        return sortOrder === 'desc' ? b.value - a.value : a.value - b.value;
      });
    } else {
      data.sort((a, b) => {
        return sortOrder === 'desc' 
          ? b.name.localeCompare(a.name, 'zh-CN')
          : a.name.localeCompare(b.name, 'zh-CN');
      });
    }
    
    return data;
  }, [sortType, sortOrder]);

  const handleSortChange = (type: 'score' | 'name') => {
    if (sortType === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('desc');
    }
  };

  return (
    <div className="management-subject mb-6">
      {/* 标题栏 */}
      <div className="section-header relative overflow-hidden rounded-t-2xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 py-4">
        <div className="relative z-10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-wide">
            管理主体
          </h2>
          
          <div className="flex items-center gap-4">
            {/* 日期和集团选择器 */}
            <DateRangePicker />
            <GroupSelector />
            
            {/* 排序按钮 */}
            <div className="flex gap-2">
              <button
                className={`sort-btn ${sortType === 'name' ? 'active' : ''}`}
                onClick={() => handleSortChange('name')}
              >
                按管理主体
                {sortType === 'name' && (
                  <svg className={`sort-arrow ${sortOrder === 'asc' ? 'rotated' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <button
                className={`sort-btn ${sortType === 'score' ? 'active' : ''}`}
                onClick={() => handleSortChange('score')}
              >
                按分数排序
                {sortType === 'score' && (
                  <svg className={`sort-arrow ${sortOrder === 'asc' ? 'rotated' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
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
        {/* 子标题 */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          绩效统计
        </div>
        
        {/* 绩效列表 */}
        <div className="space-y-4">
          {sortedData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              {/* 编号 */}
              <div className="text-lg font-bold text-gray-400 dark:text-gray-500 w-12">
                {item.id}
              </div>
              
              {/* 进度条容器 */}
              <div className="flex-1 relative">
                <div className="h-10 rounded-lg bg-gray-200 dark:bg-gray-600 overflow-hidden">
                  {/* 彩色进度条 */}
                  <div
                    className={`h-full bg-gradient-to-r ${item.color} flex items-center px-4 transition-all duration-500`}
                    style={{ width: `${item.value}%` }}
                  >
                    {/* 名称 */}
                    <span className="text-white font-semibold text-sm">
                      {item.name}
                    </span>
                  </div>
                </div>
                
                {/* 数值 */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-700 dark:text-gray-300">
                  {item.value}
                </div>
              </div>
              
              {/* 详情链接 */}
              <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium whitespace-nowrap">
                详情
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManagementSubject;