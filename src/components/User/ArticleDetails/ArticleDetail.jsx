import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/articles/ArticleDetail/${id}`);
        setArticle(response.data);
      } catch (err) {
        setError('حدث خطأ أثناء جلب المقال.');
      }
    };

    fetchArticle();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!article) return <><p className="loading">جاري تحميل المقال...</p>
  <i className='fas fa-spinner fa-spin'></i></> ;

  return (
    <div className="article-detail-container">
      <h1>{article.title}</h1>
      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
