import axios from 'axios';

const ENDPOINT = process.env.ENDPOINT as string;

export const axiosInstance = axios.create({
    baseURL: ENDPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
