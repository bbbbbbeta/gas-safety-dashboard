import React, { useState } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import FullscreenToggle from './components/FullscreenToggle';
import Header from './components/Header';
import StatsCards from './components/StatsCards';
import ManagementSection from './components/ManagementSection';
import ManagementSubject from './components/ManagementSubject';
import DataFilter from './components/DataFilter';
import HazardGovernanceChart from './components/HazardGovernanceChart';
import ConstructionCoordinationChart from './components/ConstructionCoordinationChart';
import AnomalyManagementChart from './components/AnomalyManagementChart';
import MaintenanceCompletionChart from './components/MaintenanceCompletionChart';
import LeakDetection from './components/LeakDetection';
import GasMap from './components/GasMap';
import DataExport from './components/DataExport';
import RealTimeAlert from './components/RealTimeAlert';
import PressureStationDetail from './components/PressureStationDetail';
import DateRangePicker from './components/DateRangePicker';
import GroupSelector from './components/GroupSelector';

const DashboardContent: React.FC = () => {
  const [filters, setFilters] = useState({
    region: 'all',
    startDate: '',
    endDate: ''
  });
  const [drillDownView, setDrillDownView] = useState<string | null>(null);

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    console.log('筛选条件已更新:', newFilters);
  };

  const handleDrillDown = (type: string) => {
    setDrillDownView(type);
  };

  const handleBack = () => {
    setDrillDownView(null);
  };

  if (drillDownView === 'pressure-station') {
    return <PressureStationDetail onBack={handleBack} />;
  }

  return (
    <div className="dashboard-container">
      {/* 功能按钮 */}
      <div className="fixed-buttons">
        <FullscreenToggle />
        <ThemeToggle />
        <RealTimeAlert />
      </div>
      
      {/* 一体化横幅 - Header */}
      <Header />
      
      {/* 管理对象分组 - 添加日期和集团到标题右侧 */}
      <ManagementSection 
        title="管理对象"
        headerRight={
          <>
            <DateRangePicker />
            <GroupSelector />
          </>
        }
      >
        <div onClick={() => handleDrillDown('pressure-station')} style={{ cursor: 'pointer' }}>
          <StatsCards />
        </div>
      </ManagementSection>
      
      {/* 数据筛选 */}
      <DataFilter onFilterChange={handleFilterChange} />
      
      {/* 数据导出 */}
      <DataExport />
      
      {/* 地图展示 */}
      <GasMap />
      
      {/* 业务类型分组 - 添加日期和集团到标题右侧 */}
      <ManagementSection 
        title="业务类型"
        headerRight={
          <>
            <DateRangePicker />
            <GroupSelector />
          </>
        }
      >
        <div className="responsive-grid-2">
          {/* 第一列 */}
          <div className="space-y-6">
            <HazardGovernanceChart />
            <ConstructionCoordinationChart />
            <AnomalyManagementChart />
          </div>
          
          {/* 第二列 */}
          <div className="space-y-6">
            <MaintenanceCompletionChart />
            <LeakDetection />
          </div>
        </div>
      </ManagementSection>
      
      {/* 管理主体分组 - 放在最后 */}
      <ManagementSubject />
      
      {/* 底部留白 */}
      <div className="h-20"></div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
};

export default App;