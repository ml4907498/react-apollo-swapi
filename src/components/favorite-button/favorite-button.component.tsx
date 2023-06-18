import React from 'react';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import './favorite-button.component.css';

interface FavoriteButtonProps {
  id: string;
  favoriteList: string[];
  setFavoritList: (newValue: string[]) => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  id,
  favoriteList,
  setFavoritList,
}: FavoriteButtonProps) => {
  // Check if the current item is in the favorite list
  const ifFavorite = (id: string, favoriteList: string[]): boolean => {
    return favoriteList.includes(id);
  };

  const addFavorite = (): string[] => {
    const updatedList = [...favoriteList, id];
    setFavoritList(updatedList);
    return favoriteList;
  };

  const removeFavorite = (): string[] => {
    console.log('removed');
    const itemToRemove = id;
    const updatedList = favoriteList.filter((item) => item !== itemToRemove);
    setFavoritList(updatedList);
    return favoriteList;
  };

  return (
    <div>
      {ifFavorite(id, favoriteList) ? (
        <HeartFilled
          className="heart-icon"
          style={{ color: 'red' }}
          onClick={removeFavorite}
        />
      ) : (
        <HeartOutlined className="heart-icon" onClick={addFavorite} />
      )}
    </div>
  );
};

export default FavoriteButton;
