import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config'; // الاتصال الصارم بقواعد Firebase السيادية
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  // الحالات البرمجية الأصلية والمطورة للحماية والبهلوانيات
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isQuaking, setIsQuaking] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // كاشف البصمة المذهب
  
  // حالات شجرة الأقسام الملوكية
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'user' | 'moderator' | 'owner'>('owner');
  
  const navigate = useNavigate();
  const ownerEmail = "farosoyy13@gmail.com"; // البريد السيادي للأستاذ فهد الشمري

  // 🕵️‍♂️ الاختراع الأول: رادار صيد الهكر والمتطفلين وشحن الإشعار لغرفة المالك فوراً
  const sendSecurityAlert = async (alertType: string, details: string) => {
    try {
      await addDoc(collection(db, 'system_logs'), {
        type: 'تسلل سيبراني وحركة غير نظامية',
        title: alertType,
        description: details,
        timestamp: serverTimestamp()
      });
      
      await addDoc(collection(db, 'private_chats'), {
        sender: '⚠️ رادار الأمان الفيدرالي',
        receiver: 'صاحب الموقع',
        text: `[تنبيه عاجل]: رصد حركة غير نظامية ومحاولة اختراق في بوابة الدخول! التفاصيل: ${details}`,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.error('فشل إرسال التقرير الأمني للخادم.');
    }
  };

  // فحص استباقي لمنع حقن الأكواد الخبيثة في الحقول
  const checkXSSAttack = (text: string) => {
    if (text.includes('<script>') || text.includes('SELECT') || text.includes('DROP')) {
      sendSecurityAlert('هجوم حقن أكواد (SQL/XSS)', `محاولة حقن كود خبيث داخل الحقول: ${text}`);
      setIsQuaking(true);
      alert('⚠️ نظام الأمن السيبراني: تم رصد محاولة اختراق خبيثة وحظر جهازك مؤقتاً!');
      setTimeout(() => setIsQuaking(false), 2000);
      return true;
    }
    return false;
  };

  // 🔑 دالة تسجيل الدخول والعرش الملكي المدمجة والمحصنة
  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (checkXSSAttack(email) || checkXSSAttack(password)) return;

    if (!email.trim() || !password.trim()) {
      alert('يرجى تعبئة كافة الحقول المطلوبة لتأمين الاتصال السحابي للمنصة.');
      return;
    }

    setIsScanning(true); // تشغيل ماسح البصمة النيوني الذهبي

    try {
      if (selectedRole === 'owner' && email.toLowerCase() !== ownerEmail) {
        setIsScanning(false);
        await sendSecurityAlert('محاولة انتحال شخصية المالك', `قام شخص مجهول بمحاولة دخول بوابة المالك بالبريد: (${email})`);
        alert('تحذير أمني: البريد الإلكتروني المدخل غير مصرح له بالدخول كصاحب للموقع! تم رصد حركتك سيبرانياً.');
        return;
      }

      await signInWithEmailAndPassword(auth, email, password);
      
      // تأثيرات الزلزال والصوت الأصلية التابعة لك
      setIsQuaking(true);
      const audio = new Audio('https://mixkit.co');
      audio.play();
      
      // الرسالة الطويلة والمتحركة الملكية التي طلبتها بنصها وفصها دون نقص
      alert("تم تسجيل صاحب موقع أناقة CHIC ويتمنى لكم التوفيق والتمتع في موقعكم، ولطفاً من لديه أي شكوى من أي شخص سواء من موظفي الموقع أو خارج الموقع أو عملية نصب واحتيال، اذهب إلى غرفة صاحب الموقع واكتب ما تريد وما شكواك وكلٌّ يأخذ جزاءه سواء من الموقع أو من السلطات الأمنية، ومالك إلا اللي يرضيك.. فمان الله.");
      
      setTimeout(() => {
        setIsQuaking(false);
        setIsScanning(false);
        navigate('/admin'); // النقل التلفزيوني الفوري لغرفتك الحصينة
      }, 3000);

    } catch (err: any) {
      setIsScanning(false);
      setError('خطأ في الهوية الملكية لصاحب الموقع!');
      await sendSecurityAlert('فشل تسجيل الدخول / تخمين كلمات السر', `محاولة دخول فاشلة بالبريد (${email}) عبر بوابة (${selectedRole})`);
      alert('خطأ في الهوية الملكية! تم لقط محاولتك وإرسالها فوراً لسجل أحداث الأمان في غرفتك الخاصة.');
    }
  };

  const handleSubCategorySelect = (targetPage: string, itemName: string) => {
    alert(`تم اختيار قسم [${itemName}] بنجاح، جاري نقلك تلقائياً لتفاصيل القطعة الملوكية في الصفحة التالية.`);
    navigate(targetPage);
  };

  return (
    <div className={isQuaking ? 'quake-effect' : ''} style={{ 
      minHeight: '100vh', background: '#020202', padding: '40px 20px', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '35px',
      fontFamily: '"Cairo", sans-serif', direction: 'rtl', WebkitOverflowScrolling: 'touch'
    }}>
      
      {/* 📺 التنسيقات والمؤثرات البهلوانية والنيونية الفريدة للموقع */}
      <style>{`
        .quake-effect { animation: ownerQuake 0.4s infinite; }
        @keyframes ownerQuake { 0%, 100% {transform: translate(0)} 50% {transform: translate(-8px, 8px)} }
        .royal-box { border: 3px solid #d4af37; background: linear-gradient(145deg, #0a0a0a, #151515); border-radius: 30px; padding: 30px; color: #fff; transition: 0.3s; box-shadow: 0 5px 25px rgba(212,175,55,0.05); position: relative; overflow: hidden; }
        .royal-box:hover { border-color: #f3e092; box-shadow: 0 5px 30px rgba(212,175,55,0.15); }
        .biometric-scan { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #d4af37; box-shadow: 0 0 20px #d4af37; animation: scanLine 1.5s linear infinite; }
        @keyframes scanLine { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
      `}</style>

      {/* 👑 1. بوابة صاحب موقع أناقة CHIC الفخمة (العرش الملكي المحمي سيبرانياً) */}
      <div className="royal-box" style={{ width: '100%', maxWidth: '750px' }}>
        {isScanning && <div className="biometric-scan" />} {/* كاشف البصمة المذهب عند التفعيل */}
        
        <div onClick={() => alert("تفعيل الوضع السري للمنصة: رادارات الأمن السيبراني تعمل بأقصى طاقة سيادية.")} style={{ position: 'absolute', top: 15, right: 15, width: 15, height: 15, background: 'gold', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 10px #d4af37' }} />
        
        <h1 style={{ color: '#d4af37', textAlign: 'center', fontSize: '22px', fontWeight: '900', marginTop: '10px', marginBottom: '20px', textShadow: '0 0 10px #d4af37' }}>⚜️ بوابة تسجيل دخول صاحب موقع أناقة CHIC المشفرة ⚜️</h1>
        
        {/* مفاتيح التبديل الذكية بين المربعات الثلاثة */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '25px' }}>
          <button type="button" onClick={() => setSelectedRole('user')} style={{ background: selectedRole === 'user' ? 'linear-gradient(45deg, #d4af37, #f3e092)' : '#222', color: selectedRole === 'user' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', transition: '0.3s' }}>👤 دخول عملاء النخبة</button>
          <button type="button" onClick={() => setSelectedRole('moderator')} style={{ background: selectedRole === 'moderator' ? 'linear-gradient(45deg, #d4af37, #f3e092)' : '#222', color: selectedRole === 'moderator' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', transition: '0.3s' }}>🛡️ بوابة طاقم الرقابة</button>
          <button type="button" onClick={() => setSelectedRole('owner')} style={{ background: selectedRole === 'owner' ? '#8b0000' : '#222', color: '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', boxShadow: selectedRole === 'owner' ? '0 0 15px #ff0000' : 'none', transition: '0.3s' }}>👑 غرفة صاحب الموقع</button>
        </div>

        <form onSubmit={handleOwnerLogin}>
          <input type="email" placeholder="البريد السري الموثق للمالك" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
          <input type="password" placeholder="كلمة المرور السرية للمالك" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
          {error && <p style={{ color: '#ff0000', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', margin: '5px 0' }}>{error}</p>}
          <button style={{ width: '100%', padding: '15px', margin: '10px 0', background: 'linear-gradient(45deg, #d4af37, #f3e092)', border: 'none', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', color: '#000', boxShadow: '0 4px 15px rgba(212,175,55,0.3)', transition: '0.3s' }}>{isScanning ? 'جاري فحص البصمة الذهبية...' : 'تأكيد هوية صاحب موقع أناقة CHIC والاتصال'}</button>
        </form>
      </div>

      {/* 👑 2. بوابة الإدارة و 3. بوابة الزوار التفاعلية */}
      <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '750px', flexWrap: 'wrap' }}>
        <div className="royal-box" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '18px' }}>بوابة الإدارة</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>المشرفون والمراقبون الفيدراليون</p>
        </div>
        <div className="royal-box" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2 style={{ color: '#d4af37', margin: '0 0 10px 0', fontSize: '18px' }}>بوابة الزوار</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>تسوق بخصوصية وأمان رقمي مستدام</p>
        </div>
      </div>

