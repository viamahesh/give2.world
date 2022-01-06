import React, { useContext, useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Link } from 'react-router-dom';

import { CharityContext } from "../../../../providers";
import { deleteCharityMutation } from '../../../../hooks';

import './table.css';
import { gql, useMutation } from '@apollo/client';

interface CharityItemInterface {
  _id: string;
  charityName: string;
  city: string;
  state: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export const DELETE_CHARITY = gql`
mutation deleteCharity($id: ID!) {
  deleteCharity(_id: $id) {
    charityName,
    phone
  }
}
`;

export const QUERY_CHARITIES = gql`
  query charities ($owner_ID: String) {
    charities (owner_ID: $owner_ID) {
      _id
      charityName
      city
      state
      contactPerson
      email
      phone
      owner_ID
    }
  }
`;

const Table = ({ data, userId }: { data: CharityItemInterface[], userId: string | null }) => {
  const refetch = useContext(CharityContext) as any;
  console.log(refetch);
  const doDeleteCharity = deleteCharityMutation();
  // const [showError, setShowError] = useState(false);
  
  // useEffect(() => {
  //   if (error) {
  //     setShowError(true);
  //   } else {
  //     setShowError(false);
  //   }
  // }, [error]);

  const onHandleDelete = (id: string) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Confirm the action</h1>
            <p>Do you really want to delete this Charity and all it's data?</p>
            <button className="no-button" onClick={onClose}>No</button>
            <button
              onClick={() => {
                let values = {
                  id
                }
              
                doDeleteCharity({
                  variables: {
                    ...values
                  },
                  refetchQueries: () => [{
                    query: QUERY_CHARITIES,
                    variables: {
                      owner_ID: userId,
                    },
                  }]
                })
                .then((_) => {
                  refetch();
                })
                .catch((e) => console.log(e));
                onClose();
              }}
              className="yes-button"
            >
              Yes, Delete it!
            </button>
          </div>
        );
      }
    });
  }

  return (
    <table className="data-table charity-list">
      <thead>
        <tr>
          <th>Charity Name</th>
          <th>City</th>
          <th>State</th>
          <th>Contact Person</th>
          <th>Email</th>
          <th>Phone</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item: CharityItemInterface) => {
          return (
            <tr key={item._id}>
              <td>{item.charityName}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.contactPerson}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>
                <ul className="action-menu">
                  <li>
                    <Link to={'/charity/manage/' + item._id}>
                      <i className="fas fa-pen-square"></i>Edit
                    </Link>
                  </li>
                  <li>
                    <button onClick={() => onHandleDelete(item._id)}>
                      <i className="fas fa-trash-alt"></i>Delete
                    </button>
                  </li>
                  <li>
                    <Link to="/charity/add">
                      <i className="fas fa-hand-paper"></i>Request Stuff
                    </Link>
                  </li>
                </ul>
                {/* {showError && (
                  <span className="error-text">
                    <i className="fas fa-exclamation-circle"></i>
                    Operation failed. Please try again
                  </span>
                )} */}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
