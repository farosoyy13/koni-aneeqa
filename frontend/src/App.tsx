import React, { useState, useEffect, Suspense, lazy } from 'react';

// 🌟 1. تأثير التحميل الملكي (Premium Shimmer Loading) أثناء التنقل كالتلفاز
const ShimmerLoader = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#0a0a0a', color: '#d4af37', fontFamily: 'sans-serif' }}>
    <div style={{ width: '50px', height: '50px', border: '3px solid #1a1a1a', borderTop: '3px solid #d4af37', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <p style={{ marginTop: '20px', letterSpacing: '2px', fontSize: '14px', opacity: 0.8 }}>أناقة CHIC .. جاري تحميل الفخامة</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

// 🌟 2. معالجة الأخطاء والانهيار الذكية (Error Boundary)
class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ backgroundColor: '#0a0a0a', color: '#fff', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
          <h2 style={{ color: '#d4af37' }}>عذراً، حدث خلل في بروتوكول الحماية</h2>
          <p>يرجى العودة إلى البوابة الرئيسية</p>
          <button onClick={() => window.location.href = '/'} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '10px 20px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>العودة للرئيسية</button>
        </div>
      );
    }
    return this.children;
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [fade, setFade] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [chatCount, setChatCount] = useState(0);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai', text: string }[]>([
    { sender: 'ai', text: 'أهلاً بكِ في دليل الأناقة الذكي. محتارة في تنسيق ألوان إطلالتك أو تبين تعرفين مقاس ثوبك الملكي المثالي؟ اسأليني!' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  useEffect(() => {
    const savedCount = localStorage.getItem('chic_ai_count');
    if (savedCount) setChatCount(parseInt(savedCount));
  }, []);

  const handleTabChange = (tabName: string) => {
    setFade(false);
    setTimeout(() => {
      setActiveTab(tabName);
      setFade(true);
    }, 200);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    if (chatCount >= 3) {
      setMessages(prev => [...prev, 
        { sender: 'user', text: inputMessage },
        { sender: 'ai', text: '🔒 استهلكتِ استشاراتكِ المجانية الفاخرة لليوم. اشتركي الآن في العضوية الماسية للحصول على استشارات لامتناهية وتنسيق فوري مع خبير الموضة الذكي!' }
      ]);
      setInputMessage('');
      return;
    }
    const newUserMessage = { sender: 'user', text: inputMessage };
    const nextCount = chatCount + 1;
    setChatCount(nextCount);
    localStorage.setItem('chic_ai_count', nextCount.toString());
    setMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    setTimeout(() => {
      let aiResponse = 'بناءً على أحدث صيحات الموضة الملكية، أنصحكِ بدمج الألوان الدافئة مع القطع الفاخرة المخملية لتبرزي هيبتكِ السيادية.';
      if (inputMessage.includes('مقاس')) aiResponse = 'لتحديد مقاسك الفاخر بدقة، يرجى تزويدي بطول القامة، وسيقوم النظام فوراً بحساب القياس الملكي الملائم لجسدكِ.';
      setMessages(prev => [...prev, { sender: 'ai', text: aiResponse }]);
    }, 800);
  };
  return (
    <ErrorBoundary>
      <div style={{ backgroundColor: '#070707', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', position: 'relative', overflowX: 'hidden' }}>
        
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #1a1a1a', background: '#0a0a0a' }}>
          <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#d4af37', letterSpacing: '1px' }}>أناقة CHIC</div>
          <nav style={{ display: 'flex', gap: '20px' }}>
            {['home', 'secret-club', 'auctions', 'elite', 'payment'].map((tab) => (
              <button key={tab} onClick={() => handleTabChange(tab)} style={{ background: 'none', border: 'none', color: activeTab === tab ? '#d4af37' : '#888', cursor: 'pointer', fontSize: '15px', fontWeight: activeTab === tab ? 'bold' : 'normal', transition: 'color 0.3s' }}>
                {tab === 'home' && 'الرئيسية'}
                {tab === 'secret-club' && 'نادي الأناقة السري'}
                {tab === 'auctions' && 'المزادات السيادية'}
                {tab === 'elite' && 'مبيعات النخبة'}
                {tab === 'payment' && 'بوابة الدفع'}
              </button>
            ))}
          </nav>
        </header>

        <main style={{ padding: '40px', opacity: fade ? 1 : 0, transition: 'opacity 0.2s ease-in-out', minHeight: '60vh' }}>
          <Suspense fallback={<ShimmerLoader />}>
            {activeTab === 'home' && (
              <div style={{ textAlign: 'center', marginTop: '50px' }}>
                <h1 style={{ color: '#d4af37', fontSize: '42px', marginBottom: '20px' }}>بروتوكولات حماية سيادية للأزياء الفاخرة</h1>
                <p style={{ color: '#aaa', fontSize: '18px' }}>مرحباً بك في المنصة النخبوية الأولى عالمياً.</p>
              </div>
            )}
            
            {activeTab === 'secret-club' && (
              <div style={{ maxWidth: '800px', margin: '0 auto', background: '#0a0a0a', padding: '30px', borderRadius: '8px', border: '1px solid #222' }}>
                <h2 style={{ color: '#d4af37' }}>👑 نادي الأناقة السري</h2>
                <p style={{ color: '#ccc', lineHeight: '1.8' }}>هذه المجموعة الملكية النادرة محجوبة عن العامة. اشترك في العضوية الماسية لتفتح لك القطع فوراً وتستمتع بمزايا لا يحظى بها سواك.</p>
                <button onClick={() => handleTabChange('payment')} style={{ marginTop: '20px', backgroundColor: '#d4af37', color: '#000', padding: '12px 30px', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>طلب انضمام فوري</button>
              </div>
            )}

            {activeTab === 'auctions' && <div style={{ textAlign: 'center' }}><h2>🔨 المزادات السيادية المفتوحة حالياً</h2><p style={{ color: '#888' }}>لا توجد مزادات نشطة للعامة في هذه اللحظة.</p></div>}
            {activeTab === 'elite' && <div style={{ textAlign: 'center' }}><h2>💎 مبيعات النخبة المغلقة</h2><p style={{ color: '#888' }}>مخصصة لأصحاب الدعوات الخاصة فقط.</p></div>}
            
            {activeTab === 'payment' && (
              <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', background: '#0a0a0a', padding: '40px', borderRadius: '12px', border: '1px solid #d4af37' }}>
                <h2 style={{ color: '#d4af37', marginBottom: '30px' }}>بوابة الترقية الماسية الآمنة</h2>
                <p style={{ marginBottom: '30px', color: '#aaa' }}>اضغط على الزر أدناه لإرسال طلب الترقية الفورية والربط بنظام الدفع السيادي للمشروع.</p>
                <button onClick={() => alert('تم تسجيل طلب الترقية الماسية بنجاح! سيتم تحويلك لبوابة الدفع السيادية الآمنة فور مراجعة الحساب.')} style={{ background: '#d4af37', color: '#000', padding: '15px 40px', border: 'none', borderRadius: '30px', fontWeight: 'bold', display: 'inline-block', boxShadow: '0 4px 15px rgba(212,175,55,0.3)', cursor: 'pointer', fontSize: '16px' }}>💳 تفعيل العضوية الماسية الآن</button>
              </div>
            )}
          </Suspense>
        </main>

        <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 9999 }}>
          <button onClick={() => setAiOpen(!aiOpen)} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', width: '60px', height: '60px', borderRadius: '50%', cursor: 'pointer', fontSize: '24px', boxShadow: '0 4px 20px rgba(212,175,55,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {aiOpen ? '✕' : '✨'}
          </button>

          {aiOpen && (
            <div style={{ position: 'absolute', bottom: '80px', right: '0', width: '350px', height: '450px', backgroundColor: '#0a0a0a', border: '1px solid #d4af37', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ backgroundColor: '#111', padding: '15px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#d4af37', fontWeight: 'bold' }}>✦ مستشار الأناقة الذكي</span>
                <span style={{ fontSize: '12px', color: '#888' }}>المتبقي لكِ: {Math.max(0, 3 - chatCount)} استشارات مجانية</span>
              </div>
              
              <div style={{ flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {messages.map((msg, i) => (
                  <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', backgroundColor: msg.sender === 'user' ? '#d4af37' : '#1e1e1e', color: msg.sender === 'user' ? '#000' : '#fff', padding: '10px 14px', borderRadius: '8px', maxWidth: '85%', fontSize: '14px', lineHeight: '1.5' }}>
                    {msg.text}
                    {chatCount >= 3 && msg.text.includes('🔒') && (
                      <button onClick={() => handleTabChange('payment')} style={{ marginTop: '8px', width: '100%', padding: '6px', backgroundColor: '#d4af37', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>👑 انضمي للملكية الآن</button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ padding: '10px', borderTop: '1px solid #222', display: 'flex', gap: '8px', backgroundColor: '#111' }}>
                <input type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder="اسألي عن مقاسك أو تنسيق ألوانكِ..." style={{ flex: 1, backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', padding: '8px 12px', color: '#fff', outline: 'none', fontSize: '14px' }} />
                <button onClick={handleSendMessage} style={{ backgroundColor: '#d4af37', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>إرسال</button>
              </div>
            </div>
          )}
        </div>

      </div>
    </ErrorBoundary>
  );
}

export default App;
