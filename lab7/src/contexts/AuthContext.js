import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const FIREBASE_API_KEY = "AIzaSyCz6wJh1SmlXDABr2Ex9oy2F2EoqoUYKJ0";
const FIREBASE_REFRESH_URL = `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`;

export const AuthContext = createContext({
    token: null,
    loggedInUser: null,
    loading: true,
    signIn: async () => {},
    signOut: () => {},
});

let logoutFn = null;
export const setLogoutFunction = (fn) => {
    logoutFn = fn;
};

const fetchNewIdToken = async (refreshToken) => {
    const params = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
    });
    const res = await axios.post(FIREBASE_REFRESH_URL, params);
    return {
        idToken: res.data.id_token,
        refreshToken: res.data.refresh_token,
        expiresIn: parseInt(res.data.expires_in, 10),
    };
};

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const tryRestoreSession = async () => {
            const raw = await AsyncStorage.getItem("userData");
            if (raw) {
                const { idToken, refreshToken, expiryDate, user } = JSON.parse(raw);
                const now = Date.now();
                if (expiryDate > now) {
                    setToken(idToken);
                    setLoggedInUser(user);
                } else {
                    try {
                        const { idToken: newId, refreshToken: newRef, expiresIn } = await fetchNewIdToken(refreshToken);
                        const newExpiry = Date.now() + expiresIn * 1000;
                        const stored = { idToken: newId, refreshToken: newRef, expiryDate: newExpiry, user };
                        await AsyncStorage.setItem("userData", JSON.stringify(stored));
                        setToken(newId);
                        setLoggedInUser(user);
                    } catch {
                        await AsyncStorage.removeItem("userData");
                        setToken(null);
                        setLoggedInUser(null);
                    }
                }
            }
            setLoading(false);
        };
        tryRestoreSession();

        setLogoutFunction(async () => {
            await AsyncStorage.removeItem("userData");
            setToken(null);
            setLoggedInUser(null);
        });
    }, []);

    const signIn = async ({ idToken, refreshToken, expiresIn, user }) => {
        const expiryDate = Date.now() + expiresIn * 1000;
        const toStore = { idToken, refreshToken, expiryDate, user };
        await AsyncStorage.setItem("userData", JSON.stringify(toStore));
        setToken(idToken);
        setLoggedInUser(user);
    };

    const signOut = async () => {
        await AsyncStorage.removeItem("userData");
        setToken(null);
        setLoggedInUser(null);
    };

    if (loading) return null;

    return <AuthContext.Provider value={{ token, loggedInUser, loading, signIn, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
