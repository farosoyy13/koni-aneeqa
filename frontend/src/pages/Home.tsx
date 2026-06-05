import React, { useState, useEffect } from 'react';
import { initializeApp } from "https://gstatic.com";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://gstatic.com";

// 1️⃣ المحرك الرئيسي وقاعدة بيانات خوادم جوجل لحماية المتجر
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
  const [activeForm, setActiveForm] = useState('user'); // owner, admin, user
  const [currentTab, setCurrentTab] = useState('new');
  const [authError, setAuthError] = useState('');
  const [oathChecked, setOathChecked] = useState(false);
  const [showHeirOverlay, setShowHeirOverlay] = useState(false);
  const [userCount, setUserCount] = useState(278);
  const [showMessages, setShowMessages] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // تحديث عداد المتواجدين الآن تلقائياً لمواكبة الحركة الخليجية
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => Math.floor(Math.random() * (290 - 260 + 1)) + 260);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // مراقبة حالة الأذونات والصلاحيات الصارمة وحقن صوت الهيبة لصاحب الموقع
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === "fhoodii882771@gmail.com") {
        try {
          const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
          let osc = audioCtx.createOscillator();
          let gain = audioCtx.createGain();
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(80, audioCtx.currentTime);
          gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          setTimeout(() => { osc.stop(); }, 15000);
        } catch (e) { console.log("Audio ready"); }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    signInWithEmailAndPassword(auth, email, password)
      .catch(() => setAuthError("خطأ في بيانات الدخول المعتمدة أو الحساب غير موجود"));
  };

  const handleRegisterClick = () => {
    if (password.length < 6) return setAuthError("كلمة المرور يجب أن تكون 6 أحرف أو أكثر");
    createUserWithEmailAndPassword(auth, email, password)
      .catch(() => setAuthError("البريد الإلكتروني مستخدم سابقاً"));
  };

  const handlePublishClick = () => {
    if (!oathChecked) return alert("تنبيه أمني موجه: يجب عليكِ تفعيل مربع التعهد والقسم بالله العظيم أولاً لتنشيط زر النشر!");
    setShowHeirOverlay(true);
  };

  const openAdminWhatsapp = () => {
    const cat = (document.getElementById('post-cat-select') as HTMLSelectElement)?.value || '';
    const phone = (document.getElementById('post-phone-input') as HTMLInputElement)?.value || '';
    const details = (document.getElementById('post-details-input') as HTMLTextAreaElement)?.value || '';
    const duration = (document.getElementById('post-duration-select') as HTMLSelectElement)?.value || '';
    
    const msg = `مرحباً صاحب الموقع، قمت بأداء القسم ورفع طلب إعلان في منصة كوني أنيقة VIP وأرغب بالتفاهم معك مباشرة حول مدة العرض لتثبيته حياً.\n\n🗂️ التصنيف: ${cat}\n📞 رقم هاتف التواصل: ${phone}\n💬 تفاصيل الرسالة الخاصة والسعر: ${details}\n⏱️ مدة العرض المطلوبة: ${duration}`;
    window.open("https://wa.me" + encodeURIComponent(msg), "_blank");
  };

  // نظام تسجيل الخروج الفخم مع إشعار الوداع الأصيل
  const handleOwnerLogout = () => {
    setShowLogoutAlert(true);
    setTimeout(() => {
      signOut(auth).then(() => {
        window.location.reload();
      });
    }, 4000); // بقاء الرسالة لـ 4 ثوانٍ ليقرأها بوضوح
  };

  // 🚪 إذا لم يتم تسجيل الدخول، تظهر بوابة الحماية الفخمة
  if (!user) {
    return (
      <div style={{ background: '#0b0b0b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', boxSizing: 'border-box', direction: 'rtl' }}>
        <div style={{ background: '#161616', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: activeForm === 'owner' ? '2px solid #d4af37' : activeForm === 'admin' ? '1px solid #0056b3' : '1px solid #262626', transition: '0.4s ease' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#d4af37', fontSize: '26px', margin: '0 0 5px 0' }}>﷽</h2>
            <p style={{ color: '#666', fontSize: '12px', margin: '0' }}>منصة كوني أنيقة VIP الحصرية والمشفرة</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', justifyContent: 'center' }}>
            <button onClick={() => { setActiveForm('user'); setAuthError(''); }} style={{ flex: 1, padding: '10px', background: activeForm === 'user' ? '#fff' : '#222', color: activeForm === 'user' ? '#000' : '#aaa', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>👤 زائر / عضو</button>
            <button onClick={() => { setActiveForm('admin'); setAuthError(''); }} style={{ flex: 1, padding: '10px', background: activeForm === 'admin' ? '#007bff' : '#222', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>👮 المدراء</button>
            <button onClick={() => { setActiveForm('owner'); setAuthError(''); }} style={{ flex: 1, padding: '10px', background: activeForm === 'owner' ? '#d4af37' : '#222', color: activeForm === 'owner' ? '#000' : '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>👑 صاحب الموقع</button>
          </div>
          {activeForm === 'owner' && (
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ color: '#d4af37', fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0', textShadow: '0 0 15px rgba(212,175,55,0.4)' }}>⚜️ بَوَّابَةُ صَاحِبِ الْمَوْقِعِ الْمَلَكِيَّةِ ⚜️</h1>
              <p style={{ color: '#888', fontSize: '13px', marginBottom: '25px', lineHeight: '1.6' }}>مرحباً بك يا صاحب الموقع. هذه اللوحة مشفرة بأعلى معايير الأمان وحصرية تماماً لصلاحياتك المطلقة ورادار كاشف الرسائل.</p>
            </div>
          )}
          {activeForm === 'admin' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#007bff', fontSize: '20px', margin: '0 0 10px 0', fontWeight: 'bold' }}>⚜️ بوابة السادة المدراء والمشرفين ⚜️</h3>
              <p style={{ color: '#888', fontSize: '13px', marginBottom: '25px' }}>مرحباً بمشرفي ومراقبي المنصة الإعلانية. يرجى إدخال بريدك الإداري المعتمد لمتابعة العمليات.</p>
            </div>
          )}
          {activeForm === 'user' && (
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#fff', fontSize: '18px', margin: '0 0 10px 0' }}>تسجيل الدخول للمتجر</h3>
              <p style={{ color: '#888', fontSize: '13px', marginBottom: '25px' }}>يرجى تسجيل الدخول أو إنشاء حساب جديد لتصفح العبايات والبضائع الحصرية.</p>
            </div>
          )}
          <form onSubmit={handleLoginSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={activeForm === 'owner' ? "أدخل بريد صاحب الموقع السري..." : "البريد الإلكتروني..."} required style={{ width: '100%', padding: '14px', marginBottom: '15px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'right', boxSizing: 'border-box', outline: 'none' }} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور..." required style={{ width: '100%', padding: '14px', marginBottom: '20px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'right', boxSizing: 'border-box', outline: 'none' }} />
            <button type="submit" style={{ width: '100%', padding: '14px', background: activeForm === 'owner' ? '#d4af37' : activeForm === 'admin' ? '#007bff' : '#d4af37', color: (activeForm === 'owner' || activeForm === 'user') ? '#000' : '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              {activeForm === 'owner' ? '👑 الدخول الفخم للمنصة' : activeForm === 'admin' ? '🔒 دخول الإدارة الآمن' : 'تسجيل الدخول'}
            </button>
          </form>
          {activeForm === 'user' && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <button onClick={handleRegisterClick} style={{ width: '100%', padding: '14px', background: 'transparent', border: '1px solid #d4af37', borderRadius: '8px', color: '#d4af37', fontWeight: 'bold', cursor: 'pointer', marginBottom: '15px' }}>إنشاء حساب جديد</button>
              <span style={{ color: '#666', fontSize: '13px' }}>أو يمكنك التصفح السريع بدون حساب:</span>
              <button onClick={() => setUser({ email: 'guest@koni.com', isGuest: true })} style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontSize: '14px', marginTop: '10px', cursor: 'pointer' }}>👁️ تصفح كـ زائر مؤقت (محدود فقط)</button>
            </div>
          )}
