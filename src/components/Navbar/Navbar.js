import React, { useState } from 'react';
import "./navbar.css"
import { MenuItem } from './MenuItem';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  }

  return (
    <nav className='NavbarItems'>
        <Link to='/'><h1 className='navbar-logo'>EasyAsso</h1></Link> 
      <div className='menu-icons'>
        <i className={clicked ? 'fas fa-times' :"fas fa-bars" } onClick={handleClick}> </i>
      </div>
      <ul className={clicked ? "nav-menu active": "nav-menu" }>
        {MenuItem.map((item, index) => (
          <li key={index}>
            <Link className={item.cName} to={item.url}>
              <i className={item.icon}></i>
              {item.title}
            </Link>
          </li>
        ))}
        <Link to="/registre">
           <button to>Sign up</button>
        </Link>
       
      </ul>
    </nav>
  )
}