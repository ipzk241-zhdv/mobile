import api from './api';

const FIREBASE_API_KEY = "AIzaSyCz6wJh1SmlXDABr2Ex9oy2F2EoqoUYKJ0";
const IDENTITY_BASE = "https://identitytoolkit.googleapis.com/v1/accounts";

export const signUp = async (email, password) => {
  const url = `${IDENTITY_BASE}:signUp?key=${FIREBASE_API_KEY}`;
  const res = await api.post(url, { email, password, returnSecureToken: true });
  const { idToken, refreshToken, expiresIn, localId, email: userEmail } = res.data;
  return {
    idToken,
    refreshToken,
    expiresIn: parseInt(expiresIn, 10),
    user: { uid: localId, email: userEmail },
  };
};

export const signIn = async (email, password) => {
  const url = `${IDENTITY_BASE}:signInWithPassword?key=${FIREBASE_API_KEY}`;
  const res = await api.post(url, { email, password, returnSecureToken: true });
  const { idToken, refreshToken, expiresIn, localId, email: userEmail } = res.data;
  return {
    idToken,
    refreshToken,
    expiresIn: parseInt(expiresIn, 10),
    user: { uid: localId, email: userEmail },
  };
};

/**
 * Delete the current user account
 */
export const deleteAccount = async (idToken) => {
  const url = `${IDENTITY_BASE}:delete?key=${FIREBASE_API_KEY}`;
  return api.post(url, { idToken });
};
