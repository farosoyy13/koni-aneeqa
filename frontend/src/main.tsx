import React, { useState, useEffect } from 'react';

export default function App() {
  // الحالات الأساسية
  const [userRole, setUserRole] = useState<null | 'owner' | 'supervisor' | 'regular' | 'visitor'>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  // تحديث الاسم الجديد
  const [marqueeText] = useState('✨ أهلاً بكِ في أناقة CHIC | تصفحي أرقى الفساتين والعبايات الحصرية - جودة تليق بذوقك الرفيع ✨');

  const handleLogin = (role: 'owner' | 'supervisor' | 'regular') => {
    if (!email || !password) {
      setAuthError('تنبيه: يرجى كتابة البيانات المطلوبة 🔒');
      return;
    }
    
    if (role === 'owner' && email === 'fhoodii882771@gmail.com' && password === 'fhoodii123') {
      setUserRole('owner');
      setAuthError('');
    } else if (role === 'supervisor' && email.includes('admin')) {
      setUserRole('supervisor');
    } else {
      setAuthError('بيانات الدخول غير صحيحة أو لا تملك الصلاحية.');
    }
  };

  // لوحة الدخول المحدثة
  if (!userRole) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', direction: 'rtl', fontFamily: 'sans-serif', color: '#fff' }}>
        <div style={{ width: '100%', maxWidth: '500px', background: '#0b0b0b', border: '1px solid #d4af37', borderRadius: '24px', padding: '40px', textAlign: 'center' }}>
          <h1 style={{ color: '#d4af37', fontSize: '32px', marginBottom: '30px' }}>⚜️ أناقة CHIC ⚜️</h1>
          
          <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '10px', background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', boxSizing: 'border-box' }} />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', marginBottom: '20px', background: '#111', border: '1px solid #333', borderRadius: '12px', color: '#fff', boxSizing: 'border-box' }} />
          
          <button onClick={() => handleLogin('owner')} style={{ width: '100%', padding: '15px', background: '#d4af37', color: '#000', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }}>دخول المالك الملكي</button>
          
          {authError && <p style={{ color: '#ff4a4a', marginTop: '15px' }}>{authError}</p>}
        </div>
      </div>
    );
  }

  // الواجهة الرئيسية
  return (
    <div style={{ background: '#050505', minHeight: '100vh', color: '#fff', direction: 'rtl', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#d4af37', color: '#000', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
        {marqueeText}
      </div>
      
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h2 style={{ color: '#d4af37' }}>أهلاً بك في لوحة تحكم أناقة CHIC</h2>
        <p>نحن فخورون بوجودك معنا اليوم.</p>
      </div>
    </div>
  );
}
