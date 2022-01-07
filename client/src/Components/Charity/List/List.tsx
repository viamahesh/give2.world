import React, { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../../providers';

import { Header, Footer } from '../../Shell';
import Table from './Table/Table';
import { charityListQuery } from '../../../hooks';
import { CharityProvider } from '../../../providers';

import './list.css';

const CharityList = () => {
  const { userData } = useContext(UserContext);
  let userId = null;
  if(userData !== null) {
    userId = userData.user._id
  }
  const { loading, error, data, refetch } = charityListQuery(userData?.user._id);
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
