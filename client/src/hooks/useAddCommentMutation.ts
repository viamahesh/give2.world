import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment(
    $requestId: String!, $message: String!, $donorName: String!
  ) {
    addComment (
      requestId: $requestId,
      message: $message,
      donorName: $donorName
  ) {
    requestTitle
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