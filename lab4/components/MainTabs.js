import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainScreen from "../screens/MainScreen";
import { ClipboardList, Play, Settings } from "lucide-react-native";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="MainScreen"
            screenOptions={({ route }) => ({
                tabBarStyle: {
                    display: "none",
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="MainScreen" component={MainScreen} />
        </Tab.Navigator>
    );
};

export default MainTabs;
