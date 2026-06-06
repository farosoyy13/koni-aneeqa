import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebaseConfig';
import { collection, query, orderBy, onSnapshot, doc, deleteDoc, updateDoc, setDoc, addDoc, limit } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface MeetingMessage { id: string; senderName: string; role: string; text: string; timestamp: any; }
interface Complaint { id: string; senderName: string; senderContact: string; targetPerson: string; message: string; timestamp: any; }
interface UserProfile { id: string; username: string; email: string; role: 'owner' | 'admin' | 'moderator' | 'user'; isBanned: boolean; }
interface PrivateMessage { id: string; senderName: string; receiverName: string; adTitle: string; message: string; timestamp: any; }
interface Advertisement { id: string; title: string; price: number; imageUrl: string; ownerName: string; comments?: { id: string; userName: string; text: string }[]; }

export default function OwnerRoom() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [privateChats, setPrivateChats] = useState<PrivateMessage[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  
  // شات غرفة الاجتماعات والقرارات الإدارية
  const [groupMessages, setGroupMessages] = useState<MeetingMessage[]>([]);
  const [typedMessage, setTypedMessage] = useState('');

  // تبويب التحكم الموحد الجديد والمطور بـ Google
  const [activeTab, setActiveTab] = useState<'google_control' | 'meetings' | 'spy_chats' | 'manage_ads' | 'users' | 'complaints'>('google_control');
  const [loading, setLoading] = useState(true);
  
  // خاص بالرسائل العامة المتحركة (النداء الملكي)
  const [announcement, setAnnouncement] = useState('');
  const [currentAnnouncement, setCurrentAnnouncement] = useState('');

  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<number>(0);
  const [newImageUrl, setNewImageUrl] = useState<string>('');
  
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // جلب بيانات المالك الحالي لتأكيد الصلاحية والأمان
    const user = auth.currentUser;
    if (user) {
      onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
        if (docSnap.exists()) setCurrentUserProfile({ id: docSnap.id, ...docSnap.data() } as UserProfile);
      });
    }

    // جلب شات طاولة الحوار والمشرفين
    const qMeetings = query(collection(db, 'staff_meetings'), orderBy('timestamp', 'asc'), limit(50));
    onSnapshot(qMeetings, (snap) => {
      const list: MeetingMessage[] = [];
      snap.forEach(doc => list.push({ id: doc.id, ...doc.data() } as MeetingMessage));
      setGroupMessages(list);
    });

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
    onSnapshot(doc(db, 'system_settings', 'announcement'), (docSnap) => {
      if (docSnap.exists()) { setCurrentAnnouncement(docSnap.data().text || ''); }
    });
  }, []);

  // إرسال توجيه فوري لشات المشرفين والمراقبين
  const handleSendGroupMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !currentUserProfile) return;
    await addDoc(collection(db, 'staff_meetings'), {
      senderName: currentUserProfile.username || 'المالك',
      role: currentUserProfile.role,
      text: typedMessage,
      timestamp: new Date()
    });
    setTypedMessage('');
  };

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
          <h1 style={{ color: '#d4af37', margin: 0, fontSize: '30px', fontWeight: '900' }}>👑 ديوان القيادة العليا والتحكم السحابي الشامل</h1>
          <p style={{ color: '#888', margin: '5px 0 0 0' }}>مركز إدارة موحد للربط المباشر بـ Google ومراقبة الرسائل والشكاوى وطرد المقصرين.</p>
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

      {/* أزرار التبويبات الفخمة شاملة رادار تحكم Google الموحد */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveTab('google_control')} style={{ padding: '12px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'google_control' ? '#34a853' : '#222', color: '#fff' }}>📊 لوحة مراقبة وإدارة سحابة Google</button>
        <button onClick={() => setActiveTab('meetings')} style={{ padding: '12px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'meetings' ? '#d4af37' : '#222', color: activeTab === 'meetings' ? '#000' : '#fff' }}>💬 ديوان المشرفين والمراقبين</button>
        <button onClick={() => setActiveTab('spy_chats')} style={{ padding: '12px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'spy_chats' ? '#d4af37' : '#222', color: activeTab === 'spy_chats' ? '#000' : '#fff' }}>🔍 رادار الرسائل الخاصة ({privateChats.length})</button>
        <button onClick={() => setActiveTab('manage_ads')} style={{ padding: '12px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'manage_ads' ? '#d4af37' : '#222', color: activeTab === 'manage_ads' ? '#000' : '#fff' }}>👗 التحكم بالإعلانات والتعليقات ({ads.length})</button>
        <button onClick={() => setActiveTab('users')} style={{ padding: '12px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'users' ? '#d4af37' : '#222', color: activeTab === 'users' ? '#000' : '#fff' }}>🚫 حظر وطرد الطاقم والأعضاء ({users.length})</button>
        <button onClick={() => setActiveTab('complaints')} style={{ padding: '12px 22px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontWeight: 'bold', background: activeTab === 'complaints' ? '#d4af37' : '#222', color: activeTab === 'complaints' ? '#000' : '#fff' }}>📥 صندوق الشكاوى والبلاغات ({complaints.length})</button>
      </div>

      {loading ? <p style={{ color: '#d4af37', textAlign: 'center' }}>جاري استدعاء قوى السيطرة والربط السحابي...</p> : (
        <>
          {/* ================= 📊 مركز تحكم Google وFirebase الموحد المدمج ================= */}
          {activeTab === 'google_control' && (
            <section style={{ background: '#111', borderRadius: '15px', padding: '25px', border: '1px solid #34a853' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ color: '#34a853', fontSize: '18px', margin: 0 }}>📊 مراقبة أداء السيرفر السحابي لـ Google ومتابعة الزوار:</h2>
                <span style={{ fontSize: '12px', background: 'rgba(52, 168, 83, 0.2)', color: '#34a853', padding: '4px 12px', borderRadius: '10px', fontWeight: 'bold' }}>دخول موحد آمن ومباشر ✓</span>
              </div>
              <p style={{ fontSize: '14px', color: '#aaa', margin: '0 0 20px 0' }}>تحكم كامل في إحصائيات زوار متجرك الحالية وقواعد البيانات الكلية السحابية دون مغادرة الغرفة.</p>
              
              {/* أزرار اختصار سريعة لفتح الأدوات بكبسة واحدة */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <a href="https://console.firebase.google.com/" target="_blank" rel="noreferrer" style={{ background: '#f5820d', color: '#fff', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>🔥 كونسول قاعدة بيانات Firebase</a>
                <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer" style={{ background: '#1a73e8', color: '#fff', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>☁️ لوحة سحابة Google Cloud</a>
                <a href="https://analytics.google.com/" target="_blank" rel="noreferrer" style={{ background: '#e37400', color: '#fff', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>📈 إحصائيات المتجر الحيّة Google Analytics</a>
              </div>

              {/* نافذة العرض المضمنة الحية للمنصة داخل غرفتك */}
              <div style={{ width: '100%', height: '520px', background: '#050505', borderRadius: '10px', border: '1px solid #333', overflow: 'hidden' }}>
                <iframe 
                  src="https://console.firebase.google.com/" 
                  title="Google Analytics & Cloud Console" 
                  style={{ width: '100%', height: '100%', border: 'none', background: '#fff' }}
                />
              </div>
            </section>
          )}

          {/* ================= 👥 ديوان اجتماعات المشرفين والمراقبين (قروب شات داخلي) ================= */}
          {activeTab === 'meetings' && (
            <section style={{ background: '#111', borderRadius: '15px', padding: '20px', border: '1px solid #222' }}>
              <h2 style={{ color: '#d4af37', fontSize: '18px', marginTop: 0, marginBottom: '15px' }}>👥 طاولة نقاش ومتابعة الطاقم الرقابي والإداري (مباشر):</h2>
              <div style={{ height: '320px', overflowY: 'auto', background: '#050505', border: '1px solid #222', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '15px' }}>
                {groupMessages.length === 0 ? <p style={{ color: '#444', textAlign: 'center', marginTop: '130px' }}>لا توجد رسائل نقاش حالية بالديوان.</p> : groupMessages.map((msg) => (
                  <div key={msg.id} style={{ alignSelf: msg.role === 'owner' ? 'flex-start' : 'flex-end', background: msg.role === 'owner' ? 'rgba(212, 175, 55, 0.12)' : '#1c1c1c', border: msg.role === 'owner' ? '1px solid #d4af37' : '1px solid #333', padding: '10px 15px', borderRadius: '12px', maxWidth: '75%' }}>
                    <div style={{ fontSize: '12px', color: msg.role === 'owner' ? '#d4af37' : '#3498db', fontWeight: 'bold', marginBottom: '4px' }}>👤 {msg.senderName} ({msg.role === 'owner' ? 'المالك الأعلى' : msg.role})</div>
                    <div style={{ fontSize: '14px', color: '#fff' }}>{msg.text}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendGroupMessage} style={{ display: 'flex', gap: '10px' }}>
                <input type="text" value={typedMessage} onChange={(e) => setTypedMessage(e.target.value)} placeholder="اكتب توجيهاتك الصارمة أو قراراتك للمشرفين هنا..." style={{ flex: 1, padding: '12px', background: '#000', color: '#fff', border: '1px solid #333', borderRadius: '8px', fontFamily: 'inherit' }} />
                <button type="submit" style={{ padding: '12px 25px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>إرسال التوجيه</button>
              </form>
            </section>
          )}

          {/* رادار كشف التجسس والرسائل الخاصة */}
          {activeTab === 'spy_chats' && (
            <section>
              <h2 style={{ color: '#d4af37', fontSize: '22px', marginBottom: '20px' }}>💬 سجل المحادثات والرسائل السرية للبيع والشراء بين الأعضاء:</h2>
              {privateChats.length === 0 ? <p style={{ color: '#555' }}>لا توجد محادثات جارية حالياً.</p> : (
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

          {/* إدارة السلع والأسعار والتعليقات */}
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
                        <button onClick={() => handleUpdateAdDetails(ad.id)} style={{ padding: '6px 15px', background: '#2ecc71', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer' }}>حفظ التعديلات</button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                        <button onClick={() => { setEditingAdId(ad.id); setNewPrice(ad.price); setNewImageUrl(ad.imageUrl); }} style={{ flex: 1, padding: '8px', background: '#3498db', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>✏️ تعديل السعر والصورة</button>
                        <button onClick={() => handleDeleteAd(ad.id, ad.title)} style={{ flex: 1, padding: '8px', background: '#e74c3c', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>🗑️ حذف السلعة</button>
                      </div>
                    )}
                    <div style={{ borderTop: '1px solid #222', paddingTop: '15px' }}>
                      <h4 style={{ color: '#d4af37', margin: '0 0 10px 0' }}>💬 سحق وحذف التعليقات المسيئة:</h4>
                      {ad.comments?.map((comment) => (
                        <div key={comment.id} style={{ display: 'flex', justifyContent: 'space-between', background: '#1c1c1c', padding: '8px', borderRadius: '6px', marginBottom: '5px' }}>
                          <span><strong>{comment.userName}:</strong> {comment.text}</span>
                          <button onClick={() => handleDeleteComment(ad.id, ad.comments || [], comment.id)} style={{ background: 'none', border: 'none', color: '#e74c3c', cursor: 'pointer', fontWeight: 'bold' }}>❌ حذف</button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* لوحة حظر وإقصاء المقصرين وطرد الموظفين */}
          {activeTab === 'users' && (
            <section style={{ background: '#111', borderRadius: '15px', padding: '20px' }}>
              <h2 style={{ color: '#d4af37', fontSize: '18px', marginBottom: '15px' }}>🚫 التحكم بالرتب، وعزل المشرفين والموظفين المقصرين فوراً:</h2>
              <table style={{ width: '100%', textAlign: 'right' }}>
                <tbody>
                  {users.filter(u => u.role !== 'owner').map((user) => (
                    <tr key={user.id} style={{ borderBottom: '1px solid #222' }}>
                      <td style={{ padding: '15px' }}>{user.username} {user.isBanned && <span style={{ color: '#e74c3c' }}>(مطرود ومحظور أبدياً 🚫)</span>}</td>
                      <td style={{ padding: '15px', color: '#3498db', fontWeight: 'bold' }}>الرتبة: {user.role}</td>
                      <td style={{ padding: '15px', display: 'flex', gap: '10px' }}>
                        {(user.role === 'admin' || user.role === 'moderator') && <button onClick={() => handleDemote(user.id, user.username)} style={{ padding: '6px 12px', background: '#e67e22', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>💥 طرد وعزل من الطاقم</button>}
                        <button onClick={() => handlePromote(user.id, user.role)} style={{ padding: '6px 12px', background: '#2ecc71', border: 'none', color: '#fff', borderRadius: '4px', cursor: 'pointer' }}>🔼 ترقية</button>
                        <button onClick={() => handleToggleBan(user.id, user.username, user.isBanned)} style={{ padding: '6px 12px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>{user.isBanned ? '🔓 فك الحظر' : '🚫 حظر أبدي من الموقع'}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* صندوق الشكاوى المغلظة للزوار */}
          {activeTab === 'complaints' && (
            <section>
              <h2 style={{ color: '#e74c3c', fontSize: '20px', marginBottom: '20px' }}>📥 بلاغات الشكاوى المرفوعة ضد موظفي ومراقبي الموقع:</h2>
              {complaints.length === 0 ? <p style={{ color: '#555' }}>لا توجد شكاوى مرفوعة حالياً، الجميع منضبط.</p> : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                  {complaints.map((item) => (
                    <div key={item.id} style={{ background: '#111', borderRadius: '15px', padding: '20px', borderLeft: '5px solid #e74c3c' }}>
                      <h3 style={{ color: '#e74c3c', margin: '0 0 10px 0' }}>🚨 المشتكى عليه: {item.targetPerson}</h3>
                      <p style={{ color: '#aaa', fontSize: '13px', margin: '0 0 10px 0' }}>👤 مقدم البلاغ: {item.senderName} ({item.senderContact})</p>
                      <div style={{ background: '#000', padding: '12px', borderRadius: '8px', color: '#eee', marginBottom: '15px' }}>"{item.message}"</div>
                      <button onClick={() => handleDeleteComplaint(item.id)} style={{ width: '100%', padding: '10px', background: '#d4af37', border: 'none', color: '#000', fontWeight: 'bold', borderRadius: '6px', cursor: 'pointer' }}>أرشفة وإنهاء البلاغ بعد معاقبة الموظف ✓</button>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}
