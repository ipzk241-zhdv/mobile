import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchNewIdToken from "../contexts/AuthContext"

let logoutFn = null;
export const setLogoutFunction = (fn) => {
    logoutFn = fn;
};

const api = axios.create({
    baseURL: "https://lab6auth-8af55-default-rtdb.europe-west1.firebasedatabase.app",
});

api.interceptors.request.use(async (config) => {
    const raw = await AsyncStorage.getItem("userData");
    if (raw) {
        const { idToken } = JSON.parse(raw);
        config.params = { ...(config.params || {}), auth: idToken };
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const status = error.response?.status;
        if (status === 401) {
            const raw = await AsyncStorage.getItem("userData");
            if (!raw) {
                logoutFn?.();
                return Promise.reject(error);
            }
            const { refreshToken, user } = JSON.parse(raw);
            try {
                const { idToken: newId, refreshToken: newRef, expiresIn } = await fetchNewIdToken(refreshToken);
                const newExpiry = Date.now() + expiresIn * 1000;
                const toStore = { idToken: newId, refreshToken: newRef, expiryDate: newExpiry, user };
                await AsyncStorage.setItem("userData", JSON.stringify(toStore));
                error.config.params = { ...(error.config.params || {}), auth: newId };
                return axios.request(error.config);
            } catch {
                await AsyncStorage.removeItem("userData");
                logoutFn?.();
            }
        }
        return Promise.reject(error);
    }
);

export default api;
