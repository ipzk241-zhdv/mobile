import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import ProfileScreen from "./ProfileScreen";
import EditProfileScreen from "./EditProfileScreen";
import DeleteProfileScreen from "./DeleteProfileScreen";

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator id="AppStack">
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="DeleteProfile" component={DeleteProfileScreen} options={{ headerShown: false }}></Stack.Screen>
            <Stack.Screen name="PostCreate" component={} options={{ headerShown: false }}></Stack.Screen>
        </Stack.Navigator>
    );
};

export default AppStack;
