import React from 'react';
import ReactECharts from 'echarts-for-react';

const AnomalyManagementChart: React.FC = () => {
  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['发现异常数', '处置异常数', '异常处置率'],
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
      data: ['站箱运行', '闸井运行', '管线(无人车)', '管线(人员)'],
      axisLabel: {
        fontSize: 12
      }
    },
    yAxis: {
      type: 'value',
      max: 50,
      name: '单位:个',
      axisLabel: {
        fontSize: 12
      }
    },
    series: [
      {
        name: '发现异常数',
        type: 'bar',
        stack: 'total',
        data: [12, 12, 12, 13],
        itemStyle: {
          color: '#3b82f6'
        }
      },
      {
        name: '处置异常数',
        type: 'bar',
        stack: 'total',
        data: [18, 9, 11, 7],
        itemStyle: {
          color: '#22d3ee'
        }
      },
      {
        name: '异常处置率',
        type: 'line',
        data: [12, 38, 24, 38],
        yAxisIndex: 0,
        itemStyle: {
          color: '#ec4899'
        },
        lineStyle: {
          width: 2
        },
        symbol: 'circle',
        symbolSize: 8
      }
    ]
  };

  return (
    <div className="chart-panel p-4">
      <h3 className="text-xl font-bold text-gas-blue mb-4">异常管理</h3>
      <ReactECharts option={option} style={{ height: '300px' }} />
    </div>
  );
};

export default AnomalyManagementChart;
