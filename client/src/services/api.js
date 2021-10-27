import axios from 'axios';


// window origin - base url
const API_ENDPOINT = `${window.location.origin}/api`;

const api = axios.create({
    baseURL: API_ENDPOINT,
});


export default api;