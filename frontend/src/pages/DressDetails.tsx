import React, { useState } from "react";
import { useParams, Link, useLocation } from "wouter";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

// قاعدة البيانات المدمجة الموحدة لمتجر أناقة CHIC حقت فهد الشمري لتخطي الحزم المفقودة
const DRESSES_DATA = [
  { id: 1, nameAr: 'فستان سهرة ملكي مطرز بالذهب', category: 'evening', price: 2500, sizes: ['S', 'M', 'L', 'XL'], colors: ['ذهبي', 'أسود ملكي'], imageUrl: 'https://unsplash.com', isNew: true, rating: "4.9", reviewCount: 24, description: 'فستان سهرة فاخر ومطرز بخيوط الذهب الخالص ليعكس فخامتكِ الملكية في المناسبات الكبرى.' },
  { id: 2, nameAr: 'فستان مخمل شتوي فخم - لعمر 15 سنة', category: 'evening', price: 1800, sizes: ['M', 'L'], colors: ['عنابي دافئ', 'كحلي ملوكي'], imageUrl: 'https://unsplash.com', isNew: true, rating: "4.8", reviewCount: 18, description: 'قطعة مخملية ثقيلة ودافئة مصممة بأعلى معايير الأناقة والجمال خصيصاً لعمر 15 سنة.' },
  { id: 3, nameAr: 'عباية الأناقة الشيفون الفاخرة', category: 'soft', price: 1200, sizes: ['52', '54', '56'], colors: ['أسود فاحم'], imageUrl: 'https://unsplash.com', isNew: false, rating: "5.0", reviewCount: 32, description: 'عباية شيفون فاخرة بتصميم انسيابي ملوكي وخفيف يناسب حضورك الراقٍ.' },
  { id: 4, nameAr: 'فستان ناعم كلاسيكي بسيط', category: 'soft', price: 1500, sizes: ['S', 'M'], colors: ['وردي هادئ'], imageUrl: 'https://unsplash.com', isNew: false, rating: "4.7", reviewCount: 15, description: 'فستان كلاسيكي ناعم وبسيط يجمع بين النعومة والجمال الهادئ.' }
];

export function DressDetails() {
  const { id } = useParams<{ id: string }>();
  const dressId = parseInt(id || "1", 10);
  
  // جلب بيانات الفستان أوتوماتيكياً من المصفوفة المدمجة المستقرة
  const dress = DRESSES_DATA.find((d) => d.id === dressId) || DRESSES_DATA[0];

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("يرجى اختيار المقاس الملكي أولاً! 📐");
      return;
    }
    if (!selectedColor && dress.colors.length > 0) {
      toast.error("يرجى اختيار اللون المطلوب! 🎨");
      return;
    }

    toast.success(`تمت إضافة ${dress.nameAr} إلى سلة مشترياتكِ بنجاح ملوكي! 🛍️✨`);
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-8 pb-24 text-white" dir="rtl">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="mb-8">
          <button 
            onClick={() => { window.location.reload(); }}
            className="flex items-center gap-2 text-xs font-bold text-[#d4af37] bg-[#0b0b0b] border border-[#d4af37]/30 px-4 py-2 rounded-xl hover:bg-[#d4af37] hover:text-black transition-all"
          >
            <ArrowRight size={16} />
            العودة للكتالوج الرئيسي 📺
          </button>
        </div>

        <div className="bg-[#0b0b0b] rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* عرض الصورة والوسام الملكي */}
            <div className="relative h-[400px] lg:h-[550px] bg-[#111] flex items-center justify-center border-b lg:border-b-0 lg:border-l border-white/5">
              <span className="text-6xl opacity-20 absolute z-0 select-none">CHIC</span>
              <div className="text-7xl relative z-10 animate-pulse">👗</div>
              {dress.isNew && (
                <div className="absolute top-6 right-6">
                  <span className="bg-[#d4af37] text-black font-black px-4 py-1.5 text-xs rounded-xl shadow-xl tracking-widest">
                    جديد ✨
                  </span>
                </div>
              )}
            </div>

            {/* تفاصيل وخيارات الفستان بالكامل */}
            <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center text-right">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold text-[#d4af37] uppercase tracking-wide">
                  {dress.category === 'evening' ? 'فساتين سهرة فاخرة' : 'فساتين ناعمة كلاسيكية'}
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl font-bold font-serif text-white mb-3">
                {dress.nameAr}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-black text-[#d4af37] font-mono">{dress.price} ريال</span>
                
                {dress.rating && (
                  <div className="flex items-center gap-1 bg-[#141414] border border-white/5 px-3 py-1 rounded-full text-xs">
                    <Star size={14} className="fill-[#d4af37] text-[#d4af37]" />
                    <span className="font-bold text-white">{dress.rating}</span>
                    <span className="text-white/40">({dress.reviewCount} تقييم)</span>
                  </div>
                )}
              </div>

              <p className="text-xs md:text-sm text-white/70 mb-8 leading-relaxed font-light">
                {dress.description}
              </p>

              <div className="space-y-6 mb-8 text-xs">
                {/* المقاسات */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <h3 className="font-bold text-white">المقاس المتاح بالفحص:</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {dress.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] h-10 px-3 rounded-xl border font-bold transition-all ${
                          selectedSize === size 
                            ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg scale-105' 
                            : 'bg-[#141414] text-white border-white/10 hover:border-[#d4af37]/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* الألوان */}
                {dress.colors.length > 0 && (
                  <div>
                    <h3 className="font-bold text-white mb-2.5">اللون المتوفر بالمخزن:</h3>
                    <div className="flex flex-wrap gap-2">
                      {dress.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`h-10 px-4 rounded-xl border font-bold transition-all ${
                            selectedColor === color 
                              ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg' 
                              : 'bg-[#141414] text-white border-white/10 hover:border-[#d4af37]/50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* العداد الذكي للكمية + زر إضافة السلة المكتملة */}
            <div className="flex gap-3 pt-4 border-t border-white/5">
              <div className="flex items-center border border-white/10 rounded-xl bg-[#141414] overflow-hidden h-12">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-full flex items-center justify-center text-white/60 hover:bg-white/5 font-bold transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm font-mono">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-full flex items-center justify-center text-white/60 hover:bg-white/5 font-bold transition-colors"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] text-black font-black text-xs md:text-sm rounded-xl shadow-[0_0_25px_rgba(212,175,55,0.2)] hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} />
                <span>إضافة فستان السهرة للسلة وإتمام الشراء 🛍️</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
