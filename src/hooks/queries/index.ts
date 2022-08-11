import axios from 'axios';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

const ENDPOINT = process.env.ENDPOINT as string;

export const axiosInstance = axios.create({
    baseURL: publicRuntimeConfig.ENDPOINT,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});
