import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

export default function ApprovedSuggest() {
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchApprovedSuggestions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/suggestion/approved');
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('حدث خطأ أثناء جلب الاقتراحات المقبولة:', error);
      }
    };

    fetchApprovedSuggestions();
  }, []);

  const handleNavigateToSuggest = () => {
    navigate('/suggest');
  };

  return (
    <div className="container">
      <h2 className="my-4 text-center">الاقتراحات المقبولة</h2>
      {suggestions.length > 0 ? (
        <table className="table table-bordered text-center">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th>الاقتراح</th>
              <th>الحالة</th>
            </tr>
          </thead>
          <tbody>
            {suggestions.map((suggestion, index) => (
              <tr key={suggestion._id}>
                <td>{index + 1}</td>
                <td>{suggestion.text}</td>
                <td>{suggestion.status === 'approved' ? 'مقبول' : suggestion.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">لا توجد اقتراحات مقبولة.</p>
      )}

      <div className=" mt-4">
        <button className="btn btn-primary" onClick={handleNavigateToSuggest}>
          اقتراحك
        </button>
      </div>
    </div>
  );
}
