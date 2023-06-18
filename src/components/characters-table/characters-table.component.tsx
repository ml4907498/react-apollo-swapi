import React, { useEffect, useState } from 'react';

import './characters-table.component.css';
import { Character } from '../../common/interfaces/character.interface';

// Components
import { Table, Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

import FavoriteButton from '../favorite-button/favorite-button.component';
import CharacterCard from '../character-card/character-card.component';
import { ColumnFilterItem } from 'antd/es/table/interface';

// Hooks
import {
  getCharactersLazy,
  processCharactersData,
} from '../../hooks/characters/getCharacters';
import { getCharacterByIdLazy } from '../../hooks/characters/getCharacterById';
import { useGetSpeciesQuery } from '../../graphql/__generated__/schema';

// onChange for Table component
const onChange: TableProps<Character>['onChange'] = (
  pagination,
  filters,
  sorter,
  extra,
) => {
  console.log('params', pagination, filters, sorter, extra);
};

const CharactersTable: React.FC = () => {
  const [ifShowCard, setIfShowCard] = useState<boolean>(false);
  const [ifFavoriteOnly, setIfFavoriteOnly] = useState<boolean>(false);

  const [currCharacter, setCurrCharacter] = useState<Character | null>(null);
  const [currTableData, setCurrTableData] = useState<Character[]>([]);
  const [prevTableData, setPrevTableData] = useState<Character[]>([]);
  const [currPage, setCurrPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(2);

  const [favoritCharsList, setFavoritCharsList] = useState<string[]>(
    JSON.parse(localStorage.getItem('favoriteItems') || '[]'),
  );

  // Wrapped lazy query
  const getCharacterById = getCharacterByIdLazy();
  const { getCharacters, fetchMoreData, data } = getCharactersLazy();
  const speciesData = useGetSpeciesQuery().data?.allSpecies?.species;

  // Get init data
  useEffect(() => {
    getCharacters();
  }, []);

  // Update the data
  useEffect(() => {
    const processedData = processCharactersData(data);
    setCurrTableData(processedData);
  }, [data]);

  // Save favoriteItems List in localstorage
  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoritCharsList));
    // console.log(localStorage.getItem('favoriteItems'));
  }, [favoritCharsList]);

  // Show the character preview card
  const showCharacterCard = async (id: string) => {
    setCurrCharacter(null);
    setIfShowCard(!ifShowCard);

    // Get the data from server
    const char = await getCharacterById(id);
    setCurrCharacter(char);
  };

  // Switch the favorite mode
  const switchFavoriteOnly = () => {
    // if the current mode is not the favorite mode
    if (!ifFavoriteOnly) {
      const favoritChars: Character[] = [];
      const promises = favoritCharsList.map(async (id) => {
        const char = await getCharacterById(id);
        favoritChars.push(char);
      });
      Promise.all(promises).then(() => {
        setPrevTableData(currTableData);
        setCurrTableData(favoritChars);
      });
    } else {
      setCurrTableData(prevTableData);
      console.log(prevTableData);
    }
    setIfFavoriteOnly(!ifFavoriteOnly);
  };

  // Fetch more data and set the current page.
  const fetchMore = () => {
    fetchMoreData();
    setPageSize(pageSize + 1);
    setCurrPage(pageSize + 1);
  };

  // Columns config for Table
  const columns: ColumnsType<Character> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <div className="row-container">
          <FavoriteButton
            id={record.id}
            favoriteList={favoritCharsList}
            setFavoritList={setFavoritCharsList}
          />
          <a
            className="character-name"
            onClick={() => showCharacterCard(record.id)}
          >
            {text}
          </a>
        </div>
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      filters: [
        {
          text: 'Male',
          value: 'male',
        },
        {
          text: 'Female',
          value: 'female',
        },
        {
          text: 'n/a',
          value: 'n/a',
        },
      ],
      onFilter: (value, record: Character) =>
        record.gender?.indexOf(value as string) === 0,
    },
    {
      title: 'Species',
      dataIndex: 'species',
      filters: speciesData
        ? (speciesData.map((v) => ({
            text: v?.name ?? null,
            value: v?.name ?? null,
          })) as ColumnFilterItem[])
        : undefined,
      onFilter: (value, record: Character) =>
        record.species?.indexOf(value as string) === 0,
    },
    {
      title: 'Height',
      dataIndex: 'height',
      sorter: (a, b) => (a?.height ?? 0) - (b?.height ?? 0),
    },
    {
      title: 'Weight',
      dataIndex: 'mass',
      sorter: (a, b) => (a?.mass ?? 0) - (b?.mass ?? 0),
    },
    {
      title: 'Eye Color',
      dataIndex: 'eyeColor',
      filters: [
        {
          text: 'Blue',
          value: 'blue',
        },
        {
          text: 'Brown',
          value: 'brown',
        },
        {
          text: 'Yellow',
          value: 'yellow',
        },
        {
          text: 'Red',
          value: 'red',
        },
        {
          text: 'Blue-Gray',
          value: 'blue-gray',
        },
      ],
      onFilter: (value, record: Character) =>
        record.eyeColor?.indexOf(value as string) === 0,
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

  const onPageChange = (page: number, pageSize: number) => {
    // Handle page change event
    console.log('Page:', page);
    console.log('Page Size:', pageSize);
    setPageSize(pageSize);
    setCurrPage(page);
  };

  return (
    <div className="table-container">
      <div className="table-buttons">
        <Space>
          <Button
            className={ifFavoriteOnly ? 'favorite-btn' : ''}
            onClick={switchFavoriteOnly}
          >
            Favorite Mod
          </Button>
        </Space>
        <Space>
          <Button onClick={fetchMore}>More data</Button>
        </Space>
      </div>
      {data && (
        <Table
          columns={columns}
          dataSource={currTableData.map((item, index) => ({
            ...item,
            key: index.toString(), // Add a unique key prop for each item
          }))}
          onChange={onChange}
          pagination={{
            current: currPage,
            position: ['topCenter'],
            onChange: onPageChange,
          }}
          scroll={{ y: 550 }}
        />
      )}

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
