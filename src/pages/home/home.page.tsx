import React, { useState } from 'react';
import CharactersTable from '../../components/characters-table/characters-table.component';
import { Character } from '../../common/interfaces/character.interface';
import { getCharacters } from '../../hooks/characters/getCharacters';
import { useGetCharactersQuery } from '../../graphql/__generated__/schema';

const Home: React.FC = () => {
  const characters: Character[] = [
    {
      id: 'test',
      name: 'test',
      height: 180,
      mass: 180,
      species: 'test',
      gender: 'Male',
      eyeColor: 'Blue',
      homeworld: 'test',
    },
    {
      id: 'test',
      name: 'Fray',
      height: 180,
      mass: 180,
      species: 'test',
      gender: 'Female',
      eyeColor: 'Brown',
      homeworld: 'test',
    },
  ];

  const [favoritCharsList, setFavoritCharsList] = useState<string[]>([]);
  // const data = getCharacters();
  // console.log(data);

  return (
    <div className="home">
      <CharactersTable
        characters={characters}
        favoritCharsList={favoritCharsList}
        setFavoritCharsList={setFavoritCharsList}
      />
    </div>
  );
  // return (
  //   <div className="App">
  //     {data && (
  //       <ul>
  //         {data.allPeople?.edges?.map(
  //           (e, i) => e?.node && <Film film={e?.node} key={`film-${i}`} />,
  //         )}
  //       </ul>
  //     )}
  //   </div>
  // );
};

export default Home;
