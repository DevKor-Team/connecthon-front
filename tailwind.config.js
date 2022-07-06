/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        colors: {
            ourBlack: '#1D1D1D',
            ourWhite: '#F8F8F8',
        },
        extend: {
            fontFamily: {
                impact: ['impact'],
            },
        },
    },
    plugins: [],
};
