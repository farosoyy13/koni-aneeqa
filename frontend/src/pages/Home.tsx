import React from 'react';

export default function Home() {
  return (
    <>
      <div style={{ padding: '20px', maxWidth: '1250px', margin: '0 auto', textAlign: 'center' }}>
        
        {/* بنر ترحيبي فخم وإمبراطوري يشد الانتباه */}
        <div style={{ padding: '40px 20px', background: 'rgba(15,15,15,0.9)', border: '1px solid #d4af37', borderRadius: '16px', marginBottom: '35px', boxShadow: '0 10px 30px rgba(212,175,55,0.05)' }}>
          <h1 style={{ fontFamily: 'Amiri, serif', color: '#d4af37', fontSize: '38px', marginBottom: '12px', fontWeight: '900' }}>
            منصة أناقة CHIC الملكية الفاخرة
          </h1>
          <div style={{ width: '80px', height: '2px', background: '#d4af37', margin: '0 auto 15px' }}></div>
          <p style={{ color: '#aaa', fontSize: '15px', letterSpacing: '1px' }}>
            حيث تلتقي الرقة بالفخامة الرقمية — بوابتك المعتمدة لعالم الأزياء والممتلكات الثمينة
          </p>
        </div>

        {/* عنوان أقسام المتجر الرئيسية الواضحة كالمواقع العالمية */}
        <h2 style={{ color: '#d4af37', fontSize: '20px', marginBottom: '25px', fontWeight: '700' }}>
          ✨ تصفح الأقسام والملابس الملكية ✨
        </h2>

        {/* شبكة الأقسام والفروع الكبرى الأنيقة بلمسة سريعة */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          
          {/* قسم 1: الفساتين الفاخرة */}
          <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.3)', padding: '30px 20px', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>👗</div>
            <h3 style={{ color: '#d4af37', fontSize: '18px', marginBottom: '10px', fontWeight: '700' }}>فساتين السهرة والأعراس</h3>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>تشكيلة راقية من أحدث موديلات الفساتين الفاخرة المصممة خصيصاً للنخبة.</p>
            <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>دخول القسم</button>
          </div>

          {/* قسم 2: العبايات والجلابيات */}
          <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.3)', padding: '30px 20px', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>🧕</div>
            <h3 style={{ color: '#d4af37', fontSize: '18px', marginBottom: '10px', fontWeight: '700' }}>العبايات والجلابيات الملكية</h3>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>تصاميم شرقية ساحرة تجمع بين الاحتشام والأناقة العصرية الفاخرة.</p>
            <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>دخول القسم</button>
          </div>

          {/* قسم 3: الحقائب والأحذية */}
          <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.3)', padding: '30px 20px', borderRadius: '12px' }}>
            <div style={{ fontSize: '32px', marginBottom: '10px' }}>👠</div>
            <h3 style={{ color: '#d4af37', fontSize: '18px', marginBottom: '10px', fontWeight: '700' }}>الحقائب والأحذية النادرة</h3>
            <p style={{ color: '#888', fontSize: '13px', marginBottom: '20px' }}>اكسسوارات ومكملات أناقة من كبرى الماركات العالمية والمحلية الموثقة.</p>
            <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px' }}>دخول القسم</button>
          </div>

        </div>

      </div>
    </>
  );
}
