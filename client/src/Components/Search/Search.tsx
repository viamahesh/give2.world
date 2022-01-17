import React, { useState } from 'react';

import { Header, Footer } from '../Shell';
import { searchListQuery } from '../../hooks';

const Search = () => {
  const { loading, error, data, refetch } = searchListQuery();
  const [showError, setShowError] = useState(false);

  console.log(data);

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
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
