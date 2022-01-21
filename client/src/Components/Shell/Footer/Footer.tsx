import React from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../../../services/auth';

import './footer.css';

const Footer: React.FC = () => {
  const user: any = AuthService.getProfile();
  const isLoggedIn = AuthService.loggedIn();
  return (
    <footer>
      <div className="footer-container">
        <ul className="footer-menu">
          <li>
            <Link to="/">
              <i className="fas fa-home"></i>Home
            </Link>
          </li>
          <li>
            <Link to="/search">
              <i className="fas fa-heart"></i>Donate
            </Link>
          </li>
          <li>
            <Link to="/charity/add">
              <i className="fas fa-thumbs-up"></i>Add Charity
            </Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/user/sign-up">
                <i className="fas fa-user-plus"></i>Sign Up
              </Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
            <Link to="/user/login">
              <i className="fas fa-sign-in-alt"></i>Charity Login
            </Link>
          </li>
          )}
          <li>
            <i className="fas fa-address-card"></i>info@give2.world
          </li>
        </ul>
        <p className="copyright">
          <span>
            <em>Give2World</em> (c) 2015 - Forever
          </span>
          <span>
            Vector illustrations courtesy of <em>freepik.com</em>
          </span>
          <span>
            Website developed by <em>Mahesh Rodrigo</em>
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
