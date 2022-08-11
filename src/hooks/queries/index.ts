import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export const axiosInstance = axios.create({
    baseURL: '/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
