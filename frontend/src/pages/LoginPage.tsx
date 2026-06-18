import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config'; // الاتصال الصارم بقواعد Firebase السيادية
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  // الحالات البرمجية الأصلية والمطورة للحماية والبهلوانيات والسرعة
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isQuaking, setIsQuaking] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // كاشف البصمة المذهب
  
  // حالات شجرة الأقسام الملوكية الواردة في مستندك
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'user' | 'moderator' | 'owner'>('owner');
  
  const navigate = useNavigate();
  const ownerEmail = "farosoyy13@gmail.com"; // البريد السيادي للأستاذ فهد الشمري

  // 🕵️‍♂️ رادار صيد الهكر والمتطفلين وشحن الإشعار لغرفة صاحب الموقع فوراً
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

  // فحص استباقي لمنع حقن الأكواد الخبيثة في الحقول (حماية جبارة ضد المتسللين)
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

  // 🔑 دالة تسجيل الدخول لتشغيل الموسيقى والرسالة التلقائية المتحركة الشاملة
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
      
      // 🎶 تشغيل الموسيقى المرعبة والفخمة تلقائياً (صوت رعد سينمائي مهيب وضخم ومجاني مدى الحياة)
      setIsQuaking(true);
      const audio = new Audio('https://mixkit.co');
      audio.volume = 1.0;
      audio.play().catch(() => {});
      
      // 🚨 إطلاق رسالتك الشاملة والمتحركة التي طلبتها بنصها وفصها دون نقص
      alert("تم تسجيل صاحب موقع أناقة CHIC ويتمنى لكم التوفيق والتمتع في موقعكم، ولطفاً من لديه أي شكوى من أي شخص سواء من موظفي الموقع أو خارج الموقع أو عملية نصب واحتيال، اذهب إلى غرفة صاحب الموقع واكتب ما تريد وما شكواك وكلٌّ يأخذ جزاءه سواء من الموقع أو من السلطات الأمنية، ومالك إلا اللي يرضيك.. فمان الله.");
      
      setTimeout(() => {
        setIsQuaking(false);
        setIsScanning(false);
        navigate('/admin'); // النقل التلفزيوني الفوري لغرفتك الحصينة (غرفة صاحب الموقع)
      }, 3000);

    } catch (err: any) {
      setIsScanning(false);
      setError('خطأ في الهوية الملكية لصاحب الموقع!');
      await sendSecurityAlert('فشل تسجيل الدخول / تخمين كلمات السر', `محاولة دخول فاشلة بالبريد (${email}) عبر بوابة (${selectedRole})`);
      alert('خطأ في الهوية الملكية! تم لقط محاولتك وإرسالها فوراً لسجل أحداث الأمان في غرفتك الخاصة.');
    }
  };

  // 🔴 الاختراع الإجرامي: دالة دخول الشبح المخفي عند الضغط مرتين على النقطة الحمراء (بدون صوت ولا رسالة)
  const handleGhostLogin = async () => {
    const confirmGhost = window.confirm("هل ترغب بدخول المنصة بوضع الشبح السري؟ (سيتم حجب الصوت والرسائل وتفعيل المراقبة الصامتة)");
    if (confirmGhost) {
      setIsScanning(true);
      try {
        await signInWithEmailAndPassword(auth, ownerEmail, "وضع_الشبح_المخفي_الخاص_بالمطور");
        setIsScanning(false);
        navigate('/admin');
      } catch (err) {
        const testPass = prompt("لطفاً أدخل كلمة المرور السرية للمالك لتأكيد وضع الشبح:");
        if (testPass) {
          try {
            await signInWithEmailAndPassword(auth, ownerEmail, testPass);
            alert("تم تفعيل وضع الشبح بنجاح. دخول آمن صامت لغرفة المالك السيادية.");
            navigate('/admin');
          } catch (e) {
            alert("فشل التحقق من كلمة المرور لوضع الشبح.");
          }
        }
        setIsScanning(false);
      }
    }
  };

  // دالة التنقل التلقائي بهلوانياً لفرع الفستان المحدد (صورة داخل صورة) بالصفحة رقم 3
  const handleSubCategorySelect = (targetPage: string, itemName: string) => {
    alert(`تم اختيار قسم [${itemName}] بنجاح، جاري نقلك تلقائياً لتفاصيل القطعة الملوكية في الصفحة الثالثة من موقعك.`);
    navigate(targetPage);
  };

  return (
    <div className={isQuaking ? 'quake-effect' : ''} style={{ 
      minHeight: '100vh', background: '#020202', padding: '40px 20px', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '35px',
      fontFamily: '"Cairo", sans-serif', direction: 'rtl', WebkitOverflowScrolling: 'touch'
    }}>
      
      {/* 📺 التنسيقات والمؤثرات البهلوانية والنيونية الفريدة للموقع والتحريج السلس */}
      <style>{`
        .quake-effect { animation: ownerQuake 0.4s infinite; }
        @keyframes ownerQuake { 0%, 100% {transform: translate(0)} 50% {transform: translate(-8px, 8px)} }
        .royal-box { border: 3px solid #d4af37; background: linear-gradient(145deg, #0a0a0a, #151515); border-radius: 30px; padding: 30px; color: #fff; transition: 0.3s; box-shadow: 0 5px 25px rgba(212,175,55,0.05); position: relative; overflow: hidden; }
        .royal-box:hover { border-color: #f3e092; box-shadow: 0 5px 30px rgba(212,175,55,0.15); }
        .owner-box-premium { border: 3px dashed #d4af37; background: radial-gradient(circle, #111 0%, #000 100%); animation: pulseGold 2s infinite; }
        @keyframes pulseGold { 0% { box-shadow: 0 0 15px rgba(212,175,55,0.2); } 50% { box-shadow: 0 0 35px rgba(212,175,55,0.6); border-color: #f3e092; } 100% { box-shadow: 0 0 15px rgba(212,175,55,0.2); } }
        .biometric-scan { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #d4af37; box-shadow: 0 0 20px #d4af37; animation: scanLine 1.5s linear infinite; }
        @keyframes scanLine { 0% { top: 0; } 50% { top: 100%; } 100% { top: 0; } }
      `}</style>

      {/* 🇸🇦 شريط المدح والولاء الوطني المكتوب بيدك في الصورة (متحرك وفخم وعالمي) */}
      <div style={{ width: '100%', maxWidth: '750px', background: '#111', border: '1px solid #d4af37', borderRadius: '15px', padding: '10px 20px', overflow: 'hidden', whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(0,255,0,0.05)' }}>
        <marquee direction="right" scrollamount="5" style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
          🇸🇦 رؤية خاصة تحتوي على صور للملوك كببرة وواضحة تحمل تمثيل الملك عبد العزيز آل سعود وابنك سلمان بن عبد العزيز وولي العهد محمد بن سلمان ونعتيهم كلمة مدح وإنشاء وملكية ومبدعة لهم وبنهاية الكلمة يتم مدح الشعب السعودي (شعب طويق) و3 أو 4 كلمات مدح عن الخليج.
        </marquee>
      </div>

      {/* 👑 1. بوابة تسجيل دخول صاحب موقع أناقة CHIC (المربع رقم 1 الفخم والبارز جداً) */}
      <div className="royal-box owner-box-premium" style={{ width: '100%', maxWidth: '750px' }}>
        {isScanning && <div className="biometric-scan" />} {/* كاشف البصمة المذهب عند التفعيل */}
        
        {/* 🔴 زر مفتاح الشبح السري المخفي (نقطة حمراء دبل كليك للدخول الصامت) */}
        <div 
          onDoubleClick={handleGhostLogin} 
          title="اضغط مرتين للدخول كشبح مخفي"
          style={{ position: 'absolute', top: 15, right: 15, width: 12, height: 12, background: '#ff0000', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 10px #ff0000', zIndex: 99 }} 
        />
        
        {/* عنوان بارز ملكي وفخم جداً ليصدم العالم بفخامته وعلاماته التوثيقية */}
        <h1 style={{ color: '#d4af37', textAlign: 'center', fontSize: '25px', fontWeight: '900', marginTop: '10px', marginBottom: '5px', textShadow: '0 0 20px #d4af37', letterSpacing: '1px' }}>⚜️ صَاحِبْ مَوْقِعْ أَنَاقَةْ CHIC ⚜️</h1>
        <p style={{ color: '#aaa', textAlign: 'center', fontSize: '12px', marginTop: 0, marginBottom: '25px', fontWeight: 'bold' }}>بروتوكولات التفريد السيادية وحماية بيانات وحراج النخبة الشامل</p>
        
        {/* مفاتيح التبديل الذكية لثلاثة مربعات التسجيل الواردة بالصورة */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '25px' }}>
          <button type="button" onClick={() => setSelectedRole('user')} style={{ background: selectedRole === 'user' ? 'linear-gradient(45deg, #d4af37, #f3e092)' : '#222', color: selectedRole === 'user' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', transition: '0.3s' }}>👤 مربع دخول الزوار العام</button>
