import React from 'react';

export function AdminDashboard() {
  return (
    <div style={{ 
      padding: '32px', 
      backgroundColor: '#050505', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'sans-serif' 
    }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#d4af37' }}>
        غرفة العمليات المركزية
      </h1>
      <p style={{ marginTop: '16px' }}>
        أهلاً بك يا صاحب الموقع. كل شيء هنا تحت تصرفك.
      </p>
      <div style={{ 
        marginTop: '20px', 
        padding: '16px', 
        border: '1px solid #d4af37', 
        borderRadius: '8px' 
      }}>
        <p>الوضع: الحماية نشطة.</p>
        <p>هذه الصفحة محجوبة عن أي شخص غيرك.</p>
      </div>
    </div>
  );
}
