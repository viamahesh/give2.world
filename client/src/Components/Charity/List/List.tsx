import React, { useEffect, useState } from 'react';

import { Header, Footer } from '../../Shell';
import Table from './Table/Table';
import { charityList } from '../../../hooks';
import { CharityProvider } from '../../../providers';

import './list.css';

const CharityList = () => {
  const { error, data, refetch } = charityList();
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (error) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [error]);

  const onRefetch = () => {
    refetch();
  };

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="page-container">
          <CharityProvider value={() => onRefetch()}>
            <Table data={data.charities} />
          </CharityProvider>
          {showError && (
            <span className="error-text">
              <i className="fas fa-exclamation-circle"></i>
              Operation failed. Please try again
            </span>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CharityList;
