import React, { useState, useEffect, startTransition } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  // القنوات (0: البوابات والتحصين، 1: شاشة المتجر والكتالوج، 2: رادار الرقابة، 3: نظام حراج أناقة CHIC)
  const [currentChannel, setCurrentChannel] = useState(0);
  const [activeGate, setActiveGate] = useState('gate1');
  const [selectedCat, setSelectedCat] = useState('الكل');
  
  // أنظمة الإدخال والأمان
  const [password, setPassword] = useState('');
  const [tvFade, setTvFade] = useState(false);
  const [aiResponse, setAiResponse] = useState('أهلاً بكِ في دليل الأناقة الذكي! أنا راداركِ الاصطناعي لحساب مقاسات السلة والفساتين. اسأليني أي شيء الحين عن المقاس الحقيقي بالفحص.');

  // تأثير بصري ناعم عند تقليب قنوات التلفزيون (منع الاسكرول نهائياً)
  const triggerChannelChange = (channelNumber: number) => {
    setTvFade(true);
    setTimeout(() => {
      setCurrentChannel(channelNumber);
      setTvFade(false);
    }, 250);
  };

  return (
    <div className={`fixed inset-0 w-screen h-screen bg-[#050505] text-white font-sans overflow-hidden select-none antialiased transition-opacity duration-500 ${tvFade ? 'opacity-0' : 'opacity-100'}`} dir="rtl">
      
      {/* 👤 زر وضع الشبح المخفي الصغير جِدّاً للمالك فهد (بأعلى اليسار 2 بكسل) */}
      <div onClick={() => triggerChannelChange(2)} className="absolute top-0 left-0 w-2 h-2 bg-transparent cursor-pointer z-50 hover:bg-[#d4af37]/5" />

      {/* 🎀 الأشرطة المتحركة الفخمة في أعلى الشاشة التلفزيونية بالكامل */}
      <div className="fixed top-0 inset-x-0 z-50 flex flex-col shadow-2xl select-none">
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

      {/* 📺 القناة 0: بوابات القفل والأمان والتحصين الشرعي والبسملة */}
      {currentChannel === 0 && (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-radial from-[#0d0d0d] to-[#050505] pt-20">
          <div className="text-center mb-6 animate-pulse">
            <h1 className="text-2xl md:text-4xl font-bold text-[#d4af37] font-serif mb-2">بسم الله الرحمن الرحيم</h1>
            <p className="text-white/50 text-xs">منصة "أناقة CHIC" الفاخرة لفساتين السهرة. مستند الحماية والأمان مطبق بالكامل لحساب فهد الشمري.</p>
          </div>
          <div className="w-full max-w-md bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 shadow-2xl">
            <form onSubmit={(e) => { e.preventDefault(); if(password==='fahad123') triggerChannelChange(1); }} className="space-y-4">
              <h2 className="text-lg font-bold text-center text-[#d4af37] font-serif">بوابة الدخول الملكية الآمنة</h2>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full h-11 bg-[#050505] border border-[#d4af37]/40 rounded-xl text-center text-lg font-bold text-[#d4af37] focus:outline-none" placeholder="••••••••" />
              <button type="submit" className="w-full h-11 bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] text-black font-black text-xs rounded-xl shadow-lg">التحقق والولوج الفوري للمتجر 🚀</button>
            </form>
          </div>
        </div>
      )}

      {/* 📺 القناة 1: شاشة العرض الكبرى والأقسام والفروع والتعليقات والولاء الملوكي (بدون اسكرول) */}
      {currentChannel === 1 && (
        <div className="w-full h-full flex flex-col justify-between p-4 bg-[#050505] pt-16 pb-2">
          
          {/* الهيدر وقائمة الأقسام الكبرى الخماسية من صورتك */}
          <div className="flex flex-col lg:flex-row justify-between items-center border-b border-white/5 pb-2 gap-2">
            <div className="flex flex-wrap gap-1 bg-[#0b0b0b] p-1 rounded-xl border border-white/5 text-[10px] font-bold">
              {['الكل', 'فساتين سهرة', 'فساتين ناعمة', 'فساتين مناسبات', 'أحدث الموديلات', 'الجيل الذهبي', 'حراج أناقة CHIC 🎰'].map(cat => (
                <button key={cat} onClick={() => { if(cat.includes('حراج')) { triggerChannelChange(3); } else { setSelectedCat(cat); } }} className={`px-2.5 py-1.5 rounded-lg transition-all ${selectedCat === cat ? 'bg-[#d4af37] text-black font-black' : 'text-white/60 hover:text-white'}`}>{cat}</button>
              ))}
            </div>
            
            {/* 🔴 مؤشر الازدحام المروري الذكي لايف باللون العنابي والذهبي */}
            <div className="bg-gradient-to-r from-red-950/40 to-[#110f08] border border-[#d4af37]/30 rounded-xl px-3 py-1 text-center animate-pulse">
              <span className="text-[10px] font-bold text-[#d4af37]">⚠️ مؤشر حساب الزوار: <span className="text-white font-mono">145 زائر لايف</span> • لتكن الفرصة تخفيضاتنا مستمرة وحصرية لفترة محدودة جِداً! 🔥</span>
            </div>
          </div>

          {/* محتوى الصفحة المقسم جراحياً كشاشة تلفزيون (بدون نزول عشوائي) */}
          <div className="flex-1 my-2 grid grid-cols-1 xl:grid-cols-12 gap-4 overflow-hidden">
            
            {/* الجناح الأيمن (5 أعمدة): المربعات الأربعة ومحرك الذكاء ودليل المقاسات والحسابات البنكية */}
            <div className="xl:col-span-5 flex flex-col gap-3 overflow-y-auto pr-1">
              
              {/* المربعات الأربعة الذكية وأنظمة أمازون العالمية */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-[#0b0b0b] border border-white/5 p-2.5 rounded-xl text-center">
                  <span className="text-xs font-black text-[#d4af37] block">🛍️ سوق الفساتين</span>
                  <span className="text-[10px] text-white/40">أنظمة أمازون العالمية</span>
                </div>
                <div className="bg-[#0b0b0b] border border-white/5 p-2.5 rounded-xl text-center">
                  <span className="text-xs font-black text-[#d4af37] block">📢 أعلني معنا</span>
                  <span className="text-[10px] text-white/40">تسهيل الكلام بأسلوب مبدع</span>
                </div>
              </div>

              {/* روبوت الذكاء الاصطناعي للرد على أسئلة السلة والمقاس التلفزيوني */}
              <div className="bg-[#0b0b0b] border border-[#d4af37]/20 p-3 rounded-xl space-y-1.5">
                <span className="text-[10px] font-black text-[#d4af37] flex items-center gap-1">🤖 مكان مخصص للذكاء الاصطناعي (يختص بالجواب عن أسئلة السلة والفساتين):</span>
                <p className="text-[11px] text-white/70 bg-[#050505] p-2 rounded-lg border border-white/5 italic">"{aiResponse}"</p>
              </div>

              {/* دليل المقاسات التفاعلية وخيار الغسيل الجاف الصارم */}
              <div className="bg-[#0b0b0b] border border-white/5 p-3 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-black text-white/60 block">📐 أدلة وحاسبة العبايات التفاعلية (حامية ذكية تمنع الخلط المفقود):</span>
                <div className="flex justify-between items-center bg-[#141414] p-2 rounded-lg border border-white/5">
                  <div className="flex gap-1">{['50', '52', '54', '56'].map(s => <span key={s} className="bg-[#050505] text-[#d4af37] px-2 py-0.5 rounded font-bold border border-white/5">{s}</span>)}</div>
                  <span className="text-[10px] bg-blue-950 text-blue-400 px-2 py-0.5 rounded font-bold">🧺 غسيل جاف (Dry Clean) فقط</span>
                </div>
              </div>

              {/* 💰 شاشة الفاتورة والحسابات البنكية المعتمدة ونظام الضمان المشفر */}
              <div className="bg-[#0b0b0b] border-2 border-green-500/20 p-3 rounded-xl space-y-2 text-xs">
                <span className="text-[10px] font-black text-green-400 block">💳 خدمة المالية وفاتورة الـ (Pdf): الحسابات البنكية الرسمية للمتجر</span>
                <div className="space-y-1 text-[10px] text-white/80 font-mono bg-[#050505] p-2 rounded-lg border border-white/5">
                  <p>🏦 **مصرف الراجحي:** <span className="text-[#d4af37]">SA09800000509608010069017</span></p>
                  <p>🏦 **بنك الإنماء:** <span className="text-[#d4af37]">SA88304000108088851870011</span></p>
                </div>
                <div className="bg-amber-950/20 border border-[#d4af37]/30 p-2 rounded-lg text-center text-[10px] text-[#d4af37] font-bold animate-pulse">
                  🛡️ نظام الضمان الذهبي وحجز الأموال: ملزم يوضح احتجاز المبالغ بأمان دون تسليمه للبائع لحين وصول الشحنة وضمان عدم الغش 🔒.
                </div>
              </div>
            </div>

            {/* الجناح الأيسر (7 أعمدة): ركن الولاء الفاخر لولاة الأمر وبند حماية الحقوق وسناب شات فهد */}
            <div className="xl:col-span-7 flex flex-col justify-between overflow-y-auto gap-3">
              
              {/* 🇸🇦 ركن الفخر والولاء الملوكي البارز ومؤسس الدولة الملك عبد العزيز وقادة المجد */}
              <div className="bg-gradient-to-b from-[#110f08] to-[#070706] border-2 border-[#d4af37]/30 rounded-2xl p-4 flex flex-col justify-between items-center text-center relative shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent animate-pulse" />
                <h3 className="text-[11px] font-black text-[#d4af37] tracking-widest font-serif border-b border-[#d4af37]/20 pb-2 w-full">🇸🇦 ركن قادة المجد والولاء الملوكي المعتمد 🇸🇦</h3>
