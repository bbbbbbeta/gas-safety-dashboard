import React, { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';

const FullscreenToggle: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error('全屏模式失败:', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  return (
    <button
      onClick={toggleFullscreen}
      className="fixed top-4 left-4 z-50 p-3 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      aria-label={isFullscreen ? '退出全屏' : '全屏模式'}
    >
      {isFullscreen ? (
        <Minimize2 className="w-6 h-6 text-gray-700" />
      ) : (
        <Maximize2 className="w-6 h-6 text-gray-700" />
      )}
    </button>
  );
};

export default FullscreenToggle;
