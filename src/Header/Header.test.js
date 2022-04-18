import { render, screen } from '@testing-library/react';
import Header from './Header';

test('renders text', () => {
  render(<Header />);
  const linkElement = screen.getByText(/ratemyprogram/i);
  expect(linkElement).toBeInTheDocument();
});
