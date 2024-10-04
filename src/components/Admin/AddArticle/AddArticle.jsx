import React, { useState } from 'react';
import axios from 'axios';
import './AddArticle.css'; 

const AddArticle = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('userToken'); 

    try {
      const response = await axios.post('http://localhost:5000/api/articles', {
        title,
        content,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json', 
        }
      });

      setMessage('تمت إضافة المقالة بنجاح!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding article:', error);
      setMessage('حدث خطأ أثناء إضافة المقالة.');
    }
  };

  return (
    <div className="add-article-container">
      <h2>إضافة مقالة جديدة</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">العنوان:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">النص:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">إضافة المقالة</button>
      </form>
    </div>
  );
};

export default AddArticle;
