import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as hooks from 'use-debounce';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Formy from './Formy';

afterEach(cleanup);

const setup = () => {
    const utils = render(
        <Provider store={store}>
            <Formy />
        </Provider>,
        );
    const input = screen.getByPlaceholderText(/Start typing to search/i) as HTMLInputElement;
    return {
      input,
      ...utils,
    }
}


describe('Test <Formy />', () => {
    const { input } = setup()
    
    it('renders Formy text', () => {
        expect(input).toBeInTheDocument();
    });

    it('should call useDebounce after 1000ms after typing', () => {
        const mockHook = jest.fn();
        jest.spyOn(hooks, 'useDebounce').mockImplementation(mockHook);
        userEvent.type(input, 'London');
        expect(mockHook).not.toHaveBeenCalledWith('London'); // It won't be called immediately
        waitFor(() => expect(mockHook).toHaveBeenCalledWith('London'), { timeout: 1050 }); // But will get called within 1050ms
        jest.clearAllMocks();
    });
});
