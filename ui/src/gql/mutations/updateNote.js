import { gql } from "@apollo/client";

export default gql`
  mutation update($title: String!, $description: String!, $topic: String!, $id: String!) {
    updateNote(
      updateNoteInput: {
        title: $title
        description: $description
        topic: $topic
        id: $id
      }
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
