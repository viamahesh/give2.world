import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

export const ADD_REQUEST = gql`
  mutation addRequest(
    $requestTitle: String!,
    $requestDescription: String!,
    $neededDate: String,
    $isFulfilled: Boolean!,
    $comments: [CommentInput],
    $charity_ID: String!,
  ) {
    addRequest (
      requestTitle: $requestTitle,
      requestDescription: $requestDescription,
      neededDate: $neededDate,
      isFulfilled: $isFulfilled,
      comments: $comments,
      charity_ID: $charity_ID
  ) {
    requestTitle
    }
  }
`;

const useAddRequestMutation = () => {
  const [doAddRequest, { error }] = useMutation(ADD_REQUEST);
  return {
    doAddRequest,
    error
  }
}

export default useAddRequestMutation;