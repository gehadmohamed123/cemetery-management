import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const normalizeString = (str) => {
  const replacements = {
    'أ': 'ا',
    'إ': 'ا',
    'آ': 'ا',
    'ؤ': 'و',
    'ئ': 'ي',
    'ي': 'ى',
    'ة': 'ه',
    'ء': '',
  };

  return str
    .trim()
    .toLowerCase()
    .replace(/[أإآؤئيتةء]/g, (match) => replacements[match] || match);
};

export default function ShowGraves() {
  const [graves, setGraves] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/graves')
      .then(response => {
        setGraves(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the graves!", error);
      });
  }, []);

  const handleGraveClick = (graveId) => {
    navigate(`/graves/${graveId}`); 
  };

  const handleChangeStatus = async (graveId) => {
    const token = localStorage.getItem('userToken'); 

    try {
      const response = await axios.put(`http://localhost:5000/api/graves/full/${graveId}`, null, {
        headers: {
          'Authorization': `Bearer ${token}`, 
        },
      });
      if (response.status === 200) {
        setGraves(prevGraves => 
          prevGraves.map(grave => 
            grave._id === graveId ? { ...grave, status: 'ممتلئة' } : grave
          )
        );
      }
    } catch (error) {
      console.error("There was an error updating the grave status!", error);
    }
  };

  const uniqueGraves = Array.from(new Set(graves.map(grave => grave._id)))
    .map(id => graves.find(grave => grave._id === id));

    const filteredGraves = graves.filter(grave => {
      const normalizedSearchTerm = normalizeString(searchTerm);
      
      return (
        grave.buriedPersons.some(person => 
          normalizeString(person.name).includes(normalizedSearchTerm)
        ) || 
        grave.number.toString().includes(normalizedSearchTerm) || 
        normalizedSearchTerm === '' 
      );
    });

  return (
    <div className="container">
      <h2>قائمة المقابر</h2>
      <input 
        type="text" 
        placeholder="أدخل اسم الشخص او رقم المقبرة ......" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="form-control mb-3" 
      />
      <table className="table table-striped">
        <thead>
          <tr>
            <th>رقم المقبرة</th>
            <th>الحالة</th>
            <th>الجنس</th>
            <th>العمليات</th>
            <th>تعديل</th>
          </tr>
        </thead>
        <tbody>
          {filteredGraves.length > 0 ? (
            filteredGraves.map((grave) => (
              <tr key={grave._id}>
                <td>{grave.number}</td>
                <td>{grave.status }</td>
                <td>
                  {grave.gender === 'رجال' ? 'رجال' : 
                   grave.gender === 'نساء' ? 'نساء' : 
                   'عظام'}
                </td>
                <td>
                  <button 
                    onClick={() => handleGraveClick(grave._id)} 
                    className="btn custom-btn me-2" 
                  >
                    عرض المزيد
                  </button>
                  </td>
                  <td>
                  <button 
                    onClick={() => handleChangeStatus(grave._id)} 
                    className="btn btn-primary" 
                  >
                    تغيير الحالة
                  </button>
                  </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">لا توجد مقابر تتطابق مع البحث</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
