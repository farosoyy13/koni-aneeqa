import React, { useState } from 'react';

export function AdminDashboard() {
  const [isSystemFrozen, setIsSystemFrozen] = useState(false);
  const [isGhostMode, setIsGhostMode] = useState(true);

  // القائمة الكاملة للصلاحيات الـ 15+
  const permissions = [
    "التحكم بالرسائل", "حذف الإعلانات", "حظر المستخدمين", "تعديل الأسعار",
    "سجل الـ IP", "الوصول للمحذوفات", "موافقة مسبقة على الردود", "تقييد الميزانية",
    "تنبيه الإيميل الفوري", "بث الأحداث المباشر", "التحكم في الإعلانات",
    "حظر الأجهزة", "نقل الرسائل", "إدارة صلاحيات المراقبين", "تفعيل وضع الشبح"
  ];

  const toggleEmergencyFreeze = () => {
    setIsSystemFrozen(!isSystemFrozen);
    alert(isSystemFrozen ? "تم استعادة صلاحيات المشرفين" : "تحذير: تم تجميد صلاحيات جميع المشرفين فوراً!");
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#020202', color: '#fff', minHeight: '100vh', fontFamily: '"Cairo", sans-serif' }}>
      
      {/* العنوان الملكي */}
      <h1 style={{ color: '#d4af37', textAlign: 'center', fontSize: '36px', borderBottom: '2px solid #d4af37', paddingBottom: '20px' }}>
        مركز القيادة الملكي (السيطرة المطلقة) 👑
      </h1>

      {/* لوحة التحكم السريع للمالك */}
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '30px' }}>
        <button onClick={toggleEmergencyFreeze} style={{ padding: '15px 30px', background: isSystemFrozen ? '#e74c3c' : '#27ae60', border: 'none', color: '#fff', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          {isSystemFrozen ? 'إلغاء تجميد النظام' : 'زر التجميد الطارئ (Kill Switch)'}
        </button>
        <button onClick={() => setIsGhostMode(!isGhostMode)} style={{ padding: '15px 30px', background: '#3498db', border: 'none', color: '#fff', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>
          وضع الشبح: {isGhostMode ? 'مفعل' : 'معطل'}
        </button>
      </div>

      {/* قسم الذكاء الاصطناعي الملكي الجديد */}
      <section style={{ marginTop: '40px', padding: '20px', border: '2px dashed #d4af37', borderRadius: '20px' }}>
        <h2 style={{ color: '#d4af37' }}>وحدة تحكم المستشار الذكي (AI Consultant)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '10px' }}>
          <div style={{ background: '#111', padding: '15px', borderRadius: '10px' }}>
            <label>رابط سناب شات للمستشار:</label>
            <input type="text" placeholder="أدخل رابط السناب هنا..." style={{ width: '100%', padding: '10px', marginTop: '5px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} />
          </div>
          <div style={{ background: '#111', padding: '15px', borderRadius: '10px' }}>
            <label>سعر السؤال الواحد (ريال):</label>
            <input type="number" defaultValue="2" style={{ width: '100%', padding: '10px', marginTop: '5px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '5px' }} />
          </div>
          <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', padding: '15px', borderRadius: '10px' }}>
            <span>تفعيل نظام الدفع (بعد 3 رسائل مجانية)</span>
            <input type="checkbox" checked style={{ width: '20px', height: '20px', accentColor: '#d4af37' }} />
          </div>
        </div>
      </section>

      {/* لوحة الصلاحيات الـ 15 */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#d4af37' }}>سلطة التحكم المطلق:</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
          {permissions.map((perm, index) => (
            <div key={index} style={{ background: '#111', padding: '15px', borderRadius: '10px', border: '1px solid #d4af37', display: 'flex', justifyContent: 'space-between' }}>
              <span>{perm}</span>
              <input type="checkbox" style={{ accentColor: '#d4af37' }} />
            </div>
          ))}
        </div>
      </section>

      {/* العين الثالثة - سجل الأحداث */}
      <section style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#d4af37' }}>العين الثالثة (الرصد الصامت)</h2>
        <div style={{ background: '#0a0a0a', padding: '20px', borderRadius: '15px', border: '1px solid #555' }}>
          <p>⚠️ لا توجد أنشطة مشبوهة حالياً. نظام المراقبة في حالة استنفار.</p>
        </div>
      </section>

      {/* تذييل ملكي */}
      <div style={{ marginTop: '50px', padding: '30px', background: 'linear-gradient(90deg, #d4af37, #b38f2d)', color: '#000', borderRadius: '20px', textAlign: 'center', fontWeight: '900' }}>
        أنت صاحب السيادة. جميع تحركات الموقع تحت مجهرك الخاص.
      </div>
    </div>
  );
}
