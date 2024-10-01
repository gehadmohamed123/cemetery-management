import React from 'react';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import './Layout.css'

export default function Layout({ userData, setUserData }) {
  let navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login');
  }

  return (
    <>
      <Navbar logout={logout} userData={userData} />
      <div className="content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
