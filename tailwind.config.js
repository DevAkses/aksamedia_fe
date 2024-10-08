/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: {
                    light: '#ffffff',
                    dark: '#121212',
                },
                text: {
                    light: '#000000',
                    dark: '#e0e0e0',
                },
            },
        },
    },
    plugins: [],
};
