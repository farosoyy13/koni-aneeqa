import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isQuaking, setIsQuaking] = useState(false);
  const navigate = useNavigate();

  const handleOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsQuaking(true);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2144/2144-84.wav');
      audio.play();
      
      setTimeout(() => {
        setIsQuaking(false);
        navigate('/owner-dashboard');
      }, 3000);
    } catch (err) {
      setError('خطأ في الهوية الملكية!');
    }
  };

  return (
    <div className={isQuaking ? 'quake-effect' : ''} style={{ 
      minHeight: '100vh', 
      background: '#020202', 
      padding: '40px', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: '40px',
      fontFamily: '"Cairo", sans-serif' 
    }}>
      <style>{`
        .quake-effect { animation: throneQuake 0.8s infinite; }
        @keyframes throneQuake { 0%, 100% {transform: translate(0)} 50% {transform: translate(-5px, 5px)} }
        .royal-box { border: 3px solid #d4af37; background: linear-gradient(145deg, #0a0a0a, #1a1a1a); border-radius: 30px; padding: 30px; color: #fff; }
      `}</style>

      {/* العرش الملكي (الخانة الكبيرة) */}
      <div className="royal-box" style={{ width: '100%', maxWidth: '600px', position: 'relative', boxShadow: '0 0 30px rgba(212,175,55,0.3)' }}>
        <div onClick={() => console.log("دخول مخفي")} style={{ position: 'absolute', top: 5, right: 5, width: 10, height: 10, background: 'transparent' }} />
        <h1 style={{ color: '#d4af37', textAlign: 'center' }}>العرش الملكي</h1>
        <form onSubmit={handleOwnerLogin}>
          <input type="email" placeholder="البريد السري" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff' }} />
          <input type="password" placeholder="كلمة المرور" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff' }} />
          <button style={{ width: '100%', padding: '15px', background: '#d4af37', border: 'none', fontWeight: 'bold' }}>اعتلاء العرش</button>
        </form>
      </div>

      <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '800px' }}>
        {/* بوابة الإدارة */}
        <div className="royal-box" style={{ flex: 1 }}>
          <h2 style={{ color: '#fff', textAlign: 'center' }}>مكتب الإدارة</h2>
          <p style={{ fontSize: '12px', textAlign: 'center' }}>للمشرفين والمراقبين فقط</p>
        </div>
        {/* بوابة الزوار */}
        <div className="royal-box" style={{ flex: 1 }}>
          <h2 style={{ color: '#aaa', textAlign: 'center' }}>بوابة الزوار</h2>
          <p style={{ fontSize: '12px', textAlign: 'center' }}>أهلاً وسهلاً بالجميع</p>
        </div>
      </div>
    </div>
  );
}
