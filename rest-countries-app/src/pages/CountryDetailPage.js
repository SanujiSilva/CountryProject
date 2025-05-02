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
      <style>
        {`
          .card {
            background-color: #f8f9fa;
            border-radius: 10px;
            border: 1px solid #ddd;
          }

          .card-body {
            font-size: 1.1rem;
          }

          .card ul li {
            margin-bottom: 8px;
          }

          .card h2 {
            color: #007bff;
            font-weight: bold;
          }

          .card img {
            max-width: 300px;
          }
        `}
      </style>

      <Link to="/" className="btn btn-secondary mb-3">← Back</Link>
      <div className="card p-4 shadow-sm">
        <div className="row">
          <div className="col-md-6">
            <img 
              src={country.flags.png} 
              alt={country.name.common} 
              className="img-fluid mb-3 rounded" 
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-3">{country.name.common}</h2>
            <ul className="list-unstyled">
              <li><strong>Official Name:</strong> {country.name.official}</li>
              <li><strong>Capital:</strong> {country.capital?.[0]}</li>
              <li><strong>Region:</strong> {country.region}</li>
              <li><strong>Subregion:</strong> {country.subregion}</li>
              <li><strong>Population:</strong> {country.population.toLocaleString()}</li>
              <li><strong>Languages:</strong> {languages}</li>
              <li><strong>Timezones:</strong> {country.timezones.join(', ')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetailPage;
