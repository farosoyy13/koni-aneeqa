import { useListReviews, useCreateReview } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const reviewSchema = z.object({
  customerName: z.string().min(2, "الاسم مطلوب"),
  comment: z.string().min(10, "التعليق يجب أن يكون 10 أحرف على الأقل"),
});

type ReviewValues = z.infer<typeof reviewSchema>;

export function Reviews() {
  const { data: reviews, isLoading, refetch } = useListReviews();
  const createReview = useCreateReview();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);

  const form = useForm<ReviewValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { customerName: "", comment: "" },
  });

  const onSubmit = (data: ReviewValues) => {
    createReview.mutate({ data: { ...data, rating } }, {
      onSuccess: () => {
        toast({ title: "شكراً لكِ", description: "تمت إضافة تقييمك بلمسة ذهبية." });
        form.reset();
        setRating(5);
        refetch();
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-[#d4af37] mb-4">آراء عميلاتنا</h1>
          <Sparkles className="mx-auto text-[#d4af37] mb-2" />
          <div className="w-24 h-1 bg-[#d4af37] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-1">
            <div className="bg-[#111] border border-[#d4af37]/30 rounded-3xl p-8 sticky top-28 shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-[#d4af37]">أضيفي تقييمك</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <FormLabel>التقييم</FormLabel>
                    <div className="flex gap-2" dir="ltr">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button type="button" key={star} onClick={() => setRating(star)} className="hover:scale-110 transition-transform">
                          <Star size={28} className={`${star <= rating ? "fill-[#d4af37] text-[#d4af37]" : "text-white/20"}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <FormField control={form.control} name="customerName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl><Input placeholder="الاسم الكريم" {...field} className="bg-[#050505] border-[#333]" /></FormControl>
                    </FormItem>
                  )}/>
                  <FormField control={form.control} name="comment" render={({ field }) => (
                    <FormItem>
                      <FormLabel>تجربتك</FormLabel>
                      <FormControl><Textarea placeholder="اكتبي تجربتك الفاخرة..." className="bg-[#050505] border-[#333] h-32" {...field} /></FormControl>
                    </FormItem>
                  )}/>
                  <Button type="submit" className="w-full bg-[#d4af37] text-black font-bold hover:bg-[#b8962f] rounded-xl" disabled={createReview.isPending}>
                    {createReview.isPending ? "جاري الإرسال..." : "نشر التقييم"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {isLoading ? <Skeleton className="h-40 w-full rounded-2xl bg-[#111]" /> : reviews?.map((review) => (
              <div key={review.id} className="bg-[#111] border border-[#333] p-8 rounded-3xl hover:border-[#d4af37] transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                <div className="flex justify-between items-start mb-4 border-b border-[#333] pb-4">
                  <h3 className="font-bold text-lg text-[#d4af37]">{review.customerName}</h3>
                  <div className="flex gap-1">{Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} className={i < review.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-white/10"} />)}</div>
                </div>
                <p className="text-gray-300 leading-relaxed italic">"{review.comment}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
