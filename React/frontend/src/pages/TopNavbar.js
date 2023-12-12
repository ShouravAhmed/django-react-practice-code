import './TopNavbar.css'

import ArrowIcon from './icons/arrow-icon.png';
import UserIcon from './icons/user-icon.png';
import BrandLogo from './icons/brand-logo.png';

import {Link} from 'react-router-dom';


import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const  TopNavbar = () => {
  const {authData} = useContext(AuthContext); 
  const {user} = authData;

  console.log("topnav bar: ", user);
  
  return (
    <div>
      <div className="top-navbar">
        <div className="top-navbar-left">
          <img src={ArrowIcon} alt="Back Arrow" className="top-navbar-back-button"/>
          <Link to="/" className="top-navbar-icon-and-brand">
            <img src={BrandLogo} alt="brand" className="top-navbar-brand-icon"/>
            <span className="top-navbar-brand-name">
              <span className="bold">Al</span>
              <span className="light">pona</span>
            </span>
          </Link>
        </div>
        <Link to={user ? "/profile" : "/login"} className="top-navbar-right">
          {
            user ? (
              <span className="top-navbar-user-username">Hi, {user.full_name ? (user.full_name.split(' ')[0]).slice(0, 9) : 'User'}</span>
            ) : (
              <span className="top-navbar-login-button">Login</span>
            )
          }
          <img src={UserIcon} alt="User" className="top-navbar-user-icon"/>
        </Link>
      </div>
      <div className='navbar-bottom'></div>
    </div>
  )
}

