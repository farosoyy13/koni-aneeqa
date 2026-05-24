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
import { CheckCircle2, Lock } from "lucide-react";

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
    defaultValues: {
      customerName: "",
      phone: "",
      address: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });

  if (items.length === 0 && !successOrder) {
    setLocation("/cart");
    return null;
  }

  if (successOrder) {
    return (
      <div className="min-h-screen bg-background py-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-card border border-border rounded-3xl p-12 shadow-sm animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 size={48} />
            </div>
            <h1 className="text-4xl font-bold font-serif text-foreground mb-4">تم تأكيد طلبك بنجاح!</h1>
            <p className="text-xl text-muted-foreground mb-8">
              شكراً لتسوقك من كوني أنيقة. رقم طلبك هو: <span className="font-bold text-foreground">#{successOrder.id}</span>
            </p>
            <p className="text-muted-foreground mb-10">
              سنقوم بتجهيز طلبك وتوصيله في أقرب وقت ممكن. ستصلك رسالة نصية قريباً بتفاصيل التتبع.
            </p>
            <Link href="/">
              <Button size="lg" className="rounded-full px-10 font-bold text-lg">العودة للرئيسية</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const onSubmit = (data: CheckoutValues) => {
    createOrder.mutate({
      data: {
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        paymentMethod: paymentMethod,
        totalAmount: subtotal,
        items: items.map(i => ({
          dressId: i.dress.id,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          price: i.dress.price
        }))
      }
    }, {
      onSuccess: (order) => {
        clearCart();
        setSuccessOrder({ id: order.id, number: order.id.toString() });
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <h1 className="text-3xl font-bold font-serif text-foreground mb-10">إتمام الطلب</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Form */}
          <div className="order-2 lg:order-1 space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                
                {/* Contact Info */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-6">معلومات التوصيل</h2>
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="customerName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>الاسم الكامل</FormLabel>
                          <FormControl>
                            <Input placeholder="الاسم" {...field} className="bg-background h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم الجوال</FormLabel>
                          <FormControl>
                            <Input placeholder="05XXXXXXXX" dir="ltr" {...field} className="bg-background h-12 text-right" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>العنوان التفصيلي</FormLabel>
                          <FormControl>
                            <Input placeholder="المدينة، الحي، الشارع، رقم المبنى" {...field} className="bg-background h-12" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Payment */}
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">طريقة الدفع</h2>
                    <div className="flex items-center text-xs text-muted-foreground gap-1 bg-muted px-2 py-1 rounded">
                      <Lock size={12} /> دفع آمن
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div 
                      className={`border-2 rounded-xl p-4 cursor-pointer text-center transition-all ${paymentMethod === OrderInputPaymentMethod.mada ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod(OrderInputPaymentMethod.mada)}
                    >
                      <div className="font-bold text-lg mb-1">مدى</div>
                      <div className="text-xs opacity-80">MADA</div>
                    </div>
                    <div 
                      className={`border-2 rounded-xl p-4 cursor-pointer text-center transition-all ${paymentMethod === OrderInputPaymentMethod.visa ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:border-primary/50'}`}
                      onClick={() => setPaymentMethod(OrderInputPaymentMethod.visa)}
                    >
                      <div className="font-bold text-lg mb-1">فيزا / ماستركارد</div>
                      <div className="text-xs opacity-80">Visa / MasterCard</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>رقم البطاقة</FormLabel>
                          <FormControl>
                            <Input placeholder="XXXX XXXX XXXX XXXX" dir="ltr" {...field} className="bg-background h-12 text-right tracking-widest" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>تاريخ الانتهاء</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" dir="ltr" {...field} className="bg-background h-12 text-right" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="cvv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الرمز السري (CVV)</FormLabel>
                            <FormControl>
                              <Input placeholder="123" dir="ltr" type="password" maxLength={4} {...field} className="bg-background h-12 text-right tracking-widest" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full h-16 rounded-xl text-xl font-bold shadow-lg hover:shadow-primary/20 transition-all"
                  disabled={createOrder.isPending}
                >
                  {createOrder.isPending ? "جاري التأكيد..." : `تأكيد الطلب ودفع ${formatSAR(subtotal)}`}
                </Button>
              </form>
            </Form>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 sticky top-28 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 border-b border-border pb-4">ملخص الطلب</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="w-16 h-20 shrink-0 rounded-lg overflow-hidden bg-muted relative">
                      <img src={item.dress.imageUrl} alt={item.dress.nameAr} className="w-full h-full object-cover" />
                      <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-lg font-bold">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{item.dress.nameAr}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{item.size} / {item.color}</p>
                    </div>
                    <div className="font-bold text-sm">
                      {formatSAR(item.dress.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>المجموع الفرعي</span>
                  <span>{formatSAR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground text-sm">
                  <span>رسوم التوصيل</span>
                  <span>مجاناً</span>
                </div>
                <div className="border-t border-border pt-4 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">الإجمالي</span>
                    <span className="text-2xl font-bold text-primary">{formatSAR(subtotal)}</span>
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
