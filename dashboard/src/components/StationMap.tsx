import React, { useEffect, useRef, useState } from 'react';

// 高德地图API Key - 请替换为您自己的Key
const AMAP_KEY = 'df828ff8e58c9eaa82954a53c3f22736';

interface Station {
  id: number;
  name: string;
  lng: number;
  lat: number;
  status: 'normal' | 'warning';
}

const StationMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  const stations: Station[] = [
    { id: 1, name: '亦庄站', lng: 116.506, lat: 39.795, status: 'normal' },
    { id: 2, name: '大兴站', lng: 116.338, lat: 39.726, status: 'normal' },
    { id: 3, name: '天通苑站', lng: 116.424, lat: 40.070, status: 'warning' },
    { id: 4, name: '望京站', lng: 116.480, lat: 39.996, status: 'normal' },
    { id: 5, name: '通州站', lng: 116.656, lat: 39.902, status: 'normal' }
  ];

  useEffect(() => {
    let isMounted = true;
    
    // 动态加载高德地图脚本
    const loadAMapScript = () => {
      return new Promise<void>((resolve, reject) => {
        if ((window as any).AMap) {
          resolve();
          return;
        }

        const script = document.createElement('script');
        script.src = `https://webapi.amap.com/maps?v=2.0&key=${AMAP_KEY}`;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load AMap script'));
        document.head.appendChild(script);
      });
    };

    loadAMapScript()
      .then(() => {
        if (!isMounted || !mapRef.current || !(window as any).AMap) return;
        
        const AMap = (window as any).AMap;
        
        // 初始化地图
        const map = new AMap.Map(mapRef.current, {
          zoom: 10,
          center: [116.407, 39.904],
          viewMode: '2D'
        });
        
        mapInstanceRef.current = map;

        // 添加标记点
        stations.forEach((station) => {
          const marker = new AMap.Marker({
            position: [station.lng, station.lat],
            title: station.name,
            content: `
              <div style="
                background: ${station.status === 'warning' ? '#f59e0b' : '#10b981'};
                color: white;
                padding: 8px 12px;
                border-radius: 20px;
                font-weight: bold;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                border: 2px solid white;
              ">
                ${station.id}
              </div>
            `,
            offset: new AMap.Pixel(-20, -20)
          });

          // 添加信息窗口
          const infoWindow = new AMap.InfoWindow({
            content: `
              <div style="padding: 8px;">
                <div style="font-weight: bold; margin-bottom: 4px;">${station.name}</div>
                <div style="font-size: 12px; color: ${station.status === 'warning' ? '#f59e0b' : '#10b981'};">
                  状态: ${station.status === 'warning' ? '预警' : '正常'}
                </div>
              </div>
            `,
            offset: new AMap.Pixel(0, -30)
          });

          marker.on('click', () => {
            infoWindow.open(map, marker.getPosition());
          });

          map.add(marker);
        });

        // 自适应显示所有标记点
        map.setFitView(null, false, [50, 50, 50, 50]);
        
        if (isMounted) {
          setMapLoaded(true);
        }
      })
      .catch((error) => {
        console.error('Error loading AMap:', error);
      });

    return () => {
      isMounted = false;
      // 使用高德地图的destroy方法清理
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <div className="chart-panel mb-6">
      <h3 className="chart-title mb-4">调压站分布地图</h3>
      
      <div className="station-map-container">
        <div ref={mapRef} className="amap-container">
          {!mapLoaded && (
            <div className="map-loading">
              <div className="loading-spinner"></div>
              <p>地图加载中...</p>
            </div>
          )}
        </div>
        
        <div className="map-legend">
          <div className="legend-item-map">
            <span className="legend-marker marker-normal"></span>
            <span>正常</span>
          </div>
          <div className="legend-item-map">
            <span className="legend-marker marker-warning"></span>
            <span>预警</span>
          </div>
        </div>
      </div>
      
      <div className="station-list mt-4">
        <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">站点详情:</div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {stations.map((station) => (
            <div key={station.id} className={`station-item ${station.status}`}>
              <span className="station-id">{station.id}</span>
              <span className="station-name">{station.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StationMap;