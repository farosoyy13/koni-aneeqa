import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [liveCount, setLiveCount] = useState(1438);
  const [broadcastMessage, setBroadcastMessage] = useState('يرجى من كافة المستخدمين والمشرفين الالتزام التام بالأسعار والتشريعات المعتمدة.');
  const [inputBroadcast, setInputBroadcast] = useState('');
  const [complaints, setComplaints] = useState([{ id: 1, message: "تقرير قيد التدقيق الإداري العام", status: "نشط" }]);
  const [newComplaint, setNewComplaint] = useState({ name: '', target: '', message: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#0b0b0b', border: '2px solid #d4af37', padding: '40px', borderRadius: '16px', maxWidth: '450px', width: '100%', textAlign: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h1 style={{ color: '#d4af37', fontSize: '26px', fontWeight: '900', marginBottom: '5px' }}>أناقة CHIC الملكي VIP</h1>
          <p style={{ color: '#888', fontSize: '12px', marginBottom: '25px' }}>بوابة الحماية والأمان والتدقيق الفيدرالي الثلاثي</p>
          <form onSubmit={(e) => { e.preventDefault(); if (email === "owner@gmail.com" && otp === "7222") { setIsAuthenticated(true); } else { alert("⚠️ المعرف غير صحيح!"); } }} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" placeholder="المعرف الملوكي المعتمد للإدارة" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <input type="password" placeholder="رمز النفاذ السري OTP" value={otp} onChange={e => setOtp(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>⚡️ توثيق الهوية والعبور السحابي</button>
          </form>
          <p style={{ color: '#555', fontSize: '11px', marginTop: '20px' }}>⚠️ معرف المالك: owner@gmail.com والرمز: 7222</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      <div style={{ background: '#ff3333', color: '#fff', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '13px' }}>
        <marquee direction="right" scrollamount="5">👑 عاد إليكم موقع "أناقة CHIC" من جديد بتصميم عصري متطور، حيث قمنا بإجراء صيانة شاملة للأنظمة وترقية جدار حماية المنصة كلياً لضمان تجربة تداول فاخرة وآمنة بنسبة 100% 👑</marquee>
      </div>
      <div style={{ background: '#d4af37', color: '#000', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '13px' }}>
        <marquee direction="right" scrollamount="4">✨ عندك فستان زواج ولبستية مرة واحدة وصعبة تلبسة بزواج آخر وراميتة بالدولاب او عباية او شنطة نظيفة وماتبينهم؟ أعرضيهم في موقع "أناقة CHIC" يضمن لك البيع بأسرع وقت وبأعلى عوائد استثمارية للأعضاء! ✨</marquee>
      </div>
      <div style={{ background: '#ffaa00', color: '#000', padding: '6px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '12px' }}>
        <marquee direction="right" scrollamount="5">📢 بث جماعي عاجل من الإدارة العامة: {broadcastMessage}</marquee>
      </div>
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        {currentTab === 'home' && (
          <div style={{ padding: '10px' }}>
            <div style={{ textAlign: 'center', marginBottom: '35px', padding: '25px', background: '#111', border: '1px solid #d4af37', borderRadius: '12px' }}>
              <h2 style={{ color: '#d4af37' }}>منصة أناقة CHIC الملكية الفاخرة</h2>
              <p style={{ color: '#aaa', fontSize: '14px' }}>بوابة التجارة والحراج السحابي والآمن المعتمدة للإدارة العامة</p>
            </div>
          </div>
        )}
        {currentTab === 'owner' && (
          <div>
            <div style={{ background: '#111', border: '2px solid #d4af37', padding: '25px', borderRadius: '12px', marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37' }}>👁️ غرفة العمليات الاستراتيجية ورادار المراقبة السيادية</h2>
              <p style={{ color: '#888', fontSize: '13px' }}>مرحباً بك يا سيدي صاحب موقع أناقة CHIC 👑 الصلاحيات كاملة ويتم محاسبة المتسبب قانونياً وصارماً إما عبر أنظمة المنصة أو السلطات الأمنية المختصة.</p>
            </div>
            <div style={{ background: 'linear-gradient(135deg, #1a150c 0%, #0a0a0a 100%)', padding: '20px', borderRadius: '12px', border: '1px solid #d4af37', marginBottom: '30px' }}>
              <h3 style={{ color: '#d4af37', marginBottom: '10px' }}>📢 لوحة البث والنداء الجماعي الموحد (نشر تنبيه أو مناداة المشرفين):</h3>
              <form onSubmit={(e) => { e.preventDefault(); if (inputBroadcast) { setBroadcastMessage(inputBroadcast); alert("📢 تم بث الإعلان جماعياً فوراً!"); setInputBroadcast(''); } }} style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="اكتب الإعلان الجماعي هنا..." value={inputBroadcast} onChange={e => setInputBroadcast(e.target.value)} style={{ flex: 1, padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px' }} required />
                <button type="submit" style={{ background: '#ff3333', color: '#fff', padding: '0 25px', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>🚀 بث الإعلان</button>
              </form>
            </div>
          </div>
        )}
        {currentTab === 'about' && (
          <div style={{ maxWidth: '700px', margin: '0 auto', background: '#111', padding: '35px', borderRadius: '16px', border: '1px solid #d4af37', textAlign: 'right' }}>
            <h2 style={{ color: '#d4af37', fontSize: '24px', textAlign: 'center' }}>⚜️ السجل الرسمي والتوثيق التاريخي للمنصة ⚜️</h2>
            <p><strong>• تـاريـخ الـتـأسـيـس:</strong> تم تأسيس وتدشين هذا الصرح الرقمي الشامل رسمياً في عام <b>2020 م</b> لخدمة عملاء النخبة [19.1].</p>
            <div style={{ borderTop: '1px solid #222', marginTop: '30px', paddingTop: '15px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '9px', color: '#666' }}>صاحب موقع " أناقة CHIC "<br />الاستاذ: فهد بن حمود الشمري</p>
              <p style={{ margin: '5px 0 0 0', fontSize: '9px', color: '#444' }}>جميع الحقوق محفوظة © 2026 أناقة CHIC</p>
            </div>
          </div>
        )}
      </div>
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#0a0a0a', borderTop: '2px solid #d4af37', display: 'flex', justifyContent: 'space-around', padding: '12px 5px', zIndex: 1000 }}>
        <button onClick={() => setCurrentTab('home')} style={{ background: currentTab === 'home' ? '#d4af37' : '#000', color: currentTab === 'home' ? '#000' : '#fff', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>📺 صالة العرض</button>
        <button onClick={() => setCurrentTab('owner')} style={{ background: currentTab === 'owner' ? '#d4af37' : '#000', color: currentTab === 'owner' ? '#000' : '#fff', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>👑 غرفة صاحب الموقع</button>
        <button onClick={() => setCurrentTab('about')} style={{ background: currentTab === 'about' ? '#d4af37' : '#000', color: currentTab === 'about' ? '#000' : '#fff', border: '1px solid #d4af37', padding: '8px 14px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>📜 من نحن</button>
      </div>
    </div>
  );
}
