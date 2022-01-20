import { gql, useQuery } from '@apollo/client';

export const QUERY_CHARITY = gql`
  query charity ($id: ID!) {
    charity (_id: $id) {
      _id
      charityName
      missionStatement
      charityType
      address1
      address2
      city
      state
      zipCode
      contactPerson
      email
      phone
      website
    }
  }
`;

const useCharityQuery = (id : string | undefined) => {
  return useQuery(QUERY_CHARITY, {
    fetchPolicy: "network-only",
    variables: {
      id: id,
    },
  });
};

export default useCharityQuery;