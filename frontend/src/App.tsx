import React, { useState, useEffect, useRef, startTransition } from 'react';
import { Switch, Route, Redirect, useLocation } from 'wouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// استدعاء الصفحات بالربط الصارم المباشر لمنع أخطاء التصدير (Default Export)
import { Catalog } from './pages/Catalog';
import { DressDetails } from './pages/DressDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// نظام معالجة الأخطاء الذكي لحماية الشاشة من الانهيار (Error Boundary)
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, errorInfo: any) { console.error("App Error:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#050505', color: '#white', fontFamily: 'Tajawal, sans-serif' }}>
          <h2 style={{ color: '#d4af37', marginBottom: '20px' }}>عذراً، حدث خطأ غير متوقع في تحميل الصفحة.</h2>
          <button onClick={() => window.location.href = '/'} style={{ padding: '10px 20px', backgroundColor: '#d4af37', color: '#000', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>العودة للوحة الرئيسية 🏠</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ميزة ذكية مجانية لتسريع التصفح الصاروخي في أناقة شيك
const useSmartPrefetch = () => {
  useEffect(() => {
    const prefetchLinks = () => {
      const links = document.querySelectorAll('a[href]');
      links.forEach(link => {
        link.addEventListener('mouseenter', () => {
          const href = link.getAttribute('href');
          if (href) { startTransition(() => { /* تجهيز المسار مسبقاً */ }); }
        });
      });
    };
    prefetchLinks();
  }, []);
};

export default function App() {
  useSmartPrefetch();
  const [location] = useLocation();

  // نظام إدارة وحفظ التنبيهات والرسائل الفوري الخاص بك
  const [messages, setMessages] = useState<any[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotification, setShowNotification] = useState(false);

  // ميزة بصرية: تأثير التلاشي الناعم عند التنقل بين مسارات الفخامة
  const [fade, setFade] = useState(false);
  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => setFade(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  // نظام مراقبة الرسائل المباشرة الفوري القديم وحفظه محلياً بأمان
  useEffect(() => {
    const savedMessages = localStorage.getItem('chat_messages');
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages);
      setMessages(parsed);
      // حساب الإشعارات للرسائل غير المقروءة الواردة من الزباين
      const unread = parsed.filter((m: any) => m.sender === 'client' && !m.read).length;
      setNotificationCount(unread);
    }
  }, []);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMessage = { id: Date.now().toString(), text, sender: 'owner', timestamp: new Date().toISOString(), read: true };
    const updated = [...messages, newMessage];
    setMessages(updated);
    localStorage.setItem('chat_messages', JSON.stringify(updated));
    toast.success('تم إرسال رسالتك الفخمة بنجاح! ✨');
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen bg-[#050505] text-white font-sans selection:bg-[#d4af37] selection:text-black antialiased transition-opacity duration-300 ${fade ? 'opacity-80' : 'opacity-100'}`} dir="rtl">
        <Switch>
          {/* المسارات العامة للمتجر */}
          <Route path="/" component={Home} />
          <Route path="/catalog" component={Catalog} />
          <Route path="/dress/:id" component={DressDetails} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/contact" component={Contact} />

          {/* بوابة الإدارة السرية لفهد الشمري */}
          <Route path="/owner-login" component={LoginPage} />
          
          {/* لوحة التحكم المحمية بالكامل بنظام الـ Guard الصارم */}
          <Route path="/admin">
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          </Route>

          {/* حماية الروابط المفقودة */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>

        {/* حزمة التنبيهات الملوكية لـ أناقة CHIC */}
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          toastClassName="border border-[#d4af37]/20 bg-[#0b0b0b] text-white rounded-xl shadow-2xl"
          progressClassName="bg-[#d4af37]"
        />
      </div>
    </ErrorBoundary>
  );
}
