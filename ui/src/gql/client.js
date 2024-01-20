import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import store from "../store/index.js";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL + "graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const getToken = () => {
  return store.getState().auth.token;
};

store.subscribe(getToken);
