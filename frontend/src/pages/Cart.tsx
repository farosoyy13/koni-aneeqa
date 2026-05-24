import { useCart } from "@/contexts/CartContext";
import { formatSAR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { Trash2, ShoppingBag } from "lucide-react";

export function Cart() {
  const { items, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();
  const [, setLocation] = useLocation();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 bg-background">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-4">سلة المشتريات فارغة</h2>
        <p className="text-muted-foreground mb-8 text-center max-w-md">لم تقومي بإضافة أي منتجات إلى سلة المشتريات بعد. تصفحي مجموعتنا لاكتشاف أجمل الفساتين.</p>
        <Link href="/dresses">
          <Button size="lg" className="rounded-full px-8 font-bold text-lg">تصفح التشكيلة</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-10">سلة المشتريات ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={item.id} className="bg-card rounded-2xl border border-border p-4 sm:p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm hover:shadow-md transition-shadow">
                <div className="w-32 h-40 shrink-0 rounded-xl overflow-hidden bg-muted">
                  <img src={item.dress.imageUrl} alt={item.dress.nameAr} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 w-full flex flex-col h-full justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link href={`/dresses/${item.dress.id}`}>
                        <h3 className="text-xl font-bold text-foreground hover:text-primary transition-colors cursor-pointer">{item.dress.nameAr}</h3>
                      </Link>
                      <div className="text-sm text-muted-foreground mt-2 space-y-1">
                        <p>المقاس: <span className="font-semibold text-foreground">{item.size}</span></p>
                        <p>اللون: <span className="font-semibold text-foreground">{item.color}</span></p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive p-2 transition-colors"
                      title="حذف"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center border border-border rounded-lg bg-background">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-semibold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-xl font-bold text-primary">{formatSAR(item.dress.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 sticky top-28 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-muted-foreground">
                  <span>المجموع الفرعي</span>
                  <span>{formatSAR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>رسوم التوصيل</span>
                  <span>مجاناً</span>
                </div>
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex justify-between items-end">
                    <span className="text-lg font-bold text-foreground">الإجمالي</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary block">{formatSAR(subtotal)}</span>
                      <span className="text-xs text-muted-foreground">شامل ضريبة القيمة المضافة</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full h-14 rounded-xl text-lg font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all"
                onClick={() => setLocation("/checkout")}
              >
                المتابعة للدفع
              </Button>
              
              <div className="mt-6 flex items-center justify-center gap-4 opacity-60">
                {/* Icons mock */}
                <div className="h-8 w-12 bg-muted rounded border border-border flex items-center justify-center text-[10px] font-bold">VISA</div>
                <div className="h-8 w-12 bg-muted rounded border border-border flex items-center justify-center text-[10px] font-bold">MADA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
