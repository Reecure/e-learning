import Modal from "@/shared/ui/Modal/Modal";
import {useCallback, useEffect, useState} from "react";
import {Button} from "@/shared/ui";
import {ButtonThemes} from "@/shared/ui/Button/Button";
import Hero from "@/shared/ui/Hero/Hero";

export default function Home() {
    const [modalOpen, setModalOpen] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)

    const modalOpenHandler = useCallback(() => {
        setModalOpen((prev) => !prev)
    }, [modalOpen])

    const menuOpenHandler = useCallback(() => {
        setMenuOpen((prev) => !prev)
    }, [menuOpen])

    return (
        <>
            <div className={''}>
                <Hero/>
                <button onClick={modalOpenHandler}>Label</button>
            </div>

            <Modal isOpen={modalOpen} setIsOpen={modalOpenHandler}>123</Modal>
        </>
    )
}
