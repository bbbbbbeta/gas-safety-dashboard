import React from 'react';
import ReactECharts from 'echarts-for-react';

const MaintenanceCompletionChart: React.FC = () => {
  const option = {
    series: [
      {
        type: 'pie',
        radius: ['60%', '80%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: [
          { value: 54, name: '站箱运行', itemStyle: { color: '#8b5cf6' } },
          { value: 36, name: '闸井运行', itemStyle: { color: '#ec4899' } },
          { value: 40, name: '管线(无人车)', itemStyle: { color: '#22d3ee' } },
          { value: 45, name: '管线(人员)', itemStyle: { color: '#06b6d4' } }
        ]
      }
    ]
  };

  const legendData = [
    { name: '站箱运行', value: '54%', color: '#8b5cf6' },
    { name: '闸井运行', value: '36%', color: '#ec4899' },
    { name: '管线(无人车)', value: '40%', color: '#22d3ee' },
    { name: '管线(人员)', value: '45%', color: '#06b6d4' }
  ];

  return (
    <div className="chart-panel p-4">
      <h3 className="text-xl font-bold text-gas-blue mb-4">运维任务完成率</h3>
      <div className="flex gap-4">
        <div className="w-1/2">
          <ReactECharts option={option} style={{ height: '300px' }} />
        </div>
        <div className="w-1/2 flex flex-col justify-center gap-3">
          {legendData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
              <span className="text-sm text-gray-700">{item.name}</span>
              <span className="text-sm font-bold text-gas-blue ml-auto">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCompletionChart;
