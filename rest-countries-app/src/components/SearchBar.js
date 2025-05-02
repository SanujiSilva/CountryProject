import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search country by name"
      className="form-control my-3"
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
