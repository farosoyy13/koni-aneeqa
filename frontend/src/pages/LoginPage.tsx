import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isQuaking, setIsQuaking] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'user' | 'moderator' | 'owner'>('owner');
  const navigate = useNavigate();
  const ownerEmail = "farosoyy13@gmail.com";

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

  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (checkXSSAttack(email) || checkXSSAttack(password)) return;
    if (!email.trim() || !password.trim()) {
      alert('يرجى تعبئة كافة الحقول المطلوبة.');
      return;
    }
    setIsScanning(true);
    try {
      if (selectedRole === 'owner' && email.toLowerCase() !== ownerEmail) {
        setIsScanning(false);
        await sendSecurityAlert('محاولة انتحال شخصية المالك', `قام شخص مجهول بمحاولة دخول بوابة المالك بالبريد: (${email})`);
        alert('تحذير أمني: البريد غير مصرح له بالدخول كصاحب للموقع.');
        return;
      }
      await signInWithEmailAndPassword(auth, email, password);
      setIsQuaking(true);
      setTimeout(() => {
        setIsQuaking(false);
        setIsScanning(false);
        navigate('/admin');
      }, 3000);
      alert("تم تسجيل الدخول بنجاح.");
    } catch (err: any) {
      setIsScanning(false);
      setError('خطأ في الهوية الملكية.');
      await sendSecurityAlert('فشل تسجيل الدخول', `محاولة دخول فاشلة بالبريد (${email}) عبر بوابة (${selectedRole})`);
    }
  };

  const handleGhostLogin = async () => {
    const confirmGhost = window.confirm("هل ترغب بدخول المنصة بوضع الشبح السري؟");
    if (confirmGhost) {
      setIsScanning(true);
      try {
        await signInWithEmailAndPassword(auth, ownerEmail, "وضع_الشبح_المخفي_الخاص_بالمطور");
        setIsScanning(false);
        navigate('/admin');
      } catch (err) {
        setIsScanning(false);
      }
    }
  };

  return (
    <div className={isQuaking ? 'quake-effect' : ''} style={{
      minHeight: '100vh', background: '#020202', padding: '40px 20px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '35px',
      fontFamily: '"Cairo", sans-serif', direction: 'rtl'
    }}>
      <style>{`
        .quake-effect { animation: ownerQuake 0.4s infinite; }
        @keyframes ownerQuake { 0%, 100% {transform: translate(0)} 50% {transform: translate(-8px, 8px)} }
        .royal-box { border: 3px solid #d4af37; background: linear-gradient(145deg, #0a0a0a, #151515); border-radius: 30px; padding: 30px; color: #fff; transition: 0.3s; box-shadow: 0 5px 25px rgba(212,175,55,0.05); position: relative; overflow: hidden; }
        .royal-box:hover { border-color: #f3e092; }
        .owner-box-premium { border: 3px dashed #d4af37; background: radial-gradient(circle, #111 0%, #000 100%); }
        .biometric-scan { position: absolute; top: 0; left: 0; width: 100%; height: 4px; background: #d4af37; box-shadow: 0 0 20px #d4af37; }
      `}</style>
      <div style={{ width: '100%', maxWidth: '750px', background: '#111', border: '1px solid #d4af37', borderRadius: '15px', padding: '10px 20px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <marquee direction="right" scrollamount="5" style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>
          🇸🇦 رؤية خاصة للملوك والشعب السعودي.
        </marquee>
      </div>
      <div className="royal-box owner-box-premium" style={{ width: '100%', maxWidth: '750px' }}>
        {isScanning && <div className="biometric-scan" />}
        <div
          onDoubleClick={handleGhostLogin}
          title="اضغط مرتين للدخول كشبح مخفي"
          style={{ position: 'absolute', top: 15, right: 15, width: 12, height: 12, background: '#ff0000', borderRadius: '50%', cursor: 'pointer', boxShadow: '0 0 10px #ff0000', zIndex: 99 }} />
        <h1 style={{ color: '#d4af37', textAlign: 'center', fontSize: '25px', fontWeight: '900', marginTop: '10px', marginBottom: '5px', textShadow: '0 0 20px #d4af37', letterSpacing: '1px' }}>⚜️ صَاحِبْ مَوْقِعْ أَنَاقَةْ CHIC ⚜️</h1>
        <p style={{ color: '#aaa', textAlign: 'center', fontSize: '12px', marginTop: 0, marginBottom: '25px', fontWeight: 'bold' }}>بروتوكولات التفريد السيادية وحماية بيانات وحراج النخبة الشامل</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '25px' }}>
          <button type="button" onClick={() => setSelectedRole('user')} style={{ background: selectedRole === 'user' ? 'linear-gradient(45deg, #d4af37, #f3e092)' : '#222', color: selectedRole === 'user' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', transition: '0.3s' }}>👤 دخول الزوار</button>
          <button type="button" onClick={() => setSelectedRole('moderator')} style={{ background: selectedRole === 'moderator' ? 'linear-gradient(45deg, #d4af37, #f3e092)' : '#222', color: selectedRole === 'moderator' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', transition: '0.3s' }}>🔑 دخول المشرفين</button>
          <button type="button" onClick={() => setSelectedRole('owner')} style={{ background: selectedRole === 'owner' ? 'linear-gradient(45deg, #d4af37, #f3e092)' : '#222', color: selectedRole === 'owner' ? '#111' : '#fff', border: '1px solid #d4af37', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '11px', transition: '0.3s' }}>👑 دخول المالك</button>
        </div>
        <form onSubmit={handleOwnerLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '12px' }}>
          <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '11px', borderRadius: '7px' }} required />
          <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} style={{ padding: '11px', borderRadius: '7px' }} required />
          <button type="submit" style={{ padding: '12px', background: '#d4af37', color: '#111', borderRadius: '8px', fontWeight: 'bold' }}>دخول</button>
          {error && <div style={{ color: 'red', fontSize: '12px' }}>{error}</div>}
        </form>
      </div>
    </div>
  );
}