import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);  // Do not wrap <App /> with <BrowserRouter> if it's already inside App
  
  const learnReactLink = screen.getByText(/learn react/i);  // Assuming you have a "learn react" link in your App
  expect(learnReactLink).toBeInTheDocument();
});
