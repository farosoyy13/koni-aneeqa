import React, { useState } from 'react';

interface HomeProps {
  onNavigate?: (channel: number) => void;
}

export default function Home({ onNavigate }: HomeProps) {
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

  const goToCatalog = () => {
    if (onNavigate) {
      onNavigate(4);
    }
  };

  return (
    <div style={{ padding: '5px', width: '100%', maxWidth: '100%', margin: '0 auto', fontFamily: 'sans-serif', direction: 'rtl', color: '#ffffff', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* 1. الشريط المتحرك للإعلانات */}
      <div style={{ background: '#d4af37', color: '#000000', padding: '6px 0', fontSize: '10px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '6px', marginBottom: '12px', width: '100%', boxSizing: 'border-box' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%' }}>
          🔥 عروض حصرية لفترة محدودة على فساتين السهرة VIP • الشحن متوفر لكافة مناطق المملكة ودول الخليج • منصة أناقة CHIC ترحب بكم 🔥
        </div>
      </div>

      {/* 2. الزاوية الملكية الفخمة والثابتة (ملتفة تلقائياً لجسم الشاشة) */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 100%)', border: '1px solid #d4af37', borderRadius: '10px', padding: '12px', textAlign: 'center', marginBottom: '15px', width: '100%', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#d4af37', fontSize: '15px', fontWeight: '900', marginBottom: '8px' }}>👑 ركن الولاء والانتماء لقادة المجد 👑</h2>
        <p style={{ color: '#ffffff', fontSize: '11px', fontWeight: 'bold', lineHeight: '1.5', width: '100%', margin: '0 auto', wordBreak: 'break-word', whiteSpace: 'normal' }}>
          "نعتز بهويتنا السعودية الراسخة، ونرفع أسمى آيات الولاء والعرفان إلى مقام خادم الحرمين الشريفين الملك سلمان بن عبدالعزيز، وعضيده صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز ولي العهد رئيس مجلس الوزراء - حفظهم الله ورعاهم وسدد على طريق الخير خطاهم."
        </p>
        <div style={{ marginTop: '8px', fontStyle: 'italic', color: '#d4af37', fontSize: '11px', fontWeight: 'bold' }}>
          🇸🇦 همتنا مثل جبل طويق ولن تنكسر 🇸🇦
        </div>
      </div>

      {/* 3. مربع التلفاز الترويجي - المقاس مغلق ومحكم العرض */}
      <div style={{ background: '#000000', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', padding: '12px', textAlign: 'center', marginBottom: '15px', width: '100%', boxSizing: 'border-box' }}>
        <h3 style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>📺 شاشة العرض المرئية الترويجية</h3>
        <div style={{ width: '100%', height: '140px', background: 'linear-gradient(135deg, #111 0%, #222 100%)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d4af37', padding: '8px', boxSizing: 'border-box' }}>
          <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '11px', textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'normal' }}>🎬 مساحة بث الفيديوهات الإعلانية للفساتين والسلع (تحميل تلقائي)</span>
        </div>
      </div>

      {/* 4. فروع وأقسام المتجر الكبرى (مرتبة عمودياً حبة حبة لتمنع التحريك الجانبي) */}
      <h3 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>✨ الفروع والأقسام الكبرى الفاخرة ✨</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* فرع 1 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '20px' }}>👗</div>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '4px 0' }}>فساتين سهرة جديدة ومستعملة</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>

        {/* فرع 2 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '20px' }}>🧕</div>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '4px 0' }}>العبايات والجلابيات الملكية</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>

        {/* فرع 3 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '12px', borderRadius: '8px', textAlign: 'center', width: '100%', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '20px' }}>👠</div>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '4px 0' }}>الحقائب والأحذية النادرة</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>

      </div>

      {/* 5. قسم آراء وتعليقات الزبائن الملتف كلياً */}
      <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '10px', padding: '12px', width: '100%', boxSizing: 'border-box', marginBottom: '10px' }}>
        <h3 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', marginBottom: '10px' }}>💬 آراء وتقييمات زبائن النخبة ({comments.length})</h3>
        
        <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px', width: '100%' }}>
          <input type="text" value={userComment} onChange={(e) => setUserComment(e.target.value)} placeholder="اكتب تجربتك هنا..." style={{ background: '#111111', border: '1px solid #333333', padding: '8px', borderRadius: '6px', color: '#ffffff', fontSize: '12px', width: '100%', boxSizing: 'border-box' }} />
          <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000000', border: 'none', padding: '8px 0', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12px', width: '100%' }}>إرسال التقييم</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '150px', overflowY: 'auto', width: '100%' }}>
          {comments.map((comment, i) => (
            <div key={i} style={{ background: '#141414', padding: '8px', borderRadius: '6px', borderRight: '3px solid #d4af37', boxSizing: 'border-box', width: '100%' }}>
              <div style={{ color: '#d4af37', fontSize: '11px', fontWeight: 'bold', marginBottom: '2px' }}>{comment.name}</div>
              <div style={{ color: '#ffffff', fontSize: '11px', lineHeight: '1.3', wordBreak: 'break-word', whiteSpace: 'normal' }}>{comment.text}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
