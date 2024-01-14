import {gql} from "@apollo/client";

export default gql`
  query list {
    topicsList {
        id
        title
    }
  }
`;