import React, { useState, useEffect, startTransition } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// 🎯 الاستدعاء الصارم والصحيح داخل الأقواس لتطابق نظام الصفحات الـ 5 حقتك 100% بدون لمسها
import { Catalog } from './pages/Catalog';
import { DressDetails } from './pages/DressDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';

const MAIN_CATEGORIES = ['الكل', 'فساتين سهرة', 'فساتين ناعمة', 'فساتين مناسبات', 'أحدث الموديلات', 'الجيل الذهبي', 'بنات (2-15 سنة)', 'حراج أناقة CHIC 🎰'];

const INITIAL_COMMENTS = [
  { id: 1, name: 'سارة القحطاني', review: 'فستان السهرة المطرز يجنن وفخامته خيال وعن تجربة الشراء أنصحكم فيه بشدة! 😍' },
  { id: 2, name: 'منيرة الشمري', review: 'التوصيل سريع والتعامل راقي جداً، العباية قطعة فنية ترفع الرأس ✨' },
  { id: 3, name: 'أمل العنزي', review: 'أجمل متجر تعاملت معه، الفساتين الناعمة خاماتها أصلية ومريحة 💎' }
];

export default function App() {
  const [currentChannel, setCurrentChannel] = useState(0);
  const [activeGate, setActiveGate] = useState('gate1');
  const [selectedCat, setSelectedCat] = useState('الكل');
  const [conditionFilter, setConditionFilter] = useState('الكل');
  const [isStealthMode, setIsStealthMode] = useState(false);
  const [password, setPassword] = useState('');
  
  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newCommentName, setNewCommentName] = useState('');
  const [newCommentText, setNewCommentText] = useState('');
  const [showRoyalMarquee, setShowRoyalMarquee] = useState(false);
  const [tvFade, setTvFade] = useState(false);

  const triggerChannelChange = (channelNumber: number) => {
    setTvFade(true);
    setTimeout(() => {
      setCurrentChannel(channelNumber);
      setTvFade(false);
    }, 250);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    setComments([{ id: Date.now(), name: newCommentName, review: newCommentText }, ...comments]);
    setNewCommentName('');
    setNewCommentText('');
    toast.success('تم نشر تعليقك وثنائك العطر بنجاح! ✨');
  };

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden select-none antialiased transition-opacity duration-500 ${tvFade ? 'opacity-0' : 'opacity-100'}`} dir="rtl">
      
      {/* 👤 الزر المخفي جِدّاً لـ وضع الشبح السري للمالك فهد */}
      <div onClick={() => { setIsStealthMode(true); triggerChannelChange(2); toast.success('👤 تم تفعيل وضع الشبح المخفي للرقابة الإدارية!'); }} className="absolute top-0 left-0 w-2 h-2 bg-transparent cursor-pointer z-50 hover:bg-[#d4af37]/5" />

      {/* 🎀 شريطان متحركان علويان */}
      <div className="fixed top-0 inset-x-0 z-50 flex flex-col shadow-2xl">
        <div className="h-6 bg-[#0b0b0b] border-b border-[#d4af37]/30 flex items-center overflow-hidden">
          <div className="animate-marquee whitespace-nowrap text-[10px] font-bold text-[#d4af37] flex items-center gap-16">
            <span>✨ أعلني فستانك أو عبايتك المتبقية عندك هنا في منصتنا ونضمن لك البيع بأسرع وقت ممكن بإذن الله (تعديل وتسهيل بأفضل أسلوب) ✨</span>
          </div>
        </div>
        <div className="h-6 bg-[#111] border-b-2 border-[#d4af37] flex items-center overflow-hidden">
          <div className="animate-marquee-reverse whitespace-nowrap text-[10px] font-bold text-white flex items-center gap-16">
            <span>👑 عاد إليكم موقع (أناقة CHIC) الفخم بحلته الجديدة وتصميمه الملكي الذي يليق بفخامتكم ويناسب أذواقكم الرفيعة أهلاً بالجميع 👑</span>
          </div>
        </div>
      </div>

      {/* 📺 القناة 0: بوابات القفل والأمان والتحصين الشرعي */}
      {currentChannel === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-radial from-[#0d0d0d] to-[#050505] pt-20">
          <div className="text-center mb-6 animate-pulse">
            <h1 className="text-2xl md:text-4xl font-bold text-[#d4af37] font-serif mb-2">بسم الله الرحمن الرحيم</h1>
            <p className="text-white/50 text-xs">منصة "أناقة CHIC" لفساتين السهرة. مستند الأمان مطبق بالكامل لحماية حلالك.</p>
          </div>
          <div className="w-full max-w-md bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl">
            <form onSubmit={(e) => { e.preventDefault(); if(password==='fahad123') triggerChannelChange(1); }} className="space-y-4">
              <h2 className="text-lg font-bold text-center text-[#d4af37] font-serif">بوابة الدخول الملكية الآمنة</h2>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full h-12 bg-[#050505] border border-[#d4af37]/40 rounded-xl text-center text-lg font-bold text-[#d4af37] focus:outline-none" placeholder="••••••••" />
              <button type="submit" className="w-full h-11 bg-[#d4af37] text-black font-black text-xs rounded-xl shadow-lg">التحقق والولوج الفوري للمتجر 🚀</button>
            </form>
          </div>
        </div>
      )}

      {/* 📺 القناة 1: شاشة العرض الكبرى والكتالوج والتعليقات والولاء الملوكي */}
      {currentChannel === 1 && (
        <div className="w-full h-full flex flex-col justify-between p-4 bg-[#050505] pt-16 pb-2">
          <div className="flex flex-col lg:flex-row justify-between items-center border-b border-white/5 pb-2 gap-2">
            <div className="flex flex-wrap gap-1 bg-[#0b0b0b] p-1 rounded-xl border border-white/5 text-[10px] font-bold">
              {MAIN_CATEGORIES.map(cat => (
                <button key={cat} onClick={() => { if(cat.includes('حراج')) { triggerChannelChange(3); } else { setSelectedCat(cat); } }} className={`px-2.5 py-1.5 rounded-lg transition-all ${selectedCat === cat ? 'bg-[#d4af37] text-black font-black' : 'text-white/60 hover:text-white'}`}>{cat}</button>
              ))}
            </div>
            <div className="bg-gradient-to-r from-red-950/40 to-[#110f08] border border-[#d4af37]/30 rounded-xl px-3 py-1 text-center animate-pulse">
              <span className="text-[10px] font-bold text-[#d4af37]">⚠️ مؤشر حساب الزوار: <span className="text-white font-mono">145 زائر لايف</span> • لتكن الفرصة تخفيضاتنا مستمرة وحصرية لفترة محدودة! 🔥</span>
            </div>
          </div>

          <div className="flex-1 my-2 grid grid-cols-1 xl:grid-cols-12 gap-4 overflow-hidden">
            <div className="xl:col-span-4 bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
              <h3 className="text-xs font-black text-[#d4af37] border-b border-white/5 pb-2 mb-2">💬 آراء وتقييمات العملاء الجاهزة وعن تجربة الشراء</h3>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[11px]">
                {comments.map(c => (
                  <div key={c.id} className="bg-[#141414] p-2.5 rounded-xl border border-white/5">
                    <span className="font-bold text-white block">👤 {c.name} ⭐⭐⭐⭐⭐</span>
                    <p className="text-white/70 italic mt-0.5">"{c.review}"</p>
                  </div>
                ))}
              </div>
              <form onSubmit={handleAddComment} className="mt-3 pt-3 border-t border-white/5 space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" required value={newCommentName} onChange={e => setNewCommentName(e.target.value)} placeholder="اسمك الكريم" className="h-8 bg-[#141414] border border-white/10 rounded-lg px-2 text-[11px] text-white focus:outline-none" />
                  <button type="submit" className="h-8 bg-[#d4af37] text-black font-bold text-[11px] rounded-lg">إضافة ثناء عطر ✍️</button>
                </div>
                <input type="text" required value={newCommentText} onChange={e => setNewCommentText(e.target.value)} placeholder="اكتبي تعليقك الفخم عن تجربة الشراء هنا..." className="w-full h-8 bg-[#141414] border border-white/10 rounded-lg px-2 text-[11px] text-white focus:outline-none" />
              </form>
            </div>

            <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
              <div className="md:col-span-7 bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                <span className="text-2xl text-[#d4af37] animate-pulse">👑</span>
                <h3 className="text-xs font-bold text-white mt-1">شاشة عرض فساتين منصة أناقة CHIC</h3>
                <p className="text-[10px] text-white/40 mt-1">يتم الفرز أوتوماتيكياً في نفس الصفحة التلفزيونية وبدون أي تحريك عشوائي.</p>
              </div>

              <div className="md:col-span-5 bg-gradient-to-b from-[#110f08] to-[#070706] border-2 border-[#d4af37]/30 rounded-2xl p-4 flex flex-col justify-between items-center text-center relative shadow-2xl">
                <h3 className="text-[10px] font-black text-[#d4af37] border-b border-[#d4af37]/20 pb-1 w-full">🇸🇦 ركن قادة المجد والولاء الملوكي 🇸🇦</h3>
                <div className="text-[11px] text-white/80 leading-relaxed font-serif bg-[#050505]/60 p-2.5 rounded-xl border border-white/5">
                  تحت راية الملك سلمان وعضيده محمد بن سلمان، نسير بعز وفخر نحو أمجاد لا تنتهي. حفظ الله ملوكنا الأوفياء ودام عز وطننا الشامخ.
                </div>
                <div className="w-full bg-[#050505] border border-[#d4af37]/40 rounded-xl p-2 text-[10px] font-bold text-[#d4af37]">
                  💪 فخر وثناء للشعب السعودي الكريم: <span className="text-white text-xs bg-[#d4af37]/10 px-1  rounded">( شعب طويق )</span> أهل الجود والنخوة ✨
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0b0b0b] border border-[#d4af37]/30 rounded-xl p-2.5 text-center text-xs text-[#d4af37] font-bold tracking-wide">