import React, { useState } from 'react';

import { Table, Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

import './characters-table.component.css';
import { Character } from '../../common/interfaces/character.interface';

import FavoriteButton from '../favorite-button/favorite-button.component';
import CharacterCard from '../character-card/character-card.component';

interface CharactersTableProps {
  characters: Character[];
  favoritCharsList: string[];
  setFavoritCharsList: (newValue: string[]) => void;
}
const onChange: TableProps<Character>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const CharactersTable: React.FC<CharactersTableProps> = ({
  characters,
  favoritCharsList,
  setFavoritCharsList,
}: CharactersTableProps) => {
  const [ifShowCard, setIfShowCard] = useState<boolean>(false);
  const [currCharacter, setCurrCharacter] = useState<Character | null>(null);

  const showCharacterCard = (id) => {
    setIfShowCard(!ifShowCard);

    //todo - get data from sever
    setCurrCharacter(characters[id === 'test' ? 0 : 1]);
  };

  const columns: ColumnsType<Character> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <div className="row-container">
          <FavoriteButton
            id={text}
            favoriteList={favoritCharsList}
            setFavoritList={setFavoritCharsList}
          />
          <a className="character-name" onClick={() => showCharacterCard(text)}>
            {text}
          </a>
        </div>
      ),
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value: string, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        {
          text: 'Male',
          value: 'Male',
        },
        {
          text: 'Female',
          value: 'Female',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record: Character) =>
        record.gender.indexOf(value as string) === 0,
      // sorter: (a, b) => a.gender.length - b.gender.length,
      // sortDirections: ['descend'],
    },
    {
      title: 'Species',
      dataIndex: 'species',
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value: string, record) => record.species.indexOf(value) === 0,
      // sorter: (a, b) => a.species.length - b.species.length,
      // sortDirections: ['descend'],
    },
    {
      title: 'Height',
      dataIndex: 'height',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.height - b.height,
    },
    {
      title: 'Weight',
      dataIndex: 'mass',
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.mass - b.mass,
    },
    {
      title: 'Eye Color',
      dataIndex: 'eyeColor',
      filters: [
        {
          text: 'Blue',
          value: 'Blue',
        },
        {
          text: 'Brown',
          value: 'Brown',
        },
      ],
      onFilter: (value, record: Character) =>
        record.eyeColor.indexOf(value as string) === 0,
    },
    {
      title: 'Home Planet',
      dataIndex: 'homeworld',
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      // onFilter: (value: string, record) => record.homeworld.indexOf(value) === 0,
    },
  ];

  return (
    <div className="table-container">
      <Space style={{ margin: 16 }}>
        <Button>Favorite Mod</Button>
      </Space>
      <Table columns={columns} dataSource={characters} onChange={onChange} />

      {ifShowCard && (
        <div className="character-card-overlay">
          <div className="character-card-container">
            <CharacterCard
              character={currCharacter}
              favoritCharsList={favoritCharsList}
              setFavoritCharsList={setFavoritCharsList}
              setIfShowCard={setIfShowCard}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CharactersTable;
