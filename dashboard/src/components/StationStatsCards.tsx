import React from 'react';

const StationStatsCards: React.FC = () => {
  const stats = [
    {
      label: '调压站',
      value: '5',
      unit: '座',
      anomaly: '0',
      anomalyLabel: '异常',
      change: '12.5%',
      changeDirection: 'up',
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500'
    },
    {
      label: '调压箱',
      value: '566',
      unit: '座',
      anomaly: '3',
      anomalyLabel: '异常',
      change: '8.3%',
      changeDirection: 'up',
      color: 'from-cyan-500 to-cyan-600',
      borderColor: 'border-cyan-500'
    },
    {
      label: '闸井',
      value: '654',
      unit: '座',
      anomaly: '0',
      anomalyLabel: '异常',
      change: '5.2%',
      changeDirection: 'down',
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-500'
    },
    {
      label: '管线',
      value: '910.218',
      unit: '公里',
      anomaly: '33.017',
      anomalyLabel: '限期改造',
      change: '2.1%',
      changeDirection: 'down',
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-500'
    },
    {
      label: '引入口',
      value: '15286',
      unit: '座',
      anomaly: '0',
      anomalyLabel: '泄漏点',
      change: '3.8%',
      changeDirection: 'up',
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6 mb-6">
      {stats.map((item, index) => (
        <div key={index} className={`stats-card relative overflow-hidden rounded-2xl shadow-lg border-t-4 ${item.borderColor} bg-white dark:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl`}>
          <div className={`h-2 bg-gradient-to-r ${item.color}`}></div>
          
          <div className="p-6">
            <div className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">{item.label}</div>
            
            <div className="flex items-baseline mb-4">
              <span className={`text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.value}</span>
              <span className="ml-2 text-base text-gray-500 dark:text-gray-400">{item.unit}</span>
            </div>
            
            {/* 左右布局:左下角异常,右下角同比 */}
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm">
                <span className="text-gray-500 dark:text-gray-400">{item.anomalyLabel}</span>
                <span className={`ml-2 font-bold ${parseInt(item.anomaly) === 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  {item.anomaly}
                </span>
              </div>
              
              <div className={`text-sm font-bold flex items-center gap-1 ${item.changeDirection === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {item.changeDirection === 'up' ? (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
                <span>{item.change}</span>
              </div>
            </div>
          </div>
          
          <div className={`absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br ${item.color} opacity-10`}></div>
        </div>
      ))}
    </div>
  );
};

export default StationStatsCards;