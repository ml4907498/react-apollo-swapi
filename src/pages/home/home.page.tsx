import React, { useState } from 'react';
import CharactersTable from '../../components/characters-table/characters-table.component';
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
    {
      id: 'test',
      name: 'Fray',
      height: 180,
      mass: 180,
      species: 'test',
      gender: 'test',
      eyeColor: 'test',
      homeworld: 'test',
    },
  ];

  const [favoritCharsList, setFavoritCharsList] = useState<string[]>(['Fray']);

  return (
    <div className="home">
      <CharactersTable
        characters={characters}
        favoritCharsList={favoritCharsList}
        setFavoritCharsList={setFavoritCharsList}
      />
    </div>
  );
};

export default Home;
