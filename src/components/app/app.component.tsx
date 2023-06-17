import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header/header.component';
import Home from '../../pages/home/home.page';

import '../../common/styles';
import './app.component.css';
import { ApolloProvider } from '@apollo/client';
import client from '../../common/apollo-client';

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characters" element={<Home />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;
