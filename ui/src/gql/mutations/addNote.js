import { gql } from "@apollo/client";

export default gql`
  mutation add($title: String!, $description: String!, $topic: String!) {
    addNote(
      addNoteInput: { title: $title, description: $description, topic: $topic }
    ) {
      id
      title
      description
      ownerId
      createdAt
      updatedAt
    }
  }
`;
