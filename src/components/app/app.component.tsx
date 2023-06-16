import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from '../header/header.component';
import Home from '../../pages/home/home.page';

import '../../common/styles';
import './app.component.css';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/characters" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
