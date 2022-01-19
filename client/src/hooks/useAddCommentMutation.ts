import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment(
    $requestId: ID!, $message: String!, $donorName: String!, $createdAt: String!
  ) {
    addComment (
      requestId: $requestId,
      message: $message,
      donorName: $donorName
      createdAt: $createdAt
  ) {
    _id
    }
  }
`;

const useAddCommentMutation = () => {
  const [doAddComment, { error }] = useMutation(ADD_COMMENT);
  return {
    doAddComment,
    error
  }
}

export default useAddCommentMutation;