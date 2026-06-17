import React from 'react';
import { Download, FileText, FileSpreadsheet } from 'lucide-react';

const DataExport: React.FC = () => {
  const exportToExcel = () => {
    // 模拟导出数据
    const data = [
      ['区域', '调压站', '调压箱', '闸井', '管线(km)', '异常数'],
      ['一片', 1, 113, 130, 182.04, 0],
      ['二片', 1, 113, 131, 182.04, 1],
      ['三片', 1, 113, 131, 182.04, 0],
      ['四片', 1, 113, 131, 182.04, 1],
      ['五片', 1, 114, 131, 182.06, 1]
    ];

    // 转换为CSV格式
    const csvContent = data.map(row => row.join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `燃气安全数据_${new Date().toLocaleDateString()}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    // 模拟PDF导出
    alert('PDF导出功能需要后端支持，当前为演示模式');
    // 实际项目中可以使用 jsPDF 或 html2pdf.js 库
  };

  return (
    <div className="chart-panel p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-blue-600 font-bold">
          <Download className="w-5 h-5" />
          <span>数据导出</span>
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:shadow-lg hover:scale-105"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>导出Excel</span>
          </button>
          
          <button
            onClick={exportToPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all hover:shadow-lg hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>导出PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataExport;
