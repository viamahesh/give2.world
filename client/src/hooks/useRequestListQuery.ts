import { gql, useQuery } from '@apollo/client';

export const QUERY_REQUESTS = gql`
  query requests ($charity_ID: String) {
    requests (charity_ID: $charity_ID) {
      _id
      requestTitle
      requestDescription
      neededDate
      isFulfilled
      comments {
        _id
        message
        donorName
        donorPhone
        donorEmail
      }
      charity_ID
    }
  }
`;

const useRequestListQuery = (charity_ID : string | undefined) => {
  return useQuery(QUERY_REQUESTS, {
    fetchPolicy: "network-only",
    variables: {
      charity_ID,
    },
  });
};

export default useRequestListQuery;