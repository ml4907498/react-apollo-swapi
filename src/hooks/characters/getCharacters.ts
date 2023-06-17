import {
  useGetCharactersQuery,
  useGetCharactersLazyQuery,
  GetCharactersQueryHookResult,
} from '../../graphql/__generated__/schema';
import { Character } from '../../common/interfaces/character.interface';

export const getCharacters = (): Character[] => {
  const data = useGetCharactersQuery({ variables: { first: 10 } });
  return processCharactersData(data);
};

export const getCharactersLazy = () => {
  const [getCharacters] = useGetCharactersLazyQuery();

  return async (): Promise<Character[]> => {
    const data = await getCharacters({ variables: { first: 10 } });
    // console.log(data);
    const charList = processCharactersData(data);
    // console.log('lazy:', char);
    return charList;
  };
};

const processCharactersData = (
  data: GetCharactersQueryHookResult,
): Character[] => {
  const characters: Character[] = [];

  data &&
    data.data?.allPeople?.edges?.map((e, i) => {
      const node = e?.node;
      // console.log(node);
      const character = {
        ...node,
        homeworld:
          node?.homeworld?.name === undefined ? '-' : node?.homeworld?.name,
        species: node?.species?.name === undefined ? '-' : node?.species?.name,
        mass: node?.mass === undefined ? '-' : node?.mass,
        gender: node?.gender === undefined ? '-' : node?.gender,
        height: node?.height === undefined ? '-' : node?.height,
        eyeColor: node?.eyeColor === undefined ? '-' : node?.eyeColor,
        name: node?.name === undefined ? '-' : node?.name,
      };
      characters.push(character as Character);
    });

  return characters;
};
