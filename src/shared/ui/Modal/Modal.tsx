import {FC, ReactNode} from 'react';

interface Props {
    children: ReactNode
    isOpen: boolean
    setIsOpen: () => void
}

const Modal: FC<Props> = ({children, isOpen, setIsOpen}) => {

    return (
        <div className={'mx-auto w-screen h-screen bg-black'}>
            <dialog open={isOpen}>
                {children}
            </dialog>
        </div>
    );
};
export default Modal;
