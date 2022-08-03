/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}', './src/layouts/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                impact: ['impact'],
            },

            colors: {
                ourBlack: '#1D1D1D',
                ourWhite: '#F8F8F8',
                ourGrey: '#A8A8A8',
                ourBlue: '#2087FF',
                developer: '#F6CC00',
                designer: '#29AAE4',
                planner: '#FF2528',
            },
        },
    },
    plugins: [],
};
