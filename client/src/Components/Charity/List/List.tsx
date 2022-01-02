import React from 'react';

import { Header, Footer } from '../../Shell';

import './list.css';

const CharityList = () => {
  return (

    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="page-container">
        <table className="data-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Points</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Dom</td>
            <td>6000</td>
        </tr>
        <tr>
            <td>Melissa</td>
            <td>5150</td>
        </tr>
    </tbody>
</table>
        </div>
      </div>
      <Footer />
    </div>





  );
}

export default CharityList;