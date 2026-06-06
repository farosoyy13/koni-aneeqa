import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isQuaking, setIsQuaking] = useState(false); // زلزال الشاشة
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      
      // 1. تفعيل زلزال العرش (اهتزاز الشاشة الملكي)
      setIsQuaking(true);

      // 2. تشغيل الصوت المرعب والفخم فوراً
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2144/2144-84.wav');
      audio.volume = 1.0;
      audio.play().catch(err => console.log("الصوت يشتغل فورا"));

      // 3. إظهار الانفجار الذهبي والرسالة بعد ثانية من الاهتزاز
      setTimeout(() => {
        setIsQuaking(false);
        setShowWelcome(true);
      }, 1000);

      // 4. وقت الهيبة المطلقة (8 ثوانٍ) ثم الانتقال لغرفة المالك
      setTimeout(() => {
        navigate('/owner-room');
      }, 9000);

    } catch (err) {
      setError('الرمز السري أو البريد غير صحيح يا مولاي!');
    }
  };

  return (
    <div className={isQuaking ? 'quake-effect' : ''} style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      background: 'radial-gradient(circle, #0d0d0d 0%, #020202 100%)', 
      direction: 'rtl', 
      fontFamily: '"Cairo", sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* هندسة الحركات البرمجية المبتكرة - لم تُصنع من قبل */}
      <style>{`
        /* تأثير زلزال العرش الملكي */
        @keyframes throneQuake {
          0% { transform: translate(0, 0) rotate(0deg); }
          10% { transform: translate(-5px, 5px) rotate(-1deg); }
          20% { transform: translate(5px, -5px) rotate(1deg); }
          30% { transform: translate(-5px, -5px) rotate(0deg); }
          40% { transform: translate(5px, 5px) rotate(1deg); filter: hue-rotate(10deg); }
          50% { transform: translate(-5px, 5px) rotate(-1deg); }
          60% { transform: translate(5px, -5px) rotate(0deg); }
          70% { transform: translate(-5px, -5px) rotate(1deg); }
          80% { transform: translate(5px, 5px) rotate(-1deg); }
          90% { transform: translate(-5px, 5px) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        .quake-effect {
          animation: throneQuake 0.8s ease-in-out infinite;
        }

        /* انقشاع الظلام السينمائي للرسالة */
        @keyframes cinematicReveal {
          0% { opacity: 0; transform: scale(1.5); filter: blur(30px); letter-spacing: 15px; }
          50% { opacity: 0.5; filter: blur(10px); }
          100% { opacity: 1; transform: scale(1); filter: blur(0); letter-spacing: 0.5px; }
        }

        /* نبض الهالة الذهبية المشعة */
        @keyframes cosmicGlow {
          0% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.2); }
          50% { box-shadow: 0 0 100px rgba(212, 175, 55, 0.8), inset 0 0 40px rgba(212, 175, 55, 0.5); border-color: #fff; }
          100% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.3), inset 0 0 15px rgba(212, 175, 55, 0.2); }
        }

        /* حمم النص الذهبي المتوهج */
        @keyframes goldLava {
          0% { text-shadow: 0 0 10px #d4af37, 0 0 20px #b38f2d; color: #fff; }
          50% { text-shadow: 0 0 30px #fff, 0 0 60px #d4af37, 0 0 100px #f3e092; color: #d4af37; }
          100% { text-shadow: 0 0 10px #d4af37, 0 0 20px #b38f2d; color: #fff; }
        }
      `}</style>

      {/* الشاشة الملكية الأسطورية المبتكرة */}
      {showWelcome && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: '#000000',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center',
        }}>
          {/* التاج الملكي يشع طاقة */}
          <div style={{ 
            fontSize: '120px', 
            marginBottom: '10px', 
            animation: 'goldLava 4s infinite ease-in-out' 
          }}>👑</div>
          
          <h1 style={{ 
            color: '#d4af37', 
            fontSize: '55px', 
            fontWeight: '900', 
            marginBottom: '30px',
            animation: 'goldLava 2.5s infinite ease-in-out',
            letterSpacing: '3px'
          }}>تنبيه ملكي صـارم!</h1>
          
          {/* صندوق القرار الملكي الحاسم يظهر بطريقة سينمائية */}
          <div style={{ 
            maxWidth: '850px', 
            background: 'linear-gradient(135deg, #050505 0%, #151515 100%)', 
            border: '3px solid #d4af37', 
            padding: '50px 40px', 
            borderRadius: '35px',
            animation: 'cinematicReveal 1.5s cubic-bezier(0.15, 0.85, 0.3, 1), cosmicGlow 4s infinite ease-in-out',
          }}>
            <p style={{ 
              color: '#ffffff', 
              fontSize: '30px', 
              fontWeight: 'bold', 
              lineHeight: '2.2', 
              margin: 0,
            }}>
              تم دخول صاحب الموقع ويرحب بكم جميعاً.. 
              <br />
              <span style={{ 
                background: 'linear-gradient(45deg, #f3e092, #d4af37, #b38f2d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: '900'
              }}>
                ومن لديه شكوى على المشرفين أو المراقبين أو غيرهم، يتم الذهاب إلى غرفته الخاصة لكي ترسل له ما تريد.
              </span>
            </p>
          </div>
          
          <p style={{ color: '#d4af37', marginTop: '50px', fontSize: '18px', letterSpacing: '4px', fontWeight: 'bold', animation: 'goldLava 3s infinite' }}>جاري تهيئة العرش المطلق لسيادتكم...</p>
        </div>
      )}

      {/* واجهة الدخول الكبيرة والفخمة */}
      <form onSubmit={handleLogin} style={{ 
        background: 'rgba(10, 10, 10, 0.9)', 
        padding: '60px 45px', 
        borderRadius: '30px', 
        border: '2px solid #d4af37', 
        boxShadow: '0 30px 70px rgba(212, 175, 55, 0.2)', 
        width: '100%', 
        maxWidth: '550px',
        zIndex: 1,
        backdropFilter: 'blur(15px)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '75px', marginBottom: '10px', color: '#d4af37' }}>👑</div>
        <h1 style={{ color: '#ffffff', fontSize: '36px', fontWeight: '900', marginBottom: '5px' }}>أناقة CHIC</h1>
        <p style={{ color: '#d4af37', fontSize: '16px', marginBottom: '40px', letterSpacing: '3px' }}>البوابة المطلقة لمالك المتجر</p>
        
        {error && (
          <div style={{ backgroundColor: 'rgba(231, 76, 60, 0.15)', color: '#e74c3c', padding: '14px', borderRadius: '10px', marginBottom: '25px', border: '1px solid #e74c3c', fontWeight: 'bold' }}>
            {error}
          </div>
        )}
        
        <div style={{ marginBottom: '30px', textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#ccc', fontSize: '15px' }}>البريد السري للمالك</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '18px', borderRadius: '14px', border: '1px solid #333', backgroundColor: 'rgba(20, 20, 20, 0.8)', color: '#fff', fontSize: '17px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <div style={{ marginBottom: '40px', textAlign: 'right' }}>
          <label style={{ display: 'block', marginBottom: '10px', color: '#ccc', fontSize: '15px' }}>مفتاح الدخول الحصري</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '18px', borderRadius: '14px', border: '1px solid #333', backgroundColor: 'rgba(20, 20, 20, 0.8)', color: '#fff', fontSize: '17px', outline: 'none', boxSizing: 'border-box' }} />
        </div>

        <button type="submit" style={{ 
          width: '100%', 
          padding: '18px', 
          background: 'linear-gradient(45deg, #b38f2d, #f3e092, #b38f2d)', 
          color: '#000', 
          border: 'none', 
          borderRadius: '14px', 
          fontSize: '20px', 
          fontWeight: 'bold', 
          cursor: 'pointer', 
          boxShadow: '0 8px 25px rgba(212, 175, 55, 0.5)',
          transition: '0.4s'
        }}>
          اعتلاء العرش الملكي 👑
        </button>
      </form>
    </div>
  );
}
