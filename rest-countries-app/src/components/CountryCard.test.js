import { render, screen } from '@testing-library/react';
import CountryCard from './CountryCard';

test('displays country name', () => {
  const mockCountry = {
    name: { common: 'France' },
    capital: ['Paris'],
    population: 67000000,
    region: 'Europe',
    languages: { fra: 'French' },
    flags: { png: 'https://flagcdn.com/w320/fr.png' },
  };

  render(<CountryCard country={mockCountry} />);
  expect(screen.getByText(/France/i)).toBeInTheDocument();
});
