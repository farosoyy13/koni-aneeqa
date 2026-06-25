import React, { useState } from 'react';

// إضافة خاصية التوجيه للأزرار لترتبط بالملف الأب
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

  // دالة النقل الآمن للكتالوج عند ضغط الأزرار
  const goToCatalog = () => {
    if (onNavigate) {
      onNavigate(4); // الرقم 4 يمثل قناة الكتالوج وعرض الفساتين
    }
  };

  return (
    <div style={{ padding: '10px', maxWidth: '100%', margin: '0 auto', fontFamily: 'sans-serif', direction: 'rtl', color: '#ffffff', boxSizing: 'border-box' }}>
      
      {/* 1. الأشرطة المتحركة للإعلانات العاجلة */}
      <div style={{ background: '#d4af37', color: '#000000', padding: '8px 0', fontSize: '11px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '8px', marginBottom: '15px' }}>
        <div style={{ display: 'inline-block', animation: 'marquee 20s linear infinite' }}>
          🔥 عروض حصرية لفترة محدودة على فساتين السهرة VIP • الشحن متوفر لكافة مناطق المملكة ودول الخليج • منصة أناقة CHIC ترحب بكم 🔥
        </div>
      </div>

      {/* 2. الزاوية الملكية الفخمة والثابتة */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 100%)', border: '1px solid #d4af37', borderRadius: '12px', padding: '15px', textAlign: 'center', marginBottom: '20px', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#d4af37', fontSize: '18px', fontWeight: '900', marginBottom: '10px' }}>👑 ركن الولاء والانتماء لقادة المجد 👑</h2>
        <p style={{ color: '#ffffff', fontSize: '13px', fontWeight: 'bold', lineHeight: '1.6', width: '100%', margin: '0 auto', wordBreak: 'break-word' }}>
          "نعتز بهويتنا السعودية الراسخة، ونرفع أسمى آيات الولاء والعرفان إلى مقام خادم الحرمين الشريفين الملك سلمان بن عبدالعزيز، وعضيده صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز ولي العهد رئيس مجلس الوزراء - حفظهم الله ورعاهم وسدد على طريق الخير خطاهم."
        </p>
        <div style={{ marginTop: '10px', fontStyle: 'italic', color: '#d4af37', fontSize: '12px', fontWeight: 'bold' }}>
          🇸🇦 همتنا مثل جبل طويق ولن تنكسر 🇸🇦
        </div>
      </div>

      {/* 3. مربع التلفاز الترويجي المتحرك تلقائياً */}
      <div style={{ background: '#000000', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', padding: '15px', textAlign: 'center', marginBottom: '20px', boxSizing: 'border-box' }}>
        <h3 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold', marginBottom: '10px' }}>📺 شاشة العرض المرئية والترويجية الحية</h3>
        <div style={{ width: '100%', height: '180px', background: 'linear-gradient(135deg, #111 0%, #222 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d4af37', padding: '10px', boxSizing: 'border-box' }}>
          <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '12px', wordBreak: 'break-word' }}>🎬 مساحة بث الفيديوهات الإعلانية للفساتين والسلع (تحميل تلقائي)</span>
        </div>
      </div>

      {/* 4. شبكة الأزرار والأقسام الكبرى للفساتين - تم ربط الأزرار بالدالة الشغالة */}
      <h3 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>✨ الفروع والأقسام الكبرى الفاخرة ✨</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '25px' }}>
        
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px' }}>👗</div>
          <h4 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold', margin: '5px 0' }}>فساتين سهرة جديدة ومستعمل</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>

        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px' }}>🧕</div>
          <h4 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold', margin: '5px 0' }}>العبايات والجلابيات الملكية</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>

        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.2)', padding: '15px', borderRadius: '10px', textAlign: 'center' }}>
          <div style={{ fontSize: '24px' }}>👠</div>
          <h4 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold', margin: '5px 0' }}>الحقائب والأحذية النادرة</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold' }}>تصفح الموديلات</button>
        </div>

      </div>

      {/* 5. قسم آراء وتعليقات الزبائن */}
      <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.3)', borderRadius: '12px', padding: '15px', boxSizing: 'border-box' }}>
        <h3 style={{ color: '#d4af37', fontSize: '15px', fontWeight: 'bold', marginBottom: '15px' }}>💬 آراء وتقييمات زبائن النخبة ({comments.length})</h3>
        
        <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
          <input type="text" value={userComment} onChange={(e) => setUserComment(e.target.value)} placeholder="اكتب تجربتك هنا..." style={{ background: '#111111', border: '1px solid #333333', padding: '10px', borderRadius: '6px', color: '#ffffff', fontSize: '12px', width: '100%', boxSizing: 'border-box' }} />
          <button type="submit" style={{ background: 'linear-gradient(135deg, #d4af37 0%, #bfa15f 100%)', color: '#000000', border: 'none', padding: '10px 0', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px', width: '100%' }}>إرسال التقييم</button>
        </form>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
          {comments.map((comment, i) => (
            <div key={i} style={{ background: '#141414', padding: '10px', borderRadius: '6px', borderRight: '3px solid #d4af37', boxSizing: 'border-box' }}>
              <div style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold', marginBottom: '3px' }}>{comment.name}</div>
              <div style={{ color: '#ffffff', fontSize: '11px', lineHeight: '1.4', wordBreak: 'break-word' }}>{comment.text}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
