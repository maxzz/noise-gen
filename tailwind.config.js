module.exports = {
    mode: 'jit',
    purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                'dark-frame': 'rgb(75, 85, 99)', //border-gray-600
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};
