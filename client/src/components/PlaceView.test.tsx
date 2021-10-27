import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import PlaceView from './PlaceView';

afterEach(cleanup);

const setup = () => {
    const placeData = {
        name: 'London',
        formatted_address: 'London, UK',
        "geometry" : {
            "location" : {
               "lat" : 51.5072178,
               "lng" : -0.1275862
            },
         },
    };
    const utils = render(
            <PlaceView place={placeData} />
        );
    const businessStatusElement = screen.getByText(/Business Status/i) as HTMLInputElement;
    return {
        businessStatusElement,
        utils,
    }
}

describe('Test <PlaceView />', () => {
    const { businessStatusElement, utils } = setup()
    it('renders PlaceView with a place', () => {
        expect(businessStatusElement).toBeInTheDocument();
    });

    it('checks that place name has No business status', () => {
        expect(businessStatusElement).toHaveTextContent(/No business status/i)
    }) 
});
