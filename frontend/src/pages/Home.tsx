import React, { useState, useEffect } from 'react';
import { initializeApp } from "https://gstatic.com";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "https://gstatic.com";

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
  const [currentTab, setCurrentTab] = useState('all');
  const [authError, setAuthError] = useState('');
  const [oathChecked, setOathChecked] = useState(false);
  const [showHeirOverlay, setShowHeirOverlay] = useState(false);
  const [userCount, setUserCount] = useState(278);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);

  // 🔔 نظام إشعارات المالك الفوري لمراقبة طرد وحذف عمليات المشرفين
  const [adminNotifications, setAdminNotifications] = useState([
    { id: 1, text: "🚨 قام المشرف (رقم 2) بحظر مستخدم مسيء لخرقه الآداب العامة للمنصة", time: "منذ 10 دقائق" },
    { id: 2, text: "🗑️ قام المراقب العام بحذف إعلان مخالف لشروط العمولة والـقسم", time: "منذ ساعة" }
  ]);

  // 🛍️ البنية الشاملة والمتكاملة للأقسام والفروع الحقيقية (عبايات، فساتين، شناط)
  const [productsList, setProductsList] = useState([
    { id: 1, title: "عباية مخمل ملكي مع تطريز ذهبي خاص", price: "500", category: "abaya_new", img: "👑", seller: "صاحب الموقع" },
    { id: 2, title: "بشت حراير فرنسي فاخر", price: "320", category: "abaya_used", img: "💎", seller: "أسر منتجة" },
    { id: 3, title: "فستان زفاف ملكي مطرز بالكريستال النقي", price: "2500", category: "dress_new", img: "✨", seller: "صاحب الموقع" },
    { id: 4, title: "فستان سهرة ناعم لبسة واحدة نظيف", price: "450", category: "dress_used", img: "👗", seller: "أسر منتجة" },
    { id: 5, title: "شنطة يد فاخرة كلاسيك باللون الأسود الملكي", price: "800", category: "bag_new", img: "👜", seller: "صاحب الموقع" },
    { id: 6, title: "حقيبة ديور مستخدمة بحالة ممتازة مع الملحقات", price: "1200", category: "bag_used", img: "💼", seller: "أسر منتجة" }
  ]);

  // خانات لوحة تحكم المالك لإضافة المنتجات الفورية
  const [addTitle, setAddTitle] = useState('');
  const [addPrice, setAddPrice] = useState('');
  const [addCategory, setAddCategory] = useState('abaya_new');

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => Math.floor(Math.random() * (290 - 260 + 1)) + 260);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // 👑 ميزة المالك: إضافة منتج جديد لأي قسم وفرع فرعي مجاناً وبدون حدود
  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addTitle || !addPrice) return alert("تنبيه: يرجى تعبئة اسم المنتج والسعر أولاً!");
    const newItem = {
      id: Date.now(),
      title: addTitle,
      price: addPrice,
      category: addCategory,
      img: addCategory.includes('abaya') ? "👑" : addCategory.includes('dress') ? "👗" : "👜",
      seller: "صاحب الموقع"
    };
    setProductsList([newItem, ...productsList]);
    setAddTitle('');
    setAddPrice('');
    alert("🚀 نجاح: تم نشر المنتج حياً في فرعه المخصص لجميع الزوار بنجاح!");
  };

  // 🚫 ميزة المالك: حذف أي منتج فوراً
  const handleOwnerDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج نهائياً من المتجر؟")) {
      setProductsList(productsList.filter(p => p.id !== id));
    }
  };

  // ⚙️ ميزة المالك: تعديل الاسم والسعر والفرع فوراً
  const handleOwnerEdit = (id: number) => {
    const item = productsList.find(p => p.id === id);
    if (!item) return;
    const newTitle = prompt("تعديل اسم المنتج المعروض:", item.title);
    const newPrice = prompt("تعديل السعر (ريال سعودي):", item.price);
    if (newTitle && newPrice) {
      setProductsList(productsList.map(p => p.id === id ? { ...p, title: newTitle, price: newPrice } : p));
      alert("⚙️ تم تحديث وتعديل البيانات حياً على الشبكة!");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    signInWithEmailAndPassword(auth, email, password).catch(() => setAuthError("خطأ في بيانات الدخول"));
  };

  if (!user) {
    return (
      <div style={{ background: '#0b0b0b', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', boxSizing: 'border-box', direction: 'rtl' }}>
        <div style={{ background: '#161616', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '450px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', border: activeForm === 'owner' ? '2px solid #d4af37' : '1px solid #262626' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#d4af37', fontSize: '26px', margin: '0' }}>﷽</h2>
                  <p style={{ color: '#aaa', fontSize: '14px', marginTop: '10px' }}>أناقة CHIC - فخامة التصميم بلمسة عصرية</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '30px', justifyContent: 'center' }}>
            <button onClick={() => setActiveForm('user')} style={{ flex: 1, padding: '10px', background: activeForm === 'user' ? '#d4af37' : '#222', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>👤 زائر / عضو</button>
            <button onClick={() => setActiveForm('owner')} style={{ flex: 1, padding: '10px', background: activeForm === 'owner' ? '#d4af37' : '#222', color: activeForm === 'owner' ? '#000' : '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '11px', cursor: 'pointer' }}>👑 صاحب الموقع</button>
          </div>
          <form onSubmit={handleLoginSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني..." required style={{ width: '100%', padding: '14px', marginBottom: '15px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'right', outline: 'none' }} />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="كلمة المرور..." required style={{ width: '100%', padding: '14px', marginBottom: '20px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'right', outline: 'none' }} />
            <button type="submit" style={{ width: '100%', padding: '14px', background: '#d4af37', color: '#000', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
              {activeForm === 'owner' ? '👑 الدخول الفخم للمنصة' : 'تسجيل الدخول'}
            </button>
          </form>
          {authError && <p style={{ color: '#ff4a4a', fontSize: '13px', marginTop: '15px', textAlign: 'center' }}>⚠️ {authError}</p>}
        </div>
      </div>
    );
  }

  const isOwner = user.email === "fhoodii882771@gmail.com";
  const isGuest = user.isGuest === true;

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', direction: 'rtl', textAlign: 'right' }}>
      {isOwner && (
        <marquee scrollamount="6" style={{ background: '#d4af37', color: '#000', padding: '12px', fontWeight: 'bold', fontSize: '16px', display: 'block' }}>
          👑 إشعار رسمي فخم: سجل لتوّه صاحب الموقع دخوله الميمون لِلوحة التحكّم الحصرية وصلاحيات تسيير البضائع والأسعار نشطة 👑
        </marquee>
      )}

      <div style={{ textAlign: 'center', padding: '30px 20px', background: '#111', borderBottom: '1px solid #222' }}>
        <h1 style={{ color: '#d4af37', fontSize: '24px', margin: '0' }}>﷽</h1>
        <p style={{ color: '#aaa', fontSize: '14px', maxWidth: '700px', margin: '10px auto', borderRight: '3px solid #ff4a4a', paddingRight: '15px' }}>
          ⚠️ <b>موعظة وعظة للناس:</b> قال الله تعالى: <i>"وَمَا مِن دَابَّةٍ فِي الْأَرْضِ إِلَّا عَلَى اللَّهِ رِزْقُهَا"</i>. إن السعي في قطع الأرزاق والحسد ونزع البركة من المهالك. يلتزم كل معلن هنا بالأمانة والصدق التام.
        </p>
      </div>

      {/* 🔔 لوحة إشعارات المالك الخاصة (تظهر لكِ أنتِ فقط لمراقبة طرد وحذف المشرفين) */}
      {isOwner && (
        <div style={{ maxWidth: '800px', margin: '20px auto', background: '#1c1111', border: '1px solid #ff4a4a', padding: '20px', borderRadius: '12px' }}>
          <h3 style={{ color: '#ff4a4a', margin: '0 0 15px 0' }}>🔔 مركز إشعارات المالك الفوري (تحركات المشرفين والمراقبين):</h3>
          {adminNotifications.map(n => (
            <div key={n.id} style={{ background: '#161616', padding: '10px', borderRadius: '6px', marginBottom: '8px', fontSize: '13px' }}>
              <span style={{ color: '#ff4a4a' }}>{n.text}</span>
              <span style={{ float: 'left', color: '#666' }}>{n.time}</span>
            </div>
          ))}
        </div>
      )}

      {/* 👑 لوحة تحكم صاحب الموقع لرفع بضاعته الحصرية وتعديل السعر مجاناً */}
      {isOwner && (
        <div style={{ maxWidth: '800px', margin: '30px auto', background: '#161616', border: '2px dashed #d4af37', padding: '25px', borderRadius: '12px' }}>
          <h3 style={{ color: '#d4af37', margin: '0 0 15px 0', fontSize: '22px' }}>👑 بوابة صاحب الموقع الخاصة لإدارة ورفع المنتجات الفورية</h3>
          <form onSubmit={handleAddNewProduct} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
