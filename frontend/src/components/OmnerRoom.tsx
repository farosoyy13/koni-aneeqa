import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, setDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface Complaint { id: string; senderName: string; senderContact: string; targetPerson: string; message: string; timestamp: any; }
interface UserProfile { id: string; username: string; email: string; role: 'owner' | 'admin' | 'moderator' | 'user'; isBanned: boolean; }
interface PrivateMessage { id: string; senderName: string; receiverName: string; adTitle: string; message: string; timestamp: any; }
interface Advertisement { id: string; title: string; price: number; imageUrl: string; ownerName: string; comments?: { id: string; userName: string; text: string }[]; }

export default function OwnerRoom() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [privateChats, setPrivateChats] = useState<PrivateMessage[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [activeTab, setActiveTab] = useState<'spy_chats' | 'manage_ads' | 'users' | 'complaints'>('spy_chats');
  const [loading, setLoading] = useState(true);
  
  // خاص بالرسائل العامة المتحركة (النداء الملكي)
  const [announcement, setAnnouncement] = useState('');
  const [currentAnnouncement, setCurrentAnnouncement] = useState('');

  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(query(collection(db, 'complaints'), orderBy('timestamp', 'desc')), (snap) => {
      const list: Complaint[] = []; snap.forEach(doc => list.push({ id: doc.id, ...doc.data() } as Complaint)); setComplaints(list);
    });
    onSnapshot(collection(db, 'users'), (snap) => {
      const list: UserProfile[] = []; snap.forEach(doc => list.push({ id: doc.id, ...doc.data() } as UserProfile)); setUsers(list);
    });
    onSnapshot(query(collection(db, 'private_chats'), orderBy('timestamp', 'desc')), (snap) => {
      const list: PrivateMessage[] = []; snap.forEach(doc => list.push({ id: doc.id, ...doc.data() } as PrivateMessage)); setPrivateChats(list);
    });
    onSnapshot(collection(db, 'advertisements'), (snap) => {
      const list: Advertisement[] = []; snap.forEach(doc => list.push({ id: doc.id, ...doc.data() } as Advertisement)); setAds(list); setLoading(false);
    });
    // مراقبة الإعلان الحالي المفعل بالسيستم
    onSnapshot(doc(db, 'system_settings', 'announcement'), (docSnap) => {
      if (docSnap.exists()) { setCurrentAnnouncement(docSnap.data().text || ''); }
    });
  }, []);

  // إرسال الرسالة المتحركة العامة للموقع
  const handleSendAnnouncement = async () => {
    if (!announcement.trim()) return alert('الرجاء كتابة نص الإعلان أولاً يا مولاي');
    await setDoc(doc(db, 'system_settings', 'announcement'), { text: announcement, updatedAt: new Date() });
    setAnnouncement('');
    alert('🚀 تم بث النداء الملكي بنجاح، وشريط الإعلان الآن يزلزل واجهة الموقع لجميع الزوار!');
  };

  // حذف وإخفاء الشريط المتحرك من واجهة الموقع
  const handleClearAnnouncement = async () => {
    if (window.confirm('هل تريد إزالة وتوقيف الشريط المتحرك من واجهة الموقع؟')) {
      await setDoc(doc(db, 'system_settings', 'announcement'), { text: '', updatedAt: new Date() });
      alert('تم حذف الإعلان بنجاح.');
    }
  };

  const handleDeleteAd = async (adId: string, adTitle: string) => {
    if (window.confirm(`حذف إعلان [ ${adTitle} ] نهائياً؟`)) await deleteDoc(doc(db, 'advertisements', adId));
  };

  const handleUpdateAdDetails = async (adId: string) => {
    await updateDoc(doc(db, 'advertisements', adId), { price: Number(newPrice), imageUrl: newImageUrl });
    setEditingAdId(null);
  };

  const handleDeleteComment = async (adId: string, currentComments: any[], commentIdToDelete: string) => {
    await updateDoc(doc(db, 'advertisements', adId), { comments: currentComments.filter(c => c.id !== commentIdToDelete) });
  };

  const handleDeleteComplaint = async (id: string) => { await deleteDoc(doc(db, 'complaints', id)); };
  const handleDemote = async (userId: string, username: string) => { await updateDoc(doc(db, 'users', userId), { role: 'user' }); };
  const handlePromote = async (userId: string, currentRole: string) => { await updateDoc(doc(db, 'users', userId), { role: currentRole === 'moderator' ? 'admin' : 'moderator' }); };
  const handleToggleBan = async (userId: string, username: string, currentBanStatus: boolean) => {
    await updateDoc(doc(db, 'users', userId), { isBanned: !currentBanStatus });
    if (!currentBanStatus) { await setDoc(doc(db, 'banned_lists', userId), { bannedAt: new Date(), username }); } else { await deleteDoc(doc(db, 'banned_lists', userId)); }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', fontFamily: '"Cairo", sans-serif', direction: 'rtl', padding: '40px 20px' }}>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #d4af37', paddingBottom: '20px', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#d4af37', margin: 0, fontSize: '30px', fontWeight: '900' }}>👑 ديوان القيادة العليا وبث الإعلانات العامة</h1>
          <p style={{ color: '#888', margin: '5px 0 0 0' }}>تحكم كامل في الرسائل، الإعلانات، بث الشريط المتحرك، الطرد، والحظر الفوري.</p>
        </div>
        <button onClick={() => { signOut(auth); navigate('/login'); }} style={{ padding: '10px 20px', background: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c', border: '1px solid #e74c3c', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🚪 مغادرة</button>
      </header>

      {/* ================= 📢 مركز بث النداء الملكي والشريط المتحرك ================= */}
      <section style={{ background: '#111', border: '1px dashed #d4af37', borderRadius: '15px', padding: '25px', marginBottom: '35px' }}>
        <h2 style={{ color: '#d4af37', fontSize: '20px', marginTop: 0, marginBottom: '15px' }}>📢 بث رسائل عامة متحركة في واجهة الموقع (بلا حدود)</h2>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            value={announcement} 
            onChange={(e) => setAnnouncement(e.target.value)}
            placeholder="اكتب هنا التنبيه المهم (مثال: تنبيه لجميع المشرفين والمراقبين يرجى التواجد فوراً بالديوان..)" 
            style={{ flex: 1, minWidth: '300px', padding: '14px', borderRadius: '8px', border: '1px solid #333', background: '#000', color: '#fff', fontSize: '15px', fontFamily: 'inherit' }}
          />
          <button onClick={handleSendAnnouncement} style={{ padding: '14px 28px', background: '#d4af37', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            🚀 بث الشريط المتحرك الآن
          </button>
          {currentAnnouncement && (
            <button onClick={handleClearAnnouncement} style={{ padding: '14px 20px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              🗑️ إيقاف وحذف الشريط الحالي
            </button>
          )}
        </div>
        {currentAnnouncement && (
          <p style={{ margin: '15px 0 0 0', fontSize: '14px', color: '#aaa' }}>
            🔄 <span style={{ color: '#2ecc71' }}>النص المتحرك الشغال حالياً بالموقع:</span> "{currentAnnouncement}"
          </p>
        )}
      </section>

      {/* أزرار التبويبات الأخرى للتحكم بالرسائل الخاصة والتعليقات */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('spy_chats')} style={{ padding: '12px 25px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'spy_chats' ? '#d4af37' : '#222', color: activeTab === 'spy_chats' ? '#000' : '#fff' }}>🔍 رادار الرسائل الخاصة ({privateChats.length})</button>
        <button onClick={() => setActiveTab('manage_ads')} style={{ padding: '12px 25px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'manage_ads' ? '#d4af37' : '#222', color: activeTab === 'manage_ads' ? '#000' : '#fff' }}>👗 التحكم بالإعلانات والتعليقات ({ads.length})</button>
        <button onClick={() => setActiveTab('users')} style={{ padding: '12px 25px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'users' ? '#d4af37' : '#222', color: activeTab === 'users' ? '#000' : '#fff' }}>🚫 حظر وطرد ({users.length})</button>
        <button onClick={() => setActiveTab('complaints')} style={{ padding: '12px 25px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'complaints' ? '#d4af37' : '#222', color: activeTab === 'complaints' ? '#000' : '#fff' }}>📥 صندوق الشكاوى ({complaints.length})</button>
      </div>

      {loading ? <p style={{ color: '#d4af37', textAlign: 'center' }}>جاري استدعاء قوى السيطرة...</p> : (
        <>
          {activeTab === 'spy_chats' && (
            <section>
              <h2 style={{ color: '#d4af37', fontSize: '22px', marginBottom: '20px' }}>💬 سجل المحادثات والرسائل السرية للبيع والشراء بين الأعضاء:</h2>
              {privateChats.length === 0 ? <p style={{ color: '#555' }}>لا توجد محادثات جارية.</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' }}>
                  {privateChats.map((chat) => (
                    <div key={chat.id} style={{ background: '#111', border: '1px solid #d4af37', borderRadius: '15px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#888', marginBottom: '10px' }}>
                        <span>👤 من: <strong>{chat.senderName}</strong></span>
                        <span>⬅️ إلى: <strong style={{ color: '#fff' }}>{chat.receiverName}</strong></span>
                      </div>
                      <div style={{ fontSize: '14px', color: '#d4af37', marginBottom: '10px' }}>📦 إعلان: <strong>{chat.adTitle}</strong></div>
                      <div style={{ background: '#181818', padding: '15px', borderRadius: '8px', color: '#eee' }}>"{chat.message}"</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {activeTab === 'manage_ads' && (
            <section>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(450px, 1fr))', gap: '25px' }}>
                {ads.map((ad) => (
                  <div key={ad.id} style={{ background: '#111', border: '1px solid #222', borderRadius: '20px', padding: '25px' }}>
                    <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '15px' }}>
                      <img src={ad.imageUrl} alt={ad.title} style={{ width: '90px', height: '90px', borderRadius: '12px', objectFit: 'cover' }} />
                      <div style={{ flex: 1 }}>
                        <h3 style={{ color: '#fff', margin: '0 0 5px 0' }}>{ad.title}</h3>
                        <p style={{ color: '#2ecc71', margin: 0, fontWeight: 'bold' }}>💰 {ad.price} ريال</p>
                      </div>
                    </div>
                    {editingAdId === ad.id ? (
                      <div style={{ background: '#1a1a1a', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
                        <input type="number" value={newPrice} onChange={(e) => setNewPrice(Number(e.target.value))} style={{ width: '100%', padding: '8px', marginBottom: '10px', background: '#000', color: '#fff' }} />
                        <input type="text" value={newImageUrl} onChange={(e) => setNewImageUrl(e.target.value)} style={{ width: '100%', padding: '8px', marginBottom: '10px', background: '#000', color: '#fff' }} />
                        <button onClick={() => handleUpdateAdDetails(ad.id)} style={{ padding: '6px 15px', background: '#2ecc71' }}>حفظ</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button onClick={() => { setEditingAdId(ad.id); setNewPrice(ad.price); setNewImageUrl(ad.imageUrl); }} style={{ flex: 1, padding: '8px', background: '#3498db', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>✏️ تعديل الإعلان</button>
                        <button onClick={() => handleDeleteAd(ad.id, ad.title)} style={{ flex: 1, padding: '8px', background: '#e74c3c', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>🗑️ حذف</button>
                      </div>
                    )}
                    <div style={{ borderTop: '1px solid #222', paddingTop: '15px' }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>💬 حذف التعليقات:</h4>
                      {ad.comments?.map((comment) => (
                        <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#1c1c1c', padding: '8px', borderRadius: '6px', marginBottom: '5px' }}>
                          <span><strong>{comment.userName}:</strong> {comment.text}</span>
                          <button onClick={() => handleDeleteComment(ad.id, ad.comments || [], comment.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer' }}>❌ حذف</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activeTab === 'users' && (
            <section style={{ background: '#111', borderRadius: '15px', padding: '20px' }}>
              <table style={{ width: '100%', textAlign: 'right' }}>
                <tbody>
                  {users.filter(u => u.role !== 'owner').map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '15px' }}>{user.username} {user.isBanned && <span style={{ color: '#e74c3c' }}>(محظور 🚫)</span>}</td>
                      <td style={{ padding: '15px' }}>{user.role}</td>
                      <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                        {(user.role === 'admin' || user.role === 'moderator') && <button onClick={() => handleDemote(user.id, user.username)} style={{ padding: '5px 10px', background: '#e67e22' }}>💥 طرد وعزل</button>}
                        <button onClick={() => handlePromote(user.id, user.role)} style={{ padding: '5px 10px', background: '#2ecc71' }}>🔼 ترقية</button>
                        <button onClick={() => handleToggleBan(user.id, user.username, user.isBanned)} style={{ padding: '5px 10px', background: '#e74c3c', color: '#fff' }}>{user.isBanned ? '🔓 فك حظر' : '🚫 حظر أبدي'}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {activeTab === 'complaints' && (
            <section>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {complaints.map((item) => (
                  <div key={item.id} style={{ background: '#111', borderRadius: '15px', padding: '20px' }}>
                    <h3 style={{ color: '#e74c3c' }}>ضد: {item.targetPerson}</h3>
                    <p>"{item.message}"</p>
                    <button onClick={() => handleDeleteComplaint(item.id)} style={{ width: '100%', padding: '8px', background: '#d4af37' }}>أرشفة الحظر ✓</button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}
