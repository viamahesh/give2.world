import React from 'react';

const DisplayDate = ({ dateString }: { dateString: string }) => {
  const getFormattedDate = (dateString: string) => {
    let date = new Date(Number(dateString));
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();
    month = (month < 10 ? '0' : '') + month;
    day = (day < 10 ? '0' : '') + day;
    return month + '-' + day + '-' + date.getFullYear();
  }
  return (
    <>{getFormattedDate(dateString)}</>
  );
}

export default DisplayDate;