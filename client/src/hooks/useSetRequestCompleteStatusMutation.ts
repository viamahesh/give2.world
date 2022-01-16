import { gql } from '@apollo/client';
import { useMutation } from "@apollo/client";

export const SET_REQUEST_COMPLETE_STATUS = gql`
  mutation setRequestCompleteStatus(
    $id: ID!
    $isFulfilled: Boolean!,
  ) {
    setRequestCompleteStatus (
      _id: $id
      isFulfilled: $isFulfilled
  ) {
      _id
    }
  }
`;

const useSetRequestCompleteStatusMutation = () => {
  let [doSetRequestCompleteStatus] = useMutation(SET_REQUEST_COMPLETE_STATUS);
  return doSetRequestCompleteStatus;
}

export default useSetRequestCompleteStatusMutation;