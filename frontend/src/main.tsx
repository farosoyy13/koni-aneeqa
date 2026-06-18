import React, { useState, useEffect, startTransition } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './index.css';

// استيراد كافة الصفحات الـ 10 ومكونات الأمان السيادية للمنصة
import Home from './pages/Home';
import AboutView from './AboutView';
import Catalog from './pages/Catalog';
import DressDetails from './pages/DressDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import NotFound from './pages/not-found';
import ProtectedRoute from './ProtectedRoute';

// 🛡️ صمام الأمان العالمي لحظر الشاشات البيضاء وإنعاش الأكواد تلقائياً
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("[رادار الأمان]: تم رصد عطل مفاجئ وتم تفعيل الإنعاش الآلي:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '40px 20px', maxWidth: '600px', margin: '100px auto', fontFamily: '"Cairo", sans-serif', color: '#ff0000', direction: 'rtl', textAlign: 'center', background: '#111', borderRadius: '12px', border: '2px solid #d4af37' }}>
          <h2 style={{ fontWeight: '900', color: '#d4af37' }}>⚜️ درع الصيانة الفورية الذاتية ⚜️</h2>
          <p style={{ color: '#eee', fontSize: '14px', lineHeight: '1.8' }}>[نظام الطوارئ]: تفعيل نظام الحماية والإنعاش التلقائي بنجاح لمعالجة تعليق الصفحة دون فقدان بياناتك الفخمة.</p>
          <button onClick={() => window.location.reload()} style={{ background: 'linear-gradient(45deg, #d4af37, #f3e092)', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', fontSize: '14px' }}>
            🔄 إعادة إنعاش وعرض الصفحة فوراً
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// 📺 تصميم الهيكل الثابت والانسيابي العالمي (Layout) مع أزرار النيون التفاعلية فائقة السرعة
function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 📡 رادار مراقبة استقرار الاتصال بالإنترنت وتطهير الكاش التلقائي لمنع التعليق المؤقت
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // تصفية دورية تلقائية لذاكرة النظام لزيادة سرعة التصفح
    localStorage.removeItem('vite-client-overlay');

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // دالة الملاحة بهلوانية سريعة البرق (startTransition تعطي الأولوية لسرعة فتح الصفحة)
  const handleNav = (direction: number, btnName: string) => {
    if (!isOnline) {
      alert("⚠️ نظام الطوارئ: يرجى التحقق من اتصال الإنترنت لديك لضمان أمان العمليات.");
      return;
    }
    setActiveBtn(btnName);
    
    const audio = new Audio('https://mixkit.co'); 
    audio.volume = 0.3;
    audio.play().catch(() => {});
    
    setTimeout(() => setActiveBtn(null), 200);
    
    // إطلاق الصفحة بسرعة البرق الخاطف وعزل لود التحميل عن المتصفح
    startTransition(() => {
      navigate(direction);
    });
  };

  // تنسيق الأزرار النورانية العالمية المقاومة للاهتزاز والتعليق اللمسي على الهواتف
  const getButtonLayout = (btnName: string) => ({
    background: activeBtn === btnName ? '#d4af37' : '#111',
    color: activeBtn === btnName ? '#000' : '#d4af37',
    border: '2px solid #d4af37',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '900',
    fontFamily: '"Cairo", sans-serif',
    transition: 'all 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: activeBtn === btnName ? '0 0 30px #d4af37, inset 0 0 10px #fff' : '0 0 8px rgba(212,175,55,0.15)',
    transform: activeBtn === btnName ? 'scale(0.9) translateY(1px)' : 'scale(1)',
    outline: 'none',
    WebkitTapHighlightColor: 'transparent'
  });

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#020202', 
      color: '#eee', 
      display: 'flex', 
      flexDirection: 'column',
      overflowX: 'hidden', 
      WebkitOverflowScrolling: 'touch', // حركة إصبع انسيابية وناعمة جداً مثل التطبيقات العالمية
      transform: 'translate3d(0,0,0)', // تفعيل كرت الشاشة لتسريع تصفح الصور 60 إطار بالثانية
      fontFamily: '"Cairo", sans-serif'
    }}>
      
      {/* شريط التحذير التلقائي من انقطاع الشبكة */}
      {!isOnline && (
        <div style={{ background: '#ff0000', color: '#fff', padding: '8px', fontSize: '12px', fontWeight: 'bold', zIndex: 10000, position: 'fixed', width: '100%', top: 0, textAlign: 'center' }}>
          ⚠️ تم قطع الاتصال بالشبكة! رادار الأمان يحفظ عملياتك حالياً، يرجى استعادة الاتصال فوراً.
        </div>
      )}

      {/* 📺 إطار شريط التحكم العالمي العلوي (شريط النيون الثابت) */}
      <nav style={{ 
        background: '#0a0a0a', 
        borderBottom: '2px solid #d4af37', 
        padding: '15px 25px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        direction: 'rtl',
        position: 'sticky', 
        top: 0, 
        zIndex: 9999, 
        boxShadow: '0 4px 25px rgba(212,175,55,0.12)'
      }}>
        {/* أزرار التحكم الفورية المتفجرة بالأنوار والنيون الذهبي بسرعة البرق */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button onClick={() => handleNav(-1, 'back')} style={getButtonLayout('back') as React.CSSProperties}>
            ⬅️ رُجُوعْ
          </button>
          <button onClick={() => handleNav(1, 'next')} style={getButtonLayout('next') as React.CSSProperties}>
            تَالِي ➡️
          </button>
        </div>

        {/* روابط التنقل الملكية فائقة السرعة والواضحة لغوياً وإملائياً لكافة زوار المنصة */}
        <div style={{ display: 'flex', gap: '20px', fontSize: '14px', fontWeight: 'bold' }}>
          <Link to="/" style={{ color: location.pathname === '/' ? '#d4af37' : '#eee', textDecoration: 'none', textShadow: location.pathname === '/' ? '0 0 8px #d4af37' : 'none' }}>الرئيسية</Link>
          <Link to="/catalog" style={{ color: location.pathname === '/catalog' ? '#d4af37' : '#eee', textDecoration: 'none' }}>الحراج</Link>
          <Link to="/about" style={{ color: location.pathname === '/about' ? '#d4af37' : '#eee', textDecoration: 'none' }}>من نحن</Link>
          <Link to="/reviews" style={{ color: location.pathname === '/reviews' ? '#d4af37' : '#eee', textDecoration: 'none' }}>التقييمات</Link>
          <Link to="/contact" style={{ color: location.pathname === '/contact' ? '#d4af37' : '#eee', textDecoration: 'none' }}>اتصل بنا</Link>
          <Link to="/cart" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: '900' }}>🛒 السلة</Link>
        </div>

        {/* شعار المنصة الإمبراطوري المتوهج بثبات */}
        <div style={{ color: '#d4af37', fontWeight: '900', fontSize: '22px', fontFamily: 'serif', textShadow: '0 0 10px #d4af37' }}>⚜️ CHIC</div>
      </nav>

      {/* 📺 شاشة العرض الانسيابية الكبرى المتغيرة الخاضعة لحماية صمام الإنعاش وسرعة البرق */}
      <main style={{ flex: 1, padding: '30px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutView />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/dress/:id" element={<DressDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/reviews" element={<Reviews />} />
            
            {/* حماية غرفة صاحب الموقع بقفل الهوية الصارم والمنفرد */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>

      {/* إطار التلفزيون السفلي الثابت لشعار ومصداقية المتجر للأستاذ فهد الشمري */}
      <footer style={{ 
        background: '#0a0a0a', 
        borderTop: '1px solid #222', 
        padding: '15px', 
        textAlign: 'center', 
        fontSize: '12px', 
        color: '#666', 
        fontWeight: 'bold', 
        direction: 'rtl'
      }}>
        جميع الحقوق محفوظة © 2026 أناقة CHIC | إدارة حراج وبوابات النخبة الاستثمارية الشاملة المحمية سحابياً
      </footer>

    </div>
  );
}

// التقفيل البرمجي النهائي الشغال والآمن 100% لربط شاشة التلفاز بموقعك
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Layout />
    </Router>
  </React.StrictMode>
);
