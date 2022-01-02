import { gql, useQuery } from '@apollo/client';

export const QUERY_CHARITIES = gql`
  query charities {
    charities {
      charityName
      city
      state
      contactPerson
      email
      phone
    }
  }
`;

const useCharityListQuery = () => {
  return useQuery(QUERY_CHARITIES, {
    fetchPolicy: "network-only"
  });
};

export default useCharityListQuery;