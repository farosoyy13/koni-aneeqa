import React from 'react';

export default function AboutView() {
  return (
    <main dir="rtl" lang="ar" style={{ padding: '20px', maxWidth: 750, margin: '0 auto', fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', color: '#eee' }}>
      <article style={{ background: '#0f0f0f', padding: '36px 24px', borderRadius: 16, border: '1px solid #d4af37', textAlign: 'right', boxShadow: '0 10px 30px rgba(212,175,55,0.08)' }}>
        <h1 style={{ color: '#d4af37', fontSize: 28, textAlign: 'center', margin: '0 0 16px', fontWeight: 900 }}>من نحن</h1>
        <h2 style={{ color: '#d4af37', fontSize: 22, textAlign: 'center', margin: '0 0 24px', borderBottom: '1px solid #222', paddingBottom: 12, fontWeight: 800 }}>⚜️ السجل الرسمي والتوثيق التاريخي للمنصة ⚜️</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14, lineHeight: 2 }}>
          <p><strong>• هـويـة المـنـصـة:</strong> براند إلكتروني سيادي وتجاري شامل؛ مخصص لإدارة الحراج والصفقات العقارية والسيارات الفاخرة والبضائع الملوكية النادرة، ببروتوكولات تشفير سيادية متطورة وحماية ممتدة دولياً لضمان استدامة العمليات السيبرانية بأعلى درجات الأمان الإقليمي.</p>
          <p><strong>• تـاريـخ الـتـأسـيـس:</strong> تم تأسيس وتدشين هذا الصرح الرقمي الشامل رسمياً وبصيغة معتمدة عبر الإنترنت عام <b>2020 م</b> لخدمة عملاء النخبة في المملكة العربية السعودية ودول الخليج العربي.</p>
          <p><strong>• نـطـاق الـمـوقـع والـمـقـر:</strong> تعتمد المنصة في تشغيلها على بنية تحتية سحابية محصنة، مدعومة بأنظمة توزيع وترشيح دولية متقدمة وقواعد بيانات مشفرة فائقة الأداء لضمان تجربة تداول ملوكية، آمنة، وفورية.</p>

          <p style={{ borderTop: '1px solid #222', paddingTop: 12, marginTop: 8 }}>
            <strong>• الـرؤيـة المـلـكـيـة والـمـسـتـقـبـل:</strong> ريادة قطاع الممتلكات النادرة والأصول الثمينة رقمياً، وتقديم معايير غير مسبوقة تليق بتطلعات النخبة وتواكب التطور الاقتصادي والتقني في المنطقة.
          </p>
          <p>
            <strong>• الارتـبـاط بـرؤيـة المـمـلـكـة 2030:</strong> تتماشى تطلعات المنصة إستراتيجياً مع مستهدفات رؤية السعودية 2030 لتطوير البنية التحتية الرقمية، ودفع عجلة التجارة الإلكترونية الفاخرة، وتقديم نموذج استثماري تقني رائد يعزز من مكانة المملكة كمركز اقتصادي عالمي جاذب للصفقات الاستثنائية.
          </p>
          <p>
            <strong>• بـوابـة الـتـوظـيـف والـكـوادر:</strong> نؤمن بأن التميز يصنعه المبدعون؛ تتيح المنصة بصفة مستمرة فرص انضمام الكفاءات والكوادر الطموحة في مجالات التطوير التقني، إدارة الصفقات الفاخرة، وخدمة عملاء النخبة.
          </p>
        </div>

        <footer style={{ borderTop: '1px solid #222', marginTop: 32, paddingTop: 16, textAlign: 'center' }}>
          <p style={{ margin: 0, fontSize: 10, color: '#888', lineHeight: 1.7 }}>
            صاحب موقع «أناقة CHIC»<br />
            <span style={{ color: '#d4af37', fontWeight: 700, letterSpacing: 1 }}>
              ✦ 𝓢𝓲𝓻. 𝓕𝓪𝓱𝓪د 𝓑𝓲𝓷 𝓗𝓪𝓶𝓸𝓾𝓭 𝓐𝓵-𝓢𝓱𝓪𝓶𝓶𝓪𝓻𝓲 ✦
            </span>
          </p>
          <p style={{ margin: '6px 0 0', fontSize: 10, color: '#555', fontWeight: 700 }}>
            جميع الحقوق محفوظة © 2026 أناقة CHIC
          </p>
        </footer>
      </article>
    </main>
  );
}