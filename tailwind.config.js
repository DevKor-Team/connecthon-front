/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                impact: ['impact'],
            },
            colors: {
                ourBlack: '#1D1D1D',
                outWhite: '#F8F8F8',
            },
        },
    },
    plugins: [],
};
