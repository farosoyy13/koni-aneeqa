import { Instagram, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "wouter";
import { SiWhatsapp, SiX } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-foreground text-background mt-20 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6 text-center md:text-right">
            <div className="flex flex-col items-center md:items-start justify-center">
              <h2 className="text-3xl font-bold font-serif text-primary tracking-wider">كوني أنيقة</h2>
              <span className="text-xs text-background/60 uppercase tracking-[0.2em] font-serif">Be Elegant</span>
            </div>
            <p className="text-background/80 leading-relaxed max-w-sm mx-auto md:mx-0">
              متجرك الأول للفساتين الراقية. نقدم لكِ تشكيلة مختارة بعناية لتتألقي في كل مناسباتك. تصميم عصري يحاكي أنوثتك وجمالك.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-6 text-primary">روابط سريعة</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/dresses">
                  <span className="text-background/80 hover:text-primary transition-colors cursor-pointer">المجموعة الكاملة</span>
                </Link>
              </li>
              <li>
                <Link href="/dresses?category=evening">
                  <span className="text-background/80 hover:text-primary transition-colors cursor-pointer">فساتين سهرة</span>
                </Link>
              </li>
              <li>
                <Link href="/dresses?category=soft">
                  <span className="text-background/80 hover:text-primary transition-colors cursor-pointer">فساتين ناعمة</span>
                </Link>
              </li>
              <li>
                <Link href="/reviews">
                  <span className="text-background/80 hover:text-primary transition-colors cursor-pointer">آراء العميلات</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-bold mb-6 text-primary">تواصل معنا</h3>
            <ul className="space-y-4 mb-8">
              <li className="flex items-center justify-center md:justify-start gap-3 text-background/80">
                <MapPin size={20} className="text-primary" />
                <span>الرياض، المملكة العربية السعودية</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-background/80">
                <Phone size={20} className="text-primary" />
                <span dir="ltr">+966 50 123 4567</span>
              </li>
              <li className="flex items-center justify-center md:justify-start gap-3 text-background/80">
                <Mail size={20} className="text-primary" />
                <span>hello@konianeeqa.com</span>
              </li>
            </ul>
            <div className="flex items-center justify-center md:justify-start gap-6">
              <a href="#" className="text-background hover:text-primary transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-background hover:text-primary transition-colors">
                <SiWhatsapp size={24} />
              </a>
              <a href="#" className="text-background hover:text-primary transition-colors">
                <SiX size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-sm text-background/60">
          <p>© {new Date().getFullYear()} كوني أنيقة. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
