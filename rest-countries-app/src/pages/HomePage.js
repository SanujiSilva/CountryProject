import React, { useEffect, useState } from 'react';
import { fetchAllCountries, fetchByName, fetchByRegion } from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CountryCard from '../components/CountryCard';

const HomePage = () => {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetchAllCountries().then(setCountries);
  }, []);

  const handleSearch = (name) => {
    if (name === '') {
      fetchAllCountries().then(setCountries);
    } else {
      fetchByName(name)
        .then(setCountries)
        .catch(() => setCountries([]));
    }
  };

  const handleFilter = (region) => {
    if (region === '') {
      fetchAllCountries().then(setCountries);
    } else {
      fetchByRegion(region).then(setCountries);
    }
  };

  return (
    <div className="container">
      <h1 className="my-4 text-center">Country Explorer 🌍</h1>
      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />
      <div>
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
