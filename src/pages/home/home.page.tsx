import React from 'react';
import CharactersGrid from '../../components/characters-grid/characters-grid.components';
import { Character } from '../../common/interfaces/character.interface';

const Home: React.FC = () => {
  const characters: Character[] = [
    {
      id: 'test',
      name: 'test',
      height: 180,
      mass: 180,
      species: 'test',
      gender: 'test',
      eyeColor: 'test',
      homeworld: 'test',
    },
  ];

  return (
    <div className="home">
      <CharactersGrid characters={characters} />
    </div>
  );
};

export default Home;
