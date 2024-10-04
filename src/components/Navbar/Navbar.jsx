import React from 'react';
import { Link } from 'react-router-dom'; 
import './Navbar.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/logo.png';

export default function Navbar({userData, logout}) {
  return (
    <>
      <header className="header">
        <div className="container">
          <div className="head-p">
          <img className="logo" src={logo} alt="Logo" />
          <p>
            <span>مقابر</span>
            <sub>أهالي الشوبك الغربي</sub>
            </p>
          </div>
        </div>
      </header>

      <nav className="nav">
        <div className="container">
          <div className="links">
          {userData ? (
  <ul>
    <li><Link to="/suggestions" title=" ادارة الاقتراحات"> ادارة الاقتراحات</Link></li>
    <li><Link to="/creategrave" title=" انشاء مقبرة">انشاء مقبرة</Link></li>
    <li><Link to="/register" title=" انشاء ادمن"> انشاء ادمن</Link></li>
    <li><Link to="/showgraves" title="عرض المقابر">  عرض المقابر </Link></li>
    <li><Link to="/articles" title="  المقالات">  المقالات</Link></li>
    <li className='cursor-pointer' onClick={logout}> تسجيل الخروج</li>
  </ul>
) : (
  <ul>
    <li>
      <Link to="/" className="disnone home" title="الرئيسية">
        <FontAwesomeIcon icon={faHome} />
      </Link>
      <Link to="/" className="toggle active " title="الرئيسية">الرئيسية</Link>
    </li>
    <li><Link to="/man" title="الرجال">الرجال</Link></li>
    <li><Link to="/woman" title="النساء">النساء</Link></li>
    <li><Link to="/bones" title="العظام">العظام</Link></li>
    <li><Link to="/suggest" title="اقتراحك">اقتراحك</Link></li>
    <li><Link to="/contact" title="  تواصل معنا">  تواصل معنا</Link></li>
    <li><Link to="/approved" title=" الاقتراحات المقبولة"> الاقتراحات المقبولة</Link></li>
    <li><Link to="/login" title="تسجيل الدخول">تسجيل الدخول</Link></li>
  </ul>
)}

           
          </div>
          <input type="text" id="sreech" placeholder="إبحث في الموقع" />
          <div className="sreech">
            <i className="fas fa-search toggle-sreech" title="بحث"></i>
          </div>
        </div>
      </nav>
    </>
  );
}
