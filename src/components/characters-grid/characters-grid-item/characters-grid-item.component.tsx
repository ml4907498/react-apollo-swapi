import React from 'react';

// import './charaters-grid-item.component.css';
import { Character } from '../../../common/interfaces/character.interface';

const CharactersGridItem: React.FC<{ character: Character }> = ({
  character,
}: {
  character: Character;
}) => {
  return (
    <div>
      <p>{character.id}</p>
      <p>{character.name}</p>
      <p>{character.height}</p>
      <p>{character.mass}</p>
    </div>
  );
};

export default CharactersGridItem;
