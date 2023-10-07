import { API_ENDPOINT } from '@constants/Services';
import axios from 'axios';

export default axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const axiosAuth = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
});
