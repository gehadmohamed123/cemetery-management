import React from 'react';
import './Contact.css'; 

const Contact = () => {
  return (
    <div className="team-container">
      <h1>Project Developers</h1>
      <div className="team-cards">
        <div className="team-card">
          <h2>Hussein Sabry</h2>
          <p><strong>Email:</strong> sabryhusseinhussein@gmail.com</p>
          <p><strong>Phone:</strong> 01096586823</p>
          <p><strong>Role:</strong> Backend Developer & Tester</p>
        </div>
        
        <div className="team-card">
          <h2>Reda Abdelwahed</h2>
          <p><strong>Role:</strong> UI Designer</p>
          <p><strong>Phone:</strong> +02 01554528592</p>
        </div>
        
        <div className="team-card">
          <h2>Gehad Mohamed</h2>
          <p><strong>Email:</strong> gehadmo157@gmail.com</p>
          <p><strong>Role:</strong> Frontend Developer</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;