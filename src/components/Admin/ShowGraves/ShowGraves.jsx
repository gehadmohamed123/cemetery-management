import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ShowGraves() {
  const [graves, setGraves] = useState([]);
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

  return (
    <div className="container">
      <h2>Grave List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Grave Number</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {graves.map((grave) => (
            <tr key={grave.id} onClick={() => handleGraveClick(grave.id)}>
              <td>{grave.number}</td>
              <td>Click for more details</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
}
