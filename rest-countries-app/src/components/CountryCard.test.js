import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter to fix routing issues
import CountryCard from './CountryCard';  // Import CountryCard once

test('displays country name', () => {
  const mockCountry = {
    name: { common: 'France' },
    capital: ['Paris'],
    population: 67000000,
    region: 'Europe',
    languages: { fra: 'French' },
    flags: { png: 'https://flagcdn.com/w320/fr.png' },
  };

  // Wrap the CountryCard component in BrowserRouter for routing context
  render(
    <BrowserRouter>
      <CountryCard country={mockCountry} />
    </BrowserRouter>
  );

  // Assert that the country name is rendered correctly
  expect(screen.getByText(/France/i)).toBeInTheDocument();
});
