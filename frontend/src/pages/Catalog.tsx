import { useListDresses, Dress } from "@workspace/api-client-react";
import { DressCard } from "@/components/DressCard";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearch } from "wouter";
import { useEffect, useState } from "react";

export function Catalog() {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const initialCategory = searchParams.get("category") || "all";
  
  const [activeTab, setActiveTab] = useState(initialCategory);

  const { data: dresses, isLoading } = useListDresses(
    activeTab === "all" ? undefined : { category: activeTab as any }
  );

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Optional: update URL
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">كتالوج أناقة CHIC</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">تصفحي مجموعتنا الفاخرة من الفساتين المصممة بأعلى معايير الجودة والأناقة.</p>
        </div>

        <Tabs defaultValue={activeTab} onValueChange={handleTabChange} className="w-full flex flex-col items-center mb-12" dir="rtl">
          <TabsList className="bg-card border border-border p-1 rounded-full w-full max-w-md h-auto grid grid-cols-3">
            <TabsTrigger value="all" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">الكل</TabsTrigger>
            <TabsTrigger value="evening" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">فساتين سهرة</TabsTrigger>
            <TabsTrigger value="soft" className="rounded-full py-2.5 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all">فساتين ناعمة</TabsTrigger>
          </TabsList>
        </Tabs>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[400px] w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-6 w-1/4" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {dresses && dresses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {dresses.map((dress) => (
                  <DressCard key={dress.id} dress={dress} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-card rounded-2xl border border-border">
                <h3 className="text-2xl font-bold text-muted-foreground">لا توجد منتجات في هذا القسم حالياً</h3>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
