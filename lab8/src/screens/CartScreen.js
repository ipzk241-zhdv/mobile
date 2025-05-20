import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, TextInput, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/slices/cartSlice";

const CartScreen = ({ navigation }) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [tempQuantities, setTempQuantities] = useState({});

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleQuantityChange = (id, value) => {
        setTempQuantities((prev) => ({ ...prev, [id]: value }));
    };

    const commitQuantityChange = (id) => {
        let quantity = parseInt(tempQuantities[id], 10);

        if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
        }

        dispatch(updateQuantity({ id, quantity }));
        setTempQuantities((prev) => ({ ...prev, [id]: String(quantity) }));
    };

    const getQuantity = (id) => {
        return tempQuantities[id] !== undefined ? tempQuantities[id] : cartItems.find((i) => i.id === id)?.quantity || 1;
    };

    const increment = (id) => {
        const current = cartItems.find((i) => i.id === id)?.quantity || 1;
        dispatch(updateQuantity({ id, quantity: current + 1 }));
        setTempQuantities((prev) => ({ ...prev, [id]: String(current + 1) }));
    };

    const decrement = (id) => {
        const current = cartItems.find((i) => i.id === id)?.quantity || 1;
        if (current > 1) {
            dispatch(updateQuantity({ id, quantity: current - 1 }));
            setTempQuantities((prev) => ({ ...prev, [id]: String(current - 1) }));
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>Ціна: {item.price} грн</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity onPress={() => decrement(item.id)} style={styles.qButton}>
                        <Text style={styles.qButtonText}>−</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.input}
                        keyboardType="numeric"
                        value={String(getQuantity(item.id))}
                        onChangeText={(val) => handleQuantityChange(item.id, val)}
                        onEndEditing={() => commitQuantityChange(item.id)}
                        onSubmitEditing={() => commitQuantityChange(item.id)}
                    />

                    <TouchableOpacity onPress={() => increment(item.id)} style={styles.qButton}>
                        <Text style={styles.qButtonText}>+</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtotal}>Сума: {item.price * item.quantity} грн</Text>
            </View>
            <TouchableOpacity onPress={() => dispatch(removeFromCart(item.id))}>
                <Text style={styles.remove}>🗑</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList data={cartItems} keyExtractor={(item) => item.id} renderItem={renderItem} ListEmptyComponent={<Text>Кошик порожній</Text>} />
            {cartItems.length > 0 && (
                <View style={styles.footer}>
                    <Text style={styles.total}>Загальна сума: {total} грн</Text>
                    <Button title="Оформити замовлення" onPress={() => navigation.navigate("Checkout")} />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    item: { flexDirection: "row", gap: 10, marginBottom: 16, alignItems: "center" },
    image: { width: 60, height: 60, borderRadius: 4 },
    name: { fontSize: 16, fontWeight: "bold" },
    price: { fontSize: 14 },
    subtotal: { fontSize: 14, fontWeight: "600", marginTop: 4 },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
        paddingHorizontal: 6,
        paddingVertical: 2,
        width: 50,
        textAlign: "center",
        marginHorizontal: 5,
    },
    remove: { fontSize: 22, color: "red", marginLeft: 5 },
    footer: { borderTopWidth: 1, paddingTop: 10 },
    total: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    quantityContainer: { flexDirection: "row", alignItems: "center", marginTop: 4 },
    qButton: {
        backgroundColor: "#eee",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    qButtonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default CartScreen;
