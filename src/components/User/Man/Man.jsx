import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../Woman/Woman.css'; 

const normalizeString = (str) => {
  return str
    .replace(/[\u0621\u0622\u0623\u0624\u0625\u0626]/g, 'ا') 
    .replace(/[\u064A]/g, 'ي') 
    .replace(/[\u0649]/g, 'ي') 
    .replace(/[\u064E\u0650\u0652\u064B\u064C\u064D]/g, ''); 
};

export default function Man() {
  const [graves, setGraves] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchGraves = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/graves/male');
        const data = await response.json();
        setGraves(data);
      } catch (error) {
        console.error('Error fetching male graves:', error);
      }
    };
    fetchGraves();
  }, []);

  const goToGraveDetails = (graveId) => {
    navigate(`/grave-details-user/${graveId}`); 
  };

  const filteredGraves = graves.filter(grave => {
    const normalizedSearchTerm = normalizeString(searchTerm);
    return (
      grave.buriedPersons.some(person => 
        normalizeString(person.name).includes(normalizedSearchTerm)
      ) || 
      normalizedSearchTerm === '' 
    );
  });

  return (
    <div className="woman-container">
      <input
        type="text"
        placeholder="ابحث عن اسم الشخص..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        className="search-input"
      />
      {filteredGraves.map((grave) => (
        <div
          key={grave._id}
          className={`grave-card ${grave.status === 'متاحة' ? 'available' : 'not-available'}`}
        >
          <h2>رقم المقبرة: {grave.number}</h2>
          <p>الحالة: {grave.status}</p>
          <p>
            متاح بعد:{" "}
            {grave.status === 'متاحة'
              ? 'الآن'
              : `${grave.daysUntilAvailable} يوم`} 
          </p>
          <button className="show-more-btn" onClick={() => goToGraveDetails(grave._id)}>
            عرض المزيد
          </button>
        </div>
      ))}
    </div>
  );
}
