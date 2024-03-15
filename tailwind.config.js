/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: "tw-",
    content: [
        './src/**/*.js',
    ],
    theme: {
        extend: {
            screens: {
                'sm': '576px',
                'md': '768px',
                'lg': '992px',
                'xl': '1200px',
                'xxl': '1400px',
            },
        },
    },
    plugins: [],
}

