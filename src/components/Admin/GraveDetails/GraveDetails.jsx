import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function GraveDetails() {
  const { graveId } = useParams(); // الحصول على معرف المقبرة من URL
  const [graveDetails, setGraveDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/graves/graves/${graveId}`)
      .then(response => {
        setGraveDetails(response.data);
      })
      .catch(error => {
        console.error("حدث خطأ أثناء جلب تفاصيل المقبرة!", error);
      });
  }, [graveId]);

  return (
    <div className="container">
      <h2>تفاصيل المقبرة</h2>
      {graveDetails ? (
        <div className="card p-3">
          <p><strong>رقم المقبرة:</strong> {graveDetails.number}</p>
          <p><strong>الجنس:</strong> {graveDetails.gender}</p>

          {graveDetails.buriedPersons.length > 0 ? (
            <div>
              <h3>الأشخاص المدفونين:</h3>
              <ul>
                {graveDetails.buriedPersons.map(person => (
                  <li key={person._id}>
                    <p><strong>الاسم:</strong> {person.name}</p>
                    <p><strong>تاريخ الدفن:</strong> {new Date(person.burialDate).toLocaleDateString('ar-EG')}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>لا يوجد أشخاص مدفونين في هذه المقبرة.</p>
          )}

          <button className="btn btn-primary mt-3">دفن شخص</button>
        </div>
      ) : (
        <p>جاري تحميل تفاصيل المقبرة...</p>
      )}
    </div>
  );
}
