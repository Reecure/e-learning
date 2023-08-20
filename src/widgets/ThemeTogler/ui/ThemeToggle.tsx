import {FC, useEffect, useState} from 'react';
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";

interface Props {
}

export enum Themes {
    LIGHT = '',
    DARK = 'dark'
}


const ThemeTogler: FC<Props> = () => {
    const [theme, setTheme] = useState(Themes.LIGHT)

    useEffect(() => {
        const initLocalStorageTheme = () => {
            const themeFromStorage = localStorage.getItem('theme')
            console.log(themeFromStorage)
            // if (!themeFromStorage) {
            //     localStorage.setItem('theme', JSON.stringify(Themes.LIGHT))
            //     setTheme(Themes.LIGHT)
            // } else {
            //
            // }
        }
    }, [theme])

    return (
        <Button theme={ButtonThemes.CLEAR}
                className={'relative border-[1px] border-light-accent bg-transparent w-6 h-[14px] rounded-full'}
                onClick={() => {
                    document.body.classList.toggle(Themes.DARK)
                }}>
            <span
                className={'w-2 h-2 absolute  top-[2px] left-[2px] bg-light-accent rounded-full dark:left-[12px] transition-all duration-200'}></span>
        </Button>
    );
};
export default ThemeTogler;
