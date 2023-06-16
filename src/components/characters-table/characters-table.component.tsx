import React from 'react';

import { Table, Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';

import './characters-table.component.css';
import { Character } from '../../common/interfaces/character.interface';

import FavoriteButton from '../favorite-button/favorite-button.component';

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

const generateColumns = (
  props: CharactersTableProps,
): ColumnsType<Character> => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <div className="container">
          <FavoriteButton
            id={text}
            favoriteList={props.favoritCharsList}
            setFavoritList={props.setFavoritCharsList}
          />
          <a className="character-name">{text}</a>
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
          value: 'Male',
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      // onFilter: (value: string, record) => record.gender.indexOf(value) === 0,
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
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      // onFilter: (value: string, record) => record.eyeColor.indexOf(value) === 0,
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
};

const CharactersTable: React.FC<CharactersTableProps> = ({
  characters,
  favoritCharsList,
  setFavoritCharsList,
}: CharactersTableProps) => {
  const columns = generateColumns({
    characters,
    favoritCharsList,
    setFavoritCharsList,
  });

  return (
    <>
      <Space style={{ margin: 16 }}>
        <Button>Favorite Mod</Button>
      </Space>
      <Table columns={columns} dataSource={characters} onChange={onChange} />
    </>
  );
};

export default CharactersTable;
