import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { formatSAR } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { useCreateOrder, OrderInputPaymentMethod } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Lock, ShieldCheck, Truck } from "lucide-react";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "الاسم مطلوب"),
  phone: z.string().min(9, "رقم الجوال غير صحيح"),
  address: z.string().min(5, "العنوان التفصيلي مطلوب"),
  cardNumber: z.string().min(16, "رقم البطاقة غير صحيح").max(16),
  expiry: z.string().min(5, "تاريخ الانتهاء غير صحيح"),
  cvv: z.string().min(3, "الرمز السري غير صحيح"),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const createOrder = useCreateOrder();
  
  const [paymentMethod, setPaymentMethod] = useState<OrderInputPaymentMethod>(OrderInputPaymentMethod.mada);
  const [successOrder, setSuccessOrder] = useState<{id: number, number: string} | null>(null);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { customerName: "", phone: "", address: "", cardNumber: "", expiry: "", cvv: "" },
  });

  if (items.length === 0 && !successOrder) {
    setLocation("/cart");
    return null;
  }

  if (successOrder) {
    return (
      <div className="min-h-screen bg-[#050505] py-20 text-white">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-[#0b0b0b] border border-[#d4af37]/30 rounded-3xl p-12 shadow-2xl">
            <div className="w-24 h-24 bg-[#d4af37]/10 text-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-4xl font-bold font-serif mb-4">تم تأكيد طلبكِ بأناقة!</h1>
            <p className="text-xl text-white/60 mb-8">
              شكراً لاختياركِ <span className="text-[#d4af37] font-bold">أناقة CHIC</span>. رقم طلبكِ هو: <span className="font-bold text-[#d4af37]">#{successOrder.id}</span>
            </p>
            <div className="flex justify-center gap-4 text-sm text-white/40 mb-10">
              <span className="flex items-center gap-2"><Truck size={16}/> توصيل سريع ومؤمن</span>
            </div>
            <Link href="/">
              <Button size="lg" className="rounded-full px-10 font-bold bg-[#d4af37] text-black hover:bg-[#b8860b]">العودة للرئيسية</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] pt-12 pb-24 text-white">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-3xl font-bold font-serif mb-10 border-b border-[#d4af37]/20 pb-4">إتمام الطلب الفاخر</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <div className="order-2 lg:order-1 space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Contact Info */}
                <div className="bg-[#0b0b0b] border border-[#d4af37]/20 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-xl font-bold mb-6 text-[#d4af37]">معلومات التوصيل</h2>
                  <div className="space-y-4">
                    <FormField control={form.control} name="customerName" render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl><Input placeholder="الاسم الكريم" {...field} className="bg-[#1a1a1a] border-[#d4af37]/20" /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    {/* ... باقي الحقول بنفس التنسيق ... */}
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-[#0b0b0b] border border-[#d4af37]/20 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-[#d4af37]">طريقة الدفع</h2>
                    <div className="flex items-center text-xs text-white/50 gap-1 bg-[#1a1a1a] px-2 py-1 rounded">
                      <ShieldCheck size={12} /> دفع مشفر وآمن
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className={`border-2 rounded-xl p-4 cursor-pointer text-center transition-all ${paymentMethod === OrderInputPaymentMethod.mada ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#d4af37]/20'}`} onClick={() => setPaymentMethod(OrderInputPaymentMethod.mada)}>
                      <div className="font-bold">مدى MADA</div>
                    </div>
                    <div className={`border-2 rounded-xl p-4 cursor-pointer text-center transition-all ${paymentMethod === OrderInputPaymentMethod.visa ? 'border-[#d4af37] bg-[#d4af37]/10' : 'border-[#d4af37]/20'}`} onClick={() => setPaymentMethod(OrderInputPaymentMethod.visa)}>
                      <div className="font-bold">فيزا / ماستركارد</div>
                    </div>
                  </div>
                  {/* ... باقي حقول البطاقة ... */}
                </div>

                <Button type="submit" size="lg" className="w-full h-16 rounded-xl text-xl font-bold bg-[#d4af37] text-black hover:bg-[#b8860b]" disabled={createOrder.isPending}>
                  {createOrder.isPending ? "جاري التأكيد..." : `تأكيد الطلب ودفع ${formatSAR(subtotal)}`}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary - التصميم الفخم */}
          <div className="order-1 lg:order-2">
            <div className="bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/30 p-8 sticky top-28 shadow-xl">
               {/* ... عرض المنتجات مع إطار ذهبي ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
