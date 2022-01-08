import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

export const ADD_CHARITY = gql`
  mutation addCharity(
    $charityName: String!,
    $missionStatement: String,
    $charityType: String,
    $address1: String!,
    $address2: String,
    $city: String!,
    $state: String!,
    $zipCode: String!,
    $contactPerson: String!,
    $email: String!,
    $phone: String!,
    $website: String,
    $owner_ID: String!,
  ) {
    addCharity (charityData: {
      charityName: $charityName,
      missionStatement: $missionStatement,
      charityType: $charityType,
      address1: $address1,
      address2: $address2,
      city: $city,
      state: $state,
      zipCode: $zipCode,
      contactPerson: $contactPerson,
      email: $email,
      phone: $phone,
      website: $website,
      owner_ID: $owner_ID
    }
  ) {
      charityName
    }
  }
`;

const useAddCharityMutation = () => {
  const [doAddCharity, { error }] = useMutation(ADD_CHARITY);
  return {
    doAddCharity,
    error
  }
}

export default useAddCharityMutation;