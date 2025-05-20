import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { Animated } from "react-native";
import { useRef } from "react";
import { clearCart } from "../redux/slices/cartSlice";

const CatalogScreen = ({ navigation }) => {
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState({});
    
    const changeQuantity = (productId, delta) => {
        setQuantities((prev) => {
            const newQty = Math.max(1, (prev[productId] || 1) + delta);
            return { ...prev, [productId]: newQty };
        });
    };

    const addedAnim = useRef(new Animated.Value(0)).current;
    const [addedText, setAddedText] = useState("");

    const showAddedAnimation = (name) => {
        setAddedText(`Додано: ${name}`);
        Animated.sequence([
            Animated.timing(addedAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            Animated.delay(800),
            Animated.timing(addedAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]).start();
    };

    const handleAddToCart = (product) => {
        const quantity = quantities[product.id] || 1;
        dispatch(addToCart({ product, quantity }));
        showAddedAnimation(product.name);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>{item.price} грн</Text>

            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => changeQuantity(item.id, -1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{quantities[item.id] || 1}</Text>
                <TouchableOpacity onPress={() => changeQuantity(item.id, 1)} style={styles.qtyBtn}>
                    <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => handleAddToCart(item)} style={styles.addButton}>
                <Text style={styles.addButtonText}>Додати до кошика</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Animated.View
                style={{
                    position: "absolute",
                    top: 10,
                    alignSelf: "center",
                    backgroundColor: "#000",
                    padding: 8,
                    borderRadius: 5,
                    opacity: addedAnim,
                    zIndex: 1,
                }}
            >
                <Text style={{ color: "#fff" }}>{addedText}</Text>
            </Animated.View>
            <FlatList
                data={products}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.row}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    );
};

export default CatalogScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    row: { justifyContent: "space-between" },
    card: {
        flex: 1,
        backgroundColor: "#fff",
        margin: 5,
        padding: 10,
        borderRadius: 8,
        elevation: 3,
        alignItems: "center",
    },
    image: { width: 80, height: 80, marginBottom: 10 },
    name: { fontWeight: "bold", fontSize: 16 },
    price: { marginVertical: 5, fontWeight: "600" },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 5,
    },
    qtyBtn: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "#eee",
        borderRadius: 5,
        marginHorizontal: 5,
    },
    qtyText: { fontSize: 16 },
    addButton: {
        backgroundColor: "#2196F3",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    addButtonText: { color: "white", fontWeight: "600" },
});
