import React, { useState } from 'react';

interface LoginGateProps {
  onSuccess: () => void;
}

export function LoginGate({ onSuccess }: LoginGateProps) {
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (password === '123456') {
      onSuccess();
    } else {
      alert('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div>
      <h2 className="text-center text-xl font-bold mb-4">
        تسجيل الدخول
      </h2>

      <input
        type="password"
        placeholder="كلمة المرور"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 border rounded mb-3 text-black"
      />

      <button
        onClick={handleLogin}
        className="w-full p-3 bg-yellow-500 rounded font-bold text-black"
      >
        دخول
      </button>
    </div>
  );
}