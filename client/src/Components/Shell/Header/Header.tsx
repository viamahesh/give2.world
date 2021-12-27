import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header: React.FC = () => {
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
    </header>
  );
};

export default Header;
