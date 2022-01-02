import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation signUp($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    signUp(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
        email
      }
    }
  }
`;

const useSignUpMutation = () => {
  const [doSignUp, { error }] = useMutation(SIGN_UP_USER);
  return {
    doSignUp,
    error
  }
}

export default useSignUpMutation;