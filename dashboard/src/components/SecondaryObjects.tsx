import React from 'react';
import DateRangePicker from './DateRangePicker';
import GroupSelector from './GroupSelector';

const SecondaryObjects: React.FC = () => {
  const equipmentData = [
    { name: '调压器', value: 20, warning: 2 },
    { name: '压力表', value: 20, warning: 2, expired: 0 },
    { name: '过滤器', value: 20, warning: 2, expired: 0 }
  ];

  const monitorData = [
    { label: '48H在线', value: 2, color: '#10b981' },
    { label: '压力传感器', value: 5, color: '#3b82f6' },
    { label: '一体化监控', value: 10, color: '#8b5cf6' },
    { label: '浓度传感器', value: 5, color: '#f59e0b' }
  ];

  return (
    <div className="chart-panel mt-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="chart-title">二级管理对象</h3>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <DateRangePicker />
        <GroupSelector />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div>
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">设备统计</h4>
          <div className="space-y-4">
            {equipmentData.map((item, index) => (
              <div key={index} className="equipment-card">
                <div className="flex items-center justify-between mb-2">
                  <span className="equipment-name">{item.name}</span>
                  <span className="equipment-count">{item.value} 个</span>
                </div>
                <div className="equipment-stats">
                  {item.warning !== undefined && (
                    <span className="stat-badge stat-warning">预警: {item.warning}</span>
                  )}
                  {item.expired !== undefined && (
                    <span className="stat-badge stat-danger">检定超期: {item.expired}</span>
                  )}
                  {item.expired !== undefined && item.expired === 0 && (
                    <span className="stat-badge stat-info">检定临期: 2</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">设备监控</h4>
          <div className="monitor-grid">
            {monitorData.map((item, index) => (
              <div key={index} className="monitor-item">
                <div className="monitor-icon" style={{ backgroundColor: item.color + '20' }}>
                  <div className="icon-dot" style={{ backgroundColor: item.color }}></div>
                </div>
                <div className="monitor-info">
                  <div className="monitor-label">{item.label}</div>
                  <div className="monitor-value" style={{ color: item.color }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="monitor-pie mt-4">
            <div className="simple-ring">
              <div className="ring-segment" style={{ background: 'conic-gradient(#10b981 0deg 36deg, transparent 36deg)' }}></div>
              <div className="ring-segment" style={{ background: 'conic-gradient(#3b82f6 36deg 126deg, transparent 126deg)' }}></div>
              <div className="ring-segment" style={{ background: 'conic-gradient(#8b5cf6 126deg 306deg, transparent 306deg)' }}></div>
              <div className="ring-segment" style={{ background: 'conic-gradient(#f59e0b 306deg 360deg, transparent 360deg)' }}></div>
            </div>
            <div className="ring-legend">
              {monitorData.map((item, index) => (
                <div key={index} className="legend-item-ring">
                  <span className="legend-color" style={{ backgroundColor: item.color }}></span>
                  <span className="legend-text">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="manufacturer-section">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">厂家/品牌分布</h4>
        <div className="manufacturer-chart">
          <div className="bar-chart-simple">
            <div className="chart-bar-group">
              <div className="chart-bar bar-primary" style={{ height: '80%' }}></div>
              <div className="chart-bar bar-secondary" style={{ height: '20%' }}></div>
              <div className="chart-bar-label">厂家1</div>
            </div>
            <div className="chart-bar-group">
              <div className="chart-bar bar-primary" style={{ height: '50%' }}></div>
              <div className="chart-bar bar-secondary" style={{ height: '15%' }}></div>
              <div className="chart-bar-label">厂家2</div>
            </div>
            <div className="chart-bar-group">
              <div className="chart-bar bar-primary" style={{ height: '30%' }}></div>
              <div className="chart-bar bar-secondary" style={{ height: '10%' }}></div>
              <div className="chart-bar-label">厂家3</div>
            </div>
          </div>
          <div className="chart-legend-bar">
            <div className="legend-item-bar">
              <span className="legend-dot-bar" style={{ backgroundColor: '#3b82f6' }}></span>
              <span>总数</span>
            </div>
            <div className="legend-item-bar">
              <span className="legend-dot-bar" style={{ backgroundColor: '#1e40af' }}></span>
              <span>故障数</span>
            </div>
            <div className="legend-item-bar">
              <span className="legend-dot-bar" style={{ backgroundColor: '#8b5cf6' }}></span>
              <span>故障率</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryObjects;