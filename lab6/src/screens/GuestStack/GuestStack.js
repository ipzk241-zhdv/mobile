import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import ResetPasswordScreen from "./ResetPasswordScreen";

const Stack = createNativeStackNavigator();

const GuestStack = () => {
    return (
        <Stack.Navigator id="GuestStack">
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default GuestStack;
