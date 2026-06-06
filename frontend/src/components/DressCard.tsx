import { useState, useEffect } from "react";
import { Dress } from "@workspace/api-client-react";
import { Link } from "wouter";
import { formatSAR } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react"; // تم إضافة أيقونة العين

interface DressCardProps {
  dress: Dress;
}

export function DressCard({ dress }: DressCardProps) {
  // عداد الإغراء التفاعلي
  const [viewers, setViewers] = useState(14);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => Math.max(5, prev + Math.floor(Math.random() * 3) - 1));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href={`/dresses/${dress.id}`}>
      <div className="group cursor-pointer rounded-xl bg-card border border-border overflow-hidden hover:shadow-2xl hover:shadow-[#d4af37]/20 transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
        
        <div className="relative overflow-hidden w-full h-[400px]">
          <img
            src={dress.imageUrl}
            alt={dress.nameAr}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          
          {/* عداد الإغراء التفاعلي */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md border border-[#d4af37]/30 px-3 py-1 rounded-full flex items-center gap-2 text-[#d4af37] text-[10px] font-bold animate-pulse">
            <Eye size={12} />
            <span>{viewers} شخص يشاهد هذا الآن</span>
          </div>

          {dress.isNew && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 text-xs">
                جديد
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 z-0" />
        </div>

        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-foreground line-clamp-1">{dress.nameAr}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{dress.description}</p>
          <div className="mt-auto pt-4 border-t border-border flex items-center justify-between">
            <span className="text-lg font-bold text-primary">{formatSAR(dress.price)}</span>
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              {dress.category === 'evening' ? 'سهرة' : 'ناعم'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
