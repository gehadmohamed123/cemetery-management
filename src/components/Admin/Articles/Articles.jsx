import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Articles.css'; 

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/articles');
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const handleDelete = async (articleId) => {
    const token = localStorage.getItem('userToken'); 

    try {
      const response = await fetch(`http://localhost:5000/api/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json' 
        },
      });

      if (response.ok) {
        setArticles(articles.filter(article => article._id !== articleId));
      } else {
        console.error('Error deleting article:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const handleAddArticle = () => {
    navigate('/addarticle'); 
  };

  const handleArticleClick = (articleId) => {
    navigate(`/ArticleDetail/${articleId}`); 
  };

  return (
    <div className="articles-container">
      <h2>المقالات</h2>
      {articles.length > 0 ? (
        <div className="articles">
          {articles.map((article) => (
            <div key={article._id} className="article-card">
              <h2 onClick={() => handleArticleClick(article._id)} style={{ cursor: 'pointer' }}>
                {article.title}
              </h2>
              <button className="delete-btn" onClick={() => handleDelete(article._id)}>
                X
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>لا توجد مقالات متاحة.</p>
      )}
      <button className="add-article-btn" onClick={handleAddArticle}>
        إضافة مقال
      </button>
    </div>
  );
}
