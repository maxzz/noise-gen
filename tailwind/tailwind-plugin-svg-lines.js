const plugin = require('tailwindcss/plugin');

/**
 * @param {import('tailwindcss/types/config').PluginAPI} helpers
 */
function add({ addUtilities }) {
    const newUtilities = {
        ".stroke-round": {
            strokeLinecap: "round",
            strokeLinejoin: "round",
        },

        ".linecap-round": {
            strokeLinecap: "round",
        },
        ".linecap-square": {
            strokeLinecap: "square",
        },
        ".linecap-butt": {
            strokeLinecap: "butt",
        },

        ".linejoin-arcs": {
            strokeLinejoin: "arcs",
        },
        ".linejoin-bevel": {
            strokeLinejoin: "bevel",
        },
        ".linejoin-miter": {
            strokeLinejoin: "miter",
        },
        ".linejoin-miter-clip": {
            strokeLinejoin: "miter-clip",
        },
        ".linejoin-round": {
            strokeLinejoin: "round",
        },
    };
    addUtilities(newUtilities, ["responsive", "hover"]);
}

module.exports = plugin(function (helpers) {
    add(helpers);
});
