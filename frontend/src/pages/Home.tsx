import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { Volume2, VolumeX, Crown, Mail, Megaphone } from "lucide-react";

const firebaseConfig = {
  apiKey: "AIzaSyCkPWGfxXRaZJ7rdpWIs-Y3647V877p7vU",
  authDomain: "koni-aniqa.firebaseapp.com",
  projectId: "koni-aniqa",
  storageBucket: "koni-aniqa.appspot.com",
  messagingSenderId: "350938973339",
  appId: "1:350938973339:web:cee80346157e4f721a323e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // 1. نظام الصدى الترحيبي (The Welcome Echo)
  const getWelcomeTheme = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { bg: 'linear-gradient(135deg, #1a1a2e, #4b5d67)', msg: 'صباح الخير يا صاحب العرش، فجرٌ جديد من الأناقة.' };
    if (hour < 18) return { bg: 'linear-gradient(135deg, #2c3e50, #000)', msg: 'أهلاً بك في وقت الذروة، أناقة CHIC تزهو بحضورك.' };
    return { bg: 'radial-gradient(circle, #1a1a1a 0%, #000000 100%)', msg: 'مساء ملكي عميق، القصر في انتظار إبداعاتك.' };
  };

  const theme = getWelcomeTheme();

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
  }, []);

  const toggleMusic = () => {
    const audio = new Audio('/theme.mp3');
    if (!isPlaying) { audio.play(); setIsPlaying(true); }
    else { audio.pause(); setIsPlaying(false); }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 transition-all duration-1000" style={{ background: theme.bg }}>
        <div className="w-full max-w-md bg-[#111]/80 border border-[#d4af37] p-8 rounded-3xl backdrop-blur-md shadow-[0_0_50px_rgba(212,175,55,0.2)]">
          <div className="text-center mb-8">
            <Crown size={48} className="mx-auto text-[#d4af37] mb-4 animate-bounce" />
            <h1 className="text-3xl font-bold text-[#d4af37]">عرش المالك</h1>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); signInWithEmailAndPassword(auth, email, password).catch(() => setAuthError("بيانات الدخول خاطئة")); }} className="space-y-4">
            <input type="email" placeholder="البريد الإلكتروني" onChange={(e) => setEmail(e.target.value)} className="w-full p-4 bg-[#000] border border-[#333] rounded-xl text-white outline-none focus:border-[#d4af37]" />
            <input type="password" placeholder="البريد الإلكتروني" onChange={(e) => setPassword(e.target.value)} className="w-full p-4 bg-[#000] border border-[#333] rounded-xl text-white outline-none focus:border-[#d4af37]" />
            <button className="w-full py-4 bg-[#d4af37] text-black font-bold rounded-xl hover:bg-[#b8962f] transition-all">دخول العرش</button>
          </form>
          {authError && <p className="text-red-500 text-center mt-4">{authError}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white transition-all duration-1000" style={{ background: theme.bg }}>
      {/* 2. شريط النبض الملكي */}
      <div className="bg-[#d4af37] text-black p-3 flex items-center justify-center gap-2 font-bold animate-pulse shadow-[0_0_15px_#d4af37]">
        <Megaphone size={20} />
        <span>{theme.msg}</span>
      </div>

      <div className="container mx-auto p-10 text-center">
        <h1 className="text-5xl font-serif text-[#d4af37] mb-12 drop-shadow-lg">أناقة CHIC</h1>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* 3. تأثير اللمسة الذهبية بالـ CSS عند المرور */}
          <div className="p-8 border border-[#d4af37] rounded-3xl bg-[#111]/50 hover:shadow-[0_0_20px_#d4af37] transition-all cursor-pointer">
            <Mail size={40} className="mx-auto mb-4 text-[#d4af37]" />
            <h3 className="text-2xl font-bold">غرفة الشكاوى</h3>
            <p className="text-white/70 mt-2">متابعة رسائل العملاء المباشرة</p>
          </div>
          <div onClick={toggleMusic} className="p-8 border border-[#333] rounded-3xl bg-[#111]/50 hover:border-[#d4af37] transition-all cursor-pointer">
            {isPlaying ? <Volume2 size={40} className="mx-auto mb-4 text-[#d4af37]" /> : <VolumeX size={40} className="mx-auto mb-4" />}
            <h3 className="text-2xl font-bold">موسيقى الموقع</h3>
            <p className="text-white/70 mt-2">{isPlaying ? "إيقاف الموسيقى" : "تشغيل موسيقى الخلفية"}</p>
          </div>
        </div>

        <button onClick={() => signOut(auth)} className="mt-12 text-[#d4af37] hover:underline">تسجيل خروج من العرش</button>
      </div>
    </div>
  );
}
