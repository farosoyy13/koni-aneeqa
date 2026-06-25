import React, { useState } from 'react';

interface HomeProps {
  onNavigate?: (channel: number) => void;
}

export default function Home({ onNavigate }: HomeProps) {
  const [userComment, setUserComment] = useState('');
  
  // 1. قائمة التعليقات الكاملة المكونة من 20 تقييم حقيقي بالخط الرسمي
  const [comments, setComments] = useState([
    { name: "أم أحمد - حفر الباطن", text: "الفساتين فخامة وخامتها ممتازة جداً والتوصيل سريع وتعامل راقي" },
    { name: "فارس الشمري", text: "المرسيدس مايباخ حالتها وكالة وتعامل صاحب الموقع قمة في الأمان" },
    { name: "سارة - الرياض", text: "العباية الملكية تجنن وخرزها ثابت وفخم للمناسبات والعبايات جودتها عالية" },
    { name: "أبو محمد - الدمام", text: "تمور الخلاص فاخرة جداً ونادرة تبيض الوجه بالمجالس والضيافة الملكية" },
    { name: "الجوهرة - جدة", text: "خدمة المغسلة والـ Dry Clean سريعة وكي الملابس ممتاز جداً وأنصح بالتعامل معهم" },
    { name: "منيرة الشمري", text: "شنطة الماركة أصلية وتجنن وتغليفها ملكي فخم تليق بالنخبة" },
    { name: "أبو فهد - حائل", text: "موقع متميز ومنظم ونظام حراج فيه آمن جداً للمزايدات والبيع" },
    { name: "نورة - الأحساء", text: "ملابس الأطفال جودتها ممتازة ومقاساتها بالسانتيمتر دقيقة جداً" },
    { name: "خالد العنزي", text: "التمور الملكية الفاخرة وصلت في وقت قياسي والتغليف ممتاز ومحكم" },
    { name: "أم سلطان - الخبر", text: "جلابيات جيل الذهب والجيل الفضي الفاخر ألوانها ثابتة وتصميمها يجنن" },
    { name: "هيا - مكة", text: "حذاء سهرة فخم ومريح جداً في اللبس والمقاس مضبوط بالملي" },
    { name: "أبو سعود", text: "سيارة نظيفة وتطابق الوصف والموقع آمن جداً في تحويل المبالغ والعربونات" },
    { name: "ريم - المدينة", text: "عباية بشت ملكية واسعة ومريحة وخامتها ثقيلة وراقية" },
    { name: "عبدالله الشمري", text: "شغل احترافي وأمانة في التعامل وصاحب الموقع الأستاذ فهد كفو" },
    { name: "أم فيصل - الجبيل", text: "فساتين السهرة VIP قصاتها وتطريزها يواجه في الحفلات الكبرى" },
    { name: "جواهر - القطيف", text: "أجمل براند أزياء تعاملت معه في الخليج متكامل ومضمون" },
    { name: "سلطان العتيبي", text: "اشتريت كرتون تمر خلاص وكان منتقى حبة حبة جودة عالية" },
    { name: "أم ديم - بريدة", text: "ملابس البنات الصغار تهبل وأسعارها مناسبة جداً بالنسبة للفخامة" },
    { name: "فهد بن علي", text: "خدمة دعم سريعة وموثوقية عالية في حراج والخدمات الذكية" },
    { name: "ميعاد - الطائف", text: "الشنط نادرة وتصاميمها فريدة وغير مكررة في المتاجر الأخرى" }
  ]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (userComment.trim()) {
      setComments([{ name: "عميل موثق للبراند", text: userComment }, ...comments]);
      setUserComment('');
    }
  };

  const goToCatalog = () => {
    if (onNavigate) onNavigate(4);
  };

  // اعتماد خطوط النظام الرسمية كأي موقع عالمي نظيف
  const officialFont = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

  return (
    <div style={{ padding: '5px', width: '100%', maxWidth: '100%', margin: '0 auto', fontFamily: officialFont, direction: 'rtl', color: '#ffffff', boxSizing: 'border-box', overflowX: 'hidden' }}>
      
      {/* 1. شريطان متحركان في أعلى الشاشة لإعلانات لفت الانتباه */}
      <div style={{ background: '#d4af37', color: '#000000', padding: '5px 0', fontSize: '11px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '4px', width: '100%' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 15s linear infinite' }}>
          عروض حصرية ومحدودة لفترة وجيزة على فساتين السهرة VIP الفاخرة • الشحن متوفر لكافة مناطق المملكة ودول الخليج • مرحباً بكم في منصة أناقة CHIC الملكية
        </div>
      </div>
      <div style={{ background: '#111111', color: '#d4af37', padding: '5px 0', fontSize: '10px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', borderRadius: '4px', marginBottom: '15px', width: '100%', border: '1px solid rgba(212,175,55,0.2)' }}>
        <div style={{ display: 'inline-block', paddingLeft: '100%', animation: 'marquee 20s linear infinite' }}>
          همتنا مثل جبل طويق ولن تنكسر • ريادة قطاع الممتلكات النادرة والأصول الثمينة • أهلاً بكم في صرح التجارة والحراج الحي الشامل
        </div>
      </div>

      {/* 2. الزاوية الملكية الفخمة الثابتة (ركن الولاء والانتماء بالخط الرسمي الواضح) */}
      <div style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #151515 100%)', border: '1px solid #d4af37', borderRadius: '12px', padding: '15px', textAlign: 'center', marginBottom: '20px', boxSizing: 'border-box' }}>
        <h2 style={{ color: '#d4af37', fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>ركن الولاء والانتماء لقادة المجد</h2>
        <p style={{ color: '#ffffff', fontSize: '12px', fontWeight: 'normal', lineHeight: '1.6', width: '100%', margin: '0 auto', wordBreak: 'break-word', whiteSpace: 'normal' }}>
          "نعتز بهويتنا السعودية الراسخة، ونرفع أسمى آيات الولاء والعرفان إلى مقام خادم الحرمين الشريفين الملك سلمان بن عبدالعزيز، وعضيده صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز ولي العهد رئيس مجلس الوزراء - حفظهم الله ورعاهم وسدد على طريق الخير خطاهم."
        </p>
        <div style={{ marginTop: '10px', color: '#d4af37', fontSize: '11px', fontWeight: 'bold' }}>
          همتنا مثل جبل طويق ولن تنكسر (مستهدفات رؤية السعودية 2030)
        </div>
      </div>

      {/* 3. مربع مخصص للإعلانات التلفزيونية المتحركة التلقائية */}
      <div style={{ background: '#000000', border: '1px solid rgba(212,175,55,0.2)', borderRadius: '12px', padding: '12px', textAlign: 'center', marginBottom: '20px', boxSizing: 'border-box' }}>
        <h3 style={{ color: '#d4af37', fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>شاشة العرض المرئية والترويجية التفاعلية الحية</h3>
        <div style={{ width: '100%', height: '140px', background: 'linear-gradient(135deg, #111 0%, #222 100%)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed #d4af37', padding: '5px', boxSizing: 'border-box' }}>
          <span style={{ color: '#d4af37', fontWeight: 'bold', fontSize: '11px', textAlign: 'center', wordBreak: 'break-word', whiteSpace: 'normal' }}>مساحة بث فيديوهات وعروض الفساتين والسلع (تحميل تلقائي حي)</span>
        </div>
      </div>

      {/* 4. شبكة الأزرار والأقسام الكبرى بالخط الرسمي الواضح العادي */}
      <h3 style={{ color: '#d4af37', fontSize: '14px', fontWeight: 'bold', marginBottom: '15px', textAlign: 'center' }}>فروع وأقسام المتجر والخيارات الرئيسية</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '25px', width: '100%', boxSizing: 'border-box' }}>
        
        {/* قسم 1 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '3px 0' }}>فساتين حفلات فخمة (جديدة + مستعملة)</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginTop: '5px', fontFamily: officialFont }}>تصفح الموديلات</button>
        </div>

        {/* قسم 2 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '3px 0' }}>فساتين أعراس فخمة وعالمية (جديدة ومستعملة)</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginTop: '5px', fontFamily: officialFont }}>تصفح الموديلات</button>
        </div>

        {/* قسم 3 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '3px 0' }}>شنط ماركات ونادرة (جديدة + مستعملة وعالمية)</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginTop: '5px', fontFamily: officialFont }}>تصفح الموديلات</button>
        </div>

        {/* قسم 4 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '3px 0' }}>العبايات الملكية والجلابيات (جيل الذهب والجيل الفضي)</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginTop: '5px', fontFamily: officialFont }}>تصفح الموديلات</button>
        </div>

        {/* قسم 5 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
          <h4 style={{ color: '#d4af37', fontSize: '13px', fontWeight: 'bold', margin: '3px 0' }}>الأحذية النادرة (سهرات، شياكة، عرايس، وكبار السن)</h4>
          <button onClick={goToCatalog} style={{ background: 'transparent', border: '1px solid #d4af37', color: '#d4af37', padding: '5px 16px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', marginTop: '5px', fontFamily: officialFont }}>تصفح الموديلات</button>
        </div>

        {/* قسم 6 */}
        <div style={{ background: '#0f0f0f', border: '1px solid rgba(212,175,55,0.15)', padding: '12px', borderRadius: '8px', textAlign: 'center' }}>
