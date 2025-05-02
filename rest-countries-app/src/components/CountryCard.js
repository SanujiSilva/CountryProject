import React from 'react';
import { Link } from 'react-router-dom';

const CountryCard = ({ country }) => {
  return (
    <Link to={`/country/${country.cca3}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={country.flags.png} className="img-fluid rounded-start" alt={country.name.common} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{country.name.common}</h5>
              <p className="card-text">Capital: {country.capital?.[0]}</p>
              <p className="card-text">Population: {country.population.toLocaleString()}</p>
              <p className="card-text">Region: {country.region}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
