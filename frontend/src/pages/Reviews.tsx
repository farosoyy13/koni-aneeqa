import React, { useState } from 'react';

export default function FakeReviews() {
  const [reviews, setReviews] = useState([
    { id: 1, user: "محمد العتيبي", comment: "ما شاء الله، التمور وصلتني النخبة ونظيفة جداً، أنصح بالتعامل معه الفخامة تفرق 🌟", rating: 5 },
    { id: 2, user: "أبو فهد الشمري", comment: "خدمة غسيل وكي ملابس ملكية سريعة وبدون أي تأخير، والتعامل راقي جداً 👍", rating: 5 },
    { id: 3, user: "سارة الحارثي", comment: "المرسيدس مايباخ نظيفة وكاملة المواصفات، وسرعة في الدفع والتوثيق أونلاين 🚗", rating: 5 }
  ]);

  const [newComment, setNewComment] = useState("");
  const [newUser, setNewUser] = useState("");

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment || !newUser) return;
    setReviews([{ id: Date.now(), user: newUser, comment: newComment, rating: 5 }, ...reviews]);
    setNewUser("");
    setNewComment("");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ color: '#d4af37', fontFamily: 'Amiri, serif', textAlign: 'center', fontSize: '28px', marginBottom: '25px' }}>
        آراء وتقييمات حركة الزوار والعملاء الفاخرة للمنصة الملكية
      </h2>

      {/* نموذج إضافة التقييمات التفاعلية المباشرة */}
      <form onSubmit={handleAddReview} style={{ background: 'rgba(15,15,15,0.9)', border: '1px solid rgba(212,175,55,0.3)', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
        <h4 style={{ color: '#d4af37', marginBottom: '15px' }}>إضافة تقييم تفاعلي مباشر لصنع حركة نشطة في الواجهة:</h4>
        <input 
          type="text" 
          placeholder="اسم الزائر الملوكي" 
          value={newUser} 
          onChange={(e) => setNewUser(e.target.value)}
          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', marginBottom: '12px' }}
        />
        <textarea 
          placeholder="اكتب التقييم أو التعليق الحماسي هنا..." 
          value={newComment} 
          onChange={(e) => setNewComment(e.target.value)}
          style={{ width: '100%', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '4px', height: '80px', marginBottom: '12px' }}
        />
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#d4af37', color: '#000', border: 'none', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}>
          نشر التقييم الفوري الفاخر لإشعال حركة المنصة 🔥
        </button>
      </form>

      {/* قائمة عرض التقييمات اللامعة */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {reviews.map(rev => (
          <div key={rev.id} style={{ background: 'rgba(25,25,25,0.5)', border: '1px solid rgba(212,175,55,0.1)', padding: '20px', borderRadius: '8px', position: 'relative' }}>
            <div style={{ color: '#d4af37', fontWeight: 'bold', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>👤 {rev.user}</span>
              <span>{"⭐".repeat(rev.rating)}</span>
            </div>
            <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6' }}>"{rev.comment}"</p>
            <span style={{ position: 'absolute', bottom: '10px', left: '10px', color: '#666', fontSize: '11px' }}>🟢 موثق بنظام الأمن</span>
          </div>
        ))}
      </div>
    </div>
  );
}
