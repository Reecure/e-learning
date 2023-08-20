import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                light: {
                    background: '#FEF7FF',
                    text: '#1D1B20',
                    gray: '#FFFFFF',
                    primary: {
                        'main': '#6750A4',
                        'hover': '#FFFFFF',
                        'container': '#EADDFF',
                        'container-hover': '#21005D',
                        'hover-second': '#4F378B',
                    },
                    secondary: {
                        'main': '#625B71',
                        'hover': '#FFFFFF',
                        'container': '#E8DEF8',
                        'container-hover': '#1D192B',
                        'hover-second': '#4A4458',
                    },
                    tertiary: {
                        'main': '#7D5260',
                        'hover': '#FFFFFF',
                        'container': '#FFD8E4',
                        'container-hover': '#31111D',
                        'hover-second': '#633B48',
                    },
                    error: {
                        'main': '#B3261E',
                        'hover': '#FFFFFF',
                        'container': '#F9DEDC',
                        'container-hover': '#410E0B',
                    },
                    neutral: {
                        100: "#1D1B20",
                        300: "#48464C",
                        400: "#605D64",
                        500: "#79767D",
                        600: "#938F96",
                        700: "#AEA9B1",
                        800: "#CAC5CD",
                        900: "#E6E0E9",
                    },
                },
                dark: {
                    background: '#141218',
                    text: '#FFFFFF',
                    gray: '#FFFFFF',
                    primary: {
                        'main': '#D0BCFF',
                        'hover': '#381E72',
                        'container': '#4F378B',
                        'container-hover': '#EADDFF',
                        'hover-second': '#4F378B',
                    },
                    secondary: {
                        'main': '#CCC2DC',
                        'hover': '#332D41',
                        'container': '#4A4458',
                        'container-hover': '#E8DEF8',
                        'hover-second': '#4A4458',

                    },
                    tertiary: {
                        'main': '#EFB8C8',
                        'hover': '#492532',
                        'container': '#633B48',
                        'container-hover': '#FFD8E4',
                        'hover-second': '#633B48',
                    },
                    error: {
                        'main': '#F2B8B5',
                        'hover': '#601410',
                        'container': '#8C1D18',
                        'container-hover': '#F9DEDC',
                    },
                    neutral: {
                        0: "#000000",
                        100: "#1D1B20",
                        300: "#48464C",
                        400: "#605D64",
                        500: "#79767D",
                        600: "#938F96",
                        700: "#AEA9B1",
                        800: "#CAC5CD",
                        900: "#E6E0E9",
                        950: "#F5EFF7",
                        1000: "#FFFFFF",
                    },
                },
            },

        },
    },
    plugins: [],
}
export default config
