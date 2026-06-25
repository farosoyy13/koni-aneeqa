import React, { useState, useEffect } from 'react';

interface HomeProps {
  onNavigate?: (channel: number) => void;
  onSelectCategory?: (category: string) => void;
}

export default function Home({ onNavigate, onSelectCategory }: HomeProps) {
  const [loginRole, setLoginRole] = useState<'visitor' | 'admin' | 'owner' | null>(null);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showOwnerMarquee, setShowOwnerMarquee] = useState(false);
  const [userComment, setUserComment] = useState('');

  // بروتوكول النغمة والرسالة الرسمية الصارمة لصاحب الموقع
  useEffect(() => {
    if (isLoggedIn && loginRole === 'owner') {
      setShowOwnerMarquee(true);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(120, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.4, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 1.2);
    }
  }, [isLoggedIn, loginRole]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === 'owner' && password === '1313') {
      setIsLoggedIn(true);
    } else if (loginRole === 'admin' && password === '7222') {
      setIsLoggedIn(true);
    } else {
      alert('⚠️ رمز الحماية والتحصين غير صحيح!');
    }
  };

  const handleBranchClick = (catName: string, channelId: number) => {
    if (onSelectCategory) onSelectCategory(catName);
    if (onNavigate) onNavigate(channelId);
  };

  const [comments, setComments] = useState([
    { name: "أم أحمد - حفر الباطن", text: "الفساتين فخامة وخامتها ممتازة جداً والتوصيل سريع وتعامل راقي" },
    { name: "عميل موثق", text: "المرسيدس مايباخ حالتها وكالة وتعامل صاحب الموقع قمة في الأمان" },
    { name: "سارة - الرياض", text: "العباية الملكية تجنن وخرزها ثابت وفخم للمناسبات والعبايات جودتها عالية" }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (userComment.trim()) {
      setComments([{ name: "عميل موثق للبراند", text: userComment }, ...comments]);
      setUserComment('');
    }
  };

  const officialFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  // 🔐 شاشة بوابات الدخول الثلاثة المعزولة بالخط الرسمي النظيف
  if (!isLoggedIn) {
    return (
      <div style={{ padding: '20px', width: '100%', maxWidth: '380px', margin: '30px auto', fontFamily: officialFont, direction: 'rtl', color: '#fff', textAlign: 'center', background: '#0f0f0f', border: '1px solid #d4af37', borderRadius: '12px' }}>
        <h3 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', marginBottom: '18px' }}>🔐 بوابات تسجيل الدخول الثلاثة 🔐</h3>
        {!loginRole ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button onClick={() => setLoginRole('owner')} style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont }}>👑 بوابة دخول صاحب موقع أناقة CHIC</button>
            <button onClick={() => setLoginRole('admin')} style={{ background: '#151515', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont }}>🛠️ بوابة دخول المشرفين والمراقبين</button>
            <button onClick={() => setIsLoggedIn(true)} style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont }}>👤 بوابة دخول الزوار العام (تصفح مجاني)</button>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل الرقم السري للتحصين..." style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '6px', color: '#fff', textAlign: 'center', fontFamily: officialFont }} autoFocus />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="submit" style={{ flex: 1, background: '#d4af37', color: '#000', padding: '8px', borderRadius: '4px', fontWeight: 'bold', border: 'none', fontFamily: officialFont }}>تأكيد</button>
              <button type="button" onClick={() => setLoginRole(null)} style={{ background: '#222', color: '#fff', padding: '8px', borderRadius: '4px', border: 'none', fontFamily: officialFont }}>رجوع</button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '2px', width: '100%', maxWidth: '100%', margin: '0 auto', fontFamily: officialFont, direction: 'rtl', color: '#ffffff', boxSizing: 'border-box' }}>
      
      {/* شريط الإعلان الأمني الحاسم والتحذيري المخصص لصاحب موقع أناقة CHIC */}
      {showOwnerMarquee && (
        <div style={{ background: '#ff3333', color: '#ffffff', padding: '8px 0', fontSize: '11px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '12px', border: '1px solid #ffffff' }}>
          <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 16s linear infinite' }}>
            ⚠️ إعلان إداري رسمي: تم تسجيل دخول صاحب موقع (أناقة CHIC) بنجاح • نود التنبيه بأنه من لديه استفسار أو شكوى ضد أي موظف في المنصة، أو تعرض لمحاولة نصب أو احتيال من أي شخص، فليتوجه فوراً إلى غرفة صاحب موقع (أناقة CHIC)، وبإذن الله تعالى سوف يتم محاسبة المتسبب ورد المظالم كلياً ⚠️
          </div>
        </div>
      )}

      {/* شريطان متحركان في أعلى الشاشة لإعلانات لفت الانتباه والهمة */}
      <div style={{ background: '#d4af37', color: '#000000', padding: '5px 0', fontSize: '10px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '4px' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 15s linear infinite' }}>
          عروض حصرية ومحدودة لفترة وجيزة على فساتين السهرة VIP الفاخرة • الشحن متوفر لكافة مناطق المملكة ودول الخليج • مرحباً بكم في منصة أناقة CHIC الملكية
        </div>
      </div>
      <div style={{ background: '#111111', color: '#d4af37', padding: '5px 0', fontSize: '9px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '15px', border: '1px solid rgba(212,175,55,0.15)' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 18s linear infinite' }}>
          همتنا مثل جبل طويق ولن تنكسر • ريادة قطاع الممتلكات النادرة والأصول الثمينة • مستهدفات رؤية السعودية 2030
        </div>
      </div>

      {/* 👑 الزاوية الملكية الثابتة والكاملة (صور الملوك وأسمائهم واللافته) */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 100%)', border: '1px solid #d4af37', borderRadius: '12px', padding: '12px', textAlign: 'center', marginBottom: '15px' }}>
        <h2 style={{ color: '#d4af37', fontSize: '15px', fontWeight: 'bold', marginBottom: '12px' }}>ركن الولاء والانتماء لقادة المجد</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '12px' }}>
          <div style={{ flex: 1, maxWidth: '120px', background: '#111', padding: '6px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.15)' }}>
            <div style={{ height: '80px', background: '#222', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🇸🇦</div>
            <p style={{ color: '#d4af37', fontSize: '10px', fontWeight: 'bold', margin: '4px 0 0' }}>الملك سلمان بن عبدالعزيز</p>
          </div>
          <div style={{ flex: 1, maxWidth: '120px', background: '#111', padding: '6px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.15)' }}>
            <div style={{ height: '80px', background: '#222', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👑</div>
            <p style={{ color: '#d4af37', fontSize: '10px', fontWeight: 'bold', margin: '4px 0 0' }}>الأمير محمد بن سلمان</p>
          </div>
        </div>
        <p style={{ color: '#ffffff', fontSize: '11px', lineHeight: '1.5', margin: '0', borderTop: '1px solid rgba(212,175,55,0.15)', paddingTop: '8px', wordBreak: 'break-word', whiteSpace: 'normal' }}>
          "نعتز بهويتنا السعودية الراسخة، ونرفع أسمى آيات الولاء والعرفان إلى مقام خادم الحرمين الشريفين وعضيده الأمين - حفظهم الله ورعاهم وسدد على طريق الخير خطاهم."
        </p>
      </div>

      {/* 🔒 الغرفة السرية الخاصة بصاحب الموقع (تفتح فقط وحصرياً لصاحب موقع أناقة CHIC) */}
      {loginRole === 'owner' && (
        <div style={{ background: 'linear-gradient(135deg, #1f0000 0%, #050505 100%)', border: '1px dashed #ff3333', borderRadius: '10px', padding: '12px', marginBottom: '15px', textAlign: 'center' }}>
          <h4 style={{ color: '#ff3333', fontSize: '13px', fontWeight: 'bold', margin: '0 0 5px' }}>🔒 الغرفة السرية والخاصة بصاحب الحلال</h4>
          <p style={{ color: '#aaa', fontSize: '11px', margin: '0 0 8px' }}>مرحباً بك يا غالي. لوحة التحصين ومراقبة الخزنة السيادية نشطة ومحمية بالكامل.</p>
          <button onClick={() => alert('الخزنة السيادية مؤمنة 100% والمبيعات سليمة.')} style={{ background: '#ff3333', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>📂 الخزنة السيادية</button>
        </div>
      )}

      {/* 📺 مربع الإعلانات التلفزيونية المتحركة التلقائية */}
