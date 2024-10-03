import React, { useState } from 'react';
import './RegisterPage.css'; // تأكد من وجود ملف CSS لتنسيق الصفحة

export default function RegisterPage() {
  // حالات لتخزين بيانات المستخدم ورسائل الخطأ أو النجاح
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // دالة التسجيل
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'فشل في إنشاء المستخدم');
      }

      setMessage('تم إنشاء المستخدم بنجاح');
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء إنشاء المستخدم');
    }
  };

  return (
    <div className="register-page">
      <h2>تسجيل مستخدم جديد</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="name">الاسم:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">البريد الإلكتروني:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">كلمة المرور:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">تسجيل</button>
      </form>
    </div>
  );
}
