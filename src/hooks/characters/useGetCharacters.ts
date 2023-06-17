import { gql, useQuery } from '@apollo/client';
import { Character } from '../../common/interfaces/character.interface';

import { graphql } from '../../../src/gql';

// const GET_CHARACTERS = gql`
//   query GetCharacters($options: PageQueryOptions!) {
//     characters(options: $options) {
//       allPeople {
//         people {
//           id
//           name
//           gender
//           height
//           mass
//           eyeColor
//           homeworld {
//             name
//           }
//           species {
//             name
//           }
//         }
//       }
//     }
//   }
// `;
// const GET_CHARACTERS = gql`
//   query {
//     allPeople {
//       people {
//         id
//         name
//         gender
//         height
//         mass
//         eyeColor
//         homeworld {
//           name
//         }
//         species {
//           name
//         }
//       }
//     }
//   }
// `;

export const PersonFragment = graphql(/* GraphQL */ `
  fragment PersonItem on Person {
    id
    name
    mass
    gender
    height
  }
`);

const allPeopleWithVariablesQueryDocument = graphql(/* GraphQL */ `
  query allPeopleWithVariablesQuery($first: Int!) {
    allPeople(first: $first) {
      edges {
        node {
          ...PersonItem
        }
      }
    }
  }
`);

// const GET_CHARACTERS = gql`
//   query {
//     allPeople {
//       people {
//         id
//         name
//         gender
//         height
//         mass
//         eyeColor
//         homeworld {
//           name
//         }
//         species {
//           name
//         }
//       }
//     }
//   }
// `;

// export const useGetCharacters = (): any[] | undefined => {
//   const { data } = useQuery(GET_CHARACTERS, {
//     variables: { options: { paginate: { page: 1, limit: 10 } } },
//   });
//   return data?.characters?.allPeople?.people;
// };

// export const useGetCharacters = (): any[] | undefined => {
//   const { data } = useQuery(allPeopleWithVariablesQueryDocument, {
//     variables: { first: 10 },
//   });

//   return data?.allPeople?.edges;
// };
