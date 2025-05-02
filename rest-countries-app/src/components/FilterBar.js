import React from 'react';

const FilterBar = ({ onFilter }) => {
  return (
    <select className="form-select mb-3" onChange={(e) => onFilter(e.target.value)}>
      <option value="">All Regions</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
};

export default FilterBar;
