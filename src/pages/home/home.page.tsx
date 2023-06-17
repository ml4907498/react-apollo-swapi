import React, { useState } from 'react';
import CharactersTable from '../../components/characters-table/characters-table.component';
import { Character } from '../../common/interfaces/character.interface';
// import { useGetCharacters } from '../../hooks/characters/useGetCharacters';

import { graphql } from '../../../src/gql';
import { useQuery } from '@apollo/client';
import Film from './film';

const Home: React.FC = () => {
  // const chars = useGetCharacters();
  // console.log(chars);

  // const allFilmsWithVariablesQueryDocument = graphql(/* GraphQL */ `
  //   query allFilmsWithVariablesQuery($first: Int!) {
  //     allPeople(first: $first) {
  //       edges {
  //         node {
  //           ...PersonItem
  //         }
  //       }
  //     }
  //   }
  // `);
  // const { data } = useQuery(allFilmsWithVariablesQueryDocument, {
  //   variables: { first: 10 },
  // });

  // console.log(data);
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
