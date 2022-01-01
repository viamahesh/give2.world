import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

export const SIGN_UP_USER = gql`
  mutation signUp($username: String!, $email: String!, $password: String!) {
    signUp(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
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