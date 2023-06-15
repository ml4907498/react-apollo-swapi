import React from 'react';

// import './charaters-grid.component.css';

import { Character } from '../../common/interfaces/character.interface';
import CharactersGridItem from './characters-grid-item/characters-grid-item.component';

interface CharactersGridProps {
  characters: Character[];
}

const CharactersGrid: React.FC<CharactersGridProps> = ({
  characters,
}: CharactersGridProps) => {
  return (
    <div className="characters-grid">
      {characters.map((char) => (
        <div key={char.id}>
          <CharactersGridItem character={char} />
        </div>
      ))}
    </div>
  );
};

export default CharactersGrid;
