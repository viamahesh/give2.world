import { gql, useQuery } from '@apollo/client';

export const QUERY_SEARCH = gql`
  query search {
    search {
      _id
      requestTitle
      requestDescription
      neededDate
      createdAt
      charityData {
        charityName
        city
        state
        zipCode
        email
      }
    }
  }
`;

const useSearchListQuery = () => {
  return useQuery(QUERY_SEARCH, {
    fetchPolicy: "network-only"
  });
};

export default useSearchListQuery;