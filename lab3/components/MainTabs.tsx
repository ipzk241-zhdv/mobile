import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { HeaderWithoutSearchView, HeaderWithSearchView } from "./Header";
import { GetIcon, LoadIcons } from "../utils/LoadIcons";

import SettingsScreen from "../screens/SettingsScreen";
import MainScreen from "../screens/MainScreen";
import GoalsScreen from "../screens/GoalsScreen";

const Tab = createBottomTabNavigator();

const MainTabs = ({ toggleTheme, isDarkMode }) => {
    // const theme = useTheme();
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
                    // backgroundColor: theme.tabBar,
                    backgroundColor: "black",
                    borderTopWidth: 0,
                    height: 70,
                    paddingTop: 15,
                },
                header: () => <HeaderWithoutSearchView caption={route.name.replace("Screen", "")} />,
            })}
        >
            <Tab.Screen
                name="MainScreen"
                component={MainScreen}
                options={{ header: () => <HeaderWithSearchView caption="MainScreen"></HeaderWithSearchView> }}
            />
            <Tab.Screen name="GoalsScreen" component={GoalsScreen} />
            <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default MainTabs;
