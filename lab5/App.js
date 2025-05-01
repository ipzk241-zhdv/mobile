import React from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MainStorageScreen } from "./screens/MainStorageScreen";

const App = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="MainStorage" component={MainStorageScreen} options={{ title: "Main Storage" }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
