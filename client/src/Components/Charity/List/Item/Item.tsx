import React from 'react';

const ListItem = ({ row }: { row: any}) => {
  return (
    <tr>
      <td>{row.charityName}</td>
    </tr>
  )
}

export default ListItem;
