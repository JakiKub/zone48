"use client";

import { useState, createContext, useContext } from "react";

import LoginModal from "../(unlogged)/_components/LoginModal";
import RegisterModal from "../(unlogged)/_components/RegisterModal";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);

    const openLogin = () => setIsLoginOpen(true);
    const closeLogin = () => setIsLoginOpen(false);

    const openRegister = () => setIsRegisterOpen(true);
    const closeRegister = () => setIsRegisterOpen(false);

    const closeLoginOpen = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
    }

    const closeRegisterOpen = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    }

    return (
        <ModalContext.Provider value={{ openLogin, openRegister, closeLogin, closeRegister }}>
            {children}
            {isLoginOpen && <LoginModal closeLogin={closeLogin} closeLoginOpen={closeLoginOpen}/>}
            {isRegisterOpen && <RegisterModal closeRegister={closeRegister} closeRegisterOpen={closeRegisterOpen}/>}
        </ModalContext.Provider>
    )
}

export const useModal = () => useContext(ModalContext)