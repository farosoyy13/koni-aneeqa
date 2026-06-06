import { useListDresses } from "@workspace/api-client-react";
import { DressCard } from "@/components/DressCard";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "wouter";
import { useState } from "react";
import { Sparkles, Diamond } from "lucide-react";

export function Catalog() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCategory = searchParams.get("category") || "all";
  
  const [activeTab, setActiveTab] = useState(initialCategory);

  const { data: dresses, isLoading } = useListDresses(
    activeTab === "all" ? undefined : { category: activeTab as any }
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-12 pb-24 selection:bg-[#d4af37] selection:text-black">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* الترويسة بلمسة ملكية */}
        <div className="text-center mb-16 space-y-4">
          <Diamond className="mx-auto text-[#d4af37] animate-pulse" size={40} />
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#d4af37] tracking-tighter">كتالوج أناقة CHIC</h1>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <span className="w-12 h-[1px] bg-gradient-to-r from-transparent to-[#d4af37]"></span>
            <p className="font-light italic">حيث تلتقي الفخامة بالجمال</p>
            <span className="w-12 h-[1px] bg-gradient-to-l from-transparent to-[#d4af37]"></span>
          </div>
        </div>

        {/* قائمة التصنيفات الذهبية */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col items-center mb-16" dir="rtl">
          <TabsList className="bg-[#111] border border-[#d4af37]/30 p-1 rounded-full w-full max-w-md h-auto grid grid-cols-3 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
            {["all", "evening", "soft"].map((cat) => (
              <TabsTrigger 
                key={cat} 
                value={cat} 
                className="rounded-full py-3 data-[state=active]:bg-[#d4af37] data-[state=active]:text-black font-bold transition-all duration-500"
              >
                {cat === "all" ? "الكل" : cat === "evening" ? "سهرة" : "ناعمة"}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* عرض المنتجات مع تأثير الظل الذهبي */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-[450px] w-full rounded-3xl bg-[#111]" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-in fade-in zoom-in duration-700">
            {dresses?.map((dress) => (
              <div key={dress.id} className="group relative transition-all duration-500 hover:-translate-y-2">
                {/* إطار التوهج الذهبي حول البطاقة */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#d4af37] to-[#8b6b00] rounded-3xl opacity-0 group-hover:opacity-100 transition duration-500 blur"></div>
                <div className="relative">
                   <DressCard dress={dress} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
