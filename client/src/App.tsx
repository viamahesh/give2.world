import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import PrivateRoute from "./Components/Shared/PrivateRoute";

import { AddCharity } from "./Components/Charity";
import { Home } from "./Components/Home";
import { Login, Signup } from "./Components/User";
import UserProvider from "./providers";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "http://localhost:3001/graphql ",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/charity/add" element={<PrivateRoute />}>
              <Route path="/charity/add" element={<AddCharity />} />
            </Route>
            <Route path="/user/login" element={<Login />}></Route>
            <Route path="/user/sign-up" element={<Signup />}></Route>
          </Routes>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
};

export default App;
