import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GetIcon } from "../utils/LoadIcons";

import SettingsScreen from "../screens/SettingsScreen";
import MainScreen from "../screens/MainScreen";
import GoalsScreen from "../screens/GoalsScreen";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="MainScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return GetIcon(route.name, size, color, "transparent");
                },
                // tabBarActiveTintColor: "lightgray",
                // tabBarInactiveTintColor: "green",
                tabBarLabel: () => null,
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    height: 70,
                    paddingTop: 15,
                }
            })}
        >
            <Tab.Screen name="MainScreen" component={MainScreen} />
            <Tab.Screen name="GoalsScreen" component={GoalsScreen} />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default MainTabs;
