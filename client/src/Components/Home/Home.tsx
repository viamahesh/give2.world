import React from 'react';

import { Header, Footer } from '../Shell';

import './home.css';

const Home: React.FC = () => {
  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="main-banner-container">
          <div>
            <h2>Creating a better world starts with people who care</h2>
            <p>
              Your generous contributions help thousands of children, women, men
              and elderly in need every day. Please go through our site to find
              ways to help them by donating goods.
            </p>
            <span className="donate-now-button">
              <a href="#"></a>
            </span>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
