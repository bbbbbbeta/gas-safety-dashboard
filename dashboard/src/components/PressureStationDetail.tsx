import React from 'react';
import Header from './Header';
import ManagementSection from './ManagementSection';
import StationStatsCards from './StationStatsCards';
import StationAnalysis from './StationAnalysis';
import StationMap from './StationMap';
import SecondaryObjects from './SecondaryObjects';

interface PressureStationDetailProps {
  onBack: () => void;
}

const PressureStationDetail: React.FC<PressureStationDetailProps> = ({ onBack }) => {
  return (
    <div className="dashboard-container">
      {/* 一体化横幅 - 与首页一致 */}
      <Header />
      
      {/* 返回按钮和标题 */}
      <div className="detail-header mb-6">
        <button className="back-btn" onClick={onBack}>
          <svg viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          返回
        </button>
        <h2 className="detail-title">管理对象 - 调压站</h2>
      </div>
      
      {/* 管理对象统计卡片 */}
      <ManagementSection title="管理对象">
        <StationStatsCards />
      </ManagementSection>
      
      {/* 业务类型区域 */}
      <ManagementSection title="调压站情况">
        <div className="responsive-grid-2">
          <div className="space-y-6">
            <StationAnalysis />
          </div>
          <div className="space-y-6">
            <StationMap />
          </div>
        </div>
      </ManagementSection>
      
      {/* 二级管理对象 */}
      <SecondaryObjects />
      
      {/* 底部留白 */}
      <div className="h-20"></div>
    </div>
  );
};

export default PressureStationDetail;