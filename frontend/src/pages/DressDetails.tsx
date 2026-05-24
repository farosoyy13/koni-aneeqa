import { useState } from "react";
import { useParams } from "wouter";
import { useGetDress } from "@workspace/api-client-react";
import { useCart } from "@/contexts/CartContext";
import { formatSAR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

export function DressDetails() {
  const { id } = useParams<{ id: string }>();
  const dressId = parseInt(id || "0", 10);
  
  const { data: dress, isLoading, isError } = useGetDress(dressId, {
    query: { enabled: !!dressId }
  });

  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Skeleton className="h-[600px] w-full rounded-2xl" />
          <div className="space-y-6 pt-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <div className="space-y-4 pt-6">
              <Skeleton className="h-6 w-20" />
              <div className="flex gap-2"><Skeleton className="h-12 w-12 rounded-lg" /><Skeleton className="h-12 w-12 rounded-lg" /></div>
            </div>
            <Skeleton className="h-14 w-full mt-8" />
          </div>
        </div>
      </div>
    );
  }

  if (isError || !dress) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h2 className="text-3xl font-bold mb-6">المنتج غير موجود</h2>
        <Link href="/dresses">
          <Button variant="outline">العودة للتشكيلة</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "يرجى اختيار المقاس",
        variant: "destructive"
      });
      return;
    }
    if (!selectedColor && dress.colors.length > 0) {
      toast({
        title: "يرجى اختيار اللون",
        variant: "destructive"
      });
      return;
    }

    addToCart(dress, selectedSize, selectedColor || dress.colors[0] || "Default", quantity);
    toast({
      title: "تمت الإضافة للسلة",
      description: `تم إضافة ${dress.nameAr} إلى سلة مشترياتك.`,
    });
  };

  return (
    <div className="bg-background min-h-screen pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-8">
          <Link href="/dresses">
            <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowRight size={16} />
              العودة للتشكيلة
            </Button>
          </Link>
        </div>

        <div className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image */}
            <div className="relative h-[500px] lg:h-auto overflow-hidden bg-muted">
              <img 
                src={dress.imageUrl} 
                alt={dress.nameAr} 
                className="w-full h-full object-cover object-top"
              />
              {dress.isNew && (
                <div className="absolute top-6 right-6">
                  <Badge className="bg-primary text-primary-foreground font-semibold px-4 py-1.5 text-sm shadow-lg">
                    جديد
                  </Badge>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                  {dress.category === 'evening' ? 'فساتين سهرة' : 'فساتين ناعمة'}
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold font-serif text-foreground mb-4">
                {dress.nameAr}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">{formatSAR(dress.price)}</span>
                
                {dress.rating && (
                  <div className="flex items-center gap-1 bg-secondary/30 px-3 py-1 rounded-full">
                    <Star size={16} className="fill-primary text-primary" />
                    <span className="font-medium">{dress.rating}</span>
                    <span className="text-sm text-muted-foreground">({dress.reviewCount})</span>
                  </div>
                )}
              </div>

              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                {dress.description}
              </p>

              <div className="space-y-8 mb-10">
                {/* Sizes */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-bold text-foreground">المقاس</h3>
                    <button className="text-sm text-primary underline underline-offset-4">دليل المقاسات</button>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {dress.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`min-w-[3rem] h-12 px-4 rounded-xl border font-semibold transition-all ${
                          selectedSize === size 
                            ? 'bg-foreground text-background border-foreground shadow-md' 
                            : 'bg-background text-foreground border-border hover:border-primary/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                {dress.colors.length > 0 && (
                  <div>
                    <h3 className="font-bold text-foreground mb-3">اللون</h3>
                    <div className="flex flex-wrap gap-3">
                      {dress.colors.map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`h-12 px-6 rounded-xl border font-semibold transition-all ${
                            selectedColor === color 
                              ? 'bg-foreground text-background border-foreground shadow-md' 
                              : 'bg-background text-foreground border-border hover:border-primary/50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Add to Cart */}
              <div className="flex gap-4">
                <div className="flex items-center border border-border rounded-xl bg-background overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-14 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-14 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                  >
                    +
                  </button>
                </div>
                <Button 
                  size="lg" 
                  className="flex-1 h-14 rounded-xl text-lg font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="mr-2 ml-2" size={20} />
                  أضف إلى السلة
                </Button>
              </div>

              {/* Perks */}
              <div className="mt-12 grid grid-cols-2 gap-4 border-t border-border pt-8">
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className="text-primary"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">توصيل سريع</span>
                    شحن لجميع مدن المملكة
                  </div>
                </div>
                <div className="flex gap-3 text-sm text-muted-foreground">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinelinejoin="round" className="text-primary"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">دفع آمن</span>
                    خيارات دفع متعددة وآمنة
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
