import axios from "axios";

const FIREBASE_API_KEY = "AIzaSyCz6wJh1SmlXDABr2Ex9oy2F2EoqoUYKJ0";
const authApi = axios.create({
    baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
    params: { key: FIREBASE_API_KEY },
});

export const signUp = async (email, password) => {
    const res = await authApi.post(":signUp", { email, password, returnSecureToken: true });
    const { idToken, refreshToken, expiresIn, localId, email: userEmail } = res.data;
    return {
        idToken,
        refreshToken,
        expiresIn: parseInt(expiresIn, 10),
        user: { uid: localId, email: userEmail },
    };
};

export const signIn = async (email, password) => {
    const res = await authApi.post(":signInWithPassword", { email, password, returnSecureToken: true });
    const { idToken, refreshToken, expiresIn, localId, email: userEmail } = res.data;
    return {
        idToken,
        refreshToken,
        expiresIn: parseInt(expiresIn, 10),
        user: { uid: localId, email: userEmail },
    };
};

export const deleteAccount = (idToken) => {
    return authApi.post(":delete", { idToken });
};

export default authApi;
