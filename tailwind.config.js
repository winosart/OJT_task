export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/**/*.blade.php",
        "./resources/**/*.jsx",
        "./resources/**/*.js",
        "./resources/**/*.vue",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: "#2563eb", // Tailwind blue-600 equivalent
                secondary: "#1e293b", // Dark gray for text
                accent: "#f97316", // Tailwind orange-500
            },
            boxShadow: {
                card: "0 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for cards
            },
        },
    },
    plugins: [],
};
