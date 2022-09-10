/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        ENDPOINT: process.env.ENDPOINT,
    },
    reactStrictMode: false,
    // async rewrites() {
    //     return [
    //         {
    //             source: '/users/:path*',
    //             destination: `https://${process.env.ENDPOINT}/users/:path*`,
    //         },
    //         {
    //             source: '/companies/:path*',
    //             destination: `https://${process.env.ENDPOINT}/companies/:path*`,
    //         },
    //         {
    //             source: '/auth/:path*',
    //             destination: `https://${process.env.ENDPOINT}/auth/:path*`,
    //         },
    //         {
    //             source: '/teams/:path*',
    //             destination: `https://${process.env.ENDPOINT}/teams/:path*`,
    //         },
    //         {
    //             source: '/project/:path*',
    //             destination: `https://${process.env.ENDPOINT}/project/:path*`,
    //         },
    //         {
    //             source: '/temp/:path*',
    //             destination: `https://${process.env.ENDPOINT}/temp/:path*`,
    //         },
    //         {
    //             source: '/image/:path*',
    //             destination: `https://${process.env.ENDPOINT}/image/:path*`,
    //         },
    //         {
    //             source: '/project/:path*',
    //             destination: `https://${process.env.ENDPOINT}/project/:path*`,
    //         },
    //         {
    //             source: '/chat/:path*',
    //             destination: `https://${process.env.ENDPOINT}/chat/:path*`,
    //         },
    //     ];
    // },
};

module.exports = nextConfig;
