import { FC, ReactNode, useEffect, useState } from "react";
import { Roboto } from "next/font/google";
import { Themes } from "@/widgets/ThemeTogler";
import { Navbar } from "@/widgets/Navbar";
import "@uploadthing/react/styles.css";

const roboto = Roboto({
   subsets: ["latin"],
   style: ["normal"],
   weight: ["400"],
});

interface Props {
  children: ReactNode | ReactNode[];
}

const Layout: FC<Props> = ({ children }) => {
   const [theme, setTheme] = useState(Themes.LIGHT);

   const toggleTheme = () => {
      const newTheme = theme === Themes.LIGHT ? Themes.DARK : Themes.LIGHT;
      setTheme(newTheme);
      localStorage.setItem("themeElearning", JSON.stringify(newTheme));
   };

   useEffect(() => {
      const storedTheme = localStorage.getItem("themeElearning");
      if (storedTheme) {
         setTheme(JSON.parse(storedTheme));
      }
   }, []);

   useEffect(() => {
      document.body.classList.toggle(Themes.DARK, theme === Themes.DARK);
   }, [theme]);

   return (
      <>
         <Navbar
            className={`${roboto.className}`}
            theme={theme}
            toggleTheme={toggleTheme}
         />
         <main
            className={`${roboto.className} h-[calc(100vh_-_58px)] overflow-y-auto max-w-[1920px] mx-auto w-full bg-light-background  dark:bg-dark-background  text-light-text dark:text-dark-text`}
         >
            {children}
         </main>
      </>
   );
};
export default Layout;
