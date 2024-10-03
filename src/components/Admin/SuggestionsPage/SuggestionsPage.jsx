import React, { useEffect, useState } from 'react';
import './SuggestionsPage.css'; 

export default function SuggestionsPage() {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('pending'); 
  const token = localStorage.getItem('userToken');
  useEffect(() => {
    fetchSuggestionsByStatus(status);
  }, [status]);

  const fetchSuggestionsByStatus = async (status) => {
    try {
      if (!token) {
        setError('Token is missing. Please log in again.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/suggestion/status/${status}`, {     
        headers: {
          'Authorization': `Bearer ${token}`     
        }
      });

      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid token');
      }

      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      setError(error.message || 'Error fetching suggestions by status');
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      if (!token) {
        setError('Token is missing. Please log in again.');
        return;
      }

      const response = await fetch(`http://localhost:5000/api/suggestion/status/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update suggestion status');
      }

      setSuggestions((prevSuggestions) =>
        prevSuggestions.map((suggestion) =>
          suggestion._id === id ? { ...suggestion, status: newStatus } : suggestion
        )
      );
    } catch (error) {
      setError('Error updating suggestion status');
    }
  };

  const getStatusInArabic = (status) => {
    switch (status) {
      case 'pending':
        return 'قيد الانتظار';
      case 'approved':
        return 'مقبول';
      case 'rejected':
        return 'مرفوض';
      default:
        return status;
    }
  };

  return (
    <div className="suggestions-page">
      <h2>الاقتراحات</h2>
      {error && <p className="error-message">{error}</p>}
      
      <div className="status-filter">
        <label htmlFor="status">اختر الحالة:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">قيد الانتظار</option>
          <option value="approved">مقبول</option>
          <option value="rejected">مرفوض</option>
        </select>
      </div>

      <ul className="suggestions-list">
        {suggestions.map((suggestion) => (
          <li key={suggestion._id} className="suggestion-item">
            <p><strong>الاقتراح:</strong> {suggestion.text}</p>
            <p><strong>من:</strong> {suggestion.submittedBy || suggestion.name}</p>
            <p><strong>الحالة:</strong> {getStatusInArabic(suggestion.status)}</p>
            <div className="button-group">
              {suggestion.status === 'pending' && (
                <>
                  <button
                    className="approve-button"
                    onClick={() => updateStatus(suggestion._id, 'approved')}
                  >
                    قبول
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => updateStatus(suggestion._id, 'rejected')}
                  >
                    رفض
                  </button>
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}