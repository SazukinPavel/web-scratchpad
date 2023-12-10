import {gql} from "@apollo/client";

export default gql`
  query list {
    list {
        id
        title
        description
        ownerId
        createdAt
        updatedAt
    }
  }
`;