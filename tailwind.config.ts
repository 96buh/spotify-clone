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
            },
        },
    },
    plugins: [],
};
export default config;
