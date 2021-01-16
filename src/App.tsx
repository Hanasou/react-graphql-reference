import React from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';

import Users from './components/Users';
import UsersForm from './components/UsersForm';

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Users />
        <UsersForm />
      </div>
    </ApolloProvider>
    
  );
}

export default App;
