import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider, useAuth } from "./src/contexts/AuthContext";
import GuestStack from "./src/screens/GuestStack/GuestStack";
import AppStack from "./src/screens/AppStack/AppStack";

const AppContent = () => {
    const { loggedInUser } = useAuth();
    return <NavigationContainer>{loggedInUser ? <AppStack /> : <GuestStack />}</NavigationContainer>;
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;
