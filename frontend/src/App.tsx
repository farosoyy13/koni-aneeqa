import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  const [liveCount, setLiveCount] = useState(1438);
  
  // 📢 نظام البث والإعلان الجماعي من غرفة صاحب الموقع لكافة الصفحات
  const [broadcastMessage, setBroadcastMessage] = useState('🚨 تنبيه إداري رسمي: يرجى من كافة المستخدمين والمشرفين الالتزام التام بالأسعار والتشريعات المعتمدة.');
  const [inputBroadcast, setInputBroadcast] = useState('');

  const [chatRooms, setChatRooms] = useState([
    { id: 1, sender: "عضو موثق 1", text: "تم استلام خلاص ملكي فاخر، جودة متميزة وتغليف آمن ومستدام 🌟", time: "الآن" },
    { id: 2, sender: "عضو موثق 2", comment: "المرسيدس المايباخ المعروضة تم فحصها برمجياً والتحقق من حالتها الفاخرة 🚗", time: "قبل دقيقة" },
    { id: 3, sender: "المكتب الإداري", text: "تنبيه لكافة الأعضاء: يرجى الالتزام التام بالتسعيرات والتشريعات المعتمدة من الإدارة العامة.", time: "قبل دقيقتين" }
  ]);

  const [adminLogs, setAdminLogs] = useState([
    { id: 1, event: "🚨 رصد نظام الحماية", desc: "تم رصد ومصادرة محاولة ولوج فاشلة وتجميد معرف الآي بي للمتسلل تلقائياً.", time: "قبل ثوانٍ", type: "danger" },
    { id: 2, event: "⚙️ إجراء تنظيمي معتمد", desc: "تمت مراجعة واعتماد إعلان التمور الملكية الفاخرة بنجاح عبر النظام السحابي.", time: "قبل 5 دقائق", type: "info" }
  ]);

  const [complaints, setComplaints] = useState([
    { id: 1, name: "مستخدم موثق", target: "أحد المشرفين", message: "تأخر في تحديث وتفعيل إعلان المركبة الفاخرة لأكثر من ساعة", status: "قيد المراجعة والتدقيق" }
  ]);
  const [newComplaint, setNewComplaint] = useState({ name: '', target: '', message: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "owner@gmail.com" && otp === "7222") {
      setIsAuthenticated(true);
    } else {
      alert("⚠️ تحذير أمني! المعرف غير صحيح.");
    }
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputBroadcast) return;
    setBroadcastMessage(inputBroadcast);
    alert("📢 تم بث رسالتك الجماعية فوراً أعلى كافة صفحات المنصة!");
    setInputBroadcast('');
  };

  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.name || !newComplaint.message) return;
    setComplaints([{ id: Date.now(), ...newComplaint, status: "محمي ومشفر" }, ...complaints]);
    alert("🚀 تم إرسال بلاغك المشفر مباشرة لغرفة العمليات الإدارية.");
    setNewComplaint({ name: '', target: '', message: '' });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#fff' }}>
        <div style={{ background: '#0b0b0b', border: '2px solid #d4af37', padding: '40px', borderRadius: '16px', maxWidth: '450px', width: '100%', textAlign: 'center' }}>
          <h1 style={{ color: '#d4af37', fontSize: '26px', fontWeight: '900', marginBottom: '5px' }}>أناقة CHIC الملكي VIP</h1>
          <p style={{ color: '#888', fontSize: '12px', marginBottom: '25px' }}>بوابة الحماية والأمان والتدقيق الفيدرالي الثلاثي</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" placeholder="المعرف الملوكي المعتمد للإدارة" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <input type="password" placeholder="رمز النفاذ السري والمشفر OTP" value={otp} onChange={e => setOtp(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              ⚡️ توثيق الهوية وفك الرقابة السحابية
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff', paddingBottom: '90px' }}>
      
      {/* 🔴 شريط البث والنداء الجماعي الموحد المحدث حياً ليتغير من غرفتك فوراً ويظهر بكافة الصفحات */}
      <div style={{ background: '#ff3333', color: '#fff', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '14px', borderBottom: '2px solid #d4af37' }}>
        <marquee direction="right" scrollamount="6">
          👑 {broadcastMessage} 👑
        </marquee>
      </div>

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 1️⃣ صـالـة الـعـرض */}
        {currentTab === 'home' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '35px', padding: '25px', background: '#111', border: '1px solid #d4af37', borderRadius: '12px' }}>
              <h2 style={{ color: '#d4af37' }}>منصة أناقة CHIC الملكية الفاخرة</h2>
              <p style={{ color: '#aaa', fontSize: '14px' }}>بوابة التجارة والحراج السحابي والآمن المعتمدة للإدارة العامة</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#141414', border: '1px solid rgba(212,175,55,0.2)', padding: '20px', borderRadius: '8px' }}>
                <span style={{ background: '#ff3333', color: '#fff', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold' }}>LIVE نشط</span>
                <h3>تمور خلاص ملكي فاخر</h3>
                <p style={{ color: '#aaa', fontSize: '13px' }}>منتقاة بعناية فائقة لقصور ومجالس الفخامة العربية الأصيلة.</p>
                <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '18px' }}>180 ريال</p>
              </div>
            </div>
          </div>
        )}

        {/* 2️⃣ غـرفـة صـاحـب الـمـوقـع */}
        {currentTab === 'owner' && (
          <div>
            <div style={{ background: '#111', border: '2px solid #d4af37', padding: '25px', borderRadius: '12px', marginBottom: '30px' }}>
              <h2 style={{ color: '#d4af37' }}>👁️ غرفة العمليات الاستراتيجية والمراقبة السيادية</h2>
              <p style={{ color: '#888', fontSize: '13px' }}>مرحباً بك يا سيدي صاحب موقع أناقة CHIC 👑 الصلاحيات كاملة ومحمية</p>
            </div>

            {/* 🎛️ لوحة البث والنداء الجماعي الموحد لكافة أركان الموقع */}
            <div style={{ background: '#111', padding: '20px', borderRadius: '12px', border: '1px solid #d4af37', marginBottom: '30px' }}>
              <h3 style={{ color: '#d4af37', marginBottom: '10px' }}>📢 لوحة البث والنداء الجماعي الموحد (نشر تنبيه أو مناداة المشرفين):</h3>
              <form onSubmit={handleSendBroadcast} style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="اكتب الإعلان الجماعي ليظهر في كامل المنصة فوراً..." value={inputBroadcast} onChange={e => setInputBroadcast(e.target.value)} style={{ flex: 1, padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px' }} required />
                <button type="submit" style={{ background: '#ff3333', color: '#fff', padding: '0 25px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🚀 بث جماعي فوراً</button>
              </form>
            </div>
          </div>
        )}

        {/* 3️⃣ قـسـم الـشـكـاوى */}
        {currentTab === 'complaints' && (
          <div style={{ maxWidth: '600px', margin: '0 auto', background: '#111', padding: '30px', borderRadius: '12px', border: '1px solid #d4af37' }}>
            <h2 style={{ color: '#d4af37', textAlign: 'center' }}>📥 إرسال بلاغ ومظلمة مشفرة (سرية للغاية)</h2>
            <form onSubmit={submitComplaint} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <input type="text" placeholder="الاسم المستعار المعتمد للعميل" value={newComplaint.name} onChange={e => setNewComplaint({...newComplaint, name: e.target.value})} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px' }} required />
              <textarea placeholder="يرجى كتابة تفاصيل المظلمة بدقة شديدة هنا..." value={newComplaint.message} onChange={e => setNewComplaint({...newComplaint, message: e.target.value})} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', height: '120px' }} required />
              <button type="submit" style={{ background: 'linear-gradient(135deg, #ff3333 0%, #aa0000 100%)', color: '#fff', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: 'bold' }}>🚀 إرسال البلاغ المشفر</button>
            </form>
          </div>
        )}

        {/* 4️⃣ صـفـحـة الـتـوثـيـق (مـن نـحـن) */}
        {currentTab === 'about' && (
          <div style={{ maxWidth: '700px', margin: '0 auto', background: '#111', padding: '35px', borderRadius: '16px', border: '1px solid #d4af37', textAlign: 'right' }}>
            <h2 style={{ color: '#d4af37', textAlign: 'center' }}>⚜️ السجل الرسمي والتوثيق التاريخي للمنصة ⚜️</h2>
            <p><strong>• هـويـة المـنـصـة:</strong> براند إلكتروني سيادي وتجاري شامل بـ 2026 م [19.1].</p>
            <div style={{ borderTop: '1px solid #222', marginTop: '30px', paddingTop: '15px', textAlign: 'center' }}>
              <p style={{ margin: 0, fontSize: '9px', color: '#666' }}>
                صاحب موقع " أناقة CHIC "<br />
