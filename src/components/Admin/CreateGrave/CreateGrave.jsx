import React, { useState } from 'react';
import './CreateGrave.css'; 

export default function CreateGrave() {
  const [gender, setGender] = useState('');
  const [number, setNumber] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const token = localStorage.getItem('userToken');

    try {
      const checkResponse = await fetch(`http://localhost:5000/api/graves/${number}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (checkResponse.ok) {
        const existingGrave = await checkResponse.json();
        if (existingGrave) {
          setError('رقم المدفن موجود بالفعل.'); 
          return; 
        }
      }

      const response = await fetch('http://localhost:5000/api/graves', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ gender, number }),
      });

      if (!response.ok) {
        throw new Error('فشل إنشاء المدفن');
      }

      const data = await response.json();
      setMessage(`تم إنشاء المدفن بنجاح برقم: ${data.number}`);
      setGender('');
      setNumber('');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="create-grave">
      <h2>إضافة مدفن جديد</h2>
      <form onSubmit={handleSubmit} className="grave-form">
        <div className="form-group">
          <label>الجنس:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">اختر الجنس</option>
            <option value="رجال">رجال</option>
            <option value="نساء">نساء</option>
          </select>
        </div>
        <div className="form-group">
          <label>رقم المدفن:</label>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
            min="1"
            placeholder="ادخل رقم المدفن"
          />
        </div>
        <button type="submit" className="submit-button">
          إضافة
        </button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}
