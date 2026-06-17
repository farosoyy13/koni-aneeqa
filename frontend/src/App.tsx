import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ShoppingBag, Heart, Shield, Award, Clock, 
  Menu, X, ChevronRight, MessageCircle, Star, Send, 
  User, CheckCircle, Bell, Eye, Share2, Filter, 
  TrendingUp, Compass, HeartHandshake, HelpCircle, 
  Laptop, Phone, Mail, MapPin, DollarSign, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types & Interfaces ---
interface Product {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  category: 'dresses' | 'abayas' | 'bags' | 'accessories';
  image: string;
  badge?: string;
  rating: number;
  reviewsCount: number;
  isVIP?: boolean;
}

export default function App() {
  // --- States ---
  const [activeTab, setActiveTab] = useState<'all' | 'dresses' | 'abayas' | 'bags' | 'accessories'>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [liveViews, setLiveViews] = useState(142);
  const [broadcastMessage, setBroadcastMessage] = useState('✨ أهلاً بكم في منصة أناقة CHIC الملكية VIP ✨');

  // --- Sample Products Data ---
  const products: Product[] = [
    {
      id: '1',
      title: 'فستان سهرة ملكي مطرز بالخيوط الذهبية فاخر',
      price: 2450,
      originalPrice: 3800,
      category: 'dresses',
      image: 'https://unsplash.com',
      badge: 'الأكثر مبيعاً',
      rating: 4.9,
      reviewsCount: 124,
      isVIP: true
    },
    {
      id: '2',
      title: 'عباية مخمل سوداء فاخرة مع تطريز يدوي ملكي',
      price: 1200,
      category: 'abayas',
      image: 'https://unsplash.com',
      badge: 'VIP جديد',
      rating: 4.8,
      reviewsCount: 86,
      isVIP: true
    },
    {
      id: '3',
      title: 'طقم إكسسوارات ألماس مطلي بماء الذهب عيار 21',
      price: 850,
      originalPrice: 1200,
      category: 'accessories',
      image: 'https://unsplash.com',
      rating: 4.7,
      reviewsCount: 42
    },
    {
      id: '4',
      title: 'حقيبة يد من الجلد الطبيعي الفاخر بتصميم كلاسيكي',
      price: 1650,
      category: 'bags',
      image: 'https://unsplash.com',
      badge: 'قطعة فريدة',
      rating: 5.0,
      reviewsCount: 19
    }
  ];

  // --- Live Views Simulator ---
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveViews(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // --- Handlers ---
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans antialiased selection:bg-[#d4af37] selection:text-black">
      
      {/* 👑 شريط الإعلان الملكي الأول الممتد والأنيق */}
      <div style={{ background: 'linear-gradient(90deg, #d4af37, #f3e5ab, #d4af37)', color: '#000', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '14px', borderBottom: '2px solid #000', boxShadow: '0 4px 20px rgba(212,175,55,0.4)' }}>
        <marquee direction="right" scrollamount="6">
          ✨ أهلاً بكم في منصة "أناقة CHIC" الفاخرة - أول منصة سعودية وعربية حية متكاملة لبيع وتأجير الفساتين والعبايات الملكية الفاخرة بنسبة 100% تجربة تسوق آمنة وضمان ذهبي صارم ✨
        </marquee>
      </div>

      {/* 📜 الشريط الجديد الثاني: عرض الفساتين المستعملة */}
      <div style={{ background: '#d4af37', color: '#000', padding: '8px 0', overflow: 'hidden', whiteSpace: 'nowrap', fontWeight: 'bold', fontSize: '13px', borderBottom: '1px solid #000' }}>
        <marquee direction="right" scrollamount="4">
          ✨ عندك فستان زواج ولبستية مرة واحدة وصعبة تلبسه بزواج آخر وراميتة بالدولاب او عباية او شنطة نظيفة وماتبينهم؟ أعرضيهم في موقع "أناقة CHIC" يضمن لك البيع بأسرع وقت وبأعلى عوائد استثمارية للأعضاء! ✨
        </marquee>
      </div>

      {/* 🧭 الهيدر الفاخر ونظام التنقل الرئيسي */}
      <header className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#d4af37]/20 px-4 py-4 max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative p-2.5 bg-gradient-to-br from-[#d4af37] to-[#aa8416] rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.3)]">
            <Sparkles className="w-6 h-6 text-black" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold tracking-wider bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa8416] bg-clip-text text-transparent">
              أناقة CHIC
            </h1>
            <p className="text-[9px] text-[#d4af37] font-semibold tracking-widest mt-0.5">THE ROYAL LUXURY</p>
          </div>
        </div>

        {/* أزرار سلة التسوق والمفضلة وقائمة الجوال */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 hover:bg-white/5 rounded-lg transition-colors text-[#d4af37]">
            <Heart className="w-6 h-6" />
            {favorites.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {favorites.length}
              </span>
            )}
          </button>

          <button className="relative p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors border border-white/10 text-white">
            <ShoppingBag className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#d4af37] text-black text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 🌟 البطل والواجهة الترحيبية الملكية الفاخرة */}
      <section className="relative overflow-hidden py-20 px-4 max-w-7xl mx-auto text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_65%)] pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] mb-6 text-sm font-semibold">
          <Award className="w-4 h-4" /> منصة الأزياء الراقية الأولى في الشرق الأوسط
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-4xl mx-auto">
          تألقي كالملكات في أرقى <span className="bg-gradient-to-r from-[#d4af37] to-[#f3e5ab] bg-clip-text text-transparent">المناسبات والاحتفالات</span>
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          ننتقي لكِ بعناية فائقة فساتين السهرة والزفاف الفاخرة والعبايات المصممة بأيدي أشهر المصممين العالميين والمحليين لتليق بمستوى تطلعاتكِ الفخمة.
        </p>
      </section>

      {/* 🛍️ قسم عرض المنتجات التفاعلي المطور وبطاقات العرض */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-12">
          {[
            { id: 'all', label: 'الكل الملكي' },
            { id: 'dresses', label: 'فساتين فاخرة' },
            { id: 'abayas', label: 'عبايات ملكية' },
            { id: 'bags', label: 'حقائب نادرة' },
            { id: 'accessories', label: 'مجوهرات وألماس' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all border ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#d4af37] to-[#aa8416] text-black border-[#d4af37] shadow-[0_4px_15px_rgba(212,175,55,0.25)]'
                  : 'bg-[#121212] text-gray-400 border-white/5 hover:border-white/10 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* شبكة المنتجات الذكية الراقية */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="group relative bg-[#121212] border border-white/5 hover:border-[#d4af37]/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col shadow-xl">
              <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {product.badge && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-[#d4af37] to-[#aa8416] text-black text-xs font-black px-2.5 py-1 rounded-md shadow-lg">
                    {product.badge}
                  </span>
                )}
                <button 
                  onClick={() => toggleFavorite(product.id)}
