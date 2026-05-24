import { useSubmitContact } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Instagram } from "lucide-react";
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
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = (data: ContactValues) => {
    submitContact.mutate({
      data: {
        name: data.name,
        email: data.email || undefined,
        phone: data.phone || undefined,
        message: data.message,
      }
    }, {
      onSuccess: () => {
        toast({
          title: "تم الإرسال",
          description: "شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت.",
        });
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">تواصل معنا</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">نسعد بالإجابة على استفساراتكم ومساعدتكم في اختيار ما يناسبكم.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="bg-primary/5 border border-primary/20 rounded-3xl p-8 md:p-12 order-2 lg:order-1">
            <h2 className="text-2xl font-bold font-serif text-primary mb-8">معلومات التواصل</h2>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 border border-border shadow-sm text-primary">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">المعرض</h3>
                  <p className="text-muted-foreground leading-relaxed">شارع التحلية، الرياض<br/>المملكة العربية السعودية</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 border border-border shadow-sm text-primary">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">الهاتف</h3>
                  <p className="text-muted-foreground" dir="ltr">+966 50 123 4567</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center shrink-0 border border-border shadow-sm text-primary">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-1">البريد الإلكتروني</h3>
                  <p className="text-muted-foreground">hello@konianeeqa.com</p>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-primary/20">
              <h3 className="font-bold text-foreground text-lg mb-4">تابعونا على</h3>
              <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors shadow-md">
                  <Instagram size={24} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-colors shadow-md">
                  <SiWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-sm order-1 lg:order-2">
            <h2 className="text-2xl font-bold mb-8">أرسل رسالة</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input placeholder="الاسم الكريم" {...field} className="bg-background h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الجوال (اختياري)</FormLabel>
                        <FormControl>
                          <Input placeholder="05XXXXXXXX" dir="ltr" {...field} className="bg-background h-12 text-right" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني (اختياري)</FormLabel>
                        <FormControl>
                          <Input placeholder="email@example.com" dir="ltr" {...field} className="bg-background h-12 text-right" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الرسالة</FormLabel>
                      <FormControl>
                        <Textarea placeholder="اكتب استفسارك هنا..." className="resize-none h-32 bg-background" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  size="lg"
                  className="w-full h-14 text-lg font-bold shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all rounded-xl mt-4"
                  disabled={submitContact.isPending}
                >
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
