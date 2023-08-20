import '@/app/styles/globals.css'
import type {AppProps, AppType} from 'next/app'
import {trpc} from "@/shared/utils/trpc";
import {SessionProvider} from "next-auth/react";
import {FC, useEffect, useState} from "react";
import Layout from "@/pages/layout";
import {Themes} from "@/widgets/ThemeTogler/ui/ThemeToggle";

const App: FC<AppProps> = ({Component, pageProps}) => {

    const [theme, setTheme] = useState(Themes.LIGHT);

    const toggleTheme = () => {
        const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
        setTheme(newTheme);
        localStorage.setItem('themeElearning', JSON.stringify(newTheme));
    };

    useEffect(() => {
        const storedTheme = localStorage.getItem('themeElearning');
        if (storedTheme) {
            setTheme(JSON.parse(storedTheme));
        }
    }, []);

    useEffect(() => {
        document.body.classList.toggle(Themes.DARK, theme === Themes.DARK);
    }, [theme]);


    return (
        <SessionProvider session={pageProps.session}>
            <Layout theme={theme} toggleTheme={toggleTheme}>
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    );
};

export default trpc.withTRPC(App);

