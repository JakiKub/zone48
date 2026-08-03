"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext({ user: null, setUser: () => {}, checkUser: async () => {}, logout: async () => {}, loading: true });

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        try {
            const res = await fetch("/api/me");
            if (res.ok) {
                const data = await res.json();
                setUser(data.user);
            } else setUser(null);
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const logout = async () => {
        try {
            await fetch("/api/logout", { method: "POST" });
            setUser(null);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, checkUser, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("miau");
    }
    return context;
};