import {FC, useEffect, useState} from 'react';
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";

interface Props {
    theme: Themes;
    toggleTheme: () => void;
}

export enum Themes {
    LIGHT = 'light',
    DARK = 'dark'
}


const ThemeToggle: FC<Props> = ({theme, toggleTheme}) => {
    return (
        <Button
            theme={ButtonThemes.CLEAR}
            className={'!w-6 !h-[14px] !p-0 relative bg-light-primary-main dark:bg-dark-primary-main rounded-full'}
            onClick={toggleTheme}
        >
      <span
          className={
              'w-2 h-2 absolute top-[3px] left-[3px] rounded-full bg-light-gray dark:bg-dark-primary-container dark:left-[13px] transition-all duration-200'
          }
      ></span>
        </Button>
    );
};
export default ThemeToggle;
