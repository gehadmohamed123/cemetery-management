import React, { useState } from 'react';
import axios from 'axios';
import './Login.css'; 
import Joi from 'joi';
import { useNavigate } from 'react-router-dom';

export default function Login({ saveUserData }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [errorList, setErrorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  function getUserData(eventInfo) {
    let myUser = { ...user };
    myUser[eventInfo.target.name] = eventInfo.target.value;
    setUser(myUser);
  }

  const handleLogin = async () => {
    try {
      let { data } = await axios.post('http://localhost:5000/api/auth/login', user);
      if (data.token && data.token.length > 0) {
        setIsLoading(false);
        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userRole', data.role); 
        saveUserData();

        if (data.role === 'manager') {
          navigate('/suggestions');
        } else if (data.role === 'admin') {
          navigate('/creategrave');
        }

        window.location.reload(); // يمكنك تحسين هذا لاحقًا
      } else {
        setIsLoading(false);
        setError(data.message || 'حدث خطأ أثناء تسجيل الدخول');
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
        setError(errorMessage);
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول');
      }
    }
  };
  
  function submitLoginForm(e) {
    e.preventDefault();
    setIsLoading(true);

    const validation = validateLoginForm();

    if (validation.error) {
      setIsLoading(false);
      setErrorList(validation.error.details);
    } else {
      handleLogin();
    }
  };

  function validateLoginForm() {
    const schema = Joi.object({
      email: Joi.string().email({ tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(6).required(),
    });

    return schema.validate(user, { abortEarly: false });
  }

  return (
    <>
      {errorList.map((err, index) => (
        <div key={index} className='alert alert-danger my-2'>
          {err.context.label === 'password' ? 'كلمة المرور غير صحيحة' : err.message}
        </div>
      ))}
      {error && <div className='alert alert-danger my-2'>{error}</div>}
      <div className="login-container">
        <h2>تسجيل دخول</h2>
        <form onSubmit={submitLoginForm}>
          <div>
            <label>البريد الإلكتروني:</label>
            <input
              type="email"
              name="email" 
              onChange={getUserData}
              required
            />
          </div>
          <div>
            <label>كلمة المرور:</label>
            <input
              type="password"
              name="password"
              onChange={getUserData}
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn btn-primary btn-block">
            {isLoading ? <i className='fas fa-spinner fa-spin'></i> : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </>
  );
}
