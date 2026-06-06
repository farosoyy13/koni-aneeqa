import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Instagram, Sparkles } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const contactSchema = z.object({
  name: z.string().min(2, "الاسم مطلوب"),
  email: z.string().email("البريد الإلكتروني غير صحيح").optional().or(z.literal("")),
  phone: z.string().min(9, "رقم الجوال غير صحيح").optional().or(z.literal("")),
  message: z.string().min(10, "الرسالة يجب أن تكون 10 أحرف على الأقل"),
});

type ContactValues = z.infer<typeof contactSchema>;

export function Contact() {
  const submitContact = useSubmitContact();
  const { toast } = useToast();

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = (data: ContactValues) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        toast({ title: "تم الإرسال ببريق!", description: "وصلت رسالتك لعرشنا الملكي، سنرد عليك قريباً." });
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-12 pb-24 selection:bg-[#d4af37]">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16 space-y-4">
          <Sparkles className="mx-auto text-[#d4af37]" size={40} />
          <h1 className="text-5xl font-bold font-serif text-[#d4af37]">تواصل مع الفخامة</h1>
          <p className="text-gray-400 italic">نحن هنا لخدمة ذوقك الرفيع</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* معلومات التواصل (ذهبي ملكي) */}
          <div className="bg-[#111] border border-[#d4af37]/30 rounded-3xl p-8 md:p-12 shadow-[0_0_30px_rgba(212,175,55,0.05)]">
            <h2 className="text-2xl font-bold font-serif text-[#d4af37] mb-8">معلومات التواصل</h2>
            <div className="space-y-8">
              {[ { icon: MapPin, title: "المعرض", text: "الرياض، شارع التحلية" },
                 { icon: Phone, title: "الهاتف", text: "+966 50 123 4567" },
                 { icon: Mail, title: "البريد", text: "hello@konianeeqa.com" } ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-[#050505] flex items-center justify-center border border-[#d4af37]/50 text-[#d4af37] group-hover:scale-110 transition-transform">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#d4af37]">{item.title}</h3>
                    <p className="text-gray-400">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* نموذج المراسلة (إبداع لا مثيل له) */}
          <div className="bg-[#111] border border-[#333] rounded-3xl p-8 md:p-12 shadow-2xl hover:border-[#d4af37] transition-colors duration-500">
            <h2 className="text-2xl font-bold mb-8 text-[#d4af37]">رسالتك الملكية</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormControl><Input placeholder="الاسم الكريم" {...field} className="bg-[#050505] border-[#333] h-12 focus:border-[#d4af37] transition-all" /></FormControl>
                  </FormItem>
                )}/>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="05XXXXXXXX" {...field} className="bg-[#050505] border-[#333] h-12 focus:border-[#d4af37]" /></FormControl></FormItem>
                  )}/>
                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormControl><Input placeholder="البريد الإلكتروني" {...field} className="bg-[#050505] border-[#333] h-12 focus:border-[#d4af37]" /></FormControl></FormItem>
                  )}/>
                </div>
                <FormField control={form.control} name="message" render={({ field }) => (
                  <FormItem><FormControl><Textarea placeholder="اكتبي استفسارك.." className="bg-[#050505] border-[#333] h-32 focus:border-[#d4af37] resize-none" {...field} /></FormControl></FormItem>
                )}/>
                <Button type="submit" className="w-full h-14 bg-[#d4af37] text-black font-bold text-lg hover:bg-[#b8962f] rounded-xl transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                  {submitContact.isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
