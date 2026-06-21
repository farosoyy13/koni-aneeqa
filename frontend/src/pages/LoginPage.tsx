import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Crown, Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [, setLocation] = useLocation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

      if (userDoc.exists() && userDoc.data().role === 'owner') {
        setLocation('/admin');
      } else {
        setError('عذراً، هذا الحساب لا يملك صلاحيات الإدارة.');
        await auth.signOut();
      }
    } catch (err: any) {
      setError('خطأ في تسجيل الدخول. يرجى التحقق من البيانات.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4" dir="rtl">
      <div className="max-w-md w-full bg-[#0b0b0b] rounded-2xl border border-[#d4af37]/20 p-8 shadow-xl">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#d4af37]/10 rounded-full flex items-center justify-center mb-4">
            <Crown className="text-[#d4af37]" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white font-serif">أناقة CHIC</h2>
          <p className="text-white/60 text-sm mt-2">لوحة تحكم الإدارة الفاخرة</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="text-sm font-medium text-white/80 block mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-[#141414] border border-[#d4af37]/20 rounded-xl pr-12 pl-4 text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors text-right"
                placeholder="admin@anagahchic.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-white/80 block mb-2">كلمة المرور</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-[#141414] border border-[#d4af37]/20 rounded-xl pr-12 pl-4 text-white placeholder-white/20 focus:border-[#d4af37] focus:outline-none transition-colors text-right"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl font-bold bg-[#d4af37] text-black hover:bg-[#b8860b] transition-all disabled:opacity-50"
          >
            {loading ? 'جاري التحقق...' : 'تسجيل الدخول الآمن 🔒'}
          </Button>
        </form>
      </div>
    </div>
  );
}
