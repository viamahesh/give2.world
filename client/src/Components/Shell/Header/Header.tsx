import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../../../providers";

import "./header.css";

const Header: React.FC = () => {
  const { userData } = useContext(UserContext);

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
        <em>{userData ? <>{userData.user.username}<span className="logout">Logout</span></> : "Log in"}</em>
      </span>
    </header>
  );
};

export default Header;
