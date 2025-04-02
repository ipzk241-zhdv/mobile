import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "../screens/SettingsScreen";
import MainScreen from "../screens/MainScreen";
import GoalsScreen from "../screens/GoalsScreen";
import { ClipboardList, Play, Settings } from "lucide-react-native";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Clicker"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    switch (route.name) {
                        case "Clicker":
                            return <Play color={color} size={size} />;
                        case "Goals":
                            return <ClipboardList color={color} size={size} />;
                        case "Settings":
                            return <Settings color={color} size={size} />;
                        default:
                            return null;
                    }
                },
                tabBarLabel: () => null,
                tabBarStyle: {
                    backgroundColor: "white",
                    borderTopWidth: 0,
                    height: 70,
                    paddingTop: 15,
                },
            })}
        >
            <Tab.Screen name="Clicker" component={MainScreen} />
            <Tab.Screen name="Goals" component={GoalsScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
};

export default MainTabs;
