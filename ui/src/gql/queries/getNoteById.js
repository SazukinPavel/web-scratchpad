import {gql} from "@apollo/client";

export default gql`
    query One($id: String!) {
        one(id: $id) {
            id
            title
            description
            ownerId
            createdAt
            updatedAt
        }
    }
`;