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

  const uniqueGraves = Array.from(new Set(graves.map(grave => grave._id)))
    .map(id => graves.find(grave => grave._id === id));

  const filteredGraves = uniqueGraves.filter(grave => {
    const normalizedSearchTerm = normalizeString(searchTerm);
    return (
      grave.buriedPersons.some(person => 
        normalizeString(person.name).includes(normalizedSearchTerm)
      ) || 
      normalizedSearchTerm === '' 
    );
  });

  return (
    <div className="container">
      <h2>قائمة المقابر</h2>
      <input 
        type="text" 
        placeholder="أدخل اسم الشخص للبحث" 
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
          </tr>
        </thead>
        <tbody>
          {filteredGraves.length > 0 ? (
            filteredGraves.map((grave) => (
              <tr key={grave._id}>
                <td>{grave.number}</td>
                <td>{grave.status }</td> 
                <td>{grave.gender === 'رجال' ? 'رجال' : 'نساء'}</td>
                <td>
                  <button 
                    onClick={() => handleGraveClick(grave._id)} 
                    className="btn custom-btn"
                  >
                    عرض المزيد
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
