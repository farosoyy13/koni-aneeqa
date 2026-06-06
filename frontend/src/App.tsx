import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage'; // تم تحديث المسار السري هنا ليدخل مجلد pages
import ProtectedRoute from './ProtectedRoute';

// مكون مؤقت لواجهة المتجر الرئيسية
const StoreFront = () => (
  <div style={{ textAlign: 'center', padding: '100px 20px', direction: 'rtl', fontFamily: '"Cairo", sans-serif' }}>
    <h1 style={{ color: '#2c3e50', fontSize: '36px' }}>مرحباً بك في متجر أناقة CHIC 👗✨</h1>
    <p style={{ color: '#7f8c8d', fontSize: '18px' }}>الموقع يعمل بنجاح ومرفوع بالكامل.</p>
  </div>
);

// مكون مؤقت لغرفة المالك - سنقوم بإنشاء ملفها المستقل الفخم في الخطوة القادمة
const OwnerRoomPlaceholder = () => (
  <div style={{ textAlign: 'center', padding: '100px 20px', direction: 'rtl', fontFamily: '"Cairo", sans-serif' }}>
    <h1 style={{ color: '#27ae60' }}>👑 مرحباً بك في غرفة المالك السرية</h1>
    <p>هذه اللوحة محمية بزلازل الطاقة ولا يراها غيرك.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* 1. الواجهة الرئيسية للمتجر للزوار */}
        <Route path="/" element={<StoreFront />} />

        {/* 2. بوابة تسجيل الدخول الملكية والزلزالية */}
        <Route path="/login" element={<LoginPage />} />

        {/* 3. غرفة المالك المحمية بحارس الأمان */}
        <Route 
          path="/owner-room" 
          element={
            <ProtectedRoute>
              <OwnerRoomPlaceholder />
            </ProtectedRoute>
          } 
        />

        {/* 4. حماية تلقائية لأي مسار عشوائي */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
