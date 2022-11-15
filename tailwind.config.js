const twColors = require('tailwindcss/colors');
const twTheme = require('tailwindcss/defaultTheme');

const plugin = require('tailwindcss/plugin');

module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    //darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                primary: twColors.slate,
                darkframe: 'rgb(75, 85, 99)', //border-gray-600
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        plugin(function ({ addComponents, theme }) {
            const colorClasses = {
                '.color-vars': {
                    '--purple-200': theme('colors.purple.200'),
                    '--purple-300': theme('colors.purple.300'),
                    '--purple-900': theme('colors.purple.900'),
                },
            };
            addComponents(colorClasses);
        }),
        require('./tailwind/tailwind-plugin-colors-bridge')({ prefix: '--tm-', groupName: 'primary' }),
        require('./tailwind/tailwnid-plugin-debug-styles'),
        require('./tailwind/tailwind-plugin-debug-screens'),
    ],
};
