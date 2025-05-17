import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { HomeScreen } from "./HomeScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator id="AppStack">
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AppStack;
