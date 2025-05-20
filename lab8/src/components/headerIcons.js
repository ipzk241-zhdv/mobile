import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React from "react";

const HeaderIcons = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const itemCount = cartItems.length;
    const navigation = useNavigation();


    return (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15, marginRight: 10 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Orders")}>
                <Ionicons name="receipt-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")} style={{ position: "relative" }}>
                <Ionicons name="cart-outline" size={24} color="black" />
                {itemCount > 0 && (
                    <View
                        style={{
                            position: "absolute",
                            right: -6,
                            top: -4,
                            backgroundColor: "red",
                            borderRadius: 8,
                            paddingHorizontal: 5,
                            minWidth: 16,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ color: "white", fontSize: 10 }}>{itemCount}</Text>
                    </View>
                )}
            </TouchableOpacity>
        </View>
    );
};

export default HeaderIcons;