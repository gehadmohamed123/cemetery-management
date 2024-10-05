import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('userToken'); 

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/update-password',
        {
          email,
          newPassword,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : 'Error updating password'
      );
    }
  };

  return (
    <div className="container p-2">
      <h2>تحديث كلمة المرور</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>البريد الالكترونى:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>كلمة المرور الجديدة</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">تحديث</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default ResetPassword;
