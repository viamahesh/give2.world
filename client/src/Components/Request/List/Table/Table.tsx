import React, { useContext, useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";

import { CharityContext } from "../../../../providers";
import { QUERY_REQUESTS } from "../../../../hooks";

import "./table.css";

interface RequestItemInterface {
  _id: string;
  requestTitle: string;
  requestDescription: string;
  neededDate: string;
  isFulfilled: boolean;
  comments: any;
  charity_ID: string;
}

const Table = ({
  data,
  charityId,
}: {
  data: RequestItemInterface[];
  charityId: string | undefined;
}) => {
  const refetch = useContext(CharityContext) as any;
  // const doDeleteCharity = deleteCharityMutation();
  const [showError, setShowError] = useState(false);

  const onHandleDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm the action</h1>
            <p>Do you really want to delete this Charity and all it's data?</p>
            <button className="no-button" onClick={onClose}>
              No
            </button>
            <button
              onClick={async () => {
                try {
                  // await doDeleteCharity({
                  //   variables: {
                  //     id
                  //   },
                  //   refetchQueries: () => [
                  //     {
                  //       query: QUERY_REQUESTS,
                  //       variables: {
                  //         charity_ID: charityId
                  //       },
                  //     },
                  //   ],
                  // });
                  // setShowError(false);
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

  if(data.length === 0) {
    return (<div className="no-data-text"><i className="fas fa-hourglass-start"></i>No charities available, please add your charity to start the process.</div>);
  }

  return (
    <div className="charity-list-container">
      <table className="data-table charity-list">
        <thead>
          <tr>
            <th>Title</th>
            <th>Needed on or before</th>
            <th>Is fulfilled</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: RequestItemInterface) => {
            return (
              <tr key={item._id}>
                <td>{item.requestTitle}</td>
                <td>{item.neededDate}</td>
                <td>{item.isFulfilled}</td>
                <td>
                  {/* <ul className="action-menu">
                    <li>
                      <Link to={"/charity/edit/" + item._id}>
                        <i className="fas fa-pen-square"></i>Edit
                      </Link>
                    </li>
                    <li>
                      <a onClick={() => onHandleDelete(item._id)}>
                        <i className="fas fa-trash-alt"></i>Delete
                      </a>
                    </li>
                    <li>
                      <Link to={"/request/add/" + item._id}>
                      <i className="fas fa-tasks"></i>Manage Requests
                      </Link>
                    </li>
                  </ul> */}
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
