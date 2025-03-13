import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import GalleryScreen from "./screens/GalleryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Головна"
          screenOptions={({ route, navigation }) => ({
            header: () => (
              <Header activeTitle={route.name} navigation={navigation} />
            ),
          })}
        >
          <Stack.Screen name="Головна" component={HomeScreen} />
          <Stack.Screen name="Галерея" component={GalleryScreen} />
          <Stack.Screen name="Профіль" component={ProfileScreen} />
        </Stack.Navigator>
        <Footer></Footer>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;