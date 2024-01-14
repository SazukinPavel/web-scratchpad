import {gql} from "@apollo/client";

export default gql`
    query list($topic: String) {
        notesList(topic: $topic) {
        id
        title
        description
        createdAt
        updatedAt
    }
  }
`;