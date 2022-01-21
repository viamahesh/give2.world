import { gql, useQuery } from '@apollo/client';

export const QUERY_CHARITY_OWNER = gql`
  query charityOwner ($id: ID!) {
    charityOwner (_id: $id) {
      _id
      firstName
      lastName
      email
    }
  }
`;

const useCharityOwnerQuery = (id : string | undefined) => {
  return useQuery(QUERY_CHARITY_OWNER, {
    fetchPolicy: "network-only",
    variables: {
      id: id,
    },
  });
};

export default useCharityOwnerQuery;