import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./components/MainTabs";
import { OneSignal } from "react-native-onesignal";
import Constants from "expo-constants";

const appId = Constants.expoConfig.extra.ONESIGNAL_APP_ID;

const App = () => {
    useEffect(() => {
        OneSignal.initialize(appId);
        OneSignal.Debug.setLogLevel(6); // Verbose

        OneSignal.User.pushSubscription.optIn();
        OneSignal.login("zherebtsovIpzk241");

        OneSignal.Notifications.requestPermission(true);

        OneSignal.Notifications.addEventListener("foregroundWillDisplay", async (event) => {
            console.log("Сповіщення у foreground: ", event);
            event.preventDefault();
            event.notification.display();
        });
    }, []);

    return (
        <NavigationContainer>
            <MainTabs />
        </NavigationContainer>
    );
};

export default App;
