import { useState, useEffect } from "react";
import { Dress } from "@workspace/api-client-react";
import { Link } from "wouter";
import { formatSAR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Eye, Sparkles } from "lucide-react";

interface DressCardProps {
  dress: Dress;
}

export function DressCard({ dress }: DressCardProps) {
  const [viewers, setViewers] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.max(5, prev + Math.floor(Math.random() * 3) - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href={`/dresses/${dress.id}`}>
      <div className="group cursor-pointer rounded-2xl bg-[#0b0b0b] border border-[#333] overflow-hidden hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-500 flex flex-col h-full hover:-translate-y-2">
        
        <div className="relative overflow-hidden w-full h-[400px]">
          <img
            src={dress.imageUrl}
            alt={dress.nameAr}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          
          <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md border border-[#d4af37]/50 px-3 py-1 rounded-full flex items-center gap-2 text-[#d4af37] text-[10px] font-bold shadow-lg">
            <Eye size={12} />
            <span>{viewers} يشاهدون الأناقة الآن</span>
          </div>

          {dress.isNew && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-[#d4af37] text-black font-bold px-3 py-1 text-[10px] shadow-lg">
                جديد وحصري
              </Badge>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-[#111] to-[#050505]">
          <h3 className="text-xl font-bold text-white mb-2">{dress.nameAr}</h3>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">{dress.description}</p>
          
          {/* قسم تمارا وتابي الملكي */}
          <div className="mb-4 flex items-center gap-2 bg-[#1a1a1a] p-2 rounded-lg border border-[#d4af37]/20">
            <Sparkles size={14} className="text-[#d4af37]" />
            <div className="flex gap-2 text-[10px] font-bold text-[#d4af37]">
              <span>تـمـارا ✨</span>
              <span>|</span>
              <span>تـابـي ✨</span>
            </div>
            <span className="text-[9px] text-gray-500 mr-auto">تقسيط مرن</span>
          </div>

          <div className="mt-auto pt-4 border-t border-[#222] flex items-center justify-between">
            <span className="text-xl font-bold text-[#d4af37]">{formatSAR(dress.price)}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest">
              {dress.category === 'evening' ? 'فستان سهرة' : 'تصميم ناعم'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
