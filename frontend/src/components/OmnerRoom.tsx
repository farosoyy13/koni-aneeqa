import React, { useState } from 'react';

export default function OwnerRoom() {
  const [users, setUsers] = useState([
    { id: 1, name: "عبدالله الشمري", email: "abdullah@gmail.com", status: "نشط" },
    { id: 2, name: "سلطان القحطاني", email: "sultan@gmail.com", status: "نشط" },
    { id: 3, name: "خالد العنزي", email: "khaled@gmail.com", status: "محظور" }
  ]);

  const handleBan = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'نشط' ? 'محظور' : 'نشط' } : u));
    alert("تم تحديث صلاحية المستخدم عبر رادار الرقابة بنجاح!");
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ borderBottom: '2px solid #d4af37', paddingBottom: '10px', marginBottom: '20px' }}>
        <h1 style={{ fontFamily: 'Amiri, serif', color: '#d4af37', fontSize: '32px' }}>
          غرفة العمليات الاستراتيجية ورادار الرقابة والتشريعات المطلقة
        </h1>
      </header>

      {/* 🟢 رادار الرقابة الإدارية والسرية نشط الآن بصيغة React الصحيحة */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid #d4af37', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '10px' }}>صلاحيات الأستاذ فهد الشمري</h3>
          <p>لوحة تحكم كلي معطلة القيود ومحمية برمجياً 100% لإدارة كافة الحسابات والواجهات وعزل الحسابات المزيفة.</p>
        </div>

        <div style={{ background: 'rgba(20,20,20,0.8)', border: '1px solid #d4af37', padding: '20px', borderRadius: '8px' }}>
          <h3 style={{ color: '#d4af37', marginBottom: '10px' }}>قائمة الزوار والرقابة الفورية</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {users.map(user => (
              <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #333' }}>
                <span>{user.name} ({user.email})</span>
                <button 
                  onClick={() => handleBan(user.id)} 
                  style={{ background: user.status === 'نشط' ? '#ff3333' : '#d4af37', color: '#000', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  {user.status === 'نشط' ? 'طرد وحظر' : 'إلغاء الحظر'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
