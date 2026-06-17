import React from 'react';

const Header: React.FC = () => {
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
      const dateString = year + ' ' + month + '/' + day;
      setCurrentDate(dateString);

      setTemperature('28.6°C');
    };

    updateTimeAndDate();
    const interval = setInterval(updateTimeAndDate, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="unified-banner">
      <div className="banner-left">
        <div className="logo-section">
          <img src="public/images/logo.PNG" alt="Logo" className="logo-image" />
        </div>
        
        <div className="time-section">
          <div className="time">{currentTime}</div>
          <div className="separator">|</div>
          <div className="date-temp">
            <div className="date">{currentDate}</div>
            <div className="temp">{temperature}</div>
          </div>
        </div>
      </div>
      
      <div className="banner-center">
        <h1 className="main-title">安全智慧管理平台</h1>
      </div>
      
      <div className="banner-right">
        <button className="report-btn">
          报告生成
          <svg className="arrow" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      <div className="wave-decoration"></div>
    </div>
  );
};

export default Header;