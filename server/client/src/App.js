import React, { Component } from 'react';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="app">
          <h1>Book App</h1>
          <BookList />
          <br/><hr/><br/>
          <AddBook/>
        </div>
      </ApolloProvider>
    ); 
  }
}
export default App;
