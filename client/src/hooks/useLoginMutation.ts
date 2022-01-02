import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
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

const useLoginMutation = () => {
  const [doLogin, { error }] = useMutation(LOGIN_USER);
  return {
    doLogin,
    error
  }
}

export default useLoginMutation;