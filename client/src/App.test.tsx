import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './App';

test('renders Formy text', () => {
  render(
  <Provider store={store}>
		<App />
	</Provider>,);
  const linkElement = screen.getByText(/Formy/i);
  expect(linkElement).toBeInTheDocument();
});
