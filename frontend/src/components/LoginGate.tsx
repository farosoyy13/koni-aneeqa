import React, { useState } from 'react';

interface LoginGateProps {
  onSuccess: (role: 'owner' | 'admin' | 'visitor') => void;
}

export function LoginGate({ onSuccess }: LoginGateProps) {
  const [loginRole, setLoginRole] = useState<'visitor' | 'admin' | 'owner' | null>(null);
  const [password, setPassword] = useState('');

  // دالة فحص كلمات المرور السيادية للبوابات الثلاثة
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginRole === 'owner' && password === '1313') {
      onSuccess('owner');
    } else if (loginRole === 'admin' && password === '7222') {
      onSuccess('admin');
    } else {
      alert('⚠️ رمز الحماية والتحصين غير صحيح!');
    }
  };

  const officialFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  return (
    <div style={{ padding: '20px', width: '100%', maxWidth: '380px', margin: '40px auto', fontFamily: officialFont, direction: 'rtl', color: '#fff', textAlign: 'center', background: '#0f0f0f', border: '1px solid #d4af37', borderRadius: '12px', boxSizing: 'border-box' }}>
      <h3 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', marginBottom: '18px' }}>🔐 بوابات تسجيل الدخول الثلاثة 🔐</h3>
      
      {!loginRole ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={() => setLoginRole('owner')} style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont, fontSize: '13px' }}>👑 بوابة دخول صاحب موقع أناقة CHIC</button>
          <button onClick={() => setLoginRole('admin')} style={{ background: '#151515', color: '#d4af37', border: '1px solid rgba(212,175,55,0.3)', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont, fontSize: '13px' }}>🛠️ بوابة دخول المشرفين والمراقبين</button>
          <button onClick={() => onSuccess('visitor')} style={{ background: '#111', color: '#fff', border: '1px solid #333', padding: '12px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontFamily: officialFont, fontSize: '13px' }}>👤 بوابة دخول الزوار العام (تصفح مجاني)</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ fontSize: '12px', color: '#aaa' }}>{loginRole === 'owner' ? 'جاري الاتصال بالغرفة السرية...' : 'مربع صلاحيات المشرفين...'}</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="أدخل الرقم السري للتحصين..." style={{ background: '#111', border: '1px solid #333', padding: '10px', borderRadius: '6px', color: '#fff', textAlign: 'center', fontFamily: officialFont, fontSize: '13px', width: '100%', boxSizing: 'border-box' }} autoFocus />
          <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
            <button type="submit" style={{ flex: 1, background: '#d4af37', color: '#000', padding: '10px', borderRadius: '4px', fontWeight: 'bold', border: 'none', fontFamily: officialFont, fontSize: '13px', cursor: 'pointer' }}>تأكيد</button>
            <button type="button" onClick={() => { setLoginRole(null); setPassword(''); }} style={{ flex: 1, background: '#222', color: '#fff', padding: '10px', borderRadius: '4px', border: 'none', fontFamily: officialFont, fontSize: '13px', cursor: 'pointer' }}>رجوع</button>
          </div>
        </form>
      )}
    </div>
  );
}
