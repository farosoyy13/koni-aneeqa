import React, { useState, useEffect } from 'react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  const [liveCount, setLiveCount] = useState(1438);
  
  // 📢 نظام البث والنداء الجماعي الحكيم من غرفة صاحب الموقع لكافة الصفحات حياً
  const [broadcastMessage, setBroadcastMessage] = useState('🚨 تنبيه إداري رسمي: يرجى من كافة المستخدمين والمشرفين الالتزام التام بالتشريعات المعتمدة.');
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
      const audio = new Audio('https://soundhelix.com');
      audio.volume = 0.3;
      audio.play().catch(() => console.log("Audio play blocked"));
    } else {
      setAdminLogs([{ id: Date.now(), event: "⚠️ محاولة ولوج غير مصرحة", desc: `رصد محاولة دخول فاشلة للمعرف: ${email}`, time: "الآن", type: "danger" }, ...adminLogs]);
      alert("⚠️ تحذير أمني فيدرالي صارم! تم حظر جهازك وتوثيق البصمة الرقمية وإرسالها فوراً لغرفة العمليات السرية لـ صاحب موقع أناقة CHIC!");
    }
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputBroadcast) return;
    setBroadcastMessage(inputBroadcast);
    setAdminLogs([{ id: Date.now(), event: "📢 إطلاق بث جماعي فوري", desc: `قام صاحب الموقع بنشر إعلان جماعي موحد يظهر في كافة الصفحات والواجهات الحالية.`, time: "الآن", type: "warning" }, ...adminLogs]);
    alert("📢 تم بث رسالتك الجماعية المشفرة فوراً، وهي تظهر الآن أعلى كافة شاشات وصفحات الموقع أمام جميع الزوار والمشرفين!");
    setInputBroadcast('');
  };

  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.name || !newComplaint.message) return;
    const complaintData = { id: Date.now(), ...newComplaint, status: "محمي ومشفر (سري للغاية)" };
    setComplaints([complaintData, ...complaints]);
    setAdminLogs([{ id: Date.now(), event: "📥 استلام تقرير ومظلمة", desc: `تم استقبال بلاغ مشفر من العميل ضد [${newComplaint.target || 'عام'}] بداخل الغرفة السيادية`, time: "الآن", type: "warning" }, ...adminLogs]);
    alert("🚀 تم إرسال بلاغك المشفر مباشرة لغرفة العمليات الخاصة بـ صاحب موقع أناقة CHIC، وسوف يتم اتخاذ الإجراء الصارم فوراً.");
    setNewComplaint({ name: '', target: '', message: '' });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#0b0b0b', border: '2px solid #d4af37', padding: '40px', borderRadius: '16px', maxWidth: '450px', width: '100%', textAlign: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h1 style={{ color: '#d4af37', fontSize: '26px', fontWeight: '900', marginBottom: '5px', fontFamily: 'serif' }}>أناقة CHIC الملكي VIP</h1>
          <p style={{ color: '#888', fontSize: '12px', marginBottom: '25px' }}>بوابة الحماية والأمان والتدقيق الفيدرالي الثلاثي</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" placeholder="المعرف الملوكي المعتمد للإدارة" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <input type="password" placeholder="رمز النفاذ السري والمشفر OTP" value={otp} onChange={e => setOtp(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              ⚡️ توثيق الهوية الدبلوماسية وفك الرقابة السحابية
            </button>
          </form>
          <p style={{ color: '#555', fontSize: '11px', marginTop: '20px' }}>⚠️ المعرف الخاص بالمالك للعبور والتجربة: owner@gmail.com والرمز السري: 7222</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      
      {/* 🔴 شريط البث والنداء الجماعي الموحد المحدث حياً ليتغير فوراً بناءً على أمر صاحب الموقع من أي صفحة */}
      <div style={{ background: '#ff3333', color: '#fff', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '14px', borderBottom: '2px solid #d4af37', boxShadow: '0 4px 15px rgba(255,51,51,0.4)' }}>
        <marquee direction="right" scrollamount="6">
          👑 {broadcastMessage} 👑
        </marquee>
      </div>

      {/* 📜 🟢 الشريط الملوكي المتحرك الأول: إعلان الصيانة وعودة الموقع الفخمة */}
      <div style={{ background: '#d4af37', color: '#000', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #000' }}>
        <marquee direction="right" scrollamount="5">
          ⚜️ عاد إليكم موقع (أناقة CHIC) من جديد بتصميم إمبراطوري متطور، حيث تم الانتهاء من أعمال الصيانة الشاملة وتحديث أنظمة الحماية الفيدرالية وتشفير الخزانة البنكية لضمان أعلى مستويات الأمان للمتداولين والزوار أونلاين. ومن لديه أي شكوى رسمية أو مظلمة ضد موظف أو مشرف يرجى التوجه لـ (قسم الشكاوى المفتوح)، وسوف يتم محاسبة المتسبب قانونياً وصارماً إما عبر أنظمة حظر المنصة أو من خلال الرفع الفوري للسلطات الأمنية المختصة! ⚜️
        </marquee>
      </div>

      {/* 📜 🟢 الشريط الملوكي المتحرك الثاني: إعلان الفساتين والحقائب والعبايات المستعملة والنظيفة */}
      <div style={{ background: '#111', color: '#d4af37', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontStyle: 'italic', fontSize: '13px', borderBottom: '1px solid rgba(212,175,55,0.3)' }}>
        <marquee direction="left" scrollamount="4">
          🛍️ عندك فستان زواج ولبستية مرة واحدة وصعبة تلبسة بزواج آخر وراميتة بالدولاب او عباية او شنطة نظيفة وماتبينهم؟ أعرضيهم في موقع (أناقة CHIC) يضمن لك البيع باسرع وقت وبأعلى عوائد ربحية حرة واحترافية متكاملة! 🛍️
        </marquee>
      </div>

      <div style={{ background: '#111', padding: '10px', borderBottom: '1px solid rgba(212,175,55,0.2)', display: 'flex', gap: '15px', overflowX: 'auto', whiteSpace: 'nowrap', fontSize: '11px', color: '#d4af37' }}>
        <span>💎 1. فلتر عزل الحسابات المزيفة</span>
        <span>⚡️ 2. تشفير دفع فيدرالي ثلاثي</span>
        <span>📊 3. رادار رصد المتواجدين نشط: <strong>{liveCount} عميل</strong></span>
        <span>🔒 5. جدار الحظر التلقائي للآي بي المخرب</span>
        <span>🎛️ 6. محرك تنقل 0 ثانية كلاسيكي حاد</span>
        <span>🛰️ 7. حظر تصوير الشاشة لحماية الأسرار</span>
        <span>💰 8. آيبان محمي بلوك تشين مشفر</span>
        <span>🎯 10. إشعارات الطرد الراداري الحي</span>
      </div>

      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 1️⃣ صـالـة الـعـرض الـكـبـرى */}
        {currentTab === 'home' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '35px', padding: '25px', background: 'linear-gradient(145deg, #16140e 0%, #080805 100%)', border: '1px solid #d4af37', borderRadius: '12px' }}>
              <h2 style={{ color: '#d4af37', fontFamily: 'serif', fontSize: '32px' }}>منصة أناقة CHIC الملكية الفاخرة</h2>
              <p style={{ color: '#aaa', fontSize: '14px', marginTop: '5px' }}>بوابة التجارة والحراج السحابي والآمن المعتمدة للإدارة العامة</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
              <div style={{ background: '#141414', border: '1px solid rgba(212,175,55,0.2)', padding: '20px', borderRadius: '8px' }}>
                <span style={{ background: '#ff3333', color: '#fff', padding: '2px 6px', fontSize: '10px', borderRadius: '3px', fontWeight: 'bold' }}>LIVE إعلان نشط</span>
                <h3 style={{ color: '#d4af37', margin: '10px 0' }}>تمور خلاص ملكي فاخر ونادر</h3>
                <p style={{ color: '#aaa', fontSize: '13px' }}>منتقاة بعناية فائقة لقصور ومجالس الفخامة العربية الأصيلة. السعر شامل التوصيل السريع.</p>
