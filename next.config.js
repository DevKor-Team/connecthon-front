/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        ENDPOINT: process.env.ENDPOINT,
    },
    reactStrictMode: false,
};

module.exports = nextConfig;
