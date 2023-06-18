import {
  useGetCharactersQuery,
  useGetCharactersLazyQuery,
  GetCharactersQueryHookResult,
  GetCharactersQuery,
} from '../../graphql/__generated__/schema';
import { Character } from '../../common/interfaces/character.interface';

export const getCharacters = (): Character[] => {
  const data = useGetCharactersQuery({ variables: { first: 10 } });
  return processCharactersData(data);
};

export const getCharactersLazy = () => {
  const [getData, data] = useGetCharactersLazyQuery();
  // fetchMore({ variables: { after: 'YXJyYXljb25uZWN0aW9uOjk=' } }).then(
  //   (data) => {
  //     console.log('fetchmore:', data);
  //   },
  // );

  const getCharacters = () => {
    getData({ variables: { first: 20, after: null } });
  };

  const fetchMoreData = () => {
    const endCursor = data.data?.allPeople?.pageInfo?.endCursor;
    const hasNextPage = data.data?.allPeople?.pageInfo?.hasNextPage;
    if (hasNextPage) {
      data.fetchMore({
        variables: {
          first: 10,
          after: endCursor,
        },
        updateQuery: (prevResult: GetCharactersQuery, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;

          const resData = {
            allPeople: {
              ...prevResult.allPeople,
              edges: [
                ...(prevResult.allPeople?.edges ?? []),
                ...(fetchMoreResult.allPeople?.edges ?? []),
              ],
              pageInfo: fetchMoreResult.allPeople?.pageInfo,
            },
          };

          return resData as GetCharactersQuery;
        },
      });
    } else {
      console.log('No more data!');
    }
  };

  return { getCharacters, fetchMoreData, data };
};

export const processCharactersData = (
  data: GetCharactersQueryHookResult,
): Character[] => {
  const characters: Character[] = [];

  data &&
    data.data?.allPeople?.edges?.map((v) => {
      const node = v?.node;
      const character = {
        id: node?.id,
        homeworld: node?.homeworld?.name ?? '-',
        species: node?.species?.name ?? '-',
        mass: node?.mass ?? '-',
        gender: node?.gender ?? '-',
        height: node?.height ?? '-',
        eyeColor: node?.eyeColor ?? '-',
        name: node?.name ?? '-',
        films: node?.filmConnection?.films?.map((v) => v?.title) ?? '-',
      };
      characters.push(character as Character);
    });

  return characters;
};
