import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function AddDead() {
  const { graveId } = useParams(); 
  const [name, setName] = useState('');
  const [burialDate, setBurialDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('userToken'); 
      
      const response = await axios.post(`http://localhost:5000/api/graves/${graveId}/bury`, 
      {
        name: name,
        burialDate: burialDate, 
      }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMessage('تم دفن الشخص بنجاح');
      setErrorMessage(''); 
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('حدث خطأ أثناء حفظ البيانات');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="add-dead-container p-5">
      <h2>دفن شخص جديد</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">اسم المتوفى:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="burialDate">تاريخ الدفن:</label>
          <input
            type="date"
            id="burialDate"
            name="burialDate"
            value={burialDate}
            onChange={(e) => setBurialDate(e.target.value)}
            required
          />
        </div>
        <button type="submit">حفظ</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
}
