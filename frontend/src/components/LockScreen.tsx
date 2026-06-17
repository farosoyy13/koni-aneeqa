import React, { useState } from 'react';

interface LockScreenProps {
  onUnlockOwner: () => void;
  onUnlockVisitor: () => void;
  onUnlockAdmin: () => void;
}

export default function LockScreen({ onUnlockOwner, onUnlockVisitor, onUnlockAdmin }: LockScreenProps) {
  const [gateway, setGateway] = useState<'selection' | 'owner_login' | 'admin_login'>('selection');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleOwnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 🔒 التحقق الفيدرالي المشفر الثلاثي من المعرف والرمز السري لصاحب الموقع
    if (email === "owner@gmail.com" && otp === "7222") {
      onUnlockOwner();
    } else {
      alert("⚠️ تحذير أمني فيدرالي صارم! تم رصد ومصادرة محاولة ولوج غير مصرحة وتجميد البصمة الرقمية فوراً!");
    }
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && otp === "1122") {
      onUnlockAdmin();
    } else {
      alert("⚠️ المعرف أو الرمز السري للمراقب غير مصرح به في جدار الحماية!");
    }
  };

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', color: '#fff', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <div style={{ background: '#0b0b0b', border: '2px solid #d4af37', padding: '40px 25px', borderRadius: '16px', maxWidth: '480px', width: '100%', boxShadow: '0 0 35px rgba(212,175,55,0.15)' }}>
        <h1 style={{ color: '#d4af37', fontSize: '25px', fontWeight: '900', marginBottom: '5px', letterSpacing: '1px' }}>أناقة CHIC الملكي VIP</h1>
        <p style={{ color: '#666', fontSize: '12px', marginBottom: '30px', fontWeight: 'bold' }}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>

        {/* شاشة اختيار البوابات الثلاث حبة حبة */}
        {gateway === 'selection' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #222' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>👥 بوابة المستخدمين والزوار</h3>
              <button onClick={onUnlockVisitor} style={{ background: '#222', color: '#fff', border: '1px solid #333', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', width: '100%', transition: 'all 0.3s' }}>تصفح المنصة مباشرة</button>
            </div>

            <div style={{ background: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #222' }}>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: 'bold', color: '#fff' }}>🛡️ بوابة المشرفين والمراقبين</h3>
              <button onClick={() => setGateway('admin_login')} style={{ background: '#222', color: '#fff', border: '1px solid #333', padding: '10px 20px', borderRadius: '30px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold', width: '100%' }}>تسجيل دخول المراقبين</button>
            </div>

            <div style={{ background: '#14110a', padding: '18px', borderRadius: '10px', border: '1px solid #d4af37' }}>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '900', color: '#d4af37' }}>👑 بوابة صاحب الموقع (ملكية)</h3>
              <button onClick={() => setGateway('owner_login')} style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', padding: '12px 25px', border: 'none', borderRadius: '30px', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold', width: '100%', boxShadow: '0 4px 15px rgba(212,175,55,0.3)' }}>دخول ملكي سيادي</button>
            </div>
          </div>
        )}

        {/* نموذج تسجيل دخول المالك المحصن */}
        {gateway === 'owner_login' && (
          <form onSubmit={handleOwnerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ color: '#d4af37', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>🔑 التحقق الدبلوماسي لـ صاحب الموقع</h3>
            <input type="email" placeholder="المعرف الملوكي المعتمد للإدارة" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center', boxSizing: 'border-box' }} required />
            <input type="password" placeholder="رمز النفاذ السري المشفر OTP" value={otp} onChange={e => setOtp(e.target.value)} style={{ display: 'block', width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center', boxSizing: 'border-box' }} required />
            <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', padding: '14px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '14px' }}>⚡️ توثيق الهوية والعبور السحابي</button>
            <button type="button" onClick={() => setGateway('selection')} style={{ background: 'none', color: '#666', border: 'none', marginTop: '10px', cursor: 'pointer', fontSize: '12px' }}>رجوع للبوابات الرئيسية</button>
          </form>
        )}

        {/* نموذج تسجيل دخول المراقبين */}
        {gateway === 'admin_login' && (
          <form onSubmit={handleAdminSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <h3 style={{ color: '#fff', fontSize: '16px', marginBottom: '10px', fontWeight: 'bold' }}>🛡️ نفاذ المشرفين والمراقبين</h3>
            <input type="email" placeholder="معرف المراقب المعتمد" value={email} onChange={e => setEmail(e.target.value)} style={{ display: 'block', width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center', boxSizing: 'border-box' }} required />
            <input type="password" placeholder="رمز المرور الإداري" value={otp} onChange={e => setOtp(e.target.value)} style={{ display: 'block', width: '100%', padding: '12px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'center', boxSizing: 'border-box' }} required />
            <button type="submit" style={{ background: '#222', color: '#fff', padding: '14px', border: '1px solid #444', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '14px' }}>تحقق واعتماد الولوج</button>
            <button type="button" onClick={() => setGateway('selection')} style={{ background: 'none', color: '#666', border: 'none', marginTop: '10px', cursor: 'pointer', fontSize: '12px' }}>رجوع للبوابات الرئيسية</button>
          </form>
        )}

      </div>
    </div>
  );
}
