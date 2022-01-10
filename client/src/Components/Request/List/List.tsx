import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header, Footer } from '../../Shell';
import Table from './Table/Table';
import { requestListQuery } from '../../../hooks';
import { RequestProvider } from '../../../providers';

import './list.css';

const RequestList = () => {
  const { charityId } = useParams();
  const { loading, error, data, refetch } = requestListQuery(charityId);
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
          <RequestProvider value={() => onRefetch()}>
            <Table data={data.requests} charityId={charityId} />
          </RequestProvider>
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

export default RequestList;
