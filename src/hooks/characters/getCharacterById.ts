import {
  useGetCharacterByIdLazyQuery,
  InputMaybe,
  GetCharacterByIdQueryHookResult,
} from '../../graphql/__generated__/schema';
import { Character } from '../../common/interfaces/character.interface';

export const processCharacterData = (
  data: GetCharacterByIdQueryHookResult,
): Character => {
  const person = data && data.data?.person;
  const character = {
    ...person,
    homeworld:
      person?.homeworld?.name === undefined ? '-' : person?.homeworld?.name,
    species: person?.species?.name === undefined ? '-' : person?.species?.name,
    mass: person?.mass === undefined ? '-' : person?.mass,
    gender: person?.gender === undefined ? '-' : person?.gender,
    height: person?.height === undefined ? '-' : person?.height,
    eyeColor: person?.eyeColor === undefined ? '-' : person?.eyeColor,
    name: person?.name === undefined ? '-' : person?.name,
    films:
      person?.filmConnection?.films === undefined
        ? '-'
        : person?.filmConnection?.films?.map((v) => v?.title),
  };
  return character as Character;
};

export const getCharacterByIdLazy = () => {
  const [getCharacterById] = useGetCharacterByIdLazyQuery();

  return async (
    id: InputMaybe<string | number> | undefined,
  ): Promise<Character> => {
    const data = await getCharacterById({ variables: { personID: id } });
    console.log(data);
    const char = processCharacterData(data);
    console.log('lazy:', char);
    return char;
  };
};
