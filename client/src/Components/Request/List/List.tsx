import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header, Footer } from '../../Shell';
import Table from './Table/Table';
import { charityQuery, requestListQuery } from '../../../hooks';
import { RequestProvider } from '../../../providers';

import './list.css';

const RequestList = () => {
  const { charityId } = useParams();
  const { loading, error, data, refetch } = requestListQuery(charityId);
  const { loading: charityLoading, data: charityData } = charityQuery(charityId);
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

  if (loading || charityLoading) return <span className='loading-ani'></span>;

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header breadcrumb={['Manage Requests']} />
        <div className="page-container">
          <p className="page-text">
            <span className="page-title">Manage Requests:</span> The list below shows all your
            requests and also the options to manage them.
          </p>
          {charityData.charity.charityName && (
            <p className="default-text">
              <i className="fas fa-desktop"></i>Your are managing requests of{" "}
              <span className="text-bold highlight-text">
                {charityData.charity.charityName}
              </span>
            </p>
          )}
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
