import React from 'react';
import logo from '../assets/img/bp4.png';

export const Header = () => {
  return (
    <section className='header-wrapper'>
      <div className='logo'>
        <img src={logo} alt='publictext' />
      </div>
    </section>
  );
};
