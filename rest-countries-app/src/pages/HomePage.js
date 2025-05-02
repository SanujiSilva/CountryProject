import React, { useEffect, useState } from 'react';
import { fetchAllCountries, fetchByName, fetchByRegion } from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import CountryCard from '../components/CountryCard';
import { Button, Row, Col, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [countries, setCountries] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setIsLoggedIn(true);
    }

    fetchAllCountries()
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert('Failed to fetch countries!');
      });
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

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('favorites');
    setIsLoggedIn(false);
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
    navigate('/countries');
  };

  const countriesToDisplay = showFavorites
    ? countries.filter((country) => {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(country.alpha3Code);
      })
    : countries;

  return (
    <div
      className="container"
      style={{
        backgroundColor: '#f7f7f7', // Light background color
        color: '#333', // Dark text color for contrast
        minHeight: '100vh',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: '40px 20px',
      }}
    >
      <h1
        className="text-center my-4"
        style={{
          fontWeight: '700',
          fontSize: '2.5rem',
          letterSpacing: '1px',
          color: '#333', // Dark heading color
        }}
      >
        Country Explorer 🌍
      </h1>

      <Row className="mb-4">
        <Col className="d-flex justify-content-start">
          {!isLoggedIn && (
            <>
              <Button
                variant="primary"
                onClick={handleLogin}
                className="me-2 py-2 px-4 font-weight-bold"
                style={{
                  borderRadius: '30px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
              >
                Login
              </Button>
              <Button
                variant="outline-primary"
                onClick={handleRegister}
                className="py-2 px-4 font-weight-bold"
                style={{
                  borderRadius: '30px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
              >
                Register
              </Button>
            </>
          )}
        </Col>

        <Col className="d-flex justify-content-end">
          {isLoggedIn && (
            <>
              <Button
                variant="secondary"
                onClick={toggleShowFavorites}
                className="ms-2 py-2 px-4"
                style={{
                  borderRadius: '30px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
              >
                {showFavorites ? 'Show All Countries' : 'Show Favorites'}
              </Button>
              <Button
                variant="danger"
                onClick={handleLogout}
                className="ms-2 py-2 px-4"
                style={{
                  borderRadius: '30px',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                }}
              >
                Logout
              </Button>
            </>
          )}
        </Col>
      </Row>

      <SearchBar onSearch={handleSearch} />
      <FilterBar onFilter={handleFilter} />

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="primary" />
          <p>Loading countries...</p>
        </div>
      ) : (
        <div>
          {countriesToDisplay.length > 0 ? (
            countriesToDisplay.map((country) => (
              <CountryCard key={country.alpha3Code} country={country} />
            ))
          ) : (
            <p>No countries found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
