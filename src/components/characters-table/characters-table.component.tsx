import React, { useEffect, useState } from 'react';

import { Table, Button, Space } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';

import './characters-table.component.css';
import { Character } from '../../common/interfaces/character.interface';

import FavoriteButton from '../favorite-button/favorite-button.component';
import CharacterCard from '../character-card/character-card.component';

import {
  getCharactersLazy,
  processCharactersData,
} from '../../hooks/characters/getCharacters';
import { getCharacterByIdLazy } from '../../hooks/characters/getCharacterById';
import {
  useGetSpeciesQuery,
  GetCharactersQuery,
} from '../../graphql/__generated__/schema';

// interface CharactersTableProps {
//   characters: Character[];
//   favoritCharsList: string[];
//   setFavoritCharsList: (newValue: string[]) => void;
// }
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
  const [currCharacter, setCurrCharacter] = useState<Character | null>(null);
  const [currPage, setCurrPage] = useState<number>(1);
  const [favoritCharsList, setFavoritCharsList] = useState<string[]>(
    JSON.parse(localStorage.getItem('favoriteItems') || '[]'),
  );
  const [ifFavoriteOnly, setIfFavoriteOnly] = useState<boolean>(false);
  const [currTableData, setCurrTableData] = useState<Character[]>([]);
  const [prevTableData, setPrevTableData] = useState<Character[]>([]);

  const getCharacterById = getCharacterByIdLazy();
  const { getCharacters, fetchMoreData, data } = getCharactersLazy();
  const speciesData = useGetSpeciesQuery().data?.allSpecies?.species;

  // const arr =
  //   speciesData &&
  //   speciesData.map((v) => ({
  //     text: v?.name,
  //     value: v?.name,
  //   }));

  useEffect(() => {
    const processedData = processCharactersData(data);
    setCurrTableData(processedData);
  }, [data]);

  useEffect(() => {
    getCharacters();
  }, []);

  useEffect(() => {
    console.log('hhh');
  }, [currTableData]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoritCharsList));
    console.log(localStorage.getItem('favoriteItems'));
  }, [favoritCharsList]);

  const showCharacterCard = async (id) => {
    setCurrCharacter(null);
    setIfShowCard(!ifShowCard);

    // get data from sever
    const char = await getCharacterById(id);
    console.log('lazy:', char);
    setCurrCharacter(char);
  };

  const switchFavoriteOnly = () => {
    if (!ifFavoriteOnly) {
      const favoritChars: Character[] = [];
      const promises = favoritCharsList.map(async (id) => {
        const char = await getCharacterById(id);
        favoritChars.push(char);
        console.log(favoritChars);
        console.log(ifFavoriteOnly);
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

  const fetchMore = () => {
    fetchMoreData();
    setCurrPage(currPage + 1);
  };
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
        record.gender.indexOf(value as string) === 0,
    },
    {
      title: 'Species',
      dataIndex: 'species',
      filters:
        speciesData &&
        speciesData.map((v) => ({
          text: v?.name,
          value: v?.name,
        })),
      onFilter: (value: string, record) => record.species.indexOf(value) === 0,
    },
    {
      title: 'Height',
      dataIndex: 'height',
      sorter: (a, b) => a.height - b.height,
    },
    {
      title: 'Weight',
      dataIndex: 'mass',
      sorter: (a, b) => a.mass - b.mass,
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

  const onPageChange = (page, pageSize) => {
    // Handle page change event
    console.log('Page:', page);
    console.log('Page Size:', pageSize);
    setCurrPage(page);
  };

  return (
    <div className="table-container">
      <div className="table-buttons">
        <Space>
          <Button onClick={switchFavoriteOnly}>Favorite Mod</Button>
        </Space>
        <Space>
          <Button onClick={fetchMore}>More data</Button>
        </Space>
      </div>
      {data && (
        <Table
          columns={columns}
          dataSource={currTableData}
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
