import { gql, useQuery } from '@apollo/client';

export const QUERY_SEARCH = gql`
  query search {
    search {
      _id
      charityName
      city
      state
      zipCode
      email
      requestTitle
      requestDescription
      neededDate
      createdAt
    }
  }
`;

const useSearchListQuery = () => {
  return useQuery(QUERY_SEARCH, {
    fetchPolicy: "network-only"
  });
};

export default useSearchListQuery;