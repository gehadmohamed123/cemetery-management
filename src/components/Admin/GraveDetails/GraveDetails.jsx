import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function GraveDetails() {
  const { graveId } = useParams();
  const [graveDetails, setGraveDetails] = useState(null);
  const navigate = useNavigate(); // Add the useNavigate hook

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

  const handleBuryPersonClick = () => {
    navigate(`/add-dead/${graveId}`);
  };

  return (
    <div className="grave-details-container">
      <h2 className="grave-details-title">تفاصيل المقبرة</h2>
      {graveDetails.buriedPersons && graveDetails.buriedPersons.length > 0 ? (
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
      ) : (
        <p>المقبرة فارغة</p>
      )}
      <button className="bury-person-button" onClick={handleBuryPersonClick}>
        دفن شخص
      </button>
    </div>
  );
}
