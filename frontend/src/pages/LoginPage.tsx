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
      
      // شريط الرسالة المتحرك عند دخول المالك
      alert("تم دخول صاحب الموقع! أهلاً بكم جميعاً، نحن هنا لخدمتكم وسرية بياناتكم خط أحمر.");
      
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
      minHeight: '100vh', background: '#020202', padding: '40px', 
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px',
      fontFamily: '"Cairo", sans-serif' 
    }}>
      <style>{`
        .quake-effect { animation: throneQuake 0.8s infinite; }
        @keyframes throneQuake { 0%, 100% {transform: translate(0)} 50% {transform: translate(-5px, 5px)} }
        .royal-box { border: 3px solid #d4af37; background: linear-gradient(145deg, #0a0a0a, #151515); border-radius: 30px; padding: 30px; color: #fff; transition: 0.3s; }
        .royal-box:hover { border-color: #f3e092; }
      `}</style>

      {/* 1. العرش الملكي */}
      <div className="royal-box" style={{ width: '100%', maxWidth: '700px', position: 'relative' }}>
        <div onClick={() => alert("تفعيل الوضع السري")} style={{ position: 'absolute', top: 10, right: 10, width: 15, height: 15, background: 'gold', borderRadius: '50%', cursor: 'pointer' }} />
        <h1 style={{ color: '#d4af37', textAlign: 'center' }}>العرش الملكي</h1>
        <form onSubmit={handleOwnerLogin}>
          <input type="email" placeholder="البريد السري" onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff', borderRadius: '10px' }} />
          <input type="password" placeholder="كلمة المرور" onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: '15px', margin: '10px 0', background: '#000', border: '1px solid #d4af37', color: '#fff', borderRadius: '10px' }} />
          <button style={{ width: '100%', padding: '15px', background: 'linear-gradient(45deg, #d4af37, #f3e092)', border: 'none', fontWeight: 'bold', borderRadius: '10px', cursor: 'pointer' }}>اعتلاء العرش</button>
        </form>
      </div>

      {/* 2. بوابة الإدارة و 3. بوابة الزوار */}
      <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '800px' }}>
        <div className="royal-box" style={{ flex: 1.5 }}>
          <h2 style={{ color: '#fff', textAlign: 'center' }}>بوابة الإدارة</h2>
          <p style={{ textAlign: 'center', fontSize: '14px' }}>المشرفون والمراقبون</p>
        </div>
        <div className="royal-box" style={{ flex: 1 }}>
          <h2 style={{ color: '#aaa', textAlign: 'center' }}>بوابة الزوار</h2>
          <p style={{ textAlign: 'center', fontSize: '14px' }}>تسوق بخصوصية</p>
        </div>
      </div>

      {/* كلمة صاحب الموقع الثابتة */}
      <div style={{ maxWidth: '900px', padding: '30px', borderRight: '5px solid #d4af37', background: '#050505', color: '#fff', fontSize: '16px', lineHeight: '1.6', borderRadius: '15px' }}>
        <h3 style={{ color: '#d4af37' }}>كلمة صاحب الموقع:</h3>
        <p>السلام عليكم ورحمة الله وبركاته... الموقع عمل من أجلكم، وأنتم خط أحمر. خصوصيتكم سرية تامة ولا يطلع عليها أحد. من لديه شكوى على أي موظف فليتوجه للغرفة الخاصة وسيحصل على حقه فوراً.</p>
      </div>
    </div>
  );
}
