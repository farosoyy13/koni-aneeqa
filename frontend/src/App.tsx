import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OwnerRoom from './components/OmnerRoom';
import ProtectedRoute from './ProtectedRoute';
import { db } from './firebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';

// مكون واجهة المتجر الرئيسية للزوار متضمنة الشريط الإعلاني المتحرك الملكي
const StoreFront = () => {
  const [tickerText, setTickerText] = useState('');

  useEffect(() => {
    // الاستماع الفوري لشريط الإعلانات في قاعدة البيانات
    const unsubscribe = onSnapshot(doc(db, 'system_settings', 'announcement'), (docSnap) => {
      if (docSnap.exists()) {
        setTickerText(docSnap.data().text || '');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div style={{ direction: 'rtl', fontFamily: '"Cairo", sans-serif' }}>
      
      {/* 📢 شريط الإعلان الملكي المتحرك - يظهر فقط إذا قمت بكتابة إعلان في غرفتك الخاصة */}
      {tickerText && (
        <div style={{ background: '#d4af37', color: '#000', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999, fontWeight: 'bold', fontSize: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)', borderBottom: '2px solid #000' }}>
          <marquee behavior="scroll" direction="right" scrollamount="6">
            ✨ {tickerText} ✨ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✨ {tickerText} ✨ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ✨ {tickerText} ✨
          </marquee>
        </div>
      )}

      {/* باقي واجهة المتجر للزوار */}
      <div style={{ textAlign: 'center', padding: tickerText ? '150px 20px 10px 20px' : '100px 20px' }}>
        <h1 style={{ color: '#2c3e50', fontSize: '36px' }}>مرحباً بك في متجر أناقة CHIC 👗✨</h1>
        <p style={{ color: '#7f8c8d', fontSize: '18px' }}>الموقع يعمل بنجاح ومرفوع بالكامل.</p>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route path="/login" element={<LoginPage />} />
        <Route 
          path="/owner-room" 
          element={
            <ProtectedRoute>
              <OwnerRoom />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
