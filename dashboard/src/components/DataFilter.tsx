import React, { useState } from 'react';
import { Calendar, MapPin, Filter } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  region: string;
  startDate: string;
  endDate: string;
}

const DataFilter: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<FilterState>({
    region: 'all',
    startDate: '',
    endDate: ''
  });

  const regions = [
    { value: 'all', label: '全部区域' },
    { value: 'piece1', label: '一片' },
    { value: 'piece2', label: '二片' },
    { value: 'piece3', label: '三片' },
    { value: 'piece4', label: '四片' },
    { value: 'piece5', label: '五片' }
  ];

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="chart-panel p-4 mb-6">
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-blue-600 font-bold">
          <Filter className="w-5 h-5" />
          <span>数据筛选</span>
        </div>
        
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-500" />
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {regions.map(region => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-500" />
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <span className="text-gray-500">至</span>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={() => {
            const resetFilters = { region: 'all', startDate: '', endDate: '' };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          重置
        </button>
      </div>
    </div>
  );
};

export default DataFilter;
