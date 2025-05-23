import React, { useState } from "react";
import ChatClient from "./src/screens/ChatClientScreen";
import LoginScreen from "./src/screens/LoginScreen";

export default function App() {
    const [name, setName] = useState("");
    const [chatId, setChatId] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleSubmit = ({ name, chatId }) => {
        setName(name);
        setChatId(chatId);
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setName("");
        setChatId("");
        setIsLoggedIn(false);
    };

    return isLoggedIn ? <ChatClient name={name} chatId={chatId} onLogout={handleLogout} /> : <LoginScreen onSubmit={handleSubmit} />;
}
