import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OwnerRoom from './components/OmnerRoom'; // تم ضبظ المسار ليقرأ من مجلد المكونات وبنفس الاسم الحالي
import ProtectedRoute from './ProtectedRoute';

// مكون واجهة المتجر الرئيسية للزوار
const StoreFront = () => (
  <div style={{ textAlign: 'center', padding: '100px 20px', direction: 'rtl', fontFamily: '"Cairo", sans-serif' }}>
    <h1 style={{ color: '#2c3e50', fontSize: '36px' }}>مرحباً بك في متجر أناقة CHIC 👗✨</h1>
    <p style={{ color: '#7f8c8d', fontSize: '18px' }}>الموقع يعمل بنجاح ومرفوع بالكامل.</p>
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

        {/* 3. غرفة المالك السرية المحمية بحارس الأمان */}
        <Route 
          path="/owner-room" 
          element={
            <ProtectedRoute>
              <OwnerRoom />
            </ProtectedRoute>
          } 
        />

        {/* 4. حماية تلقائية لأي مسار عشوائي */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
