import React from 'react';

const RiskCloudMap: React.FC = () => {
  return (
    <div className="risk-cloud-section p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-yellow-600">风险云图</h2>
      </div>
      <div className="bg-white bg-opacity-80 rounded-lg p-8 text-center text-gray-500">
        <div className="text-lg">地图展示区域</div>
        <div className="text-sm mt-2">（此处可集成地图组件显示风险分布）</div>
      </div>
    </div>
  );
};

export default RiskCloudMap;
