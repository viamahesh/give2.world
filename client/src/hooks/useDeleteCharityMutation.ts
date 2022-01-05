import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

// export const DELETE_CHARITY = gql`
//   mutation deleteCharity($id: ID!) {
//     deleteCharity(_id: $id) {
//       charityName
//     }
//   }
// `;


export const DELETE_CHARITY = gql`
mutation deleteCharity($id: ID!) {
  deleteCharity(_id: $id) {
    charityName,
    phone
  }
}
`;

const useDeleteCharityMutation = () => {
  const [doDeleteCharity, { error }]  = useMutation(DELETE_CHARITY);
  return {
    doDeleteCharity,
    error
  }
}

export default useDeleteCharityMutation;