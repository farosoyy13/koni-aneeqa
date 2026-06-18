import React, { useState } from 'react';

export default function HomeView() {
  const [category, setCategory] = useState('الكل الملكي');
  const categories = ['الكل الملكي', 'فساتين فاخرة', 'عبايات ملكية', 'حقائب نادرة', 'مجوهرات وألماس'];

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px', padding: '25px', background: '#111', border: '1px solid #d4af37', borderRadius: '12px' }}>
        <h2 style={{ color: '#d4af37', margin: 0, fontSize: '26px', fontWeight: '900' }}>منصة أناقة CHIC الملكية الفاخرة</h2>
        <p style={{ color: '#aaa', fontSize: '14px', marginTop: '5px' }}>بوابة التجارة والحراج السحابي والآمن المعتمدة للإدارة العامة</p>
      </div>

      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '10px 0', marginBottom: '30px', whiteSpace: 'nowrap', direction: 'rtl' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ background: category === cat ? '#d4af37' : '#111', color: category === cat ? '#000' : '#fff', border: '1px solid #333', padding: '10px 22px', borderRadius: '25px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', direction: 'rtl' }}>
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '20px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: '240px', background: 'linear-gradient(135deg, #141414 0%, #050505 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d4af37', color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}>
            ✨ مساحة صورة براند فاخرة 4K ✨
          </div>
          <h3 style={{ color: '#d4af37', fontSize: '18px', margin: '20px 0 5px 0', fontWeight: 'bold' }}>تحفة ملوكية فاخرة</h3>
          <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 20px 0' }}>متاحة للتوصيل الفوري مع الفحص الفيدرالي والتحقق من سلامة وجودة القطعة.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222', paddingTop: '15px' }}>
            <span style={{ color: '#d4af37', fontWeight: 'black', fontSize: '18px' }}>1,500 ريال</span>
            <button onClick={() => alert('تمت إضافة التحفة الملكية إلى سلة المشتريات التفاعلية بنجاح!')} style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>أضف إلى السلة</button>
          </div>
        </div>
      </div>
    </div>
  );
}