import {gql} from "@apollo/client";

export default gql`
    query One($id: String!) {
        oneNote(id: $id) {
            id
            title
            description
            ownerId
            createdAt
            updatedAt
        }
    }
`;