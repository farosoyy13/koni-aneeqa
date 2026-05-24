import { useListReviews, useCreateReview } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Star } from "lucide-react";
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
    defaultValues: {
      customerName: "",
      comment: "",
    },
  });

  const onSubmit = (data: ReviewValues) => {
    createReview.mutate({
      data: {
        customerName: data.customerName,
        comment: data.comment,
        rating: rating,
      }
    }, {
      onSuccess: () => {
        toast({
          title: "شكراً لكِ",
          description: "تمت إضافة تقييمك بنجاح.",
        });
        form.reset();
        setRating(5);
        refetch();
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">آراء عميلاتنا</h1>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Add Review Form */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 sticky top-28 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">أضيفي تقييمك</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="space-y-2">
                    <FormLabel>التقييم</FormLabel>
                    <div className="flex gap-2" dir="ltr">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setRating(star)}
                          className="focus:outline-none transition-transform hover:scale-110"
                        >
                          <Star
                            size={28}
                            className={`${star <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم</FormLabel>
                        <FormControl>
                          <Input placeholder="الاسم الكريم" {...field} className="bg-background" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رأيك يهمنا</FormLabel>
                        <FormControl>
                          <Textarea placeholder="اكتبي تجربتك مع منتجاتنا..." className="resize-none h-32 bg-background" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full h-12 text-lg font-bold shadow-md hover:shadow-primary/20 transition-all rounded-xl"
                    disabled={createReview.isPending}
                  >
                    {createReview.isPending ? "جاري الإرسال..." : "إرسال التقييم"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2 space-y-6">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-card border border-border p-6 rounded-2xl">
                  <div className="flex justify-between mb-4">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              ))
            ) : reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="bg-card border border-border p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4 border-b border-border pb-4">
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{review.customerName}</h3>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {format(new Date(review.createdAt), "dd MMM yyyy")}
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">"{review.comment}"</p>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-card border border-border rounded-2xl">
                <p className="text-muted-foreground">لا توجد تقييمات حتى الآن. كوني أول من يشاركنا رأيه!</p>
              </div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}
