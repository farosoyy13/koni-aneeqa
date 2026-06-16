import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// 🟢 المحرك الرئيسي المعتمد لربط وحقن غرف الإمبراطورية والريموت بداخل صفحة المتصفح السحابية
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
