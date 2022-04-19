import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Products from './components/Product/Products';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          product: {
            keyArgs: ["id"],
          },
        },
      },
    },
  }),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Products />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
