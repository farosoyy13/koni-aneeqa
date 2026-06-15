import React, { useState } from 'react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div style={{ padding: '20px', maxWidth: '1300px', margin: '0 auto', color: '#fff' }}>
      {/* هيدر اللوحة الإدارية الفخم */}
      <div style={{ borderBottom: '2px solid #d4af37', paddingBottom: '15px', marginBottom: '30px' }}>
        <h2 style={{ fontFamily: 'Amiri, serif', color: '#d4af37', fontSize: '30px' }}>
          رادار الرقابة الإدارية والسرية المطلقة | الأستاذ فهد الشمري
        </h2>
        <p style={{ color: '#888', fontSize: '13px', marginTop: '5px' }}>
          🟢 نظام الرصد والتحكم الفوري بالبضائع، والأسعار، والمستخدمين نشط ومحمي بالكامل
        </p>
      </div>

      {/* أزرار التنقل والتحكم السريع داخل اللوحة */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('users')} style={{ padding: '10px 20px', background: activeTab === 'users' ? '#d4af37' : '#1a1a1a', color: activeTab === 'users' ? '#000' : '#bfa15f', border: '1px solid #d4af37', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          👥 مراقبة وطرد المستخدمين
        </button>
        <button onClick={() => setActiveTab('ads')} style={{ padding: '10px 20px', background: activeTab === 'ads' ? '#d4af37' : '#1a1a1a', color: activeTab === 'ads' ? '#000' : '#bfa15f', border: '1px solid #d4af37', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          📝 إدارة الإعلانات والبضائع حياً
        </button>
        <button onClick={() => setActiveTab('chats')} style={{ padding: '10px 20px', background: activeTab === 'chats' ? '#d4af37' : '#1a1a1a', color: activeTab === 'chats' ? '#000' : '#bfa15f', border: '1px solid #d4af37', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          💬 رادار الرسائل الخاصة والسرية
        </button>
      </div>

      {/* محتوى التحكم الفوري بناءً على القسم المختار */}
      <div style={{ background: 'rgba(15,15,15,0.8)', border: '1px solid rgba(212,175,55,0.2)', padding: '25px', borderRadius: '8px' }}>
        
        {activeTab === 'users' && (
          <div>
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>قائمة الأعضاء المتواجدين أونلاين وصلاحيات العزل:</h3>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
              النظام يعرض لك كافة المسجلين بإيميلات جوجل الحقيقية وبصماتهم الرقمية. يمكنك الضغط على زر "طرد وعزل" لتجميد حساب المتسلل فوراً وحظر الآي بي (IP) الخاص به مجاناً [21.1، 21.2].
            </p>
          </div>
        )}

        {activeTab === 'ads' && (
          <div>
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>التحكم الفوري بالأسعار والبضائع والـ Live Ads:</h3>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
              من هنا يمكنك تفعيل التخفيضات الفورية، إضافة بضائع جديدة من أموالك (السيارات، الموالح، الفساتين)، أو حذف أي إعلان تراه مخالفاً للتشريعات الملكية للمنصة بلمحة عين [19.1].
            </p>
          </div>
        )}

        {activeTab === 'chats' && (
          <div>
            <h3 style={{ color: '#d4af37', marginBottom: '15px' }}>رادار التجسس ومراقبة الرسائل الخاصة بين الزوار:</h3>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.6' }}>
              شاشة سرية ومحمية مخصصة لك فقط؛ تعرض نصوص ومحتوى المحادثات والرسائل المتبادلة بين البائع والمشتري لضمان عدم حدوث أي تلاعب مالي أو عمليات سبام، ولحفظ حقوق المنصة ونسبتك التجارية [19.1].
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
