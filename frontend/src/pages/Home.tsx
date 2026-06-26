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

  // بروتوكول النغمة والرسالة الصارمة لصاحب الموقع
  useEffect(() => {
    if (isLoggedIn && loginRole === 'owner') {
      setShowOwnerMarquee(true);
      try {
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
      } catch (e) {
        console.log("Audio presentation handled safely");
      }
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
    { name: "عميل موثق للبراند", text: "المرسيدس مايباخ حالتها وكالة وتعامل صاحب الموقع قمة في الأمان والموثوقية" },
    { name: "سارة - الرياض", text: "العباية الملكية تجنن وخرزها ثابت وفخم للمناسبات والعبايات جودتها عالية جداً" },
    { name: "أبو محمد - الدمام", text: "تمور الخلاص فاخرة جداً ونادرة تبيض الوجه بالمجالس والضيافة العربية الفخمة" },
    { name: "الجوهرة - جدة", text: "خدمة المغسلة والـ Dry Clean سريعة وكي الملابس ممتاز جداً وأنصح بالتعامل معهم" },
    { name: "منيرة الشمري", text: "شنطة الماركة أصلية وتجنن وتغليفها ملكي فخم يليق بالنخبة وسريعين في الرد" },
    { name: "أبو فهد - حائل", text: "موقع متميز ومنظم ونظام حراج فيه آمن جداً للمزايدات الحية والبيع الفوري" },
    { name: "نورة - الأحساء", text: "ملابس الأطفال جودتها ممتازة ومقاساتها بالسانتيمتر دقيقة جداً ومريحة في اللبس" },
    { name: "خالد العنزي", text: "التمور الملكية الفاخرة وصلت في وقت قياسي والتغليف ممتاز ومحكم ومبرد" },
    { name: "أم سلطان - الخبر", text: "جلابيات جيل الذهب وجيل الفضة الفاخر ألوانها ثابتة وتصميمها يجنن وراقي" }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (userComment.trim()) {
      setComments([{ name: "عميل موثق للبراند", text: userComment }, ...comments]);
      setUserComment('');
    }
  };

  const officialFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

  // 🔐 شاشة بوابات الدخول الثلاثة (حماية كاملة من الانبعاث والبعثرة الخارجية)
  if (!isLoggedIn) {
    return (
      <div style={{ margin: '30px auto', padding: '20px', width: '92%', maxWidth: '360px', fontFamily: officialFont, direction: 'rtl', color: '#ffffff', textAlign: 'center', background: '#0f0f0f', border: '1px solid #d4af37', borderRadius: '12px', boxSizing: 'border-box' }}>
        <h3 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', marginBottom: '20px' }}>🔐 بوابات تسجيل الدخول الثلاثة 🔐</h3>
        {!loginRole ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button onClick={() => setLoginRole('owner')} style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000000', border: 'none', padding: '14px 10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont, fontSize: '13px' }}>👑 بوابة دخول صاحب موقع أناقة CHIC</button>
            <button onClick={() => setLoginRole('admin')} style={{ background: '#151515', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', padding: '14px 10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont, fontSize: '13px' }}>🛠️ بوابة دخول المشرفين والمراقبين</button>
            <button onClick={() => setIsLoggedIn(true)} style={{ background: '#111111', color: '#ffffff', border: '1px solid #333333', padding: '14px 10px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont, fontSize: '13px' }}>👤 بوابة دخول الزوار العام (تصفح مجاني)</button>
          </div>
        ) : (
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل الرقم السري للتحصين..." style={{ background: '#111111', border: '1px solid #333333', padding: '12px', borderRadius: '8px', color: '#ffffff', textAlign: 'center', fontFamily: officialFont, fontSize: '14px', width: '100%', boxSizing: 'border-box' }} autoFocus />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" style={{ flex: 1, background: '#d4af37', color: '#000000', padding: '10px', borderRadius: '6px', fontWeight: 'bold', border: 'none', fontFamily: officialFont, fontSize: '13px', cursor: 'pointer' }}>تأكيد</button>
              <button type="button" onClick={() => setLoginRole(null)} style={{ background: '#222222', color: '#ffffff', padding: '10px', borderRadius: '6px', border: 'none', fontFamily: officialFont, fontSize: '13px', cursor: 'pointer' }}>رجوع</button>
            </div>
          </form>
        )}
      </div>
    );
  }

  return (
    <div style={{ padding: '4px', width: '100%', maxWidth: '100%', margin: '0 auto', fontFamily: officialFont, direction: 'rtl', color: '#ffffff', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* شريط الإعلان الإداري الصارم لصاحب موقع أناقة CHIC */}
      {showOwnerMarquee && (
        <div style={{ background: '#ff3333', color: '#ffffff', padding: '8px 0', fontSize: '11px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '12px', border: '1px solid #ffffff', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 16s linear infinite' }}>
            ⚠️ إعلان إداري رسمي: تم تسجيل دخول صاحب موقع (أناقة CHIC) بنجاح • نود التنبيه بأنه من لديه استفسار أو شكوى ضد أي موظف في المنصة، أو تعرض لمحاولة نصب أو احتيال من أي شخص، فليتوجه فوراً إلى غرفة صاحب موقع (أناقة CHIC)، وبإذن الله تعالى سوف يتم محاسبة المتسبب ورد المظالم كلياً ⚠️
          </div>
        </div>
      )}

      {/* شريطان متحركان في أعلى الشاشة لإعلانات لفت الانتباه */}
      <div style={{ background: '#d4af37', color: '#000000', padding: '6px 0', fontSize: '11px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '4px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 15s linear infinite' }}>
          عروض حصرية ومحدودة لفترة وجيزة على فساتين السهرة VIP الفاخرة • الشحن متوفر لكافة مناطق المملكة ودول الخليج • مرحباً بكم في منصة أناقة CHIC الملكية
        </div>
      </div>
      <div style={{ background: '#111111', color: '#d4af37', padding: '6px 0', fontSize: '10px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '15px', border: '1px solid rgba(212,175,55,0.15)', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 18s linear infinite' }}>
          همتنا مثل جبل طويق ولن تنكسر • ريادة قطاع الممتلكات النادرة والأصول الثمينة • مستهدفات رؤية السعودية 2030
        </div>
      </div>

      {/* 👑 الزاوية الملكية الثابتة والكاملة (منضبطة الحواف تمنع البعثرة الجانبية) */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 100%)', border: '1px solid #d4af37', borderRadius: '12px', padding: '12px', textAlign: 'center', marginBottom: '15px', boxSizing: 'border-box', width: '100%' }}>
        <h2 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px' }}>ركن الولاء والانتماء لقادة المجد</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '12px', width: '100%' }}>
          <div style={{ flex: 1, background: '#111111', padding: '8px 4px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.15)', boxSizing: 'border-box' }}>
            <div style={{ height: '70px', background: '#222222', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🇸🇦</div>
            <p style={{ color: '#d4af37', fontSize: '10px', fontWeight: 'bold', margin: '6px 0 0', whiteSpace: 'normal' }}>الملك سلمان بن عبدالعزيز</p>
          </div>
          <div style={{ flex: 1, background: '#111111', padding: '8px 4px', borderRadius: '6px', border: '1px solid rgba(212,175,55,0.15)', boxSizing: 'border-box' }}>
            <div style={{ height: '70px', background: '#222222', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>👑</div>
            <p style={{ color: '#d4af37', fontSize: '10px', fontWeight: 'bold', margin: '6px 0 0', whiteSpace: 'normal' }}>الأمير محمد بن سلمان</p>
          </div>
        </div>
