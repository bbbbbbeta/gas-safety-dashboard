import React, { useState, useEffect, useRef } from 'react';

interface DateRange {
  start: Date;
  end: Date;
  label: string;
}

const DateRangePicker: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    start: new Date(),
    end: new Date(),
    label: '今天'
  });
  const [customMode, setCustomMode] = useState(false);
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return year + '-' + month + '-' + day;
  };

  const calculateRange = (type: string): DateRange => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let start = new Date(today);
    let label = '';

    switch (type) {
      case 'today':
        label = '今天';
        break;
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        label = '昨天';
        break;
      case 'week':
        start.setDate(start.getDate() - 6);
        label = '近7日';
        break;
      case 'month':
        start.setDate(start.getDate() - 29);
        label = '近30日';
        break;
      case 'quarter':
        start.setDate(start.getDate() - 89);
        label = '近90日';
        break;
      case 'year':
        start = new Date(today.getFullYear(), 0, 1);
        label = '今年';
        break;
      default:
        label = '今天';
    }

    return { start, end: today, label };
  };

  const handlePresetClick = (type: string) => {
    const range = calculateRange(type);
    setSelectedRange(range);
    setCustomMode(false);
    setIsOpen(false);
  };

  const handleCustomConfirm = () => {
    if (customStart && customEnd) {
      const startDate = new Date(customStart);
      const endDate = new Date(customEnd);

      if (startDate > endDate) {
        alert('起始日期不能晚于结束日期!');
        return;
      }

      setSelectedRange({
        start: startDate,
        end: endDate,
        label: '自定义'
      });
      setCustomMode(false);
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && customMode) {
      setCustomStart(formatDate(selectedRange.start));
      setCustomEnd(formatDate(selectedRange.end));
    }
  }, [customMode, isOpen, selectedRange]);

  const presets = [
    { type: 'today', label: '今天' },
    { type: 'yesterday', label: '昨天' },
    { type: 'week', label: '近7日' },
    { type: 'month', label: '近30日' },
    { type: 'quarter', label: '近90日' },
    { type: 'year', label: '今年' }
  ];

  return (
    <div className="date-range-picker" ref={dropdownRef}>
      <button className="date-range-trigger" onClick={() => setIsOpen(!isOpen)}>
        <span>{formatDate(selectedRange.start)} — {formatDate(selectedRange.end)}</span>
        <svg className={`arrow ${isOpen ? 'rotated' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="date-range-dropdown">
          {!customMode ? (
            <>
              <div className="preset-section">
                <div className="section-title">快捷选择</div>
                <div className="preset-grid">
                  {presets.map((preset) => (
                    <button
                      key={preset.type}
                      className={`preset-btn ${selectedRange.label === preset.label ? 'active' : ''}`}
                      onClick={() => handlePresetClick(preset.type)}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="custom-section">
                <button className="custom-btn" onClick={() => setCustomMode(true)}>
                  自定义时间范围
                </button>
              </div>
            </>
          ) : (
            <div className="custom-date-input">
              <div className="section-title">自定义时间范围</div>
              <div className="date-inputs">
                <div className="date-input-group">
                  <label>起始日期</label>
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    max={customEnd || formatDate(new Date())}
                  />
                </div>
                <div className="date-separator">—</div>
                <div className="date-input-group">
                  <label>结束日期</label>
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    min={customStart}
                    max={formatDate(new Date())}
                  />
                </div>
              </div>
              <div className="custom-actions">
                <button className="cancel-btn" onClick={() => setCustomMode(false)}>
                  取消
                </button>
                <button className="confirm-btn" onClick={handleCustomConfirm}>
                  确认
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;