import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const [location] = useLocation();

  // تم تغيير النصوص لتكون بصيغة التوجيه
  const navLinks = [
    { href: "/", label: "تصفح الرئيسية" },
    { href: "/dresses", label: "شاهد التشكيلة" },
    { href: "/reviews", label: "اقرأ آراء العميلات" },
    { href: "/contact", label: "اتصل بنا" },
    { href: "/admin-room", label: "أدر متجرك" }, // إضافة غرفة المالك
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-[#d4af37]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            className="md:hidden p-2 text-foreground hover:text-[#d4af37] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-lg font-medium transition-colors hover:text-[#d4af37] cursor-pointer ${
                    location === link.href ? "text-[#d4af37]" : "text-foreground"
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            ))}
          </div>

          <Link href="/">
            <div className="flex flex-col items-center justify-center cursor-pointer">
              <h1 className="text-3xl font-bold font-serif text-[#d4af37] tracking-wider">كوني أنيقة</h1>
              <span className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-serif">Be Elegant</span>
            </div>
          </Link>

          <div className="flex items-center gap-4 md:gap-6">
            <Link href="/cart">
              <div className="relative p-2 text-foreground hover:text-[#d4af37] transition-colors cursor-pointer group">
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform duration-300" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-black bg-[#d4af37] rounded-full">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#d4af37] animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`block text-lg font-medium px-2 py-1 ${
                      location === link.href ? "text-[#d4af37]" : "text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
