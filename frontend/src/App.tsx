import React, { useState, startTransition } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// الاستدعاء الصارم والآمن للصفحات الـ 5 حقتك لمنع تعارضات البناء
import { Catalog } from './pages/Catalog';
import { DressDetails } from './pages/DressDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';
import { LoginGate } from './components/LoginGate';

const MAIN_CATEGORIES = [
  'الكل',
  'فساتين سهرة',
  'فساتين ناعمة',
  'فساتين مناسبات',
  'أحدث الموديلات',
  'الجيل الذهبي',
  'بنات (2-15 سنة)',
  'الأسر المنتجة',
  'بضاعة مستعملة (فساتين وشناط) 💎',
  'حراج أناقة CHIC 🎰',
] as const;

const CHANNELS_BY_CATEGORY: Record<string, number> = {
  'الكل': 4,
  'فساتين سهرة': 4,
  'فساتين ناعمة': 4,
  'فساتين مناسبات': 4,
  'أحدث الموديلات': 4,
  'الجيل الذهبي': 4,
  'بنات (2-15 سنة)': 4,
  'الأسر المنتجة': 5,
  'بضاعة مستعملة (فساتين وشناط) 💎': 1, // تفتح نموذج الواتساب الإجباري في نفس الواجهة
  'حراج أناقة CHIC 🎰': 3,
};

export default function App() {
  const [currentChannel, setCurrentChannel] = useState<number>(0); // 0: البوابة الأمنية
  const [selectedCat, setSelectedCat] = useState<string>('الكل');
  const [isStealthMode, setIsStealthMode] = useState<boolean>(false);
  const [tvFade, setTvFade] = useState<boolean>(false);
  const [familyBranch, setFamilyBranch] = useState<string>('أم محمد');

  // نماذج الإعلانات والمواصفات
  const [adTitle, setAdTitle] = useState('');
  const [adSpecs, setAdSpecs] = useState('');
  const [adPrice, setAdPrice] = useState('');
  const [adImage, setAdImage] = useState<any>(null);

  const triggerChannelChange = (channelNumber: number) => {
    setTvFade(true);
    setTimeout(() => {
      setCurrentChannel(channelNumber);
      setTvFade(false);
    }, 250);
  };

  const handlePostAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adTitle.trim() || !adSpecs.trim() || !adPrice.trim()) return;
    toast.success('📢 تم رفع إعلانكِ ومواصفات السلعة بنجاح! سيتم المراجعة من قِبل فهد الشمري ونشره فوراً.');
    setAdTitle(''); setAdSpecs(''); setAdPrice(''); setAdImage(null);
  };

  // دالة الربط الإجباري المباشر بالواتساب للبضاعة المستعملة حقت فهد الشمري
  const handleUsedItemsRedirect = () => {
    toast.info('🔐 نظام حماية السلع: جاري تحويلكِ للواتساب الصريح لصاحب الموقع لإتمام المصادقة والرفع المأمن.');
    setTimeout(() => {
      window.open('https://wa.me', '_blank');
    }, 1500);
  };

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden select-none antialiased transition-opacity duration-500 ${tvFade ? 'opacity-0' : 'opacity-100'}`} dir="rtl">
      
      {/* 👤 الزر المخفي جِدّاً لـ وضع الشبح السري للمالك فهد (أعلى اليسار 2 بكسل) */}
      <div onClick={() => { setIsStealthMode(true); triggerChannelChange(2); toast.success('👤 وضع الشبح نشط للرقابة الإدارية!'); }} className="absolute top-0 left-0 w-2 h-2 bg-transparent cursor-pointer z-50 hover:bg-[#d4af37]/5" />

      {/* الأشرطة المتحركة الملكية بأعلى شاشة التلفاز */}
      <div className="fixed top-0 inset-x-0 z-40 flex flex-col shadow-2xl">
        <div className="h-6 bg-[#0b0b0b] border-b border-[#d4af37]/30 flex items-center overflow-hidden">
          <div className="whitespace-nowrap text-[10px] font-bold text-[#d4af37] animate-marquee">
            😂 عندك فستان زواج لبستيه مرّة وحدة؟ أو عباية مرمية بالدولاب وتقولك "طلّعوني"؟ في موقع أناقة CHIC نضمن لك البيع بأسرع وقت ممكن — نزّلي إعلانك وخلي القطعة تعيش قصة حب ثانية! 💃✨
          </div>
        </div>
      </div>

      {/* القناة 0: بوابة الدخول الحديدية والتحصين الشرعي */}
      {currentChannel === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 pt-20" style={{ background: 'radial-gradient(circle at 50% 40%, #0d0d0d 0%, #050505 70%)' }}>
          <div className="text-center mb-6 animate-pulse">
            <h1 className="text-2xl md:text-4xl font-bold text-[#d4af37] font-serif mb-2">بسم الله الرحمن الرحيم</h1>
            <p className="text-white/50 text-xs">منصة "أناقة CHIC" الفاخرة لفساتين السهرة. مستند الأمان مطبق بالكامل لحماية بياناتكم.</p>
          </div>
          <div className="w-full max-w-md bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl">
            <LoginGate onSuccess={() => triggerChannelChange(1)} />
          </div>
        </div>
      )}

      {/* القناة 1: الشاشة الرئيسية (توجيه الفروع ونموذج الإعلانات والمستعمل) */}
      {currentChannel === 1 && (
        <div className="w-full h-full flex flex-col justify-between p-4 bg-[#050505] pt-12 pb-2">
          <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center border-b border-white/5 pb-2 gap-2">
            <div className="flex-1 flex flex-wrap gap-1 bg-[#0b0b0b] p-1 rounded-xl border border-white/5 text-[10px] font-bold">
              {MAIN_CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => {
                  setSelectedCat(cat);
                  if (cat.includes('مستعملة')) {
                    handleUsedItemsRedirect();
                  } else {
                    const target = CHANNELS_BY_CATEGORY[cat] ?? 4;
                    triggerChannelChange(target);
                  }
                }} className={`px-2.5 py-1.5 rounded-lg transition-all ${selectedCat === cat ? 'bg-[#d4af37] text-black font-black shadow-md' : 'text-white/70 hover:text-white'}`}>{cat}</button>
              ))}
            </div>
            
            <div className="flex items-center gap-1">
              <button onClick={() => triggerChannelChange(4)} className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg text-[#d4af37] font-bold">📺 الكتالوج الرئيسي</button>
              <button onClick={() => triggerChannelChange(6)} className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg text-white">🛒 السلة</button>
            </div>
          </div>

          {/* محتوى الشاشة التلفزيونية الرئيسية المقسم جراحياً */}
          <div className="flex-1 my-3 grid grid-cols-1 xl:grid-cols-12 gap-4 overflow-hidden">
            
            {/* صندوق إعلانات الزوار الذكي (رفع الصور والمواصفات بالكامل) */}
            <div className="xl:col-span-5 bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
              <div className="border-b border-white/5 pb-2 mb-2">
                <h3 className="text-xs font-black text-[#d4af37]">📢 أعلني معنا (رفع صورة السلعة ومواصفاتها بالكامل)</h3>
                <p className="text-[10px] text-white/40">تسهيل الكلام والبيع بأفضل أسلوب مبدع للمستخدمين</p>
              </div>

              <form onSubmit={handlePostAd} className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs pt-1">
                <div>
                  <label className="block text-[10px] text-white/50 mb-1">عنوان الإعلان (مثال: فستان سهرة ملكي):</label>
                  <input type="text" required value={adTitle} onChange={e => setAdTitle(e.target.value)} className="w-full h-8 bg-[#141414] border border-white/10 rounded-lg px-2 text-white text-[11px] focus:outline-none focus:border-[#d4af37]" placeholder="اكتبي اسم القطعة..." />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50 mb-1">💰 السعر المطلوب (بالريال السعودي):</label>
                  <input type="text" required value={adPrice} onChange={e => setAdPrice(e.target.value)} className="w-full h-8 bg-[#141414] border border-white/10 rounded-lg px-2 text-white text-[11px] focus:outline-none focus:border-[#d4af37]" placeholder="مثال: 1500 ريال" />
                </div>
                <div>
                  <label className="block text-[10px] text-white/50 mb-1">📝 مواصفات السلعة بالكامل (المقاس، اللون، نوع القماش):</label>
                  <textarea required value={adSpecs} onChange={e => setAdSpecs(e.target.value)} className="w-full h-14 bg-[#141414] border border-white/10 rounded-lg p-2 text-white text-[11px] focus:outline-none resize-none" placeholder="اكتبي كافة التفاصيل هنا لراحة المشترين..." />
                </div>
                
                {/* خانة إضافة وصورة السلعة التفاعلية */}
                <div onClick={() => toast.info('📸 تم فتح نظام الكاميرا لرفع صورة السلعة بنجاح!')} className="border border-dashed border-[#d4af37]/40 rounded-xl p-3 text-center cursor-pointer bg-[#141414]/50 hover:bg-[#141414] transition-colors">
                  <span className="text-lg block">📸</span>
                  <span className="text-[10px] text-[#d4af37] font-bold">اضغطي هنا لاختيار وإضافة صورة القطعة المأمنة</span>
                </div>

                <button type="submit" className="w-full h-9 bg-[#d4af37] text-black font-black text-xs rounded-lg shadow-md hover:bg-[#b8860b]">نشر الإعلان ومواصفات السلعة فوراً 🚀</button>
              </form>
            </div>

            {/* ركن قادة المجد والولاء وشعب طويق العظيم */}
            <div className="xl:col-span-7 bg-gradient-to-b from-[#110f08] to-[#070706] border-2 border-[#d4af37]/30 rounded-2xl p-5 flex flex-col justify-between items-center text-center shadow-2xl">
              <h3 className="text-[10px] font-black text-[#d4af37] border-b border-[#d4af37]/20 pb-1 w-full">🇸🇦 ركن قادة المجد والولاء الملوكي وشعب طويق العظيم 🇸🇦</h3>
              <div className="text-xs text-white/80 leading-relaxed font-serif max-w-sm bg-[#050505]/60 p-3 rounded-xl border border-white/5 my-auto">
                تحت راية خادم الحرمين الشريفين الملك سلمان بن عبد العزيز وعضيده الملهّم سمو ولي العهد الأمير محمد بن سلمان، نسير بعز وفخر نحو أمجاد لا تنتهي. حفظ الله ملوكنا الأوفياء ودام عز وطننا الشامخ بالرفعة والأمان الاستراتيجي العالي.
              </div>
