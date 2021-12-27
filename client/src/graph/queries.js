import { gql } from '@apollo/client';

export const QUERY_CHARITIES = gql`
  query charities {
    charities {
      charityName
    }
  }
`;