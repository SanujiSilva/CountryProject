import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchByCode } from '../services/api';

const CountryDetailPage = () => {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetchByCode(code).then(data => {
      if (data && data.length > 0) {
        setCountry(data[0]);
      }
    });
  }, [code]);

  if (!country) return <div className="container mt-5">Loading...</div>;

  const languages = country.languages ? Object.values(country.languages).join(', ') : 'N/A';

  return (
    <div className="container mt-5">
      <Link to="/" className="btn btn-secondary mb-3">← Back</Link>
      <h2>{country.name.common}</h2>
      <img src={country.flags.png} alt={country.name.common} width="150" />
      <ul className="mt-3">
        <li><strong>Official Name:</strong> {country.name.official}</li>
        <li><strong>Capital:</strong> {country.capital?.[0]}</li>
        <li><strong>Region:</strong> {country.region}</li>
        <li><strong>Subregion:</strong> {country.subregion}</li>
        <li><strong>Population:</strong> {country.population.toLocaleString()}</li>
        <li><strong>Languages:</strong> {languages}</li>
        <li><strong>Timezones:</strong> {country.timezones.join(', ')}</li>
      </ul>
    </div>
  );
};

export default CountryDetailPage;
