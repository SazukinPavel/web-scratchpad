import { gql } from "@apollo/client";

export default gql`
    mutation update($title: String!,$id:String!) {
        updateTopic(updateTopicInput: { title: $title, id: $id }) {
                id
                title
            }
    }
`;