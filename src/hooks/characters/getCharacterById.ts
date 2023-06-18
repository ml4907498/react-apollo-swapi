import {
  useGetCharacterByIdLazyQuery,
  InputMaybe,
  GetCharacterByIdQueryHookResult,
  useGetCharacterByIdQuery,
} from '../../graphql/__generated__/schema';
import { Character } from '../../common/interfaces/character.interface';

const processCharacterData = (
  data: GetCharacterByIdQueryHookResult,
): Character => {
  const person = data && data.data?.person;
  const character = {
    ...person,
    homeworld: person?.homeworld?.name ?? '-',
    species: person?.species?.name ?? '-',
    mass: person?.mass ?? '-',
    gender: person?.gender ?? '-',
    height: person?.height ?? '-',
    eyeColor: person?.eyeColor ?? '-',
    name: person?.name ?? '-',
    films: person?.filmConnection?.films?.map((v) => v?.title) ?? '-',
  };
  return character as Character;
};

export const getCharacterByIdLazy = () => {
  const [getCharacterById] = useGetCharacterByIdLazyQuery();

  return async (
    id: InputMaybe<string | number> | undefined,
  ): Promise<Character> => {
    const data = await getCharacterById({ variables: { personID: id } });
    // console.log(data);
    const char = processCharacterData(data);
    // console.log('lazy:', char);
    return char;
  };
};

// export const getCharacterByIdList = (
//   ids: InputMaybe<string | number>[] | undefined,
// ): Character[] => {
//   const characters: Character[] = [];
//   ids?.map((id) => {
//     const data = useGetCharacterByIdQuery({ variables: { personID: id } });
//     const char = processCharacterData(data);
//     characters.push(char);
//   });
//   return characters;
// };
