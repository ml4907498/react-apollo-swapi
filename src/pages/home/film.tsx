import { FragmentType, useFragment } from '../../gql/fragment-masking';
import { graphql } from '../../../src/gql';
import React from 'react';

export const PersonFragment = graphql(/* GraphQL */ `
  fragment PersonItem on Person {
    id
    name
    mass
    gender
    height
  }
`);

const Film = (props: {
  /* `film` property has the correct type 🎉 */
  film: FragmentType<typeof PersonFragment>;
}) => {
  const film = useFragment(PersonFragment, props.film);
  return (
    <div>
      <h3>{film.name}</h3>
      <p>{film.gender}</p>
    </div>
  );
};

export default Film;
