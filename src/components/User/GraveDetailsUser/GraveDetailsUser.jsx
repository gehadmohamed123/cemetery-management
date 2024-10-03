import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GraveDetailsUser.css'; 

export default function GraveDetailsUser() {
  const { graveId } = useParams(); 
  const [graveDetails, setGraveDetails] = useState(null);

  useEffect(() => {
    const fetchGraveDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/graves/graves/${graveId}`);
        const data = await response.json();
        setGraveDetails(data);
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

  if (!graveDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="grave-details-container">
      <h2 className="grave-details-title">تفاصيل المقبرة</h2>
      <table className="grave-details-table">
        <thead>
          <tr>
            <th>الاسم</th>
            <th>تاريخ الدفن</th>
          </tr>
        </thead>
        <tbody>
          {graveDetails.buriedPersons.map((person, index) => (
            <tr key={index}>
              <td>{person.name}</td>
              <td>{formatDate(person.burialDate)}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
