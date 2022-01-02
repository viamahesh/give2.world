import React from "react";

import { Header, Footer } from "../../Shell";
import { charityList } from "../../../hooks";
// import ListItem from './Item/Item';
// import { CharityProvider } from "../../../providers";

import "./list.css";

const CharityList = () => {
  const { loading, error, data, refetch } = charityList();
  console.log(loading);
  console.log(error);
  console.log(data);
  // const onRefetch = () => {
  //   refetch();
  // };

  // if (loading) return "Loading...";
  // if (error) return `Error! ${error.message}`;

  return (
  
    <div className="framesheet">
      <div className="wrapper">
        <Header />
        <div className="page-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {/* <CharityProvider value={() => onRefetch()}>
                
             {data.allPets.map((item: any) => {
                
                  <ListItem row={item} />

              })}
              </CharityProvider> */}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
    
  );
};

export default CharityList;
