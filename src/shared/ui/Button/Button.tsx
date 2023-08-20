import {ButtonHTMLAttributes, FC, ReactNode} from 'react';

export enum ButtonThemes {
    FILLED = 'bg-light-primary-main/80 hover:bg-light-primary-main text-light-gray dark:bg-dark-primary-main dark:hover:dark:bg-dark-primary-main/80 dark:text-dark-primary-container',
    OUTLINED = 'border-[1px] border-light-neutral-300 hover:bg-light-primary-main/10 dark:hover:bg-dark-primary-main/10 text-light-primary-main dark:text-light-primary-container dark:border-light-neutral-600 bg-transparent',
    ELEVATED = 'text-light-primary-main dark:text-light-primary-container hover:bg-light-primary-main/10 dark:hover:bg-dark-primary-main/10 shadow-[3px_3px_10px_2px_rgba(0,0,0,0.2)] dark:bg-dark-neutral-100',
    FILLED_TONAL = 'bg-light-secondary-container/60 dark:bg-dark-secondary-container/60 hover:bg-light-secondary-container dark:hover:bg-dark-secondary-container text-light-secondary-container-hover dark:text-dark-secondary-container-hover',
    TEXT = 'text-light-primary-main dark:text-light-primary-container hover:bg-light-primary-main/10 dark:hover:bg-dark-primary-main/10',
    CLEAR = ''
}

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode
    theme: ButtonThemes
}

const Button: FC<Props> = ({children, theme = ButtonThemes.FILLED, ...otherProps}) => {

    return (
        <button
            className={`${theme} px-6 py-[10px] rounded-full duration-200`}
            {...otherProps}
        >
            {children}
        </button>
    );
};
export default Button;
