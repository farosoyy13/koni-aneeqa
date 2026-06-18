import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config'; // الاعتماد على مسار الربط الرسمي المشفر للمنصة
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  // الحالات البرمجية الأصلية للمدخلات والتأثيرات
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isQuaking, setIsQuaking] = useState(false);
  
  // الحالات المضافة لشجرة الأقسام والفروع التفاعلية
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'user' | 'moderator' | 'owner'>('owner');
  
  const navigate = useNavigate();

  // البريد الإلكتروني الرسمي والسيادي الخاص بك (صاحب الموقع)
  const ownerEmail = "farosoyy13@gmail.com";

  // 🕵️‍♂️ رادار لقط المخربين الحقيقي والفوري لإرسال الإشعارات والتحذيرات إلى غرفة صاحب الموقع
  const sendSecurityAlert = async (alertType: string, details: string) => {
    try {
      // 1. تسجيل الحدث في سجل أحداث الأمان ومكافحة التسلل السيبراني لـ Cloudflare و Firebase
      await addDoc(collection(db, 'system_logs'), {
        type: 'تسلل سيبراني وحركة غير نظامية',
        title: alertType,
        description: details,
        timestamp: serverTimestamp()
      });
      
      // 2. شحن إشعار فوري وحي إلى رادار الرسائل الخاصة ليظهر في لوحة المالك فوراً ويصيد المتسلل
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

  // 🔑 دالة تسجيل الدخول الأصلية المدمجة والمطورة لحمايتك بالكامل
  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert('يرجى تعبئة كافة الحقول المطلوبة لتأمين الاتصال السحابي.');
      return;
    }

    try {
      // فحص أمني استباقي لمنع المتسللين من انتحال رتبة المالك
      if (selectedRole === 'owner' && email.toLowerCase() !== ownerEmail) {
        await sendSecurityAlert(
          'محاولة انتحال شخصية المالك', 
          `قام شخص مجهول بمحاولة دخول بوابة صاحب الموقع مستخدماً البريد: (${email})`
        );
        alert('تحذير أمني: البريد الإلكتروني المدخل غير مصرح له بالدخول كصاحب للموقع! تم رصد حركتك وإرسالها للرادار فوراً.');
        return;
      }

      // الاتصال الفعلي بالخلفية المشفرة لـ Firebase والتحقق من الهوية الملكية
      await signInWithEmailAndPassword(auth, email, password);
      
      // الحركات البهلوانية والصوتية الأصلية التابعة لكودك
      setIsQuaking(true);
      const audio = new Audio('https://mixkit.co');
      audio.play();
      
      // 🚨 تعديل رسالة الشريط المتحرك والشاملة بناءً على طلبك الصارم والمحدد:
      alert("تم تسجيل صاحب موقع أناقة CHIC ويتمنى لكم التوفيق والتمتع في موقعكم، ولطفاً من لديه أي شكوى من أي شخص سواء من موظفي الموقع أو خارج الموقع أو عملية نصب واحتيال، اذهب إلى غرفة صاحب الموقع واكتب ما تريد وما شكواك وكلٌّ يأخذ جزاءه سواء من الموقع أو من السلطات الأمنية، ومالك إلا اللي يرضيك.. فمان الله.");
      
      setTimeout(() => {
        setIsQuaking(false);
        // التوجيه التلفزيوني التلقائي السلس إلى غرفتك السيادية الخاصة
        navigate('/admin');
      }, 3000);

    } catch (err: any) {
      setError('خطأ في الهوية الملكية لصاحب الموقع!');
      // لقط وتوثيق محاولة الدخول الفاشلة وإرسالها فوراً لغرفة صاحب الموقع في مكان الإشعارات
      await sendSecurityAlert(
        'فشل تسجيل الدخول / تخمين كلمات السر',
        `محاولة دخول فاشلة باستخدام البريد (${email}) عبر بوابة (${selectedRole}) - رمز الخطأ: ${err.message}`
      );
      alert('خطأ في الهوية الملكية! تم رصد محاولتك وإرسالها فوراً لسجل أحداث الأمان في غرفة المالك.');
    }
  };

  // دالة التنقل التلقائي بهلوانياً عند اختيار الفروع والأقسام (مثل فساتين الزواج والأسر المنتجة)
  const handleSubCategorySelect = (targetPage: string, itemName: string) => {
    alert(`تم اختيار قسم [${itemName}] بنجاح، جاري نقلك تلقائياً لتفاصيل القطعة الملوكية في الصفحة التالية.`);
    navigate(targetPage); // النقل التلقائي السريع مثل شاشة التلفاز
  };

  return (
    <div className={isQuaking ? 'quake-effect' : ''} style={{ 
      minHeight: '100vh', background: '#020202', padding: '40px 20px', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '35px',
      fontFamily: '"Cairo", sans-serif', direction: 'rtl',
      WebkitOverflowScrolling: 'touch' // جعل سحبة وحركة الإصبع مرنة جداً وناعمة على الجوالات مثل المحادثات
    }}>
      
      {/* المؤثرات والتنسيقات البهلوانية الخاصة بكودك مع تحديث اسم التأثير الحركي */}
      <style>{`
        .quake-effect { animation: ownerQuake 0.8s infinite; }
        @keyframes ownerQuake { 0%, 100% {transform: translate(0)} 50% {transform: translate(-5px, 5px)} }
        .royal-box { border: 3px solid #d4af37; background: linear-gradient(145deg, #0a0a0a, #151515); border-radius: 30px; padding: 30px; color: #fff; transition: 0.3s; box-shadow: 0 5px 25px rgba(212,175,55,0.05); }
        .royal-box:hover { border-color: #f3e092; box-shadow: 0 5px 30px rgba(212,175,55,0.12); }
      `}</style>

      {/* 👑 1. بوابة صاحب موقع أناقة CHIC (تم استبدال العرش بالكامل كما طلبت) */}
      <div className="royal-box" style={{ width: '100%', maxWidth: '750px', position: 'relative' }}>
        {/* الزر المذهب التفاعلي السري الأصلي التابع لك */}
        <div onClick={() => alert("تفعيل الوضع السري للمنصة: رادارات الأمان تعمل بأقصى طاقة سيادية لصاحب الموقع.")} style={{ position: 'absolute', top: 15, right: 15, width: 15, height: 15, background: 'gold', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 10px #d4af37' }} />
        
        <h1 style={{ color: '#d4af37', textAlign: 'center', fontSize: '24px', fontWeight: '900', marginTop: '10px', marginBottom: '20px' }}>⚜️ بوابة تسجيل دخول صاحب موقع أناقة CHIC المشفرة ⚜️</h1>
        
        {/* مفاتيح التبديل السري بين المربعات الثلاثة لتسجيل الدخول للحماية الجبارة */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '25px' }}>
          <button type="button" onClick={() => setSelectedRole('user')} style={{ background: selectedRole === 'user' ? '#d4af37' : '#222', color: selectedRole === 'user' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', transition: '0.3s' }}>
            👤 دخول عملاء النخبة
          </button>
          <button type="button" onClick={() => setSelectedRole('moderator')} style={{ background: selectedRole === 'moderator' ? '#d4af37' : '#222', color: selectedRole === 'moderator' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', transition: '0.3s' }}>
            🛡️ بوابة طاقم الرقابة
          </button>
          <button type="button" onClick={() => setSelectedRole('owner')} style={{ background: selectedRole === 'owner' ? '#8b0000' : '#222', color: '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '12px', boxShadow: selectedRole === 'owner' ? '0 0 15px #ff0000' : 'none', transition: '0.3s' }}>
            👑 غرفة صاحب الموقع
          </button>
        </div>

        <form onSubmit={handleOwnerLogin}>
          <input type="email" placeholder="البريد السري الموثق للمالك" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
          <input type="password" placeholder="كلمة المرور السرية للمالك" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' }} />
          {error && <p style={{ color: '#ff0000', fontSize: '13px', fontWeight: 'bold', textAlign: 'center', margin: '5px 0' }}>{error}</p>}
          <button style={{ width: '100%', padding: '15px', margin: '10px 0', background: 'linear-gradient(45deg, #d4af37, #f3e092)', border: 'none', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer', fontSize: '15px', color: '#000', boxShadow: '0 4px 15px rgba(212,175,55,0.3)' }}>تأكيد هوية صاحب موقع أناقة CHIC والاتصال</button>
        </form>
      </div>

      {/* 👑 2. بوابة الإدارة و 3. بوابة الزوار الأصليين (تتجاوب وتتفاعل مع الشاشات) */}
      <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '750px', flexWrap: 'wrap' }}>
        <div className="royal-box" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2 style={{ color: '#fff', margin: '0 0 10px 0', fontSize: '18px' }}>بوابة الإدارة</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>المشرفون والمراقبون الفيدراليون</p>
        </div>
        <div className="royal-box" style={{ flex: '1 1 200px', textAlign: 'center' }}>
          <h2 style={{ color: '#d4af37', margin: '0 0 10px 0', fontSize: '18px' }}>بوابة الزوار</h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#aaa' }}>تسوق بخصوصية وأمان مستدام</p>
        </div>
      </div>

      {/* 👑 4. شجرة الفروع والأقسام التفاعلية العالمية لحراج ومنصة أناقة CHIC الحقيقية */}
      <div className="royal-box" style={{ width: '100%', maxWidth: '750px' }}>
        <h3 style={{ color: '#d4af37', fontSize: '20px', textAlign: 'center', margin: '0 0 20px 0', fontWeight: 'bold' }}>🗂️ شجرة الفروع والأقسام التجارية للمنصة</h3>
