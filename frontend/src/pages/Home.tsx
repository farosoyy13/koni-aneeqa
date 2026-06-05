import React, { useState, useEffect } from 'react';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkPWGfxXRaZJ7rdpWIs-Y3647V877p7vU",
  authDomain: "://firebaseapp.com",
  projectId: "koni-aniqa",
  storageBucket: "://appspot.com",
  messagingSenderId: "350938973339",
  appId: "1:350938973339:web:cee80346157e4f721a323e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeForm, setActiveForm] = useState('user');
  const [authError, setAuthError] = useState('');

  // تشغيل الموسيقى التلقائية عند الدخول
  useEffect(() => {
    const audio = new Audio('/theme.mp3'); 
    audio.loop = true;
    audio.play().catch(() => console.log("بانتظار تفاعل المستخدم"));
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch(() => setAuthError("بيانات الدخول غير صحيحة"));
  };

  if (!user) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', padding: '20px', direction: 'rtl', fontFamily: 'sans-serif', color: '#fff' }}>
        {/* العرش - دخول المالك (أعلى الصفحة، فخم جداً) */}
        <div style={{ background: 'linear-gradient(135deg, #000, #1a1a1a)', border: '4px solid #d4af37', padding: '40px', borderRadius: '30px', textAlign: 'center', marginBottom: '40px', boxShadow: '0 0 50px rgba(212,175,55,0.5)' }}>
          <h1 style={{ color: '#d4af37', fontSize: '36px', margin: 0 }}>👑 عرش المالك الملكي</h1>
          <p style={{ fontSize: '18px', marginTop: '10px' }}>الدخول الحصري لصاحب الموقع</p>
        </div>

        {/* نموذج الدخول الفاخر */}
        <div style={{ maxWidth: '500px', margin: '0 auto', background: '#111', padding: '40px', borderRadius: '25px', border: '1px solid #333' }}>
          <h2 style={{ color: '#d4af37', textAlign: 'center' }}>تسجيل الدخول الفاخر</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
            <input type="email" placeholder="البريد الإلكتروني الرسمي..." onChange={(e) => setEmail(e.target.value)} style={{ padding: '20px', borderRadius: '15px', background: '#222', color: '#fff', border: '1px solid #444', fontSize: '16px' }} />
            <input type="password" placeholder="كلمة المرور..." onChange={(e) => setPassword(e.target.value)} style={{ padding: '20px', borderRadius: '15px', background: '#222', color: '#fff', border: '1px solid #444', fontSize: '16px' }} />
            <button type="submit" style={{ padding: '20px', background: '#d4af37', borderRadius: '15px', fontWeight: 'bold', fontSize: '18px', cursor: 'pointer', color: '#000' }}>دخول المنصة</button>
          </form>
          {authError && <p style={{ color: '#ff4a4a', textAlign: 'center', marginTop: '10px' }}>{authError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff', direction: 'rtl' }}>
      {/* شريط الإعلان عن دخول المالك */}
      <marquee style={{ background: '#d4af37', color: '#000', padding: '15px', fontSize: '20px', fontWeight: 'bold' }}>
        👑 تنبيه رسمي: صاحب الموقع متواجد الآن! لمراسلة خاصة أو استفسار يرجى التوجه لغرفة صاحب الموقع الخاصة.
      </marquee>
      
      <div style={{ padding: '40px', textAlign: 'center' }}>
        <h1 style={{ color: '#d4af37', fontSize: '45px' }}>أناقة CHIC</h1>
        
        {/* المربعات الفاخرة */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px', padding: '0 20px' }}>
          <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '25px', border: '2px solid #d4af37', cursor: 'pointer' }}>
            <h3 style={{ fontSize: '24px' }}>غرفة المالك الخاصة</h3>
            <p>للتواصل المباشر والإدارة الفورية</p>
          </div>
          <div style={{ background: '#1a1a1a', padding: '40px', borderRadius: '25px', border: '2px solid #333', cursor: 'pointer' }}>
            <h3 style={{ fontSize: '24px' }}>أعلن معنا</h3>
            <p>مساحة إعلانية فاخرة لكبار العملاء</p>
          </div>
        </div>
      </div>
    </div>
  );
}
