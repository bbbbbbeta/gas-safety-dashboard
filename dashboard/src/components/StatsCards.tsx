import React from 'react';

const StatsCards: React.FC = () => {
  const stats = [
    {
      label: '调压站',
      value: '5',
      unit: '座',
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500',
      details: [
        { 
          label: '异常', 
          value: 0, 
          unit: '个', 
          color: 'text-green-600',
          trend: '同比↓100%'
        }
      ]
    },
    {
      label: '调压箱',
      value: '566',
      unit: '座',
      color: 'from-cyan-500 to-cyan-600',
      borderColor: 'border-cyan-500',
      details: [
        { 
          label: '异常', 
          value: 3, 
          unit: '个', 
          color: 'text-red-600',
          trend: '同比↓100%'
        }
      ]
    },
    {
      label: '闸井',
      value: '2,456',
      unit: '座',
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-500',
      details: [
        { 
          label: '异常', 
          value: 0, 
          unit: '个', 
          color: 'text-green-600',
          trend: '同比↓100%'
        }
      ]
    },
    {
      label: '管线',
      value: '1,234',
      unit: '公里',
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-500',
      details: [
        { 
          label: '异常', 
          value: 2, 
          unit: '处', 
          color: 'text-red-600',
          trend: '同比↓100%'
        }
      ]
    },
    {
      label: '引入口',
      value: '12,890',
      unit: '个',
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-500',
      details: [
        { 
          label: '异常', 
          value: 1, 
          unit: '个', 
          color: 'text-red-600',
          trend: '同比↓100%'
        }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
      {stats.map((item, index) => (
        <div key={index} className={`stats-card relative overflow-hidden rounded-2xl shadow-lg border-t-4 ${item.borderColor} bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
          
          <div className="p-6">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">{item.label}</div>
            
            <div className="flex items-baseline mb-4">
              <span className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.value}</span>
              <span className="ml-2 text-base text-gray-500 dark:text-gray-400">{item.unit}</span>
            </div>
            
            <div className="space-y-2">
              {item.details.map((detail, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400">{detail.label}</span>
                    <span className={`font-semibold ${detail.color} ml-1`}>
                      {detail.value}
                      <span className="text-xs ml-0.5 text-gray-400">{detail.unit}</span>
                    </span>
                  </div>
                  {detail.trend && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">{detail.trend}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-10`}></div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
