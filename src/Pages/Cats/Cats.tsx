import React, { useEffect } from 'react';
import Breed from './models/Breed';
import Category from './models/Category';

import { Autocomplete } from '@mui/material';
import TextField from '@mui/material/TextField';
import Cat from './models/Cat';

const Cats = () => {
  const API_URL = 'https://api.thecatapi.com/v1/';
  const [cats, setCats] = React.useState([]);
  const [breeds, setBreeds] = React.useState([]);
  const [categories, setCategories] = React.useState([]);

  const [filters, setFilters] = React.useState({
    breeds: [],
    categories: [],
  });

  //#region Methods

  const fetchBreeds = async (): Promise<Breed[]> => {
    const response = await fetch(API_URL + 'breeds');
    const data = await response.json();
    return data;
  };

  const fetchCategories = async (): Promise<Category[]> => {
    const response = await fetch(API_URL + 'categories');
    const data = await response.json();
    return data;
  };

  const fetchCats = async (
    limit = 10,
    breedIds?: number[] | null,
    categoryIds?: number[] | null
  ): Promise<Cat[] | any[]> => {
    let url = API_URL + `images/search?limit=${limit}`;
    if (breedIds) {
      url += `&breed_ids=${breedIds}`;
    }
    if (categoryIds) {
      url += `&category_ids=${categoryIds}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  //#endregion

  //#region Effects

  useEffect(() => {
    const fetch = async () => {
      const breeds = await fetchBreeds();
      setBreeds(breeds);
      const categories = await fetchCategories();
      setCategories(categories);
      const cats = await fetchCats();
      setCats(cats);
    };
    fetch();
  }, []);

  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Cats</h1>
      <div
        style={{
          display: 'flex',
          textAlign: 'center',
          flexDirection: 'row',
        }}
      >
        <Autocomplete
          options={breeds.map((breed) => {
            return { value: breed.id, label: breed.name };
          })}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Breeds' />}
          onChange={async (event, value) => {
            console.log(value);
            const id = value?.value;
            setFilters({ ...filters, breeds: id });
            const cats = await fetchCats(10, id, filters.categories);
            setCats(cats);
          }}
        />
        <Autocomplete
          multiple
          options={categories.map((category) => {
            return { value: category.id, label: category.name };
          })}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label='Categories' />}
          onChange={async (event, value) => {
            console.log(value);
            const categoryIds = value.map((cat) => cat.value);
            setFilters({ ...filters, categories: categoryIds });
            const cats = await fetchCats(10, filters.breeds, categoryIds);
            setCats(cats);
          }}
        />
      </div>
      <div>
        {cats.length === 0 ? (
          <h2>No cats found</h2>
        ) : (
          <div
            style={{
              maxWidth: '90vw',
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              margin: '10px',
            }}
          >
            {cats.map((cat: Cat) => {
              return (
                <div
                  key={cat.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '300px',
                    padding: '10px',
                  }}
                >
                  <img src={cat.url} alt={cat.id} width='100%' />
                  <ul>
                    {cat.breeds ? (
                      <li>Breeds: {cat.breeds.map((breed) => breed.name)}</li>
                    ) : null}

                    {cat.categories ? (
                      <li>
                        Categories:{' '}
                        {cat.categories.map((category) => category.name)}
                      </li>
                    ) : null}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
};

export default Cats;
