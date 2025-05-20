import React from "react";
import { View, Text, FlatList, StyleSheet, Image, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "../redux/slices/ordersSlice";

const OrdersScreen = () => {
    const orders = useSelector((state) => state.orders.orders);
    const products = useSelector((state) => state.products.products);
    const dispatch = useDispatch();

    const handleClearOrders = () => {
        dispatch(clearOrders());
    };

    const renderProductItem = ({ item }) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;

        return (
            <View style={styles.productItem}>
                <Image source={{ uri: product.image }} style={styles.image} />
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text>Кількість: {item.quantity}</Text>
                </View>
            </View>
        );
    };

    const renderOrder = ({ item }) => {
        const date = new Date(item.date).toLocaleString("uk-UA");

        return (
            <View style={styles.orderContainer}>
                <Text style={styles.date}>Дата: {date}</Text>
                <Text>Сума: {item.total} грн</Text>
                <FlatList
                    data={item.items}
                    renderItem={renderProductItem}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    scrollEnabled={false}
                />
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {orders.length === 0 ? (
                <Text style={styles.empty}>Немає оформлених замовлень.</Text>
            ) : (
                <>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                        <Text style={styles.title}>Історія замовлень</Text>
                        {orders.length > 0 && <Button title="Очистити" onPress={handleClearOrders} />}
                    </View>
                    <FlatList data={orders} renderItem={renderOrder} keyExtractor={(item, index) => index.toString()} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
    empty: { fontSize: 16, color: "#888" },
    orderContainer: {
        padding: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        marginBottom: 14,
    },
    date: { fontWeight: "bold", marginBottom: 4 },
    productItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        margin: 6,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 8,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 4,
        marginRight: 10,
    },
    productInfo: {
        flexShrink: 1,
    },
    productName: {
        fontWeight: "600",
    },
});

export default OrdersScreen;
