import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CatalogScreen from "../screens/CatalogScreen";
import CartScreen from "../screens/CartScreen";
import CheckoutScreen from "../screens/CheckoutScreen";
import OrdersScreen from "../screens/OrdersScreen";
import HeaderIcons from "../components/HeaderIcons";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Catalog">
                <Stack.Screen
                    name="Catalog"
                    component={CatalogScreen}
                    options={({ Stack }) => ({
                        title: "Каталог товарів",
                        headerRight: () => <HeaderIcons></HeaderIcons>,
                    })}
                />
                <Stack.Screen name="Cart" component={CartScreen} options={{ title: "Кошик" }} />
                <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: "Оформлення замовлення" }} />
                {/* <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: "Історія замовлень" }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
