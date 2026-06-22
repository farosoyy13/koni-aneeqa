import React, { useState, startTransition } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🎯 التعديل السحري: الاستدعاء التلقائي المباشر (بدون أقواس) ليطابق كود صفحاتك الـ 5 بالملّي 
import Catalog from './pages/Catalog';
import DressDetails from './pages/DressDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Contact from './pages/Contact';
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
  'حراج أناقة CHIC 🎰',
] as const;

const SUB_CATEGORIES_TREE: Record<string, string[]> = {
  'فساتين سهرة': ['سهرة مطرز بالذهب', 'سهرة ناعم كلاسيك', 'مخمل ملكي ثقيل'],
  'فساتين ناعمة': ['قطن فاخر طويل', 'حرير ناعم بسيط'],
  'الجيل الذهبي': ['جلابيات فاخرة', 'شالات ملكية راقية'],
  'بنات (2-15 سنة)': ['فساتين أطفال مناسبات', 'ملابس بناتي جديدة'],
  'الأسر المنتجة': ['فرع 1: أم محمد', 'فرع 2: فارس', 'فرع 3', 'فرع 4'],
  'حراج أناقة CHIC 🎰': ['حراج فساتين السهرة', 'حراج العبايات والجلابيات']
};

export default function App() {
  const [currentChannel, setCurrentChannel] = useState<number>(0); 
  const [selectedCat, setSelectedCat] = useState<string>('الكل');
  const [selectedSub, setSelectedSub] = useState<string>('الكل');
  const [isStealthMode, setIsStealthMode] = useState<boolean>(false);
  const [tvFade, setTvFade] = useState<boolean>(false);
  const [familyBranch, setFamilyBranch] = useState<string>('أم محمد');

  const triggerChannelChange = (channelNumber: number) => {
    setTvFade(true);
    setTimeout(() => {
      setCurrentChannel(channelNumber);
      setTvFade(false);
    }, 250);
  };

  const handleSubCategoryFly = (catName: string, subName: string) => {
    startTransition(() => {
      setSelectedCat(catName);
      setSelectedSub(subName);
      if (catName.includes('حراج')) {
        triggerChannelChange(3); 
      } else if (catName.includes('الأسر')) {
        if(subName.includes('أم محمد')) setFamilyBranch('أم محمد');
        if(subName.includes('فارس')) setFamilyBranch('فارس');
        triggerChannelChange(5); 
      } else {
        triggerChannelChange(4); 
      }
      toast.success(`🚀 طيران تلقائي إلى قسم: ${subName}`);
    });
  };

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden select-none antialiased transition-opacity duration-500 ${tvFade ? 'opacity-0' : 'opacity-100'}`} dir="rtl">
      
      <div onClick={() => { setIsStealthMode(true); triggerChannelChange(2); toast.success('👤 وضع الشبح نشط للرقابة الإدارية المباشرة!'); }} className="absolute top-0 left-0 w-2 h-2 bg-transparent cursor-pointer z-50 hover:bg-[#d4af37]/5" />

      <div className="fixed top-0 inset-x-0 z-40 flex flex-col shadow-2xl">
        <div className="h-6 bg-[#0b0b0b] border-b border-[#d4af37]/30 flex items-center overflow-hidden">
          <div className="whitespace-nowrap text-[10px] font-bold text-[#d4af37] animate-marquee">
            😂 عندك فستان زواج لبستيه مرّة وحدة؟ أو عباية مرمية بالدولاب وتقولك "طلّعوني"؟ في موقع أناقة CHIC نضمن لك البيع بأسرع وقت ممكن — نزّلي إعلانك وخلي القطعة تعيش قصة حب ثانية! 💃✨
          </div>
        </div>
      </div>

      {currentChannel === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 pt-20" style={{ background: 'radial-gradient(circle at 50% 40%, #0d0d0d 0%, #050505 70%)' }}>
          <div className="text-center mb-6 animate-pulse">
            <h1 className="text-2xl md:text-4xl font-bold text-[#d4af37] font-serif mb-2">بسم الله الرحمن الرحيم</h1>
            <p className="text-white/50 text-xs">منصة "أناقة CHIC" لفساتين السهرة. مستند الأمان مطبق بالكامل لحماية بياناتكم.</p>
          </div>
          <div className="w-full max-w-md bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl">
            <LoginGate onSuccess={() => triggerChannelChange(1)} />
          </div>
        </div>
      )}

      {currentChannel === 1 && (
        <div className="w-full h-full flex flex-col justify-between p-4 bg-[#050505] pt-12 pb-2">
          <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center border-b border-white/5 pb-2 gap-2">
            <div className="flex-1 flex flex-wrap gap-1 bg-[#0b0b0b] p-1 rounded-xl border border-white/5 text-[10px] font-bold">
              {MAIN_CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => { setSelectedCat(cat); setSelectedSub('الكل'); }} className={`px-2.5 py-1.5 rounded-lg transition-all ${selectedCat === cat ? 'bg-[#d4af37] text-black font-black' : 'text-white/70 hover:text-white'}`}>{cat}</button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => triggerChannelChange(4)} className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg text-[#d4af37] font-bold">📺 الكتالوج الرئيسي</button>
              <button onClick={() => triggerChannelChange(6)} className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg text-white">🛒 السلة</button>
              <button onClick={() => triggerChannelChange(7)} className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg text-white">💳 الدفع</button>
            </div>
          </div>

          <div className="flex-1 my-4 grid grid-cols-1 xl:grid-cols-12 gap-4 overflow-hidden">
            <div className="xl:col-span-4 bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col overflow-hidden">
              <h3 className="text-xs font-black text-[#d4af37] border-b border-white/5 pb-2 mb-3">🌿 رادار الفروع الداخلية المربوطة طيران</h3>
              <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
                {selectedCat === 'الكل' ? (
                  <p className="text-white/40 text-center py-10">يرجى تحديد خيار من شريط الأقسام فوق لتظهر لك فروعه الداخلية لتقفز إليها طيارة 🚀</p>
                ) : (
                  <div className="space-y-2">
                    {SUB_CATEGORIES_TREE[selectedCat]?.map(sub => (
                      <div key={sub} onClick={() => handleSubCategoryFly(selectedCat, sub)} className="p-3 bg-[#141414] border border-white/5 rounded-xl cursor-pointer hover:border-[#d4af37] transition-all flex justify-between items-center group">
                        <span className="text-white font-bold group-hover:text-[#d4af37]">{sub}</span>
                        <span className="text-[10px] text-white/30 group-hover:text-white">انتقال طيارة ⚡</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="xl:col-span-8 bg-gradient-to-b from-[#110f08] to-[#070706] border-2 border-[#d4af37]/30 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-2xl">
              <h3 className="text-[11px] font-black text-[#d4af37] border-b border-[#d4af37]/20 pb-2 w-full">🇸🇦 ركن قادة المجد والولاء الملوكي وشعب طويق العظيم 🇸🇦</h3>
              <div className="text-xs text-white/80 leading-relaxed font-serif max-w-md bg-[#050505]/60 p-4 rounded-xl border border-white/5 my-auto">
                تحت راية الملك سلمان وعضيده محمد بن سلمان، نسير بعز وفخر نحو أمجاد لا تنتهي. حفظ الله ملوكنا الأوفياء ودام عز وطننا الشامخ بالرفعة والأمان العالي.
              </div>
              <div className="w-full bg-[#050505] border border-[#d4af37]/40 rounded-xl p-3 text-xs font-bold text-[#d4af37] animate-pulse">
                💪 فخر وثناء للشعب السعودي الكريم: <span className="text-white text-sm bg-[#d4af37]/10 px-2 py-0.5 rounded border border-[#d4af37]/20 font-black">( شعب طويق )</span> أهل الجود والنخوة والشهامة وعصابة الرأس لكل الخليج ✨
              </div>
            </div>
          </div>

          <div className="bg-[#0b0b0b] border border-[#d4af37]/30 rounded-xl p-2.5 text-center text-xs text-[#d4af37] font-bold">
            ✨ متجر خاص وملكي مبرمج ومحصن سيبرانياً بأعلى معايير الحماية لـ فهد حمود فهد الشمري وتحت رعاية ملوك الذهب السيبراني 👑🔒
          </div>
        </div>
      )}

      {currentChannel === 4 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#050505] pt-12 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button onClick={() => triggerChannelChange(1)} className="text-[11px] bg-[#0b0b0b] border border-[#d4af37]/40 px-3 py-1 rounded-lg text-[#d4af37] font-bold">⬅️ الرجوع للرئيسية للفروع</button>
            <div className="text-[11px] text-white/60">صفحة الكتالوج — الفئة: <span className="text-[#d4af37] font-bold">{selectedCat}</span> • الفرع: <span className="text-green-400 font-bold">{selectedSub}</span></div>
          </div>
          <div className="flex-1 mt-3 rounded-2xl overflow-hidden bg-[#0b0b0b] p-2"><Catalog /></div>
        </div>
      )}

      {currentChannel === 3 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#040404] pt-12 overflow-hidden">
          <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-2">
            <button onClick={() => triggerChannelChange(1)} className="text-[11px] bg-[#0b0b0b] border border-[#d4af37]/40 px-3 py-1 rounded-lg text-[#d4af37] font-bold">⬅️ العودة للرئيسية والفروع</button>
            <h2 className="text-md font-black text-[#d4af37] font-serif">🎰 ساحة حراج أناقة CHIC الكبرى (40 مربعاً فاضياً)</h2>
          </div>
          <div className="flex-1 mt-3 grid grid-cols-2 md:grid-cols-5 gap-3 overflow-y-auto pb-4 pr-1">
            {Array.from({ length: 40 }).map((_, i) => (
