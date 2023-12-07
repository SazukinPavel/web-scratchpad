import {ApolloClient, InMemoryCache} from "@apollo/client";

export default  new ApolloClient({
    uri: import.meta.env.VITE_API_URL,
    cache: new InMemoryCache(),
});
