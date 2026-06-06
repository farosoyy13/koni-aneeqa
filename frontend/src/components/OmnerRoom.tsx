import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface Complaint {
  id: string;
  senderName: string;
  senderContact: string;
  targetPerson: string; 
  message: string;
  timestamp: any;
}

export default function OwnerRoom() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, 'complaints'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Complaint[] = [];
      snapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Complaint);
      });
      setComplaints(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm('هل قمت بمحاسبة المشكو في حقه وتريد أرشفة هذه الشكوى يا مولاي؟')) {
      await deleteDoc(doc(db, 'complaints', id));
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#0a0a0a', 
      color: '#fff', 
      fontFamily: '"Cairo", sans-serif', 
      direction: 'rtl',
      padding: '40px 20px'
    }}>
      
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        borderBottom: '2px solid #d4af37', 
        paddingBottom: '20px',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div>
          <h1 style={{ color: '#d4af37', margin: 0, fontSize: '32px', fontWeight: '900' }}>👑 ديوان العرش الإداري السرّي</h1>
          <p style={{ color: '#aaa', margin: '5px 0 0 0' }}>مرحباً بك يا صاحب الجلالة والمهابة في غرفتك الخاصة لمراقبة شؤون الرعية</p>
        </div>
        <button onClick={handleLogout} style={{ 
          padding: '12px 25px', 
          background: 'rgba(231, 76, 60, 0.2)', 
          color: '#e74c3c', 
          border: '1px solid #e74c3c', 
          borderRadius: '8px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: '0.3s'
        }} onMouseOver={(e) => e.currentTarget.style.background = '#e74c3c'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(231, 76, 60, 0.2)'}>
          مغادرة الغرفة السرية 🚪
        </button>
      </header>

      <section>
        <h2 style={{ color: '#fff', fontSize: '24px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>📥 صندوق الشكاوى الموجهة ضد المشرفين والمراقبين</span>
          <span style={{ background: '#d4af37', color: '#000', padding: '2px 10px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>{complaints.length}</span>
        </h2>

        {loading ? (
          <p style={{ color: '#d4af37', textAlign: 'center' }}>جاري استدعاء البرقيات والتقارير الملكية...</p>
        ) : complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px', border: '1px dashed #333', borderRadius: '15px', color: '#666' }}>
            🏰 لا توجد أي شكاوى حالياً يا مولاي، الرعية والمشرفون ملتزمون بالنظام تماماً.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {complaints.map((item) => (
              <div key={item.id} style={{ 
                background: '#141414', 
                border: '1px solid #333', 
                borderRadius: '16px', 
                padding: '25px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.5)'
              }}>
                <h3 style={{ color: '#d4af37', margin: '0 0 15px 0', fontSize: '18px' }}>الجهة المشتكى عليها: <span style={{ color: '#e74c3c', fontWeight: 'bold' }}>{item.targetPerson}</span></h3>
                <p style={{ color: '#eee', lineHeight: '1.8', backgroundColor: '#1f1f1f', padding: '15px', borderRadius: '8px', minHeight: '80px', margin: '0 0 15px 0' }}>
                  "{item.message}"
                </p>
                <div style={{ fontSize: '14px', color: '#888', borderTop: '1px solid #222', paddingTop: '10px' }}>
                  <div>👤 المرسل: <strong>{item.senderName}</strong></div>
                  <div style={{ marginTop: '5px' }}>📞 التواصل: <span style={{ color: '#d4af37' }}>{item.senderContact}</span></div>
                </div>
                <button onClick={() => handleDelete(item.id)} style={{ 
                  width: '100%', marginTop: '15px', padding: '10px', background: '#222', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                }} onMouseOver={(e) => e.currentTarget.style.background = '#d4af37'} onMouseOut={(e) => e.currentTarget.style.background = '#222'}>
                  تمت المحاسبة والأرشفة ✓
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
