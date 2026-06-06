import { useCart } from "@/contexts/CartContext";
import { formatSAR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Trash2, ShoppingBag, Crown } from "lucide-react";

export function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-[#050505]">
        <div className="w-24 h-24 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <ShoppingBag size={48} className="text-[#d4af37]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">سلة المشتريات فارغة</h2>
        <p className="text-white/60 mb-8 text-center max-w-md">لم تقومي بإضافة أي منتجات بعد. كوني أنيقة واكتشفي مجموعتنا الفاخرة.</p>
        <Link href="/dresses">
          <Button size="lg" className="rounded-full px-8 font-bold bg-[#d4af37] text-black hover:bg-[#b8860b]">تصفح التشكيلة</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-24 text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center gap-3 mb-10">
          <Crown className="text-[#d4af37]" />
          <h1 className="text-3xl md:text-4xl font-bold font-serif">سلة مشترياتكِ ({totalItems})</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/20 p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-lg">
                <div className="w-32 h-40 shrink-0 rounded-xl overflow-hidden bg-[#1a1a1a]">
                  <img src={item.dress.imageUrl} alt={item.dress.nameAr} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 w-full flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-[#d4af37]">{item.dress.nameAr}</h3>
                      <div className="text-sm text-white/60 mt-2 space-y-1">
                        <p>المقاس: <span className="text-white">{item.size}</span></p>
                        <p>اللون: <span className="text-white">{item.color}</span></p>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-white/40 hover:text-red-500 p-2 transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-[#d4af37]/30 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-10 h-10 hover:bg-[#d4af37]/20">-</button>
                      <span className="w-10 text-center font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-10 h-10 hover:bg-[#d4af37]/20">+</button>
                    </div>
                    <span className="text-xl font-bold text-[#d4af37]">{formatSAR(item.dress.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 sticky top-28 shadow-xl">
              <h2 className="text-2xl font-bold mb-6 border-b border-[#d4af37]/20 pb-4">ملخص الطلب</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-white/60"><span>المجموع الفرعي</span><span>{formatSAR(subtotal)}</span></div>
                <div className="flex justify-between text-white/60"><span>التوصيل</span><span className="text-[#d4af37]">مجاناً</span></div>
                <div className="border-t border-[#d4af37]/20 pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold">الإجمالي</span>
                    <span className="text-2xl font-bold text-[#d4af37]">{formatSAR(subtotal)}</span>
                  </div>
                </div>
              </div>

              <Button size="lg" className="w-full h-14 rounded-xl font-bold bg-[#d4af37] text-black hover:bg-[#b8860b] transition-all" onClick={() => setLocation("/checkout")}>
                المتابعة للدفع الآمن 🔒
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
