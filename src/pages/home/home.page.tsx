import React from 'react';
import CharactersTable from '../../components/characters-table/characters-table.component';
import './home.page.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <CharactersTable />
    </div>
  );
};

export default Home;
