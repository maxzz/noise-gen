const twColors = require('tailwindcss/colors');
const twTheme = require('tailwindcss/defaultTheme');

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config } */
module.exports = {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    //darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            colors: {
                darkframe: 'rgb(75, 85, 99)', //border-gray-600
                primary: twColors.slate,
                "app": { //https://tailwind.simeongriggs.dev/app/AB9DDE
                    "50": "#F8F7FC",
                    "100": "#F2F0FA",
                    "200": "#E2DDF3",
                    "300": "#D5CDEE",
                    "400": "#C1B7E7",
                    "500": "#AB9DDE",
                    "600": "#9A89D7",
                    "700": "#8976D1",
                    "800": "#735BC8",
                    "900": "#543BAF"
                },
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
        require('./tailwind/tailwind-plugin-svg-lines'),
        require('./tailwind/tailwind-plugin-colors-bridge')({ prefix: '--tm-', groupName: 'primary' }),
        require('./tailwind/tailwnid-plugin-debug-styles'),
        require('./tailwind/tailwind-plugin-debug-screens'),
    ],
};
