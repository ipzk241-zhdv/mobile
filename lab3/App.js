import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./components/MainTabs";
import { ProgressProvider } from "./components/ProgressContext";

const App = () => {
    return (
        <ProgressProvider>
            <NavigationContainer>
                <MainTabs />
            </NavigationContainer>
        </ProgressProvider>
    );
};

export default App;
