import { gql } from '@apollo/client';

export const ADD_CHARITY = gql`
  mutation addCharity(
    $charityName: String!,
    $missionStatement: String,
    $charityType: String,
    $address1: String,
    $address2: String,
    $city: String,
    $state: String,
    $zipCode: String,
    $contactPerson: String,
    $email: String,
    $phone: String,
    $website: String
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
      website: $website
    }
  ) {
      charityName,
      phone
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;