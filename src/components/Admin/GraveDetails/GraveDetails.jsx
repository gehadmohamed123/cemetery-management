import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GraveDetails() {
  const { graveId } = useParams();
  const [grave, setGrave] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchGraveDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/graves/graves/${graveId}`);
        const data = await response.json();
        setGrave(data);
      } catch (error) {
        console.error('Error fetching grave details:', error);
      }
    };
    fetchGraveDetails();
  }, [graveId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleDeletePerson = async (personId) => {
    const token = localStorage.getItem('userToken'); 
    try {
      const response = await fetch(`http://localhost:5000/api/graves/${graveId}/remove-buried`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ buriedPersonId: personId }), 
      });
      
      if (response.ok) {
        setGrave((prevGrave) => ({
          ...prevGrave,
          buriedPersons: prevGrave.buriedPersons.filter(person => person._id !== personId), 
        }));
      } else {
        console.error('Failed to delete person:', await response.json());
      }
    } catch (error) {
      console.error('Error deleting person:', error);
    }
  };

  if (!grave) {
    return <p>Loading...</p>;
  }

  const handleBuryPersonClick = () => {
    navigate(`/add-dead/${graveId}`);
  };

  return (
    <div className="grave-details-container">
      <h2 className="grave-details-title">تفاصيل المقبرة</h2>
      {grave.buriedPersons && grave.buriedPersons.length > 0 ? (
        <table className="grave-details-table">
          <thead>
            <tr>
              <th>الاسم</th>
              <th>تاريخ الدفن</th>
              <th>العمليات</th>
            </tr>
          </thead>
          <tbody>
            {grave.buriedPersons.map((person) => (
              <tr key={person._id}> 
                <td>{person.name}</td>
                <td>{formatDate(person.burialDate)}</td>
                <td>
                  <button 
                    className="btn btn-danger" 
                    onClick={() => handleDeletePerson(person._id)} 
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>المقبرة فارغة</p>
      )}

      {grave && (grave.buriedPersons.length === 0 || (grave.status && grave.status.trim() === 'متاحة')) && (
        <button className="bury-person-button" onClick={handleBuryPersonClick}>
          دفن شخص
        </button>
      )}
    </div>
  );
}
