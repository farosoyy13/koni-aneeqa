import React, { useState, useEffect } from 'react';

export default function App() {
  // حالات التنقل وتحديد الصلاحيات
  const [userRole, setUserRole] = useState<null | 'owner' | 'supervisor' | 'regular' | 'visitor'>(null);
  const [currentTab, setCurrentTab] = useState<'home' | 'new' | 'used' | 'food' | 'post' | 'messages'>('home');
  
  // حالات تسجيل الدخول
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  
  // حالات النشر والقسم
  const [hasSworn, setHasSworn] = useState(false);
  const [postPhone, setPostPhone] = useState('');
  const [postDetails, setPostDetails] = useState('');
  const [postCategory, setPostCategory] = useState('حلويات وطبخ منزلي 🧁');
  const [postDuration, setPostDuration] = useState('7 أيام (أسبوع)');
  const [showWhatsappOverlay, setShowWhatsappOverlay] = useState(false);

  // شريط متحرك للإعلانات والترحيب ودخول صاحب الموقع
  const [marqueeText, setMarqueeText] = useState('✨ رجع إليكم موقع كوني أنيقة بحلته الجديدة الفخمة | تصفحي أرقى العبايات والفساتين الحصرية مجاناً مدى الحياة ✨');
  const [isAlertActive, setIsAlertActive] = useState(false);

  // التحكم بالصوت عند دخول صاحب الموقع
  const playOwnerSound = () => {
    // نغمة تنبيه مهيبة مدتها 10 ثوانٍ لتعريف الجميع بالدخول الملكي
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, audioCtx.currentTime); // تردد منخفض مهيب
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    // إيقاف الصوت بعد 10 ثوانٍ
    setTimeout(() => { osc.stop(); audioCtx.close(); }, 10000);
  };

  // معالجة تسجيل الدخول حسب رغبتك الصارمة في المسميات والأحجام
  const handleLogin = (role: 'owner' | 'supervisor' | 'regular') => {
    if (!email || !password) {
      setAuthError('تنبيه: يرجى كتابة البريد الإلكتروني وكلمة المرور 🔒');
      return;
    }
    
    // فحص إيميل صاحب الموقع الحقيقي المعتمد fhoodii882771@gmail.com
    if (role === 'owner') {
      if (email === 'fhoodii882771@gmail.com' && password === 'fhoodii123') { // ضع باسووردك المعتمد هنا
        setUserRole('owner');
        setAuthError('');
        setMarqueeText('👑 تنبيه رسمي عاجل: سجل صاحب الموقع دخوله الآن بكامل الصلاحيات الملكية المطلقة 👑');
        setIsAlertActive(true);
        playOwnerSound();
      } else {
        setAuthError('خطأ: الصلاحية الملكية خاصة بصاحب الموقع فقط! 🚫');
      }
    } else if (role === 'supervisor') {
      if (email.includes('admin') && password.length >= 6) {
        setUserRole('supervisor');
        setAuthError('');
      } else {
        setAuthError('خطأ: بيانات الدخول الخاصة بالمشرفين والمراقبين غير صحيحة');
      }
    } else {
      setUserRole('regular');
      setAuthError('');
    }
  };

  const handleVisitorEnter = () => {
    setUserRole('visitor');
    setCurrentTab('home');
    setAuthError('');
  };

  const handlePostSubmit = () => {
    if (!postPhone || !postDetails) {
      alert('تنبيه: تعبئة رقم الهاتف وخانات التفاصيل والرسالة الخاصة إلزامي لرفع الطلب 🔒');
      return;
    }
    if (!hasSworn) {
      alert('تنبيه: يجب عليكِ قراءة القسم الشرطي والوافقة بمربع الصح أولاً لنشر إعلانكِ 📜');
      return;
    }
    setShowWhatsappOverlay(true);
  };

  const openWhatsapp = () => {
    const msg = `مرحباً صاحب الموقع، قمت برفع طلب إعلان في منصة كوني أنيقة VIP وأقسمت بالالتزام بالعمولة، وأرغب بالتفاهم معك مباشرة حول مدة العرض لتثبيته حياً.\n\n🗂️ التصنيف: ${postCategory}\n📞 رقم جوالي: ${postPhone}\n💬 التفاصيل والسعر: ${postDetails}\n⏱️ مدة العرض المطلوبة: ${postDuration}`;
    window.open(`https://wa.me{encodeURIComponent(msg)}`, '_blank');
  };

  // لوحة الدخول الفخمة والبسملة والتحذير من قطع الأرزاق والحسد
  if (!userRole) {
    return (
      <div style={{ background: '#0b0b0b', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', direction: 'rtl', fontFamily: 'sans-serif' }}>
        <div style={{ width: '100%', maxWidth: '650px', background: '#141414', border: '1px solid #262626', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.6)', textAlign: 'center' }}>
          
          <h2 style={{ color: '#d4af37', fontSize: '24px', margin: '0 0 10px 0' }}>﷽</h2>
          <p style={{ color: '#ff4a4a', fontSize: '14px', lineHeight: '1.6', background: 'rgba(255,74,74,0.05)', padding: '15px', borderRadius: '8px', border: '1px dashed #ff4a4a', margin: '0 0 25px 0' }}>
            ⚠️ <b>موعظة وعبرة للزوار:</b> إن قطع الأرزاق، والحسد، ونزع البركة، وقطيعة الرحم من كبائر الذنوب التي تمحق البركة من الحياة وتجلب غضب الله. اعلمِ أن الله مطلع على خفايا النفوس، فاجعلِ بيعكِ وشراءكِ مباركاً ونظيفاً وصادقاً لتنالِ التوفيق والرزق الحلال الحقيقي.
          </p>

          <h1 style={{ color: '#fff', fontSize: '28px', margin: '0 0 25px 0' }}>⚜️ كُونِي أَنِيقَة VIP ⚜️</h1>

          {/* خانة صاحب الموقع - فخمة، مبدعة، مزخرفة وأكبر حجم 100% */}
          <div style={{ border: '2px solid #d4af37', background: 'radial-gradient(circle, #1a150a 0%, #111 100%)', padding: '25px', borderRadius: '12px', marginBottom: '25px', boxShadow: '0 0 20px rgba(212,175,55,0.15)' }}>
            <h3 style={{ color: '#d4af37', fontSize: '22px', margin: '0 0 15px 0', fontWeight: 'bold', textShadow: '0 0 8px rgba(212,175,55,0.4)' }}>👑 بَوَّابَةُ الدُّخُولِ الْمَلَكِيَّةِ لِصَاحِبِ الْمَوْقِعِ 👑</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input type="email" placeholder="البريد الإلكتروني الخاص بصاحب الموقع" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '14px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'right', boxSizing: 'border-box', outline: 'none' }} />
              <input type="password" placeholder="الرقم السري السري للغاية" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '14px', background: '#222', border: '1px solid #333', borderRadius: '8px', color: '#fff', textAlign: 'right', boxSizing: 'border-box', outline: 'none' }} />
              <button onClick={() => handleLogin('owner')} style={{ padding: '14px', background: '#d4af37', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer', transition: '0.3s' }}>⚡ تسجيل الدخول المطلق للمالك</button>
            </div>
          </div>

          {/* بوابات المشرفين والمستخدمين العاديين */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '15px', borderRadius: '10px' }}>
              <h4 style={{ color: '#b89742', margin: '0 0 10px 0', fontSize: '15px' }}>🛡️ دخول المشرفين والمراقبين</h4>
              <button onClick={() => handleLogin('supervisor')} style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#aaa', borderRadius: '6px', cursor: 'pointer', fontSize: '13px' }}>بوابة إدارة الرقابة</button>
            </div>
            <div style={{ background: '#1c1c1c', border: '1px solid #333', padding: '15px', borderRadius: '10px' }}>
              <h4 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '15px' }}>👥 الزوار والأعضاء العاديين</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <button onClick={() => handleLogin('regular')} style={{ width: '100%', padding: '8px', background: '#d4af37', color: '#000', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px' }}>دخول عضوية</button>
                <button onClick={handleVisitorEnter} style={{ width: '100%', padding: '8px', background: 'transparent', border: '1px solid #555', color: '#ccc', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>تصفح كـ زائر مؤقت 👁️</button>
              </div>
            </div>
          </div>

          {authError && <p style={{ color: '#ff4a4a', fontSize: '14px', margin: '15px 0 0 0' }}>{authError}</p>}
        </div>
      </div>
    );
  }

  // الواجهة الرئيسية للموقع بعد تسجيل الدخول
  return (
    <div style={{ background: '#0b0b0b', minHeight: '100vh', color: '#fff', direction: 'rtl', fontFamily: 'sans-serif', paddingBottom: '50px' }}>
      
      {/* الشريط المتحرك الذكي */}
      <div style={{ background: isAlertActive ? '#ff4a4a' : '#d4af37', color: '#000', padding: '10px 0', fontWeight: 'bold', overflow: 'hidden', position: 'relative' }}>
        <marquee scrollamount="5" style={{ fontSize: '15px' }}>{marqueeText}</marquee>
      </div>

      <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* قسم مدح القادة الأوفياء والملك عبدالعزيز رحمه الله */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px', margin: '20px 0 35px 0', textAlign: 'center' }}>
          <div style={{ background: '#141414', border: '1px solid #222', padding: '15px', borderRadius: '12px' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>🇸🇦</div>
            <h4 style={{ margin: '0 0 5px 0', color: '#d4af37' }}>الملك عبدالعزيز آل سعود</h4>
            <p style={{ margin: '0', fontSize: '11px', color: '#aaa', lineStyle: '1.4' }}>رحمه الله وأسكنه فسيح جناته، مؤسس الدولة وباني مجدها العريق على التوحيد والأمان.</p>
          </div>
          <div style={{ background: '#141414', border: '1px solid #222', padding: '15px', borderRadius: '12px' }}>
            <div style={{ fontSize: '30px', marginBottom: '8px' }}>🇸🇦</div>
            <h4 style={{ margin: '0 0 5px 0', color: '#d4af37' }}>خادم الحرمين الشريفين</h4>
