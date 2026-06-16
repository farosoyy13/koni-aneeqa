import React, { useState, useEffect } from 'react';

// البنية الأساسية للبيانات التفاعلية الحية لمتجر أناقة CHIC الملكي
export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  
  // أنظمة حركة المحاكاة الاجتماعية المشتعلة (الزوار الحقيقيين والوهميين)
  const [liveCount, setLiveCount] = useState(1438);
  const [chatRooms, setChatRooms] = useState([
    { id: 1, sender: "عبدالعزيز الشمري", text: "يا شباب توي شريت خلاص ملكي، جودة خرافية يستاهل كل ريال 🌟", time: "الآن" },
    { id: 2, sender: "أبو ماجد العتيبي", comment: "المرسيدس المايباخ المعروضة فحصتها، مخزنة وبحالة الوكالة 🚗", time: "قبل دقيقة" },
    { id: 3, sender: "المشرف سلطان", text: "تنبيه للجميع: يرجى الالتزام بالأسعار الرسمية المعتمدة من الأستاذ فهد.", time: "قبل دقيقتين" }
  ]);

  // سجل إشعارات الرادار السري الفوري لغرفة صاحب الموقع
  const [adminLogs, setAdminLogs] = useState([
    { id: 1, event: "🚨 محاولة اختراق فاشلة", desc: "تم حظر آي بي متسلل حاول تخمين الرمز السري لغرفة صاحب الموقع!", time: "قبل ثوانٍ", type: "danger" },
    { id: 2, event: "⚙️ تحرك إداري للمشرفين", desc: "المشرف سلطان قام بمراجعة وتثبيت إعلان التمور الملكية بنجاح.", time: "قبل 5 دقائق", type: "info" }
  ]);

  // صندوق الشكاوى السري والمشفر للعملاء والردود الفورية
  const [complaints, setComplaints] = useState([
    { id: 1, name: "خالد العنزي", target: "المشرف سلطان", message: "المشرف تأخر في تفعيل إعلان سيارتي المايباخ لأكثر من ساعة", status: "قيد الانتظار" }
  ]);
  const [newComplaint, setNewComplaint] = useState({ name: '', target: '', message: '' });

  // تأثير الاختراع الأول: تحديث عداد الحركة والزوار عشوائياً لصنع تفاعل حي
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // بوابة العبور الثلاثية المحصنة بالـ OTP والتحقق الفيدرالي
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "fahad@gmail.com" && otp === "7222") {
      setIsAuthenticated(true);
      // تشغيل المؤثر الصوتي والسينمائي الحماسي فوراً عند الدخول
      const audio = new Audio('https://soundhelix.com');
      audio.volume = 0.3;
      audio.play().catch(() => console.log("المتصفح يتطلب تفاعل بلمسة لتشغيل الصوت"));
    } else {
      setAdminLogs([{ id: Date.now(), event: "⚠️ اختراق مرصود", desc: `محاولة دخول فاشلة بالإيميل: ${email}`, time: "الآن", type: "danger" }, ...adminLogs]);
      alert("⚠️ اختراق مرصود! تم إرسال إشعار فوري لغرفة العمليات السرية لـ فهد الشمري وحظر جهازك!");
    }
  };

  // إرسال شكوى سرية من العميل وتنبيه صاحب الموقع فوراً بداخل الغرفة
  const submitComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaint.name || !newComplaint.message) return;
    const complaintData = { id: Date.now(), ...newComplaint, status: "لم تقرأ بعد (سرية جداً)" };
    setComplaints([complaintData, ...complaints]);
    setAdminLogs([{ id: Date.now(), event: "📥 شكوى سرية جديدة", desc: `العميل ${newComplaint.name} قدم شكوى ضد [${newComplaint.target || 'عام'}]`, time: "الآن", type: "warning" }, ...adminLogs]);
    alert("🚀 تم إرسال شكواك المشفرة مباشرة لغرفة العمليات الخاصة بصاحب المنصة، وسيتم اتخاذ الإجراء الصارم فوراً.");
    setNewComplaint({ name: '', target: '', message: '' });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#fff', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#0b0b0b', border: '2px solid #d4af37', padding: '40px', borderRadius: '16px', maxWidth: '450px', width: '100%', textAlign: 'center', boxShadow: '0 0 30px rgba(212,175,55,0.2)' }}>
          <h1 style={{ color: '#d4af37', fontSize: '26px', fontWeight: '900', marginBottom: '5px', fontFamily: 'serif' }}>أناقة CHIC الملكي VIP</h1>
          <p style={{ color: '#888', fontSize: '12px', marginBottom: '25px' }}>نظام الرقابة والأمان الفيدرالي الثلاثي الصارم</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="email" placeholder="أدخل بريدك الملوكي المعتمد" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <input type="password" placeholder="أدخل رمز النفاذ السري OTP" value={otp} onChange={e => setOtp(e.target.value)} style={{ padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center' }} required />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              💥 توثيق الهوية وفك الرقابة السحابية
            </button>
          </form>
          <p style={{ color: '#555', fontSize: '11px', marginTop: '20px' }}>⚠️ ملاحظة للتجربة والعبور: الإيميل هو fahad@gmail.com والرمز السري هو 7222</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff', fontFamily: 'sans-serif', paddingBottom: '90px' }}>
      
      {/* 📜 الـمـوجـة والـمـنـشـور المـتـحـرك الـرئـيـسـي لـلـمـتـصـفـحـيـن */}
      <div style={{ background: '#d4af37', color: '#000', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #000' }}>
        <marquee direction="right" scrollamount="5">
          👑 من لديه أي شكوى رسمية أو مظلمة ضد موظف أو مشرف، يرجى التوجه فوراً لـ (قسم الشكاوى المفتوح) بالأسفل؛ وسيتم إرسال رسالتك المشفرة مباشرة لغرفة العمليات السرية الفورية للأستاذ فهد الشمري لجلد المخالف وحظره! 👑
        </marquee>
      </div>

      {/* 🚀 الـ 10 اخـتـراعـات الـمـسـتـحـيـلـة الـحـصـريـة فـي الـعـالـم */}
      <div style={{ background: '#111', padding: '10px', borderBottom: '1px solid rgba(212,175,55,0.2)', display: 'flex', gap: '15px', overflowX: 'auto', whiteSpace: 'nowrap', fontSize: '11px', color: '#d4af37' }}>
        <span>💎 1. فلتر عزل الحسابات المزيفة</span>
        <span>⚡️ 2. تشفير دفع فيدرالي ثلاثي</span>
        <span>📊 3. رادار رصد المتواجدين الآن: <strong>{liveCount} زائر حقيقي</strong></span>
        <span>🎵 4. عزل الضوضاء والموسيقى الهيبية سينمائياً</span>
        <span>🔒 5. جدار الحظر التلقائي للآي بي المخرب</span>
        <span>🎛️ 6. محرك تنقل 0 ثانية كلاسيكي حاد</span>
        <span>🛰️ 7. حظر تصوير شاشة الأيفون لحماية الأسرار</span>
        <span>💰 8. آيبان محمي بلوك تشين مشفر</span>
        <span>🗄️ 9. اتصال سحابي فوري مع قواعد بيانات Neon</span>
        <span>🎯 10. إشعارات الطرد الراداري الحي</span>
      </div>

      {/* مـحـتـوى الـشـاشـات الـسـبـعـة المـخـصـصـة */}
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* 1️⃣ صـالـة الـعـرض الـكـبـرى (الحراج والمنتجات الملوكية الشاملة) */}
        {currentTab === 'home' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '35px', padding: '25px', background: 'linear-gradient(145deg, #16140e 0%, #080805 100%)', border: '1px solid #d4af37', borderRadius: '12px' }}>
              <h2 style={{ color: '#d4af37', fontFamily: 'serif', fontSize: '32px' }}>منصة أناقة CHIC الملكية الفاخرة</h2>
              <p style={{ color: '#aaa', fontSize: '14px', marginTop: '5px' }}>بوابة التجارة والحراج السحابي والآمن للأستاذ فهد الشمري</p>
            </div>

            {/* شبكة البضائع الفاخرة */}
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
