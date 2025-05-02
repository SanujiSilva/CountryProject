import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import { FaHeart, FaRegHeart } from 'react-icons/fa'; 

const CountryCard = ({ country }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (favorites.includes(country.cca3)) {
      setIsFavorite(true); 
    }
  }, [country.cca3]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const index = favorites.indexOf(country.cca3);
      if (index > -1) {
        favorites.splice(index, 1);
      }
    } else {
      favorites.push(country.cca3);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));


    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/country/${country.cca3}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card mb-3" style={{ position: 'relative' }}>
        <div className="row g-0">
          <div className="col-md-4">
            <img src={country.flags.png} className="img-fluid" alt={country.name.common} />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5>{country.name.common}</h5>
              <p>Capital: {country.capital?.[0]}</p>
              <p>Population: {country.population.toLocaleString()}</p>
              <p>Region: {country.region}</p>

              <button 
                onClick={toggleFavorite} 
                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'absolute', top: '10px', right: '10px' }}
              >
                {isFavorite ? (
                  <FaHeart color="red" size={20} />
                ) : (
                  <FaRegHeart color="gray" size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;
