import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { addOrder } from "../redux/slices/ordersSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { CommonActions } from "@react-navigation/native";

const CheckoutScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const user = useSelector((state) => state.user);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const handleConfirm = () => {
        if (!name.trim() || !email.trim() || !email.includes("@")) {
            Alert.alert("Помилка", "Будь ласка, введіть коректні ім’я та email.");
            return;
        }

        dispatch(setUser({ name, email }));
        dispatch(
            addOrder({
                items: cartItems,
                total,
                user: {
                    name: name,
                    email: email,
                },
            })
        );
        dispatch(clearCart());

        Alert.alert("Успіх", "Замовлення оформлено успішно!", [
            {
                text: "OK",
                onPress: () =>
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: "Catalog" }],
                        })
                    ),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ім’я:</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Ваше ім’я" />
            <Text style={styles.label}>Email:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="example@email.com" keyboardType="email-address" />
            <View style={styles.summary}>
                <Text style={styles.total}>Товарів: {cartItems.length}</Text>
                <Text style={styles.total}>Загальна сума: {total} грн</Text>
            </View>
            <Button title="Підтвердити замовлення" onPress={handleConfirm} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { fontSize: 16, marginTop: 12 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        padding: 10,
        marginTop: 4,
    },
    summary: {
        marginVertical: 20,
    },
    total: {
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default CheckoutScreen;
