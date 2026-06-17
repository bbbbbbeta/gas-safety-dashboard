import React from 'react';
import ReactECharts from 'echarts-for-react';

const HazardGovernanceChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['穿越跨越数量', '穿越越治理数量', '穿越类缺陷百公里排查数', '穿越类隐患百公里治理率'],
      top: 0,
      textStyle: {
        fontSize: 12
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '40px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['一片', '二片', '三片', '四片', '五片'],
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: [
      {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      },
      {
        type: 'value',
        max: 100,
        axisLabel: {
          formatter: '{value}%'
        }
      }
    ],
    series: [
      {
        name: '穿越跨越数量',
        type: 'bar',
        data: [82, 35, 92, 33, 72],
        itemStyle: {
          color: '#4facfe'
        }
      },
      {
        name: '穿越越治理数量',
        type: 'bar',
        data: [92, 36, 98, 52, 76],
        itemStyle: {
          color: '#00f2fe'
        }
      },
      {
        name: '穿越类缺陷百公里排查数',
        type: 'line',
        yAxisIndex: 1,
        data: [58, 32, 52, 38, 88],
        itemStyle: {
          color: '#5e72e4'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(94, 114, 228, 0.3)' },
              { offset: 1, color: 'rgba(94, 114, 228, 0.05)' }
            ]
          }
        }
      },
      {
        name: '穿越类隐患百公里治理率',
        type: 'line',
        yAxisIndex: 1,
        data: [58, 28, 52, 38, 88],
        itemStyle: {
          color: '#2dce89'
        }
      }
    ]
  };

  return (
    <div className="chart-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gas-blue">隐患治理</h3>
        <div className="text-sm">
          <span className="text-gray-600">占压</span>
          <span className="text-gas-blue font-bold mx-2">154</span>
          <span className="text-gray-600">处</span>
          <span className="text-gray-600 ml-4">穿跨越数</span>
          <span className="text-gas-blue font-bold mx-2">25</span>
          <span className="text-gray-600">个</span>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </div>
  );
};

export default HazardGovernanceChart;
