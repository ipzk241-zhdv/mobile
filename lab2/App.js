import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./screens/CommunityScreen";
import SafetyScreen from "./screens/SafetyScreen";
import ChatScreen from "./screens/ChatScreen";
import CommunityScreen from "./screens/CommunityScreen";
import StoreScreen from "./screens/StoreScreen";
import { LoadIcons } from "./utils/LoadIcons";
import { Provider as PaperProvider, DefaultTheme, DarkTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();
const Icons = LoadIcons();

const App = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false); // Theme state should be inside the component
    const currentTheme = isDarkTheme ? DarkTheme : DefaultTheme; // Set theme based on state

    return (
        <PaperProvider theme={currentTheme}>
            <GestureHandlerRootView style={{ flex: 1 }}>
                <NavigationContainer>
                    <Tab.Navigator
                        initialRouteName="StoreScreen"
                        screenOptions={({ route, navigation }) => ({
                            tabBarIcon: ({ focused, color, size }) => {
                                const iconEntry = Icons.find((icon) => icon.name === route.name);
                                const Icon = iconEntry?.Icon;

                                return Icon ? <Icon width={size} height={size} stroke={focused ? "white" : "#4B5664"} fill={"transparent"} /> : null;
                            },
                            tabBarLabel: () => null,
                            headerShown: true,
                        })}
                    >
                        <Tab.Screen name="StoreScreen" component={StoreScreen} />
                        <Tab.Screen name="CommunityScreen" component={CommunityScreen} />
                        <Tab.Screen name="ChatScreen" component={ChatScreen} />
                        <Tab.Screen name="SafetyScreen" component={SafetyScreen} />
                        <Tab.Screen
                            name="ProfileScreen"
                            component={ProfileScreen}
                            initialParams={{ toggleTheme: () => setIsDarkTheme(!isDarkTheme) }}
                        />
                    </Tab.Navigator>
                </NavigationContainer>
            </GestureHandlerRootView>
        </PaperProvider>
    );
};

export default App;
