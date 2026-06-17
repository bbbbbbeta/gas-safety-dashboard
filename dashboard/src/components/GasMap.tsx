import React, { useState } from 'react';
import { Map, MapPin, Layers } from 'lucide-react';

const GasMap: React.FC = () => {
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'heatmap'>('standard');
  const [showLayers, setShowLayers] = useState({
    pipeline: true,
    station: true,
    valve: true,
    risk: false
  });

  // 模拟燃气管网数据
  const pipelineData = [
    { id: 1, name: '主干管线A', status: 'normal', length: 45.2 },
    { id: 2, name: '主干管线B', status: 'warning', length: 38.7 },
    { id: 3, name: '支线管线C', status: 'normal', length: 22.1 }
  ];

  const stationData = [
    { id: 1, name: '1号调压站', type: 'station', status: 'normal' },
    { id: 2, name: '2号调压站', type: 'station', status: 'normal' },
    { id: 3, name: '3号调压箱', type: 'box', status: 'warning' }
  ];

  return (
    <div className="chart-panel p-4 mb-6">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-blue-600 font-bold">
            <Map className="w-5 h-5" />
            <span>燃气管网地图</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setMapType('standard')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                mapType === 'standard' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              标准地图
            </button>
            <button
              onClick={() => setMapType('satellite')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                mapType === 'satellite' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              卫星地图
            </button>
            <button
              onClick={() => setMapType('heatmap')}
              className={`px-3 py-1 rounded-lg text-sm transition-all ${
                mapType === 'heatmap' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              热力图
            </button>
          </div>
        </div>

        {/* 图层控制 */}
        <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
          <Layers className="w-4 h-4 text-gray-600" />
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLayers.pipeline}
              onChange={(e) => setShowLayers({...showLayers, pipeline: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm">管线</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLayers.station}
              onChange={(e) => setShowLayers({...showLayers, station: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm">站点</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLayers.valve}
              onChange={(e) => setShowLayers({...showLayers, valve: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm">阀门</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showLayers.risk}
              onChange={(e) => setShowLayers({...showLayers, risk: e.target.checked})}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-sm">风险区域</span>
          </label>
        </div>
      </div>

      {/* 地图容器 */}
      <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden" style={{ height: '500px' }}>
        {/* 模拟地图背景 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600 font-semibold mb-2">燃气管网分布图</p>
            <p className="text-sm text-gray-500">此处将集成百度/高德地图API</p>
            <p className="text-xs text-gray-400 mt-2">显示管线、调压站、闸井、阀门等设施位置</p>
          </div>
        </div>

        {/* 图例 */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
          <h4 className="text-sm font-bold text-gray-700 mb-2">图例</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-xs">正常管线</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-xs">预警管线</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-xs">异常站点</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-xs">正常站点</span>
            </div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="absolute top-4 right-4 bg-white bg-opacity-90 p-3 rounded-lg shadow-lg">
          <h4 className="text-sm font-bold text-gray-700 mb-2">管网统计</h4>
          <div className="space-y-1 text-xs">
            <div>管线总数: <span className="font-bold text-blue-600">910.218 km</span></div>
            <div>调压站: <span className="font-bold text-blue-600">5 座</span></div>
            <div>调压箱: <span className="font-bold text-blue-600">566 座</span></div>
            <div>闸井: <span className="font-bold text-blue-600">654 座</span></div>
          </div>
        </div>
      </div>

      {/* 管线列表 */}
      <div className="mt-4">
        <h4 className="text-sm font-bold text-gray-700 mb-2">管线详情</h4>
        <div className="grid grid-cols-3 gap-2">
          {pipelineData.map(pipeline => (
            <div
              key={pipeline.id}
              className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{pipeline.name}</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  pipeline.status === 'normal' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {pipeline.status === 'normal' ? '正常' : '预警'}
                </span>
              </div>
              <div className="text-xs text-gray-600">长度: {pipeline.length} km</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GasMap;
