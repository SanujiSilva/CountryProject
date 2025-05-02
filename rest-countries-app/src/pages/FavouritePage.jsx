import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Country = ({ country }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const toggleFavourite = (event) => {
    event.stopPropagation(); // Stop the navigation

    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    if (isFavourite) {
      const newFavourites = favourites.filter((id) => id !== country.alpha3Code);
      localStorage.setItem('favourites', JSON.stringify(newFavourites));
    } else {
      favourites.push(country.alpha3Code);
      localStorage.setItem('favourites', JSON.stringify(favourites));
    }
    setIsFavourite(!isFavourite);
  };

  return (
    <Link to={`/country/${country.alpha3Code}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Container>
        <h4>{country.name}</h4>

        {/* Heart Button that will not trigger navigation */}
        <Button 
          variant={isFavourite ? 'warning' : 'primary'} 
          onClick={toggleFavourite}
        >
          {isFavourite ? 'Unmark Favourite' : 'Mark as Favourite'}
        </Button>
      </Container>
    </Link>
  );
};

export default Country;
