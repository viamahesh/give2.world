import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../../../providers';
import AuthService from '../../../services/auth';

import './header.css';

interface Props {
  breadcrumb?: Array<string>;
}

const Header: React.FC<Props> = ({ breadcrumb }) => {
  const { userData, setUserData } = useContext(UserContext);
  const user: any = AuthService.getProfile();
  const isLoggedIn = AuthService.loggedIn();
  let firstName;
  if (user) {
    firstName = user.data.firstName;
  }
  
  const logout = () => {
    setUserData(null);
    AuthService.logout();
  }

  return (
    <header>
      <Link to="/charity/add" className="header-nav add-button">
        <span>
          <i className="fas fa-thumbs-up"></i>Add
        </span>
        <span>your charity to recieve stuff</span>
      </Link>
      <Link to="/donate" className="header-nav donate-button">
        <span>
          <i className="fas fa-heart"></i>Donate
        </span>
        <span>stuff to a near charity</span>
      </Link>
      <span className="logged-in-message">
        <i className="fas fa-user"></i>Welcome,{" "}
        <em onClick={logout}>
          {firstName ? (
            <>
              {firstName}
              <span className="logout">Logout</span>
            </>
          ) : (
            <Link to="/user/login">Log in</Link>
          )}
        </em>
      </span>
      {isLoggedIn && <nav>
        <ul className="breadcrumb">
          <li>
            <i className="fas fa-house-user"></i>
            <Link to="/charity/list">
              <span>
                Dashboard
              </span>
            </Link>
          </li>
          {breadcrumb && breadcrumb.map((item: string) => {
            return (
              <li>
                <i className="fas fa-caret-right"></i>
                <span>{item}</span>
              </li>
            )
            })
          }
        </ul>
      </nav>}
    </header>
  );
};

export default Header;
