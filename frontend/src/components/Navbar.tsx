import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, Crown, Megaphone } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const [location] = useLocation();

  const navLinks = [
    { href: "/", label: "الرئيسية" },
    { href: "/dresses", label: "التشكيلة" },
    { href: "/owner-room", label: "غرفة المالك" },
    { href: "/reviews", label: "آراء العميلات" },
    { href: "/contact", label: "تواصل معنا" },
  ];

  const preloadData = () => {
    console.log("جاري تجهيز بيانات الصفحة للسرعة القصوى...");
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#050505]/95 backdrop-blur-xl border-b border-[#d4af37]/30">
      
      {/* الشريط الترويجي المتحرك */}
      <div className="bg-[#d4af37] text-black py-2 overflow-hidden whitespace-nowrap text-sm font-bold">
        <div className="animate-marquee inline-block">
          👗 لديكِ فستان أو عباية أو شنطة غالية ولا تستخدمينها؟ اعرضيها الآن في منصة أناقة CHIC واضمني البيع السريع! | ✨ نظام التحقق الذهبي الآن متاح لمصداقية أعلى! | 🛍️ انضمي لمجتمعنا وحولي فخامتك إلى ربح!
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          
          <button
            className="md:hidden p-2 text-white hover:text-[#d4af37] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  onMouseEnter={link.href === "/dresses" ? preloadData : undefined}
                  className={`text-lg font-medium transition-all duration-300 hover:text-[#d4af37] cursor-pointer ${
                    location === link.href ? "text-[#d4af37]" : "text-white"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <Link href="/">
            <div className="flex flex-col items-center justify-center cursor-pointer group">
              <h1 className="text-xl md:text-2xl font-bold font-serif text-[#d4af37] tracking-wider group-hover:scale-105 transition-transform duration-500">
                أناقة CHIC
              </h1>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* زر أعلن/ي معنا */}
            <Link href="/add-listing">
              <button className="hidden md:flex items-center gap-2 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-black font-bold py-2 px-4 rounded-full shadow-lg transition-transform hover:scale-105 animate-pulse text-sm">
                <Megaphone size={16} /> أعلن/ي معنا
              </button>
            </Link>

            <Link href="/cart">
              <div className="relative p-2 text-white hover:text-[#d4af37] transition-all cursor-pointer">
                <ShoppingBag size={24} />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-black bg-[#d4af37] rounded-full animate-bounce">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-[#d4af37]/30 bg-[#0b0b0b]">
            <div className="flex flex-col gap-6 px-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block text-lg font-medium ${
                      location === link.href ? "text-[#d4af37]" : "text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
              <Link href="/add-listing">
                <button className="w-full bg-[#d4af37] text-black font-bold py-3 rounded-lg animate-pulse">
                  أعلن/ي معنا 📢
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
