import React, { useState } from 'react';

export default function HomeView() {
  const [category, setCategory] = useState('الكل الملكي');
  const categories = ['الكل الملكي', 'فساتين فاخرة', 'عبايات ملكية', 'حقائب نادرة', 'مجوهرات وألماس'];

  return (
    <div style={{ padding: '15px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif', height: '100%', display: 'flex', flexDirection: 'column' }}>
      
      {/* هيدر الكتالوج والأقسام - ثابت في الأعلى */}
      <div style={{ textAlign: 'center', marginBottom: '20px', padding: '15px', background: '#111', border: '1px solid #d4af37', borderRadius: '12px' }}>
        <h2 style={{ color: '#d4af37', margin: 0, fontSize: '22px', fontWeight: '900' }}>كتالوج الأزياء والفساتين الملكية الفاخرة</h2>
        <p style={{ color: '#aaa', fontSize: '13px', marginTop: '5px' }}>تصفح الفروع وأحدث الموديلات المتوفرة للتوصيل الفوري</p>
      </div>

      {/* شريط الفئات المتحرك أفقياً بلمسة إصبع - لا ينزل لأسفل */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '5px 0', marginBottom: '20px', whiteSpace: 'nowrap', direction: 'rtl', scrollbarWidth: 'none' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)} style={{ background: category === cat ? '#d4af37' : '#111', color: category === cat ? '#000' : '#fff', border: '1px solid #333', padding: '8px 20px', borderRadius: '25px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>
            {cat}
          </button>
        ))}
      </div>

      {/* شبكة عرض كروت الفساتين والمنتجات - محواة داخل إطار التصفح المربع */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', direction: 'rtl', overflowY: 'auto', paddingBottom: '20px' }}>
        
        {/* كرت فستان 1 */}
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #141414 0%, #050505 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d4af37', color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}>
            ✨ فستان سهرة ملكي فاخر مطرز ✨
          </div>
          <h3 style={{ color: '#d4af37', fontSize: '16px', margin: '15px 0 5px 0', fontWeight: 'bold' }}>فستان سهرة VIP ذيل طويل</h3>
          <p style={{ color: '#aaa', fontSize: '12px', margin: '0 0 15px 0' }}>قماش جوبير فرنسي فاخر متوفر بمقاسات متعددة بالسانتيمتر حسب الطلب.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222', paddingTop: '12px' }}>
            <span style={{ color: '#d4af37', fontWeight: 'black', fontSize: '16px' }}>1,500 ريال</span>
            <a href="https://wa.me" target="_blank" rel="noreferrer" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>حجز فوري</a>
          </div>
        </div>

        {/* كرت عباية 2 */}
        <div style={{ background: '#111', border: '1px solid #222', borderRadius: '12px', padding: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
          <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, #141414 0%, #050505 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d4af37', color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}>
            ✨ عباية بشت ملكية سوداء بخرز ذهبي ✨
          </div>
          <h3 style={{ color: '#d4af37', fontSize: '16px', margin: '15px 0 5px 0', fontWeight: 'bold' }}>عباية بشت فاخرة مطرزة باليد</h3>
          <p style={{ color: '#aaa', fontSize: '12px', margin: '0 0 15px 0' }}>حرير طبيعي كوري ناعم بارد ومريح جداً مناسبة للمناسبات الكبرى والرسمية.</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #222', paddingTop: '12px' }}>
            <span style={{ color: '#d4af37', fontWeight: 'black', fontSize: '16px' }}>850 ريال</span>
            <a href="https://wa.me" target="_blank" rel="noreferrer" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', textDecoration: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', fontSize: '12px', cursor: 'pointer' }}>حجز فوري</a>
          </div>
        </div>

      </div>
    </div>
  );
}
