"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

const Menu = ({ isMenuOpen, t, closeMenu }) => {
    const [isSub1Open, setIsSub1Open] = useState(false);
    const [isSub2Open, setIsSub2Open] = useState(false);

    return (
        <motion.div className={`menu-mobile ${isMenuOpen ? "open" : ""}`} initial={{ y: '-100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: '-100%', opacity: 0 }} transition={{ duration: 0.4, ease: 'easeInOut' }}>
            <div className="menu-login-div">
                <button>{t.menu.b1}</button>
                <button>{t.menu.b2}</button>
            </div>
            <Link href="/" className="menu-link" onClick={() => closeMenu()}>{t.menu.b3}</Link>
            <div className="menu-item-dropdown">
                <button className="menu-item-bttn" onClick={() => setIsSub1Open(!isSub1Open)}>{t.menu.b4}</button>
                <div className={`submenu-list ${isSub1Open ? "submenu-open" : ""}`}>
                    <Link href="/" className="submenu-link" onClick={() => closeMenu()}>{t.menu.b5}</Link>
                    <Link href="/" className="submenu-link" onClick={() => closeMenu()}>{t.menu.b6}</Link>
                </div>
            </div>
            <Link href="/o-nas" className="menu-link" onClick={() => closeMenu()}>{t.menu.b7}</Link>
            <Link href="/" className="menu-link" onClick={() => closeMenu()}>{t.menu.b8}</Link>
            <Link href="/kontakt" className="menu-link" onClick={() => closeMenu()}>{t.menu.b9}</Link>
            <div className="menu-item-dropdown">
                <button className="menu-item-bttn" onClick={() => setIsSub2Open(!isSub2Open)}>{t.menu.b10}</button>
                <div className={`submenu-list ${isSub2Open ? "submenu-open" : ""}`}>
                    <Link href="/" className="submenu-link" onClick={() => closeMenu()}>{t.menu.b11}</Link>
                    <Link href="/" className="submenu-link" onClick={() => closeMenu()}>{t.menu.b12}</Link>
                </div>
            </div>
        </motion.div>
    )
}

export default Menu