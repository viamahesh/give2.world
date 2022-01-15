import React, { useContext, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

import { DisplayDate } from '../../../Shared';
import { RequestContext } from '../../../../providers';
import { QUERY_REQUESTS, deleteRequestMutation } from '../../../../hooks';

import './table.css';

interface RequestItemInterface {
  _id: string;
  requestTitle: string;
  requestDescription: string;
  neededDate: string;
  isFulfilled: boolean;
  comments: any;
  charity_ID: string;
  createdAt: string;
}

const Table = ({
  data,
  charityId,
}: {
  data: RequestItemInterface[];
  charityId: string | undefined;
}) => {
  const refetch = useContext(RequestContext) as any;
  const doDeleteRequest = deleteRequestMutation();
  const [showError, setShowError] = useState(false);

  const onHandleDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm the action</h1>
            <p>Do you really want to delete this Request and all it's comments?</p>
            <button className="no-button" onClick={onClose}>
              No
            </button>
            <button
              onClick={async () => {
                try {
                  await doDeleteRequest({
                    variables: {
                      id
                    },
                    refetchQueries: () => [
                      {
                        query: QUERY_REQUESTS,
                        variables: {
                          charityId,
                        },
                      },
                    ],
                  });
                  setShowError(false);
                  refetch();
                } catch (error) {
                  setShowError(true);
                }
                onClose();
              }}
              className="yes-button"
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  if (data.length === 0) {
    return (
      <div className="no-data-text">
        <i className="fas fa-hourglass-start"></i>No charities available, please
        add your charity to start the process.
      </div>
    );
  }

  return (
    <div className="request-list-container">
      <table className="data-table request-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Needed on or before</th>
            <th>Added on</th>
            <th>Completed</th>
            <th className="text-center">
              <Link to={"/request/add/" + charityId}>
                <span className="new-btn"><i className="fas fa-plus"></i>Add a request</span>
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: RequestItemInterface) => {
            return (
              <tr key={item._id}>
                <td>{item.requestTitle}</td>
                <td>{item.neededDate}</td>
                <td><DisplayDate dateString={item.createdAt}/></td>
                <td>{item.isFulfilled === true ? "Yes" : "No"}</td>
                <td>
                  <ul className="action-menu">
                  <li>
                      <Link to={"/charity/edit/" + item._id}>
                        <i className="fas fa-check-square"></i>Mark as complete
                      </Link>
                    </li>
                    <li>
                      <a onClick={() => onHandleDelete(item._id)}>
                        <i className="fas fa-trash-alt"></i>Delete
                      </a>
                    </li>
                  </ul>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {showError && (
        <span className="error-text">
          <i className="fas fa-exclamation-circle"></i>
          Operation failed. Please try again
        </span>
      )}
    </div>
  );
};

export default Table;
