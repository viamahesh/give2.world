import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

export const DELETE_REQUEST = gql`
mutation deleteRequest($id: ID!) {
  deleteRequest(_id: $id) {
    _id
  }
}
`;

const useDeleteRequestMutation = () => {
  let [doDeleteRequest] = useMutation(DELETE_REQUEST);
  return doDeleteRequest;
}

export default useDeleteRequestMutation;