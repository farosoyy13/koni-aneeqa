import React, { useState, useEffect } from 'react';

// صالة العرض الرئيسية (الحراج والمنتجات الملوكية الشاملة)
const Home = () => {
  return (
    <div style={{ padding: '25px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '35px', padding: '25px', background: 'linear-gradient(145deg, #16140e 0%, #080805 100%)', border: '1px solid #d4af37', borderRadius: '12px' }}>
        <h2 style={{ color: '#d4af37', fontFamily: 'serif', fontSize: '32px' }}>منصة أناقة CHIC الملكية الفاخرة</h2>
        <p style={{ color: '#aaa', fontSize: '14px', marginTop: '5px' }}>بوابة التجارة والحراج السحابي والآمن المعتمدة للإدارة العامة</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ background: '#141414', border: '1px solid rgba(212,175,55,0.2)', padding: '20px', borderRadius: '8px' }}>
          <span style={{ background: '#ff3333', color: '#fff', padding: '2px 6px', fontSize: '10px', borderRadius: '3px', fontWeight: 'bold' }}>LIVE إعلان نشط</span>
          <h3 style={{ color: '#d4af37', margin: '10px 0' }}>تمور خلاص ملكي فاخر ونادر</h3>
          <p style={{ color: '#aaa', fontSize: '13px' }}>منتقاة بعناية فائقة لقصور ومجالس الفخامة العربية الأصيلة. السعر شامل التوصيل السريع.</p>
          <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '18px', marginTop: '15px' }}>180 ريال</p>
          <a href="https://wa.me" target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', padding: '10px 0', background: '#d4af37', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>💳 شراء فوري آمن</a>
        </div>

        <div style={{ background: '#141414', border: '1px solid rgba(212,175,55,0.2)', padding: '20px', borderRadius: '8px' }}>
          <span style={{ background: '#ff3333', color: '#fff', padding: '2px 6px', fontSize: '10px', borderRadius: '3px', fontWeight: 'bold' }}>🔥 تفاعل مروّع</span>
          <h3 style={{ color: '#d4af37', margin: '10px 0' }}>مرسيدس مايباخ S-Class الملكية</h3>
          <p style={{ color: '#aaa', fontSize: '13px' }}>كاملة المواصفات والمميزات الملوكية الفاخرة، معروضة عبر تصفح بلوري لامع بدون أي تعليق.</p>
          <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '18px', marginTop: '15px' }}>العربون: 5,000 ريال</p>
          <a href="https://wa.me" target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', padding: '10px 0', background: '#d4af37', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', marginTop: '15px', textAlign: 'center', fontSize: '13px' }}>💳 دفع العربون الفوري</a>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [liveCount, setLiveCount] = useState(1438);
  
  // 📢 نظام البث والإعلان الجماعي الموحد لكافة أركان الموقع حياً
  const [broadcastMessage, setBroadcastMessage] = useState('يرجى من كافة المستخدمين والمشرفين الالتزام التام بالأسعار والتشريعات المعتمدة للمنصة.');
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
    setAdminLogs([{ id: Date.now(), event: "📢 إطلاق بث جماعي فوري", desc: `قام صاحب الموقع بنشر إعلان جماعي موحد يظهر في كافة الصفحات والواجهات حياً.`, time: "الآن", type: "warning" }, ...adminLogs]);
    alert("📢 تم بث رسالتك الجماعية المشفرة فوراً، وهي تظهر الآن أعلى كافة شاشات وصفحات الموقع أمام جميع الزوار والمشرفين!");
    setInputBroadcast('');
  };

  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.name || !newComplaint.message) return;
    setComplaints([{ id: Date.now(), ...newComplaint, status: "محمي ومشفر (سري للغاية)" }, ...complaints]);
    alert("🚀 تم إرسال بلاغك المشفر مباشرة لغرفة العمليات الخاص بـ صاحب موقع أناقة CHIC، وسوف يتم اتخاذ الإجراء الصارم فوراً.");
    setNewComplaint({ name: '', target: '', message: '' });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#0b0b0b', border: '2px solid #d4af37', padding: '40px', borderRadius: '16px', maxWidth: '450px', width: '100%', textAlign: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h1 style={{ color: '#d4af37', fontSize: '26px', fontWeight: '900', marginBottom: '5px' }}>أناقة CHIC الملكي VIP</h1>
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
      
      {/* 🔴 الشريط الجديد الأول: عاد إليكم موقع أناقة CHIC */}
      <div style={{ background: '#ff3333', color: '#fff', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #000' }}>
        <marquee direction="right" scrollamount="5">
          👑 عاد إليكم موقع "أناقة CHIC" من جديد بتصميم عصري متطور، حيث قمنا بإجراء صيانة شاملة للأنظمة وترقية جدار حماية المنصة كلياً لضمان تجربة تداول فاخرة وآمنة بنسبة 100% 👑
        </marquee>
      </div>

      {/* 📜 الشريط الجديد الثاني: عندك فستان زواج ولبستية مرة واحدة */}
      <div style={{ background: '#d4af37', color: '#000', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #000' }}>
        <marquee direction="right" scrollamount="4">
          ✨ عندك فستان زواج ولبستية مرة واحدة وصعبة تلبسة بزواج آخر وراميتة بالدولاب او عباية او شنطة نظيفة وماتبينهم؟ أعرضيهم في موقع "أناقة CHIC" يضمن لك البيع بأسرع وقت وبأعلى عوائد استثمارية للأعضاء! ✨
        </marquee>
      </div>

      {/* 📢 شريط البث الجماعي المتغير ديناميكياً من غرفة صاحب الموقع - يظهر للزوار في كافة الصفحات الحية */}
                     <marquee direction="right" scrollamount="5">
          📢 شريط البث المباشر: ترقبوا إطلاق العروض الحصرية والمباشرة قريباً في منصة أناقة CHIC!
        </marquee>
      </div>

    </div>
  );
};

export default App;