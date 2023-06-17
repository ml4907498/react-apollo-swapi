import { SettingOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch } from 'antd';
import React, { useState, useEffect } from 'react';

import FavoriteButton from '../favorite-button/favorite-button.component';
import { Character } from '../../common/interfaces/character.interface';
import './character-card.component.css';

const { Meta } = Card;

interface CharactersCardProps {
  character: Character | null;
  favoritCharsList: string[];
  setFavoritCharsList: (newValue: string[]) => void;
  setIfShowCard: (newValue: boolean) => void;
  className?: string;
}

const CharacterCard: React.FC<CharactersCardProps> = ({
  character,
  favoritCharsList,
  setFavoritCharsList,
  setIfShowCard,
}) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(character ? false : true);
  }, [character]);

  return (
    <Card
      style={{ width: 400, marginTop: 16 }}
      bordered={true}
      actions={[
        character && (
          <FavoriteButton
            key={character.id}
            id={character.id}
            favoriteList={favoritCharsList}
            setFavoritList={setFavoritCharsList}
          />
        ),
        <CloseOutlined
          key="close"
          onClick={() => {
            setIfShowCard(false);
          }}
        />,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        {character && (
          <>
            <Meta
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
              }
              title={character.name}
              // description="This is the description"
            />
            <div className="card-body">
              <div className="data-item">
                <span className="label">Gender:</span>
                <span className="value">{character.gender}</span>
              </div>
              <div className="data-item">
                <span className="label">Species:</span>
                <span className="value">{character.species}</span>
              </div>
              <div className="data-item">
                <span className="label">Height:</span>
                <span className="value">{character.height}</span>
              </div>
              <div className="data-item">
                <span className="label">Weight:</span>
                <span className="value">{character.mass}</span>
              </div>
              <div className="data-item">
                <span className="label">Eye Color:</span>
                <span className="value">{character.eyeColor}</span>
              </div>
              <div className="data-item">
                <span className="label">Home Planet:</span>
                <span className="value">{character.homeworld}</span>
              </div>
              <div className="data-item">
                <span className="label">Movies:</span>
              </div>
              <div className="data-item">
                <span className="label"></span>
              </div>
              <ul>
                {character.films &&
                  character.films.map((v) => <li key={v}>{v}</li>)}
              </ul>
            </div>
          </>
        )}
      </Skeleton>
    </Card>
  );
};

export default CharacterCard;
