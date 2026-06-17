import React from 'react';
import ReactECharts from 'echarts-for-react';

const DataOverview: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '5%',
      left: 'center',
      textStyle: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '数据总量',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 8,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}: {c}'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: true
        },
        data: [
          { value: 5799, name: '疑似漏点', itemStyle: { color: '#f59e0b' } },
          { value: 5467, name: '待修复', itemStyle: { color: '#06b6d4' } },
          { value: 4350, name: '已修复', itemStyle: { color: '#3b82f6' } },
          { value: 4679, name: '确认非漏点', itemStyle: { color: '#22c55e' } }
        ]
      }
    ]
  };

  const total = 35678;

  return (
    <div className="chart-panel p-4">
      <div className="relative">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-sm text-gray-600">数据总量</div>
          <div className="text-3xl font-bold text-gas-blue">{total.toLocaleString()}</div>
        </div>
        <ReactECharts option={option} style={{ height: '350px' }} />
      </div>
    </div>
  );
};

export default DataOverview;
