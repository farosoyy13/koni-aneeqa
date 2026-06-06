import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import OwnerRoom from './components/OmnerRoom';
import ProtectedRoute from './ProtectedRoute';
import { db, auth } from './firebaseConfig';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

// مكون فرعي لمراقبة الصفحات وإظهار شريط التنبيه والموسيقى
const DynamicLayout = ({ children }: { children: React.ReactNode }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snap) => {
      const list: any[] = [];
      snap.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setAllUsers(list);
    });

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        onSnapshot(doc(db, 'users', user.uid), (userSnap) => {
          if (userSnap.exists()) {
            setUserRole(userSnap.data().role);
          }
        });
      } else {
        setIsLoggedIn(false);
        setUserRole(null);
      }
    });

    return () => {
      unsubscribeUsers();
      unsubscribeAuth();
    };
  }, []);

  const isOwnerOnline = allUsers.some(u => u.role === 'owner' && u.isOnline === true) || (isLoggedIn && userRole === 'owner');

  useEffect(() => {
    if (isOwnerOnline && !hasPlayed) {
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2122/2122-84.wav'); 
      audio.volume = 0.7;
      audioRef.current = audio;
      
      audio.play().catch(() => {
        console.log("المتصفح يتطلب تفاعلاً لتشغيل الصوت تلقائياً");
      });

      setHasPlayed(true);

      setTimeout(() => {
        if (audioRef.current) audioRef.current.pause();
      }, 4000);
    } else if (!isOwnerOnline) {
      setHasPlayed(false);
    }
  }, [isOwnerOnline, hasPlayed]);

  return (
    <div style={{ direction: 'rtl', fontFamily: '"Cairo", sans-serif', minHeight: '100vh', position: 'relative' }}>
      
      {/* 📢 الشريط الرسمي العريض عند دخول المالك */}
      {isOwnerOnline && (
        <div style={{ 
          background: 'linear-gradient(90deg, #111 0%, #7f1d1d 50%, #111 100%)', 
          color: '#fff', 
          padding: '16px 20px', 
          textAlign: 'center',
          position: 'sticky', 
          top: 0, 
          left: 0, 
          width: '100%', 
          zIndex: 99999, 
          fontSize: '17px', 
          fontWeight: 'bold', 
          boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
          borderBottom: '3px solid #d4af37',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px'
        }}>
          <span>
            📢 <strong>تنويه رسمي:</strong> تم تسجيل دخول إدارة الموقع العليا. نرحب بكم جميعاً ونتمنى لكم تسوقاً ممتعاً. لمن لديه استفسار أو شكوى مباشرة ضد أي موظف، يرجى 
          </span>
          <Link to="/login" style={{ color: '#d4af37', textDecoration: 'underline' }}>
            الضغط هنا للانتقال لغرفة تقديم البلاغات والشكاوى فوراً.
          </Link>
        </div>
      )}

      {/* بار التنقل العلوي */}
      <nav style={{ background: '#111', padding: '15px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #222' }}>
        <Link to="/" style={{ color: '#fff', fontWeight: '900', fontSize: '20px', textDecoration: 'none' }}>👗 متجر أناقة CHIC</Link>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {isLoggedIn && (userRole === 'owner' || userRole === 'admin' || userRole === 'moderator') && (
            <Link to="/owner-room" style={{ background: '#d4af37', color: '#000', padding: '6px 15px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>
              ⚙️ لوحة القيادة والاجتماعات
            </Link>
          )}
          {isLoggedIn ? (
            <button onClick={() => signOut(auth)} style={{ background: 'none', border: '1px solid #e74c3c', color: '#e74c3c', padding: '5px 12px', borderRadius: '6px', cursor: 'pointer' }}>خروج</button>
          ) : (
            <Link to="/login" style={{ color: '#fff', textDecoration: 'none', fontSize: '14px' }}>🔑 تسجيل الدخول</Link>
          )}
        </div>
      </nav>

      {children}
    </div>
  );
};

// واجهة المتجر الرئيسية متضمنة التعهد الرسمي الصارم
const StoreFront = () => (
  <div style={{ textAlign: 'center', padding: '60px 20px', background: '#fafafa', minHeight: '80vh' }}>
    <div style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
      
      {/* هيدر الترحيب بالمتجر */}
      <div style={{ background: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        <h1 style={{ color: '#111', fontSize: '36px', fontWeight: '900', margin: '0 0 10px 0' }}>مرحباً بك في متجر أناقة CHIC 👗✨</h1>
        <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>تصفح أحدث موديلات الفساتين والأزياء الراقية والمؤمنة بالكامل.</p>
      </div>

      {/* 🛡️ بيان وتعهد المالك الرسمي والصارم للزوار (تمت إضافته بناءً على طلبك) */}
      <div style={{ 
        background: '#fff', 
        borderRight: '6px solid #7f1d1d', 
        borderRadius: '12px', 
        padding: '25px 30px', 
        textAlign: 'right', 
        boxShadow: '0 4px 25px rgba(0,0,0,0.04)' 
      }}>
        <h3 style={{ color: '#7f1d1d', margin: '0 0 12px 0', fontSize: '19px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px' }}>
          🛡️ عهد الإدارة العليا للموقع
        </h3>
        <p style={{ color: '#222', fontSize: '15px', lineHeight: '1.8', margin: 0, fontWeight: '500' }}>
          رضا زوارنا الكرام خط أحمر لا نقبل المساس به أبداً. إن كان لديك أي شكوى أو استفسار تجاه أي عضو أو موظف في الموقع، 
          <strong> فأبشر بسعدك وحقك سيصلك كاملاً ونرضيك بما تطلب.</strong> ونؤكد للجميع أن أي تقصير أو تجاوز من قِبل طاقم العمل 
          والمشرفين سيُواجه فوراً بإجراءات عقابية صارمة ومغلظة دون أي تهاون أو رحمة. لتقديم بلاغك، يرجى التوجه لغرفة الشكاوى ليتولى صاحب الموقع الأمر بنفسه.
        </p>
      </div>

    </div>
  </div>
);

export default function App() {
  return (
    <Router>
      <DynamicLayout>
        <Routes>
          <Route path="/" element={<StoreFront />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/owner-room" element={<ProtectedRoute><OwnerRoom /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </DynamicLayout>
    </Router>
  );
}
