import {gql} from "@apollo/client";

export default gql`
    mutation add($title: String!,$description: String!) {
        add(addNoteInput: { title: $title, description: $description }) {
            id
            title
            description
            ownerId
            createdAt
            updatedAt
        }
    }
`;