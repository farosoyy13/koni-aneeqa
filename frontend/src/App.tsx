import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useEffect } from "react";
import NotFound from "@/pages/not-found";
import { CartProvider } from "@/contexts/CartContext";

// Components
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Pages
import { Home } from "@/pages/Home";
import { Catalog } from "@/pages/Catalog";
import { DressDetails } from "@/pages/DressDetails";
import { Cart } from "@/pages/Cart";
import { Checkout } from "@/pages/Checkout";
import { Reviews } from "@/pages/Reviews";
import { Contact } from "@/pages/Contact";
import { OwnerRoom } from "@/components/OwnerRoom";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dresses" component={Catalog} />
      <Route path="/dresses/:id" component={DressDetails} />
      <Route path="/cart" component={Cart} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/contact" component={Contact} />
      <Route path="/owner-room" component={OwnerRoom} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // الابتكار الأول: التأثير الذهبي التفاعلي (يعمل باللمس والماوس)
  useEffect(() => {
    const createPulse = (e: any) => {
      const pulse = document.createElement('div');
      pulse.className = 'fixed bg-[#d4af37] w-16 h-16 rounded-full opacity-20 blur-2xl pointer-events-none animate-ping z-50';
      pulse.style.left = `${(e.clientX || e.touches[0].clientX) - 32}px`;
      pulse.style.top = `${(e.clientY || e.touches[0].clientY) - 32}px`;
      document.body.appendChild(pulse);
      setTimeout(() => pulse.remove(), 800);
    };

    window.addEventListener('pointerdown', createPulse);
    return () => window.removeEventListener('pointerdown', createPulse);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="flex flex-col min-h-[100dvh] font-sans bg-[#050505] text-white">
              <Navbar />
              <main className="flex-1 animate-in fade-in duration-1000">
                <Router />
              </main>
              <Footer />
            </div>
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
