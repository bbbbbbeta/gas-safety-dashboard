import React, { useState, useEffect } from 'react';
import { Bell, AlertTriangle, X, CheckCircle } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'error' | 'info';
  message: string;
  time: string;
  location: string;
}

const RealTimeAlert: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // 模拟实时告警推送
    const mockAlerts: Alert[] = [
      {
        id: 1,
        type: 'error',
        message: '调压箱异常告警',
        time: new Date().toLocaleTimeString(),
        location: '朝阳区一片3号调压箱'
      },
      {
        id: 2,
        type: 'warning',
        message: '管线压力异常',
        time: new Date().toLocaleTimeString(),
        location: '海淀区二片管线K12+300'
      },
      {
        id: 3,
        type: 'info',
        message: '施工配合提醒',
        time: new Date().toLocaleTimeString(),
        location: '丰台区四片施工区域'
      }
    ];

    setAlerts(mockAlerts);
    setUnreadCount(mockAlerts.length);

    // 模拟每30秒接收新告警
    const interval = setInterval(() => {
      const newAlert: Alert = {
        id: Date.now(),
        type: Math.random() > 0.5 ? 'warning' : 'error',
        message: Math.random() > 0.5 ? '新异常告警' : '设备离线告警',
        time: new Date().toLocaleTimeString(),
        location: '实时监测点'
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 10));
      setUnreadCount(prev => prev + 1);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const markAsRead = (id: number) => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const clearAll = () => {
    setAlerts([]);
    setUnreadCount(0);
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getAlertBg = (type: string) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="fixed top-4 right-20 z-50">
      {/* 告铃铛 */}
      <button
        onClick={() => setShowAlerts(!showAlerts)}
        className="relative p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      >
        <Bell className="w-6 h-6 text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* 告警列表 */}
      {showAlerts && (
        <div className="absolute right-0 top-14 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-50 to-white">
            <h3 className="font-bold text-gray-800">实时告警</h3>
            <button
              onClick={clearAll}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              清空全部
            </button>
          </div>
          
          <div className="overflow-y-auto max-h-80">
            {alerts.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <CheckCircle className="w-12 h-12 mx-auto mb-2 text-green-500" />
                <p>暂无告警信息</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 border-b ${getAlertBg(alert.type)} hover:bg-opacity-80 transition-all cursor-pointer`}
                  onClick={() => markAsRead(alert.id)}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-800 text-sm">{alert.message}</h4>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{alert.location}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RealTimeAlert;
