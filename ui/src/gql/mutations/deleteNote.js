import { gql } from "@apollo/client";

export default gql`
  mutation deleteNote($id: String!) {
    deleteNote(id: $id)
  }
`;
