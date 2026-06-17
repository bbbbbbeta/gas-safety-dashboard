import React from 'react';
import ReactECharts from 'echarts-for-react';

const LeakDetection: React.FC = () => {
  // 泄漏检测环形图数据
  const pieOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      bottom: '0%',
      data: ['疑似漏点', '待修复', '已修复', '确认非漏点']
    },
    series: [
      {
        name: '泄漏检测',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c}'
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 15
        },
        data: [
          { value: 5799, name: '疑似漏点', itemStyle: { color: '#f97316' } },
          { value: 5467, name: '待修复', itemStyle: { color: '#06b6d4' } },
          { value: 4350, name: '已修复', itemStyle: { color: '#3b82f6' } },
          { value: 4679, name: '确认非漏点', itemStyle: { color: '#10b981' } }
        ]
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: '40%',
        style: {
          text: '数据总量\n35,678',
          textAlign: 'center',
          fill: '#333',
          fontSize: 16,
          fontWeight: 'bold',
          lineHeight: 22
        }
      }
    ]
  };

  // 统计数据
  const stats = [
    { label: '泄漏点数', value: 45, unit: '个' },
    { label: '百公里自查泄漏气数', value: 5, unit: '个' }
  ];

  return (
    <div className="chart-panel">
      <div className="chart-title">泄漏检测</div>
      
      {/* 环形图 */}
      <div className="mb-6">
        <ReactECharts option={pieOption} style={{ height: '300px' }} />
      </div>
      
      {/* 统计数据 */}
      <div className="grid grid-cols-2 gap-4 border-t pt-4">
        {stats.map((item, index) => (
          <div key={index} className="text-center">
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {item.label}
            </div>
            <div className="flex items-center justify-center">
              <span className="text-3xl font-bold text-blue-600">
                {item.value}
              </span>
              <span className="ml-1 text-sm text-gray-500">
                {item.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeakDetection;
