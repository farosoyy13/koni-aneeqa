import { useGetFeaturedDresses } from "@workspace/api-client-react";
import { DressCard } from "@/components/DressCard";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export function Home() {
  const { data: featuredDresses, isLoading } = useGetFeaturedDresses();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-bg.png" 
            alt="Luxury boutique interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-7xl font-bold font-serif text-white mb-6 tracking-wide drop-shadow-md">
            أناقتكِ، هويتكِ
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 font-medium leading-relaxed drop-shadow-md">
            اكتشفي التشكيلة الجديدة من الفساتين الراقية المصممة لتبرز جمالك في كل مناسبة.
          </p>
          <Link href="/dresses">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-10 py-6 rounded-full font-bold shadow-xl hover:scale-105 transition-transform duration-300">
              تسوقي الآن
            </Button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/dresses?category=evening">
              <div className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                <img src="/images/evening-1.png" alt="فساتين سهرة" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">فساتين سهرة</h2>
                    <p className="text-white/80">تألقي في مناسباتك الفاخرة</p>
                  </div>
                </div>
              </div>
            </Link>
            <Link href="/dresses?category=soft">
              <div className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                <img src="/images/soft-1.png" alt="فساتين ناعمة" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">فساتين ناعمة</h2>
                    <p className="text-white/80">لمسة من الرقة والجمال ليومك</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold font-serif text-foreground mb-4">وصل حديثاً</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-[400px] w-full rounded-xl" />
                  <Skeleton className="h-6 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-6 w-1/3" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDresses?.map((dress) => (
                <DressCard key={dress.id} dress={dress} />
              ))}
            </div>
          )}

          <div className="text-center mt-16">
            <Link href="/dresses">
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-10 font-bold">
                عرض كل التشكيلة
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
