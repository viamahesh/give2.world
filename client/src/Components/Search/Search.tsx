import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import DataTable from 'react-data-table-component';
/*
 // @ts-ignore */
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

import { Header, Footer } from '../Shell';
import { Comment } from './Comment';
import { searchListQuery } from '../../hooks';

import './search.css';

const Search = () => {
  const { loading, error, data, refetch } = searchListQuery();
  const [showError, setShowError] = useState(false);
  const columns = [
    {
      name: 'Title',
      selector: 'requestTitle',
      sortable: true,
    },
    {
      name: 'Description',
      selector: 'requestDescription',
      sortable: true,
    },
    {
      name: 'Needed On',
      selector: 'neededDate',
      sortable: true,
    },
    {
      name: 'Charity',
      selector: 'charityData[0].charityName',
      sortable: true,
    },
    {
      name: 'City',
      selector: 'charityData[0].city',
      sortable: true,
    },
    {
      name: 'State',
      selector: 'charityData[0].state',
      sortable: true,
    },
    {
      name: 'Zip Code',
      selector: 'charityData[0].zipCode',
      sortable: true,
    },
    {
      name: 'Email',
      selector: 'charityData[0].email',
      sortable: true,
    },
    {
      name: 'Private Msg',
      selector: '',
      sortable: false,
      cell: (d: any) => {
      return (
        // <a onClick={() => onReplyClick(d._id)}><i className="fas fa-reply"></i></a>
        <Popup trigger={<i className="fas fa-reply"></i>} modal>
          {(close: any) => (
              <div className="comment-container">
            <p className="page-text">
              <span className="page-title">Send a message:</span> You are replying to {d.charityData[0].charityName} for request: {d.requestTitle}.
            </p>
            <Comment requestId={d._id} closeModal={close} />
            <em className="note-text">Your message is only visible to the charity administrator.</em>
            </div>
          )}
        </Popup>
      )
      }
    },
  ];

  const onReplyClick = (id: string) => {
    console.log(id);
  }

  if (loading) return <span className="loading-ani"></span>;

  const tableData = {
    columns,
    data: data.search,
    export: false,
    print: false,
    filterPlaceholder: 'Search table'
  };

  return (
    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="page-container">
          <p className="page-text">
            <span className="page-title">Donate goods to a charity:</span> Give
            2 World welcomes your donations of household goods, electronics,
            clothing and personal items. These generous contributions are
            offered to those who are struggling to make ends meet.
          </p>
          <p className="page-text">
            This section will display all the goods that are specifically
            requested or needed by recognized organizations. But if you are
            interested in supporting a local charity, you can use our search
            filters to find needy agencies within your local community.
          </p>
          <DataTableExtensions {...tableData}>
            <DataTable
              /*// @ts-ignore */
              columns={columns}
              data={data}
              noHeader
              defaultSortAsc={false}
              pagination
              highlightOnHover
            />
          </DataTableExtensions>
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

export default Search;
