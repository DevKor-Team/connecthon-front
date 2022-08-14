/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        ENDPOINT: process.env.ENDPOINT,
    },
    reactStrictMode: false,
    async rewrites() {
        return [
            {
                source: '/:path*',
                destination: `https://${process.env.ENDPOINT}/:path*`,
            },
        ];
    },
};

module.exports = nextConfig;
