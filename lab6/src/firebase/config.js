import { initializeApp, InitializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCz6wJh1SmlXDABr2Ex9oy2F2EoqoUYKJ0",
    authDomain: "lab6auth-8af55.firebaseapp.com",
    projectId: "lab6auth-8af55",
    storageBucket: "lab6auth-8af55.firebasestorage.app",
    messagingSenderId: "68365024056",
    appId: "1:68365024056:web:2951a8ac5b4b3f1736dfcd"
};

const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
export { authentication };