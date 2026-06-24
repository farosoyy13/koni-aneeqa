import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// الصفحات (قنوات داخل شاشة التلفاز)
import { Catalog } from './pages/Catalog';
import { DressDetails } from './pages/DressDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Contact } from './pages/Contact';

// نموذج الدخول المفصول
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

const CHANNELS_BY_CATEGORY: Record<string, number> = {
  'الكل': 4,
  'فساتين سهرة': 4,
  'فساتين ناعمة': 4,
  'فساتين مناسبات': 4,
  'أحدث الموديلات': 4,
  'الجيل الذهبي': 4,
  'بنات (2-15 سنة)': 4,
  'الأسر المنتجة': 5,
  'حراج أناقة CHIC 🎰': 3,
};

const INITIAL_COMMENTS = [
  { id: 1, name: 'سارة القحطاني', review: 'فستان السهرة المطرز يجنن وفخامته خيال وعن تجربة الشراء أنصحكم فيه بشدة! 😍' },
  { id: 2, name: 'منيرة الشمري', review: 'التوصيل سريع والتعامل راقي جداً، العباية قطعة فنية ترفع الرأس ✨' },
  { id: 3, name: 'أمل العنزي', review: 'أجمل متجر تعاملت معه، الفساتين الناعمة خاماتها أصلية ومريحة 💎' },
];

export default function App() {
  const [currentChannel, setCurrentChannel] = useState<number>(0); // 0: بوابة
  const [selectedCat, setSelectedCat] = useState<string>('الكل');
  const [isStealthMode, setIsStealthMode] = useState<boolean>(false);

  const [comments, setComments] = useState(INITIAL_COMMENTS);
  const [newCommentName, setNewCommentName] = useState<string>('');
  const [newCommentText, setNewCommentText] = useState<string>('');
  const [tvFade, setTvFade] = useState<boolean>(false);

  // قناة الأسر المنتجة — الفروع
  const [familyBranch, setFamilyBranch] = useState<'أم محمد' | 'فارس' | 'فرع 3' | 'فرع 4'>('أم محمد');

  const triggerChannelChange = (channelNumber: number) => {
    setTvFade(true);
    setTimeout(() => {
      setCurrentChannel(channelNumber);
      setTvFade(false);
    }, 250);
  };

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCommentName.trim() || !newCommentText.trim()) return;
    setComments((prev) => [
      { id: Date.now(), name: newCommentName, review: newCommentText },
      ...prev,
    ]);
    setNewCommentName('');
    setNewCommentText('');
    toast.success('تم نشر تعليقك وثنائك العطر بنجاح! ✨');
  };

  return (
    <div
      className={`fixed inset-0 w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden select-none antialiased transition-opacity duration-500 ${
        tvFade ? 'opacity-0' : 'opacity-100'
      }`}
      dir="rtl"
      data-stealth-mode={isStealthMode ? '1' : '0'}
    >
      {/* CSS داخلي بسيط لحركة الشرائط المتحركة */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-marquee {
          display: inline-block;
          min-width: 100%;
          animation: marquee 18s linear infinite;
        }
        .animate-marquee-reverse {
          display: inline-block;
          min-width: 100%;
          animation: marqueeReverse 22s linear infinite;
        }
      `}</style>

      {/* زر تفعيل وضع الشبح (نقطة مخفية في أعلى اليسار) */}
      <div
        onClick={() => {
          setIsStealthMode(true);
          triggerChannelChange(2);
          toast.success('👤 تم تفعيل وضع الشبح المخفي للرقابة الإدارية!');
        }}
        className="absolute top-0 left-0 w-2 h-2 bg-transparent cursor-pointer z-50 hover:bg-[#d4af37]/5"
        aria-label="Stealth Mode"
      />

      {/* الشريطان العلويان */}
      <div className="fixed top-0 inset-x-0 z-40 flex flex-col shadow-2xl">
        <div className="h-6 bg-[#0b0b0b] border-b border-[#d4af37]/30 flex items-center overflow-hidden">
          <div className="whitespace-nowrap text-[10px] font-bold text-[#d4af37] flex items-center gap-16">
            <span className="animate-marquee">
              😂 عندك فستان زواج لبستيه مرّة وحدة وما تقدرين تلبسينه مرة ثانية؟
              أو عباية مرمية بالدولاب وتقولك "طلّعوني"؟ محتارة وين تودينها؟
              في موقع أناقة CHIC نضمن لك البيع بأسرع وقت ممكن — نزّلي إعلانك
              وخلي القطعة تعيش قصة حب ثانية! 💃✨
            </span>
          </div>
        </div>
        <div className="h-6 bg-[#111] border-b-2 border-[#d4af37] flex items-center overflow-hidden">
          <div className="whitespace-nowrap text-[10px] font-bold text-white flex items-center gap-16">
            <span className="animate-marquee-reverse">
              👑 عاد إليكم موقع (أناقة CHIC) الفخم بحلته الجديدة وتصميمه الملكي
              الذي يليق بفخامتكم ويناسب أذواقكم الرفيعة أهلاً بالجميع 👑
            </span>
          </div>
        </div>
      </div>

      {/* القناة 0: بوابة الدخول (بالمكوّن المفصول) */}
      {currentChannel === 0 && (
        <div
          className="w-full h-full flex flex-col items-center justify-center p-6 pt-20"
          style={{ background: 'radial-gradient(circle at 50% 40%, #0d0d0d 0%, #050505 70%)' }}
        >
          <div className="text-center mb-6 animate-pulse">
            <h1 className="text-2xl md:text-4xl font-bold text-[#d4af37] font-serif mb-2">
              بسم الله الرحمن الرحيم
            </h1>
            <p className="text-white/50 text-xs">
              منصة "أناقة CHIC" لفساتين السهرة. مستند الأمان مطبق بالكامل لحماية
              حلالك.
            </p>
          </div>
          <div className="w-full max-w-md bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl">
            <LoginGate
              // تخصيص اختياري:
              // requireOtp={true}
              // expectedPassword="fahad123"
              // expectedOtp="123456"
              onSuccess={() => triggerChannelChange(1)}
            />
          </div>
        </div>
      )}

      {/* القناة 1: الرئيسية */}
      {currentChannel === 1 && (
        <div className="w-full h-full flex flex-col justify-between p-4 bg-[#050505] pt-16 pb-2">
          <div className="flex flex-col xl:flex-row justify-between items-stretch xl:items-center border-b border-white/5 pb-2 gap-2">
            {/* قائمة الفئات */}
            <div className="flex-1 flex flex-wrap gap-1 bg-[#0b0b0b] p-1 rounded-xl border border-white/5 text-[10px] font-bold">
              {MAIN_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    const target = CHANNELS_BY_CATEGORY[cat] ?? 4;
                    setSelectedCat(cat); // تأكيد تحديث الفئة دائماً
                    triggerChannelChange(target);
                  }}
                  className={`px-2.5 py-1.5 rounded-lg transition-all ${
                    selectedCat === cat
                      ? 'bg-[#d4af37] text-black font-black'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* أزرار سريعة */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => triggerChannelChange(4)}
                className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
              >
                📺 الكتالوج
              </button>
              <button
                onClick={() => triggerChannelChange(6)}
                className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
              >
                🛒 السلة
              </button>
              <button
                onClick={() => triggerChannelChange(7)}
                className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
              >
                💳 الدفع
              </button>
              <button
                onClick={() => triggerChannelChange(8)}
                className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
              >
                📞 تواصل
              </button>
            </div>

            {/* مؤشر الزوار */}
            <div className="bg-gradient-to-r from-red-950/40 to-[#110f08] border border-[#d4af37]/30 rounded-xl px-3 py-1 text-center animate-pulse">
              <span className="text-[10px] font-bold text-[#d4af37]">
                ⚠️ مؤشر حساب الزوار: <span className="text-white font-mono">145 زائر لايف</span> •
                لتكن الفرصة تخفيضاتنا مستمرة وحصرية لفترة محدودة! 🔥
              </span>
            </div>
          </div>

          <div className="flex-1 my-2 grid grid-cols-1 xl:grid-cols-12 gap-4 overflow-hidden">
            {/* التعليقات */}
            <div className="xl:col-span-4 bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between overflow-hidden">
              <h3 className="text-xs font-black text-[#d4af37] border-b border-white/5 pb-2 mb-2">
                💬 آراء وتقييمات العملاء الجاهزة وعن تجربة الشراء
              </h3>
              <div className="flex-1 overflow-y-auto space-y-2 pr-1 text-[11px]">
                {comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-[#141414] p-2.5 rounded-xl border border-white/5"
                  >
                    <span className="font-bold text-white block">
                      👤 {c.name} ⭐⭐⭐⭐⭐
                    </span>
                    <p className="text-white/70 italic mt-0.5">"{c.review}"</p>
                  </div>
                ))}
              </div>
              <form
                onSubmit={handleAddComment}
                className="mt-3 pt-3 border-t border-white/5 space-y-2"
              >
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    value={newCommentName}
                    onChange={(e) => setNewCommentName(e.target.value)}
                    placeholder="اسمك الكريم"
                    className="h-8 bg-[#141414] border border-white/10 rounded-lg px-2 text-[11px] text-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="h-8 bg-[#d4af37] text-black font-bold text-[11px] rounded-lg"
                  >
                    إضافة ثناء عطر ✍️
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder="اكتبي تعليقك الفخم عن تجربة الشراء هنا..."
                  className="w-full h-8 bg-[#141414] border border-white/10 rounded-lg px-2 text-[11px] text-white focus:outline-none"
                />
              </form>
            </div>

            {/* شاشة عرض توضيحية */}
            <div className="xl:col-span-8 grid grid-cols-1 md:grid-cols-12 gap-4 overflow-hidden">
              <div className="md:col-span-7 bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                <span className="text-2xl text-[#d4af37] animate-pulse">👑</span>
                <h3 className="text-xs font-bold text-white mt-1">
                  شاشة عرض فساتين منصة أناقة CHIC
                </h3>
                <p className="text-[10px] text-white/40 mt-1">
                  يتم الفرز أوتوماتيكياً في نفس الصفحة التلفزيونية وبدون أي
                  تحريك عشوائي.
                </p>
              </div>

              <div className="md:col-span-5 bg-gradient-to-b from-[#110f08] to-[#070706] border-2 border-[#d4af37]/30 rounded-2xl p-4 flex flex-col justify-between items-center text-center relative shadow-2xl">
                <h3 className="text-[10px] font-black text-[#d4af37] border-b border-[#d4af37]/20 pb-1 w-full">
                  🇸🇦 ركن قادة المجد والولاء الملوكي 🇸🇦
                </h3>
                <div className="text-[11px] text-white/80 leading-relaxed font-serif bg-[#050505]/60 p-2.5 rounded-xl border border-white/5">
                  تحت راية الملك سلمان وعضيده محمد بن سلمان، نسير بعز وفخر نحو
                  أمجاد لا تنتهي. حفظ الله ملوكنا الأوفياء ودام عز وطننا الشامخ.
                </div>
                <div className="w-full bg-[#050505] border border-[#d4af37]/40 rounded-xl p-2 text-[10px] font-bold text-[#d4af37]">
                  💪 فخر وثناء للشعب السعودي الكريم:{' '}
                  <span className="text-white text-xs bg-[#d4af37]/10 px-1 rounded">
                    ( شعب طويق )
                  </span>{' '}
                  أهل الجود والنخوة ✨
                </div>
              </div>
            </div>
          </div>

          {/* تذييل */}
          <div className="bg-[#0b0b0b] border border-[#d4af37]/30 rounded-xl p-2.5 text-center text-xs text-[#d4af37] font-bold tracking-wide">
            © {new Date().getFullYear()} أناقة CHIC — كل الحقوق محفوظة.
          </div>
        </div>
      )}

      {/* القناة 2: وضع الشبح */}
      {currentChannel === 2 && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#050505] pt-20">
          <div className="max-w-md w-full bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl text-center">
            <h2 className="text-xl font-bold text-[#d4af37] mb-2">وضع الشبح مُفعّل</h2>
            <p className="text-white/70 text-sm mb-6">للوصول إلى العرض الرئيسي، اضغط رجوع.</p>
            <button
              onClick={() => triggerChannelChange(1)}
              className="h-10 px-6 bg-[#d4af37] text-black font-bold rounded-xl"
            >
              الرجوع إلى المتجر
            </button>
          </div>
        </div>
      )}

      {/* القناة 3: حراج أناقة CHIC */}
      {currentChannel === 3 && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-[#050505] pt-20">
          <div className="max-w-2xl w-full bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl text-center">
            <h2 className="text-xl font-bold text-[#d4af37] mb-3">حراج أناقة CHIC 🎰</h2>
            <p className="text-white/70 text-sm mb-6">مساحة مخصصة للعروض الخاصة والقطع المميزة. ترقّبي المزيد قريبًا.</p>
            <button
              onClick={() => triggerChannelChange(1)}
              className="h-10 px-6 bg-[#d4af37] text-black font-bold rounded-xl"
            >
              العودة للعرض الرئيسي
            </button>
          </div>
        </div>
      )}

      {/* القناة 4: الكتالوج */}
      {currentChannel === 4 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#050505] pt-16">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button
              onClick={() => triggerChannelChange(1)}
              className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
            >
              ⬅️ الرجوع للرئيسية
            </button>
            <div className="text-[11px] text-white/60">
              قناة الكتالوج — الفئة الحالية: <span className="text-[#d4af37] font-bold">{selectedCat}</span>
            </div>
          </div>
          <div className="flex-1 overflow-hidden mt-2 rounded-2xl border border-white/5 bg-[#0b0b0b]">
            <Catalog />
          </div>
        </div>
      )}

      {/* القناة 5: الأسر المنتجة (فروع) */}
      {currentChannel === 5 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#050505] pt-16">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button
              onClick={() => triggerChannelChange(1)}
              className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
            >
              ⬅️ الرجوع للرئيسية
            </button>
            <div className="text-[11px] text-[#d4af37] font-bold">الأسر المنتجة</div>
          </div>

          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-2">
            {(['أم محمد', 'فارس', 'فرع 3', 'فرع 4'] as const).map((name) => (
              <button
                key={name}
                onClick={() => setFamilyBranch(name)}
                className={`h-10 rounded-xl text-[12px] font-bold border ${
                  familyBranch === name
                    ? 'bg-[#d4af37] text-black border-[#d4af37]'
                    : 'bg-[#0b0b0b] text-white/80 border-white/10 hover:text-white'
                }`}
              >
                {name === 'أم محمد' ? 'فرع 1: أم محمد' :
                 name === 'فارس' ? 'فرع 2: فارس' :
                 name === 'فرع 3' ? 'فرع 3' : 'فرع 4'}
              </button>
            ))}
          </div>

          <div className="flex-1 mt-3 rounded-2xl border border-white/5 bg-[#0b0b0b] p-4 overflow-hidden">
            <h3 className="text-[12px] font-black text-[#d4af37] border-b border-white/10 pb-2">
              {familyBranch === 'أم محمد' && '📦 منتجات أم محمد — فرع 1'}
              {familyBranch === 'فارس' && '📦 منتجات فارس — فرع 2'}
              {familyBranch === 'فرع 3' && '📦 محتوى فرع 3'}
              {familyBranch === 'فرع 4' && '📦 محتوى فرع 4'}
            </h3>
            <div className="text-[11px] text-white/70 mt-3">
              - هنا يُعرض محتوى الفرع المختار بنفس شاشة التلفاز. اربط لاحقًا بيانات كل فرع بمصدر المنتجات لديك (JSON/API).
            </div>
          </div>
        </div>
      )}

      {/* القناة 6: السلة */}
      {currentChannel === 6 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#050505] pt-16">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button
              onClick={() => triggerChannelChange(1)}
              className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
            >
              ⬅️ الرجوع للرئيسية
            </button>
            <div className="text-[11px] text-[#d4af37] font-bold">السلة</div>
          </div>
          <div className="flex-1 overflow-hidden mt-2 rounded-2xl border border-white/5 bg-[#0b0b0b]">
            <Cart />
          </div>
        </div>
      )}

      {/* القناة 7: الدفع/إتمام الطلب */}
      {currentChannel === 7 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#050505] pt-16">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button
              onClick={() => triggerChannelChange(1)}
              className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
            >
              ⬅️ الرجوع للرئيسية
            </button>
            <div className="text-[11px] text-[#d4af37] font-bold">الدفع</div>
          </div>
          <div className="flex-1 overflow-hidden mt-2 rounded-2xl border border-white/5 bg-[#0b0b0b]">
            <Checkout />
          </div>
        </div>
      )}

      {/* القناة 8: تواصل معنا */}
      {currentChannel === 8 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#050505] pt-16">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button
              onClick={() => triggerChannelChange(1)}
              className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
            >
              ⬅️ الرجوع للرئيسية
            </button>
            <div className="text-[11px] text-[#d4af37] font-bold">تواصل معنا</div>
          </div>
          <div className="flex-1 overflow-hidden mt-2 rounded-2xl border border-white/5 bg-[#0b0b0b]">
            <Contact />
          </div>
        </div>
      )}

      {/* القناة 9: تفاصيل الفستان */}
      {currentChannel === 9 && (
        <div className="w-full h-full flex flex-col p-4 bg-[#050505] pt-16">
          <div className="flex items-center justify-between border-b border-white/5 pb-2">
            <button
              onClick={() => triggerChannelChange(4)}
              className="text-[11px] bg-[#0b0b0b] border border-white/10 px-3 py-1 rounded-lg hover:border-white/20"
            >
              ⬅️ الرجوع للكتالوج
            </button>
            <div className="text-[11px] text-[#d4af37] font-bold">تفاصيل الفستان</div>
          </div>
          <div className="flex-1 overflow-hidden mt-2 rounded-2xl border border-white/5 bg-[#0b0b0b]">
            <DressDetails />
          </div>
        </div>
      )}

      {/* Toasts */}
      <ToastContainer position="top-center" theme="dark" />
    </div>
  );
}