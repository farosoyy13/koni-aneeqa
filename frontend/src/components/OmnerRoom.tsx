import React, { useState } from 'react';

interface OwnerRoomProps {
  broadcastMessage: string;
  onSendBroadcast: (msg: string) => void;
  onLogout: () => void;
}

export default function OwnerRoom({ broadcastMessage, onSendBroadcast, onLogout }: OwnerRoomProps) {
  const [inputBroadcast, setInputBroadcast] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputBroadcast) return;
    onSendBroadcast(inputBroadcast);
    alert("📢 تم بث رسالتك الجماعية فوراً أعلى كافة صفحات المنصة أمام جميع الزوار!");
    setInputBroadcast('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ background: '#111', border: '2px solid #d4af37', padding: '25px', borderRadius: '12px', marginBottom: '30px', textAlign: 'right' }}>
        <h2 style={{ color: '#d4af37', margin: 0, fontSize: '24px', fontWeight: '900' }}>👁️ غرفة العمليات الاستراتيجية ورادار المراقبة السيادية للغرفة</h2>
        <p style={{ color: '#888', fontSize: '13px', marginTop: '5px' }}>مرحباً بك يا سيدي صاحب موقع أناقة CHIC 👑 الصلاحيات كاملة ويتم محاسبة المتسبب قانونياً وصارماً إما عبر أنظمة حظر المنصة التلقائية أو من خلال الرفع الفوري للسلطات الأمنية المختصة.</p>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #1a150c 0%, #0a0a0a 100%)', padding: '25px', borderRadius: '12px', border: '1px solid #d4af37', marginBottom: '30px', textAlign: 'right' }}>
        <h3 style={{ color: '#d4af37', margin: '0 0 10px 0', fontSize: '16px', fontWeight: 'bold' }}>📢 لوحة البث والنداء الجماعي الموحد (نشر تنبيه أو مناداة المشرفين):</h3>
        <p style={{ color: '#aaa', fontSize: '13px', marginBottom: '15px' }}>اكتب أي تنبيه هنا بيدك؛ وبمجرد الضغط على الزر، سيتم بث الرسالة جماعياً وتثبيتها كشريط متحرك أعلى كافة واجهات وصفحات الموقع أمام جميع الزوار حياً وبشكل فوري.</p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
          <input type="text" placeholder="اكتب الإعلان الجماعي أو نداء المشرفين هنا الحين..." value={inputBroadcast} onChange={e => setInputBroadcast(e.target.value)} style={{ flex: 1, padding: '14px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '6px', textAlign: 'right' }} required />
          <button type="submit" style={{ background: '#ff3333', color: '#fff', padding: '0 25px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>🚀 بث الإعلان جماعياً</button>
        </form>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <button onClick={onLogout} style={{ background: '#ff3333', color: '#fff', border: 'none', padding: '10px 30px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>🚪 خروج آمن من غرفة العمليات</button>
      </div>
    </div>
  );
}
