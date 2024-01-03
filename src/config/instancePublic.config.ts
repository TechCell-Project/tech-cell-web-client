import axios, { AxiosInstance } from 'axios';
import { API_ENDPOINT } from '@constants/Services';

const instancePublic: AxiosInstance = axios.create({
    baseURL: API_ENDPOINT,
    //timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default instancePublic;
