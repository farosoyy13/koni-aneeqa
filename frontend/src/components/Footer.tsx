import { Mail } from "lucide-react";
import { Link } from "wouter";
import { SiWhatsapp, SiSnapchat } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-[#0b0b0b] text-white py-12 border-t border-[#d4af37]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <h2 className="text-2xl font-bold text-[#d4af37]">أناقة CHIC</h2>
          <p className="text-sm mt-2 text-white/60">© 2026 جميع الحقوق محفوظة.</p>
        </div>
        <div>
          <h3 className="text-[#d4af37] font-bold mb-4">اتصل بنا وادفع</h3>
          <div className="flex flex-col gap-2">
            <Link href="/contact"><span className="cursor-pointer hover:text-[#d4af37]">تواصل معنا</span></Link>
            <Link href="/bank-accounts"><span className="cursor-pointer hover:text-[#d4af37]">حساباتنا البنكية</span></Link>
          </div>
        </div>
        <div className="flex justify-center gap-6">
          <a href="https://wa.me/966536667222" target="_blank" rel="noreferrer"><SiWhatsapp size={28} className="hover:text-[#d4af37]" /></a>
          <a href="https://snapchat.com/t/gNPod9Mo" target="_blank" rel="noreferrer"><SiSnapchat size={28} className="hover:text-[#d4af37]" /></a>
          <a href="mailto:kal6667222@gmail.com"><Mail size={28} className="hover:text-[#d4af37]" /></a>
        </div>
      </div>
    </footer>
  );
}
