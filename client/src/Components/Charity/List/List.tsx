import React, { useContext, useEffect, useState } from 'react';

import { Header, Footer } from '../../Shell';
import Table from './Table/Table';
import { charityListQuery } from '../../../hooks';
import { CharityProvider } from '../../../providers';

import AuthService from '../../../services/auth';

import './list.css';

const CharityList = () => {
  const user: any = AuthService.getProfile();
  const userId = user.data._id;
  const { loading, error, data, refetch } = charityListQuery(userId);
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

  if (loading) return <span className='loading-ani'></span>;

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="page-container">
          <CharityProvider value={() => onRefetch()}>
            <Table data={data.charities} userId={userId} />
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
