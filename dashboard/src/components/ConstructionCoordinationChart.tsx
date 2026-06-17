import React from 'react';
import ReactECharts from 'echarts-for-react';

const ConstructionCoordinationChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['百公里施工配合系数', '百公里新发施工配合系数', '本年施工配合总数', '在施施工配合数', '新发施工配合数'],
      top: 0,
      textStyle: {
        fontSize: 10
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '45px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['四分一所三班1片', '四分一所三班2片', '四分一所三班3片', '四分一所三班4片', '四分一所三班5片'],
      axisLabel: {
        fontSize: 10,
        rotate: 15
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
        name: '在施施工配合数',
        type: 'bar',
        data: [82, 35, 92, 33, 72],
        itemStyle: {
          color: '#1a5f2a'
        }
      },
      {
        name: '新发施工配合数',
        type: 'bar',
        data: [92, 65, 58, 52, 82],
        itemStyle: {
          color: '#2dce89'
        }
      },
      {
        name: '本年施工配合总数',
        type: 'bar',
        data: [28, 22, 48, 32, 72],
        itemStyle: {
          color: '#94a3b8'
        }
      },
      {
        name: '百公里施工配合系数',
        type: 'line',
        yAxisIndex: 1,
        data: [58, 32, 52, 78, 38],
        itemStyle: {
          color: '#ec4899'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(236, 72, 153, 0.3)' },
              { offset: 1, color: 'rgba(236, 72, 153, 0.05)' }
            ]
          }
        }
      },
      {
        name: '百公里新发施工配合系数',
        type: 'line',
        yAxisIndex: 1,
        data: [38, 22, 32, 28, 58],
        itemStyle: {
          color: '#f59e0b'
        }
      }
    ]
  };

  return (
    <div className="chart-panel p-4">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gas-blue mb-2">施工配合</h3>
        <div className="flex gap-6 text-sm">
          <span className="text-gray-600">
            在施施工配合 <span className="text-gas-blue font-bold mx-1">0</span> 起
          </span>
          <span className="text-gray-600">
            施工破坏 <span className="text-gas-blue font-bold mx-1">0</span> 起
          </span>
          <span className="text-gray-600">
            重大施工配合 <span className="text-gas-blue font-bold mx-1">0</span> 起
          </span>
        </div>
      </div>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </div>
  );
};

export default ConstructionCoordinationChart;
