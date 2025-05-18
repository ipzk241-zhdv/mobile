import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthProvider, useAuth, setLogoutFunction } from "./src/contexts/AuthContext";
import GuestStack from "./src/screens/GuestStack/GuestStack";
import AppStack from "./src/screens/AppStack/AppStack";
import { navigationRef } from "./src/navigation/NavigationService";

const Stack = createNativeStackNavigator();

const AppContent = () => {
    const { loggedInUser } = useAuth();

    return <NavigationContainer ref={navigationRef}>{loggedInUser ? <AppStack /> : <GuestStack />}</NavigationContainer>;
};

const App = () => (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
);

export default App;
