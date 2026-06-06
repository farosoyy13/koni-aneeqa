import React from 'react';

const OwnerDashboard: React.FC = () => {
  return (
    <div className="owner-dashboard p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">لوحة تحكم أناقة CHIC</h1>
      <p className="mb-6">أهلاً بك في غرفة الإدارة، يمكنك هنا متابعة الطلبات وإدارة الموقع.</p>
      
      <nav className="flex gap-4">
        <button 
          className="bg-blue-600 px-4 py-2 rounded"
          onClick={() => console.log('الطلبات')}
        >
          الطلبات
        </button>
        <button 
          className="bg-green-600 px-4 py-2 rounded"
          onClick={() => console.log('المشرفون')}
        >
          المشرفون
        </button>
      </nav>
    </div>
  );
};

export default OwnerDashboard;
