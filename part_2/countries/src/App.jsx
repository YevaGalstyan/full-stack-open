import { useState } from 'react'
import './App.css'
import Search from './components/Search'
import { useEffect } from 'react';
import countriesService from './servises/countriesService';
import Country from './components/Country';
import CountryList from './components/CountryList';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState(null);

  useEffect(() => {
    countriesService.getAll().then(data => {
      setCountries(data);
    })
  }, [])

  const handleSearchCountries = (value) => {
    setSearch(value)
    if (value === '') {
      setFilteredCountries(null);
      return;
    };

    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  }

  const selectCountry = (country) => {
    setFilteredCountries([country]);
  };

  return (
    <>
      <Search search={search} setSearch={handleSearchCountries} />
      {
        filteredCountries && filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : (
          <CountryList countries={filteredCountries} onShow={selectCountry} />
        )
      }
    </>
  )
}

export default App
