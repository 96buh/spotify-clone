import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                inactive: "#B2B2B2",
                primary: "#262626",
                secondary: "#18181a",
                spotify: "#1DB954",
                type: "#B3B3B3",
                skeleton: {
                    base: "#2a2a2a",
                    content: "#242424",
                },
            },
        },
    },
    plugins: [
        function ({ addUtilities }) {
            const newUtilities = {
                ".scrollbar-thin": {
                    scrollbarWidth: "thin",
                    scrollbarColor: "#DDD #262626",
                },
                ".scrollbar-webkit": {
                    "&::-webkit-scrollbar": {
                        width: "6px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#262626",
                        borderRadius: "20px",
                        border: "1px solid white",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#18181a",
                    },
                },
            };
            addUtilities(newUtilities, ["responsive", "hover"]);
        },
    ],
};
export default config;
