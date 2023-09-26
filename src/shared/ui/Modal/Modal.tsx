import {FC, ReactNode} from 'react';
import Overlay from "@/shared/ui/Overlay/Overlay";
import {CSSTransition} from "react-transition-group";

interface Props {
    children: ReactNode
    isOpen: boolean
    setIsOpen: () => void
    classname?: string
}

const Modal: FC<Props> = ({children, isOpen, setIsOpen, classname}) => {
    return (
            // <CSSTransition
            //     in={isOpen}
            //     timeout={400}
            //     mountOnEnter
            //     unmountOnExit
            //     classNames={
            //         {
            //             enterActive: 'animate-open-modal',
            //             exitActive: 'animate-close-modal'
            //         }
            //     }
            // >
                <div
                    className={'fixed top-0 bottom-0 right-0 left-0 z-[100] flex justify-center items-center'}>
                    <Overlay onClick={setIsOpen}/>
                    <div className={'bg-dark-background rounded-md p-10 z-[1000]'}>
                        {children}
                    </div>
                </div>
            // </CSSTransition>
    )
};
export default Modal;