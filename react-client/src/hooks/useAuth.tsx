import React, { createContext, useState, useContext, useEffect } from "react";
import { UserProfile } from '../@types/common';

interface AuthContextData {
    currentUser: UserProfile | null;
    setCurrentUser: (user: UserProfile) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
        const storedUserString = localStorage.getItem('currentUser');
        if (!storedUserString) {
            return null;
        }
        const storedUser = JSON.parse(storedUserString) as UserProfile;
        // if (storedUser.expiresAt < Date.now() / 1000) {
        //   localStorage.removeItem('currentUser');
        //   return null;
        // }
        return storedUser;
    });

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        }
    }, [currentUser]);

    const logout = () => {
        localStorage.removeItem('currentUser');
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, useAuth };
