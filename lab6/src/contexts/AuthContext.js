import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../firebase/config";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, (user) => {
            console.log("onAuthStateChanged:", user.email);
            setLoggedInUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    if (loading) {
        return null;
    }

    return (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
