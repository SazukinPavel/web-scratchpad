import {gql} from "@apollo/client";

export default gql`
    mutation update($title: String!,$description: String!,$id:String!) {
        updateNote(updateNoteInput: { title: $title, description: $description, id: $id }) {
                id
                title
                description
                ownerId
                createdAt
                updatedAt
            }
    }
`;