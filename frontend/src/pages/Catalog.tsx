import React, { useState } from "react";
import { useSearch } from "wouter";
import { Sparkles, Diamond } from "lucide-react";

// مصفوفة فساتين سهرة مدمجة ونظيفة متوافقة مع تصنيفات وألوان فهد الشمري الملكية لـ أناقة CHIC
const DUMMY_DRESSES = [
  { id: "1", name: "فستان سهرة ملكي مطرز بالذهب", category: "evening", price: "2500 ريال", image: "👑" },
  { id: '2', name: 'فستان مخمل شتوي فخم - لعمر 15 سنة', category: 'evening', price: '1800 ريال', image: '🧥' },
  { id: '3', name: 'عباية الأناقة الشيفون الفاخرة', category: 'soft', price: '1200 ريال', image: '🧕' },
  { id: '4', name: 'فستان ناعم كلاسيكي بسيط', category: 'soft', price: '1500 ريال', image: '👗' }
];

export function Catalog() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCategory = searchParams.get("category") || "all";
  
  const [activeTab, setActiveTab] = useState(initialCategory);

  // تصفية الفساتين فورياً وبدون لاق بناءً على القناة والتبويب النشط
  const filteredDresses = DUMMY_DRESSES.filter(
    (dress) => activeTab === "all" || dress.category === activeTab
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-12 pb-24 selection:bg-[#d4af37] selection:text-black">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* الترويسة بلمسة ملكية فخمة لمتجر فهد */}
        <div className="text-center mb-12 space-y-4">
          <Diamond className="mx-auto text-[#d4af37] animate-pulse" size={36} />
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#d4af37] tracking-tighter">كتالوج أناقة CHIC</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></span>
            <p className="font-light italic text-xs md:text-sm">حيث تلتقي الفخامة بالجمال الملكي</p>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></span>
          </div>
        </div>

        {/* أزرار التبويبات الفاخرة بالذهب والأسود الحالك */}
        <div className="w-full flex justify-center mb-12">
          <div className="bg-[#111] border border-[#d4af37]/30 p-1 rounded-xl w-full max-w-md grid grid-cols-3 shadow-[0_0_20px_rgba(212,175,55,0.1)] text-xs md:text-sm font-bold">
            {[
              { id: "all", label: "الكل" },
              { id: "evening", label: "سهرة" },
              { id: "soft", label: "ناعمة" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`py-2.5 rounded-lg transition-all duration-300 ${
                  activeTab === cat.id
                    ? "bg-[#d4af37] text-black font-black"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* عرض المنتجات مع تأثير الإطار والتوهج الذهبي المشع */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {filteredDresses.map((dress) => (
            <div key={dress.id} className="group relative transition-all duration-300 bg-[#0b0b0b] border border-white/5 rounded-2xl p-4 flex flex-col justify-between hover:border-[#d4af37]/40">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b6b00] rounded-2xl opacity-0 group-hover:opacity-10 transition duration-300 blur"></div>
              
              <div className="relative space-y-3 text-right">
                <div className="w-full h-32 bg-[#141414] rounded-xl flex items-center justify-center text-3xl border border-white/5 shadow-inner">
                  {dress.image}
                </div>
                <div>
                  <h3 className="text-xs md:text-sm font-black text-white">{dress.name}</h3>
                  <p className="text-[10px] text-[#d4af37] mt-0.5 font-serif">تصنيف فاخر مجهز</p>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <span className="text-xs font-mono font-bold text-white/90 bg-[#050505] px-2 py-0.5 rounded border border-white/5">{dress.price}</span>
                  <button className="h-7 px-3 bg-[#d4af37] text-black rounded-lg text-[10px] font-black hover:opacity-90">🛍️ تفاصيل</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
