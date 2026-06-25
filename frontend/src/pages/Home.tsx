import React from 'react';

export default function Home() {
  return (
    <>
      <div style={{ padding: '20px', maxWidth: '1250px', margin: '0 auto' }}>
        {/* هيدر ترحيبي فخم يتناسق مع الواجهة الملكية الفاخرة */}
        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '20px', background: 'rgba(15,15,15,0.8)', border: '1px solid #d4af37', borderRadius: '12px' }}>
          <h1 style={{ fontFamily: 'Amiri, serif', color: '#d4af37', fontSize: '36px', marginBottom: '10px' }}>
            منصة أناقة CHIC الملكية الفاخرة
          </h1>
          <p style={{ color: '#ccc', fontSize: '15px' }}>
            بوابة التجارة والحراج الحي الشاملة — أهلاً بكم في عالم الفخامة الرقمية
          </p>
        </div>

        {/* شبكة المنتجات والبضائع الحقيقية لترزق الله فيها */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '25px' }}>
          
          {/* المنتج 1: التمور الملكية */}
          <div style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(212,175,55,0.2)', padding: '25px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
            <div>
              <span style={{ background: '#ff3333', color: '#fff', padding: '2px 8px', fontSize: '11px', fontWeight: 'bold', borderRadius: '3px' }}>🔥 إعلان نشط</span>
              <h3 style={{ color: '#d4af37', margin: '15px 0 10px 0', fontSize: '18px' }}>تمور خلاص ملكي فاخر ونادر جداً</h3>
              <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6' }}>منتقاة بعناية فائقة لقصور ومجالس الفخامة العربية الأصيلة. وزن كرتون متميز وحفظ مستدام.</p>
            </div>
            <div>
              <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '20px', marginTop: '15px' }}>180 ريال</p>
              <a href="https://wa.me" target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', padding: '12px 0', background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                💳 الشراء والدفع الفوري الآمن
              </a>
            </div>
          </div>

          {/* المنتج 2: سيارات مرسيدس */}
          <div style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(212,175,55,0.2)', padding: '25px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
            <div>
              <span style={{ background: '#ff3333', color: '#fff', padding: '2px 8px', fontSize: '11px', fontWeight: 'bold', borderRadius: '3px' }}>🔥 تفاعل عالي</span>
              <h3 style={{ color: '#d4af37', margin: '15px 0 10px 0', fontSize: '18px' }}>سيارة مرسيدس مايباخ الملكية الفخمة S-Class</h3>
              <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6' }}>كاملة المواصفات والمميزات الملوكية الفاخرة، معروضة عبر حركات تصفح لامعة تمنح منصتك رونقاً لا مثيل له.</p>
            </div>
            <div>
              <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '20px', marginTop: '15px' }}>عربون ثابت: 5,000 ريال</p>
              <a href="https://wa.me" target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', padding: '12px 0', background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                💳 دفع العربون الفوري المباشر
              </a>
            </div>
          </div>

          {/* المنتج 3: خدمات المغسلة */}
          <div style={{ background: 'rgba(20,20,20,0.6)', border: '1px solid rgba(212,175,55,0.2)', padding: '25px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifycontent: 'space-between' }}>
            <div>
              <span style={{ background: '#d4af37', color: '#000', padding: '2px 8px', fontSize: '11px', fontWeight: 'bold', borderRadius: '3px' }}>🟢 خدمة موثقة</span>
              <h3 style={{ color: '#d4af37', margin: '15px 0 10px 0', fontSize: '18px' }}>خدمات المغسلة الذكية والـ Dry Clean الملكي</h3>
              <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6' }}>عناية فائقة وفورية بنوع القماش، غسيل، وكي فاخر لملابس العميل الراقي لضمان أعلى مستويات الأناقة المستدامة.</p>
            </div>
            <div>
              <p style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '20px', marginTop: '15px' }}>75 ريال</p>
              <a href="https://wa.me" target="_blank" rel="noreferrer" style={{ display: 'block', width: '100%', padding: '12px 0', background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', textDecoration: 'none', fontWeight: 'bold', borderRadius: '4px', marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
                💳 حجز الخدمة والدفع الفوري
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
