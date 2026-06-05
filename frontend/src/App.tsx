import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <div className="flex flex-col min-h-[100dvh] font-sans">
              <Navbar />
              <main className="flex-1">
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
