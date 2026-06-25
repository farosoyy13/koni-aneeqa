import React, { useState } from 'react';

export default function Home() {
  const [userComment, setUserComment] = useState('');
  const [comments, setComments] = useState([
    { name: "أم أحمد - حفر الباطن", text: "الفساتين فخامة وخامتها ممتازة جداً والتوصيل سريع" },
    { name: "فارس الشمري", text: "المرسيدس مايباخ حالتها وكالة وتعامل صاحب الموقع قمة في الأمان" },
    { name: "سارة - الرياض", text: "العباية الملكية تجنن وخرزها ثابت وفخم للمناسبات" },
    { name: "أبو محمد", text: "تمور الخلاص فاخرة جداً تبيض الوجه بالمجالس" },
    { name: "الجوهرة - الدمام", text: "خدمة المغسلة والـ Dry Clean سريعة وكي الملابس ممتاز" }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (userComment.trim()) {
      setComments([{ name: "زائر موثق", text: userComment }, ...comments]);
      setUserComment('');
    }
  };

  return (
    <div style={{ padding: '15px', maxWidth: '1250px', margin: '0 auto', fontFamily: 'sans-serif', direction: 'rtl' }}>
      
      {/* 1. الأشرطة المتحركة للإعلانات العاجلة لشد الانتباه (ماركيه ذكي) */}
      <div style={{ background: '#d4af37', color: '#000', padding: '8px 0', fontSize: '12px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '8px', marginBottom: '10px' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite' }}>
          🔥 عروض حصرية لفترة محدودة على فساتين السهرة VIP • الشحن متوفر لكافة مناطق المملكة ودول الخليج • منصة أناقة CHIC ترحب بكم 🔥
        </div>
      </div>

      {/* 2. الزاوية الملكية الفخمة والثابتة (ركن الولاء وقادة المجد) */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 100%)', border: '2px solid #d4af37', borderRadius: '16px', padding: '25px', textAlign: 'center', marginBottom: '30px', boxShadow: '0 10px 30px rgba(212,175,55,0.05)' }}>
        <h2 style={{ color: '#d4af37', fontSize: '24px', fontWeight: '900', marginBottom: '15px' }}>👑 ركن الولاء والانتماء لقادة المجد 👑</h2>
        <p style={{ color: '#fff', fontSize: '16px', fontWeight: 'bold', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
          "نعتز بهويتنا السعودية الراسخة، ونرفع أسمى آيات الولاء والعرفان إلى مقام خادم الحرمين الشريفين الملك سلمان بن عبدالعزيز، وعضيده صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز ولي العهد رئيس مجلس الوزراء - حفظهم الله ورعاهم وسدد على طريق الخير خطاهم."
        </p>
        <div style={{ marginTop: '15px', fontStyle: 'italic', color: '#d4af37', fontSize: '14px', fontWeight: 'bold' }}>
          🇸🇦 همتنا مثل جبل طويق ولن تنكسر 🇸🇦
        </div>
      </div>

      {/* 3. مربع التلفاز الترويجي المتحرك تلقائياً */}
      <div style={{ background: '#000', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '30px' }}>
        <h3 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px' }}>📺 شاشة العرض المرئية والترويجية الحية</h3>
        <div style={{ width: '100%', height: '300px', background: 'linear-gradient(135deg, #111 0%, #222 100%)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d4af37' }}>
          <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '14px' }}>🎬 مساحة بث الفيديوهات الإعلانية للفساتين والسلع (تحميل تلقائي)</span>
        </div>
      </div>

      {/* 4. شبكة الأزرار والأقسام الكبرى للفساتين بالتفصيل */}
      <h3 style={{ color: '#d4af37', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>✨ الفروع والأقسام الكبرى الفاخرة ✨</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '30px' }}>👗</div>
          <h4 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>فساتين سهرة جديدة ومستعملة</h4>
          <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '30px' }}>🧕</div>
          <h4 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>العبايات والجلابيات الملكية</h4>
          <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '25px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '30px' }}>👠</div>
          <h4 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', margin: '10px 0' }}>الحقائب والأحذية النادرة</h4>
          <button style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>
      </div>

      {/* 5. قسم آراء وتعليقات الزبائن التفاعلي المستدام */}
      <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '16px', padding: '25px' }}>
        <h3 style={{ color: '#d4af37', fontSize: '18px', fontWeight: 'bold', marginBottom: '20px' }}>💬 آراء وتقييمات زبائن النخبة ({comments.length})</h3>
        
        <form onSubmit={handleAddComment} style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
          <input type="text" value={userComment} onChange={(e) => setUserComment(e.target.value)} placeholder="اكتب تجربتك أو تعليقك هنا بكل أمان..." style={{ flex: 1, background: '#111', border: '1px solid #333', padding: '12px', borderRadius: '8px', color: '#fff', fontSize: '14px' }} />
          <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000', border: 'none', padding: '0 25px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>إرسال التقييم</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', maxHeight: '250px', overflowY: 'auto', paddingLeft: '5px' }}>
          {comments.map((comment, i) => (
            <div key={i} style={{ background: '#141414', padding: '15px', borderRadius: '8px', borderRight: '4px solid #d4af37' }}>
              <div style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>{comment.name}</div>
              <div style={{ color: '#ccc', fontSize: '13px', lineHeight: '1.5' }}>{comment.text}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
