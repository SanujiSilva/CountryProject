import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  

const CountryList = () => {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (favorites.length > 0) {
      fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(allCountries => {
          const favoriteCountriesData = allCountries.filter(country =>
            favorites.includes(country.cca3)
          );
          setFavoriteCountries(favoriteCountriesData); 
        })
        .catch(error => console.log(error));
    }
  }, []);

  const handleRemoveFavorite = (countryCode) => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    const updatedFavorites = favorites.filter(fav => fav !== countryCode);

    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

    setFavoriteCountries(favoriteCountries.filter(country => country.cca3 !== countryCode));

    navigate('/');
  };

  return (
    <Container>
      <h3 className="my-4">My Favorite Countries</h3>
      {favoriteCountries.length === 0 ? (
        <p>No favorite countries found. Add some favorites!</p>
      ) : (
        <Row>
          {favoriteCountries.map((country) => (
            <Col key={country.alpha3Code} md={4} className="mb-4">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img
                      src={country.flags.png}
                      className="img-fluid"
                      alt={country.name.common}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5>{country.name.common}</h5>
                      <p>Capital: {country.capital?.[0]}</p>
                      <p>Population: {country.population.toLocaleString()}</p>
                      <p>Region: {country.region}</p>
                      
                      <Button
                        variant="danger"
                        onClick={() => handleRemoveFavorite(country.cca3)}
                      >
                        Remove from Favorites
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default CountryList;
