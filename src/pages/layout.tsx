import {FC, Fragment, ReactNode} from 'react';
import Navbar from "@/widgets/Navbar/ui/Navbar";
import {Roboto} from 'next/font/google'
import {Themes} from "@/widgets/ThemeTogler/ui/ThemeToggle";

const roboto = Roboto({subsets: ['latin'], style: ['normal'], weight: ['400']})

interface Props {
    children: ReactNode | ReactNode[]
    theme: Themes;
    toggleTheme: () => void;
}

const Layout: FC<Props> = ({children, theme, toggleTheme}) => {

    return (
        <>
            <Navbar
                className={`${roboto.className}`}
                theme={theme} toggleTheme={toggleTheme}/>
            <main
                className={`${roboto.className} max-w-[1920px] mx-auto min-h-screen w-full bg-light-background  dark:bg-dark-background  text-light-text dark:text-dark-text`}>
                {children}
            </main>
        </>
    );
};
export default Layout;
