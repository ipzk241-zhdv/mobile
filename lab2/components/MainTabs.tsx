import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "styled-components";
import { HeaderWithoutSearchView, HeaderWithSearchView } from "./Header";
import { GetIcon, LoadIcons } from "../utils/LoadIcons";

import ProfileScreen from "../screens/ProfileScreen";
import SafetyScreen from "../screens/SafetyScreen";
import ChatScreen from "../screens/ChatScreen";
import CommunityScreen from "../screens/CommunityScreen";
import StoreScreen from "../screens/StoreScreen";

const Tab = createBottomTabNavigator();
const Icons = LoadIcons();

const MainTabs = ({ toggleTheme, isDarkMode }) => {
    const theme = useTheme();
    console.log(theme);
    return (
        <Tab.Navigator
            initialRouteName="StoreScreen"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    return GetIcon(route.name, size, color, "transparent");
                },
                tabBarActiveTintColor: "white",
                tabBarLabel: () => null,
                tabBarStyle: {
                    backgroundColor: theme.tabBar,
                    borderTopWidth: 0,
                    height: 70,
                    paddingTop: 15,
                },
                header: () => <HeaderWithoutSearchView caption={route.name.replace("Screen", "")} />,
            })}
        >
            <Tab.Screen
                name="StoreScreen"
                component={StoreScreen}
                options={{ header: () => <HeaderWithSearchView caption="Store"></HeaderWithSearchView> }}
            />
            <Tab.Screen name="CommunityScreen" component={CommunityScreen} />
            <Tab.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{ header: () => <HeaderWithSearchView caption="Chat"></HeaderWithSearchView> }}
            />
            <Tab.Screen name="SafetyScreen" component={SafetyScreen} />
            <Tab.Screen
                name="ProfileScreen"
                options={{ headerShown: false }}
                children={() => <ProfileScreen toggleTheme={toggleTheme} isDarkMode={isDarkMode} />}
            />
        </Tab.Navigator>
    );
};

export default MainTabs;
