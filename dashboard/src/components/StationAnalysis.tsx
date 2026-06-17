import React, { useState } from 'react';
import DateRangePicker from './DateRangePicker';
import GroupSelector from './GroupSelector';

const StationAnalysis: React.FC = () => {
  const [userType, setUserType] = useState('');
  const [userTypeOpen, setUserTypeOpen] = useState(false);

  const userTypes = ['全部', '居民', '非居', '公福', '工业'];
  
  // 各分公司的管理方式数据
  const branchData = [
    { name: '一分', owned: 2, self: 1, hosted: 0 },
    { name: '二分', owned: 1, self: 0, hosted: 1 },
    { name: '三分', owned: 3, self: 1, hosted: 0 },
    { name: '四分', owned: 1, self: 0, hosted: 0 },
    { name: '五分', owned: 1, self: 0, hosted: 0 },
  ];

  return (
    <div className="chart-panel mb-6">
      {/* 标题和筛选条件在同一行 */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h3 className="chart-title">调压站情况</h3>
        
        <div className="flex items-center gap-4 flex-wrap">
          <DateRangePicker />
          <GroupSelector />
        </div>
      </div>

      {/* 1. 管理方式 - 左侧面积图 + 右侧堆叠柱状图 */}
      <div className="management-section mb-6">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">管理方式</h4>
        <div className="flex gap-4">
          {/* 左侧:面积图(Treemap) */}
          <div className="area-treemap" style={{ width: '40%' }}>
            <div className="treemap-left">
              <div className="treemap-block block-hosted">
                <span className="treemap-label">托管</span>
                <span className="treemap-value">1</span>
              </div>
              <div className="treemap-block block-self">
                <span className="treemap-label">自管</span>
                <span className="treemap-value">1</span>
              </div>
            </div>
            <div className="treemap-right">
              <div className="treemap-block block-owned">
                <span className="treemap-label">自有</span>
                <span className="treemap-value">8</span>
              </div>
            </div>
          </div>

          {/* 右侧:堆叠柱状图 */}
          <div className="stacked-bar-chart" style={{ width: '60%' }}>
            <div className="bar-chart-container">
              {branchData.map((branch, index) => {
                const total = branch.owned + branch.self + branch.hosted;
                const maxHeight = 120;
                const ownedHeight = total > 0 ? (branch.owned / Math.max(...branchData.map(b => b.owned + b.self + b.hosted))) * maxHeight : 0;
                const selfHeight = total > 0 ? (branch.self / Math.max(...branchData.map(b => b.owned + b.self + b.hosted))) * maxHeight : 0;
                const hostedHeight = total > 0 ? (branch.hosted / Math.max(...branchData.map(b => b.owned + b.self + b.hosted))) * maxHeight : 0;
                
                return (
                  <div key={index} className="bar-group">
                    <div className="bar-stack">
                      {branch.hosted > 0 && (
                        <div 
                          className="bar-segment bar-segment-hosted"
                          style={{ height: `${hostedHeight}px` }}
                          title={`托管: ${branch.hosted}`}
                        >
                          <span className="bar-segment-label">{branch.hosted}</span>
                        </div>
                      )}
                      {branch.self > 0 && (
                        <div 
                          className="bar-segment bar-segment-self"
                          style={{ height: `${selfHeight}px` }}
                          title={`自管: ${branch.self}`}
                        >
                          <span className="bar-segment-label">{branch.self}</span>
                        </div>
                      )}
                      {branch.owned > 0 && (
                        <div 
                          className="bar-segment bar-segment-owned"
                          style={{ height: `${ownedHeight}px` }}
                          title={`自有: ${branch.owned}`}
                        >
                          <span className="bar-segment-label">{branch.owned}</span>
                        </div>
                      )}
                    </div>
                    <div className="bar-label">{branch.name}</div>
                  </div>
                );
              })}
            </div>
            
            {/* 图例 */}
            <div className="bar-chart-legend">
              <div className="legend-item">
                <span className="legend-color legend-owned"></span>
                <span>自有</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-self"></span>
                <span>自管</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-hosted"></span>
                <span>托管</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 用户类型 - 饼状图 */}
      <div className="user-type-section mb-6">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
          <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300">用户类型</h4>
          
          {/* 用户类型选择按钮移到这里 */}
          <div className="user-type-selector">
            <button className="user-type-btn" onClick={() => setUserTypeOpen(!userTypeOpen)}>
              用户类型
              <svg className="arrow" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {userTypeOpen && (
              <div className="user-type-dropdown">
                {userTypes.map((type) => (
                  <button
                    key={type}
                    className={`user-type-item ${userType === type ? 'active' : ''}`}
                    onClick={() => {
                      setUserType(type);
                      setUserTypeOpen(false);
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="pie-chart-wrapper">
          <div className="pie-chart">
            <div className="pie-segment pie-residential" style={{ width: '20%' }}>
              <span className="pie-percent">20%</span>
            </div>
            <div className="pie-segment pie-non-residential" style={{ width: '80%' }}>
              <span className="pie-percent">80%</span>
            </div>
          </div>
          <div className="pie-legend-list">
            <div className="pie-legend-item">
              <span className="pie-legend-dot dot-residential"></span>
              <span className="pie-legend-label">居民</span>
              <span className="pie-legend-value">2</span>
            </div>
            <div className="pie-legend-item">
              <span className="pie-legend-dot dot-non-residential"></span>
              <span className="pie-legend-label">非居</span>
              <span className="pie-legend-value">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 隐患统计 */}
      <div className="anomaly-summary mb-6">
        <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">隐患统计</h4>
        <div className="anomaly-title">
          <span className="text-lg font-bold">异常隐患:</span>
          <span className="text-2xl font-bold text-red-600 ml-2">14</span>
          <span className="text-lg font-semibold ml-2">处</span>
          <span className="text-sm text-gray-500 ml-4">(较上月环比 ↑10.69%)</span>
        </div>
        <div className="anomaly-status mt-3">
          <span className="status-badge status-warning">管控中: 8处</span>
          <span className="status-badge status-success">处置完成: 6处</span>
        </div>
        
        <div className="anomaly-level-section mt-6">
          <div className="level-bars">
            <div className="level-item">
              <span className="level-label">重大</span>
              <div className="level-bar-container">
                <div className="level-bar level-major" style={{ width: '30%' }}></div>
              </div>
              <span className="level-value">3</span>
            </div>
            <div className="level-item">
              <span className="level-label">一般二级</span>
              <div className="level-bar-container">
                <div className="level-bar level-secondary" style={{ width: '45%' }}></div>
              </div>
              <span className="level-value">5</span>
            </div>
            <div className="level-item">
              <span className="level-label">一般一级</span>
              <div className="level-bar-container">
                <div className="level-bar level-minor" style={{ width: '60%' }}></div>
              </div>
              <span className="level-value">6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationAnalysis;