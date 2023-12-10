import {gql} from "@apollo/client";

export default gql`
  mutation deleteNote($id: String!) {
        delete(id:$id )
  }
`;