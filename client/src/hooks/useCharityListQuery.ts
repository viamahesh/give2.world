import { gql, useQuery } from '@apollo/client';

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

const useCharityListQuery = (owner_ID : string | undefined) => {
  return useQuery(QUERY_CHARITIES, {
    fetchPolicy: "network-only",
    variables: {
      owner_ID,
    },
  });
};

export default useCharityListQuery;