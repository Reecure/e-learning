import {FC, ReactNode, useEffect} from 'react';
import {useSpring, animated, useTransition} from "@react-spring/web";

interface Props {
    children: ReactNode
    isOpen: boolean
    setIsOpen: () => void
}

const Modal: FC<Props> = ({children, isOpen, setIsOpen}) => {

    const transition = useTransition(isOpen, {
        from: {
            scale: 0,
            opacity: 0,
        },
        enter: {
            scale: 1,
            opacity: 1,
        },
        leave: {
            scale: 0,
            opacity: 0,
        },
    })


    return transition((style, isOpen) => (
            isOpen ? (<animated.dialog
                style={style}
                open={isOpen}
                onClick={setIsOpen}
                className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black/30`}
            >
                <animated.div

                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    className={'bg-light-primary-container dark:bg-dark-primary-container text-light-text dark:text-dark-text p-6 h-min rounded-xl'}
                >
                    {children}
                </animated.div>
            </animated.dialog>) : null
        )
    )
};
export default Modal;
