import React from 'react';
import './LockScreen.css';

export default function LockScreen() {
  return (
    <div className="lockscreen-bg">
      <h1 className="bsmellah">بسم الله الرحمن الرحيم</h1>
      <div className="gateways">
        <div className="gateway user">
          <h2>بوابة المستخدمين والزوار</h2>
          <button>تسجيل دخول</button>
          <button>تسجيل جديد</button>
          <button>نسيت كلمة المرور</button>
        </div>
        <div className="gateway admin">
          <h2 style={{ fontSize: '1.5em' }}>بوابة المشرفين والمراقبين</h2>
          <button>تسجيل دخول</button>
          <button>نسيت كلمة المرور</button>
        </div>
        <div className="gateway owner">
          <h2 className="royal-title">👑 بوابة صاحب الموقع (ملكية)</h2>
          <button className="royal-btn">دخول ملكي</button>
        </div>
      </div>
    </div>
  );
}