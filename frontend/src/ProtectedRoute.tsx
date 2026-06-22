import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { auth, db } from '../lib/firebase'; // التطهير الجراحي للمسار لمنع أخطاء البناء
import { doc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    return onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists() && userDoc.data().role === 'owner') {
          setIsOwner(true);
        }
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px', color: '#d4af37', fontWeight: 'bold' }}>جاري التحقق من الصلاحيات الملكية... 🔒</div>;
  
  return isOwner ? <>{children}</> : <Navigate to="/owner-login" replace />;
}
