import gql from "graphql-tag";
import { useMutation } from "@apollo/client";

export const DELETE_CHARITY = gql`
mutation deleteCharity($id: ID!) {
  deleteCharity(_id: $id) {
    charityName,
    phone
  }
}
`;

const useDeleteCharityMutation = () => {
  let [doDeleteCharity] = useMutation(DELETE_CHARITY);
  return doDeleteCharity;
}

export default useDeleteCharityMutation;