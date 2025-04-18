import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainTabs from "./components/MainTabs";
import { OneSignal } from "react-native-onesignal";

const App = () => {
    useEffect(() => {
        OneSignal.initialize("9a4beaf7-ca73-44b6-a4e9-c3dfdb1e28f4");
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
