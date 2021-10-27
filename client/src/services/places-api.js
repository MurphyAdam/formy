import api from './api';

export const fetchPlacesService = (params) => 
    api.get('/places', {
        params: params
    });