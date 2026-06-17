import React from 'react';

const TitleBanner: React.FC = () => {
  const [currentTime, setCurrentTime] = React.useState<string>('');
  const [currentDate, setCurrentDate] = React.useState<string>('');
  const [temperature, setTemperature] = React.useState<string>('');

  React.useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timeString = hours + ':' + minutes;
      setCurrentTime(timeString);

      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const dateString = year + '/' + month + '/' + day;
      setCurrentDate(dateString);

      setTemperature('28.6°C');
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="title-banner">
      <div className="banner-content">
        <h1 className="banner-title">安全智慧管理平台</h1>
      </div>
      
      {/* 左下角搜索框 */}
      <div className="banner-search">
        <input 
          type="text" 
          className="search-input"
          placeholder="搜索..."
        />
      </div>
      
      {/* 右侧时间和温度区域 */}
      <div className="banner-time-info">
        <div className="time-display-large">{currentTime}</div>
        <div className="date-temp-wrapper">
          <div className="date-display-small">{currentDate}</div>
          <div className="temp-display-large">{temperature}</div>
        </div>
      </div>
      
      {/* 右侧功能按钮 */}
      <div className="banner-actions">
        <button className="action-btn primary">
          <span>报告生成</span>
          <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        
        <div className="date-range">
          2025-08-08 — 2025-08-08
        </div>
        
        <button className="action-btn secondary">
          集团
        </button>
      </div>
      
      {/* 底部波浪装饰 */}
      <div className="banner-wave"></div>
    </div>
  );
};

export default TitleBanner;
