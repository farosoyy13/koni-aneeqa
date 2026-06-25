import React from 'react';

export default function AboutView() {
  return (
    <main dir="rtl" lang="ar" style={{ padding: '20px', maxWidth: '750px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#eee' }}>
      <article style={{ background: '#0f0f0f', padding: '36px 24px', borderRadius: '16px', border: '1px solid #d4af37', textAlign: 'right', boxShadow: '0 10px 30px rgba(212,175,55,0.08)' }}>
        <h1 style={{ color: '#d4af37', fontSize: '28px', textAlign: 'center', margin: '0 0 16px', fontWeight: '900' }}>من نحن</h1>
        <h2 style={{ color: '#d4af37', fontSize: '22px', textAlign: 'center', margin: '0 0 24px', borderBottom: '1px solid #222', paddingBottom: '12px', fontWeight: '800' }}>✨ السجل الرسمي والتوثيق وتاريخ المنصة ✨</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '14px', lineHeight: '2' }}>
          <p><strong>• هوية المنصة:</strong> براند إلكتروني سيادي وتجاري شامل، مخصص لإدارة الحراج والممتلكات النادرة، وبروتوكولات تشفير سيادية متطورة وحماية ممتدة دولياً لضمان استدامة العمليات السيبرانية بأعلى درجات الأمان الإقليمي.</p>
          
          <p><strong>• المقر الرئيسي والموقع الجغرافي:</strong> تنطلق المنصة رسمياً وتدير عملياتها من قلب المنطقة الشرقية بالمملكة العربية السعودية (المقر الرئيسي: حفر الباطن - طريق الملك فهد).</p>

          <p><strong>• تاريخ التأسيس:</strong> تم تأسيس وتدشين هذا الصرح الرقمي الشامل رسمياً وبصيغة معتمدة عبر الإنترنت عام 2020 م لخدمة عملائنا النخبة في المملكة العربية السعودية ودول الخليج العربي.</p>
          <p>تعتمد المنصة في تشغيلها على بنية تحتية سحابية متطورة وفائقة الذكاء لضمان تجربة تداول ملوكية، محصنة، ومنظومة بتنظمة توزيع وترشيح دولية متقدمة وقواعد بيانات مشفرة، آمنة وفورية.</p>
          
          <p style={{ borderTop: '1px solid #222', paddingTop: '12px', marginTop: '8px' }}>
            <strong>• نطاق الموقع والمستقبل:</strong> ريادة قطاع الممتلكات النادرة والأصول الثمينة؛ الرؤية الملكية والمستقبل رقمياً، وتقديم معايير غير مسبوقة تبث تطلعات النخبة وتواكب التطور الاقتصادي والتنموي في المنطقة.
          </p>
          
          <p>تتلاقى تطلعات المنصة استراتيجياً مع <strong>الارتباط برؤية المملكة 2030</strong> ومستهدفات رؤية السعودية 2030 لتطوير بيئة البنية التحتية الرقمية، ودفع عجلة التجارة الإلكترونية الفاخرة، وتقديم نموذج استثماري تقني رائد يعزز من مكانة المملكة كمركز اقتصادي عالمي جاذب للصفقات الاستثنائية.</p>
          
          <p>نؤمن بأن التميز يصنعه المبدعون؛ تتيح المنصة بصفة <strong>بوابة التوظيف والكوادر</strong> مستمرة لفرص انضمام الكفاءات والكوادر الطموحة في مجالات التطوير التقني، إدارة الصفقات الفاخرة، وخدمة عملاء النخبة.</p>
        </div>

        <footer style={{ borderTop: '1px solid #222', marginTop: '32px', paddingTop: '16px', textAlign: 'center' }}>
          <p style={{ margin: '0 0 8px', fontSize: '12px', color: '#888', lineHeight: '1.7' }}>
            صاحب موقع <strong>أناقة CHIC</strong>
          </p>
          <span style={{ color: '#d4af37', fontWeight: '700', letterSpacing: '1px' }}>
            ✨ فهد حمود فهد الشمري | Fahad Bin Hamoud Al-Shammari ✨
          </span>
          <p style={{ margin: '8px 0 0', fontSize: '10px', color: '#555', fontWeight: '700' }}>
            جميع الحقوق محفوظة © 2026 أناقة CHIC
          </p>
        </footer>
      </article>
    </main>
  );
}
