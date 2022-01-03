import React from 'react';

import './table.css';

interface CharityItemInterface {
  charityName: string;
  city: string;
  state: string;
  contactPerson: string;
  email: string;
  phone: string;
}

const Table = ({ data }: { data: CharityItemInterface[] }) => {
  console.log(data);
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
            <tr key={item.email}>
              <td>{item.charityName}</td>
              <td>{item.city}</td>
              <td>{item.state}</td>
              <td>{item.contactPerson}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>actions</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default Table;
