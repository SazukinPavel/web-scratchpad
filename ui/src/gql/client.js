import { ApolloClient, InMemoryCache } from "@apollo/client";

export default new ApolloClient({
    uri: import.meta.env.VITE_API_URL + 'graphql',
    cache: new InMemoryCache(),
});
