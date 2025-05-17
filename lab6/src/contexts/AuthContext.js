import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { authentication } from "../firebase/config";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(authentication, (user) => {
            if (user) {
                console.log("onAuthStateChanged:", user.email, "verified:", user.emailVerified);
                if (user.emailVerified) {
                    setLoggedInUser(user);
                } else {
                    setLoggedInUser(null);
                }
            } else {
                setLoggedInUser(null);
            }

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
