import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
      <p>جميع الحقوق محفوظة لأهالي قرية الشوبك الغربي </p>
      <div className='info'> 
        <div className='back'>
        <h4>  Hussein Sabry</h4>
        <p>
          : Email{' '}<br/>
          <a href="mailto:sabryhusseinhussein@gmail.com">
            sabryhusseinhussein@gmail.com
          </a>
        </p>
        <p> Phone: 01096586823</p>
        <p>   Backend Developer & Tester </p>
        </div>
     <div className='design'>
<h4>Reda Abdelwahed</h4>    
   <p> Phone: +02 01554528592</p>
   <p>UI Designer</p>
     </div>
       <div className='front'>
       <h4>Gehad Mohamed</h4>
       <p>
           :Email{' '}<br/>
          <a href="mailto:gehadmo157@gmail.com">
         gehadmo157@gmail.com          </a>
        </p>
        <p>FrontEnd Developer</p>
       </div>
       
      </div>  
      </div>
    </div>
  );
}
